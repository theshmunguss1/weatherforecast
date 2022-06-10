const game = {
	grid_size: 10,
	max_min: [12,16],
	mine_qty: 0,
	mine: [],
	proximity: [],
	zerocount: [],
	guessed: [],
	flag: false,
	flagged: [],
	cleared: [],
	start_time: performance.now()
};
const gameboard = document.getElementById("gameboard");
const mine_perc = document.getElementById("mine_percentage");
const mine_qty_msg = document.getElementById("mineqtymsg");
const start_dialog = document.getElementById("start-new-game");
const win_dialog = document.getElementById("win");
const lose_dialog = document.getElementById("lose");
const remaining = document.getElementById("minesleft");

function changeGrid(size) {
	game.grid_size = parseInt(size);
	changeDifficulty();
}

function changeDifficulty() {
	game.max_min = [
		Math.floor((parseInt(mine_perc.value)-2) / 100 * game.grid_size**2),
		Math.floor((parseInt(mine_perc.value)+2) / 100 * game.grid_size**2)
	];
	mine_qty_msg.innerHTML = `${game.max_min[0]} to ${game.max_min[1]} mines`;
}

function ZFILL(n) {
	if (n < 10) {return "0" + n.toString()}
	else {return n.toString()}
}

function build() {
	// Clear contents
	gameboard.innerHTML = "";
	// Change the denominator of width/height of squares
	//document.documentElement.style.setProperty("--cell_dim",game.grid_size);
	// Re-build
	let TAB = "    ";
	for (x=0; x < game.grid_size; x++) {
		let newRow = document.createElement("div"); // create new row
		newRow.setAttribute("class","ROW"); 	// give it proper row class
		gameboard.appendChild(newRow); 			// append it to the gameboard
		for (y=0; y < game.grid_size; y++) {
			let newCell = document.createElement("div"); 	// create new cell
			newCell.setAttribute("class","SQUARES");
			newCell.setAttribute("id",`s${ZFILL(x)}_${ZFILL(y)}`);
			newCell.setAttribute("onClick","check(this.id)");
			newCell.setAttribute("onContextMenu","toggle_flag(this.id)");
			newRow.appendChild(newCell);
		}
	}
}

function gameStart() {
	build();
	
	game.start_time = performance.now();
	start_dialog.style.visibility = "hidden";
	win_dialog.style.visibility = "hidden";
	lose_dialog.style.visibility = "hidden";
	// Reset all squares back to their initial state
	for (x=0; x < game.grid_size; x++) {
		let buildarr = []
		let ROW = ZFILL(x);
		for (y=0; y < game.grid_size; y++) {
			let COL = ZFILL(y);
			buildarr.push(0);
			document.getElementById(`s${ROW}_${COL}`).style = "initial";
			document.getElementById(`s${ROW}_${COL}`).innerHTML = "";
		}
		game.mine.push(buildarr);
	}
	// Ensure the game ending blocks are hidden
	document.getElementById("lose").style.visibility = "hidden";
	document.getElementById("win").style.visibility = "hidden";
	// select a random number of mines that will be hidden in the game
	game.mine_qty = game.max_min[0] + Math.floor(Math.random() * (game.max_min[1]+1-game.max_min[0]));
	// Notify the player of mines in the game
	document.getElementById("minesleft").innerHTML = game.mine_qty;
	// document.getElementById("spacestotal").innerHTML = game.grid_size**2;
	// console.log(game.grid_size**2);
	// Build random mine placement
	i = 0;
	while (i < game.mine_qty) {
		let row_num = 0 + Math.floor((Math.random() * game.grid_size));	//picks a r btw 0-9
		let col_num = 0 + Math.floor((Math.random() * game.grid_size));	//picks a r btw 0-9
		//console.log("mine[" + row_num.toString() + "][" + col_num.toString() + "]");
		if (game.mine[row_num][col_num] == 0) {game.mine[row_num][col_num] = 1; i++;}
	}
	//console.log(game.mine);
	//console.log(game.mine_qty);
}

