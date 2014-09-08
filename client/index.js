'use strict';

var xhr = require('./xhr')
  , sse = require('./sse');

module.exports = function (/*options*/) {
	var options = Object(arguments[1]);
	return function (deck) {
		sse(deck, options);
		xhr(deck, options);
	};
};
