const express = require('express');
const router = express.Router();
const retrieveControllers = require('../../utils/retrieveControllers');
const path = require('path');

const controllers = retrieveControllers(path.basename(__filename).split('.')[0]);

//  Auth API
router.post('/sign_up', controllers.signUp);
router.post('/sign_in', controllers.signIn);
router.get('/sign_out', controllers.signOut);

module.exports = router;
