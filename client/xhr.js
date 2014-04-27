'use strict';

var forEach  = require('es5-ext/object/for-each')
  , isObject = require('es5-ext/object/is-object')
  , encode   = require('querystring/encode')
  , id       = require('./id')

  , stringify = JSON.stringify;

module.exports = function (deck/*, options*/) {
	var options = Object(arguments[1])
	  , path = (options.xhrPath || '/slide/') + '?id=' + id;
	deck.on('activate', function (e) {
		var result = {}, xhr;
		if (e.server) return;
		forEach(e, function (value, key) {
			if (isObject(value)) return;
			result[key] = value;
		});
		xhr = new XMLHttpRequest();
		xhr.open('POST', path, true);
		xhr.send(encode({ data: stringify(result) }));
		if (options.log) console.log("Client[" + id + "] -> Server", result);
	});
};
