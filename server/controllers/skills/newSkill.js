/**
 * @api {POST} /skills/new New skill
 * @apiName New skill
 * @apiGroup Skills
 * @apiVersion 1.0.0
 *
 * @apiParam {String} name Skills name.
 *
 * @apiSuccess (200) {json} msg New skills info.
 * @apiSuccess (200) {String} id Skills id.
 * @apiSuccess (200) {String} name Skills name.
 * @apiSuccessExample {json} Success-Response:
    "msg": {
      "id": "012a362a-4f32-496f-bf25-d785d4df42ed",
      "name": "Skill example"
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

/**
 * Add a new skill
 *
 * @param {object} req.body - skill name
 * @return {string} - Returns a confirmation message
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res) => {
  let { name } = req.body;
  if (!validator.isValidString(name)) {
    return res.status(400).json({
      msg: constants.messages.error.INVALID_NAME
    });
  }

  name = name.trim();

  let newSkill = database.skills.build({ name });
  newSkill
    .save()
    .then(savedSkill => {
      return res.status(200).json({
        msg: savedSkill
      });
    })
    .catch(err => {
      logger.error(err);
      return res.status(500).json({
        msg: err
      });
    });
};
