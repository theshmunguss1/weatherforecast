let mae = {};
let mainimg = document.getElementById("mainimg");
let datedisp = document.getElementById("datedisplay");
let desc = document.getElementById("product-description");
let gotodate = document.getElementById("gotodate");
let missing = document.getElementById("missing");
let selection_link = document.getElementById("selection_link");
// bool to determine param value upon searchparam and bookmark loading
let current_btn_pressed = false;

// mainimg error event listener
mainimg.addEventListener(
	"error",
	error => {
		mainimg.style.display = "none";
		missing.style.display = "block";
	}
);

// key listener
document.addEventListener(
	"keyup",
	kbshortcut
);

function load() {
	let element = document.getElementById("products");
	for (product of product_list) {
		opt = document.createElement("div");
		// Test if we're dealing with a category name
		if (product.code == "CATEGORY") {
			opt.setAttribute("class", "products-category");
		}
		// Actual product
		else {
			opt.setAttribute("class", "products-product");
			opt.setAttribute("id", "prod_" + product.code);
			opt.setAttribute("onclick", "change_product(this)");
		}
		opt.innerText = product.description;
		element.appendChild(opt);
	}
	// Parse Search Parameters (if applicable)
	params = new URLSearchParams(location.search);
	// Default Date
	if (params.get("date") != null) {
		try {
			// handle if user always wants current time upon startup
			if (["current", "present"].includes(params.get("date").toLowerCase())) {
				mae.time = new Date(
					(Date.now() - 120 * 1000 * 60) + new Date(Date.now()).getTimezoneOffset()
					* 1000 * 60
				);
				current_btn_pressed = true;
			}
			else {
				mae.time = new Date(
					parseInt(params.get("date").slice(0,4)),
					parseInt(params.get("date").slice(4,6)) - 1,
					parseInt(params.get("date").slice(6,8)),
					parseInt(params.get("date").slice(8))
				);
				// Throw error at invalid date
				if (date_is_valid(mae.time) == false) {
					throw Error(
						"Date of " + mae.time.getFullYear()
						+ "-" + (mae.time.getMonth() + 1)
						+ "-" + mae.time.getDate()
						+ " " + mae.time.getHours() + "Z is invalid."
					);
				}
			}

		} catch(error) {
			console.log(error.message);
			mae.time = new Date(2011, 4-1, 27, 21);
		};
	}
	else {
		mae.time = new Date(2011, 4-1, 27, 21);
	}
	// Default Product
	if (params.get("product") != null) {
		try {
			mae.ptype = params.get("product");
			// Throw error at invalid date
			if (product_is_valid(mae.ptype) == false) {
				throw Error(`'${mae.ptype}' is an invalid product.`);
			}
		} catch(error) {
			console.log(error.message);
			mae.ptype = "dy1torn";
		};
	}
	else {
		mae.ptype = "dy1torn";
	}
	change_product(
		document.getElementById("prod_" + mae.ptype),
		true
	);
}


function change_product(element, init=false) {
	if ((element.getAttribute("id") != "prod_" + mae.ptype
		&& init == false) || init == true) {
		// Take off old highlight
		document.getElementById("prod_" + mae.ptype).style.backgroundColor = "#FFF2CC";
		// Change product and highlight new
		mae.ptype = element.id.match(/_(.*)/)[1];
		mae.pdesc = element.innerText;
		element.style.backgroundColor = "yellow";
		display_new_image();
	}
}

function change_date(delta, units) {
	newtime = new Date(
		mae.time.getFullYear() + ((units == "year") ? delta : 0),
		mae.time.getMonth() + ((units == "month") ? delta : 0),
		mae.time.getDate() + ((units == "day") ? delta : 0),
		mae.time.getHours() + ((units == "hour") ? delta : 0)
	);
	if (date_is_valid(newtime)) {
		current_btn_pressed = false;
		mae.time = newtime;
		display_new_image();
	}
}

function check_gotodate() {
	// invalid date
	if (gotodate.value.length == 0) {
		gotodate.value = "";
		return null;
	}
	// remove any leading zeroes
	newvaluelist = gotodate.value
		.replace(/^0+/,"")
		.replace(/[^0-9]+/g,",")
		.split(",");
	// Year
	if (newvaluelist.length >= 1 && newvaluelist[0].length > 0) {
		year = parseInt(newvaluelist[0]);
	}
	else {
		year = mae.time.getFullYear();
	}
	// Month
	if (newvaluelist.length >= 2 && newvaluelist[1].length > 0) {
		month = (parseInt(newvaluelist[1]) > 12) ? 12: parseInt(newvaluelist[1]);
	}
	else {
		month = mae.time.getMonth()+1;
	}
	// Day
	if (newvaluelist.length >= 3 && newvaluelist[2].length > 0) {
		day = (parseInt(newvaluelist[2]) > 31) ? 31 : parseInt(newvaluelist[2]);
	}
	else {
		day = mae.time.getDate();
	}
	// Hour
	if (newvaluelist.length >= 4 && newvaluelist[3].length > 0) {
		hour = (parseInt(newvaluelist[3]) > 24) ? 24: parseInt(newvaluelist[3]);
	}
	else {
		hour = mae.time.getHours();
	}
	newdate = new Date(year, month-1, day, hour);
	if (newdate.toString() != mae.time.toString() && date_is_valid(newdate)) {
		mae.time = new Date(year, month-1, day, hour);
		current_btn_pressed = false;
		display_new_image();
	}
	else {
		gotodate.value = "";
	}
	
}

