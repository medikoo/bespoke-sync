'use strict';

var parse = require('url').parse
  , sse   = require('./sse')
  , xhr   = require('./xhr');

module.exports = function (/* options */) {
	var options = Object(arguments[0])
	  , ssePath = options.ssePath || '/sse-slides/'
	  , xhrPath = options.xhrPath || '/slide/'
	  , sseHandler = sse(options), xhrHandler = xhr(sseHandler.notify, options);

	return function (req, res, next) {
		var path = parse(req.url).pathname;
		if (path === ssePath) sseHandler(req, res);
		else if (path === xhrPath) xhrHandler(req, res);
		else next();
	};
};
