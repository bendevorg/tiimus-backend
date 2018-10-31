/**
 * @api {PATCH} /user Update user
 * @apiName Update user
 * @apiGroup user
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} session Users session.
 * @apiParam {String} [name] users name.
 * @apiParam {String} [description] Users description.
 * @apiParam {String[]} [skills] Skills needed in user
 *
 * @apiSuccess (200) {String} [msg] Updated user info.
 * @apiSuccess (200) {String} [id] Updated users id.
 * @apiSuccess (200) {String} [name] Updated users name.
 * @apiSuccess (200) {String} [description] Updated users description.
 * @apiSuccess (200) {String[]} [skills] Updated skills needed in user
 * @apiSuccessExample {json} Success-Response:
    "msg": {
      "id": "012a362a-4f32-496f-bf25-d785d4df42ed",
      "name": "user example",
      "description": "user description example"
    },
    "savedSkills": [
        [
            {
                "createdAt": "2018-10-04T16:07:15.083Z",
                "updatedAt": "2018-10-04T16:07:15.083Z",
                "userId": "985686f3-d9b5-42c1-a5d0-878aeeb7b5cd",
                "skillId": "401d4081-111c-4ca3-8c0f-d6d8d6c37f27"
            }
        ]
    ]
 * @apiError (400) {String} msg Error message.
 * @apiErrorExample {json} Error-Response: 
    { "msg": "Name not valid." }
  *
 */
const database = require('../../models/database');
const logger = require('../../../tools/logger');
const validator = require('../../utils/validator');
const constants = require('../../utils/constants');

/**
 * Update user
 *
 * @param {object} req.body - user name
 * @return {string} - Returns a confirmation message
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res) => {
  const { userId } = req.params;
  if (!validator.isValidUuid(userId)) {
    return res.status(400).json({
      msg: constants.messages.error.INVALID_USER_ID
    });
  }
  let { name, description, skills } = req.body;
  let userInfo = {};
  if (validator.isValidString(name)) {
    userInfo.name = name.trim();
  }
  if (validator.isValidString(description)) {
    userInfo.description = description.trim();
  }
  database.users
    .findById(userId)
    .then(userToUpdate => {
      return userToUpdate.update(userInfo).then(updateConfirmation => {
        if (validator.isValidArray(skills)) {
          userToUpdate
            .setSkills(skills)
            .then(savedSkills => {
              return res.status(200).json({
                msg: userToUpdate,
                savedSkills
              });
            })
            .catch(err => {
              return res.status(500).json({
                msg: err.name
              });
            });
        } else {
          return res.status(200).json({
            msg: saveduser
          });
        }
      });
    })
    .catch(err => {
      logger.error(err);
      return res.status(500).json({
        msg: constants.messages.error.UNEXPECTED_DB
      });
    });
};
