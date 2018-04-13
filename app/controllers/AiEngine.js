'use strict';

const Formatter = require(`${process.env.PWD}/app/helpers/Formatter`);
const AIService = require(`${process.env.PWD}/app/services/AIService`);
const ContentService = require(`${process.env.PWD}/app/services/ContentService`);

class AiEngine {

  static async getAIResponse() {
    try {
      const ai_res = await AIService.getAIResponse(req.body.question);
      let response = Formatter.toSingleResponse(ai_res, 'AI Response retrieved');

      res.status(200).send(response);
    } catch (e) {
      let response = Formatter.toSingleResponse({error:e}, 'Error occured');
      res.status(400).send(response);
    } finally {
      next();
    }
  }


  static async getAllContent(req, res, next) {
    try {
      const contents = await ContentService.getAllContent();

      let response = Formatter.toSingleResponse(contents, '');

      res.status(200).send(response);
    } catch (e) {
      console.console.error(e);
    } finally {
      next();
    }
  }
}

module.exports = AiEngine;
