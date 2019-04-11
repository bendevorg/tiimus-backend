const express = require('express');
const router = express.Router();
const retrieveControllers = require('../../utils/retrieveControllers');
const path = require('path');

const userMiddleware = require('../../controllers/userMiddleware');
const controllers = retrieveControllers(path.basename(__filename).split('.')[0]);

//  Users API
router.get('/', controllers.retrieveUsers);
router.get('/:userId', controllers.userInfo);
router.post('/:userId/invite_to_join', userMiddleware, controllers.inviteToJoin)

module.exports = router;
