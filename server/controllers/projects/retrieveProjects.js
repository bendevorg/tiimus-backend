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
 * Retrieve all projects
 *
 * @param {string}
 * @return {object} - Returns the project in a json format
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res) => {
  const { lookingForUser } = req.query;
  let filters = {
    projects: null,
    skills: null,
    tags: null
  };

  if (validator.isValidString(lookingForUser) && lookingForUser.toLowerCase() === 'true') {
    filters.skills = {};
    filters.skills.id = {
      [database.Sequelize.Op.ne]: null
    };
  }

  database.projects
    .findAll({
      attributes: ['id', 'name', 'description', 'image'],
      include: [
        {
          model: database.skills,
          attributes: ['name'],
          through: {
            attributes: []
          },
          where: filters.skills
        },
        {
          model: database.tags,
          attributes: ['name'],
          through: {
            attributes: []
          },
          where: filters.tags
        }
      ],
      where: filters.projects
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
