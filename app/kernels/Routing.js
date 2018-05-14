'use strict';
const Controllers = require(`${process.env.PWD}/app/controllers`);
const Middlewares = require(`${process.env.PWD}/app/middlewares`);
const Routes = require(`${process.env.PWD}/app/routes`);
const Validator = require(`${process.env.PWD}/app/validators`)

const Utils = require(`${process.env.PWD}/app/helpers/Utils`);

class Routing {
  static async apply(server) {
    var availableRoutes= await this.getAvailableRoutes();
		var availableMiddlewares= await this.getAvailableMiddlewares();
		var availableControllers= await this.getAvailableControllers();
    var availableValidators = await this.getAvailableValidators();

		this.attachRouteGroups(server, availableRoutes, availableControllers, availableMiddlewares, availableValidators);

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

  static getAvailableValidators() {
    var validators= new Validator();

    return validators.registeredValidators
  }

  static attachRouteGroups(server, routeGroups, controllers, middlewares, validators) {
		routeGroups.forEach( (routeGroup, index)=> {
			var appliedGroupMdlwrs= this.setGroupMiddlewares(routeGroup.middlewares, middlewares);
			this.applyRoutes(server, routeGroup, appliedGroupMdlwrs, controllers, middlewares, validators);
		})

		return true;
	}

	static setGroupMiddlewares(groupMiddlewares, availableMiddlewares) {
		var appliedGroupMdlwrs= [];

		groupMiddlewares.forEach( (middlewares) => {
			appliedGroupMdlwrs.push(Utils.accessObjectPropertyByString(availableMiddlewares, middlewares))
		})

		return appliedGroupMdlwrs;
	}

	static applyRoutes(server, routeGroup, appliedGroupMiddlewares, controllers, middlewares, validators) {
		try {
			routeGroup.routes.forEach( (route) => {
        let method= route.method;
        let url= route.url;
        let targetController= route.controller;
        let targetValidator= route.validator;

        let routeMiddlewares = ( Array.isArray(route.middlewares))?route.middlewares:[],
        appliedMdlwrs = [];

				routeMiddlewares.forEach( (mdlwr) => {
					appliedMdlwrs.push(Utils.accessObjectPropertyByString(middlewares, mdlwr))
				})

				targetController= Utils.accessObjectPropertyByString(controllers, targetController);

        if (targetValidator != null) {
          targetValidator= Utils.accessObjectPropertyByString(validators, targetValidator);
        }
        else {
          targetValidator= {};
        }


        // TODO: Add Target validator on router
				server[method](routeGroup.prefix+url ,appliedGroupMiddlewares, appliedMdlwrs, targetController);
			})

			return true;
		}
		catch(error) {
      // console.log(error);
			return false;
		}
	}

	static attachRouteToServer() {

	}
}

module.exports = Routing;
