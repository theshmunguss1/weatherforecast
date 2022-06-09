const game = {
	started: false,
	guesses: 0,
	maxguesses:15,
	guessed: [],
	time: 20,
	timeleft: null
};
const gem = {y: 0, x: 0};
var clock;

// Elements
const options = document.getElementById("options");
const gametext = document.getElementById("gametext");
const starttext = document.getElementById("starttext");
const losetext = document.getElementById("losetext");
const timer = document.getElementById("timer");
const guessesleft = document.getElementById("guessesleft");

function gamestart() {
	game.started = false;
	game.guesses = 0;
	game.guessed = [];
	game.timeleft = game.time;

	options.style.visibility = "hidden";
	gametext.style.display = "none";
	starttext.style.display = "none";
	losetext.style.display = "none";
	wintext.style.display = "none";
	timer.innerHTML = game.timeleft;
	guessesleft.innerHTML = game.maxguesses;
	for (i=0;i<document.getElementsByClassName("cell").length;i++) {
		document.getElementById(document.getElementsByClassName("cell")[i].id).style.background = "linear-gradient(45deg, black, white)";
	}
	hide();
}

function chgtimelimit(tID) {
	var newtime = parseInt(tID.substr(1,2));
	if (game.time != newtime) {
		document.getElementById("t" + game.time).style.backgroundColor = "transparent";
		game.time = newtime;
		timer.innerHTML = game.time;
		document.getElementById("t" + game.time).style.backgroundColor = "rgb(70,70,70)";
	}
}

function chgguesses(gID) {
	var newguesses = parseInt(gID.substr(1,2));
	if (game.maxguesses != newguesses) {
		document.getElementById("g" + game.maxguesses).style.backgroundColor = "transparent";
		game.maxguesses = newguesses;
		guessesleft.innerHTML = game.maxguesses;
		document.getElementById("g" + game.maxguesses).style.backgroundColor = "rgb(70,70,70)";
	}
}

function hide() {
	//gem = {y:0, x:0};
	gem.y = Math.floor(Math.random()*25);
	gem.x = Math.floor(Math.random()*25);
}

function timeincr() {
	game.timeleft--;
	timer.innerHTML = game.timeleft;
	// YOU LOSE (out of time)
	if (game.timeleft == 0) {
		clearInterval(clock);
		options.style.visibility = "initial";
		gametext.style.display = "table";
		losetext.style.display = "table-cell";
	}
}

function reveal(ID) {
	//console.log(ID);
	// 0.0, 2.4, 4.8, 7.2, 9.6, 12.0, 14.4, 16.8, 19.2, 21.6, 24.0, 26.4, 28.8, 31.2, 33.6
	var guess = {y:parseInt(ID.substr(1,2)), x:parseInt(ID.substr(4,2))};
	//console.log(`y: ${guess.y}, x: ${guess.x}`);
	var dist = Math.sqrt(Math.abs(guess.y-gem.y)**2 + Math.abs(guess.x-gem.x)**2);
	if (game.started == false) {
		game.started = true;
		clock = setInterval(timeincr,1000);
	}

	//console.log(`dist = ${dist.toFixed(2)}`);
	
	if (game.guessed.includes(ID) == false) {
		game.guessed.push(ID);
		game.guesses += 1;
		guessesleft.innerHTML = game.maxguesses - game.guesses;
		document.getElementById(ID).style.background = "none";
		// YOU LOSE (no more guesses)
		if (game.guesses == game.maxguesses && dist != 0) {
			clearInterval(clock);
			options.style.visibility = "initial";
			gametext.style.display = "table";
			losetext.style.display = "table-cell";
		}
		// YOU WIN
		if (dist >= 0 && dist < 1) {
			document.getElementById(ID).style.background = "repeating-linear-gradient(45deg,purple 0%,red 12%, white 12.1%, white 20%)";
			clearInterval(clock);
			options.style.visibility = "initial";
			gametext.style.display = "table";
			document.getElementById("wintext").style.display = "table-cell";
			document.getElementById("winguesses").innerHTML = game.guesses;
			document.getElementById("wintime").innerHTML = game.time - game.timeleft;
		}
		else if (dist < 1.5) {document.getElementById(ID).style.backgroundColor = "rgb(255,1,0)";}
		else if (dist < 3.1) {document.getElementById(ID).style.backgroundColor = "rgb(255,51,0)";}
		else if (dist < 4.7) {document.getElementById(ID).style.backgroundColor = "rgb(255,101,0)";}
		else if (dist < 6.3) {document.getElementById(ID).style.backgroundColor = "rgb(255,151,0)";}
		else if (dist < 7.9) {document.getElementById(ID).style.backgroundColor = "rgb(255,201,0)";}
		else if (dist < 9.5) {document.getElementById(ID).style.backgroundColor = "rgb(255,251,0)";}
		else if (dist < 11.1) {document.getElementById(ID).style.backgroundColor = "rgb(209,255,0)";}
		else if (dist < 12.7) {document.getElementById(ID).style.backgroundColor = "rgb(159,255,0)";}
		else if (dist < 14.3) {document.getElementById(ID).style.backgroundColor = "rgb(109,255,0)";}
		else if (dist < 15.9) {document.getElementById(ID).style.backgroundColor = "rgb(59,255,0)";}
		else if (dist < 17.5) {document.getElementById(ID).style.backgroundColor = "rgb(9,255,0)";}
		else if (dist < 19.1) {document.getElementById(ID).style.backgroundColor = "rgb(0,255,41)";}
		else if (dist < 20.7) {document.getElementById(ID).style.backgroundColor = "rgb(0,255,91)";}
		else if (dist < 22.3) {document.getElementById(ID).style.backgroundColor = "rgb(0,255,141)";}
		else if (dist < 23.9) {document.getElementById(ID).style.backgroundColor = "rgb(0,255,191)";}
		else if (dist < 25.5) {document.getElementById(ID).style.backgroundColor = "rgb(0,255,241)";}
		else if (dist < 27.1) {document.getElementById(ID).style.backgroundColor = "rgb(0,219,255)";}
		else if (dist < 28.7) {document.getElementById(ID).style.backgroundColor = "rgb(0,169,255)";}
		else if (dist < 30.3) {document.getElementById(ID).style.backgroundColor = "rgb(0,119,255)";}
		else if (dist < 31.9) {document.getElementById(ID).style.backgroundColor = "rgb(0,69,255)";}
		else if (dist < 33.5) {document.getElementById(ID).style.backgroundColor = "rgb(0,19,255)";}
		else {document.getElementById(ID).style.backgroundColor = "rgb(0,0,255)";}
	}
	//console.log(`Guesses: ${game.guesses} ... Guessed: ${game.guessed}`);
}
//>>> for x in range(rows):
//...     print('\t\t\t<div class="ROW">')
//...     for y in range(rows):
//...             print('\t\t\t\t<div id="c{}_{}" class="cell" onClick=reveal(this.id)> </div>'.format(str(x).zfill(2),str(y).zfill(2)))
//...     print('\t\t\t</div>')
//...
