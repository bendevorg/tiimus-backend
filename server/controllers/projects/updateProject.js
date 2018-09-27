/**
 * @api {POST} /projects New project
 * @apiName New project
 * @apiGroup Projects
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} session Users session.
 * @apiParam {String} [name] Projects name.
 * @apiParam {String} [description] Projects description.
 * @apiParam {String[]} [tags] Tags related to project
 * @apiParam {String[]} [skills] Skills needed in project
 *
 * @apiSuccess (200) {String} [msg] Updated project info.
 * @apiSuccess (200) {String} [id] Updated projects id.
 * @apiSuccess (200) {String} [name] Updated projects name.
 * @apiSuccess (200) {String} [description] Updated projects description.
 * @apiSuccess (200) {String[]} [tags] Updated tags related to project
 * @apiSuccess (200) {String[]} [skills] Updated skills needed in project
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
const insertUser = require('./insertUser');
const insertProjectTags = require('./insertProjectTags');
const insertProjectSkills = require('./insertProjectSkills');

/**
 * Add a new project
 *
 * @param {object} req.body - project name
 * @return {string} - Returns a confirmation message
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res) => {
  const { projectId } = req.params
  if (!validator.isValidUuid(projectId)) {
    return res.status(400).json({
      msg: constants.messages.error.INVALID_PROJECT_ID
    });
  }
  let { name, description, tags, skills } = req.body;
  let projectInfo = {};
  if (validator.isValidString(name)) {
    projectInfo.name = name.trim();
  }
  if (validator.isValidString(description)) {
    projectInfo.description = description.trim();
  }
  if (validator.isValidArray(tags)) {
    projectInfo.tags = tags;
  }
  if (validator.isValidArray(skills)) {
    projectInfo.skills = skills;
  }

  database.projects.update(projectInfo, {where: {id: projectId}})
    .then(updateConfirm => {
        if (updateConfirm == 0){

            return res.status(400).json({
                msg: 'Not a valid project ID.'
            });

        } else {

            return res.status(200).json({
                msg: 'Values updated.'
            });

        }

    }, (err) => {
        return res.status(500).json({
            msg: err.name
        })
    });
};
