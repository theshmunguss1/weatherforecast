// Monitor the Screen orientation
// window.addEventListener(
	// "orientationchange",
	// resize_on_orientation_chg,
// );

const doc = document.documentElement;
const container = document.getElementById("container");
const b_column = document.getElementById("b");
const o_column = document.getElementById("o");
const recent_row_1 = document.getElementById("recent-row-1");
const recent_row_2 = document.getElementById("recent-row-2");
const recent_row_3 = document.getElementById("recent-row-3");
const recent_row_4 = document.getElementById("recent-row-4");
const recent_row_5 = document.getElementById("recent-row-5");
const game_columns = document.getElementById("game-columns");
const controls_column = document.getElementById("controls-column");
const controls_frame = document.getElementById("controls-frame");
const table_recent_calls = document.getElementById("table-recent-calls");
const button_box = document.getElementById("button-box");
const container_last_called = document.getElementById("container-last-called");
const new_game_dialog = document.getElementById("new-game-dialog");
const options_dialog = document.getElementById("options");
const call_display = document.getElementById("call-display");
const newcall_btn = document.getElementById("newcall-button");

const bingo = {
	min : 1,
	max : 75,
	possibilities : [],
	called : [],
	caller_side : "right",
	caller_placement : "lower",
	recent_call_dir : "lower",
	called_background_color: "yellow",
	called_text_color: "black",
}

_today = new Date();
// use Christmas Theme
if (_today.getMonth() == 11 ||
    _today.getMonth() == 6 && (_today.getDate() == 26 || _today.getDate() == 27)
) {
		ChristmasTimeIsHere();
}

// CHRISTMAS THEME
function ChristmasTimeIsHere() {
	document.body.style.backgroundColor = "green";
	container.style.backgroundColor = "lightgreen";
	container.style.outline = "none";
	bingo.called_background_color = "red";
	bingo.called_text_color = "white";
	call_display.style.color = "darkred";
	recent1.style.color = "darkred";
	recent2.style.color = "darkred";
	recent3.style.color = "darkred";
	recent4.style.color = "darkred";
	recent5.style.color = "darkred";
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
	selected.style.backgroundColor = bingo.called_background_color;
	selected.style.color = bingo.called_text_color;
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
		document.getElementById(space).style.color = "initial";
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

function change_side(dir) {
	bingo.caller_side = dir;
	if (dir == "left") {
		game_columns.insertBefore(
			controls_column,
			b_column
		);
	}
	else {
		game_columns.removeChild(controls_column);
		game_columns.appendChild(controls_column);
	}
}

function change_call_btn_placement(dir) {
	bingo.caller_placement = dir;
	if (dir == "upper") {
		controls_frame.insertBefore(
			newcall_btn,
			(bingo.recent_call_dir == "lower") ? table_recent_calls : container_last_called
		);
	}
	else {
		controls_frame.insertBefore(
			newcall_btn,
			button_box
		);
	}
}

function change_recent_calls_direction(dir) {
	bingo.recent_call_dir = dir;

	// Remove all nodes
	controls_frame.removeChild(container_last_called);
	for (element of [recent_row_1, recent_row_2, recent_row_3, recent_row_4, recent_row_5]) {
		table_recent_calls.removeChild(element);
	}

	// Add back based on order
	if (dir == "upper") {
		controls_frame.insertBefore(
			container_last_called,
			table_recent_calls
		);
		for (element of [recent_row_1, recent_row_2, recent_row_3, recent_row_4, recent_row_5]) {
			table_recent_calls.appendChild(element);
		}
	}
	else {
		for (element of [recent_row_5, recent_row_4, recent_row_3, recent_row_2, recent_row_1]) {
			table_recent_calls.appendChild(element);
		}
		controls_frame.insertBefore(
			container_last_called,
			(bingo.caller_placement == "lower") ? newcall_btn : button_box
		);
	}
}

















