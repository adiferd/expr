'use strict';

const Utils= require(`${process.env.PWD}/app/helpers/Utils`);

class Routes {
	constructor() {
		this.routeGroups= this.setRoutes();
	}

	async setRoutes() {
		try{
			var routesFilenames= await Utils.getDirectoryContentNames(__dirname)

			routesFilenames= Utils.bulkRemoveExtensionFromFilename(routesFilenames)

			var availableRouteGroups= [];

			routesFilenames.forEach( (routeGroupName, index)=> {
				availableRouteGroups[routeGroupName] = require(`${__dirname}/${routeGroupName}`)
			})

			availableRouteGroups= this.getRoutesEachGroup(availableRouteGroups)

			return availableRouteGroups;
		}
		catch(error) {
			console.error(error)
		}
	}

	get registeredRouteGroups() {
		return this.routeGroups;
	}

	getRoutesEachGroup(routeGroups) {
		let availableRoutes= []

		for (let key in routeGroups) {
			availableRoutes.push(routeGroups[key])
		}

		availableRoutes= availableRoutes.reduce( (currentGroup, nextGroup)=> {
			return currentGroup.concat(nextGroup)
		})

		return availableRoutes;
	}
}

module.exports= Routes;
