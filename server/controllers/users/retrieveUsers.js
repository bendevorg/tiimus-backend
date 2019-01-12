/**
 * @api {GET} /projects Retrieve users
 * @apiName Retrieve users
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {json[]} msg Users list.
 * @apiSuccess (200) {String} id Project id.
 * @apiSuccess (200) {String} name Project name.
 * @apiSuccess (200) {Boolean} lookingForProject User looking for a project.
 * @apiSuccess (200) {String} avatar Project image.
 * @apiSuccessExample {json} Success-Response:
    "msg": [
        {
          "id": "012a362a-4f32-496f-bf25-d785d4df42ed",
          "name": "User name",
          "lookingForProject": true,
          "avatar": "http://image.com/image.png"
        }
    ]
 * @apiError (500) {String} msg Error message.
 * @apiErrorExample {json} Error-Response:
    { "msg": "Database connection error." }
  *
 */
const logger = require('../../../tools/logger');
const database = require('../../models/database');
const constants = require('../../utils/constants');

/**
 * Retrieve users
 *
 * @param {string}
 * @return {object} - Returns the project in a json format
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res) => {
  database.users
    .findAll({
      attributes: ['id', 'name', 'lookingForProject', 'avatar']
      // include: [
      //   {
      //     model: database.skills,
      //     attributes: ['name'],
      //     through: {
      //       attributes: []
      //     }
      //   }
      // ]
    })
    .then(users => {
      return res.status(200).json({
        msg: users
      });
    })
    .catch(err => {
      logger.error(err);
      return res.status(500).json({
        msg: constants.messages.error.UNEXPECTED_DB
      });
    });
};
