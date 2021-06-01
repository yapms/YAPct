import Grid from "./Grid.js";

const answers = ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"];

function calculateResult() {
	console.log("Calculating Results");
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

	console.log("X: " + x + " Y: " + y);
	Grid.clear();
	Grid.drawGrid();
	Grid.drawPosition(x, y);
}

function answerQuestion(question, answer) {
	console.log("Answering Question");
	const questionDiv = document.getElementById("q" + question);
	questionDiv.style.backgroundColor = "#88dd88";
	calculateResult();
}

function loadQuestions() {
	console.log("Loading Questions");
	const questionsDiv  = document.getElementById("questions");
	fetch("./data/questions.json")
	.then(res => {
		return res.json();
	})
	.then(json => {
		const questions = json["questions"];
		for(const questionIndex in questions) {
			const question = questions[questionIndex];
			const questionDiv = document.createElement("div");
			questionDiv.setAttribute("id", "q" + questionIndex);
			questionDiv.setAttribute("class", "question");

			const questionHeader = document.createElement("h3");
			const questionHeaderText = document.createTextNode(question["text"]);
			questionHeader.append(questionHeaderText);
			questionDiv.append(questionHeader);

			const form = document.createElement("form");
			form.setAttribute("id", "q" + questionIndex + "f");
			form.setAttribute("class", "question_form");
			form.setAttribute("question_number", "q" + questionIndex);

			const answers = question["answers"];
			for(const answerIndex in answers) {
				const answer = answers[answerIndex];
				const button = document.createElement("input");
				button.setAttribute("id", "q" + new String(questionIndex) + "a" + new String(answerIndex));
				button.setAttribute("type", "radio");
				button.setAttribute("social", answer["social"]);
				button.setAttribute("economic", answer["economy"]);
				button.setAttribute("class", "answer_button");
				button.setAttribute("name", "q" + questionIndex);
				button.style.display = "none";
				button.addEventListener("click", (function() {
					const q = questionIndex;
					const a = answerIndex;
					return function() {
						answerQuestion(q, a);
					}
				})());
				form.append(button);

				const label = document.createElement("label");
				label.setAttribute("id", "q" + new String(questionIndex) + "a" + new String(answerIndex) + "_label");
				label.setAttribute("for", "q" + new String(questionIndex) + "a" + new String(answerIndex));
				label.setAttribute("class", "answer_label");

				const text = document.createTextNode(answer["text"]);
				label.append(text);
				form.append(label);
			}

			questionDiv.append(form);
			questionsDiv.append(questionDiv);
		}
	});
}

function main() {
	Grid.initialize();
	Grid.drawGrid();
	loadQuestions();
}

main();
