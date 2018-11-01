/**
 * @api {POST} /user/:userId/invite Invite user
 * @apiName Invite user
 * @apiGroup user
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} session Users session.
 * @apiParam {String} [name] users name.
 * @apiParam {String} [description] Users description.
 * @apiParam {String[]} [skills] Skills needed in user
 *
 * @apiSuccess (200) {String} [msg] Updated user info.
 * @apiSuccess (200) {String} [id] Updated users id.
 * @apiSuccess (200) {String} [name] Updated users name.
 * @apiSuccess (200) {String} [description] Updated users description.
 * @apiSuccess (200) {String[]} [skills] Updated skills needed in user
 * @apiSuccessExample {json} Success-Response:

 * @apiError (400) {String} msg Error message.
 * @apiErrorExample {json} Error-Response: 

  *
 */
