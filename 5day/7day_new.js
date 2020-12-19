// This object will contain the global forecast options
var frcst = {"dayqty":7,"tempunits":"F","H":240,"S":100,"L":50};

var sky = ["5day/sky_sun_clr.svg",
			"5day/sky_sun_clr_smile.svg",
			"5day/sky_sun_mostly.svg",
			"5day/sky_sun_partly.svg",
			"5day/sky_cloudy_mostly.svg",
			"5day/sky_cloudy_overcast.svg",
			"5day/sky_cloudy_rain_partly_sunny.svg",
			"5day/sky_cloudy_rain_mostlycloudy.svg",
			"5day/sky_cloudy_rain.svg",
			"5day/sky_cloudy_rain_catsdogs.svg",
			"5day/sky_cloudy_partly_sunny_tstorm.svg",
			"5day/sky_cloudy_mostly_sunny_tstorm.svg",
			"5day/sky_cloudy_tstorm.svg",
			"5day/sky_cloudy_partly_sunny_tstorm_only.svg",
			"5day/sky_cloudy_mostly_sunny_tstorm_only.svg",
			"5day/sky_cloudy_tstorm_only.svg",
			"5day/sky_hurricane.svg",
			"5day/sky_cloudy_snow.svg",
			"5day/sky_cloudy_snra.svg",
			"5day/sky_cloudy_wintrymix2.svg",
			"5day/sky_cloudy_wintrymix.svg"];

var desc = ["5day/desc_blank.svg",
			"5day/desc_windy.svg",
			"5day/desc_hot.svg",
			"5day/desc_muggy.svg",
			"5day/desc_dry.svg",
			"5day/desc_severe.svg",
			"5day/desc_heavy_rain.svg",
			"5day/desc_heavy_snow.svg",
			"5day/desc_blizzard.svg",
			"5day/desc_frost.svg",
			"5day/desc_fog.svg",
			"5day/desc_AM_clearing.svg",
			"5day/desc_PM_clearing.svg",
			"5day/desc_NIGHT_clearing.svg",
			"5day/desc_AM_inc_clouds.svg",
			"5day/desc_PM_inc_clouds.svg",
			"5day/desc_NIGHT_inc_clouds.svg",
			"5day/desc_perc_AM.svg",
			"5day/desc_perc_PM.svg",
			"5day/desc_perc_NIGHT.svg",
			"5day/desc_perc_rain.svg",
			"5day/desc_perc_tstorms.svg",
			"5day/desc_perc_snow.svg"
		];

// Load-up opts
function loadup() {

}

//document.getElementById("sky1").addEventListener("mouseover",toggleview("sky1arrows"));
//document.getElementById("sky1").addEventListener("mouseleave",toggleview("sky1arrows"));
function toggleview(id) {
	// The element must be given individually, a display value, for this to work
	did = document.getElementById(id); 	// The full object
	if (did.style.display == "block") {did.style.display = "none";}
	else if (did.style.display == "none") {did.style.display = "block";}
}

function divshow(id) {document.getElementById(id).style.display = "block";}
function divhide(id) {document.getElementById(id).style.display = "none";}

