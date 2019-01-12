/**
 * @api {GET} /projects/:projectId Retrieve project by its id
 * @apiName Retrieve project
 * @apiGroup Projects
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {json[]} msg Projects list.
 * @apiSuccess (200) {String} id Project id.
 * @apiSuccess (200) {String} name Project name.
 * @apiSuccess (200) {String} description Project description.
 * @apiSuccess (200) {String} image Project image.
 * @apiSuccessExample {json} Success-Response:
    "msg": [
        {
          "id": "012a362a-4f32-496f-bf25-d785d4df42ed",
          "name": "Project example",
          "description": "Project description example",
          "image": "http://image.com/image.png"
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
 * Retrieve a project by its id
 *
 * @param {string} req.params.projectId - Project id to retrieve info 
 * @return {object} - Returns the project in a json format
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res) => {
  const { projectId } = req.params;

  if (!validator.isValidUuid(projectId)) {
    return res.status(404).json({
      msg: constants.messages.error.PROJECT_NOT_FOUND
    });
  }

  database.projects
    .findById(projectId, {
      attributes: ['id', 'name', 'description', 'image'],
      include: [
        {
          model: database.users,
          attributes: ['id', 'name', 'avatar'],
          through: {
            model: database.projects_users,
            attributes: ['role'],
          }
        },
        {
          model: database.skills,
          attributes: ['name'],
          through: {
            attributes: []
          }
        },
        {
          model: database.tags,
          attributes: ['name'],
          through: {
            attributes: []
          }
        }
      ]
    })
    .then(project => {
      return res.status(200).json({
        msg: project
      });
    })
    .catch(err => {
      logger.error(err);
      return res.status(500).json({
        msg: constants.messages.error.UNEXPECTED_DB
      });
    });
};
