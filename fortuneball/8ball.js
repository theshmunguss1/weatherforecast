var responses = [
	"Absolutely!",
	"Very<br />Doubtful",
	"Be Careful<br />What You<br />Wish<br />For",
	"Sorry...<br />Shake<br />again",
	"Do cows<br />moo?",
	"50% Chance<br />of Yes",
	"Not Looking Good",
	"Maybe;<br />Maybe<br />not.",
	"No<br />Doubt!",
	"Let Me Think<br />About it.",
	"Positive<br />Vibes.",
	"Sources<br />say No.",
	"User Error.<br />Try<br />Again.",
	"Definitely<br />Maybe",
	"Prospects<br />Great.",
	"My reply<br />is No",
	"Possibly",
	"No<br />Way",
	"Do<br />Spiders<br />Bark?",
	"Affirmative.",
	"YEP!",
	"Better<br />Odds In<br />Vegas.",
	"Can't<br />predict<br />now",
	"Seems<br />Probable"
];

var triangle = document.getElementById("triangle");
var answer = document.getElementById("response");
var b = document.getElementById("ball");
var answerO = 0;
var alreadyAsked = false;
var question = document.getElementById("question");

// Add keyboard event listener for ENTER
question.addEventListener(
	"keydown",
	enter_pressed
);

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
		alreadyAsked = true;
		answer.innerHTML = "";
		answerO = 0;
		answer.style.opacity = `${answerO}%`;
		triangle.style.opacity = `${answerO}%`;
		var time = 100;
		if (question.value.length >= 1 && question.value.substr(question.value.length-1) != "?") {
			question.value += "?";
		}
		setTimeout(shakeleft,time);
		setTimeout(shakeright,time*2);
		setTimeout(shakeleft,time*3);
		setTimeout(shakeright,time*4);
		setTimeout(shakeleft,time*5);
		setTimeout(shakeright,time*6);
		setTimeout(shakeleft,time*7);
		setTimeout(shakeright,time*8);
		setTimeout(shakeleft,time*9);
		setTimeout(shakeright,time*10);
		setTimeout(display,time*10);
	}
}
function shakeleft() {
	b.style.left = "45%";
	return 0;
}

function shakeright() {
	b.style.left = "55%";
	return 0;
}

// document.getElementById("description").addEventListener(
	// "click",
	// event => {console.log(Math.floor(Math.random() * (responses.length + 1)))}
// );


function display() {
	var x = Math.floor(Math.random() * (responses.length + 1));
	b.style.left = "50%";
	answer.innerHTML = responses[x]; //Displays random response
	rvlanswer = setInterval(reveal,80);
}
function reveal() {
	answerO += 10;
	triangle.style.opacity = `${answerO}%`;
	answer.style.opacity = `${answerO}%`;
	if (answerO == 100) {
		clearInterval(rvlanswer);
		alreadyAsked = false;
	}
}