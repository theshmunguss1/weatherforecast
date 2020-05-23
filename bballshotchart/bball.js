var courtobj = {teamA: "", teamB: "", colorA: "#7BAFD4", colorB: "#000099", current_team: "A", current_half: "1", current_class: "pieceA1", mode: "NA", erase: "N"};
// Huge help with understanding how to change classes: (https://www.w3schools.com/jsref/met_element_getelementsbyclassname.asp)
var teamstats = {Afgm_1: 0, Afga_1: 0, Afg3m_1: 0, Afg3a_1: 0, Aptspaint_1: 0, Afgm_2: 0, Afga_2: 0, Afg3m_2: 0, Afg3a_2: 0, Aptspaint_2: 0,
				 Bfgm_1: 0, Bfga_1: 0, Bfg3m_1: 0, Bfg3a_1: 0, Bptspaint_1: 0, Bfgm_2: 0, Bfga_2: 0, Bfg3m_2: 0, Bfg3a_2: 0, Bptspaint_2: 0,
				 Afgm_3: 0, Afga_3: 0, Afg3m_3: 0, Afg3a_3: 0, Bfgm_3: 0, Bfga_3: 0, Bfg3m_3: 0, Bfg3a_3: 0};
var cell_highlight = "#4d4d4d";
var allplayers;		// Will be object to hold all of the player objects
var idcount = 0;	// Will be used to give ID's to each shot

function loading() {
	changeteamnames("Team A","Team B");
	teamtoggle("A");
	halfselect("1");
}

function mode_change() {
	// M = 77; S = 83; E = 69
	if (/M$/.test(event.code)) {
		if (courtobj.mode == "score" || courtobj.mode == "NA") {
			courtobj.mode = "miss";
			document.getElementById("mode_miss").style.display = "block";
			document.getElementById("mode_score").style.display = "none";
		}
		else {
			courtobj.mode = "NA";
			document.getElementById("mode_miss").style.display = "none";
		}
	}
	if (/S$/.test(event.code)) {		// Score Mode Toggle
		if (courtobj.mode == "miss" || courtobj.mode == "NA") {
			courtobj.mode = "score";
			document.getElementById("mode_score").style.display = "block";
			document.getElementById("mode_miss").style.display = "none";
		}
		else {
			courtobj.mode = "NA";
			document.getElementById("mode_score").style.display = "none";
		}
	}
	if (/E$/.test(event.code)) {		// Erase Mode Toggle
		if (courtobj.current_half != "3") {
			if (courtobj.erase == "N") {	// TURN ON ERASE MODE
				courtobj.erase = "Y";
				document.getElementById("mode_erase").style.display = "block";
				document.getElementById ("glass-pane").style.display = "none";
			}
			else {		// TURN OFF ERASE MODE
				courtobj.erase = "N";
				document.getElementById("mode_erase").style.display = "none";
				document.getElementById ("glass-pane").style.display = "block";
			}
		}
	}
}

function teamtoggle(t) {	// Change team focus
	//console.log(t);
	if (t != courtobj.current_team) {
		document.getElementById("team" + courtobj.current_team).style.backgroundColor = "transparent";
		// Change display of previous teams shots
		for (x=0;x<document.getElementsByClassName("piece" + courtobj.current_team + "1").length;x++) {
			document.getElementsByClassName("piece" + courtobj.current_team + "1")[x].style.display = "none";
		}
		for (x=0;x<document.getElementsByClassName("piece" + courtobj.current_team + "2").length;x++) {
			document.getElementsByClassName("piece" + courtobj.current_team + "2")[x].style.display = "none";
		}
		courtobj.current_team = t;
		if (courtobj.current_half != "3") {chgshotdisp(t);}
		else {
			for (x=0;x<document.getElementsByClassName("piece" + courtobj.current_team + "1").length;x++) {
				document.getElementsByClassName("piece" + courtobj.current_team + "1")[x].style.display = "block";
			}
			for (x=0;x<document.getElementsByClassName("piece" + courtobj.current_team + "2").length;x++) {
				document.getElementsByClassName("piece" + courtobj.current_team + "2")[x].style.display = "block";
			}
		}
	}
	document.getElementById("team" + t).style.backgroundColor = cell_highlight;
}

