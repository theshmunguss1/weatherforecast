// Factory functions to be absorbed by game
function activate(event=null, sim=false) {
	// event = null is given here to represent a placeholder as it can be
	// 	called with an event; to preserve the value of sim (thats the intent)
	if (game.buttonsDisabled == false || sim == true) {
		this.style.backgroundColor = this.getAttribute("data-active");
		this.style.border = "none";
		this.style.boxShadow = `0px 0px 1em 0.25em ${this.getAttribute("data-active")}`;
		this.style.color = "transparent";
		button_click(this, sim);
	}
}

function deactivate() {
	this.style.backgroundColor = this.getAttribute("data-inactive");
	this.style.borderStyle = "outset";
	this.style.boxShadow = "none";
	this.style.color = "rgba(0,0,0, 30%)";
}

// Game properties
class GameProperties {
	constructor() {
		this.ul = document.getElementById("button-ul");
		this.ur = document.getElementById("button-ur");
		this.ll = document.getElementById("button-ll");
		this.lr = document.getElementById("button-lr");
		this.wrong = document.getElementById("wrong-sound");
		this.newGame = document.getElementById("start");
		this.started = false;
		this.buttonsDisabled = true;
		this.sequence = [];
		this.guesses = [];
		this.correct = 0;
		this.record = 0;
		// setup other methods
		this.setupExtras();
	}

	setupExtras() {
		for (let btn of ["ul", "ur", "ll", "lr"]) {
			// Index (for association of element to a number)
			this[btn].number = ["ul", "ur", "ll", "lr"].indexOf(btn) + 1;
			// Sound access
			this[btn].sound = document.getElementById(this[btn].id + "-sound");
			// Activate/Deactivate
			this[btn].activate = activate.bind(this[btn]);
			this[btn].deactivate = deactivate.bind(this[btn]);
			// Add Listeners
			this[btn].onpointerdown = this[btn].activate;
			this[btn].onpointerup = this[btn].deactivate;
		}
	}

	// Button Aliases
	get btn1() {return this.ul}
	get btn2() {return this.ur}
	get btn3() {return this.ll}
	get btn4() {return this.lr}
};

let game = new GameProperties();
let roundsWon = document.getElementById("rounds-won");
let newRecord = document.getElementById("new-record");
let indicator = document.getElementById("indicator");
let lightSequence = document.getElementById("light-sequence");
let lightRespond = document.getElementById("light-respond");
let soundOn = document.getElementById("sound-on");

// Keyboard Listeners
document.addEventListener("keydown", kbcontrol);
document.addEventListener("keyup", kbcontrol);

function soundToggle(bool) {
	for (element of [game.ul.sound, game.ur.sound, game.ll.sound, game.lr.sound, game.wrong]) {
		element.muted = (bool == 1) ? false : true;
	}
}

function reset() {
	game.buttonsDisabled = true;
	game.sequence = [];
	game.guesses = [];
	game.correct = 0;
	game.started = false;
	game.newGame.style.visibility = "visible";
}

function start_new_game() {
	game.started = true;
	indicator.innerHTML = "&nbsp;";
	roundsWon.innerText = game.correct;
	// Hide start game button
	game.newGame.style.visibility = "hidden";
	soundToggle(soundOn.checked);
	// Initiate sequencing
	addToSequence();
}

function kbcontrol() {
	event.stopImmediatePropagation();
	// console.log(((event.type.includes("down")) ? "" : "de") + "activate");
	if (event.key.toLowerCase() == "q") {
		game.ul[((event.type.includes("down")) ? "" : "de") + "activate"]();
	}
	if (event.key.toLowerCase() == "e") {
		game.ur[((event.type.includes("down")) ? "" : "de") + "activate"]();
	}
	if (event.key.toLowerCase() == "a") {
		game.ll[((event.type.includes("down")) ? "" : "de") + "activate"]();
	}
	if (event.key.toLowerCase() == "d") {
		game.lr[((event.type.includes("down")) ? "" : "de") + "activate"]();
	}
	// Start new game (when applicable)
	if (event.key.toLowerCase() == "s") {
		if (game.started == false) {
			game.newGame.click();
		}
	}
}

function button_click(element, simulated=false) {
	try {
		event.preventDefault();
	} catch (error) {
		// This error only occurs when this function not called by an event
	};
	// play button sound
	element.sound.play();
	// if the user initiated the press
	if (simulated == false) {
		if (soundOn.checked) {navigator.vibrate([50]);}
		game.guesses.push(element.number);
		correct = check_guess(
			game.guesses.length-1,
			game.guesses[game.guesses.length-1]
		);
		// Correct guess!
		if (correct) {
			// if quantity of guesses match sequence length, call new num
			if (game.guesses.length == game.sequence.length) {
				game.guesses = [];
				game.correct += 1;
				
				game.record += (game.correct > game.record) ? 1 : 0;
				// Set displays to reflect numbers
				roundsWon.innerText = game.correct;
				newRecord.innerText = game.record;
				// Turn off recognizance of button presses
				game.buttonsDisabled = true;
				// Wait 1 second and call a new number
				setTimeout(
					addToSequence,
					1000
				);
			}
		}
		// Game over
		else {
			setTimeout(
				playEndSound => {
					game.wrong.play();
					lightRespond.style.display = "none";
					lightSequence.style.display = "none";
				},
				200
			);
			if (soundOn.checked) {navigator.vibrate([800]);}
			indicator.innerHTML = "GAME OVER!";
			reset();
		}
	}
}

function check_guess(index, guess) {
	// right
	if (game.guesses[index] == game.sequence[index]) {return true;}
	// wrong
	else {return false;}
}

function addToSequence() {
	let n = 1 + Math.floor(Math.random() * 4);
	game.sequence.push(n);
	lightRespond.style.display = "none";
	lightSequence.style.display = "block";
	timeoutChain();
} 

function timeoutChain(i=0) {
	setTimeout(
		indexOn => {
			game["btn" + game.sequence[i]].activate(null, sim=true);
			setTimeout(
				indexOff => {
					game["btn" + game.sequence[i]].deactivate();
					// Setup next in sequence
					if (i+1 < game.sequence.length) {
						timeoutChain(i+1);
					}
					// If the end has been reached, allow user input
					else {
						game.buttonsDisabled = false;
						lightSequence.style.display = "none";
						lightRespond.style.display = "block";
					}					
				},
				200,
				i
			);
		},
		580,
		i
	)
}