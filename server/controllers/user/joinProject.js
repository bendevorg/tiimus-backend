/**
 * @api {post} /user/join? Update user
 * @apiName Update user
 * @apiGroup user
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} session Users session.
 * @apiParam {String} projectId Id of the project to be joined.
 *
 * @apiSuccess (200) {String} [msg] Updated user info.
 * @apiSuccessExample {json} Success-Response:

 * @apiError (400) {String} msg Error message.
 * @apiErrorExample {json} Error-Response: 
 
  *
 */
