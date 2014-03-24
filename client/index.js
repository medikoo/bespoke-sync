'use strict';

var xhr = require('./xhr')
  , sse = require('./sse');

module.exports = function (deck/*, options*/) {
	var options = Object(arguments[1]);
	sse(deck, options);
	xhr(deck, options);
};
