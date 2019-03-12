'use strict';
const Formatter = require(`${process.env.PWD}/app/helpers/Formatter`);
const ConfigHelper = require(`${process.env.PWD}/app/helpers/Config`);

class Facebook {
  /**
  * @api {get} /webhook
  */
  static async initWebhook(req, res, next){
    try {
      if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === `${ConfigHelper.get('facebook').verify_token}`) {
        res.send(req.query['hub.challenge']).status(200);
      } else {
        res.status(400).send('Error, kindly contact administrator!')
      }
    } catch (e) {
      res.status(500).send(e);
    } finally {
      next()
    }
  }

  static async eventWebhook(req, res, next) {
    try {
      let body = req.body

      body.entry.forEach(function(entry){
        let webhook_event = entry.messaging[0];
        console.log(webhook_event);
      })
      res.status(200).send('EVENT_RECEIVED')
    } catch (e) {
      res.status(404).send(e)
    } finally {
      next()
    }
  }
}

module.exports = Facebook;
