//@ts-check
"use strict";
const fastify = require("fastify");
const { v4: uuidv4 } = require("uuid");
const { resolve } = require("path");
const ColorThief = require("colorthief");
const { writeFileSync, unlinkSync } = require("fs");
const { findColor } = require("./find-color");
const { mkdirp } = require("mkdirp");
function createServer(opts = {}) {
	const server = fastify(opts);
	server.post("/", {
		schema: {
			body: {
				type: "object",
				properties: {
					dataUrl: { type: "string" },
					numberOfColors: {
						type: "number",
						default: 5,
						minimum: 1,
						maximum: 10,
					},
				},
				required: ["dataUrl"],
			},
		},

		handler: async (request, reply) => {
			// @ts-ignore
			const { dataUrl, numberOfColors = 5 } = request.body;
			try {
				const buffer = Buffer.from(dataUrl.split(",")[1], "base64");
				const filename = uuidv4();
				// return value is the first directory created
				const made = mkdirp.sync(resolve(process.cwd(), `./images/`));
				console.log(`made directories, starting with ${made}`);
				const imgPath = resolve(process.cwd(), `./images/${filename}.png`);
				writeFileSync(imgPath, buffer);

				// @ts-ignore
				const color = await ColorThief.getColor(imgPath);
				/**
				 * @type {[number, number, number][]}
				 */
				// @ts-ignore
				const palette = await ColorThief.getPalette(imgPath, numberOfColors);
				unlinkSync(imgPath);
				const names = palette.map((colors) => {
					return findColor(colors);
				});

				return reply.status(201).send({ color, palette, names });
			} catch (error) {
				console.log(error);
				if (error instanceof Error) {
					return reply.status(500).send({ error: error.message });
				} else {
					return reply.status(500).send({ error: "Unknown error" });
				}
			}
		},
	});

	return server;
}

module.exports = { createServer };
