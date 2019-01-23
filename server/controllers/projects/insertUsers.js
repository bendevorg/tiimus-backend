/**
 * @api {POST} /projects/:projectId/users Insert users at project
 * @apiName Insert users at project
 * @apiGroup Projects
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} session Users session.
 * @apiParam {String[]} users Users id array.
 *
 * @apiSuccess (200) {String} msg New projects info.
 * @apiSuccess (200) {String} id Projects id.
 * @apiSuccess (200) {String} name Projects name.
 * @apiSuccess (200) {String} description Projects description.
 * @apiSuccess (200) {String[]} [tags] Tags related to project
 * @apiSuccess (200) {String[]} [skills] Skills needed in project
 * @apiSuccessExample {json} Success-Response:
    "msg": {
      "id": "012a362a-4f32-496f-bf25-d785d4df42ed",
      "name": "Project example",
      "description": "Project description example",
      "users": [
        "id": "jkasdjioo12389asdi-213ioajkld9012"
      ]
    }
 * @apiError (400) {String} msg Error message.
 * @apiErrorExample {json} Error-Response:
    { "msg": "Name not valid." }
  *
 */
const database = require('../../models/database');
const logger = require('../../../tools/logger');
const validator = require('../../utils/validator');
const constants = require('../../utils/constants');
const insertUsers = require('./insertProjectUsers');

/**
 * Add insert users
 *
 * @param {object} req.body.users - Users to be inserted
 * @return {string} - Returns updated project
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res) => {
  let { user } = req;
  let { projectId } = req.params;
  let { users } = req.body;

  if (!validator.isValidUuid(projectId)) {
    return res.status(400).json({
      msg: constants.messages.error.INVALID_PROJECT_ID
    });
  }

  return database.projects
    .findById(projectId, {
      attributes: ['id', 'name', 'description', 'image'],
      include: [
        {
          model: database.users,
          attributes: ['id', 'name', 'avatar'],
          through: {
            model: database.projects_users,
            attributes: ['role']
          }
        }
      ]
    })
    .then(async project => {
      let validOwner = false;
      for (let i = 0; i < project.users.length; i++) {
        if (users.includes(project.users[i].id)) {
          return res.status(400).json({
            msg: constants.messages.error.USER_ALREADY_JOINED
          });
        }
        if (project.users[i].id === user.id)
          validOwner = true;
      }
      if (!validOwner) {
        return res.status(401).json({
          msg: constants.messages.error.NOT_OWNER
        });
      }
      let insertedUsers = await insertUsers(project, users, constants.roles.CONTRIBUTOR, false);
      return res.status(200).json({
        msg: project
      });
    })
    .catch(err => {
      logger.error(err);
      return res.status(500).json({
        msg: constants.messages.error.UNEXPECTED_DB
      });
    });
};
