const answers = ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"];
var questionData;

function calculateResult() {
	var left = 0;
	var right = 0;
	var up = 0;
	var down = 0;
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

	var x = 0;
	var y = 0;
	var denominator = left + right;
	if(denominator !== 0) {
		x = (right - left) * 10 / (left + right);
	}
	denominator = up + down;
	if(denominator !== 0) {
		y =  (up - down) * 10 / (up + down);
	}
	
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

function main() {
	createGrid();
	loadQuestions();
}

main();
