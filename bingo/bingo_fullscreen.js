// Monitor the Screen orientation
// window.addEventListener(
	// "orientationchange",
	// resize_on_orientation_chg,
// );

const doc = document.documentElement;
const container = document.getElementById("container");
const new_game_dialog = document.getElementById("new-game-dialog");
const call_display = document.getElementById("call-display");
const newcall_btn = document.getElementById("newcall-button");

const bingo = {
	min : 1,
	max : 75,
	possibilities : [],
	called : []
}

function rebuild_bingo_possibilities() {
	bingo.possibilities = [];
	for (n=1; n <= 75; n++) {
		let letter = (n >= 1 && n <= 15) ? "b" :
			(n >= 16 && n <= 30) ? "i" :
			(n >= 31 && n <= 45) ? "n" :
			(n >= 46 && n <= 60) ? "g" : "o";
		bingo.possibilities.push(`${letter}-${n}`);
	}
}

function call_protect(seconds=1) {
	newcall_btn.disabled = true;
	setTimeout(
		re_enable => {newcall_btn.disabled = false},
		seconds * 1000
	);
}

function new_call() {
	// console.log(MIN + Math.floor(Math.random() * (MAX-MIN+1)));

	// prevent accidental/inadvertent call
	call_protect(2);

	// random bingo space (index)
	let r = Math.floor(Math.random() * bingo.possibilities.length);

	// Note the space being called
	bingo.called.unshift(bingo.possibilities[r]);

	// Display the space just called
	call_display.innerText = bingo.possibilities[r].toUpperCase();

	// the related selected element
	let selected = document.getElementById(bingo.possibilities[r]);
	// change background of selected element
	selected.style.backgroundColor = "yellow";
	selected.style.fontWeight = "bold";

	// narrow possibilities array
	bingo.possibilities = [].concat(
		bingo.possibilities.slice(0, r),
		bingo.possibilities.slice(r+1, bingo.possibilities.length)
	);
	// console.log(bingo.possibilities);

	// Fill the latest calls display
	for (space of bingo.called.slice(1,6)) {
		document.getElementById(
			`recent${bingo.called.indexOf(space)}`
		).innerText = space.toUpperCase();
	}

	if (bingo.possibilities.length == 0) {
		newcall_btn.disabled = true;
	}
}

function new_game() {
	// Clear Recent Calls
	call_display.innerText = "---";

	for (n=1; n<=5; n++) {
		document.getElementById(`recent${n}`).innerHTML = "&nbsp;";
	}

	// Remove background colors and bold-font of previously-called spaces
	for (space of bingo.called) {
		document.getElementById(space).style.backgroundColor = "initial";
		document.getElementById(space).style.fontWeight = "initial";
	}

	// Reset called list
	bingo.called = [];

	// Reset list of spaces
	rebuild_bingo_possibilities();

	// re-hide new game dialog
	new_game_dialog.style.display = "none";

	// make sure new-call button is enabled
	newcall_btn.disabled = false;
}

