// TOGGLE BETWEEN 5/7 Day Forecasts
function daystoggle(v) {
	if (v != frcst.dayqty) {
		if (v == 7) {
			//width:  calc(98vmin * 200%);
			//height: calc(98vmax / 2);
			frcst.dayqty = 7;
			document.getElementById("frcstdays").innerHTML = 7;
			document.getElementById("canvas").style.width = "var(--WIDTH7)";
			document.getElementById("canvas").style.height = "var(--HEIGHT7)";
			document.getElementById("canvas").style.borderSpacing = "5px 10px";
			document.getElementById("canvas").style.paddingLeft = "0";
			document.getElementById("title").setAttribute("colspan", 7);
			document.getElementById("title").style.fontSize = "var(--FONTSIZEtitlebox)";
			document.getElementById("d6").style.display = "table-cell";
			document.getElementById("d7").style.display = "table-cell";
			//Options
			document.getElementById("d6optsblock").style.display = "table-cell";
			document.getElementById("d7optsblock").style.display = "table-cell";
			document.getElementById("percentbox6block").style.display = "table-cell";
			document.getElementById("percentbox7block").style.display = "table-cell";
			document.getElementById("uvi6block").style.display = "table-cell";
			document.getElementById("uvi7block").style.display = "table-cell";
			document.getElementById("wind6block").style.display = "table-cell";
			document.getElementById("wind7block").style.display = "table-cell";
			document.getElementById("tmax6block").style.display = "table-cell";
			document.getElementById("tmax7block").style.display = "table-cell";
			document.getElementById("tmin6block").style.display = "table-cell";
			document.getElementById("tmin7block").style.display = "table-cell";
			
		}
		if (v == 5) {
			frcst.dayqty = 5;
			document.getElementById("frcstdays").innerHTML = 5;
			document.getElementById("canvas").style.width = "var(--WIDTH5)";
			document.getElementById("canvas").style.height = "var(--HEIGHT5)";
			document.getElementById("canvas").style.borderSpacing = "6px 10px";
			document.getElementById("title").setAttribute("colspan", 5);
			document.getElementById("title").style.fontSize = "calc(var(--FONTSIZEtitlebox) * 0.7)";
			document.getElementById("d6").style.display = "none";
			document.getElementById("d7").style.display = "none";
			//Options
			document.getElementById("d6optsblock").style.display = "none";
			document.getElementById("d7optsblock").style.display = "none";
			document.getElementById("percentbox6block").style.display = "none";
			document.getElementById("percentbox7block").style.display = "none";
			document.getElementById("uvi6block").style.display = "none";
			document.getElementById("uvi7block").style.display = "none";
			document.getElementById("wind6block").style.display = "none";
			document.getElementById("wind7block").style.display = "none";
			document.getElementById("tmax6block").style.display = "none";
			document.getElementById("tmax7block").style.display = "none";
			document.getElementById("tmin6block").style.display = "none";
			document.getElementById("tmin7block").style.display = "none";
		}
			
	}
}

// Upon loading, will select the start day of the week to display (current day + 1)
function load_day_select() {
	z = new Date();		// Get the current time
	daystr = z.toString().substring(0,3).toUpperCase(); 	// Extracts the day of the week; puts it in upper case for comparison
	dayopts = document.getElementById("dayselect").options 	// a list of the individual values of the dayselect select obj
	for (i=0;i<=dayopts.length;i++) {
		if (daystr == dayopts[i].value.substring(0,3)) {
			if (daystr == "SUN") {
				day_select(dayopts[0].value);
				document.getElementById("dayselect").selectedIndex = 0;
			}
			else {
				day_select(dayopts[i+1].value);
				document.getElementById("dayselect").selectedIndex = i+1;
			}
			break;
		}
	}
}

function day_select(dyofwk) {
	// Prints the 3 characters corresponding to the proper day
	document.getElementById("name1").innerHTML = dyofwk.substring(0,3);
	document.getElementById("d1name").innerHTML = dyofwk.substring(0,3);
	document.getElementById("name2").innerHTML = dyofwk.substring(3,6);
	document.getElementById("d2name").innerHTML = dyofwk.substring(3,6);
	document.getElementById("name3").innerHTML = dyofwk.substring(6,9);
	document.getElementById("d3name").innerHTML = dyofwk.substring(6,9);
	document.getElementById("name4").innerHTML = dyofwk.substring(9,12);
	document.getElementById("d4name").innerHTML = dyofwk.substring(9,12);
	document.getElementById("name5").innerHTML = dyofwk.substring(12,15);
	document.getElementById("d5name").innerHTML = dyofwk.substring(12,15);
	document.getElementById("name6").innerHTML = dyofwk.substring(15,18);
	document.getElementById("d6name").innerHTML = dyofwk.substring(15,18);
	document.getElementById("name7").innerHTML = dyofwk.substring(18,21);
	document.getElementById("d7name").innerHTML = dyofwk.substring(18,21);
}

