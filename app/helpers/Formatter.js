'use strict'

class Formatter {
	static toSingleResponse(data, message, error) {
		return {
			result: data
			, message: message
			, error: (error!=null)?error:null
		};
	}

	static toPaginatedResponse(data, message, error) {
		const result = {
			items: data.values
			, length : parseInt(data.length)
			, start : parseInt(data.start)
			, remaining: parseInt(data.totalData) - parseInt(data.start) + parseInt(data.length)
		}

		return {
			result: result
			, message: message
			, error: (error!=null)?error:null
		};
	}
}

module.exports= Formatter;
