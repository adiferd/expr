'use strict';

const Models = require(`${process.env.PWD}/app/models`);

class ContentService {
  static async getAllContent() {
    try {
      const contents = await Models.Content.findAll({
        limit: 10
      })

      return contents;

    } catch (e) {
      console.error(e);
    }

  }
}

module.exports= ContentService;
