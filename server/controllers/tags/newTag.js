/**
 * @api {POST} /tags/new New tag
 * @apiName New tag
 * @apiGroup Tags
 * @apiVersion 1.0.0
 *
 * @apiParam {String} name Tags name.
 *
 * @apiSuccess (200) {String} msg New tags info.
 * @apiSuccess (200) {String} id Tags id.
 * @apiSuccess (200) {String} name Tags name.
 * @apiSuccessExample {json} Success-Response:
    "msg": {
      "id": "012a362a-4f32-496f-bf25-d785d4df42ed",
      "name": "Tag example"
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
 * Add a new tag
 *
 * @param {object} req.body - tag name
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

  let newTag = database.tags.build({ name });
  newTag
    .save()
    .then(savedTag => {
      return res.status(200).json({
        msg: savedTag
      });
    })
    .catch(err => {
      logger.error(err);
      return res.status(500).json({
        msg: err
      });
    });
};
