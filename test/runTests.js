require('dotenv').config();

//  Auth
require('./auth/signUp');
require('./auth/signIn');

//  User
require('./user/userInfo');

//  Sign out
require('./auth/signOut');

//  Skill
require('./skill/retrieveSkills');
require('./skill/newSkill');

//  Close connections
require('./utils/closeApp');
