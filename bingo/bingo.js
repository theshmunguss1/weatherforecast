var canvas = document.getElementById("canvas");
var canvas_caller = document.getElementById("canvas_caller");
var ctx_caller = canvas_caller.getContext("2d");
//var canvas_img = document.getElementById("canvas_img");
var ctx = canvas.getContext("2d");

// prop holds relevant properties; sizing properties (generally those
//		that will be dynamic are found in the resize() function
var prop = {
	"mode": "game",
	"oldwidth": 375,
	"oldheight": 500,
	"backgroundColor": "white",
	"boardBackgroundColor": "white",
	"bgSameColor": true,
	"lineColor": "black",
	"boardLineColor": "black",
	"lineSameColor": true,
	"titleColor": "black",
	"numberColor": "black",
	"freeSpace": true,
	"freeSpaceColor": "rgba(220,220,255)",
	"spaces": {
		"B": {"col":0, "numbers":[], "min":1, "max": 15},
		"I": {"col":1, "numbers":[], "min":16, "max": 30},
		"N": {"col":2, "numbers":[], "min":31, "max": 45},
		"G": {"col":3, "numbers":[], "min":46, "max": 60},
		"O": {"col":4, "numbers":[], "min":61, "max": 75}
	},
	"called": [],
	"lastCalled": null,
	"callerFillColor": "#FF4A4A",
	"callerPrevColor": "#000080",
	"printMarkers": true,
	"markers": [],
	"markerColor": "rgb(255,75,75)",
	"markerOutlineColor": "black",
	"optsSelected": "bg"
};

// Dynamic Window Resize
window.addEventListener("resize", resize);

// Game Mode Event Listener
canvas.addEventListener(
	"click",
	event => markerProximityCheck()
);

// Caller Mode Event Listener
canvas_caller.addEventListener(
	"mousedown",
	event => caller_active(event)
);
canvas_caller.addEventListener(
	"touchstart",
	event => caller_active(event)
);
canvas_caller.addEventListener(
	"mouseup",
	event => new_call(event)
);
resize(); 	// includes call to draw()

// Option Handling
document.getElementById("optsSelect").addEventListener(
	"click",
	event => chg_opts(event)
);

function markerProximityCheck() {
	// Canvas top-left coords
	let canvasX0 = canvas.getBoundingClientRect().x;
	let canvasY0 = canvas.getBoundingClientRect().y;

	// Canvas-Relative click coords
	xclick = event.clientX-canvasX0;
	yclick = event.clientY-canvasY0;
	//console.log(ctx.canvas.id);
	//console.log(xclick, yclick);

	// Bool to determine whether or not a mark needs to be noted
	let markerbool = true;
	// if there are any marker centers within radial range, remove them
	for (marker=prop.markers.length-1; marker >=0; marker--) {
		// Use Pythagoras Theorem to determine distance between click and each marker
		let a = Math.abs(xclick - prop.markers[marker].x);
		let b = Math.abs(yclick - prop.markers[marker].y);
		//console.log(a,b);
		let dist = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
		//console.log(dist);

		// If distance is less than the marker radius, it means that an
		// 		existing marker has been clicked for removal
		if (dist <= prop.markerRadius) {
			remove_marker(marker);
			markerbool = false;
			break;
		}
	}
	// Note the click for marking if true
	if (markerbool == true) {
		prop.markers.push(
			{
				"x": xclick,
				"y": yclick
			}
		);
	}
	draw();
}

function remove_marker(i) {
	// Restructures the array while leaving out the marker that
	// 		needs to be removed
	let before = prop.markers.slice(0,i);
	let after = prop.markers.slice(i+1);
	prop.markers = before.concat(after);
	draw();
}

function place_marker_fill(x,y) {
	//console.log("called");
	// Marker
	ctx.fillStyle = prop.markerColor;
	ctx.beginPath();
	ctx.arc(
		x,
		y,
		prop.markerRadius, 
		0, 360 * Math.PI / 180
	);
	ctx.fill();
}

function place_marker_outline(x,y) {
	// Marker outline
	ctx.strokeStyle = prop.markerOutlineColor;
	ctx.lineWidth = prop.lineWidth * 0.75;
	ctx.beginPath();
	ctx.arc(
		x,
		y,
		prop.markerRadius, 
		0, 360 * Math.PI / 180
	);
	ctx.stroke();
}

