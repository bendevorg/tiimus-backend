/**
 * @api {POST} /users/:userId/invite_to_join Invite user to Join a project
 * @apiName Invite
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {String} msg Message.
 * @apiSuccessExample {json} Success-Response:
    "msg": "Request sent."
 * @apiError (500) {String} msg Error message.
 * @apiErrorExample {json} Error-Response:
    { "msg": "Database connection error." }
  *
 */
const logger = require('../../../tools/logger');
const database = require('../../models/database');
const insertProjectUsers = require('../projects/insertProjectUsers');
const generateToken = require('../../utils/generateToken');
const sendEmail = require('../../utils/sendEmail');
const validator = require('../../utils/validator');
const constants = require('../../utils/constants');

/**
 * Invite user to join a project by its id
 *
 * @param {string} req.params.userId - User id to invite
 * @return {object} - Returns the project in a json format
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res) => {
  const { userId } = req.params;
  const { projectId } = req.body;
  const { user } = req;

  if (!validator.isValidUuid(userId)) {
    return res.status(404).json({
      msg: constants.messages.error.USER_NOT_FOUND
    });
  }
  if (!validator.isValidUuid(projectId)) {
    return res.status(404).json({
      msg: constants.messages.error.PROJECT_NOT_FOUND
    });
  }

  database.projects
    .findById(projectId, {
      attributes: ['id', 'name'],
      include: [
        {
          model: database.users,
          attributes: ['id', 'name', 'email'],
          through: {
            model: database.projects_users,
            attributes: ['role'],
            where: {
              ownerAccepted: true,
              contributorAccepted: true
            }
          }
        }
      ]
    })
    .then(async project => {
      if (!project) {
        return res.status(404).json({
          msg: constants.messages.error.INVALID_PROJECT_ID
        });
      }
      if (
        !project.users.some(
          currentUser =>
            currentUser.id === user.id &&
            currentUser.projects_users.role === constants.roles.OWNER
        )
      ) {
        return res.status(401).json({
          msg: constants.messages.error.NOT_OWNER
        });
      }
      if (project.users.some(currentUser => currentUser.id === userId)) {
        return res.status(400).json({
          msg: constants.messages.error.USER_ALREADY_JOINED
        });
      }
      database.users
        .findById(userId, {
          attributes: ['id', 'name', 'email']
        })
        .then(async requestedUser => {
          if (!requestedUser) {
            return res.status(404).json({
              msg: constants.messages.error.USER_NOT_FOUND
            });
          }
          await insertProjectUsers(
            project,
            [userId],
            constants.roles.CONTRIBUTOR,
            true,
            false
          ).catch(err => {
            logger.error(err);
            return res.status(500).json({
              msg: constants.messages.error.UNEXPECTED_DB
            });
          });
          res.status(200).json({
            msg: constants.messages.info.REQUEST_SENT
          });
          const token = generateToken(
            { userId: userId, projectId: project.id },
            constants.values.INVITE_DATA_ENCRYPT_KEY,
            constants.values.INVITE_TOKEN_ENCRYPT_KEY,
            constants.values.TOKEN_EXPIRATION_IN_SECONDS
          );
          const subject = 'You have a new invite!';
          const htmlBody = `<b>You are being invited to join <a href="http://localhost:3339/projects/${
            project.id
          }">${project.name}</a></b>
          <br/><br/><a href="http://localhost:3342/projects/${project.id}/accept_invite?inviteData=${token}"> Click here </a> to accept.`;
          return sendEmail(requestedUser.email, subject, htmlBody).catch(
            err => {
              logger.error(err);
            }
          );
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
