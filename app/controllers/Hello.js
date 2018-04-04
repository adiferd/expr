'use strict';
const Formatter = require(`${process.env.PWD}/app/helpers/Formatter`);

class Hello {
  /**
   * @api {get} /user/:id Request User information
   * @apiName GetUser
   * @apiGroup User
   *
   * @apiParam {Number} id Users unique ID.
   *
   * @apiSuccess {String} firstname Firstname of the User.
   * @apiSuccess {String} lastname  Lastname of the User.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "firstname": "John",
   *       "lastname": "Doe"
   *     }
   *
   * @apiError UserNotFound The id of the User was not found.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 404 Not Found
   *     {
   *       "error": "UserNotFound"
   *     }
   */
  static async sayHello(req, res, next) {
      try {
          let response = Formatter.toSingleResponse({hello: 'world'}, 'Say hello')
          res.send(response).status(201)
      } catch (e) {
          let response = Formatter.toSingleResponse({hello: e}, 'Error occured')
          res.send(response)
      } finally {
          next()
      }
  }
}

module.exports = Hello;
