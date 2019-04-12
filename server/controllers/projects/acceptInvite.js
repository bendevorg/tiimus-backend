/**
 * @api {POST} /projects/accept_invite Accept invite to user join a project
 * @apiName Accept invite
 * @apiGroup Projects
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {String} msg Message.
 * @apiSuccessExample {json} Success-Response:
    "msg": "Invite accepted."
 * @apiError (500) {String} msg Error message.
 * @apiErrorExample {json} Error-Response:
    { "msg": "Database connection error." }
  *
 */
const logger = require('../../../tools/logger');
const database = require('../../models/database');
const getDataFromToken = require('../../utils/getDataFromToken');
const sendEmail = require('../../utils/sendEmail');
const validator = require('../../utils/validator');
const constants = require('../../utils/constants');

/**
 * Accept invite to user join a project
 *
 * @param {string} req.query.inviteData - Encrypted invite data
 * @return {object} - Returns the project in a json format
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res) => {
  const { inviteData } = req.query;
  if (!validator.isValidString(inviteData)) {
    return res.status(404).json({
      msg: constants.messages.error.PROJECT_NOT_FOUND
    });
  }

  let invite = getDataFromToken(
    inviteData,
    constants.values.INVITE_DATA_ENCRYPT_KEY,
    constants.values.INVITE_TOKEN_ENCRYPT_KEY
  );
  return database.projects
    .findById(invite.projectId, {
      attributes: ['id', 'name'],
      include: [
        {
          model: database.users,
          attributes: ['id', 'name', 'email'],
          where: {
            id: invite.userId
          },
          through: {
            model: database.projects_users,
            attributes: ['role', 'ownerAccepted', 'contributorAccepted'],
            where: {
              [database.Sequelize.Op.or]: [
                {
                  ownerAccepted: false,
                  contributorAccepted: true
                },
                {
                  ownerAccepted: true,
                  contributorAccepted: false
                }
              ]
            }
          }
        }
      ]
    })
    .then(async project => {
      if (!project) {
        return res.status(404).json({
          msg: constants.messages.error.PROJECT_NOT_FOUND
        });
      }
      const [role, ownerAccepted, contributorAccepted] = [constants.roles.CONTRIBUTOR, true, true];
      project.addUsers([invite.userId], { through: { role, ownerAccepted, contributorAccepted } })
        .then(success => {
          if (!success) {
            return res.stauts(500).json({
              msg: constants.messages.error.UNEXPECTED_RUNNING
            });
          }
          return res.redirect(`http://localhost:3339/projects/${invite.projectId}`);
        })
        .catch(err => {
          logger.error(err);
          return res.status(500).json({
            msg: constants.messages.error.UNEXPECTED_DB
          });
        });
    })
    .catch(err => {
      logger.error(err);
      return res.status(500).json({
        msg: constants.messages.error.UNEXPECTED_DB
      });
    });
};
