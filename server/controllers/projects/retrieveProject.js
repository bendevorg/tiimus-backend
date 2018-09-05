/**
 * @api {GET} /projects Retrieve projects
 * @apiName Retrieve projects
 * @apiGroup Projects
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {json[]} msg Projects list.
 * @apiSuccess (200) {String} id Project id.
 * @apiSuccess (200) {String} name Project name.
 * @apiSuccess (200) {String} description Project description.
 * @apiSuccessExample {json} Success-Response:
    "msg": [
        {
          "id": "012a362a-4f32-496f-bf25-d785d4df42ed",
          "name": "Project example",
          "description": "Project description example"
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
 * Retrieve all projects
 *
 * @param {string}
 * @return {object} - Returns the project in a json format
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res) => {
  database.projects
    .findAll({
      attributes: ['id', 'name', 'description']
    })
    .then(projects => {
      return res.status(200).json({
        msg: projects
      });
    })
    .catch(err => {
      logger.error(err);
      return res.status(500).json({
        msg: constants.messages.error.UNEXPECTED_DB
      });
    });
};
