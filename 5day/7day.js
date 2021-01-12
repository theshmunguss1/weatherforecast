// This object will contain the global forecast options
var frcst = {
	"dayqty":5,
	"tempunits":"F",
	"H":240,
	"S":100,
	"L":50,
	"lang_index": 0,
	"lang": "en"
};

// A Title Resize Idea: make an event listener to adjust the text size of the TITLEBOX if #textbox.offsetWidth > #title.offsetWidth

var lang_img = [
	["5day/lang_en.svg", "English", "en"],
	["5day/lang_fr.svg", "French", "fr"],
	["5day/lang_sp.svg", "Spanish", "sp"]
];

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
			"5day/sky_cloudy_snow2.svg",
			"5day/sky_cloudy_snra.svg",
			"5day/sky_cloudy_wintrymix2.svg",
			"5day/sky_cloudy_wintrymix.svg"];

var desc = ["5day/desc_blank.svg",
			"5day/en/desc_windy.svg",
			"5day/en/desc_hot.svg",
			"5day/en/desc_muggy.svg",
			"5day/en/desc_dry.svg",
			"5day/en/desc_severe.svg",
			"5day/en/desc_heavy_rain.svg",
			"5day/en/desc_heavy_snow.svg",
			"5day/en/desc_blizzard.svg",
			"5day/en/desc_wintry_mix.svg",
			"5day/en/desc_frost.svg",
			"5day/en/desc_fog.svg",
			"5day/en/desc_AM_clearing.svg",
			"5day/en/desc_PM_clearing.svg",
			"5day/en/desc_NIGHT_clearing.svg",
			"5day/en/desc_AM_inc_clouds.svg",
			"5day/en/desc_PM_inc_clouds.svg",
			"5day/en/desc_NIGHT_inc_clouds.svg",
			"5day/en/desc_perc_AM.svg",
			"5day/en/desc_perc_PM.svg",
			"5day/en/desc_perc_NIGHT.svg",
			"5day/en/desc_perc_rain.svg",
			"5day/en/desc_perc_tstorms.svg",
			"5day/en/desc_perc_snow.svg",
			"5day/en/desc_perc_wintry1.svg",
			"5day/en/desc_perc_wintry2.svg"
		];

// Load-up opts
function loadup() {

}

