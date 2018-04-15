'use strict';

const Models = require(`${process.env.PWD}/app/models`);

class ContentService {
  static async getAllContent() {
    const contents = await Models.Content.findAll({
        limit: 10
      })

      return contents;    

  }
}

module.exports= ContentService;
