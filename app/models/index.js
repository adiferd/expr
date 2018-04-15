"use strict";

const Database= require(`${process.env.PWD}/app/kernels/Database`);
const Utils= require(`${process.env.PWD}/app/helpers/Utils`);

const fs = require("fs");

class Models {
  static init() {
    return this.setModels();
  }

  static setModels() {
    try {
      let Sequelize= Database.init();

      let modelFilenames= fs.readdirSync(__dirname).filter( (file)=> {
        
        return (file.indexOf(".") !== 0) && (file !== "index.js");
      })
      
      modelFilenames= Utils.bulkRemoveExtensionFromFilename(modelFilenames)
      
      let modelDefinitions= {};

      modelFilenames.forEach( (modelName, index)=> {
        let model = require(`${__dirname}/${modelName}`);
        modelDefinitions[modelName]= new model;
      });

      var availableModels= this.registerModelAttributes(Sequelize, modelDefinitions);

      this.registerModelAssociations(availableModels, modelDefinitions);
      
      availableModels.sequelize= Sequelize;

      return availableModels;
    }
    catch(error) {
      console.error(error)
    }
  }

  get registeredModels() {
    return this.models;
  }

  static registerModelAttributes(Sequelize, modelDefinitions) {
    let models= [];

    Object.keys(modelDefinitions).forEach( (modelDefinition)=> {
      let modelAttributes= Database.adapterToSequelizeAttributes(modelDefinitions[modelDefinition].attributes);

      let modelConfig= modelDefinitions[modelDefinition].tableConfiguration;

      let appliedModel= Database.applySequelizeModel(Sequelize, {
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
      Database.setAssociationToSequelizeClassMethod(modelDefinitions[model].associations, appliedModels[model], appliedModels)
    })
      
  }

}

module.exports= Models.init();