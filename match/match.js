var game = {
	started: false,
	st_time: 0,
	en_time: 0,
	total_guesses: 0,
	grid_size: 4,
	matchquery: [],
	correct: [],
	card_color: "red"
};

var imgarray = ["&#9728;", 		// sun
				"&#9731;", 		// snowman
				"&#10070;", 	// diamond, crossed
				"&#10026;", 	// star
				"&#9835;", 		// music note
				"&#9745;", 		// ballot-box
				"&#9786;", 		// smiley face
				"&#9872;", 		// flag
				"&#9775;", 		// yinyang
				"&#9851;", 		// recycle
				"&#9757;", 		// finger pointing up
				"&#9918;", 		// baseball
				"&#9917;", 		// soccer ball
				"&#9860;", 		// dice-five
				"&#9986;", 		// scissors
				"&#9996;", 		// peace-hand
				"&#9743;", 		// phone
				"&#9951;", 		// truck
				"&#9973;", 		// sailboat
				"&#9752;", 		// clover
				"&#10048;", 	// flower
				"&#9813;", 		// chess-king
				"&#9816;", 		// chess-knight
				"&#9820;", 		// chess-rook
				"&#9817;", 		// chess-pawn
				"&hearts;", 	// hearts
				"&#9993;", 		// envelope
				"&#9876;", 		// swords
				"&#9762;", 		// radioactive
				"&#9760;", 		// skull/bones
				"&#9730;",		// umbrella
				"&#9736;", 		// thunderstorm
				"&#9889;", 		// high-voltage
				"&#9992;"]; 	// airplane

function reset() {
	game.started = false;
	game.st_time = 0;
	game.en_time = 0;
	game.total_guesses = 0;
	game.matchquery = [];
	game.correct = [];
	game.card_color = "red";
}

function ZFILL(n) {
	if (n < 10) {return "0" + n.toString()}
	else {return n.toString()}
}

function change_gridsize(v) {
	if (v != game.grid_size) {game.grid_size = parseInt(v);}
}

function randomColor() {
	var h = 0 + Math.floor(Math.random() * (359+1-0));
	var s = 75 + Math.floor(Math.random() * (100+1-75));
	var l = 25 + Math.floor(Math.random() * (45+1-25));

	let hsl = `hsl(${h},${s}%,${l}%)`;
	return hsl;

}

function assign() {
	// Hide the start/end message
	document.getElementById("start").style.visibility = "hidden";
	document.getElementById("endgame").style.visibility = "hidden";

	var selectedarray = []; 	// will hold symbols that will be used in game
	// randomly select enough symbols
	while (selectedarray.length < game.grid_size**2 / 2) {
		let r = 0 + Math.floor(Math.random() * (imgarray.length - 0));
		if (selectedarray.indexOf(imgarray[r]) == -1) {selectedarray.push(imgarray[r]);}
	}
	//console.log(selectedarray);

	// Double-up the array
	selectedarray = selectedarray.concat(selectedarray);

	// call to build the gameboard
	build(selectedarray);
}

function build(arr) {
	let board = document.getElementById("board");
	// clear the game grid
	board.innerHTML = "";
	for (x=0; x < game.grid_size; x++) {
		//New Row
		let newrow = document.createElement("div");
		newrow.setAttribute("class","ROW");
		for (y=0; y < game.grid_size; y++) {
			// New card; give it attributes
			let card = document.createElement("div");
			card.setAttribute("id",`c${ZFILL(x)}_${ZFILL(y)}`);
			card.setAttribute("class",`card gs${game.grid_size} hide ${game.card_color}`);
			card.setAttribute("onClick","reveal(this.id)");
			// Random number will be used to select a symbol to display
			let r = 0 + Math.floor(Math.random() * (arr.length - 0));
			card.innerHTML = arr[r];
			// Append the card once to the row once finished setting it up
			newrow.appendChild(card);
			// delete the just used symbol since it has been assigned
			let newarr = [];
			for (i=0; i < arr.length; i++) {
				if (i != r) {newarr.push(arr[i]);}
			}
			arr.length = 0; 	// clear the old array
			arr = arr.concat(newarr); 	// renew the 'old' array
			newarr.length = 0; 		// clear the 'newarr'
		}
		board.appendChild(newrow);
	}
}

