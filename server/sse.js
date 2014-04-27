'use strict';

var forEach = require('es5-ext/object/for-each')
  , parse   = require('url').parse

  , count = 0;

module.exports = function (/* options */) {
	var clients = {}, handler, log = Object(arguments[0]).log;

	handler = function (req, res) {
		var client, id = parse(req.url, true).query.id;

		if (!id) {
			console.error("Cannot setup server stream. Client id not provided");
			res.writeHead(400);
			res.end();
			return;
		}

		req.socket.setTimeout(0);
		res.writeHead(200, {
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			'Connection': 'keep-alive'
		});
		res.write('id\n\n');

		console.log("Client connected:", req.headers['user-agent'] || '');

		client = { req: req, res: res };
		clients[id] = client;

		req.on('close', function () { delete clients[id]; });
	};

	handler.notify = function (senderId, data) {
		forEach(clients, function (client, id) {
			if (senderId === id) return;
			if (log) console.log("Notified: " + id);
			client.res.write('data: ' + data + '\nid:' + (++count) + '\n\n');
		});
	};

	return handler;
};
