const canvas = document.getElementById("compass");
var ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

const answers = ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"];
var questionData;

function calculateResult() {
	
}

function answerQuestion(question, answer) {
	var questionDiv = document.getElementById(new String(question));
	questionDiv.style.backgroundColor = "#66dd66";
	for(var index = 0; index < 4; ++index) {
		var label = document.getElementById(question + index + "_label");
		if(index === answer) {
			label.style.background = "#999999";
		} else {
			label.style.background = "#ffffff";
		}
	}
}

function loadQuestions() {
	const questions = document.getElementById("questions");
	$.getJSON("questions.json", function(json) {
		questionData = json;
		for(const question in json) {
			const questionDiv = document.createElement("div");
			questionDiv.setAttribute("class", "question");
			questionDiv.setAttribute("id", new String(question));
			const questionHeader = document.createElement("h3");
			const questionHeaderText = document.createTextNode(json[question].text);
			questionHeader.append(questionHeaderText);
			questionDiv.append(questionHeader);

			const form = document.createElement("form");
			for(var index = 0; index < 4; ++index) {
				const button = document.createElement("input");
				button.setAttribute("type", "radio");
				button.setAttribute("id", new String(question) + new String(index));
				button.setAttribute("social", "-1");
				button.setAttribute("economic", "1");
				button.setAttribute("class", "answer_button");
				button.setAttribute("name", new String(question));
				button.style.display = "none";
				button.addEventListener("click", (function() {
					const q = question;
					const a = index;
					return function() {
						answerQuestion(q, a);
					}
				})());
				form.append(button);

				const label = document.createElement("label");
				label.setAttribute("for", new String(question) + new String(index));
				label.setAttribute("id", new String(question) + new String(index) + "_label");
				label.setAttribute("class", "answer_label");
				const text = document.createTextNode(answers[index]);
				label.append(text);
				form.append(label);
			}

			questionDiv.append(form);
			questions.append(questionDiv);
		}
	});
}

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

	ctx.lineWidth = 2;
	ctx.beginPath();
	for(var index = 0; index < 21; ++index) {
		var xpos = index * (width / 20);
		ctx.moveTo(xpos, 0);
		ctx.lineTo(xpos, height);
		var ypos = index * (height / 20);
		ctx.moveTo(0, ypos);
		ctx.lineTo(width, ypos);
	}
	ctx.stroke();
}

function main() {
	createGrid();
	createPosition(0, 0);
	createPosition(8.5, 8);
	loadQuestions();
}

main();
