const express = require('express');
const router = express.Router();
const middleware = require('../../controllers/userMiddleware');
const retrieveControllers = require('../../utils/retrieveControllers');
const path = require('path');

const controllers = retrieveControllers(path.basename(__filename).split('.')[0]);

//  Users API
router.get('/:userId', controllers.userInfo);

module.exports = router;
