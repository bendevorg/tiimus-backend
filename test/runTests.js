require('dotenv').config();

//  Auth
require('./auth/signUp');
require('./auth/signIn');

//  User
require('./user/userInfo');

//  Sign out
require('./auth/signOut');

//  Skill
require('./skill/newSkill');
require('./skill/retrieveSkills');

//  Technology
require('./technology/newTechnology');
require('./technology/retrieveTechnologies');

//  Close connections
require('./utils/closeApp');
