import Grid from "./Grid.js";

const answers = ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"];

function calculateResult() {
	let left = 0, right = 0, up = 0, down = 0;
	const question_forms = document.getElementsByClassName("question_form");
	const length = question_forms.length;
	for(let index = 0; index < length; ++index) {
		const form = question_forms[index];
		for(let answer_index = 0; answer_index < 4; ++answer_index) {
			const input = form.childNodes[answer_index * 2];
			if(input.checked === true) {
				const social = parseFloat(input.getAttribute("social"));
				if(social < 0) {
					down += social * -1;
				} else {
					up += social;
				}
				const economic = parseFloat(input.getAttribute("economic"));
				if(economic < 0) {
					left += economic * -1;
				} else {
					right += economic 
				}
				break;
			}
		}
	}

	let x = left + right !== 0 ? 
		(right - left) * 10 / (left + right) : 0;
	let y = up + down !== 0 ?
		(up - down) * 10 / (up + down) : 0;
	
	Grid.createGrid();
	Grid.createPosition(x, y);
}

function answerQuestion(question, answer) {
	const questionDiv = document.getElementById(new String(question));
	questionDiv.style.backgroundColor = "#88dd88";
	for(let index = 0; index < 4; ++index) {
		let label = document.getElementById("q" + question + "i" + index + "_label");
		if(index === answer) {
			label.style.background = "#bbf";
		} else {
			label.style.background = "#ffffff";
		}
	}
	calculateResult();
}

function loadQuestions() {
	const questions = document.getElementById("questions");
	fetch("./data/questions.json")
	.then(res => {
		return res.json();
	})
	.then(json => {
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
			for(let index = 0; index < 4; ++index) {
				const button = document.createElement("input");
				button.setAttribute("type", "radio");
				button.setAttribute("id", "q" + new String(question) + "i" + new String(index));
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
				label.setAttribute("for", "q" + new String(question) + "i" + new String(index));
				label.setAttribute("id", "q" + new String(question) + "i" + new String(index) + "_label");
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
	Grid.createGrid();
	loadQuestions();
}

main();
