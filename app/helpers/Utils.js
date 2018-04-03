'use strict'
const fs= require(`fs`);

class Utils {
	static accessObjectPropertyByString(object, string) {
		try{
			if (typeof object === 'undefined' || typeof string === 'undefined') {
				throw new TypeError('object or string cannot be undefined')
			}

			string = string.replace(/\[(\w+)\]/g, '.$1')
			string = string.replace(/^\./, '')
			var properties = string.split('.')
			for (var i = 0, n = properties.length; i < n; ++i) {
				var processedProperty = properties[i]
				if (processedProperty in object) {
					object = object[processedProperty]
				}
				else {
					return null
				}
			}
			return object
		}
		catch(err){
			return err;
		}
	}

	static promisedFS(directoryPath) {
		const promisedFS = new Promise((resolve, reject)=>{
			fs.readdir(directoryPath, function (err, files) {
				if(err){
					return reject(err);
				}
				else {
					resolve(files)
				}
			});
		})

		return promisedFS;
	}

	static promisedFSStat(directoryPath) {
		const promisedFSStat = new Promise((resolve, reject)=>{
			fs.stat(directoryPath, function (err, file) {
				if(err){
					return reject(err);
				}
				else {
					resolve(file)
				}
			});
		})

		return promisedFSStat;
	}

	static async getDirectoryContentNames(directoryPath, exclude = []) {
		try {
			var filenames= await Utils.promisedFS(directoryPath)
			filenames= filenames.filter( filename=> {
				return (filename.split('.')[0] !== 'index' && exclude.indexOf(filename.split('.')[0]) <= -1)
			})

			return filenames;
		}
		catch(error) {
			console.log(error)
			return error;
		}
	}

	static removeExtensionFromFilename(filename) {
		return filename.split('.')[0];
	}

	static bulkRemoveExtensionFromFilename(filenames) {
		filenames.forEach((filename, index)=> {
			filenames[index]= filename.split('.')[0]
		})

		return filenames;
	}
}

module.exports= Utils;