function random_forecast() {
	// FAHRENHEIT
	if (frcst.tempunits == "F") {
		var start = -10 + Math.floor(Math.random()*(100+20));
		var HIs = [start-15, start+15];
		var LOs = [start-25, start];
	}
	// CELCIUS
	else {
		var start = -20 + Math.floor(Math.random()*(38+28));
		var HIs = [start-7, start+7];
		var LOs = [start-15, start];
	}
	var storedHIs = [];
	var storedLOs = [];

	for (i=0;i<7;i++) {
		validtemps = false;
		while (validtemps == false) {
			temphi = HIs[1] + Math.floor(Math.random() * (HIs[0]-HIs[1]))
			templo = LOs[1] + Math.floor(Math.random() * (LOs[0]-LOs[1]))
			if (i == 0) {
				if (templo < temphi) {
					change_temp("hi"+ (i+1).toString(),temphi);
					document.getElementById("tmax"+(i+1).toString()).value = temphi;
					storedHIs.push(temphi);
					change_temp("lo"+ (i+1).toString(),templo);
					document.getElementById("tmin"+(i+1).toString()).value = templo;
					storedLOs.push(templo);
					validtemps = true;
				}
			}
			else {
				if (templo < temphi && temphi >= storedLOs[i-1]) {
					change_temp("hi"+ (i+1).toString(),temphi);
					document.getElementById("tmax"+(i+1).toString()).value = temphi;
					storedHIs.push(temphi);
					change_temp("lo"+ (i+1).toString(),templo);
					document.getElementById("tmin"+(i+1).toString()).value = templo;
					storedLOs.push(templo);
					validtemps = true;
				}
			}
		}
	}
}
function randombg() {
	// random = lower + Math.floor(Math.random() * (higher-lower));
	var rh = 0 + Math.floor(Math.random() * (359-0));	// H btw 0,359
	var rs = 50 + Math.floor(Math.random() * (100-50));	// S btw 50,100
	var rl = 25 + Math.floor(Math.random() * (45-25));	// L btw 25,45
	
	frcst.H = rh;
	frcst.S = rs;
	frcst.L = rl;
	document.getElementById("bgh").value = frcst.H;
	document.getElementById("bgs").value = frcst.S;
	document.getElementById("bgl").value = frcst.L;
	changebg();
}
// BACKGROUND COLOR
function changebg() {
	var h = frcst.H;
	var s = frcst.S;
	var l = frcst.L;
	var hsl = `hsl(${h},${s}%,${l}%)`
	document.getElementById("canvas").style.backgroundColor = hsl;
	document.getElementById("bgpreview").style.backgroundColor = hsl;
	if (h >= 38 && h <= 120) {document.getElementById("titleunderscore").style.background = "linear-gradient(to right, rgb(50,50,50) 40%, transparent)"}
	else {document.getElementById("titleunderscore").style.background = `linear-gradient(to right, hsl(${h},${s}%,${l/2.1}%) 40%, transparent)`}
	for (x = 0; x<7; x++) {
		if (h >= 38 && h <= 120) {document.getElementsByClassName("LO")[x].style.color = "rgb(50,50,50)";}
		else {document.getElementsByClassName("LO")[x].style.color = `hsl(${h},${s}%,${l/2.1}%)`;}
	}
	//document.getElementById("canvas").style.backgroundColor = c;
}

function change_name(n) {
	if (n.length == 0) {document.getElementById("person").innerHTML = "NAME'S";}
	else {document.getElementById("person").innerHTML = n;}
}

function change_city(n) {
	if (n.length == 0) {document.getElementById("cityn").innerHTML = "CITY NAME";}
	else {document.getElementById("cityn").innerHTML = n;}
}

function logo_select(logo) {document.getElementById("imgcontainer").style.background = `url(${logo}) 50% 50%/100% auto`;}

function change_temp(dy,temp) {
	document.getElementById(dy).innerHTML = temp;
}

function chg_units(k) {
	// Changes temperature units to Fahrenheit or Celcius; only used for random forecast generation
	if (frcst.tempunits != k) {
		frcst.tempunits = k;
		if (frcst.tempunits == "C") {
			// if the just-changed temperature units are now celcius, we need to convert to celcius
			// going from fahrenheit to celcius
			for (i=1;i<=7;i++) {
				//console.log(eval(document.getElementById("hi" + i.toString()).innerHTML));
				document.getElementById("hi" + i.toString()).innerHTML = Math.round((parseInt(document.getElementById("hi" + i.toString()).innerHTML)-32)*5/9);
				document.getElementById("lo" + i.toString()).innerHTML = Math.round((parseInt(document.getElementById("lo" + i.toString()).innerHTML)-32)*5/9);
				document.getElementById("tmax" + i.toString()).value = Math.round((parseInt(document.getElementById("tmax" + i.toString()).value)-32)*5/9);
				document.getElementById("tmin" + i.toString()).value = Math.round((parseInt(document.getElementById("tmin" + i.toString()).value)-32)*5/9);
			}
		}
		else {
			for (i=1;i<=7;i++) {
				//console.log(eval(document.getElementById("hi" + i.toString()).innerHTML));
				document.getElementById("hi" + i.toString()).innerHTML = Math.round(eval(document.getElementById("hi" + i.toString()).innerHTML)*9/5+32);
				document.getElementById("lo" + i.toString()).innerHTML = Math.round(eval(document.getElementById("lo" + i.toString()).innerHTML)*9/5+32);
				document.getElementById("tmax" + i.toString()).value = Math.round(eval(document.getElementById("tmax" + i.toString()).value)*9/5+32);
				document.getElementById("tmin" + i.toString()).value = Math.round(eval(document.getElementById("tmin" + i.toString()).value)*9/5+32);

			}
		}
	}
}

