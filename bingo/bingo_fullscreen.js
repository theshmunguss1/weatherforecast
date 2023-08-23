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
const help_dialog = document.getElementById("help");
const call_buffer_toggle = document.getElementById("input-call-buffer-toggle");
const call_buffer_time = document.getElementById("input-call-buffer-time");
const pres_remote_toggle = document.getElementById("input-pres-remote-toggle");
const call_display = document.getElementById("call-display");
const newcall_btn = document.getElementById("newcall-button");
const lastGamebtn = document.getElementById("last-game");
const log = document.getElementById("logging-container");
const logtoggle = document.getElementById("logging-toggle");
const logbtn = document.getElementById("logging-button");

const bingo = {
	min : 1,
	max : 75,
	possibilities : [],
	called : [],
}

let _defaults = {
	placements: {
		caller_side : "right",
		recent_call_dir : "lower",
		caller_placement : "lower",
		call_buffer_toggle : 1,
		call_buffer_time : 2,
		pres_remote_toggle : 0,
	},
	colors: {
		background_color: "#FFFFFF",
		text_color: "#000000",
		called_background_color: "#FFFF00",
		called_text_color: "#000000",
		new_call_outline_color: "#000000",

		call_display_color: "#000080",
		recent_calls_color: "#808080",
	},
}

function reset_placements() {
	// Placements
	for (let opt of Object.keys(_defaults.placements)) {
		let ele_id = `input-${opt.replaceAll("_", "-")}`;
		// only add this suffix if it isn't a toggle switch
		if (!opt.includes("toggle") && !opt.includes("time")) {
			ele_id += `-${_defaults.placements[opt]}`;
			document.getElementById(ele_id).click();
		}
		// toggles
		else {
			if (ele_id == "input-call-buffer-time") {
				call_buffer_time.value = _defaults.placements[opt];
			}
			else {
				if (
					document.getElementById(ele_id).checked !=
					Boolean(_defaults.placements[opt])
				) {
					document.getElementById(ele_id).click();
				}
			}
		}

		localStorage.removeItem(opt);
		
	}
}
function reset_colors() {
	// Colors
	for (let opt of Object.keys(_defaults.colors)) {
		bingo[opt] = _defaults.colors[opt];
		document.getElementById(opt).value = bingo[opt];
		document.getElementById(opt).oninput();
		localStorage.removeItem(opt);
	}
}

// load defaults
function load_defaults() {

	// need this so things won't try to load before other needed resources
	let click_queue = [];

	// Because of some changes made, is localStorage needing to be cleared?
	// if (!localStorage.getItem("bingorevamp")) {
		// localStorage.clear();
		// localStorage.setItem("bingorevamp", 1);
	// }

	// Placements / Options
	for (let opt of Object.keys(_defaults.placements)) {
		// record the default in ls if not there
		if (!localStorage.getItem(opt)) {
			localStorage.setItem(opt, _defaults.placements[opt]);
		}
		// compare true/false values and correct as needed
		if (["true", "false"].includes(localStorage.getItem(opt))) {
			console.log(
				`* converting saved-setting '${opt}' (${
					localStorage.getItem(opt)
				}) to newer setting`
			);
			localStorage.setItem(
				opt,
				(localStorage.getItem(opt) == "true") ? 1 : 0
			);
		}
		// compare the valu in ls to the default; make change as necessary
		if (localStorage.getItem(opt) != _defaults.placements[opt]) {
			console.log(`loading option '${opt}': ` + localStorage.getItem(opt));
			bingo[opt] = localStorage.getItem(opt);
			let ele_id = `input-${opt.replaceAll("_", "-")}`;
			// only add this suffix if it isn't a toggle switch
			if (!opt.includes("toggle")) {
				ele_id += `-${localStorage.getItem(opt)}`;
			}
			click_queue.push(document.getElementById(ele_id));
			
		}
		// if the value Not different from default
		else {
			bingo[opt] = _defaults.placements[opt];
		}
	}
	// now that needed vars exist, click necessary changes
	for (let element of click_queue) {
		// call buffer time
		if (element == call_buffer_time) {
			element.value = bingo.call_buffer_time;
			element.oninput();
		}
		else {
			element.click();
		}
	}

	// Colors
	for (let opt of Object.keys(_defaults.colors)) {
		// console.log("trying ", opt);
		if (!localStorage.getItem(opt)) {
			localStorage.setItem(opt, _defaults.colors[opt]);
		}
		if (localStorage.getItem(opt) != _defaults.colors[opt]) {
			console.log(`loading color '${opt}': ` + localStorage.getItem(opt));
			bingo[opt] = localStorage.getItem(opt);
			document.getElementById(opt).value = bingo[opt];
			document.getElementById(opt).oninput()
		}
		else {
			bingo[opt] = _defaults.colors[opt];
		}
	}
}

