const hd2 = {
	basin: "atl",
	year: 2023,
};
const box_season_stats = document.getElementById("season-stats");

function load_data() {
	// return null;
	// LOAD HURDAT2 DATA FROM FILES
	fetch(`unofficial_hurdat2/current_hurdat2_atl.dat`)
		.then(resp => resp.text())
		.then(txt => {
			document.getElementById(`current-season-atl`).innerText = txt;
		});
	fetch(`unofficial_hurdat2/current_hurdat2_pac.dat`)
		.then(resp => resp.text())
		.then(txt => {
			document.getElementById(`current-season-pac`).innerText = txt;
		});

	// LOAD CURRENT SEASON DATA FROM FILE
	load_season_stats(hd2.year);
}

function load_basin(new_basin) {
	if (new_basin != hd2.basin) {
		// Hide previous basin data
		document.getElementById(`current-season-${hd2.basin}`).style.display = "none";
		// Change and display new basin
		hd2.basin = new_basin;
		document.getElementById(`current-season-${hd2.basin}`).style.display = "inline";
		// Load season stats
		load_season_stats(hd2.year);
	}
}

function load_season_stats(yr) {
	hd2.year = yr;
	fetch(`unofficial_hurdat2/season_stats_${yr}_${hd2.basin}.dat`)
		.then(resp => resp.text())
		.then(txt => {
			box_season_stats.innerText = txt;
		});
}














