'use strict';

const Utils= require(`${process.env.PWD}/app/helpers/Utils`);

class Validators {
  constructor() {
    this.validators= this.setValidators();
  }

  async setValidators() {
    try {
      let validatorFilenames= await Utils.getDirectoryContentNames(__dirname);

      validatorFilenames = Utils.bulkRemoveExtensionFromFilename(validatorFilenames);

      let availableValidators= [];

      validatorFilenames.forEach( (validatorName, index)=> {
        availableValidators[validatorName] = require(`${__dirname}/${validatorName}`);
      })

      return availableValidators;
    } catch (e) {
      console.error(e);
    }
  }

  get registeredValidators() {
    return this.validators;
  }
}

module.exports= Validators;