function reveal(cid) {
	var cardElement = document.getElementById(cid);
	// start the game timing if it hasn't been set already
	if (game.started == false) {
		game.started = true;
		game.st_time = Date.now();
	}
	// we only want to reveal the card if hasn't been uncovered yet,
	// Either part of a correct match or we haven't selected two yet 
	if (game.correct.includes(cid) == false && game.matchquery.includes(cid) == false) {
		if (game.matchquery.length < 2) {
			// Change class to reveal
			cardElement.setAttribute("class",`card gs${game.grid_size} reveal`);
			// Append to the match query
			game.matchquery.push(cid);
			//console.log(game.matchquery);
			if (game.matchquery.length == 2) {
				let g1 = document.getElementById(game.matchquery[0]); 	// guess 1 element
				let g2 = document.getElementById(game.matchquery[1]); 	// guess 2 element
				// Increment total guesses
				game.total_guesses += 1;
				// Correct guess!
				if (g1.innerHTML == g2.innerHTML) {
					document.getElementById("right").style.visibility = "visible";
					g1.style.color = randomColor();
					g2.style.color = g1.style.color;
					game.correct.push(g1.id);
					game.correct.push(g2.id);
					setTimeout(correct,600);
					// Display the finish text if game is done
					if (game.correct.length == game.grid_size**2) {
						youWin();
					}
				}
				// Wrong guess!
				else {
					// Display the "wrong" indicator
					document.getElementById("wrong").style.visibility = "visible";
					setTimeout(hide,3000);
				}
						
			}
		}
	}
}

function youWin() {
	// Mark the end timing
	game.en_time = Date.now();
	// Calculate the total number of seconds the game took to finish
	var total_time = ((game.en_time - game.st_time) / 1000).toFixed(1);
	document.getElementById("numguesses").innerHTML = game.total_guesses;
	document.getElementById("numseconds").innerHTML = total_time;
	document.getElementById("endgame").style.visibility = "visible";
	reset();
}

function correct() {
	game.matchquery = [];
	document.getElementById("right").style.visibility = "hidden";
}

function hide() {
	var c1 = document.getElementById(game.matchquery[0]);
	var c2 = document.getElementById(game.matchquery[1]);
	// Change class to hide
	c1.setAttribute("class",`card gs${game.grid_size} hide ${game.card_color}`);
	c2.setAttribute("class",`card gs${game.grid_size} hide ${game.card_color}`);
	game.matchquery = [];
	document.getElementById("wrong").style.visibility = "hidden";
}

function chgbg(bgid) {
	var newbg = bgid.slice(-1);
	document.getElementById("board").setAttribute("class",`bg${ZFILL(newbg)}`);
}

function chgcardbg(c) {
	//console.log(c);
	game.card_color = c;
	for (x=0; x < game.grid_size; x++) {
		for (y=0; y < game.grid_size; y++) {
			document.getElementById(`c${ZFILL(x)}_${ZFILL(y)}`).setAttribute("class",`card gs${game.grid_size} hide ${game.card_color}`)
		}
	}
}

function changebgpattern(indexNum) {
	var patterncollection = [
		"repeating-linear-gradient(to top right, lightblue 0% 2%, white 2.1% 4%, yellow 4.1% 6%, white 6.1% 8%)",
		"repeating-linear-gradient(to top right, black 0% 2%, white 2.1% 4%)",
		"repeating-linear-gradient(to top right, MidnightBlue 0% 2%, CornflowerBlue 2.1% 4%, Navy 4.1% 6%, LightBlue 6.1% 8%)",
		"repeating-linear-gradient(to top right, red 0% 2%, orange 2.1% 4%, yellow 4.1% 6%, green 6.1% 8%, blue 8.1% 10%, indigo 10.1% 12%, violet 12.1% 14%, white 14.1% 16%)",
		"yellow radial-gradient(red 0% 40%, rgba(255,255,255,0) 40%) repeat -2% -2% / 8% 8%",
		"darkgreen radial-gradient(lightblue 0% 40%, rgba(255,255,255,0) 40%) repeat -2% -2% / 8% 8%"
		];
	
	document.getElementById("container").style.background = patterncollection[indexNum];
}

function changecardback(colorcode) {
	//console.log("changecardback function activated");
	for (element of document.getElementsByClassName("CARDBACK")) {
		element.style.backgroundColor = colorcode;
	}
}