function resize() {
	// window height < window width (landscape)
	if (window.innerHeight < window.innerWidth) {
		canvas.height = window.innerHeight;
		canvas.width = canvas.height * 0.75;
	}
	// window height > window.width (portrait view)
	else {
		canvas.width = document.getElementById("container").clientWidth;
		canvas.height = canvas.width / 0.75;
	}
	// Change caller dims accordingly
	canvas_caller.height = canvas.height;
	canvas_caller.width = canvas.width;
	reparameterize();
}

function reparameterize() {
	prop.board = {
		"x": canvas.width * 0.05,
		"y": canvas.height * 0.175,
		"width": canvas.width * 0.9,
		"height": canvas.height * 0.77
	};
	prop.lineWidth = canvas.width / 100;
	prop.fontSize = canvas.width / 12;
	prop.numOffset = canvas.width / 5;
	prop.markerRadius = prop.board.width * 0.2 / 2.2;
	// REPOSITION MARKERS NEEDED DURING RESIZE (if applicable)
	for (i=0; i<prop.markers.length; i++) {
		//	var X = canvas.width * (x / canvas.width);
		//console.log(prop.markers[i].x, prop.markers[i].y, prop.oldwidth, prop.oldheight);
		prop.markers[i].x = canvas.width * (prop.markers[i].x / prop.oldwidth);
		prop.markers[i].y = canvas.height * (prop.markers[i].y / prop.oldheight);
		//console.log(prop.markers[i].x, prop.markers[i].y);
	}
	prop.oldwidth = canvas.width;
	prop.oldheight = canvas.height;
	draw();
	drawCaller();
}

function newCard() {
	prop.markers = []; 	// Clear the markers
	//console.log(1 + Math.floor(Math.random() * (15 - 1 + 1)));
	
	for (letter in prop.spaces) {
		prop.spaces[letter].numbers = [];
		for (i=0; i < 5; i++) {
			do {
				r = prop.spaces[letter].min + Math.floor(Math.random() * ((prop.spaces[letter].max + 1) - prop.spaces[letter].min));
			} while(prop.spaces[letter].numbers.includes(r));
			prop.spaces[letter].numbers.push(r);
		}
	};
	draw();
}

function clearCard() {
	prop.markers = [];
	draw();
}

function draw_numbers() {
	ctx.font = `bold ${prop.fontSize * 1}px sans-serif`;
	ctx.fillStyle = prop.numberColor;
	for (letter in prop.spaces) {
		for (row=0; row < 5; row++) {
			//console.log(letter, row, row != 2 && letter != "N");
			if ((letter != "N") || 
			   (letter == "N" && row != 2) || 
			   (letter == "N" && row == 2 && prop.freeSpace == false)) {
				ctx.fillText(
					prop.spaces[letter].numbers[row],
					prop.board.x + prop.board.width * 0.1 + prop.board.width * 0.2 * (prop.spaces[letter].col),
					prop.board.y + prop.board.height * 0.13 + prop.board.height * 0.2 * (row)
				);
			}
		}
	}
}

function outputcaller() {
	// Change Context to the hidden canvas
	canvas_caller = document.getElementById("canvas_caller_img");
	ctx_caller = canvas_caller.getContext("2d");
	let dnl_name = document.getElementById("custom_caller").value;
	// Temporarily change needed vars
	prop.lineWidth = canvas_caller.width / 100;
	prop.fontSize = canvas_caller.width / 12;
	drawCaller();
	if (dnl_name.length == 0) {
		document.getElementById("imglink_caller").download = "bingo_caller";
	}
	else {
		document.getElementById("imglink_caller").download = dnl_name;
	}
	//resize();
	// change link to download file
	document.getElementById("imglink_caller").href = canvas_caller.toDataURL();
	// Reset back to normal canvas
	prop.lineWidth = canvas.width / 100;
	prop.fontSize = canvas.width / 12;
	canvas_caller = document.getElementById("canvas_caller");
	ctx_caller = canvas_caller.getContext("2d");
}

function outputimg() {
	let zxcv = document.getElementById("canvas");
	canvas = document.getElementById("canvas_img");
	ctx = canvas.getContext("2d");
	let dnl_name = document.getElementById("custom_game").value;
	// Bool based on the checkbox
	prop.printMarkers = document.getElementById("imglinkmarkers").checked;
	// Adjust params to meet img canvas
	reparameterize();	
	// Custom Name
	if (dnl_name.length > 0) {
		document.getElementById("imglink").download = dnl_name;
	}
	// No Custom File Name
	else {
		// No markers to be printed
		if (prop.printMarkers == false) {
			document.getElementById("imglink").download = "bingo_card";
		}
		// print the markers
		else {
			document.getElementById("imglink").download = "bingo_card_with_markers";
		}
	}
	// change link to download file
	document.getElementById("imglink").href = canvas.toDataURL();
	// Reset back to normal canvas
	prop.printMarkers = true;
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	reparameterize();
}

