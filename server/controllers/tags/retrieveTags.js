/**
 * @api {GET} /tags Retrieve tags
 * @apiName Retrieve tags
 * @apiGroup Tags
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {json[]} msg Tags list.
 * @apiSuccess (200) {String} id Tags id.
 * @apiSuccess (200) {String} name Tags name.
 * @apiSuccessExample {json} Success-Response:
    "msg": [
        {
          "id": "012a362a-4f32-496f-bf25-d785d4df42ed",
          "name": "Tag example"
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
 * Retrieve all tags
 *
 * @param {string}
 * @return {object} - Returns the leaderboard in a json format
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res) => {
  database.tags
    .findAll({
      attributes: ['id', 'name']
    })
    .then(tags => {
      return res.status(200).json({
        msg: tags
      });
    })
    .catch(err => {
      logger.error(err);
      return res.status(500).json({
        msg: constants.messages.error.UNEXPECTED_DB
      });
    });
};
