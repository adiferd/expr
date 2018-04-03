'use strict';
const Controllers = require(`${process.env.PWD}/app/controllers`);
const Middlewares = require(`${process.env.PWD}/app/middlewares`);
const Routes = require(`${process.env.PWD}/app/routes`);

const Utils = require(`${process.env.PWD}/app/helpers/Utils`);

class Routing {
  static async apply(server) {
    var availableRoutes= await this.getAvailableRoutes();
		var availableMiddlewares= await this.getAvailableMiddlewares();
		var availableControllers= await this.getAvailableControllers();

		this.attachRouteGroups(server, availableRoutes, availableControllers, availableMiddlewares);

		return true;
  }

  static getAvailableRoutes() {
		var routes= new Routes();

		return routes.registeredRouteGroups;
	}

	static getAvailableMiddlewares() {
		var middlewares= new Middlewares();

		return middlewares.registeredMiddlewares;
	}

	static getAvailableControllers() {
		var controllers= new Controllers();

		return controllers.registeredControllers
	}

  static attachRouteGroups(server, routeGroups, controllers, middlewares) {
		routeGroups.forEach( (routeGroup, index)=> {
			var appliedGroupMdlwrs= this.setGroupMiddlewares(routeGroup.middlewares)
			this.applyRoutes(server, routeGroup, appliedGroupMdlwrs, controllers, middlewares)
		})

		return true;
	}

	static setGroupMiddlewares(groupMiddlewares) {
		var appliedGroupMdlwrs= [];

		groupMiddlewares.forEach( (middlewares) => {
			appliedGroupMdlwrs.push(Utils.accessObjectPropertyByString(Mdlwr, middlewares))
		})

		return appliedGroupMdlwrs;
	}

	static applyRoutes(server, routeGroup, appliedGroupMiddlewares, controllers, middlewares) {
		try {
			routeGroup.routes.forEach( (endpoint) => {
				var method = endpoint[0]
				, url = endpoint[1]
				, target = endpoint[2]
				, routeMiddlewares = ( Array.isArray(endpoint[3]))?endpoint[3]:[]
				, appliedMdlwrs = [];

				routeMiddlewares.forEach( (mdlwr) => {
					appliedMdlwrs.push(Utils.accessObjectPropertyByString(middlewares, mdlwr))
				})

				const targetController= Utils.accessObjectPropertyByString(controllers, target);



				server[method](routeGroup.prefix+url, appliedGroupMiddlewares, appliedMdlwrs, targetController);
			})

			return true;
		}
		catch(error) {
			return false;
		}
	}

	static attachRouteToServer() {

	}
}

module.exports = Routing;
