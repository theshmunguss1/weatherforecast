function load_data() {
	// LOAD HURDAT2 DATA FROM FILE
	fetch("unofficial_hurdat2/current_hurdat2.dat")
		.then(resp => resp.text())
		.then(txt => {document.getElementById("codecontainer").innerHTML = txt;});
	// LOAD CURRENT SEASON DATA FROM FILE
	fetch("unofficial_hurdat2/season_stats.dat")
		.then(resp => resp.text())
		.then(txt => {document.getElementById("seasoncontainer").innerHTML = txt;})
		.then(now => load_2020());

}

function load_2020() {
	// LOAD HURDAT2 DATA FROM FILE
	fetch("unofficial_hurdat2/hurdat2_2020.dat")
		.then(resp => resp.text())
		.then(txt => {document.getElementById("codecontainer_2020").innerHTML = txt;});
	// LOAD 2020 SEASON DATA FROM FILE
	fetch("unofficial_hurdat2/season_stats_2020.dat")
		.then(resp => resp.text())
		.then(txt => {document.getElementById("seasoncontainer_2020").innerHTML = txt;});
}

function chg_year(yr) {
	let y2021 = [
		document.getElementById("codeblock"),
		document.getElementById("seasonblock")
	];
	let y2020 = [
		document.getElementById("codeblock_2020"),
		document.getElementById("seasonblock_2020")
	];

	if (parseInt(yr) == 2021) {
		for (element of y2020) {element.style.display = "none";}
		for (element of y2021) {element.style.display = "block";}
	}
	else {
		for (element of y2021) {element.style.display = "none";}
		for (element of y2020) {element.style.display = "block";}
	}
}














