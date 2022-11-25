class FortuneAnswer {
	constructor(ans_type, ans) {
		this.answer_type = ans_type;
		this.answer = ans;
	}

	get is_positive() {return this.answer_type == 0}
	get is_negative() {return this.answer_type == 1}
	get is_neutral() {return this.answer_type == 2}
	get is_any() {return true};

}

let responses = [
	new FortuneAnswer(0, "Absolutely!"),
	new FortuneAnswer(1, "Inconceiv-able!"),
	new FortuneAnswer(2, "Be Careful<br />What You<br />Wish<br />For"),
	new FortuneAnswer(2, "Sorry...<br />Shake<br />again"),
	new FortuneAnswer(0, "Do cows<br />moo?"),
	new FortuneAnswer(2, "50% Chance<br />of Yes"),
	new FortuneAnswer(1, "Not Looking Good"),
	new FortuneAnswer(2, "Maybe;<br />Maybe<br />not."),
	new FortuneAnswer(0, "No<br />Doubt!"),
	new FortuneAnswer(2, "Let Me Think<br />About it."),
	new FortuneAnswer(0, "Positive<br />Vibes."),
	new FortuneAnswer(1, "Consensus<br />says No."),
	new FortuneAnswer(2, "User Error.<br />Try Again."),
	new FortuneAnswer(2, "Definitely<br />Maybe"),
	new FortuneAnswer(0, "Prospects<br />are great."),
	new FortuneAnswer(1, "Well...<br />It isn't<br />Yes."),
	new FortuneAnswer(2, "Who knows?<br />Not me."),
	new FortuneAnswer(1, "No<br />Way"),
	new FortuneAnswer(0, "Do<br />Spiders<br />Bark?"),
	new FortuneAnswer(0, "Affirmative."),
	new FortuneAnswer(0, "YEP!"),
	new FortuneAnswer(0, "YES."),
	new FortuneAnswer(1, "NO."),
	new FortuneAnswer(1, "Umm...<br />No."),
	new FortuneAnswer(1, "Better<br />Odds In<br />Vegas."),
	new FortuneAnswer(2, "Don't bother me<br />right now."),
	new FortuneAnswer(0, "Seems<br />Probable"),
	new FortuneAnswer(1, "You won't<br />like the<br />answer."),
];

let triangle = document.getElementById("triangle");
let answer = document.getElementById("response");
let ball = document.getElementById("ball");
let answerOpacity = 0;
let alreadyAsked = false;
let question = document.getElementById("question");
let permalink = document.getElementById("permalink");

// Add keyboard event listener for ENTER
document.addEventListener("keydown", enter_pressed);

let options = {
	"answertype" : "any",
	"question" : "",
};

process_urlparams();

function process_urlparams() {
	let terms = document.location.search.split(/(\&|\?)/);
	for (let term of terms) {
		if (term.length > 0) {
			options[term.split("=")[0]] = decodeURI(term.split("=")[1]);
		}
	}
	document.getElementById(`radio-${options.answertype}`).setAttribute("checked", true);
	if (options.question != "" && options.question.length > 1) {
		question.value = options.question;
	}
	modify_permalink();
	if (options.question != "" && options.question.length > 1) {
		ask();
	}
}

function modify_permalink() {
	let base = document.location.origin + document.location.pathname;
	let opts = [];

	if (options.answertype != "any") {
		opts.push(`answertype=${options.answertype}`)
	}
	if (options.question != "") {
		opts.push(`question=${encodeURI(options.question)}`)
	}
	
	permalink.value = base + ((opts.length > 0) ? "?" + opts.join("&") : "");
	// console.log(permalink.value);
}

function goto_permalink() {
	let a = document.createElement("a");
	a.href = permalink.value;
	a.click();
}

function enter_pressed(event) {
	// console.log(event);
	if (event.key == "Enter") {
		if (question.value.length >= 1) {
			ask();
		}
		question.blur();
	}
}

function ask() {
	if (alreadyAsked == false) {
		options.question = question.value;
		modify_permalink();
		alreadyAsked = true; 	// prevent invocation if active
		answer.innerHTML = "";	// clear previous answer
		answerOpacity = 0;		// 'hide' the answer
		answer.style.opacity = `${answerOpacity}%`;
		triangle.style.opacity = `${answerOpacity}%`;
		let time = 100;
		if (question.value.length >= 1 && question.value.slice(-1) != "?") {
			question.value = question.value + "?";
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
		if (resp[`is_${options['answertype']}`]) {
			validResponses.push(resp);
		}
	}

	let x = Math.floor(Math.random() * validResponses.length);
	// console.log(x, validResponses[x]);
	// ball.style.left = "50%"; 	// Re-center image
	ball.style.left = "initial"; 	// Re-center image
	answer.innerHTML = validResponses[
		RANDOM_NUM(0, validResponses.length-1)
	].answer; //Displays random response
	rvlanswer = setInterval(reveal, 80);
}

function RANDOM_NUM(_min, _max) {
	return _min + Math.floor(Math.random() * (_max+1 - _min));
}

function RANDOM_ARG() {
	return arguments[
		RANDOM_NUM(0, arguments.length - 1)
	];
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