function halfselect(halfnum) {
	if (halfnum != courtobj.current_half) {		// If we have a half change
		if (courtobj.current_half == "3") {			// If we are changing from the full game shot chart, RESET everything (will show later in function)
			for (x=0;x<document.getElementsByClassName("piece" + courtobj.current_team + "1").length;x++) {
				document.getElementsByClassName("piece" + courtobj.current_team + "1")[x].style.display = "none";
			}
			for (x=0;x<document.getElementsByClassName("piece" + courtobj.current_team + "2").length;x++) {
				document.getElementsByClassName("piece" + courtobj.current_team + "2")[x].style.display = "none";
			}
		}
		document.getElementById("half" + courtobj.current_half).style.backgroundColor = "transparent";		// Cell bg change to deselect
		courtobj.current_half = halfnum;	// Change half number in game obj
		if (halfnum == "3") {		// if full game is selected
			if (courtobj.erase == "Y") {
				document.getElementById("glass-pane").style.display = "block";
			}
			for (x=0;x<document.getElementsByClassName("piece" + courtobj.current_team + "1").length;x++) {
				document.getElementsByClassName("piece" + courtobj.current_team + "1")[x].style.display = "block";	// Display new chart
			}
			for (x=0;x<document.getElementsByClassName("piece" + courtobj.current_team + "2").length;x++) {
				document.getElementsByClassName("piece" + courtobj.current_team + "2")[x].style.display = "block";	// Display new chart
			}
		}
		else {		// Controls display if Half 1 or Half 2 are displayed
			if (courtobj.erase == "Y") {
				document.getElementById("glass-pane").style.display = "none";
			}
			chgshotdisp(halfnum);
		}
	}
	document.getElementById("half" + halfnum).style.backgroundColor = cell_highlight;
}

function chgshotdisp(strchg) {
	// typechg: "half" or "team" ... strchg: "A","B","1","2"
	for (x=0;x<document.getElementsByClassName(courtobj.current_class).length;x++) {
		document.getElementsByClassName(courtobj.current_class)[x].style.display = "none";	// Hide old chart
	}
	if (strchg == "1" || strchg == "2") {		// Half Change indicated
		courtobj.current_class = "piece" + courtobj.current_team + strchg;
	}
	else if (strchg == "A" || strchg == "B") {										// Team Change indicated
		courtobj.current_class = "piece" + strchg + courtobj.current_half;
	}
	for (x=0;x<document.getElementsByClassName(courtobj.current_class).length;x++) {
		document.getElementsByClassName(courtobj.current_class)[x].style.display = "block";	// Display new chart
	}
}

function changeteamnames(a,b) { 		// Change team names
	document.getElementById("teamA").innerHTML = a;
	document.getElementById("statheadA").innerHTML = a;
	courtobj.teamA = a;
	document.getElementById("teamB").innerHTML = b;
	document.getElementById("statheadB").innerHTML = b;
	courtobj.teamB = b;
}

function teamcolor_assemble(tmref) {
	h = document.getElementById(tmref + "hue").value;
	s = document.getElementById(tmref + "sat").value;
	l = document.getElementById(tmref + "light").value;
	newteamcolor = `hsl(${h},${s}%,${l}%)`;
	chg_teamcolor(tmref,newteamcolor);
}

function chg_teamcolor(tmref,tmcolor) {
	var standardbgimg = "repeating-linear-gradient(45deg,transparent 0%,transparent 44.9%,white 45%, white 55%),repeating-linear-gradient(135deg,transparent 0%,transparent 44.9%,white 45%, white 55%)";
	courtobj["color" + tmref] = tmcolor;	// internal update of team color
	document.getElementById("teamcolor" + tmref + "_sm").style.backgroundColor = tmcolor;	// Page update of team color
	for (x=0;x<document.getElementsByClassName("piece" + courtobj.current_team + "1").length;x++) {
		//console.log(document.getElementsByClassName(courtobj.current_class)[x].innerHTML);
		if (document.getElementsByClassName("piece" + courtobj.current_team + "1")[x].innerHTML != "X") {
			document.getElementsByClassName("piece" + courtobj.current_team + "1")[x].style.backgroundColor = tmcolor;	// Change color of shots
		}
	}
	for (x=0;x<document.getElementsByClassName("piece" + courtobj.current_team + "2").length;x++) {
		//console.log(document.getElementsByClassName(courtobj.current_class)[x].innerHTML);
		if (document.getElementsByClassName("piece" + courtobj.current_team + "2")[x].innerHTML != "X") {
			document.getElementsByClassName("piece" + courtobj.current_team + "2")[x].style.backgroundColor = tmcolor;	// Change color of shots
		}
	}
}

