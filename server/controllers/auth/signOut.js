/**
 * @api {GET} /auth/sign_out User sign out
 * @apiName Sign Out
 * @apiGroup Auth
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} session User session key
 *
 * @apiSuccess (200) {String} msg Sign out confirmation message.
 * @apiSuccessExample {json} Success-Response:
    { "msg": "User logged out" }
 */
const constants = require('../../utils/constants');

/**
 * Sign out an user
 *
 * @return {string} - Returns a confirmation message
 *
 */
module.exports = (req, res) => {
  res.clearCookie('session');
  return res.status(200).json({
    msg: constants.messages.info.USER_LOGGED_OUT
  });
};
