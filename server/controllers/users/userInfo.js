/**
 * @api {GET} /user/:userId Retrieve users info
 * @apiName Retrieve users info based on user id
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} session User session key
 *
 * @apiSuccess (200) {json} msg Users info.
 * @apiSuccess (200) {String} id Users id.
 * @apiSuccess (200) {String} name Users name.
 * @apiSuccess (200) {String} lookingForProject User is looking to join projects.
 * @apiSuccess (200) {String} avatar Users avatar path.
 * @apiSuccessExample {json} Success-Response:
    "msg": [
        {
          "id": "012a362a-4f32-496f-bf25-d785d4df42ed",
          "name": "User example",
          "lookingForProject": true,
          "avatar": "http://avatar.com/avatar.png"
        }
    ]
 * @apiError (404) {String} msg User not found.
 * @apiErrorExample {json} Error-Response:
    { "msg": "User not found" }
  *
 */
const logger = require('../../../tools/logger');
const database = require('../../models/database');
const validator = require('../../utils/validator');
const constants = require('../../utils/constants');

/**
 * Retrieve user info based on user Id
 *
 * @param {string} req.params.userId - User id to retrieve info
 * @return {object} - Returns the user info in a json format
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res) => {
  const { userId } = req.params;

  if (!validator.isValidUuid(userId)) {
    return res.status(404).json({
      msg: constants.messages.error.USER_NOT_FOUND
    });
  }

  return database.users
    .findById(userId, {
      attributes: {
        exclude: ['password', 'email', 'createdAt', 'updatedAt']
      },
      include: [
        {
          model: database.projects,
          attributes: ['id', 'name', 'image', 'description'],
          through: {
            attributes: ['role']
          },
          include: [
            {
              model: database.tags,
              attributes: ['name'],
              through: {
                attributes: []
              }
            },
            {
              model: database.skills,
              attributes: ['name'],
              through: {
                attributes: []
              }
            }
          ]
        }
      ]
    })
    .then(user => {
      if (!user) {
        return res.status(404).json({
          msg: constants.messages.error.USER_NOT_FOUND
        });
      }

      return res.status(200).json({
        msg: user
      });
    })
    .catch(err => {
      logger.error(err);
      console.log(err);
      return res.status(500).json({
        msg: constants.messages.error.UNEXPECTED_DB
      });
    });
};
