// Monitor the Screen orientation
// window.addEventListener(
	// "orientationchange",
	// resize_on_orientation_chg,
// );

const doc = document.documentElement;
const container = document.getElementById("container");
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
const color_options = document.getElementById("color-options");
const call_buffer_toggle = document.getElementById("input-call-buffer-toggle");
const pres_remote_toggle = document.getElementById("input-pres-remote-toggle");
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

	// background_color: "#FFFFFF",
	// text_color: "#000000",
	called_background_color: "#FFFF00",
	called_text_color: "#000000",
	new_call_outline_color: "#000000",

	default_caller_side: "right",
	default_caller_placement: "lower",
	default_recent_call_dir: "lower",
	default_called_background_color: "#FFFF00",
	default_called_text_color: "#000000",
	default_background_color: "#FFFFFF",
	default_text_color: "#000000",
	default_call_display_color: "#000080",
	default_recent_calls_color: "#808080",
	default_new_call_outline_color: "#000000",
}

function localStorageQuery(key, _default=null) {
	return (localStorage.getItem(key) != null) ? localStorage.getItem(key) : _default;
}

// Test to see if localStorage is available
// if not available...create a placeholding variable
if (Object.keys(window).includes("localStorage") == false) {
	class STRG {
		constructor() {}

		setItem(k, v) {
			this[k] = v;
		}

		getItem(k) {
			return this[k];
		}

		clear() {

		}

		removeItem(i) {

		}
	}
	localStorage = new STRG();
	// const localStorage = {};
}

// if localStorage is available, try loading from it
else {
	// Location of visuals
	if (localStorage.getItem("caller_side") != null) {
		document.getElementById(
			"input-caller-side-" + localStorage.getItem('caller_side')
		).click();
	}
	if (localStorage.getItem("caller_placement") != null) {
		document.getElementById(
			"input-caller-placement-" + localStorage.getItem('caller_placement')
		).click();
	}
	if (localStorage.getItem("recent_call_dir") != null) {
		document.getElementById(
			"input-recent-call-dir-" + localStorage.getItem('recent_call_dir')
		).click();
	}
	if (localStorage.getItem("call_buffer_toggle") != null) {
		let toggle_valu = localStorage.getItem("call_buffer_toggle");
		while (
			call_buffer_toggle.checked.toString() !=
			toggle_valu
		) {
			call_buffer_toggle.click();
		}
	}
	if (localStorage.getItem("pres_remote_toggle") != null) {
		let pres_toggle_valu = localStorage.getItem("pres_remote_toggle");
		while (
			pres_remote_toggle.checked.toString() !=
			pres_toggle_valu
		) {
			pres_remote_toggle.click();
		}
	}

	// COLORS
	if (localStorage.getItem("background_color") != null) {
		change_board_color(localStorage.getItem("background_color"));
		document.getElementById("color-bg").value = localStorage.getItem("background_color");
	}
	if (localStorage.getItem("text_color") != null) {
		change_board_color(localStorage.getItem("text_color"), "fg");
		document.getElementById("color-text").value = localStorage.getItem("text_color");
	}
	if (localStorage.getItem("called_background_color") != null) {
		change_called_color(localStorage.getItem("called_background_color"));
		document.getElementById("color-called-bg").value = localStorage.getItem("called_background_color");
	}
	if (localStorage.getItem("called_text_color") != null) {
		change_called_color(localStorage.getItem("called_text_color"), "fg");
		document.getElementById("color-called-text").value = localStorage.getItem("called_text_color");
	}
	if (localStorage.getItem("call_display_color") != null) {
		change_call_display_color(
			localStorage.getItem("call_display_color")
		);
		document.getElementById("color-call-display").value = localStorage.getItem("call_display_color");
	}
	if (localStorage.getItem("recent_calls_color") != null) {
		change_recent_calls_color(
			localStorage.getItem("recent_calls_color")
		);
		document.getElementById("color-recent-calls").value = localStorage.getItem("recent_calls_color");
	}
	if (localStorage.getItem("new_call_outline_color") != null) {
		change_new_call_outline_color(
			localStorage.getItem("new_call_outline_color")
		);
		document.getElementById("color-new-call-outline").value = localStorage.getItem("new_call_outline_color");
	}
}
let ls = localStorage;

document.addEventListener("keyup", remote_presentation_press);