function draw() {
	//console.log(ctx);
	ctx.clearRect(0, 0, canvas.width, canvas.height); //clear
	// BACKGROUND
	ctx.fillStyle = prop.backgroundColor;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	// GAME BOARD itself
	if (prop.backgroundColor != prop.boardBackgroundColor) {
		ctx.fillStyle = prop.boardBackgroundColor;
		ctx.fillRect(
			prop.board.x,
			prop.board.y,
			prop.board.width,
			prop.board.height
		);
	}
	// MARKER FILL(if applicable)
	if (prop.markers.length > 0 && prop.printMarkers == true) {
		//console.log(prop.markers);
		for (marker in prop.markers) {
			place_marker_fill(
				prop.markers[marker].x,
				prop.markers[marker].y
			);
		}
	}
	// BINGO NAME (TITLE)
	ctx.fillStyle = prop.titleColor;
	ctx.textAlign = "center";
	ctx.font = `bold ${prop.fontSize * 2}px sans-serif`;
	let word = "BINGO";
	for (i=0; i<word.length; i++) {
		ctx.fillText(
			word[i],
			prop.board.x + prop.board.width * 0.1 + prop.board.width * 0.2 * i,
			prop.board.height * 0.19
		);
	}
	// BORDER
	ctx.strokeStyle = prop.lineColor;
	ctx.lineWidth = prop.lineWidth;
	ctx.strokeRect(
		Math.floor(canvas.width * 0.025),
		Math.floor(canvas.height * 0.025),
		Math.floor(canvas.width * 0.95),
		Math.floor(canvas.height * 0.95)
	);
	// Game Board outer-line
	ctx.strokeStyle = prop.boardLineColor;
	ctx.lineWidth = prop.lineWidth * 0.25;
	ctx.strokeRect(
		prop.board.x,
		prop.board.y,
		prop.board.width,
		prop.board.height
	);
	// GAME BOARD LINES
	// Vertical Lines (4x)
	for (line=1; line <= 4; line++) {
		ctx.beginPath();
		ctx.moveTo(
			prop.board.x + prop.board.width * 0.2 * line,
			prop.board.height * 0.05
		);
		ctx.lineTo(
			prop.board.x + prop.board.width * 0.2 * line,
			prop.board.y + prop.board.height
		);
		ctx.stroke();
	};
	// Horizontal Lines (4x)
	for (line=1; line <= 4; line++) {
		ctx.beginPath();
		ctx.moveTo(
			prop.board.x,
			prop.board.y + prop.board.height * 0.2 * line
		);
		ctx.lineTo(
			prop.board.x + prop.board.width,
			prop.board.y + prop.board.height * 0.2 * line
		);
		ctx.stroke();
	};
	// FREE SPACE
	if (prop.freeSpace == true) {
		// CIRCLE
		// ctx.fillStyle = prop.freeSpaceColor;
		// ctx.beginPath();
		// ctx.arc(
			// Math.floor(canvas.width * 0.5),
			// canvas.height * 0.5 + prop.board.height * 0.075,
			// canvas.width * 0.08,
			// 0,
			// 360 * Math.PI / 180
		// );
		// ctx.fill();
		// CIRCLE OUTLINE
		ctx.lineWidth = prop.lineWidth * 0.5;
		ctx.beginPath();
		ctx.arc(
			Math.floor(canvas.width * 0.5),
			canvas.height * 0.5 + prop.board.height * 0.075,
			canvas.width * 0.08,
			0,
			360 * Math.PI / 180
		);
		ctx.stroke();
		// FREE TEXT
		ctx.fillStyle = prop.numberColor;
		ctx.font = `bold ${prop.fontSize * 0.65}px sans-serif`;
		ctx.fillText(
			"FREE",
			Math.floor(canvas.width * 0.5),
			canvas.height * 0.5 + prop.board.height * 0.1
		);
	};
	// NUMBERS (if applicable)
	if (prop.spaces.B.numbers.length > 0) {
		draw_numbers();
	}
	// FOOTER
	ctx.fillStyle = prop.numberColor;
	ctx.font = `bold ${prop.fontSize * 0.32}px sans-serif`;
	ctx.fillText(
		"ksgwxfan.github.io",
		Math.floor(canvas.width * 0.5),
		canvas.height * 0.964
	);
	// MARKER OUTLINE(if applicable)
	if (prop.markers.length > 0 && prop.printMarkers == true) {
		for (marker in prop.markers) {
			place_marker_outline(
				prop.markers[marker].x,
				prop.markers[marker].y
			);
		}
	}
}

