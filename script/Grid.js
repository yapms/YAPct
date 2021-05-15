export default class Grid {
	static canvas = document.getElementById("compass");
	static ctx = Grid.canvas.getContext("2d");
	static axisColor = "#000000";
	static axisWidth = 3;

	static gridColor = "#000000";
	static gridWidth = 2;

	static borderColor = "#000000";
	static borderWidth = 0;

	static libRightColor = "#eeee55";
	static authRightColor = "#5555ee";
	static libLeftColor = "#55ee55";
	static authLeftColor = "#ee5555";

	static positionSize = 2.5;
	static positionWidth = 5;
	static positionColor = "#ff0000";

	static resize(width, height) {
		Grid.canvas.width = width;
		Grid.canvas.height = height;

		Grid.createGrid();
	}

	static createPosition(x, y) {
		const width = Grid.canvas.width;
		const height = Grid.canvas.height;
		x += 10;
		y *= -1;
		y += 10;
		Grid.ctx.fillStyle = Grid.positionColor;
		Grid.ctx.lineWidth = Grid.positionWidth;
		Grid.ctx.beginPath();
		Grid.ctx.arc(x * (width / 20), y * (height / 20), (width/20) / Grid.positionSize, 0, 2 * Math.PI);
		Grid.ctx.stroke();
		Grid.ctx.fill();
	}

	static createGrid() {
		const width = Grid.canvas.width;
		const height = Grid.canvas.height;
		Grid.ctx.fillStyle = Grid.authLeftColor;
		Grid.ctx.fillRect(0,0, width/2, height/2);

		Grid.ctx.fillStyle = Grid.authRightColor;
		Grid.ctx.fillRect(width/2, 0, width/2, height/2);

		Grid.ctx.fillStyle = Grid.libLeftColor;
		Grid.ctx.fillRect(0, height/2, width/2, height/2);

		Grid.ctx.fillStyle = Grid.libRightColor;
		Grid.ctx.fillRect(width/2, height/2, width/2, height/2);

		Grid.ctx.beginPath();
		Grid.ctx.strokeStyle = Grid.gridColor;
		Grid.ctx.lineWidth = Grid.gridWidth;
		for(let index = 1; index < 20; ++index) {
			let xpos = index * (width / 20);
			Grid.ctx.moveTo(xpos, 0);
			Grid.ctx.lineTo(xpos, height);
			let ypos = index * (height / 20);
			Grid.ctx.moveTo(0, ypos);
			Grid.ctx.lineTo(width, ypos);
		}
		Grid.ctx.stroke();

		Grid.ctx.strokeStyle = Grid.axisColor;
		Grid.ctx.lineWidth = Grid.axisWidth;

		Grid.ctx.beginPath();
		Grid.ctx.moveTo(0, height / 2);
		Grid.ctx.lineTo(width, height / 2);
		Grid.ctx.moveTo(width / 2, 0);
		Grid.ctx.lineTo(width / 2, height);
		Grid.ctx.stroke();
		
		Grid.ctx.strokeStyle = Grid.borderColor;
		Grid.ctx.lineWidth = Grid.borderWidth;
	}
}
