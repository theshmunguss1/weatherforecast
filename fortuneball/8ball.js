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
	"Umm...<br />No.",
	"Better<br />Odds In<br />Vegas.",
	"Can't<br />predict<br />now",
	"Seems<br />Probable"
];

var triangle = document.getElementById("triangle");
var answer = document.getElementById("response");
var b = document.getElementById("ball");
var answerOpacity = 0;
var alreadyAsked = false;
var question = document.getElementById("question");

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
		alreadyAsked = true;
		answer.innerHTML = "";
		answerOpacity = 0;
		answer.style.opacity = `${answerOpacity}%`;
		triangle.style.opacity = `${answerOpacity}%`;
		var time = 100;
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
	b.style.left = "45%";
}

function shakeright() {
	b.style.left = "55%";
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
	var x = 0 + Math.floor(Math.random() * responses.length);
	// console.log(x, responses[x]);
	b.style.left = "50%"; 	// Re-center image
	answer.innerHTML = responses[x]; //Displays random response
	rvlanswer = setInterval(reveal,80);
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