function sky_select(skynum, sign) {
	// skynum = day number; sign = - or + depending on button pressed
	div = document.getElementById("sky" + skynum.toString());
	i = parseInt(div.getAttribute("skyindex"));
	if (sign == "-") {
		if (i == 0) {
			div.src = sky[sky.length-1];
			div.setAttribute("skyindex",(sky.length-1).toString());
		}
		else {
			div.src = sky[i-1];
			div.setAttribute("skyindex",(i-1).toString());
		}
	}
	else if (sign == "+") {
		if (i == sky.length-1) {
			div.src = sky[0];
			div.setAttribute("skyindex","0");
		}
		else {
			div.src = sky[i+1];
			div.setAttribute("skyindex",(i+1).toString());
		}
	}
}

function desc_select(desc_num, sign) {
	// desc_num = day number; sign = - or + depending on button pressed
	var div = document.getElementById("desc" + desc_num.toString());
	var i = parseInt(div.getAttribute("descindex"));
	// when LEFT is pressed
	if (sign == "-") {
		if (i == 0) {
			div.src = desc[desc.length-1];
			div.setAttribute("descindex",(desc.length-1).toString());
		}
		else {
			div.src = desc[i-1];
			div.setAttribute("descindex",(i-1).toString());
		}
	}
	// when RIGHT is pressed
	else if (sign == "+") {
		if (i == desc.length-1) {
			div.src = desc[0];
			div.setAttribute("descindex","0");
		}
		else {
			div.src = desc[i+1];
			div.setAttribute("descindex",(i+1).toString());
		}
	}
	// query if percent should be displayed based on current descriptor
	perc("perc" + desc_num.toString(),document.getElementById("percentbox" + desc_num.toString()).value);
}

function perc(pid, valu) {
	var daynum = pid.substr(pid.length-1,1); 	// The day of the week (1-7)
	// if there is nothing in the percentbox, we don't want anything displayed
	if (document.getElementById("percentbox" + daynum).value == "") {document.getElementById(pid).innerHTML = "";}
	// if there is, we potentially want it displayed (including percent sign)
	else {
		document.getElementById(pid).innerHTML = valu + "%";
		var descid = document.getElementById("desc" + daynum);
		var spec_descr = ["0",(desc.length-1).toString(),(desc.length-2).toString(),(desc.length-3).toString(),(desc.length-4).toString(),(desc.length-5).toString(),(desc.length-6).toString()];
		// If the description is blank, or a special descriptor, we want the percent to display
		if (spec_descr.includes(descid.getAttribute("descindex"))) {
			document.getElementById(pid).style.display = "block";
			// If 0, we want it to display in the middle
			if (descid.getAttribute("descindex") == "0") {document.getElementById(pid).style.left = "50%";}
			// If other special descriptor, we want it to display near the right end
			else {document.getElementById(pid).style.left = "75%";}
		}
		// Otherwise, hide it
		else {document.getElementById(pid).style.display = "none";}
	}
}

function zfill(numstr) {
	if (numstr.length == 1) {return "0" + numstr;}
	else {return numstr;}
}

function uvi_chg(dystr,levelclick) {
	var tableid = document.getElementById("uvi"+dystr);
	// Old UVI level marker
	var olduvid = document.getElementById("uvi" + dystr + "-lv" + zfill(tableid.getAttribute("uvivalue")));
	//console.log("uvi" + dystr + "-lv" + zfill(tableid.getAttribute("uvivalue")));
	// New UVI level
	var newuvid = document.getElementById("uvi" + dystr + "-lv" + levelclick);
	// If there is a change... change it!
	if (tableid.getAttribute("uvivalue") != eval(levelclick).toString()) {
		// change the uvivalue property to the new one
		tableid.setAttribute("uvivalue",eval(levelclick).toString());
		olduvid.innerHTML = "";		// Change the old uvi to blank
		newuvid.innerHTML = "&Delta;"; 	// Change to the new UVI
		if (levelclick == "11") {document.getElementById("uvi" + dystr + "num").innerHTML = eval(levelclick).toString() + "+";}
		else {document.getElementById("uvi" + dystr + "num").innerHTML = eval(levelclick).toString();}
	}
}