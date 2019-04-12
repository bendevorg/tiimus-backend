/**
 * @api {GET} /user Retrieve logged users info
 * @apiName Retrieve logged users info
 * @apiGroup User
 * @apiVersion 1.0.0
 * 
 * @apiHeader {String} session User session key
 *
 * @apiSuccess (200) {json} msg Users info.
 * @apiSuccess (200) {String} id Users id.
 * @apiSuccess (200) {String} name Users name.
 * @apiSuccess (200) {String} email Users email.
 * @apiSuccess (200) {String} lookingForProject User is looking to join projects.
 * @apiSuccess (200) {String} avatar Users avatar path.
 * @apiSuccessExample {json} Success-Response:
    "msg": [
        {
          "id": "012a362a-4f32-496f-bf25-d785d4df42ed",
          "name": "User example",
          "email": "example@test.com",
          "lookingForProject": true,
          "avatar": "http://avatar.com/avatar.png"
        }
    ]
 * @apiError (401) {String} msg Invalid session message.
 * @apiErrorExample {json} Error-Response:
    { "msg": "You have to be logged in to access this feature." }
  *
 */
const database = require('../../models/database');
const logger = require('../../../tools/logger');
const constants = require('../../utils/constants');

/**
 * Retrieve user info based on session token
 *
 * @return {object} - Returns the user info in a json format
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res) => {
  let { user } = req;

  if (!user) {
    return res.status(401).json({
      msg: constants.messages.error.INVALID_USER
    });
  }

  return user.getProjects({
    through: {
      model: database.projects_users,
      attributes: ['role'],
      where: {
        ownerAccepted: true,
        contributorAccepted: true
      }
    }
  })
  .then(projects => {
    user.dataValues.projects = projects;
    return res.status(200).json({
      msg: user
    });
  })
  .catch(err => {
    logger.error(err);
    return res.status(206).json({
      msg: user
    });
  });
};
