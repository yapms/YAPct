const canvas = document.getElementById("compass");
var ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

const answers = ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"];
var questionData;

function calculateResult() {
	var left = 1;
	var right = 1;
	var up = 1;
	var down = 1;
	const question_forms = document.getElementsByClassName("question_form");
	const length = question_forms.length;
	for(var index = 0; index < length; ++index) {
		const form = question_forms[index];
		for(var answer_index = 0; answer_index < 4; ++answer_index) {
			const input = form.childNodes[answer_index * 2];
			if(input.checked === true) {
				var social = parseFloat(input.getAttribute("social"));
				if(social < 0) {
					down += social * -1;
				} else {
					up += social;
				}
				var economic = parseFloat(input.getAttribute("economic"));
				if(economic < 0) {
					left += economic * -1;
				} else {
					right += economic 
				}
				break;
			}
		}
	}

	const x = (right - left) * 10 / (left + right);
	const y = (up - down) * 10 / (up + down);
	
	createGrid();
	createPosition(x, y);

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
	calculateResult();
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
			form.setAttribute("class", "question_form");
			form.setAttribute("question_number", new String(question));
			for(var index = 0; index < 4; ++index) {
				const button = document.createElement("input");
				button.setAttribute("type", "radio");
				button.setAttribute("id", new String(question) + new String(index));
				console.log(answers[index].toLowerCase());
				button.setAttribute("social", json[question][answers[index].toLowerCase()]["social"]);
				button.setAttribute("economic", json[question][answers[index].toLowerCase()]["economy"]);
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
	loadQuestions();
}

main();