function changecourt() {
	h = document.getElementById("Chue").value;
	s = document.getElementById("Csat").value;
	l = document.getElementById("Clight").value;
	//console.log(`hsl(${newcolor},100,50)`);
	document.getElementById("courtfill").style.backgroundColor = `hsl(${h},${s}%,${l}%)`;
	document.getElementById("courtcolor_sm").style.backgroundColor = `hsl(${h},${s}%,${l}%)`;
}

function defplayers() {
	var a01 = {playername: "Player Name", playernumber: 99, fgm: 0, fga: 0, fg3m: 0, fg3a: 0, ftm: 0, fta: 0, pts: 0};
	var a12 = a11 = a10 = a09 = a08 = a07 = a06 = a05 = a04 = a03 = a02 = b12 = b11 = b10 = b09 = b08 = b07 = b06 = b05 = b04 = b03 = b02 = b01 = a01;
	allplayers = {a12, a11, a10, a09, a08, a07, a06, a05, a04, a03, a02, a01, b12, b11, b10, b09, b08, b07, b06, b05, b04, b03, b02, b01};
	
	//console.log(allplayers["a02"].playername);
}

function addfg() {
	var offx = event.target.getBoundingClientRect().left;
	var offy = event.target.getBoundingClientRect().top;
	var x = event.clientX - offx;
	var y = event.clientY - offy;

	//courtobj.current_class = "piece" + courtobj.current_team + courtobj.current_half;	// pieceA1
	if (courtobj.current_half != "3") {
		if (courtobj.mode != "NA") {
			// SCORE MODE
			if (courtobj.mode == "score") {
				var styleend = 'background-color:' + courtobj["color" + courtobj.current_team];
				document.getElementById("fgcontainer").innerHTML = document.getElementById("fgcontainer").innerHTML + '<div id="shot' + idcount + '" class="' + courtobj.current_class + '" style="left:' + x + 'px;top:' + y + 'px;' + styleend + ';" onClick="delshot()"></div>';
			}
			else {		// MISS MODE
				var styleend = 'background-color:rgba(255,255,255, 0.45)';
				document.getElementById("fgcontainer").innerHTML = document.getElementById("fgcontainer").innerHTML + '<div id="shot' + idcount + '" class="' + courtobj.current_class + '" style="left:' + x + 'px;top:' + y + 'px;color:#4B4B4B;' + styleend + ';" onClick="delshot()">X</div>';
			}
			idcount += 1;
			addstats(x,y);
		}
	}
}

