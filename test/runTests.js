require('dotenv').config();

//  Auth
require('./auth/signUp');
require('./auth/signIn');

//  Close connections
require('./utils/closeApp');
