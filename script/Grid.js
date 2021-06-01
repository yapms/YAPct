export default class Grid {

	static initialize() {
		console.log("Initialize Grid");
		Grid.canvas = document.getElementById("compass");
		Grid.ctx = Grid.canvas.getContext("2d");
		Grid.width = Grid.canvas.width;
		Grid.height = Grid.canvas.height;
		Grid.ctx.translate(Grid.width / 2, Grid.height / 2);
		Grid.shrink = 0.95;
		Grid.axisColor = "#000000";
		Grid.axisWidth = 3;

		Grid.arcRadius = 20;
		Grid.outlineColor = "#000000";
		Grid.outlineWidth = 3;

		Grid.gridColor = "#000000";
		Grid.gridWidth = 2;

		Grid.borderColor = "#000000";
		Grid.borderWidth = 0;

		Grid.libRightColor = "#eeee55";
		Grid.authRightColor = "#5555ee";
		Grid.libLeftColor = "#55ee55";
		Grid.authLeftColor = "#ee5555";

		Grid.positionSize = 2.5;
		Grid.positionWidth = 5;
		Grid.positionColor = "#ff0000";
	}

	static clear() {
		console.log("Clear Grid");
		Grid.ctx.clearRect(-Grid.width/2, -Grid.height/2, Grid.width, Grid.height);
	}

	static drawPosition(x, y) {
		console.log("Draw Position");
		//x += 10;
		y *= -1;
		//y += 10;
		Grid.ctx.fillStyle = Grid.positionColor;
		Grid.ctx.lineWidth = Grid.positionWidth;
		Grid.ctx.beginPath();
		Grid.ctx.arc(
			x * (Grid.width / 20) * Grid.shrink, 
			y * (Grid.height / 20) * Grid.shrink, 
			(Grid.width/20) / Grid.positionSize,
			0,
			2 * Math.PI);
		Grid.ctx.stroke();
		Grid.ctx.fill();
	}

	static drawGrid() {
		console.log("Draw Grid");
		Grid.ctx.strokeStyle = Grid.outlineColor;
		Grid.ctx.lineWidth = Grid.outlineWidth;

		/* AUTH LEFT */ 
		Grid.ctx.fillStyle = Grid.authLeftColor;
		Grid.ctx.beginPath();
		Grid.ctx.moveTo(-Grid.width / 2 * Grid.shrink, 0);
		Grid.ctx.lineTo(0,0);
		Grid.ctx.lineTo(0, -Grid.height / 2 * Grid.shrink);
		Grid.ctx.arcTo(-Grid.width / 2 * Grid.shrink, -Grid.height / 2 * Grid.shrink,
			-Grid.width / 2 * Grid.shrink, 0,
			Grid.arcRadius);
		Grid.ctx.closePath();
		Grid.ctx.fill();
		Grid.ctx.stroke();

		/* AUTH RIGHT */
		Grid.ctx.fillStyle = Grid.authRightColor;
		Grid.ctx.beginPath();
		Grid.ctx.moveTo(Grid.width / 2 * Grid.shrink, 0);
		Grid.ctx.lineTo(0, 0);
		Grid.ctx.lineTo(0, -Grid.height / 2 * Grid.shrink);
		Grid.ctx.arcTo(Grid.width / 2 * Grid.shrink, -Grid.height / 2 * Grid.shrink,
			Grid.width / 2 * Grid.shrink, 0,
			Grid.arcRadius);
		Grid.ctx.closePath();
		Grid.ctx.fill();
		Grid.ctx.stroke();

		/* LIB LEFT */
		Grid.ctx.fillStyle = Grid.libLeftColor;
		Grid.ctx.beginPath();
		Grid.ctx.moveTo(-Grid.width / 2 * Grid.shrink, 0);
		Grid.ctx.lineTo(0,0);
		Grid.ctx.lineTo(0, Grid.height / 2 * Grid.shrink);
		Grid.ctx.arcTo(-Grid.width / 2 * Grid.shrink, Grid.height / 2 * Grid.shrink,
			-Grid.width / 2 * Grid.shrink, 0,
			Grid.arcRadius);
		Grid.ctx.closePath();
		Grid.ctx.fill();
		Grid.ctx.stroke();

		/* LIB RIGHT */
		Grid.ctx.fillStyle = Grid.libRightColor;
		Grid.ctx.beginPath();
		Grid.ctx.moveTo(Grid.width / 2 * Grid.shrink, 0);
		Grid.ctx.lineTo(0, 0);
		Grid.ctx.lineTo(0, Grid.height / 2 * Grid.shrink);
		Grid.ctx.arcTo(Grid.width / 2 * Grid.shrink, Grid.height / 2 * Grid.shrink,
			Grid.width / 2 * Grid.shrink, 0,
			Grid.arcRadius);
		Grid.ctx.closePath();
		Grid.ctx.fill();
		Grid.ctx.stroke();

		/* GRID */
		Grid.ctx.beginPath();
		Grid.ctx.strokeStyle = Grid.gridColor;
		Grid.ctx.lineWidth = Grid.gridWidth;
		for(let index = 1; index < 20; ++index) {
			const xpos = (index * (Grid.width/20) - (Grid.width/2)) * Grid.shrink;
			Grid.ctx.moveTo(xpos, -Grid.height/2 * Grid.shrink);
			Grid.ctx.lineTo(xpos, Grid.height/2 * Grid.shrink);
			const ypos = (index * (Grid.height / 20) - (Grid.height/2)) * Grid.shrink;
			Grid.ctx.moveTo(-Grid.width/2 * Grid.shrink, ypos);
			Grid.ctx.lineTo(Grid.width/2 * Grid.shrink, ypos);
		}
		Grid.ctx.stroke();
	}
}
