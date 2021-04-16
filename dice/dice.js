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
var dbid = document.getElementById("diceboard");

function hide2() {
	document.getElementById("dice2").style.display = "none";
	dbid.setAttribute("class",dbid.getAttribute("class") + " BOARD1");
	document.getElementById("dice2and").style.display = "none";
	document.getElementById("rollcount2").style.display = "none";
}
function unhide2() {
	document.getElementById("dice2").style.display = "block";
	dbid.setAttribute("class","BOARD");
	document.getElementById("dice2and").style.display = "inline";
	document.getElementById("rollcount2").style.display = "inline";
}

function keyroll() {
	if (/R$/i.test(event.key)) {timeroll();}		// Press 'R' to roll
}

function roll() {
	var r = Math.floor(Math.random() * 6 + 1);	// We want a number >= 1 and <= 6
	//console.log(r);
	document.getElementById("dice1").innerHTML = allrolls[r];
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
	document.getElementById("dice2").innerHTML = allrolls[r];
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
		bounces = Math.floor(Math.random() * 7 + 9);	// We want a number >= 1 and <= 6
		timer = setInterval(roll,interval);
		timer2 = setInterval(roll2,interval);
		document.getElementById("rollcount1").innerHTML = "_";
		document.getElementById("rollcount2").innerHTML = "_";
	}
}
