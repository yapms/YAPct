export default class Grid {

	static initialize() {
		console.log("Initialize Grid");
		Grid.canvas = document.getElementById("compass");
		Grid.ctx = Grid.canvas.getContext("2d");
		Grid.width = Grid.canvas.width;
		Grid.height = Grid.canvas.height;
		Grid.axisColor = "#000000";
		Grid.axisWidth = 3;

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

	static drawPosition(x, y) {
		console.log("Draw Position");
		x += 10;
		y *= -1;
		y += 10;
		Grid.ctx.fillStyle = Grid.positionColor;
		Grid.ctx.lineWidth = Grid.positionWidth;
		Grid.ctx.beginPath();
		Grid.ctx.arc(x * (Grid.width / 20), y * (Grid.height / 20), 
			(Grid.width/20) / Grid.positionSize, 0,
			2 * Math.PI);
		Grid.ctx.stroke();
		Grid.ctx.fill();
	}

	static drawGrid() {
		console.log("Draw Grid");
		Grid.ctx.fillStyle = Grid.authLeftColor;
		Grid.ctx.fillRect(0,0, Grid.width/2, Grid.height/2);

		Grid.ctx.fillStyle = Grid.authRightColor;
		Grid.ctx.fillRect(Grid.width/2, 0, Grid.width/2, Grid.height/2);

		Grid.ctx.fillStyle = Grid.libLeftColor;
		Grid.ctx.fillRect(0, Grid.height/2, Grid.width/2, Grid.height/2);

		Grid.ctx.fillStyle = Grid.libRightColor;
		Grid.ctx.fillRect(Grid.width/2, Grid.height/2, Grid.width/2, Grid.height/2);

		Grid.ctx.beginPath();
		Grid.ctx.strokeStyle = Grid.gridColor;
		Grid.ctx.lineWidth = Grid.gridWidth;
		for(let index = 1; index < 20; ++index) {
			const xpos = index * (Grid.width / 20);
			Grid.ctx.moveTo(xpos, 0);
			Grid.ctx.lineTo(xpos, Grid.height);
			const ypos = index * (Grid.height / 20);
			Grid.ctx.moveTo(0, ypos);
			Grid.ctx.lineTo(Grid.width, ypos);
		}
		Grid.ctx.stroke();

		Grid.ctx.strokeStyle = Grid.axisColor;
		Grid.ctx.lineWidth = Grid.axisWidth;

		Grid.ctx.beginPath();
		Grid.ctx.moveTo(0, Grid.height / 2);
		Grid.ctx.lineTo(Grid.width, Grid.height / 2);
		Grid.ctx.moveTo(Grid.width / 2, 0);
		Grid.ctx.lineTo(Grid.width / 2, Grid.height);
		Grid.ctx.stroke();
		
		Grid.ctx.strokeStyle = Grid.borderColor;
		Grid.ctx.lineWidth = Grid.borderWidth;
	}
}
