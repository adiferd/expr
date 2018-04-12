'use strict';

const Formatter = require(`${process.env.PWD}/app/helpers/Formatter`);
const AIService = require(`${process.env.PWD}/app/services/AIService`);

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
}

module.exports = AiEngine;
