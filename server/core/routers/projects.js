const express = require('express');
const router = express.Router();
const retrieveControllers = require('../../utils/retrieveControllers');
const path = require('path');

const controllers = retrieveControllers(
  path.basename(__filename).split('.')[0]
);
const userMiddleware = require('../../controllers/userMiddleware');
const optionalUserMiddleware = require('../../controllers/optionalUserMiddleware');
const upload = require('../../utils/upload');

//  Projects API
router.post(
  '/',
  upload.single('image'),
  userMiddleware,
  controllers.newProject
);
router.get('/', controllers.retrieveProjects);
router.get('/:projectId', optionalUserMiddleware, controllers.retrieveProject);
router.post('/:projectId/users', userMiddleware, controllers.insertUsers);
router.patch('/:projectId', userMiddleware, upload.single('image'), controllers.editProject);
router.post('/:projectId/ask_to_join', userMiddleware, controllers.askToJoin);

module.exports = router;
