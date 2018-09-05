/**
 * @api {POST} /projects/new New project
 * @apiName New project
 * @apiGroup Projects
 * @apiVersion 1.0.0
 *
 * @apiParam {String} name Projects name.
 * @apiParam {String} description Projects description.
 *
 * @apiSuccess (200) {String} msg New projects info.
 * @apiSuccess (200) {String} id Projects id.
 * @apiSuccess (200) {String} name Projects name.
 * @apiSuccess (200) {String} description Projects description.
 * @apiSuccessExample {json} Success-Response:
    "msg": {
      "id": "012a362a-4f32-496f-bf25-d785d4df42ed",
      "name": "Project example",
      "description": "Project description example"
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
 * Add a new project
 *
 * @param {object} req.body - project name
 * @return {string} - Returns a confirmation message
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res) => {
  let { name, description } = req.body;
  if (!validator.isValidString(name)) {
    return res.status(400).json({
      msg: constants.messages.error.INVALID_NAME
    });
  }
  if (!validator.isValidString(description)) {
    return res.status(400).json({
      msg: constants.messages.error.INVALID_DESCRIPTION
    });
  }

  name = name.trim();
  description = description.trim();

  let newProject = database.projects.build({ name, description });
  newProject
    .save()
    .then(savedProject => {
      return res.status(200).json({
        msg: savedProject
      });
    })
    .catch(err => {
      logger.error(err);
      return res.status(500).json({
        msg: err
      });
    });
};