function gotopresent() {
	mae.time = new Date(
		(Date.now() - 120 * 1000 * 60) + new Date(Date.now()).getTimezoneOffset()
		* 1000 * 60
	);
	current_btn_pressed = true;
	display_new_image();
}

function date_is_valid(date) {
	// min="2005101800"
	if (
		date >= new Date(2005, 10, 18, 00) &&
		date <= new Date(
			Date.now() + new Date(Date.now()).getTimezoneOffset()
			* 1000 * 60
		)
	) {
		return true;
	}
	else {return false;}
}

function product_is_valid(prod) {
	for (product of product_list) {
		if (prod == product.code) {return true;}
	}
	return false;
}

function change_date_placeholder() {
	gotodate.value = "";
	gotodate.placeholder = mae.time.getFullYear().toString()
	   + "-" + (mae.time.getMonth() + 1).toString().padStart(2,"0")
	   + "-" + mae.time.getDate().toString().padStart(2,"0")
	   + " " + mae.time.getHours().toString().padStart(2,"0") + "Z";
}

function month_abbr(i) {
	i = parseInt(i);
	if (i == 1) {return 'Jan'}
	else if (i == 2) {return 'Feb'}
	else if (i == 3) {return 'Mar'}
	else if (i == 4) {return 'Apr'}
	else if (i == 5) {return 'May'}
	else if (i == 6) {return 'Jun'}
	else if (i == 7) {return 'Jul'}
	else if (i == 8) {return 'Aug'}
	else if (i == 9) {return 'Sep'}
	else if (i == 10) {return 'Oct'}
	else if (i == 11) {return 'Nov'}
	else {return 'Dec'}
}

function display_new_image() {
	// Turn off missing indicator if necessary
	missing.style.display = "none";
	mainimg.style.display = "block";
	// Change date placeholder text
	change_date_placeholder();
	// Product description
	datedisp.innerText = mae.time.getFullYear()
			     + " " + month_abbr(mae.time.getMonth() + 1)
				 + " " + mae.time.getDate().toString().padStart(2, "0")
				 + " - " + mae.time.getHours().toString().padStart(2, "0")
				 + "Z";
	desc.innerText = mae.pdesc + ` (${mae.ptype})`;
	// Change imagery
	new_src = "https://www.spc.noaa.gov/exper/ma_archive/images_s4/"
		+ mae.time.getFullYear().toString()
		+ (mae.time.getMonth() + 1).toString().padStart(2, "0")
		+ mae.time.getDate().toString().padStart(2, "0")
		+ "/" + mae.time.getHours().toString().padStart(2, "0")
		+ "_" + mae.ptype + ".gif";
	mainimg.src = new_src;
	// Modify the selection link
	selection_link.href = location.pathname;
	// Handle the date
	if (current_btn_pressed == true) {
		selection_link.href += "?date=current";
	}
	else {
		selection_link.href += "?date=" + mae.time.getFullYear()
			+ (mae.time.getMonth() + 1).toString().padStart(2, "0")
			+ mae.time.getDate().toString().padStart(2, "0")
			+ mae.time.getHours().toString().padStart(2, "0");
	}
	// Handle the product
	selection_link.href += "&product=" + mae.ptype;
}

function kbshortcut(event) {
	// 1 hour back
	if (["<", ","].includes(event.key)) {
		change_date(-1, "hour");
	}
	else if ([">", "."].includes(event.key)) {
		change_date(1, "hour");
	}
}

function chg_hr_key(event) {
	// Advances one hour by pressing the > key (period)
	if (event.keyCode == 190) {chg_hr(1);}
	// Goes back one hour by pressing the < key (comma)
	if (event.keyCode == 188) {chg_hr(-1);}
}

