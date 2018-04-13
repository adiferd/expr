'use strict'

const Config = require(`${process.env.PWD}/app/helpers/Config`);
const Sequilize = require('sequelize')

class Database {
  static init() {
    try {
      const DBConfig = Config.get('database')

      return new Sequilize(
                        DBConfig.database
                      , DBConfig.username
                      , DBConfig.password
                      , DBConfig.setting
                    );
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  static adapterToSequelizeAttributes(attributes) {

		let sequelizeAttributes= {};

		Object.keys(attributes).forEach((attribute) => {
			let attributeConfig= attributes[attribute];

			if(typeof attributeConfig.defaultValue === 'function') {
				attributeConfig.defaultValue= Utils.accessObjectPropertyByString(
					sequelize,
					attributeConfig.defaultValue().toUpperCase()
				)
			}

			attributeConfig.type= Utils.accessObjectPropertyByString(sequelize, attributeConfig.type.toUpperCase());
			sequelizeAttributes[attribute]= attributeConfig;
		});

		return sequelizeAttributes;
	}

	static applySequelizeModel(sequelizeInstance, model) {
		try {
			return sequelizeInstance.define(model.name, model.attributes, model.tableConfiguration);
		}
		catch(error) {
			console.error(error)
		}
	}

	static setAssociationToSequelizeClassMethod(relationDefinition, modelToApply, models) {
		try {
			let appliedRelations= [];

			Object.keys(relationDefinition).forEach( (relation)=> {
				let relationType= relationDefinition[relation].type;

				delete relationDefinition[relation].type;

				appliedRelations.push(modelToApply[relationType](models[relation], relationDefinition[relation]))
			})

			return appliedRelations;
		}
		catch(error) {
			console.error(error);
			return error;
		}
	}
}

module.exports = Database;
