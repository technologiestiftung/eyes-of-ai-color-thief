// import json assert
import fs from "fs";
import basicColors from "./basic-colors.json" assert { type: "json" };
import extendedColors from "./extended-colors.json" assert { type: "json" };
// console.log(basicColors);
// console.log(extendedColors);

const convert = (color) => {
	return {
		hex: color["Hex rgb"],
		name: color["Color name"],
		rgb: [color["Decimal"].split(",").map(Number)].flat(),
	};
};
const colors = [
	...basicColors.colors.map(convert),
	...extendedColors.colors.map(convert),
];
console.log(colors);
fs.writeFileSync("./data/colors.json", JSON.stringify(colors, null, 2));
