const express = require('express');
const router = express.Router();
const middleware = require('../../controllers/userMiddleware');
const retrieveControllers = require('../../utils/retrieveControllers');
const path = require('path');
const upload = require('../../utils/upload');

const controllers = retrieveControllers(
  path.basename(__filename).split('.')[0]
);

//  User API
router.get('/', middleware, controllers.loggedUserInfo);
router.patch('/', middleware, upload.single('avatar'), controllers.editUser);

module.exports = router;
