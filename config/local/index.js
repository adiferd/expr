"use strict";

const Utils= require(`${process.env.PWD}/app/helpers/Utils`);

class ConfigFiles {
	static async getConfigFiles() {
		try {
			var configFilenames= await Utils.getDirectoryContentNames(__dirname)

			configFilenames= Utils.bulkRemoveExtensionFromFilename(configFilenames)

			var availableConfigs= [];

			configFilenames.forEach( (configName, index)=> {
				availableConfigs[configName] = require(`${__dirname}/${configName}`)
			})

			return availableConfigs;
		}
		catch(error) {
			console.error(error)
		}
	}
}

module.exports= ConfigFiles;
