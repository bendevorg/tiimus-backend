/**
 * @api {GET} /skills Retrieve skills
 * @apiName Retrieve skills
 * @apiGroup Skills
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {json[]} msg Skills list.
 * @apiSuccess (200) {String} id Skills id.
 * @apiSuccess (200) {String} name Skills name.
 * @apiSuccessExample {json} Success-Response:
    "msg": [
        {
          "id": "012a362a-4f32-496f-bf25-d785d4df42ed",
          "name": "Skill example"
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
 * Retrieve all skills
 *
 * @param {string}
 * @return {object} - Returns the leaderboard in a json format
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res) => {
  database.skills
    .findAll({
      attributes: ['id', 'name']
    })
    .then(skills => {
      return res.status(200).json({
        msg: skills
      });
    })
    .catch(err => {
      logger.error(err);
      return res.status(500).json({
        msg: constants.messages.error.UNEXPECTED_DB
      });
    });
};