function chg_lang(dir) {
	let lang_selection = document.getElementById("lang_selection");
	// LEFT
	if (dir < 0) {
		if (frcst.lang_index == 0) {frcst.lang_index = lang_img.length - 1;}
		else {frcst.lang_index -= 1;}
	}
	// RIGHT
	else {
		if (frcst.lang_index == lang_img.length - 1) {frcst.lang_index = 0;}
		else {frcst.lang_index += 1;}
	}
	lang_selection.src = lang_img[frcst.lang_index][0];
	lang_selection.setAttribute("title", lang_img[frcst.lang_index][1]);	// "English", "French", "Spanish"
	frcst.lang = lang_img[frcst.lang_index][2];	// "en", "fr", "sp"
	// Change the display of days
	day_select(document.getElementById("dayselect").value);
	// Change the options list
	dayopts = document.getElementById("dayselect").options;
	for (i=0; i < 7; i++) {
		dayopts[i].innerHTML = dyofwkvar[frcst.lang][0][i];
	}
	// Change the title and temperature units
	let name = document.getElementById("person").innerHTML;
	let city = document.getElementById("cityn").innerHTML;
	if (frcst.lang == "en") {
		document.getElementById("textbox").innerHTML = `<span id="person">${name}</span>'s <span id="frcstdays">${frcst.dayqty}</span>-Day Forecast for <span id="cityn">${city}</span>`;
		chg_units("F");
	}
	else if (frcst.lang == "fr") {
		document.getElementById("textbox").innerHTML = `Pr&eacute;visions de <span id="frcstdays">${frcst.dayqty}</span> jours de <span id="person">${name}</span> pour <span id="cityn">${city}</span>`;
		chg_units("C");
	}
	else if (frcst.lang == "sp") {
		document.getElementById("textbox").innerHTML = `Pron&oacute;stico <span id="frcstdays">${frcst.dayqty}</span> D&iacute;as de <span id="person">${name}</span> para <span id="cityn">${city}</span>`;
		chg_units("C");
	}
	// Change the descriptions
	for (i=1; i < desc.length; i++) {
		desc[i] = desc[i].replace(/\/\w\w\//, `/${frcst.lang}/`);
	}
	// Change the active descriptions if needed
	for (i=1; i <= 7; i++) {
		active = document.getElementById(`desc${i}`);
		if (active.src.includes("blank") == false) {
			active.src = active.src.replace(/\/\w\w\//, `/${frcst.lang}/`);
		}
	}
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
			frcst.dayqty = 7;
			document.getElementById("frcstdays").innerHTML = 7;
			document.getElementById("canvas").style.width = "1300px";
			document.getElementById("canvas").style.borderSpacing = "5px 10px";
			document.getElementById("title").setAttribute("colspan", 7);
			document.getElementById("title").style.fontSize = "2.8em";
			document.getElementById("d6").style.display = "table-cell";
			document.getElementById("d7").style.display = "table-cell";
			//document.getElementById("title").noWrap = false;
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
			document.getElementById("canvas").style.width = "930px";
			document.getElementById("canvas").style.borderSpacing = "6px 10px";
			document.getElementById("title").setAttribute("colspan", 5);
			document.getElementById("title").style.fontSize = "2em";
			document.getElementById("d6").style.display = "none";
			document.getElementById("d7").style.display = "none";
			//document.getElementById("title").noWrap = true;
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
	i = dyofwkvar["en"][0].indexOf(daystr);
	day_select(i);
	document.getElementById("dayselect").selectedIndex = i;
}

// python code: print('{}: ["{}"],'.format(dy, '","'.join(li[dy:] + li[0:dy])))
var dyofwkvar = {
	"en": {
		0: ["MON","TUE","WED","THU","FRI","SAT","SUN"],
		1: ["TUE","WED","THU","FRI","SAT","SUN","MON"],
		2: ["WED","THU","FRI","SAT","SUN","MON","TUE"],
		3: ["THU","FRI","SAT","SUN","MON","TUE","WED"],
		4: ["FRI","SAT","SUN","MON","TUE","WED","THU"],
		5: ["SAT","SUN","MON","TUE","WED","THU","FRI"],
		6: ["SUN","MON","TUE","WED","THU","FRI","SAT"]
	},
	"fr": {
		0: ["LUN","MAR","MER","JEU","VEN","SAM","DIM"],
		1: ["MAR","MER","JEU","VEN","SAM","DIM","LUN"],
		2: ["MER","JEU","VEN","SAM","DIM","LUN","MAR"],
		3: ["JEU","VEN","SAM","DIM","LUN","MAR","MER"],
		4: ["VEN","SAM","DIM","LUN","MAR","MER","JEU"],
		5: ["SAM","DIM","LUN","MAR","MER","JEU","VEN"],
		6: ["DIM","LUN","MAR","MER","JEU","VEN","SAM"]
	},
	"sp": {
		0: ["LU","MA","MI","JU","VI","SA","DO"],
		1: ["MA","MI","JU","VI","SA","DO","LU"],
		2: ["MI","JU","VI","SA","DO","LU","MA"],
		3: ["JU","VI","SA","DO","LU","MA","MI"],
		4: ["VI","SA","DO","LU","MA","MI","JU"],
		5: ["SA","DO","LU","MA","MI","JU","VI"],
		6: ["DO","LU","MA","MI","JU","VI","SA"]
	}
};

function day_select(dyindx) {
	// Prints the 3 characters corresponding to the proper day
	document.getElementById("name1").innerText = dyofwkvar[frcst.lang][dyindx][0];
	document.getElementById("d1name").innerText = dyofwkvar[frcst.lang][dyindx][0];
	document.getElementById("name2").innerText = dyofwkvar[frcst.lang][dyindx][1];
	document.getElementById("d2name").innerText = dyofwkvar[frcst.lang][dyindx][1];
	document.getElementById("name3").innerText = dyofwkvar[frcst.lang][dyindx][2];
	document.getElementById("d3name").innerText = dyofwkvar[frcst.lang][dyindx][2];
	document.getElementById("name4").innerText = dyofwkvar[frcst.lang][dyindx][3];
	document.getElementById("d4name").innerText = dyofwkvar[frcst.lang][dyindx][3];
	document.getElementById("name5").innerText = dyofwkvar[frcst.lang][dyindx][4];
	document.getElementById("d5name").innerText = dyofwkvar[frcst.lang][dyindx][4];
	document.getElementById("name6").innerText = dyofwkvar[frcst.lang][dyindx][5];
	document.getElementById("d6name").innerText = dyofwkvar[frcst.lang][dyindx][5];
	document.getElementById("name7").innerText = dyofwkvar[frcst.lang][dyindx][6];
	document.getElementById("d7name").innerText = dyofwkvar[frcst.lang][dyindx][6];
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

function logo_select(logo) {document.getElementById("logo").src = logo;}

function change_temp(dy,temp) {
	document.getElementById(dy).innerHTML = temp;
}

function chg_units(k) {
	// Changes temperature units to Fahrenheit or Celcius; only used for random forecast generation
	let far = document.getElementById("tempF");
	let cel = document.getElementById("tempC");
	if (frcst.tempunits != k) {
		frcst.tempunits = k;
		if (frcst.tempunits == "C") {
			// CELCIUS
			if (cel.checked == false) {cel.checked = true;}
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
			// FAHRENHEIT
			if (far.checked == false) {far.checked = true;}
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