class Piece {
	constructor(piece, type, rules) {
		this._piece = piece;
		this._type = type;
		this._rules = rules;
		this._moves = [];
	}
}

pieces = {
	"light_pawn": "&#9817;",
	"light_rook": "&#9814;",
	"light_knight": "&#9816;",
	"light_bishop": "&#9815;",
	"light_queen": "&#9813;",
	"light_king": "&#9812;",
	"dark_pawn": "&#9823;",
	"dark_rook": "&#9820;",
	"dark_knight": "&#9822;",
	"dark_bishop": "&#9821;",
	"dark_queen": "&#9819;",
	"dark_king": "&#9818;",
	"orientation": window.orientation,
	"selected": null
}

window.addEventListener(
	"orientationchange",
	resize,
	false
);

resize(true);

function resize(init=false) {
	if (init == true || pieces.orientation != window.orientation) {
		console.log("ran");
		// console.log(`80v${(window.innerHeight < window.innerWidth) ? "h" : "w"}`);
		$("#gameboard").css("width", `80v${(window.innerHeight < window.innerWidth) ? "h" : "w"}`);
		$("#gameboard").css("height", `80v${(window.innerHeight < window.innerWidth) ? "h" : "w"}`);
		$(":root").css("--fontwidth", `calc(${$("#gameboard").css("width")} / 10)`);
	}
}

var rows = ["8","7","6","5","4","3","2","1"];	// Used in clearing/resetting board
var cols = ["a","b","c","d","e","f","g","h"];		// Used in clearing/resetting board
var space = {selected: "", piece: ""};
var piece_selected = false;
var oldbgcolor;

function loading() {
	// RESET LIGHT PIECES
	document.getElementById("a1").innerHTML = document.getElementById("h1").innerHTML = pieces.light_rook;
	document.getElementById("b1").innerHTML = document.getElementById("g1").innerHTML = pieces.light_knight;
	document.getElementById("c1").innerHTML = document.getElementById("f1").innerHTML = pieces.light_bishop;
	document.getElementById("d1").innerHTML = pieces.light_queen;
	document.getElementById("e1").innerHTML = pieces.light_king;
	for (i=0;i<8;i++) {
		document.getElementById(cols[i] + "2").innerHTML = pieces.light_pawn;
	}
	// RESET DARK PIECES
	document.getElementById("a8").innerHTML = document.getElementById("h8").innerHTML = pieces.dark_rook;
	document.getElementById("b8").innerHTML = document.getElementById("g8").innerHTML = pieces.dark_knight;
	document.getElementById("c8").innerHTML = document.getElementById("f8").innerHTML = pieces.dark_bishop;
	document.getElementById("d8").innerHTML = pieces.dark_queen;
	document.getElementById("e8").innerHTML = pieces.dark_king;
	for (i=0;i<8;i++) {
		document.getElementById(cols[i] + "7").innerHTML = pieces.dark_pawn;
	}
}

function reset() {
	for (i=0;i<8;i++) {
		for (j=0;j<8;j++) {
			document.getElementById(cols[i] + rows[j]).innerHTML = "";
		}
	}
	space.selected = "";
	space.piece = "";
	loading();
}

function move(coord) {
	if (document.getElementById(coord).innerHTML != "" && piece_selected == false) {		// SELECTING A PIECE TO MOVE
		space.selected = coord;
		space.piece = document.getElementById(coord).innerHTML;
		oldbgcolor = document.getElementById(coord).style.backgroundColor;
		document.getElementById(coord).style.backgroundColor = "rgba(255,180,180,0.5)";
		piece_selected = true;
	}
	else if (document.getElementById(coord).innerHTML != "" && piece_selected == true) {	// CHOOSE DIFF PIECE IF ONE IS ALREADY SELECTED
		document.getElementById(space.selected).style.backgroundColor = oldbgcolor;
		space.selected = coord;
		space.piece = document.getElementById(coord).innerHTML;
		oldbgcolor = document.getElementById(coord).style.backgroundColor;
		document.getElementById(coord).style.backgroundColor = "rgba(255,180,180,0.5)";
	}
	else if (document.getElementById(coord).innerHTML == "" && space.selected != "") {
		document.getElementById(space.selected).style.backgroundColor = oldbgcolor;
		document.getElementById(space.selected).innerHTML = "";
		document.getElementById(coord).innerHTML = space.piece;
		space.selected = "";
		space.piece = "";
		piece_selected = false;
	}
}
