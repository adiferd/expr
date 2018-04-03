'use strict';
const ENV = process.env.NODE_ENV||'local';

const configPrefix= (ENV === 'local')?'/local':'';

const configFiles = require(`${process.env.PWD}/config${configPrefix}`);

class Config {
  static async apply() {
    const configs = await configFiles.getConfigFiles()
    this.attachConfig(configs)
    return true;
  }

  static attachConfig(configs) {
    for (let key in configs) {
      process.env[`__${key}`]= JSON.stringify(configs[key][ENV])
    }

    return true;
  }
}

module.exports = Config;
