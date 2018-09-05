/**
 * @api {GET} /user/info Retrieve users info
 * @apiName Retrieve info
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} session User session key
 *
 * @apiSuccess (200) {json} msg Users info.
 * @apiSuccess (200) {String} id Users id.
 * @apiSuccess (200) {String} name Users name.
 * @apiSuccessExample {json} Success-Response:
    "msg": [
        {
          "id": "012a362a-4f32-496f-bf25-d785d4df42ed",
          "name": "User example"
        }
    ]
 * @apiError (401) {String} msg Invalid session message.
 * @apiErrorExample {json} Error-Response:
    { "msg": "You have to be logged in to access this feature." }
  *
 */
const constants = require('../../utils/constants');

/**
 * Retrieve user info based on session token
 *
 * @return {object} - Returns the user info in a json format
 * @throws {object} - Returns a msg that indicates a failure
 *
 */
module.exports = (req, res) => {
  let { user } = req;

  if (!user) {
    return res.status(401).json({
      msg: constants.messages.error.INVALID_USER
    });
  }

  return res.status(200).json({
    msg: user
  });
};