function check(square) {
	// Toggle Flag if CTRL key is pressed
	if (event.ctrlKey == true) {
		return toggle_flag(square);
	}

	let choice = document.getElementById(square); 	// element id of the guess
	let g_row = parseInt(square.slice(1,3)); 	// The guess's row
	let g_col = parseInt(square.slice(4));		// The guess's column

	// We only need to assess further if the cell hasn't been guessed yet and isn't flagged
	if (game.guessed.includes(square) == false && game.flagged.includes(square) == false) {
		// choice.style.outlineStyle = "inset"; 	// Visual confirmation of guess
		game.guessed.push(square); 		// Internal note of guess
		// If a mine has been uncovered, GAME OVER
		if (game.mine[g_row][g_col] == 1) {gameover(square);}
		// If mine-free
		else {
			game.cleared.push(square);		// If the cell has been cleared, it will go towards the tally it would take to win
			choice.style.backgroundColor = "white";
			let prox = proxcheck(g_row,g_col);	// Counts the cells in proximity with a mine
			// Find and display the mines in proximity to the cell
			if (prox > 0) {choice.innerHTML = prox;}
			// If there are 0 mines in proximity, we also want to check other cells in proximity for zeros and uncover those too
			else {zerocheck(square,g_row,g_col);}
			// If you've cleared/verified enough cells are free, you win
			if (game.cleared.length == (game.grid_size**2 - game.mine_qty)) {
				youwin();
			}
		}
	}
}

function toggle_flag(square) {
	event.preventDefault(); 	// Prevent the right-click menu from appearing
	let choice = document.getElementById(square);
	// If the square hasn't already been uncovered
	if (game.guessed.includes(square) == false) {
		// REMOVE flag
		if (game.flagged.includes(square)) {
			choice.style = "initial";
			choice.innerHTML = "";
			remaining.innerHTML = parseInt(remaining.innerHTML) + 1;
			delete game.flagged[game.flagged.indexOf(square)]; // remove element from flags
		}
		// ADD flag
		else {
			choice.style.backgroundColor = "orange";
			choice.style.color = "red";
			choice.innerHTML = "&#9873;";
			remaining.innerHTML = parseInt(remaining.innerHTML) - 1;
			game.flagged.push(square);
		}
		
	}
}

