const express = require('express');
const router = express.Router();
const retrieveControllers = require('../../utils/retrieveControllers');
const path = require('path');

const controllers = retrieveControllers(path.basename(__filename).split('.')[0]);

//  Skill API
router.post('/new', controllers.newProject);
router.get('/', controllers.retrieveProject);

module.exports = router;