let product_list = [
	// Observations
	{"code":"CATEGORY", "description": "Observations"},
	{"code":"bigsfc", "description": "Surface Observations"},
	{"code":"1kmv", "description": "Sat - Visible"},
	{"code":"ir", "description": "Sat - Infrared"},
	{"code":"wv", "description": "Sat - Water Vapor"},
	{"code":"rgnlrad", "description": "Radar Mosaic"},
	{"code":"dy1otlk", "description": "Day 1 Severe Weather Outlook"},
	{"code":"dy1torn", "description": "Day 1 Tornado Outlook"},
	{"code":"dy1hail", "description": "Day 1 Hail Outlook"},
	{"code":"dy1wind", "description": "Day 1 Wind Outlook"},
	{"code":"dy1fire", "description": "Day 1 Fire Wx Outlook"},
	{"code":"spcww", "description": "Watches in Effect (transparent)"},
	{"code":"mcdsum", "description": "Mesoscale Discussion Summary (transparent)"},
	{"code":"rgnlwarn", "description": "Radar-SPC Outlook-Warnings Summary"},
	{"code":"activity_loop", "description": "Radar-SPC Outlook-Warnings Loop"},

	// Surface
	{"code":"CATEGORY", "description": "Surface"},
	{"code":"pmsl", "description": "Sea-Level Pressure"},
	{"code":"ttd", "description": "Temp-Dewpoint-SLP"},
	{"code":"mcon", "description": "Moisture Convergence and Mixing-Ratio"},
	{"code":"thea", "description": "Theta-E Advection"},
	{"code":"mxth", "description": "Mixing Ratio and Theta"},
	{"code":"icon", "description": "Instantaneous Contraction Rate and Theta"},
	{"code":"trap", "description": "Fluid Trapping Diagnostic"},
	{"code":"vtm", "description": "Horizontal Velocity Gradient Tensor Magnitude"},
	{"code":"dvvr", "description": "SFC Vorticity and Divergence"},
	{"code":"def", "description": "SFC Total Deformation"},
	{"code":"pchg", "description": "2-Hr Pressure Change"},
	{"code":"temp_chg", "description": "3-Hr Temperature Change"},
	{"code":"dwpt_chg", "description": "3-Hr Dew-Point Change"},
	{"code":"mixr_chg", "description": "3-Hr Mixing Ratio Change"},
	{"code":"thte_chg", "description": "3-Hr Theta-E Change"},

	// Upper Air
	{"code":"CATEGORY", "description": "Upper Air"},
	{"code":"925mb", "description": "925mb Analysis"},
	{"code":"850mb", "description": "850mb Analysis"},
	{"code":"700mb", "description": "700mb Analysis"},
	{"code":"500mb", "description": "500mb Analysis"},
	{"code":"300mb", "description": "300mb Analysis"},
	{"code":"dlcp", "description": "Deep-Layer Moisture-Flux Convergence and Mean Mixing Ratio"},
	{"code":"sfnt", "description": "Surface Frontogenesis"},
	{"code":"tadv", "description": "850mb Temperature Advection"},
	{"code":"8fnt", "description": "850 Frontogenesis"},
	{"code":"7fnt", "description": "700 Frontogenesis"},
	{"code":"857f", "description": "850-700 Frontogenesis"},
	{"code":"75ft", "description": "700-500 Frontogenesis"},
	{"code":"vadv", "description": "500mb Vorticity Advection"},
	{"code":"padv", "description": "400-250mb Potential Vorticity Advection"},
	{"code":"ddiv", "description": "250-850mb Differential Divergence"},
	{"code":"ageo", "description": "300mb Jet Circulation"},
	{"code":"500mb_chg", "description": "12-Hr 500mb Height Change"},
	{"code":"trap_500", "description": "500mb Fluid Trapping"},
	{"code":"trap_250", "description": "250mb Fluid Trapping"},

	// Thermodynamics
	{"code":"CATEGORY", "description": "Thermodynamics"},
	{"code":"sbcp", "description": "SFC CAPE"},
	{"code":"mlcp", "description": "ML CAPE"},
	{"code":"mucp", "description": "MU CAPE"},
	{"code":"ncap", "description": "Normalized CAPE"},
	{"code":"dcape", "description": "Downdraft CAPE"},
	{"code":"muli", "description": "SFC-based Lifted Index and SFC-based CIN"},
	{"code":"laps", "description": "Mid-Level Lapse Rates"},
	{"code":"lllr", "description": "Low-Level Lapse Rates"},
	{"code":"lclh", "description": "LCL Heights"},
	{"code":"lfch", "description": "LFC Heights"},
	{"code":"lfrh", "description": "LFC-LCL RH"},
	{"code":"sbcp_chg", "description": "3-Hr SBCAPE Change"},
	{"code":"mlcp_chg", "description": "3-Hr MLCAPE Change"},
	{"code":"mucp_chg", "description": "3-Hr MUCAPE Change"},
	{"code":"lllr_chg", "description": "3-Hr Low-Level Lapse Rate Change"},
	{"code":"laps_chg", "description": "6-Hr Mid-Level Lapse Rate Change"},

	// Wind
	{"code":"CATEGORY", "description": "Wind"},
	{"code":"eshr", "description": "Bulk Shear-Effective"},
	{"code":"shr6", "description": "Bulk Shear-0-6km"},
	{"code":"shr8", "description": "Bulk Shear-0-8km"},
	{"code":"shr1", "description": "Bulk Shear-0-1km"},
	{"code":"brns", "description": "BRN Shear"},
	{"code":"effh", "description": "SR Helicity-Effective"},
	{"code":"srh3", "description": "SR Helicity-0-3km"},
	{"code":"srh1", "description": "SR Helicity-0-1km"},
	{"code":"clsh", "description": "Effective Inflow Base-Eff. SRH-Storm Motion"},
	{"code":"llsr", "description": "SR Winds-0-2km"},
	{"code":"mlsr", "description": "SR Winds-4-6km"},
	{"code":"ulsr", "description": "SR Winds-9-11km"},
	{"code":"alsr", "description": "SR Winds-Anvil Level"},
	{"code":"mnwd", "description": "850-300mb Mean Wind"},
	{"code":"xover", "description": "850 and 500 Wind Crossover"},
	{"code":"srh3_chg", "description": "3-Hr SRH Change-0-3km"},
	{"code":"shr1_chg", "description": "3-Hr 0-1km Bulk Shear Change"},
	{"code":"shr6_chg", "description": "3-Hr 0-6km Bulk Shear Change"},

	// Composites
	{"code":"CATEGORY", "description": "Composites"},
	{"code":"scp", "description": "Supercell Composite"},
	{"code":"lscp", "description": "Left-Moving Supercell Composite"},
	{"code":"stor", "description": "Significant Tornado Parameter (fixed)"},
	{"code":"stpc", "description": "Significant Tornado Parameter (effective)"},
	{"code":"nstp", "description": "Non-Supercell Tornado Parameter"},
	{"code":"sigh", "description": "Significant Hail Parameter"},
	{"code":"dcp", "description": "Derecho Composite Parameter"},
	{"code":"cbsig", "description": "Craven SigSvr Parameter"},
	{"code":"brn", "description": "Bulk Richardson Number"},
	{"code":"mcsm", "description": "MCS Maintenance"},
	{"code":"ehi1", "description": "Energy Helicity Index 0-1km"},
	{"code":"ehi3", "description": "Energy Helicity Index 0-3km"},
	{"code":"vgp3", "description": "3km Vorticity Generation Parameter"},

	// Multi-Parameter Fields
	{"code":"CATEGORY", "description": "Multi-Paramenter Fields"},
	{"code":"cpsh", "description": "MUCAPE and MUCIN and Effective Bulk Shear"},
	{"code":"comp", "description": "850 to 500 Crossover and MULI"},
	{"code":"lcls", "description": "Mean LCL and SRH"},
	{"code":"lr3c", "description": "Low-Level Lapse-Rates and LL MLCAPE"},
	{"code":"3cvr", "description": "SFC Vorticity and 0-3km MLCAPE"},
	{"code":"tdlr", "description": "SFC DewPoint and Mid-Level LR"},
	{"code":"hail", "description": "Hail Parameters"},

	// Heavy Precipitation
	{"code":"CATEGORY", "description": "Heavy Rain"},
	{"code":"pwtr", "description": "Precipitable Water"},
	{"code":"tran", "description": "850 Moisture Transport"},
	{"code":"prop", "description": "Upwind Propagation Vector"},
	{"code":"peff", "description": "Precipitation Potential Placement"},

	// Winter Weather
	{"code":"CATEGORY", "description": "Winter Weather"},
	{"code":"fztp", "description": "Near-Freezing SFC Temps-Wind-Pres"},
	{"code":"swbt", "description": "SFC Wet-Bulb Temps"},
	{"code":"fzlv", "description": "Freezing Level"},
	{"code":"thck", "description": "Critical Thicknesses"},
	{"code":"epvl", "description": "Equivalent Potential Vorticity-Low-Level"},
	{"code":"epvm", "description": "Equivalent Potential Vorticity-Mid-Level"},
	{"code":"les1", "description": "Lake-Effect Snow-1"},
	{"code":"les2", "description": "Lake-Effect Snow-2"},

	// Fire Weather
	{"code":"CATEGORY", "description": "Fire Weather"},
	{"code":"sfir", "description": "SLP-Temp-Wind-RH"},
	{"code":"fosb", "description": "Forsberg Index"},
	{"code":"lhan", "description": "Haines Index-Low-Altitude"},
	{"code":"mhan", "description": "Haines Index-Mid-Altitude"},
	{"code":"hhan", "description": "Haines Index-High-Altitude"},
	{"code":"lasi", "description": "SPC Lower Atmospheric Severity Index"}
];

















