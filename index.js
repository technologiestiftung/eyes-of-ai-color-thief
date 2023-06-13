//@ts-check

const fastify = require("fastify");
const { v4: uuidv4 } = require("uuid");
const { resolve } = require("path");
const ColorThief = require("colorthief");
const { writeFileSync, unlinkSync } = require("fs");
const { findColor } = require("./lib/find-color");

const { ADDRESS = "localhost", PORT = "3000" } = process.env;
if (!ADDRESS || !PORT) {
	throw new Error("ADDRESS and PORT env variables must be set");
}
const server = fastify();
server.post("/", {
	schema: {
		body: {
			type: "object",
			properties: {
				dataUrl: { type: "string" },
			},
			required: ["dataUrl"],
		},
	},

	handler: async (request, _reply) => {
		// @ts-ignore
		const { dataUrl } = request.body;
		try {
			const buffer = Buffer.from(dataUrl.split(",")[1], "base64");
			const filename = uuidv4();
			writeFileSync(`./images/${filename}.png`, buffer);
			const img = resolve(process.cwd(), `./images/${filename}.png`);

			// @ts-ignore
			const color = await ColorThief.getColor(img);
			/**
			 * @type {[number, number, number][]}
			 */
			// @ts-ignore
			const palette = await ColorThief.getPalette(img, 3);
			unlinkSync(img);
			const names = palette.map((colors) => {
				return findColor(colors);
			});
			return { color, palette, names };
		} catch (error) {
			console.log(error);
			if (error instanceof Error) {
				return { error: error.message };
			} else {
				return { error: "Unknown error" };
			}
		}
	},
});

server.listen({ host: ADDRESS, port: parseInt(PORT) }, (err, address) => {
	if (err) throw err;
	console.log(`Server listening on ${address}`);
});
