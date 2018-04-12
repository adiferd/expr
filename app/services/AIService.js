'use strict';

const Config = require(`${process.env.PWD}/app/helpers/Config`);
const axios = require('axios');

class AIService {
  static async getAIResponse(question) {
    try {
      axios.post(Config.get('ai').ai_url+ '/query', {
        "authtoken": Config.get('ai').ai_token,
        "text": question
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.error(error);
        throw {
          message: "AI Error",
          status: 500
        }
      });
    } catch (e) {
      throw {
        message: 'Internal Server Error',
        status: 500
      }
    }
  }
}

module.exports = AIService;
