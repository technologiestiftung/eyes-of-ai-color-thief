const { resolve } = require("path");

const ColorThief = require("colorthief");
var fs = require("fs");
const dataUrl =
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
const buffer = Buffer.from(dataUrl.split(",")[1], "base64");

fs.writeFileSync("data.png", buffer);
const img = resolve(process.cwd(), "data.png");

ColorThief.getColor(img)
	.then((color) => {
		console.log(color);
	})
	.catch((err) => {
		console.log(err);
	});

ColorThief.getPalette(img, 5)
	.then((palette) => {
		console.log(palette);
	})
	.catch((err) => {
		console.log(err);
	});