function zerocheck(sqid,r,c) {
	// if this function is called (if the square has no mines adjacent), at least every cell adjacent to the sqid needs to be freed-up to reveal their mine proximities or zerocheck
	// needscheck variable will hold and check all the adjacent cells that need clearing
	var needscheck = [sqid];

	// Maybe add an if cleared.includes("s99") == false, then push it to cleared
	do {
		// Check NW adjacency
		if (r-1 >= 0 && c-1 >= 0) {
			let inspectSquare = `s${ZFILL(r-1)}_${ZFILL(c-1)}`;
			// If not already cleared, we need to clear it
			if (game.cleared.includes(inspectSquare) == false) {
				game.cleared.push(inspectSquare);
				document.getElementById(inspectSquare).style.backgroundColor = "white";
				// document.getElementById(inspectSquare).style.outlineStyle = "inset";
				game.guessed.push(inspectSquare);
				// If there are some mines in the proximity of the square being checked
				if (proxcheck(r-1,c-1) > 0) {
					document.getElementById(inspectSquare).innerHTML = proxcheck(r-1,c-1);
				}
				// If there is no mine there and no mines in proximity
				else {
					needscheck.push(inspectSquare); 	// mark it for checking for zeros in adjacence
				}
			}
		}
		// Check W adjacency
		if (c-1 >= 0) {
			let inspectSquare = `s${ZFILL(r)}_${ZFILL(c-1)}`;
			// If not already cleared, we need to clear it
			if (game.cleared.includes(inspectSquare) == false) {
				game.cleared.push(inspectSquare);
				document.getElementById(inspectSquare).style.backgroundColor = "white";
				// document.getElementById(inspectSquare).style.outlineStyle = "inset";
				game.guessed.push(inspectSquare);
				// If there are some mines in the proximity of the square being checked
				if (proxcheck(r,c-1) > 0) {
					document.getElementById(inspectSquare).innerHTML = proxcheck(r,c-1);
				}
				// If there is no mine there and no mines in proximity
				else {
					needscheck.push(inspectSquare); 	// mark it for checking for zeros in adjacence
				}
			}
		}
		// Check SW adjacency
		if (r+1 < game.grid_size && c-1 >= 0) {
			let inspectSquare = `s${ZFILL(r+1)}_${ZFILL(c-1)}`;
			// If not already cleared, we need to clear it
			if (game.cleared.includes(inspectSquare) == false) {
				game.cleared.push(inspectSquare);
				document.getElementById(inspectSquare).style.backgroundColor = "white";
				// document.getElementById(inspectSquare).style.outlineStyle = "inset";
				game.guessed.push(inspectSquare);
				// If there are some mines in the proximity of the square being checked
				if (proxcheck(r+1,c-1) > 0) {
					document.getElementById(inspectSquare).innerHTML = proxcheck(r+1,c-1);
				}
				// If there is no mine there and no mines in proximity
				else {
					needscheck.push(inspectSquare); 	// mark it for checking for zeros in adjacence
				}
			}
		}
		// Check S adjacency
		if (r+1 < game.grid_size) {
			let inspectSquare = `s${ZFILL(r+1)}_${ZFILL(c)}`;
			// If not already cleared, we need to clear it
			if (game.cleared.includes(inspectSquare) == false) {
				game.cleared.push(inspectSquare);
				document.getElementById(inspectSquare).style.backgroundColor = "white";
				// document.getElementById(inspectSquare).style.outlineStyle = "inset";
				game.guessed.push(inspectSquare);
				// If there are some mines in the proximity of the square being checked
				if (proxcheck(r+1,c) > 0) {
					document.getElementById(inspectSquare).innerHTML = proxcheck(r+1,c);
				}
				// If there is no mine there and no mines in proximity
				else {
					needscheck.push(inspectSquare); 	// mark it for checking for zeros in adjacence
				}
			}
		}
		// Check SE adjacency
		if (r+1 < game.grid_size && c+1 < game.grid_size) {
			let inspectSquare = `s${ZFILL(r+1)}_${ZFILL(c+1)}`;
			// If not already cleared, we need to clear it
			if (game.cleared.includes(inspectSquare) == false) {
				game.cleared.push(inspectSquare);
				document.getElementById(inspectSquare).style.backgroundColor = "white";
				// document.getElementById(inspectSquare).style.outlineStyle = "inset";
				game.guessed.push(inspectSquare);
				// If there are some mines in the proximity of the square being checked
				if (proxcheck(r+1,c+1) > 0) {
					document.getElementById(inspectSquare).innerHTML = proxcheck(r+1,c+1);
				}
				// If there is no mine there and no mines in proximity
				else {
					needscheck.push(inspectSquare); 	// mark it for checking for zeros in adjacence
				}
			}
		}
		// Check E adjacency
		if (c+1 < game.grid_size) {
			let inspectSquare = `s${ZFILL(r)}_${ZFILL(c+1)}`;
			// If not already cleared, we need to clear it
			if (game.cleared.includes(inspectSquare) == false) {
				game.cleared.push(inspectSquare);
				document.getElementById(inspectSquare).style.backgroundColor = "white";
				// document.getElementById(inspectSquare).style.outlineStyle = "inset";
				game.guessed.push(inspectSquare);
				// If there are some mines in the proximity of the square being checked
				if (proxcheck(r,c+1) > 0) {
					document.getElementById(inspectSquare).innerHTML = proxcheck(r,c+1);
				}
				// If there is no mine there and no mines in proximity
				else {
					needscheck.push(inspectSquare); 	// mark it for checking for zeros in adjacence
				}
			}
		}
		// Check NE adjacency
		if (r-1 >= 0 && c+1 < game.grid_size) {
			let inspectSquare = `s${ZFILL(r-1)}_${ZFILL(c+1)}`;
			// If not already cleared, we need to clear it
			if (game.cleared.includes(inspectSquare) == false) {
				game.cleared.push(inspectSquare);
				document.getElementById(inspectSquare).style.backgroundColor = "white";
				// document.getElementById(inspectSquare).style.outlineStyle = "inset";
				game.guessed.push(inspectSquare);
				// If there are some mines in the proximity of the square being checked
				if (proxcheck(r-1,c+1) > 0) {
					document.getElementById(inspectSquare).innerHTML = proxcheck(r-1,c+1);
				}
				// If there is no mine there and no mines in proximity
				else {
					needscheck.push(inspectSquare); 	// mark it for checking for zeros in adjacence
				}
			}
		}
		// Check N adjacency
		if (r-1 >= 0) {
			let inspectSquare = `s${ZFILL(r-1)}_${ZFILL(c)}`;
			// If not already cleared, we need to clear it
			if (game.cleared.includes(inspectSquare) == false) {
				game.cleared.push(inspectSquare);
				document.getElementById(inspectSquare).style.backgroundColor = "white";
				// document.getElementById(inspectSquare).style.outlineStyle = "inset";
				game.guessed.push(inspectSquare);
				// If there are some mines in the proximity of the square being checked
				if (proxcheck(r-1,c) > 0) {
					document.getElementById(inspectSquare).innerHTML = proxcheck(r-1,c);
				}
				// If there is no mine there and no mines in proximity
				else {
					needscheck.push(inspectSquare); 	// mark it for checking for zeros in adjacence
				}
			}
		}
		// Deletes the cell just checked (first in array)
		needscheck.splice(0,1);
		// Changes 'r' and 'c' to new first element in array if array length is > zero
		if (needscheck.length > 0) {
			let temp = needscheck[0];
			r = parseInt(temp.slice(1,3));
			c = parseInt(temp.slice(4));
		}
	} while (needscheck.length > 0);
}