function caller_active() {
	//console.log(event);
	// Canvas top-left coords
	let canvasX0 = canvas_caller.getBoundingClientRect().x;
	let canvasY0 = canvas_caller.getBoundingClientRect().y;
	// MOUSE
	if (event.type.includes("mouse")) {
		// Canvas-Relative click coords
		var xclick = event.clientX-canvasX0;
		var yclick = event.clientY-canvasY0;
	}
	// TOUCH
	else {
		var xclick = event.touches[0].clientX-canvasX0;
		var yclick = event.touches[0].clientY-canvasY0;
	}
	// Display the active button press setting
	if (
		xclick >= canvas_caller.width * 0.04
		&& xclick <= canvas_caller.width * 0.44 
		&& yclick >= canvas_caller.height * 0.04
		&& yclick <= canvas_caller.height * 0.15
	) {
		let hoffset = canvas_caller.width * 0.005;
		// CALLER "BUTTON" FILL
		ctx_caller.fillStyle = "yellow";
		ctx_caller.fillRect(
			canvas_caller.width * 0.04,
			canvas_caller.height * 0.04,
			canvas_caller.width * 0.40,
			canvas_caller.height * 0.11
		);
		// CALLER BUTTON BORDER
		ctx_caller.strokeStyle = "midnightblue";
		ctx_caller.strokeRect(
			canvas_caller.width * 0.04,
			canvas_caller.height * 0.04,
			canvas_caller.width * 0.40,
			canvas_caller.height * 0.11
		);
		// INSTRUCTION TEXT
		ctx_caller.font = `italic bold ${prop.fontSize * 0.4}px sans-serif`;
		ctx_caller.textAlign = "center";
		ctx_caller.fillStyle = "midnightblue";
		ctx_caller.fillText(
			"CLICK TO CALL",
			canvas_caller.width * 0.24,
			canvas_caller.height * 0.08
		);
		ctx_caller.fillText(
			"NEW NUMBER",
			canvas_caller.width * 0.24,
			canvas_caller.height * 0.12
		);
	}
}

function new_call() {
	// Canvas top-left coords
	let canvasX0 = canvas_caller.getBoundingClientRect().x;
	let canvasY0 = canvas_caller.getBoundingClientRect().y;
	// Canvas-Relative click coords
	let xclick = event.clientX-canvasX0;
	let yclick = event.clientY-canvasY0;
	//console.log(xclick,yclick,`:: canvas_caller.width * ${(xclick / canvas_caller.width).toFixed(2)}, canvas_caller.height * ${(yclick / canvas_caller.height).toFixed(2)}`);
	// Extent 	ctx_caller.strokeRect(
		// canvas_caller.width * 0.04,
		// canvas_caller.height * 0.04,
		// canvas_caller.width * 0.40,
		// canvas_caller.height * 0.11
	// );
	if (
		xclick >= canvas_caller.width * 0.04
		&& xclick <= canvas_caller.width * 0.44 
		&& yclick >= canvas_caller.height * 0.04
		&& yclick <= canvas_caller.height * 0.15
	) {
		while (true) {
			rnum = 1 + Math.floor(Math.random() * ((75+1) - 1));
			if (rnum >= 1 && rnum <= 15) {rletter = "B"}
			else if (rnum >= 16 && rnum <= 30) {rletter = "I"}
			else if (rnum >= 31 && rnum <= 45) {rletter = "N"}
			else if (rnum >= 46 && rnum <= 60) {rletter = "G"}
			else if (rnum >= 61 && rnum <= 75) {rletter = "O"}
			if (prop.called.includes(`${rletter}${rnum}`) == false) {
				prop.called.push(`${rletter}${rnum}`);
				prop.lastCalled = `${rletter}${rnum}`;
				break;
			}
			if (prop.called.length == 75) {
				break;
			}
		}

		drawCaller();
	}
}