function addstats(xcoord,ycoord) {		// DOES NOT HANDLE DELETION OF Field Goals
	// Afgm_1: 0, Afga_1: 0, Afg3m_1: 0
	// courtobj.current_team ... courtobj.current_half
	//console.log(courtobj.current_team + "fgm_" + courtobj.current_half);
	var threeptr = determinedist(xcoord,ycoord);	// Determine if a 3pt FG was shot or not; defines a boolean
	//console.log(threeptr);
	if (courtobj.mode == "score") {		// Adding Field Goals
		teamstats[courtobj.current_team + "fgm_" + courtobj.current_half] += 1;		// Half Stat update
		teamstats[courtobj.current_team + "fgm_3"] += 1;							// Game Stat update
		// page updates
		document.getElementById(courtobj.current_team + "fgm_" + courtobj.current_half + "stat").innerHTML = teamstats[courtobj.current_team + "fgm_" + courtobj.current_half];		// Upload Half Stat
		document.getElementById(courtobj.current_team + "fgm_3stat").innerHTML = teamstats[courtobj.current_team + "fgm_1"] + teamstats[courtobj.current_team + "fgm_2"];	// Upload Game Stat
		if (threeptr == true) {
			teamstats[courtobj.current_team + "fg3m_" + courtobj.current_half] += 1;		// 3pt Half Stat update
			teamstats[courtobj.current_team + "fg3m_3"] += 1;		// 3pt Game Stat update
			document.getElementById(courtobj.current_team + "fg3m_" + courtobj.current_half + "stat").innerHTML = teamstats[courtobj.current_team + "fg3m_" + courtobj.current_half];	// Upload 3pt Half Stat
			document.getElementById(courtobj.current_team + "fg3m_3stat").innerHTML = teamstats[courtobj.current_team + "fg3m_3"];	// Upload 3pt Game Stat
		}
	}
	if (threeptr == true) {		// Update 3pt ATTEMPTS Stats
		teamstats[courtobj.current_team + "fg3a_" + courtobj.current_half] += 1;	// 3pt Half Stat Update
		teamstats[courtobj.current_team + "fg3a_3"] += 1;	// 3pt Game Stat Update
		document.getElementById(courtobj.current_team + "fg3a_" + courtobj.current_half + "stat").innerHTML = teamstats[courtobj.current_team + "fg3a_" + courtobj.current_half];	// Upload 3pt Attempt Half Stat
		document.getElementById(courtobj.current_team + "fg3a_3stat").innerHTML = teamstats[courtobj.current_team + "fg3a_3"];	// Upload 3pt Attempt Game Stat
		document.getElementById(courtobj.current_team + "fg3_" + courtobj.current_half + "PERC").innerHTML = (teamstats[courtobj.current_team + "fg3m_" + courtobj.current_half] / teamstats[courtobj.current_team + "fg3a_" + courtobj.current_half] * 100).toFixed(1).toString() + " &percnt;";	// Upload 3pt PERC Half Stat
		document.getElementById(courtobj.current_team + "fg3_3PERC").innerHTML = (teamstats[courtobj.current_team + "fg3m_3"] / teamstats[courtobj.current_team + "fg3a_3"] * 100).toFixed(1).toString() + " &percnt;";		// Upload 3pt PERC Game Stat
	}
	teamstats[courtobj.current_team + "fga_" + courtobj.current_half] += 1;		// Attempt Half Stat update
	teamstats[courtobj.current_team + "fga_3"] += 1;		// Attempt Game Stat update
	document.getElementById(courtobj.current_team + "fga_" + courtobj.current_half +"stat").innerHTML = teamstats[courtobj.current_team + "fga_" + courtobj.current_half];	// Upload Attempt Half stat
	document.getElementById(courtobj.current_team + "fga_3stat").innerHTML = teamstats[courtobj.current_team + "fga_3"];	// Upload Attempt Game Stat
	document.getElementById(courtobj.current_team + "fg_" + courtobj.current_half + "PERC").innerHTML = ((teamstats[courtobj.current_team + "fgm_" + courtobj.current_half] / teamstats[courtobj.current_team + "fga_" + courtobj.current_half]) * 100).toFixed(1).toString() + " &percnt;";	// Upload PERC Attempt Half Stat
	document.getElementById(courtobj.current_team + "fg_3PERC").innerHTML = (teamstats[courtobj.current_team + "fgm_3"] / teamstats[courtobj.current_team + "fga_3"] * 100).toFixed(1).toString() + " &percnt;";	// Upload PERC Attempt Game Stat
}

function determinedist(xdist,ydist) {
	xabs = Math.abs(280 - xdist);
	yabs = Math.abs(82.5 - ydist);
	
	tot_dist = Math.sqrt(xabs**2 + yabs**2);
	//console.log("Distance: " + tot_dist + " ... 3ptr?: " + (tot_dist >= 220));
	return (tot_dist >= 220);
}