function remote_presentation_press(event) {

	// Respond to specific key/button presses corresponding to presentation remotes
	if (pres_remote_toggle.checked) {
		if (["PageUp", "PageDown", "b", "B"].includes(event.key)) {
			// Initiate a new game dialog
			if (["b", "B"].includes(event.key) && new_game_dialog.style.display != "flex") {
				new_game_dialog.style.display = "flex";
			}
			// make new game or cancel
			else if (new_game_dialog.style.display == "flex") {
				if (event.key == "PageDown") {
					new_game();
				}
				else {
					new_game_dialog.style.display = 'none';
				}
			}
			// Fire new call if button is not disabled
			else if (newcall_btn.disabled == false) {
				new_call();
			}
		}
	}
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
	if (call_buffer_toggle.checked) {		
		call_protect(2);
	}

	// random bingo space (index)
	let r = Math.floor(Math.random() * bingo.possibilities.length);

	// Note the space being called
	// record
	bingo.called.unshift(bingo.possibilities[r]);

	// make sure only the most-recent call has a box highlight around it
	if (bingo.called.length > 1) {
		document.getElementById(bingo.called[1]).style.outline = "none";
	}

	// Display the space just called
	call_display.innerText = bingo.possibilities[r].toUpperCase();

	// the related selected element
	let selected = document.getElementById(bingo.possibilities[r]);
	// change background of selected element
	selected.style.backgroundColor = bingo.called_background_color;
	selected.style.color = bingo.called_text_color;
	selected.style.fontWeight = "bold";
	selected.style.fontSize = "5.5vmin";
	selected.style.outline = `1.25vmin double ${bingo.new_call_outline_color}`;

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
		document.getElementById(space).style.fontSize = "4.8vmin";
		document.getElementById(space).style.outline = "none";
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
	localStorage.setItem("caller_side", dir);
	if (dir == "left") {
		game_columns.insertBefore(
			controls_column,
			document.getElementById("b")
		);
	}
	else {
		game_columns.removeChild(controls_column);
		game_columns.appendChild(controls_column);
	}
}

function change_call_btn_placement(dir) {
	bingo.caller_placement = dir;
	localStorage.setItem("caller_placement", dir);
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
	localStorage.setItem("recent_call_dir", dir);

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

function change_board_color(new_color, which="bg") {
	// Background color
	if (which == "bg") {
		document.body.style.backgroundColor = new_color;
		container.style.backgroundColor = "#FFFFFF" + "64";
		localStorage.setItem("background_color", new_color);
	}
	// Main text color
	else {
		document.body.style.color = new_color;
		localStorage.setItem("text_color", new_color);
	}
}

function change_called_color(new_color, which="bg") {
	// Called background
	if (which == "bg") {
		localStorage.setItem("called_background_color", new_color);
		bingo.called_background_color = new_color;
		for (space of bingo.called) {
			document.getElementById(space).style.backgroundColor = new_color;
		}
	}
	// called text color
	else {
		localStorage.setItem("called_text_color", new_color);
		bingo.called_text_color = new_color;
		for (space of bingo.called) {
			document.getElementById(space).style.color = new_color;
		}
	}
}

function change_call_display_color(new_color) {
	localStorage.setItem("call_display_color", new_color);
	call_display.style.color = new_color;
}

function change_recent_calls_color(new_color) {
	localStorage.setItem("recent_calls_color", new_color);
	for (let recent of document.getElementsByClassName("recent-call")) {
		recent.style.color = new_color;
	}
}

function change_new_call_outline_color(new_color) {
	localStorage.setItem("new_call_outline_color", new_color);
	bingo.new_call_outline_color = new_color;
	if (bingo.called.length > 0) {
		document.getElementById(bingo.called[0]).style.outline = `1.25vmin double ${bingo.new_call_outline_color}`;
	}
}

function placement_reset() {
	document.getElementById(
		`input-caller-side-${bingo.default_caller_side}`
	).click();
	document.getElementById(
		`input-caller-placement-${bingo.default_caller_placement}`
	).click();
	document.getElementById(
		`input-recent-call-dir-${bingo.default_recent_call_dir}`
	).click();

	while (call_buffer_toggle.checked == false) {
		call_buffer_toggle.click();
	}

	for (let item of [
		"caller_side", "caller_placement", "recent_call_dir", 
		"call_buffer_toggle"
	]) {
		localStorage.removeItem(item);
	}

}

function color_reset() {
	// background
	change_board_color(bingo.default_background_color);
	document.getElementById("color-bg").value = bingo.default_background_color;

	change_board_color(bingo.default_text_color, "fg");
	document.getElementById("color-text").value = bingo.default_text_color;

	change_called_color(bingo.default_called_background_color);
	document.getElementById("color-called-bg").value = bingo.default_called_background_color;

	change_called_color(bingo.default_called_text_color, "fg");
	document.getElementById("color-called-text").value = bingo.default_called_text_color;

	change_call_display_color(bingo.default_call_display_color);
	document.getElementById("color-call-display").value = bingo.default_call_display_color;

	change_recent_calls_color(bingo.default_recent_calls_color);
	document.getElementById("color-recent-calls").value = bingo.default_recent_calls_color;

	change_new_call_outline_color(bingo.default_new_call_outline_color);
	document.getElementById("color-new-call-outline").value = bingo.default_new_call_outline_color;

	for (let item of [
		"background_color", "text_color", "called_background_color",
		"called_text_color", "call_display_color", "recent_calls_color",
		"new_call_outline_color",
	]) {
		localStorage.removeItem(item);
	}

}











