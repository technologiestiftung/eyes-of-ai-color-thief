//@ts-check
"use strict";
const assert = require("node:assert");
const { test, describe } = require("node:test");
const { createServer } = require("./server");

const colorResponse = {
	color: [128, 4, 4],
	palette: [[128, 4, 4]],
	names: ["maroon"],
};
describe("server", () => {
	test("should be able to run and give back a color", async () => {
		const server = createServer();

		const response = await server.inject({
			method: "POST",
			url: "/",
			body: {
				dataUrl:
					"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",
			},
		});
		assert.strictEqual(response.statusCode, 201);
		assert.strictEqual(typeof response.body, "string");
		assert.strictEqual(response.body, JSON.stringify(colorResponse));
		assert.strictEqual(
			response.headers["content-type"],
			"application/json; charset=utf-8",
		);
		assert.strictEqual(response.headers["access-control-allow-origin"], "*");
	});
});