function fillCalledNumber(rletter, rnum) {
	let w = canvas_caller.width * 0.19;
	let h = canvas_caller.height * 0.052;
	//console.log(rletter, rnum);

	// Handle letters (the x)
	if (rletter == "B") {
		startx = w * 0 + canvas_caller.width * 0.025;
	}
	else if (rletter == "I") {
		startx = w * 1 + canvas_caller.width * 0.025;
	}
	else if (rletter == "N") {
		startx = w * 2 + canvas_caller.width * 0.025;
	}
	else if (rletter == "G") {
		startx = w * 3 + canvas_caller.width * 0.025;
	}
	else if (rletter == "O") {
		startx = w * 4 + canvas_caller.width * 0.025;
	}
	// Handle numbers (the y)
	if ([1, 16, 31, 46, 61].includes(parseInt(rnum))) {
		starty = canvas_caller.height * 0.225 + 0 * canvas_caller.height * 0.05;
	}
	else if ([2, 17, 32, 47, 62].includes(parseInt(rnum))) {
		starty = canvas_caller.height * 0.225 + 1 * canvas_caller.height * 0.05;
	}
	else if ([3, 18, 33, 48, 63].includes(parseInt(rnum))) {
		starty = canvas_caller.height * 0.225 + 2 * canvas_caller.height * 0.05;
	}
	else if ([4, 19, 34, 49, 64].includes(parseInt(rnum))) {
		starty = canvas_caller.height * 0.225 + 3 * canvas_caller.height * 0.05;
	}
	else if ([5, 20, 35, 50, 65].includes(parseInt(rnum))) {
		starty = canvas_caller.height * 0.225 + 4 * canvas_caller.height * 0.05;
	}
	else if ([6, 21, 36, 51, 66].includes(parseInt(rnum))) {
		starty = canvas_caller.height * 0.225 + 5 * canvas_caller.height * 0.05;
	}
	else if ([7, 22, 37, 52, 67].includes(parseInt(rnum))) {
		starty = canvas_caller.height * 0.225 + 6 * canvas_caller.height * 0.05;
	}
	else if ([8, 23, 38, 53, 68].includes(parseInt(rnum))) {
		starty = canvas_caller.height * 0.225 + 7 * canvas_caller.height * 0.05;
	}
	else if ([9, 24, 39, 54, 69].includes(parseInt(rnum))) {
		starty = canvas_caller.height * 0.225 + 8 * canvas_caller.height * 0.05;
	}
	else if ([10, 25, 40, 55, 70].includes(parseInt(rnum))) {
		starty = canvas_caller.height * 0.225 + 9 * canvas_caller.height * 0.05;
	}
	else if ([11, 26, 41, 56, 71].includes(parseInt(rnum))) {
		starty = canvas_caller.height * 0.225 + 10 * canvas_caller.height * 0.05;
	}
	else if ([12, 27, 42, 57, 72].includes(parseInt(rnum))) {
		starty = canvas_caller.height * 0.225 + 11 * canvas_caller.height * 0.05;
	}
	else if ([13, 28, 43, 58, 73].includes(parseInt(rnum))) {
		starty = canvas_caller.height * 0.225 + 12 * canvas_caller.height * 0.05;
	}
	else if ([14, 29, 44, 59, 74].includes(parseInt(rnum))) {
		starty = canvas_caller.height * 0.225 + 13 * canvas_caller.height * 0.05;
	}
	else if ([15, 30, 45, 60, 75].includes(parseInt(rnum))) {
		starty = canvas_caller.height * 0.225 + 14 * canvas_caller.height * 0.05;
	}
	ctx_caller.fillStyle = prop.callerFillColor;
	ctx_caller.fillRect(
		startx,
		starty,
		w,
		h
	);
}

function resetCaller() {
	prop.called = [];
	prop.lastCalled = null;
	drawCaller();
}

