


var canvas = document.getElementById("canvas");
var input_canvas_px = document.getElementById("input-canvas-px");
var approx_dims = document.getElementById("img-approx-dims");
var img_download = document.getElementById("img-download");
var ctx = canvas.getContext("2d");
var sgrid = document.getElementById("sudoku-grid");

// fetch("whilesudoku/puzzle.json")
	// .then(resp => resp.json())
	// .then(jtxt => {puzzle = jtxt})
	// .then(() => {sgrid.onload = build_puzzle()})
	// .then(() => {canvas.onload = resize();});

var logo = new Image();
logo.src = "whilesudoku/whilesudoku_logo.svg";
logo.onload = verify_canvas_size;

// Print related event listeners
window.addEventListener(
	"beforeprint",
	prior_to_click => {
		document.getElementById("print-subtitle")
			.innerText = "While Sudoku - Daily Puzzle - " + puzzle.TODAY;
		document.title = "While Sudoku - Daily Puzzle - " + puzzle.TODAY;
	}
)
window.addEventListener(
	"afterprint",
	after_click => {
		document.title = "While Sudoku";
	}
)

function build_puzzle() {
	for (r=0; r<9; r++) {
		for (c=0; c<9; c++) {
			document.getElementById(`r${r}c${c}`).innerText = puzzle.unsolved[r][c];
			document.getElementById(`solved_r${r}c${c}`).innerText = puzzle.solved[r][c];
		}
	}
}

build_puzzle();

function unhide_solution() {
	document.getElementById("container-solution").style.display = "block";
}

function verify_canvas_size() {
	px = input_canvas_px.valueAsNumber;
	if (isNaN(px)) {px = 500;}
	if (px < 300) {px = 300;}
	else if (px > 1000) {px = 1000;}
	input_canvas_px.value = px;
	approx_dims.innerText = `Approximately ${(px / 96).toFixed(2)} inches squared`;
	resize(px);
}

function save_image() {
	verify_canvas_size();
	img_download.href = canvas.toDataURL();
	img_download.download = "While Sudoku - Daily Puzzle - "
		+ puzzle.TODAY
		+ ` - ${canvas.width}x${canvas.height}`;
	img_download.click();
}

function resize(grid_width) {

	canvas.margin = grid_width * 0.035;
	canvas.width = grid_width;
	canvas.height = canvas.width;

	canvas.puzzle_width = canvas.width - canvas.margin * 2;
	canvas.puzzle_height = canvas.height - canvas.margin * 2;
	draw();
}

function draw() {

	// Background
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(
		0,
		0,
		canvas.width,
		canvas.height
	);

	// sectional boxes
	ctx.fillStyle = "#DADADA";
	ctx.fillRect(
		canvas.margin,
		canvas.margin,
		3 * canvas.puzzle_width / 9,
		3 * canvas.puzzle_height / 9,
	)
	ctx.fillRect(
		canvas.margin + 6 * canvas.puzzle_width / 9,
		canvas.margin,
		3 * canvas.puzzle_width / 9,
		3 * canvas.puzzle_height / 9,
	)
	ctx.fillRect(
		canvas.margin + 3 * canvas.puzzle_width / 9,
		canvas.margin + 3 * canvas.puzzle_height / 9,
		3 * canvas.puzzle_width / 9,
		3 * canvas.puzzle_height / 9,
	)
	ctx.fillRect(
		canvas.margin ,
		canvas.margin + 6 * canvas.puzzle_height / 9,
		3 * canvas.puzzle_width / 9,
		3 * canvas.puzzle_height / 9,
	)
	ctx.fillRect(
		canvas.margin + 6 * canvas.puzzle_width / 9,
		canvas.margin + 6 * canvas.puzzle_height / 9,
		3 * canvas.puzzle_width / 9,
		3 * canvas.puzzle_height / 9,
	)

	// Logo
	ctx.drawImage(
		logo,
		canvas.width * 0.25,
		canvas.height * 0.39,
		canvas.width / 2,
		canvas.height / 2 * (logo.height / logo.width)
	);

	// Lines
	for (n=0; n<9; n++) {
		ctx.lineWidth = ([3,6,9].includes(n)) ? 3 : 1.5;
		ctx.strokeStyle = "black";
		// Horizontal
		ctx.beginPath();
		ctx.moveTo(
			canvas.margin,
			canvas.margin + n * canvas.puzzle_height / 9,
		);
		ctx.lineTo(
			canvas.puzzle_width + canvas.margin,
			canvas.margin + n * canvas.puzzle_height / 9
		);
		ctx.stroke();

		// Vertical
		ctx.beginPath();
		ctx.moveTo(
			canvas.margin + n * canvas.puzzle_width / 9,
			canvas.margin
		);
		ctx.lineTo(
			canvas.margin + n * canvas.puzzle_width / 9,
			canvas.puzzle_height + canvas.margin,
		);
		ctx.stroke();
	}
        // for n in range(9):
            // self.canvas.create_line(m, m + bw / 9*n, w-m, m + bw / 9*n)   # H
            // self.canvas.create_line(m + bw / 9*n, m, m + bw / 9*n, h-m)   # V

        // draw()

	// outer square
	ctx.lineWidth = 3
	ctx.strokeStyle = "black"
	ctx.strokeRect(
		canvas.margin,
		canvas.margin,
		canvas.puzzle_width,
		canvas.puzzle_height
	);

	// numbers
	ctx.fillStyle = "black";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.font = `bold ${canvas.width / 14}px sans-serif`;
	for (r=0; r<9; r++) {
		for (c=0; c<9; c++) {
			ctx.fillText(
				puzzle.unsolved[r][c],
				canvas.margin + c * canvas.puzzle_width / 9 + canvas.puzzle_width / 9 / 2,
				canvas.margin + r * canvas.puzzle_height / 9 + canvas.puzzle_height / 9 / 1.75,
			);
		}
	}

	// Date
	ctx.textAlign = "right";
	ctx.textBaseline = "bottom";
	ctx.font = `normal ${canvas.width / 42}px sans-serif`;
	ctx.fillText(
		"Daily Puzzle - "
		+ puzzle.TODAY,
		canvas.width - canvas.margin,
		canvas.height
	)
}