// Test to see if localStorage is available
// if not available...create a placeholding variable
if (!"localStorage" in window) {
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
let ls = localStorage;

load_defaults();

document.addEventListener("keyup", remote_presentation_press);

function remote_presentation_press(event) {
	appendLog(
		new Date(),
		`<REMOTE> remote_presentation_press() called -> Key: '${event.key}'`
	)
	// console.log(event);
	// console.log(event.key);
	// console.log("pres_remote_toggle:", pres_remote_toggle.checked);

	// Respond to specific key/button presses corresponding to presentation remotes
	if (pres_remote_toggle.checked) {
		appendLog(
			"",
			"presentation remote toggle is ON"
		);
		// if (["PageUp", "PageDown", "b", "B"].includes(event.key)) {
		if (
			event.key.match(/PageUp/i) ||
			event.key.match(/PageDown/i) ||
			event.key.match(/^b$/i)
		) {
			appendLog(
				"",
				`The key ('${event.key}') that was pressed was a match and the board should respond`
			);
			// Initiate a new game dialog
			if (["b", "B"].includes(event.key) && new_game_dialog.style.display != "flex") {
				appendLog("", "<REMOTE> New Game Dialog Displayed");
				new_game_dialog.style.display = "flex";
			}
			// make new game or cancel
			else if (new_game_dialog.style.display == "flex") {
				if (event.key == "PageDown") {
					appendLog("", "<REMOTE> New Game START");
					new_game();
				}
				else {
					appendLog("", "<REMOTE> New Game CANCELLED");
					new_game_dialog.style.display = 'none';
				}
			}
			// Fire new call if button is not disabled
			else if (newcall_btn.disabled == false) {
				appendLog("", "<PRES REMOTE> new_call()");
				new_call();
			}
		}
		else {
			appendLog(
				"",
				`The key ('${event.key}') was not recognized to produce a response`
			);
		}
	}
	else {
		appendLog(
			"",
			`But the presentation remote toggle is OFF`
		);
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

function try_fullScreen() {
	// need to control the :fullscreen selector somehow
	// element.attributeStyleMap.set() <- use to modify css?
	document.body.requestFullscreen({"navigationUI": "hide"});
}

function exit_fullScreen() {
	document.exitFullscreen();
}

function openLog() {
	help_dialog.style.display = 'none';
	document.getElementById('logging').style.display = 'block';
}

function toggle_logging() {
	if (logtoggle.checked) {
		logbtn.disabled = false;
	}
	else {
		logbtn.disabled = true;
		log.innerHTML = '<div>---</div>';
	}
}

function appendLog(time, msg) {
	if (logtoggle.checked) {
		let event_container = document.createElement("div");
		event_container.setAttribute("class", "logging-event");

		let time_ele = document.createElement("span");
		let msg_ele = document.createElement("span");

		if (time != "") {
			time_ele.innerText = [
				time.getFullYear(),
				(time.getMonth() + 1).toString().padStart(2, "0"),
				time.getDate().toString().padStart(2, "0"),
			].join("-") + " " + [
				time.getHours().toString().padStart(2, "0"),
				time.getMinutes().toString().padStart(2, "0"),
				time.getSeconds().toString().padStart(2, "0"),
			].join(":");
		}

		msg_ele.innerText = msg;

		event_container.appendChild(time_ele);
		event_container.appendChild(msg_ele);

		// log.insertBefore(
			// event_container,
			// log.querySelectorAll("div")[0]
		// );
		log.appendChild(event_container);
		log.scroll({"top":10000});

		// if (log.childNodes.length > 50) {
			// log.removeChild(log.lastChild);
		// }
		if (log.childNodes.length > 50) {
			log.removeChild(log.firstChild);
		}
	}
}

function call_protect(seconds=1) {
	newcall_btn.disabled = true;
	setTimeout(
		re_enable => {newcall_btn.disabled = false},
		seconds * 1000
	);
}

function toggle_call_buffer() {
	bingo.call_buffer_toggle = (call_buffer_toggle.checked) ? 1 : 0;
	localStorage.setItem('call_buffer_toggle', bingo.call_buffer_toggle);

	// disable time change if off
	if (!call_buffer_toggle.checked) {
		call_buffer_time.disabled = true;
	}
	else {
		call_buffer_time.disabled = false;
	}
}

function change_buffer_time() {
	// validation
	if (
		call_buffer_time.value == "" ||
		call_buffer_time <= 0
	) {
		bingo.call_buffer_time = _defaults.placements.call_buffer_time;
	}
	else {
		if (call_buffer_time.value > 10) {
			call_buffer_time.value = 10;
		}
		bingo.call_buffer_time = parseInt(
			call_buffer_time.value
		);
	}

	localStorage.setItem("call_buffer_time", bingo.call_buffer_time);
}

function restore_last_game() {
	let STEP = 50;    //ms

	if (Boolean(localStorage.getItem("lastGame"))) {
		// as previous game is likely being loaded, disable the button
		newcall_btn.disabled = true;
		help_dialog.style.display = "none";
		let last_game_calls = localStorage.getItem("lastGame").split(",").reverse();

		// timer to re-enable new-call button
		if (last_game_calls.length < 75) {
			setTimeout(
				re_enable => {newcall_btn.disabled = false},
				STEP * last_game_calls.length
			)
		}

		// iterate and re-highlight called spaces
		for (let [indx, each] of last_game_calls.entries()) {
			setTimeout(
				new_call,
				STEP * indx,
				each
			);
		}
	}
}

function new_call(space=null) {
	// console.log(MIN + Math.floor(Math.random() * (MAX-MIN+1)));
	let r;
	// disable restore last game button since a new game is ongoing...
	lastGamebtn.disabled = true;

	// random bingo space (index)
	if (space == null) {
		// prevent accidental/inadvertent call
		if (call_buffer_toggle.checked) {		
			call_protect(bingo.call_buffer_time);
		}
		r = Math.floor(Math.random() * bingo.possibilities.length);
	}
	// manipulate the next call
	else {
		r = bingo.possibilities.indexOf(space);
	}

	// Note the space being called
	// record
	bingo.called.unshift(bingo.possibilities[r]);

	// record in localStorage
	localStorage.setItem("lastGame", bingo.called.toString());

	// make sure only the most-recent call has a box highlight around it
	if (bingo.called.length > 1) {
		document.getElementById(bingo.called[1]).style.outline = "none";
	}

	appendLog(
		new Date(),
		`New Call --> '${bingo.possibilities[r]}'`
	);
	

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
	appendLog(new Date(), "*** Starting New Game ***");
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