const current_year = 2022;
const box_current_season = document.getElementById("current-season");
const box_season_stats = document.getElementById("season-stats");

function load_data() {
	// LOAD HURDAT2 DATA FROM FILE
	fetch("unofficial_hurdat2/current_hurdat2.dat")
		.then(resp => resp.text())
		.then(txt => {box_current_season.innerHTML = txt;});
	// LOAD CURRENT SEASON DATA FROM FILE
	fetch(`unofficial_hurdat2/season_stats_${current_year}.dat`)
		.then(resp => resp.text())
		.then(txt => {box_season_stats.innerHTML = txt;})
}

function load_season_stats(yr) {

	fetch(`unofficial_hurdat2/season_stats_${yr}.dat`)
		.then(resp => resp.text())
		.then(txt => {box_season_stats.innerHTML = txt;});
}














