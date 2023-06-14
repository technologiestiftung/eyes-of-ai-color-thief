//@ts-check
"use strict";
const { resolve } = require("path");
const { readFileSync } = require("fs");
// export type RGB = [number, number, number];

// export type Color = {
// 	hex: string;
// 	name: string;
// 	rgb: RGB;
// };

/**
 * @param {[number, number, number]} a
 * @param {[number, number, number]} b
 */
function euclideanDistance(a, b) {
	const [a1, a2, a3] = a;
	const [b1, b2, b3] = b;

	return Math.sqrt(
		Math.pow(a1 - b1, 2) + Math.pow(a2 - b2, 2) + Math.pow(a3 - b3, 2),
	);
}

/**
 * @param {[number, number,number]} rgb
 * @returns {string}
 */
function findColor(rgb) {
	try {
		if (!Array.isArray(rgb) || rgb.length !== 3 || rgb.some(isNaN)) {
			throw new Error("Invalid input");
		}
		const content = readFileSync(
			resolve(__dirname, "../data/colors.json"),
			"utf8",
		);

		const namedColors = JSON.parse(content);
		let minDistance = Infinity;
		let closestColorIndex = -1;

		for (let i = 0; i < namedColors.length; i++) {
			const distance = euclideanDistance(rgb, namedColors[i].rgb);
			if (distance < minDistance) {
				minDistance = distance;
				closestColorIndex = i;
			}
		}

		return namedColors[closestColorIndex].name;
	} catch (error) {
		console.error(error);
		return "black";
	}
}

module.exports = { findColor };
