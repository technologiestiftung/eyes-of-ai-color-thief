const assert = require("node:assert").strict;
const { test, describe } = require("node:test");

const { findColor } = require("./find-color");
describe("findColor", () => {
	test("findColor returns the correct color name", () => {
		assert.strictEqual(findColor([255, 0, 0]), "red");
		assert.strictEqual(findColor([0, 128, 0]), "green");
		assert.strictEqual(findColor([0, 0, 255]), "blue");
		assert.strictEqual(findColor([0, 0, 0]), "black");
		assert.strictEqual(findColor([255, 255, 255]), "white");
		assert.strictEqual(findColor([128, 128, 128]), "gray");
	});

	test("findColor returns black when given invalid input", () => {
		const color = findColor([NaN, NaN, NaN]);
		assert.strictEqual(color, "black");
	});
});
