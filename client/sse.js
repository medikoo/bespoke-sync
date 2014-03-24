'use strict';

var id     = require('./id')
  , decode = require('querystring/decode')

  , parse  = JSON.parse;

module.exports = function (deck/*, options*/) {
	var options = Object(arguments[1])
	  , path = options.ssePath || '/sse-slides/'
	  , source = new EventSource(path + '?id=' + id);

	if (options.log) {
		source.onopen = function () {
			console.log("Server connection: Open");
		};
		source.onerror = function () {
			console.error("Server connection: Error");
		};
	}

	source.onmessage = function (event) {
		var data = parse(decode(event.data.trim()).data);
		if (options.log) console.log("Server -> Client[" + id + "]", data);
		data.server = true;
		deck.slide(data.index, data);
	};
};
