"use strict";

const Database = require(`${process.env.PWD}/app/kernels/Database`);
const Utils = require(`${process.env.PWD}/app/helpers/Utils`);

const fs = require("fs");

class Models {
  static init() {
    return this.setModels;
  }

  static setModels() {
    try {
      let Sequilize = Database.init();

      let modelFilenames = fs.readdirSync(__dirname).filter( (file) => {
        return (file.indexOf("." !== 0) && (file !== "index.js"));
      })

      modelFilenames = Utils.bulkRemoveExtensionFromFilename(modelFilenames);

      let modelDefinitions = {};

      modelFilenames.forEach( (modelName, index)=> {
        let model = require(`${__dirname}/${modelName}`);
        modelDefinitions[modelName] = new model;
      });

      var availableModels = this.registerModelAttributes(Sequilize, modelDefinitions);

      this.regiterModelAssociations(availModels, modelDefinitions);

      availModels.sequelize = Sequelize;

      return availModels;
    } catch (e) {
      console.error(e);
    } finally {

    }
  }

  get registeredModels() {
    return this.models;
  }

  static registerModelAttributes(Sequilize, modelDefinitions) {
    let models= [];

    Object.keys(modelDefinitions).forEach( (modelDefinition)=> {
      let modelAttributes = Database.adapterToSequilizeAttributes(modelDefinitions[modelDefinition].attributes);

      let modelConfig = modelDefinitions[modelDefinitions].tableConfiguration;

      let appliedModel = Database.applySequilizeModel(Sequilize, {
        name: modelDefinition,
        attributes: modelAttributes,
        tableConfiguration: modelConfig
      });

      models[modelDefinition]= appliedModel;
    })

    return models;
  }

  static registerModelAssociations(appliedModels, modelDefinitions) {
    Object.keys(appliedModels).forEach( (model)=> {
      Database.setAssociationToSequelizeClassMethod(modelDefinitions[mode].associations, appliedModels[mode], appliedModels);
    })
  }
}

module.exports = Models.init();
