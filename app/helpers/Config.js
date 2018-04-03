"use strict";

class Config {
	static get(configName) {
		return JSON.parse(process.env[`__${configName}`]);
	}
}

module.exports= Config;
