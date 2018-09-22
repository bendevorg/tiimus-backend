const express = require('express');
const router = express.Router();
const retrieveControllers = require('../../utils/retrieveControllers');
const path = require('path');

const controllers = retrieveControllers(path.basename(__filename).split('.')[0]);

//  Technology API
router.post('/:skillId', controllers.newTechnology);
router.get('/:skillId', controllers.retrieveTechnologies);

module.exports = router;
