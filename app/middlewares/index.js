'use strict';

const Utils= require(`${process.env.PWD}/app/helpers/Utils`);

class Middlewares {
	constructor() {
		this.middlewares= this.setMiddlewares();
	}

	async setMiddlewares() {
		try {
			var middlewareFilenames= await Utils.getDirectoryContentNames(__dirname)

			middlewareFilenames= Utils.bulkRemoveExtensionFromFilename(middlewareFilenames)

			var availableMiddlewares= [];

			middlewareFilenames.forEach( (middlewareName, index)=> {
				availableMiddlewares[middlewareName] = require(`${__dirname}/${middlewareName}`)
			})

			return availableMiddlewares;
		}
		catch(error) {
			console.error(error)
		}
	}

	get registeredMiddlewares() {
		return this.middlewares;
	}
}

module.exports= Middlewares
