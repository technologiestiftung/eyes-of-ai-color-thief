//@ts-check
"use strict";
const { createServer } = require("./lib/server");
const server = createServer();

const { ADDRESS = "localhost", PORT = "8080" } = process.env;
if (!ADDRESS || !PORT) {
	throw new Error("ADDRESS and PORT env variables must be set");
}

server.listen({ host: ADDRESS, port: parseInt(PORT) }, (err, address) => {
	if (err) throw err;
	console.log(`Server listening on ${address}`);
});
