"use strict";

const Utils= require(`${process.env.PWD}/app/helpers/Utils`);

class Controllers {
	constructor() {
		this.controllers= this.setControllers();
	}

	async setControllers() {
		try {
			var controllerFilenames= await Utils.getDirectoryContentNames(__dirname)

			controllerFilenames= Utils.bulkRemoveExtensionFromFilename(controllerFilenames)

			var availableControllers= [];

			controllerFilenames.forEach( (ctrlName, index)=> {
				availableControllers[ctrlName] = require(`${__dirname}/${ctrlName}`)
			})

			return availableControllers;
		}
		catch(error) {
			console.error(error)
		}
	}

	get registeredControllers() {
		return this.controllers;
	}
}

module.exports= Controllers
