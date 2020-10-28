const canvas = document.getElementById("compass_canvas");
const width = canvas.width;
const height = canvas.height;
var ctx = canvas.getContext("2d");

function createPosition(x, y) {
	x += 10;
	y *= -1;
	y += 10;
	ctx.fillStyle = "#ff0000";
	ctx.beginPath();
	ctx.arc(x * (width / 20), y * (height / 20), (width/20) / 3, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.fill();
}

function createGrid() {

	ctx.fillStyle = "#ee5555";
	ctx.fillRect(0,0, width/2, height/2);

	ctx.fillStyle = "#5555ee";
	ctx.fillRect(width/2, 0, width/2, height/2);

	ctx.fillStyle = "#55ee55";
	ctx.fillRect(0, height/2, width/2, height/2);

	ctx.fillStyle = "#ee55ee";
	ctx.fillRect(width/2, height/2, width/2, height/2);

	for(var index = 0; index < 21; ++index) {
		ctx.beginPath();
		if(index === 10) {
			ctx.lineWidth = 5;
		} else {
			ctx.lineWidth = 2;
		}

		var xpos = index * (width / 20);
		ctx.moveTo(xpos, 0);
		ctx.lineTo(xpos, height);
		var ypos = index * (height / 20);
		ctx.moveTo(0, ypos);
		ctx.lineTo(width, ypos);
		ctx.stroke();
	}
}

function main() {
	createGrid();
	createPosition(0, 0);
	createPosition(8.5, 8);
}

main();
