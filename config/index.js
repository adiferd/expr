"use strict";

const Utils= require(`${process.env.PWD}/app/helpers/Utils`);

class ConfigFiles {
	constructor() {
		this.configFiles= this.getConfigFiles();
	}

	async getConfigFiles() {
		try {
			var configFilenames= await Utils.getDirectoryContentNames(__dirname, ['local'])

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

	get registeredConfigFiles() {
		return this.configFiles;
	}
}

module.exports= ConfigFiles