function drawCaller() {
	var voffset = canvas_caller.height * 0.175;
	var hoffset = canvas_caller.width * 0.025;
	ctx_caller.clearRect(0, 0, canvas_caller.width, canvas_caller.height); //clear
	// BACKGROUND
	ctx_caller.fillStyle = "white";
	ctx_caller.fillRect(0, 0, canvas_caller.width, canvas_caller.height);
	// HEADER
	ctx_caller.fillStyle = "rgb(150,150,150)";
	ctx_caller.textAlign = "right";
	ctx_caller.font = `italic normal ${prop.fontSize * 0.32}px sans-serif`;
	ctx_caller.fillText(
		"ksgwxfan.github.io",
		canvas_caller.width * 0.96,
		canvas_caller.height * 0.045
	);
	// CALLER "BUTTON" FILL
	ctx_caller.fillStyle = "lightgray";
	ctx_caller.fillRect(
		canvas_caller.width * 0.04,
		canvas_caller.height * 0.04,
		canvas_caller.width * 0.40,
		canvas_caller.height * 0.11
	);
	// CALLER BUTTON BORDER
	ctx_caller.strokeStyle = "black";
	ctx_caller.strokeRect(
		canvas_caller.width * 0.04,
		canvas_caller.height * 0.04,
		canvas_caller.width * 0.40,
		canvas_caller.height * 0.11
	);
	// INSTRUCTION TEXT
	ctx_caller.font = `italic bold ${prop.fontSize * 0.4}px sans-serif`;
	ctx_caller.textAlign = "center";
	ctx_caller.fillStyle = "black";
	ctx_caller.fillText(
		"CLICK TO CALL",
		canvas_caller.width * 0.24,
		canvas_caller.height * 0.08
	);
	ctx_caller.fillText(
		"NEW NUMBER",
		canvas_caller.width * 0.24,
		canvas_caller.height * 0.12
	);
	// PREVIOUS CALL TEXT
	ctx_caller.font = `bold ${prop.fontSize * 0.5}px sans-serif`;
	ctx_caller.textAlign = "right";
	ctx_caller.fillText(
		"Call:",
		canvas_caller.width * 0.55,
		canvas_caller.height * 0.11
	);
	// PREVIOUSLY CALLED NUMBER
	if (prop.lastCalled != null) {
		ctx_caller.textAlign = "center";
		ctx_caller.font = `bold ${prop.fontSize * 2}px sans-serif`;
		ctx_caller.fillStyle = prop.callerPrevColor;
		ctx_caller.fillText(
			`${prop.lastCalled[0]}-${prop.lastCalled.slice(1)}`,
			canvas_caller.width * 0.75,
			canvas_caller.height * 0.14
		);
	}
	// FILL-INS (CALLED NUMBERS)
	for (n=0; n<prop.called.length; n++) {
		let letter = prop.called[n][0];
		let num = prop.called[n].slice(1);
		fillCalledNumber(letter, num);
	}
	// BORDER
	ctx_caller.strokeStyle = "black";
	ctx_caller.lineWidth = prop.lineWidth;
	ctx_caller.strokeRect(
		Math.floor(canvas_caller.width * 0.025),
		Math.floor(canvas_caller.height * 0.025),
		Math.floor(canvas_caller.width * 0.95),
		Math.floor(canvas_caller.height * 0.95)
	);
	// HORIZONTAL LINES
	ctx_caller.lineWidth = prop.lineWidth / 4;
	for (h=1; h <= 15; h++) {
		ctx_caller.beginPath();
		ctx_caller.moveTo(
			canvas_caller.width * 0.025,
			canvas_caller.height * 0.05 * h + voffset
		);
		ctx_caller.lineTo(
			canvas_caller.width * 0.975,
			canvas_caller.height * 0.05 * h + voffset
		);
		ctx_caller.stroke();
	}
	// VERTICAL LINES
	for (v=1; v<=4; v++) {
		ctx_caller.beginPath();
		ctx_caller.moveTo(
			(canvas_caller.width * 0.975 - canvas_caller.width * 0.025) * 0.2 * v + hoffset,
			canvas_caller.height * 0.05 + voffset
		);
		ctx_caller.lineTo(
			(canvas_caller.width * 0.975 - canvas_caller.width * 0.025) * 0.2 * v + hoffset,
			canvas_caller.height - (hoffset * 1.4)
		);
		ctx_caller.stroke();
	}
	// BINGO NAME (TITLE)
	ctx_caller.fillStyle = "black";
	ctx_caller.textAlign = "center";
	ctx_caller.font = `bold ${prop.fontSize}px sans-serif`;
	let word = "BINGO";
	for (i=1; i<=word.length; i++) {
		ctx_caller.fillText(
			word[i-1],
			(canvas_caller.width * 0.975 - canvas_caller.width * 0.025) * 0.2 * i - hoffset * 2.7,
			voffset * 1.2
		);
	}
	// NUMBERS
	ctx_caller.font = `normal ${prop.fontSize * 0.75}px sans-serif`;
	for (i=0; i<word.length; i++) {
		for (n=0; n<15; n++) {
			ctx_caller.fillText(
				prop.spaces[word[i]].min + 1 * n,
				(canvas_caller.width * 0.975 - canvas_caller.width * 0.025) * 0.2 * (i+1) - hoffset * 2.7,
				canvas_caller.height * 0.05 * n + voffset * 1.51
			);
		}
	}
}






















