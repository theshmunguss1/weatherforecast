var mae = {
	"time": new Date(2011, 4-1, 27, 21),
	"ptype": "dy1torn"
};

// Dates in the URL are zero-padded
// Accepts a number and the string-length needed
function ZFILL(n, pad) {
	//console.log(n, pad)
	if (n.toString().length < pad) {
		do {
			n = "0" + n;
		} while (n.toString().length < pad);
	}
	//console.log(n);
	return n;
}

function populate_years() {
	let s_yr = document.getElementById("s_yr");
	let now = new Date();
	// YEAR
	for (y=2005; y <= now.getUTCFullYear(); y++) {
		newyr = document.createElement("option");
		newyr.value = y;
		newyr.innerHTML = y;
		s_yr.appendChild(newyr);
	}
	s_yr.value = 2011;
}

// * Both selectdate() and chgdate() issue a command to change the file (picture) displayed. But are used in different places

// Used upon page-load AND 'Select'ing a date.
// What it Does: changes the javascript time based on date-selection (which values are already in proper filename format)
function selectdate() {
	yr = document.getElementById("s_yr");
	mo = document.getElementById("s_mo");
	dy = document.getElementById("s_dy");
	hr = document.getElementById("s_hr");
	
	mae.time = new Date(
		yr.value,
		mo.value,
		dy.value,
		hr.value
	);
	
	document.getElementById("mainimg").src =
		"https://www.spc.noaa.gov/exper/ma_archive/images_s4/" 
	   + yr.value
	   + ZFILL(mo.value + 1, 2)
	   + ZFILL(dy.value, 2) + "/"
	   + ZFILL(hr.value, 2) + "_"
	   + mae.ptype + ".gif";
	console.log(document.getElementById("mainimg").src);
	chg_date_display();
}

// Used when a Time Control button is pressed or when new product is selected
function chgdate() {

	// these are needed to reflect the change in date in
	// 		the select boxes
	let s_yr = document.getElementById("s_yr");
	let s_mo = document.getElementById("s_mo");
	let s_dy = document.getElementById("s_dy");
	let s_hr = document.getElementById("s_hr");

	yr = mae.time.getFullYear();
	s_yr.value = mae.time.getFullYear();
	mo = ZFILL(mae.time.getMonth() + 1, 2);
	s_mo.value = mae.time.getMonth();
	dy = ZFILL(mae.time.getDate(), 2);
	s_dy.value = mae.time.getDate();
	hr = ZFILL(mae.time.getHours(), 2);
	s_hr.value = mae.time.getHours();

	document.getElementById("mainimg").src =
		"https://www.spc.noaa.gov/exper/ma_archive/images_s4/" 
	   + yr
	   + mo
	   + dy + "/"
	   + hr + "_"
	   + mae.ptype + ".gif";
	chg_date_display();
}

function gotonow() {
	let temp = new Date();
	let nowutc = new Date(temp.getUTCFullYear(),temp.getUTCMonth(),temp.getUTCDate(),temp.getUTCHours());
	// Offset due to time it takes to run model/upload to server
	nowutc.setHours(nowutc.getHours() - 1);
	mae.time = nowutc;
	chgdate();
}

// Time-Control Button Press Functions
function chg_yr(sign) {
	mae.time.setFullYear(mae.time.getFullYear() + sign);
	chgdate();
}

function chg_mo(sign) {
	mae.time.setMonth(mae.time.getMonth() + sign);
	chgdate();
}

function chg_dy(sign) {
	mae.time.setDate(mae.time.getDate() + sign);
	chgdate();
}

// helped me understand referencing keypress events: http://help.dottoro.com/ljlkwans.php
function chg_hr_key(event) {
	// Advances one hour by pressing the > key (period)
	if (event.keyCode == 190) {chg_hr(1);}
	// Goes back one hour by pressing the < key (comma)
	if (event.keyCode == 188) {chg_hr(-1);}
}

function chg_hr(sign) {
	mae.time.setHours(mae.time.getHours() + sign);
	chgdate();
}

// Product-Select Function
function chg_prod(abbr) {
	// Change old product back to normal
	document.getElementById("pr_" + mae.ptype).style.backgroundColor = "yellow";
	document.getElementById("pr_" + mae.ptype).style.color = "black";
	mae.ptype = abbr;
	// Change new product to new style
	document.getElementById("pr_" + mae.ptype).style.backgroundColor = "DarkRed";
	document.getElementById("pr_" + mae.ptype).style.color = "white";			
	chgdate();
}

function chg_date_display() {
	disp = document.getElementById("date");
	disp.innerHTML = mae.time.getFullYear() + "-"
		+ ZFILL(mae.time.getMonth() + 1, 2) + "-"
		+ ZFILL(mae.time.getDate(), 2) + " "
		+ ZFILL(mae.time.getHours(), 2) + "Z ::: "
		+ "<b>" + document.getElementById("pr_" + mae.ptype).title + "</b> ("
		+ mae.ptype + ")";
}



















