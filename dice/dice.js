var r1 = '<div class="CIRCLE" style="top:50%;left:50%;"></div>';
var r2 = '<div class="CIRCLE" style="top:22.5%;left:22.5%;"></div>'
	   + '<div class="CIRCLE" style="top:77.5%;left:77.5%;"></div>';
var r3 = '<div class="CIRCLE" style="top:50%;left:50%;"></div>'
	   + '<div class="CIRCLE" style="top:22.5%;left:22.5%;"></div>'
	   + '<div class="CIRCLE" style="top:77.5%;left:77.5%;"></div>';
var r4 = '<div class="CIRCLE" style="top:22.5%;left:77.5%;"></div>'
	   + '<div class="CIRCLE" style="top:22.5%;left:22.5%;"></div>'
	   + '<div class="CIRCLE" style="top:77.5%;left:22.5%;"></div>'
	   + '<div class="CIRCLE" style="top:77.5%;left:77.5%;"></div>';
var r5 = '<div class="CIRCLE" style="top:50%;left:50%;"></div>'
	   + '<div class="CIRCLE" style="top:22.5%;left:77.5%;"></div>'
	   + '<div class="CIRCLE" style="top:22.5%;left:22.5%;"></div>'
	   + '<div class="CIRCLE" style="top:77.5%;left:22.5%;"></div>'
	   + '<div class="CIRCLE" style="top:77.5%;left:77.5%;"></div>';
var r6 = '<div class="CIRCLE" style="top:22.5%;left:77.5%;"></div>'
	   + '<div class="CIRCLE" style="top:22.5%;left:22.5%;"></div>'
	   + '<div class="CIRCLE" style="top:50%;left:22.5%;"></div>'
	   + '<div class="CIRCLE" style="top:50%;left:77.5%;"></div>'
	   + '<div class="CIRCLE" style="top:77.5%;left:22.5%;"></div>'
	   + '<div class="CIRCLE" style="top:77.5%;left:77.5%;"></div>';
var allrolls = ["ZERO",r1,r2,r3,r4,r5,r6];
var rollStarted = false; 	// Infinite loop prevention

// TIMING
var timer;				// Will initiate the rolling
var timer2;				// Will initiate the rolling
var interval = 90;		// The frequency of the bounce
var bounces;			// Will help determine how long the dice rolls
var bounce_count = 0; 	// Will keep track of the counts
var bounce_count2 = 0; 	// Will keep track of the counts
var diceboard = document.getElementById("diceboard");
var dice1 = document.getElementById("dice1");
var dice2 = document.getElementById("dice2");
var diceqty = document.getElementsByName("diceqty");
var ctrl = document.getElementById("controls");
var count_container = document.getElementById("rollcountcontainer");
var target_dimension = 75; 	// ex. 75vmax

let is_portrait = matchMedia('(orientation: portrait)');
let is_landscape = matchMedia('(orientation: landscape)');
is_portrait.onchange = change_orientation;

function change_orientation(event=null) {
	// Only one dice visible
	if (diceboard.children.length == 1) {
		diceboard.style.aspectRatio = "1 / 1";
		diceboard.style.width = `calc(${target_dimension}vmax / 2)`;
		diceboard.style.height = "auto";
	}
	// Two Dice
	else {
		diceboard.style.aspectRatio = (is_portrait.matches) ? "1 / 2" : "2 / 1";
		// Landscape
		if (is_landscape.matches) {
			diceboard.style.width = `${target_dimension}vmax`;
			diceboard.style.height = "auto";
		}
		// Portrait
		else if (is_portrait.matches) {
			diceboard.style.height = `${target_dimension}vmax`;
			diceboard.style.width = "auto";
		}
	}
}

function get_orientation() {
	if (innerWidth >= innerHeight) {
		return "landscape";
	}
	else {
		return "portrait";
	}
}

function hide2() {
	// Hide 2nd Dice
	// dice2.style.display = "none";
	diceboard.removeChild(dice2);

	change_orientation();

	document.getElementById("dice2and").style.display = "none";
	document.getElementById("rollcount2").style.display = "none";
}
function unhide2() {
	// Make 2nd Dice re-appear
	// dice2.style.display = "block";
	diceboard.appendChild(dice2);

	change_orientation();

	document.getElementById("dice2and").style.display = "inline";
	document.getElementById("rollcount2").style.display = "inline";
}

function keyroll() {
	if (/R$/i.test(event.key)) {timeroll();}		// Press 'R' to roll
}

function roll() {
	var r = Math.floor(Math.random() * 6 + 1);	// We want a number >= 1 and <= 6
	//console.log(r);
	dice1.innerHTML = allrolls[r];
	bounce_count += 1;
	if (bounce_count == bounces) {
		clearInterval(timer);
		bounce_count = 0;
		document.getElementById("rollcount1").innerHTML = r;
		rollStarted = false;
	}
}
function roll2() {
	var r = Math.floor(Math.random() * 6 + 1);	// We want a number >= 1 and <= 6
	//console.log(r);
	dice2.innerHTML = allrolls[r];
	bounce_count2 += 1;
	if (bounce_count2 == bounces) {
		clearInterval(timer2);
		bounce_count2 = 0;
		document.getElementById("rollcount2").innerHTML = r;
	}
}

function timeroll() {
	if (rollStarted == false) {
		rollStarted = true;
		bounces = Math.floor(Math.random() * 7 + 9);
		timer = setInterval(roll, interval);
		timer2 = setInterval(roll2, interval);
		document.getElementById("rollcount1").innerHTML = "_";
		document.getElementById("rollcount2").innerHTML = "_";
	}
}
