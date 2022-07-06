class FortuneAnswer {
	constructor(ans_type, ans) {
		this.answer_type = ans_type;
		this.answer = ans;
	}

	get is_positive() {return this.answer_type == 0}
	get is_negative() {return this.answer_type == 1}
	get is_neutral() {return this.answer_type == 2}

}

let responses = [
	new FortuneAnswer(0, "Absolutely!"),
	new FortuneAnswer(1, "Very<br />Doubtful"),
	new FortuneAnswer(2, "Be Careful<br />What You<br />Wish<br />For"),
	new FortuneAnswer(2, "Sorry...<br />Shake<br />again"),
	new FortuneAnswer(0, "Do cows<br />moo?"),
	new FortuneAnswer(2, "50% Chance<br />of Yes"),
	new FortuneAnswer(1, "Not Looking Good"),
	new FortuneAnswer(2, "Maybe;<br />Maybe<br />not."),
	new FortuneAnswer(0, "No<br />Doubt!"),
	new FortuneAnswer(2, "Let Me Think<br />About it."),
	new FortuneAnswer(0, "Positive<br />Vibes."),
	new FortuneAnswer(1, "Sources<br />say No."),
	new FortuneAnswer(2, "User Error.<br />Try<br />Again."),
	new FortuneAnswer(2, "Definitely<br />Maybe"),
	new FortuneAnswer(0, "Prospects<br />Great."),
	new FortuneAnswer(1, "My reply<br />is No"),
	new FortuneAnswer(2, "Possibly"),
	new FortuneAnswer(1, "No<br />Way"),
	new FortuneAnswer(0, "Do<br />Spiders<br />Bark?"),
	new FortuneAnswer(0, "Affirmative."),
	new FortuneAnswer(0, "YEP!"),
	new FortuneAnswer(0, "YES."),
	new FortuneAnswer(1, "NO."),
	new FortuneAnswer(1, "Umm...<br />No."),
	new FortuneAnswer(1, "Better<br />Odds In<br />Vegas."),
	new FortuneAnswer(2, "Can't<br />predict<br />now"),
	new FortuneAnswer(0, "Seems<br />Probable"),
];

let triangle = document.getElementById("triangle");
let answer = document.getElementById("response");
let ball = document.getElementById("ball");
let answerOpacity = 0;
let alreadyAsked = false;
let question = document.getElementById("question");

// Control the type of answer allowed/given
let controlledAnswerType = "any";

// Add keyboard event listener for ENTER
question.addEventListener("keydown", enter_pressed);


function enter_pressed(event) {
	//console.log(event);
	if (event.keyCode == 13) {
		if (question.value.length >= 1) {
			ask();
		}
		question.blur();
	}
}

function ask() {
	if (alreadyAsked == false) {
		alreadyAsked = true; 	// prevent invocation if active
		answer.innerHTML = "";	// clear previous answer
		answerOpacity = 0;		// 'hide' the answer
		answer.style.opacity = `${answerOpacity}%`;
		triangle.style.opacity = `${answerOpacity}%`;
		let time = 100;
		if (question.value.length >= 1 && question.value.substr(question.value.length-1) != "?") {
			question.value += "?";
		}
		for (i=1;i<=10;i++) {
			setTimeout(
				  i % 2 == 1 ? shakeleft
				: i % 2 == 0 && i != 10 ? shakeright
				: display,
				time * i
			);
		}
	}
}
function shakeleft() {
	ball.style.left = "45%";
}

function shakeright() {
	ball.style.left = "55%";
}

// document.getElementById("description").addEventListener(
	// "click",
	// event => {console.log(Math.floor(Math.random() * (responses.length + 1)))}
// );


function r(min=0, max=24) {
	let rnum = min + Math.floor(
		Math.random() * ((max+1) - min)
	);
	console.log(rnum);
}


function display() {
	// build valid responses
	let validResponses = [];
	for (let resp of responses) {
		if (controlledAnswerType == "any" || resp[`is_${controlledAnswerType}`]) {
			validResponses.push(resp);
		}
	}

	let x = Math.floor(Math.random() * validResponses.length);
	// console.log(x, responses[x]);
	// ball.style.left = "50%"; 	// Re-center image
	ball.style.left = "initial"; 	// Re-center image
	answer.innerHTML = validResponses[x].answer; //Displays random response
	rvlanswer = setInterval(reveal, 80);
}

function reveal() {
	answerOpacity += 10;
	triangle.style.opacity = `${answerOpacity}%`;
	answer.style.opacity = `${answerOpacity}%`;
	if (answerOpacity == 100) {
		clearInterval(rvlanswer);
		alreadyAsked = false;
	}
}