function proxcheck(r,c) {
	var count = 0;
	if (r-1 >= 0 && c-1 >= 0) {count += verify(game.mine[r-1][c-1]);}
	if (c-1 >= 0) {count += verify(game.mine[r+0][c-1]);}
	if (r+1 < game.grid_size && c-1 >= 0) {count += verify(game.mine[r+1][c-1]);}
	if (r+1 < game.grid_size) {count += verify(game.mine[r+1][c+0]);}
	if (r+1 < game.grid_size && c+1 < game.grid_size) {count += verify(game.mine[r+1][c+1]);}
	if (c+1 < game.grid_size) {count += verify(game.mine[r+0][c+1]);}
	if (r-1 >= 0 && c+1 < game.grid_size) {count += verify(game.mine[r-1][c+1]);}
	if (r-1 >= 0) {count += verify(game.mine[r-1][c+0]);}
	return count;	
}

function verify(cell) {
	if (cell == 1) {return 1}
	else {return 0}
}

function youwin() {
	document.getElementById("win-time").innerText = (
		(
			performance.now() - game.start_time
		) / 1000
	).toFixed(1);
	win_dialog.style.visibility = "visible";
	document.getElementById("minesleft").innerHTML = 0;
	reset();
}

function gameover(square) {
	for (x=0; x < game.grid_size; x++) {
		let ROW = ZFILL(x);
		for (y=0; y < game.grid_size; y++) {
			let COL = ZFILL(y);
			//console.log(`s${ROW}_${COL}`);
			// Highlight all of the mines
			if (game.mine[x][y] == 1) {
				// Highlight it if you flagged it correctly
				if (game.flagged.includes(`s${ROW}_${COL}`)) {
					document.getElementById(`s${ROW}_${COL}`).style.backgroundColor = "green";
				}
				// otherwise, make it a red background
				else {document.getElementById(`s${ROW}_${COL}`).style.backgroundColor = "red";}
				document.getElementById(`s${ROW}_${COL}`).style.color = "black";
				document.getElementById(`s${ROW}_${COL}`).innerHTML = "&Otimes;";
			}
		}
	}
	// Highlight the culprit
	document.getElementById(square).style.backgroundColor = "yellow";
	document.getElementById(square).innerHTML = "&Otimes;";
	lose_dialog.style.visibility = "visible";
	reset();
}

function reset() {
	game.mine_qty = 0;
	game.mine = [];
	game.proximity = [];
	game.zerocount = [];
	game.guessed = [];
	game.flagged = [];
	game.cleared = [];;
}