function delshot() {
	// Taught me how to remove elements: https://www.w3schools.com/js/js_htmldom_nodes.asp
	//console.log(event.target.id);
	var xpx = document.getElementById(event.target.id).style.left;
	var ypx = document.getElementById(event.target.id).style.top;
	var xnum = xpx.replace("px","").trim();
	var ynum = ypx.replace("px","").trim();
	var is3 = determinedist(xnum,ynum);
	var missed = (document.getElementById(event.target.id).innerHTML == "X");
	console.log(missed);
	document.getElementById("fgcontainer").removeChild(document.getElementById(event.target.id));
	// STAT UPDATE
	// Afgm_1: 0, Afga_1: 0, Afg3m_1: 0, Afg3a_1: 0
	// Afgm_2: 0, Afga_2: 0, Afg3m_2: 0, Afg3a_2: 0
	// Afgm_3: 0, Afga_3: 0, Afg3m_3: 0, Afg3a_3: 0
	if (is3 == true) {		// If the FG was a 3ptr
		if (missed == false) {		// SCORED 3PTR
			teamstats[courtobj.current_team + "fg3m_" + courtobj.current_half] -= 1;
			teamstats[courtobj.current_team + "fg3m_3"] -= 1;
			document.getElementById(courtobj.current_team + "fg3m_" + courtobj.current_half + "stat").innerHTML = teamstats[courtobj.current_team + "fg3m_" + courtobj.current_half];
			document.getElementById(courtobj.current_team + "fg3m_3" + "stat").innerHTML = teamstats[courtobj.current_team + "fg3m_3"];
		}
		teamstats[courtobj.current_team + "fg3a_" + courtobj.current_half] -= 1;
		teamstats[courtobj.current_team + "fg3a_3"] -= 1;
		document.getElementById(courtobj.current_team + "fg3a_" + courtobj.current_half + "stat").innerHTML = teamstats[courtobj.current_team + "fg3a_" + courtobj.current_half];
		document.getElementById(courtobj.current_team + "fg3a_3" + "stat").innerHTML = teamstats[courtobj.current_team + "fg3a_3"];
		if (teamstats[courtobj.current_team + "fg3a_" + courtobj.current_half] == 0) {
			document.getElementById(courtobj.current_team + "fg3_" + courtobj.current_half + "PERC").innerHTML = "--";
		}
		else {
			document.getElementById(courtobj.current_team + "fg3_" + courtobj.current_half + "PERC").innerHTML = (teamstats[courtobj.current_team + "fg3m_" + courtobj.current_half] / teamstats[courtobj.current_team + "fg3a_" + courtobj.current_half] * 100).toFixed(1).toString() + " &percnt;";
		}
		if (teamstats[courtobj.current_team + "fg3a_3"] == 0) {
			document.getElementById(courtobj.current_team + "fg3_3" + "PERC").innerHTML = "--";
		}
		else {
			document.getElementById(courtobj.current_team + "fg3_3" + "PERC").innerHTML = (teamstats[courtobj.current_team + "fg3m_3"] / teamstats[courtobj.current_team + "fg3a_3"] * 100).toFixed(1).toString() + " &percnt;";
		}
	}
	if (missed == false) {			// SCORED FG
		teamstats[courtobj.current_team + "fgm_" + courtobj.current_half] -= 1;
		teamstats[courtobj.current_team + "fgm_3"] -= 1;
		document.getElementById(courtobj.current_team + "fgm_" + courtobj.current_half + "stat").innerHTML = teamstats[courtobj.current_team + "fgm_" + courtobj.current_half];
		document.getElementById(courtobj.current_team + "fgm_3" + "stat").innerHTML = teamstats[courtobj.current_team + "fgm_3"];
	}
	teamstats[courtobj.current_team + "fga_" + courtobj.current_half] -= 1;
	teamstats[courtobj.current_team + "fga_3"] -= 1;
	document.getElementById(courtobj.current_team + "fga_" + courtobj.current_half + "stat").innerHTML = teamstats[courtobj.current_team + "fga_" + courtobj.current_half];
	document.getElementById(courtobj.current_team + "fga_3" + "stat").innerHTML = teamstats[courtobj.current_team + "fga_3"];
	if (teamstats[courtobj.current_team + "fga_" + courtobj.current_half] == 0) {
		document.getElementById(courtobj.current_team + "fg_" + courtobj.current_half + "PERC").innerHTML = "--";
	}
	else {
		document.getElementById(courtobj.current_team + "fg_" + courtobj.current_half + "PERC").innerHTML = ((teamstats[courtobj.current_team + "fgm_" + courtobj.current_half] / teamstats[courtobj.current_team + "fga_" + courtobj.current_half]) * 100).toFixed(1).toString() + " &percnt;";
	}
	if (teamstats[courtobj.current_team + "fga_3"] == 0) {
		document.getElementById(courtobj.current_team + "fg_3PERC").innerHTML = "--";
	}
	else {
		document.getElementById(courtobj.current_team + "fg_3PERC").innerHTML = (teamstats[courtobj.current_team + "fgm_3"] / teamstats[courtobj.current_team + "fga_3"] * 100).toFixed(1).toString() + " &percnt;";
	}
}