/**
 * @api {GET} /technologies Retrieve technologies
 * @apiName Retrieve technologies
 * @apiGroup Technologies
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {json[]} msg Technologies list.
 * @apiSuccess (200) {String} id Technologys id.
 * @apiSuccess (200) {String} name Techonologys name.
 * @apiSuccessExample {json} Success-Response:
    "msg": [
        {
          "id": "012a362a-4f32-496f-bf25-d785d4df42ed",
          "name": "Technology example"
        }
    ]
 * @apiError (500) {String} msg Error message.
 * @apiErrorExample {json} Error-Response:
    { "msg": "Database connection error." }
  *
 */
const logger = require('../../../tools/logger');
const database = require('../../models/database');
const validator = require('../../utils/validator');
const constants = require('../../utils/constants');

/**
 *
 * @param {string} req.params.gameId - Game ID
 * @return {object} - Returns the leaderboard in a json format
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res) => {
  let { skillId } = req.params;
  if (!validator.isValidString(skillId)) {
    return res.status(400).json({
      msg: constants.messages.error.INVALID_SKILL_ID
    });
  }
  database.technologies
    .findAll({
      where: {
        skillId: skillId
      }
    })
    .then(technology => {
      if (!technology) {
        return res.status(400).json({
          msg: constants.messages.error.INVALID_SKILL_ID
        });
      }
      return res.status(200).json({
        msg: technology
      });
    })
    .catch(database.sequelize.Sequelize.DatabaseError, () => {
      return res.status(400).json({
        msg: constants.messages.error.INVALID_SKILL_ID
      });
    })
    .catch(err => {
      logger.error(err);
      return res.status(500).json({
        msg: constants.messages.error.UNEXPECTED_DB
      });
    });
};
