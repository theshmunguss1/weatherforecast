function chg_game_mode(mode) {
	if (mode != prop.mode) {
		prop.mode = mode; 	// Make note of the global change
		// GAME MODE
		if (mode == "game") {
			canvas_caller.style.display = "none";
			canvas.style.display = "inline";
			document.getElementById("mode_game").style = "background-color:darkred;border:5px inset yellow";
			document.getElementById("mode_caller").style = "initial";
			document.getElementById("caller_card").style.display = "none";
			document.getElementById("generate").style.display = "block";
			document.getElementById("downloadcaller").style.display = "none";
			document.getElementById("downloadcard").style.display = "block";
			document.getElementById("options_caller").style.display = "none";
			document.getElementById("options").style.display = "table";
		}
		// CALLER MODE
		else if (mode == "caller") {
			canvas.style.display = "none";
			canvas_caller.style.display = "inline";
			document.getElementById("mode_caller").style = "background-color:darkred;border:5px inset yellow";
			document.getElementById("mode_game").style = "initial";
			document.getElementById("generate").style.display = "none";
			document.getElementById("caller_card").style.display = "block";
			document.getElementById("downloadcard").style.display = "none";
			document.getElementById("downloadcaller").style.display = "block";
			document.getElementById("options").style.display = "none";
			document.getElementById("options_caller").style.display = "inline-block";
		}
	}
}

function chg_bg(boardbgbool, c) {
	//console.log(c);
	// boardbgbool: are we wanting to re-define the inner?
	// If the user is requesting to change the inner background color
	if (boardbgbool) {
		prop.boardBackgroundColor = c;
	}
	// outer card background color
	else {
		prop.backgroundColor = c;
		if (prop.bgSameColor) {
			document.getElementById("inp_innerbg").value = prop.backgroundColor;
			prop.boardBackgroundColor = c;
		}
	}
	draw();
}

function keep_bg_same(BOOL) {
	// Keep colors the same
	if (BOOL == true) {
		prop.bgSameColor = true;
		prop.boardBackgroundColor = prop.backgroundColor;
		document.getElementById("inp_innerbg").value = prop.backgroundColor;
		document.getElementById("innerbgcolor").style.display = "none";
	}
	// Allow different colors
	else {
		prop.bgSameColor = false;
		document.getElementById("innerbgcolor").style.display = "block";
	}
	draw();
}

function chg_line_color(linecolorbool, c) {
	if (linecolorbool) {
		prop.boardLineColor = c;
	}
	// outer card background color
	else {
		prop.lineColor = c;
		prop.titleColor = c;
		if (prop.lineSameColor) {
			prop.boardLineColor = c;
			document.getElementById("inp_innerlinecolor").value = prop.lineColor;
		}
	}
	draw();
}

function keep_lines_same(BOOL) {
	// Keep colors the same
	if (BOOL == true) {
		prop.lineSameColor = true;
		prop.boardLineColor = prop.lineColor;
		document.getElementById("inp_innerlinecolor").value = prop.lineColor;
		document.getElementById("innerlinecolor").style.display = "none";
	}
	// Allow different colors
	else {
		prop.lineSameColor = false;
		document.getElementById("innerlinecolor").style.display = "block";
	}
	draw();
}


// !!! DEPRECATED; USE REMOVED !!!
function chg_freesp_color(c) {
	prop.freeSpaceColor = c;
	draw();
}

function chg_opts(e) {
	//console.log(e.path[0]["id"]);

	let newid = e.path[0]["id"].slice(4);
	//console.log(newid);
	// If a different option is selected
	if (newid.includes(prop.optsSelected) == false) {
		// "de-highlight" the current option selection
		document.getElementById("cell" + prop.optsSelected).style.backgroundColor = "initial";
		document.getElementById("cell" + prop.optsSelected).style.color = "white";
		// Hide the current option selection
		document.getElementById("opts" + prop.optsSelected).style.display = "none";
		// make global note of the new option selection
		prop.optsSelected = newid;
		// make the newly selected option visible
		document.getElementById("opts" + prop.optsSelected).style.display = "table-cell";
		// highlight the newly selected option
		document.getElementById("cell" + prop.optsSelected).style.backgroundColor = "rgb(0,0,70)";
		document.getElementById("cell" + prop.optsSelected).style.color = "yellow";
	}

}

function call_fills(h, s, l) {
	prop.callerFillColor = `hsl(${h}, ${s}%, ${l}%)`;
	drawCaller();
}

























