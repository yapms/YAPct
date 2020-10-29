const canvas = document.getElementById("compass");
var ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

var axisColor = "#000000";
var axisWidth = 3;

var gridColor = "#000000";
var gridWidth = 2;

var borderColor = "#000000";
var borderWidth = 0;

var libRightColor = "#eeee55";
var authRightColor = "#5555ee";
var libLeftColor = "#55ee55";
var authLeftColor = "#ee5555";

var positionSize = 2.5;
var positionWidth = 5;
var positionColor = "#ff0000";

function createPosition(x, y) {
	x += 10;
	y *= -1;
	y += 10;
	ctx.fillStyle = positionColor;
	ctx.lineWidth = positionWidth;
	ctx.beginPath();
	ctx.arc(x * (width / 20), y * (height / 20), (width/20) / positionSize, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.fill();
}

function createGrid() {
	ctx.fillStyle = authLeftColor;
	ctx.fillRect(0,0, width/2, height/2);

	ctx.fillStyle = authRightColor;
	ctx.fillRect(width/2, 0, width/2, height/2);

	ctx.fillStyle = libLeftColor;
	ctx.fillRect(0, height/2, width/2, height/2);

	ctx.fillStyle = libRightColor;
	ctx.fillRect(width/2, height/2, width/2, height/2);

	ctx.beginPath();
	ctx.strokeStyle = gridColor;
	ctx.lineWidth = gridWidth;
	for(var index = 1; index < 20; ++index) {
		var xpos = index * (width / 20);
		ctx.moveTo(xpos, 0);
		ctx.lineTo(xpos, height);
		var ypos = index * (height / 20);
		ctx.moveTo(0, ypos);
		ctx.lineTo(width, ypos);
	}
	ctx.stroke();

	ctx.strokeStyle = axisColor;
	ctx.lineWidth = axisWidth;

	ctx.beginPath();
	ctx.moveTo(0, height / 2);
	ctx.lineTo(width, height / 2);
	ctx.moveTo(width / 2, 0);
	ctx.lineTo(width / 2, height);
	ctx.stroke();
	
	ctx.strokeStyle = borderColor;
	ctx.lineWidth = borderWidth;

	/*
	ctx.beginPath();
	ctx.moveTo(0,0);
	ctx.lineTo(0,height);
	ctx.moveTo(0,0);
	ctx.lineTo(width,0);
	ctx.moveTo(width, height);
	ctx.lineTo(0, height);
	ctx.moveTo(width, height);
	ctx.lineTo(width, 0);
	ctx.stroke();
	*/
}
