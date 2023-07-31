class MAEProduct {
	constructor(code, desc, nov22, mar823, mar923) {
		this._code = code;
		// this._sf = ['brn', 'cpsh', 'def', 'dvvr', 'effh', 'icon', 'laps', 'lclh', 'lcls', 'lfch', 'lfrh', 'lllr', 'lr3c', 'mcon', 'mixr', 'mlcp_eshr', 'mlcp', 'mucp', 'muli', 'mxth', 'peff', 'pwtr2', 'pwtr', 'qlcs1', 'qlcs2', 'sbcp', 'stor', 'stpc', 'tdlr', 'thea', 'trap', 'ttd', 'vtm'].includes(this._code);
		this._description = desc;
		this._nov22 = Boolean(nov22);
		this._mar823 = Boolean(mar823);
		this._mar923 = Boolean(mar923);
	}

	get code() {
		return this._code;
	}

	get sf() {
		return this._sf;
	}

	get description() {return this._description}

	is_available(date) {
		if (
			date < new Date(2022, 11-1, 30, 20)
		) {
			return this._nov22;
		}
		else if (
			date >= new Date(2022, 11-1, 30, 20) &&
			date < new Date(2023, 3-1, 9)
		) {
			return this._mar823;
		}
		else {
			return this._mar923;
		}
	}
}

let mae = {
	"ptype" : "500mb",
	"time" : new Date(
		utcNow() - 120 * 1000 * 60
	),
};

let mainimg = document.getElementById("mainimg");
let backdrop = document.getElementById("modern-backdrop");
let datedisp = document.getElementById("datedisplay");
let desc = document.getElementById("product-description");
let gotodate = document.getElementById("gotodate");
let missing = document.getElementById("missing");
let selection_link = document.getElementById("selection-link");
let prod_select = document.getElementById("products");
// bool to determine param value upon searchparam and bookmark loading
let current_btn_pressed = false;
let current_time = document.getElementById("current-time");

// mainimg error event listener
mainimg.addEventListener(
	"error",
	error => {
		mainimg.style.display = "none";
		missing.style.display = "block";
	}
);

// key listener
document.onkeypress = kbshortcut;

function load() {
	updateCurrentTime(true);
	load_products();
	// process_urlparams();

	change_product();
}

function updateCurrentTime(init=false) {
	// This is used to sync the current time on page with system
	let z = new Date().getTime();
	if (init) {
		setTimeout(
			updateCurrentTime,
			(60 - new Date().getSeconds()) * 1000
		);
	}
	else if ("interval" in current_time == false) {
		current_time.interval = setInterval(updateCurrentTime, 60000);
	}

	let now = utcNow(
		new Date().getMinutes(),
		new Date().getSeconds(),
	);
	// console.log(now);
	current_time.innerText = [
		now.getDate(),
		month_abbr(now.getMonth() + 1),
		now.getFullYear(),
		"-",
		[
			now.getHours().toString().padStart(2,"0"),
			":",
			now.getMinutes().toString().padStart(2,"0"),
			"Z",
		].join(""),
	].join(" ");
}

function utcNow(minutes=0, seconds=0) {
	return new Date(
		new Date().getUTCFullYear(),
		new Date().getUTCMonth(),
		new Date().getUTCDate(),
		new Date().getUTCHours(),
		minutes,
		seconds
	);
}

function utcEquiv(date) {
	let offset_ms = date.getTimezoneOffset() * 60 * 1000;
	return new Date(date.getTime() + offset_ms);
}

function show_hide_products() {
	for (let product of product_list) {
		if (product.is_available(mae.time)) {
			product.html.style.display = "block";
		}
		else {
			product.html.style.display = "none";
			if (product.code == mae.ptype) {
				console.log(
					`* "${mae.ptype}" unavailable for selection on the date of `
					+ [
						mae.time.getFullYear(),
						(mae.time.getMonth() + 1).toString().padStart(2, "0"),
						mae.time.getDate().toString().padStart(2, "0")
							+ " "
							+ mae.time.getHours().toString().padStart(2, "0")
							+ "Z",
					].join("-")
				);
			}
		}
	}
}

function load_products() {
	let lastoptgroup;
	let opt;

	for (let product of product_list) {
		// Category
		if (product.code == "CATEGORY") {
			opt = document.createElement("optgroup");
			opt.setAttribute("label", product.description);
			opt.setAttribute("class", "products-category");
			prod_select.appendChild(opt);
			lastoptgroup = opt;
		}
		// Product
		else {
			opt = document.createElement("option");
			opt.innerText = product.description;
			opt.setAttribute("value", product.code);
			opt.setAttribute("class", "products-product");
			opt.setAttribute("id", "prod_" + product.code);
			opt.setAttribute("onclick", "change_product(this.value)");
			lastoptgroup.appendChild(opt);
		}
		opt.js = product;
		product.html = opt;
	}
	// change to default
	document.getElementById("prod_" + mae.ptype).defaultSelected = true;

	show_hide_products();
}

function process_urlparams() {
	let terms = document.location.search.slice(1).split(/\&/);
	let params = {};
	for (let term of terms) {
		if (term.length > 0) {
			params[term.split("=")[0]] = decodeURI(term.split("=")[1]);
		}
	}

	// Handle saved date
	if ("date" in params) {
		
	}

	// Handle saved product
	if ("product" in params) {
		mae.ptype = params.product;
		document.getElementById(`prod_${params.product}`).setAttribute("selected", true);
	}
	else {
		document.getElementById(`prod_${mae.ptype}`).setAttribute("selected", true);
	}

}

function change_product() {
	mae.ptype = prod_select.value;
	display_new_image();
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
		show_hide_products();
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
		show_hide_products();
		display_new_image();
	}
	else {
		gotodate.value = "";
	}
}

function gotopresent() {
	// go to time of now minus 2 hours
	mae.time = new Date(
		utcNow() - 120 * 1000 * 60
	);
	current_btn_pressed = true;
	show_hide_products();
	display_new_image();
}

function date_is_valid(date) {
	// min="2005101800"
	if (
		date >= new Date(2005, 10, 18, 00) &&
		date <= utcNow()
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

	// Display the backdrop (or disable) based upon the date (because newer products are all transparent)
	if (mae.time >= new Date(2022,12,1)) {
		backdrop.style.display = "block";
	}
	else {
		backdrop.style.display = "none";
	}

	// Change date placeholder text
	change_date_placeholder();

	// Product description
	datedisp.innerText = [
		mae.time.getDate(),
		month_abbr(mae.time.getMonth() + 1),
		mae.time.getFullYear(),
		"-",
		mae.time.getHours().toString().padStart(2,"0") + "Z"
	].join(" ");

	// label text; errors upon invalid (date-based) selection
	try {
		desc.innerText = prod_select.selectedOptions[0].innerText + ` (${mae.ptype})`;

		// try to center on selection
		// try {
			// document.getElementById(`prod_${mae.ptype}`)
				// .scrollIntoView({"block": "center",});
		// } catch {
			// document.getElementById(`prod_${mae.ptype}`).scrollIntoView();
		// }
	} catch (error) {
		// pass
	}

	// Change imagery
	new_src = "https://www.spc.noaa.gov/exper/ma_archive/images_s4/"
		+ mae.time.getFullYear()
		+ (mae.time.getMonth() + 1).toString().padStart(2, "0")
		+ mae.time.getDate().toString().padStart(2, "0")
		+ "/"
	;
	// Different file format
	// for Dec2022 thru Jan-04-2023 17z, they have a suffix like ptype_22122203_sf.gif
	if (
		mae.time >= new Date(2022, 12-1, 1) &&
		mae.time < new Date(2023, 1-1, 4, 18)
	) {
		new_src += mae.ptype + "_";
		// Prefer solid-fill images vs. thatched
		if (
			['brn', 'cpsh', 'def', 'dvvr', 'effh', 'icon', 'laps', 'lclh', 'lcls', 'lfch', 'lfrh', 'lllr', 'lr3c', 'mcon', 'mixr', 'mlcp_eshr', 'mlcp', 'mucp', 'muli', 'mxth', 'peff', 'pwtr2', 'pwtr', 'qlcs1', 'qlcs2', 'sbcp', 'stor', 'stpc', 'tdlr', 'thea', 'trap', 'vtm'].includes(mae.ptype)
		) {
			// of note, 'ttd', also has solid fill during this time, but it doesn't render well, so it was not included in the above list
			new_src += "sf_";
		}
		new_src += [
			mae.time.getFullYear().toString().substr(2).padStart(2, "0"),
			(mae.time.getMonth() + 1).toString().padStart(2, "0"),
			mae.time.getDate().toString().padStart(2, "0"),
			mae.time.getHours().toString().padStart(2, "0"),
		].join("");
	}
	// Standard file format for nearly all of the archive
	else {
		new_src += mae.time.getHours().toString().padStart(2, "0")
			+ "_" + mae.ptype
	}

	// add file type suffix
	new_src += ".gif";
	// console.log(new_src);

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
	new MAEProduct("CATEGORY", "Observations", 1, 0, 0),
	new MAEProduct("bigsfc", "Surface Observations", 1, 0, 0),
	new MAEProduct("1kmv", "Visible Satellite", 1, 0, 0),
	new MAEProduct("ir", "Sat - Infrared", 1, 0, 0),
	new MAEProduct("wv", "Sat - Water Vapor", 1, 0, 0),
	new MAEProduct("rgnlrad", "Radar Base Reflectivity", 1, 0, 0),
	new MAEProduct("rgnlrad_small", "Radar Base Reflectivity (small)", 1, 0, 0),
	new MAEProduct("activity_loop", "Activity Loop", 1, 0, 0),
	new MAEProduct("dy1otlk", "Day 1 Severe Weather Outlook", 1, 0, 0),
	new MAEProduct("dy1torn", "Day 1 Tornado Outlook", 1, 0, 0),
	new MAEProduct("dy1hail", "Day 1 Hail Outlook", 1, 0, 0),
	new MAEProduct("dy1wind", "Day 1 Wind Outlook", 1, 0, 0),
	new MAEProduct("dy1fire", "Day 1 Fire Wx Outlook", 1, 0, 0),
	new MAEProduct("spcww", "Watches in Effect (transparent)", 1, 0, 0),
	new MAEProduct("mcdsum", "Mesoscale Discussion Summary (transparent)", 1, 0, 0),
	new MAEProduct("rgnlwarn", "Radar-SPC Outlook-Warnings Summary", 1, 0, 0),

	// Surface
	new MAEProduct("CATEGORY", "Surface", 1, 1, 1),
	new MAEProduct("pmsl", "MSL Pressure/Wind", 1, 1, 1),
	new MAEProduct("ttd", "Temp/Wind/Dwpt", 1, 1, 1),
	new MAEProduct("thet", "MSL Pressure/Theta-E/Wind", 0, 1, 1),
	new MAEProduct("mcon", "Moisture Convergence", 1, 1, 1),
	new MAEProduct("thea", "Theta-E Advection", 1, 1, 1),
	new MAEProduct("mxth", "Mixing Ratio / Theta", 1, 1, 1),
	new MAEProduct("icon", "Instantaneous Contraction Rate (sfc)", 1, 1, 1),
	new MAEProduct("trap", "Fluid Trapping (sfc)", 1, 1, 1),
	new MAEProduct("vtm", "Velocity Tensor Magnitude (sfc)", 1, 1, 1),
	new MAEProduct("dvvr", "Divergence and Vorticity (sfc)", 1, 1, 1),
	new MAEProduct("def", "Deformation and Axes of Dilitation (sfc)", 1, 1, 1),
	new MAEProduct("pchg", "2-hour Pressure Change", 1, 1, 1),
	new MAEProduct("temp_chg", "3-hour Temp Change", 1, 0, 0),
	new MAEProduct("dwpt_chg", "3-hour Dwpt Change", 1, 0, 0),
	new MAEProduct("mixr_chg", "3-hour 100mb Mixing Ratio Change", 1, 0, 0),
	new MAEProduct("thte_chg", "3-hour Theta-E Change", 1, 0, 0),

	// Upper Air
	new MAEProduct("CATEGORY", "Upper Air", 1, 1, 1),
	new MAEProduct("925mb", "925mb Analysis", 1, 0, 1),
	new MAEProduct("850mb", "850mb Analysis", 1, 0, 1),
	new MAEProduct("850mb2", "850mb Analysis (version 2)", 0, 0, 1),
	new MAEProduct("700mb", "700mb Analysis", 1, 0, 1),
	new MAEProduct("500mb", "500mb Analysis", 1, 0, 1),
	new MAEProduct("300mb", "300mb Analysis", 1, 0, 1),
	new MAEProduct("dlcp", "Deep Moist Convergence", 1, 1, 1),
	new MAEProduct("tadv_925", "925mb Temp Advection", 0, 0, 1),
	new MAEProduct("tadv", "850mb Temp Advection", 1, 0, 1),
	new MAEProduct("7tad", "700mb Temp Advection", 0, 0, 1),
	new MAEProduct("sfnt", "Sfc Frontogenesis", 1, 1, 1),
	new MAEProduct("9fnt", "925mb Frontogenesis", 0, 0, 1),
	new MAEProduct("8fnt", "850mb Frontogenesis", 1, 0, 1),
	new MAEProduct("7fnt", "700mb Frontogenesis", 1, 0, 1),
	new MAEProduct("925f", "1000-925mb Frontogenesis", 0, 0, 1),
	new MAEProduct("98ft", "925-850mb Frontogenesis", 0, 0, 1),
	new MAEProduct("857f", "850-700mb Frontogenesis", 1, 0, 1),
	new MAEProduct("75ft", "700-500mb Frontogenesis", 1, 0, 1),
	new MAEProduct("vadv", "700-400mb Diff. Vorticity Advection", 1, 0, 1),
	new MAEProduct("padv", "400-250mb Pot. Vorticity Advection", 1, 0, 1),
	new MAEProduct("ddiv", "850-250mb Diff. Divergence", 1, 0, 1),
	new MAEProduct("ageo", "300mb Jet Circulation", 1, 0, 1),
	new MAEProduct("500mb_chg", "12-hour 500mb Height Change", 1, 0, 0),
	new MAEProduct("trap_500", "Fluid Trapping (500mb)", 1, 0, 1),
	new MAEProduct("trap_250", "Fluid Trapping (250mb)", 1, 0, 1),

	// Thermodynamics / Classic
	new MAEProduct("CATEGORY", "Thermodynamics / Classic", 1, 1, 1),
	new MAEProduct("sbcp", "CAPE - Surface-Based", 1, 1, 1),
	new MAEProduct("mlcp", "CAPE - 100mb Mixed-Layer", 1, 1, 1),
	new MAEProduct("mucp", "CAPE - Most-Unstable / LPL Height", 1, 1, 1),
	new MAEProduct("eltm", "EL Temp / MUCAPE / MUCIN", 0, 1, 1),
	new MAEProduct("ncap", "CAPE - Normalized", 1, 1, 1),
	new MAEProduct("dcape", "CAPE - Downdraft", 1, 1, 1),
	new MAEProduct("muli", "Surface-based Lifted Index", 1, 1, 1),
	new MAEProduct("laps", "Mid-Level Lapse Rates", 1, 1, 1),
	new MAEProduct("lllr", "Low-Level Lapse Rates", 1, 1, 1),
	new MAEProduct("maxlr", "Max 2-6 km AGL Lapse Rate", 0, 1, 1),
	new MAEProduct("lclh", "LCL Height", 1, 1, 1),
	new MAEProduct("lfch", "LFC Height", 1, 1, 1),
	new MAEProduct("lfrh", "LCL-LFC Mean RH", 1, 1, 1),
	new MAEProduct("sbcp_chg", "3-hour Surface-Based CAPE Change", 1, 0, 0),
	new MAEProduct("mlcp_chg", "3-hour 100mb Mixed-Layer CAPE Change", 1, 0, 0),
	new MAEProduct("mucp_chg", "3-hour Most-Unstable CAPE Change", 1, 0, 0),
	new MAEProduct("lllr_chg", "3-hour Low-Level LR Change", 1, 0, 0),
	new MAEProduct("laps_chg", "6-hour Mid-Level LR Change", 1, 0, 0),
	new MAEProduct("ttot", "Total Totals", 0, 1, 1),
	new MAEProduct("kidx", "K-Index", 0, 0, 1),
	new MAEProduct("show", "Showalter Index", 0, 1, 1),

	// Wind Shear
	new MAEProduct("CATEGORY", "Wind Shear", 1, 1, 1),
	new MAEProduct("eshr", "Bulk Shear - Effective", 1, 1, 1),
	new MAEProduct("shr6", "Bulk Shear - Sfc-6km", 1, 1, 1),
	new MAEProduct("shr8", "Bulk Shear - Sfc-8km", 1, 1, 1),
	new MAEProduct("shr3", "Bulk Shear - Sfc-3km", 0, 1, 1),
	new MAEProduct("shr1", "Bulk Shear - Sfc-1km", 1, 1, 1),
	new MAEProduct("brns", "BRN Shear", 1, 1, 1),
	new MAEProduct("effh", "SR Helicity - Effective", 1, 1, 1),
	new MAEProduct("srh3", "SR Helicity - Sfc-3km", 1, 1, 1),
	new MAEProduct("srh1", "SR Helicity - Sfc-1km", 1, 1, 1),
	new MAEProduct("srh5", "SR Helicity - Sfc-500m", 0, 1, 1),
	new MAEProduct("clsh", "Effective Inflow Base-Eff. SRH-Storm Motion", 1, 1, 1),
	new MAEProduct("llsr", "SR Wind - Sfc-2km", 1, 1, 1),
	new MAEProduct("mlsr", "SR Wind - 4-6km", 1, 1, 1),
	new MAEProduct("ulsr", "SR Wind - 9-11km", 1, 1, 1),
	new MAEProduct("alsr", "SR Wind - Anvil Level", 1, 1, 1),
	new MAEProduct("mnwd", "850-300mb Mean Wind", 1, 0, 1),
	new MAEProduct("xover", "850 and 500mb Winds", 1, 0, 1),
	new MAEProduct("srh3_chg", "3hr Sfc-3km SR Helicity Change", 1, 0, 0),
	new MAEProduct("shr1_chg", "3hr Sfc-1km Bulk Shear Change", 1, 0, 0),
	new MAEProduct("shr6_chg", "3hr Sfc-6km Bulk Shear Change", 1, 0, 0),

	// Composites
	new MAEProduct("CATEGORY", "Composites", 1, 1, 1),
	new MAEProduct("scp", "Supercell Composite", 1, 1, 1),
	new MAEProduct("lscp", "Supercell Composite (left-moving)", 1, 1, 1),
	new MAEProduct("stor", "Sgfnt Tornado (fixed layer)", 1, 1, 1),
	new MAEProduct("stpc", "Sgfnt Tornado (effective layer)", 1, 1, 1),
	new MAEProduct("stpc5", "Sgfnt Tornado (using 0-500m SRH )", 0, 1, 1),
	new MAEProduct("nstp", "Non-Supercell Tornado", 1, 1, 1),
	new MAEProduct("lli", "Non-Supercell Tornado Parameter ???", 0, 1, 1),
	new MAEProduct("vtp3", "Violent Tornado Parameter (VTP)", 0, 1, 1),
	new MAEProduct("sigh", "Sgfnt Hail", 1, 1, 1),
	new MAEProduct("sars1", "SARS Hail Size", 0, 0, 1),
	new MAEProduct("sars2", "SARS Sig. Hail Percentage", 0, 0, 1),
	new MAEProduct("lghl", "Large Hail Parameter", 0, 1, 1),
	new MAEProduct("dcp", "Derecho Composite", 1, 1, 1),
	new MAEProduct("cbsig", "Craven/Brooks Sgfnt Severe", 1, 1, 1),
	new MAEProduct("brn", "Bulk Richardson Number", 1, 1, 1),
	new MAEProduct("mcsm", "MCS Maintenance", 1, 1, 1),
	new MAEProduct("mbcp", "Microburst Composite", 0, 1, 1),
	new MAEProduct("desp", "Enhanced Stretching Potential", 0, 1, 1),
	new MAEProduct("eehi", "Enhanced 0-1km EHI and MLCIN", 0, 1, 1),
	new MAEProduct("ehi1", "EHI - Sfc-1km", 1, 1, 1),
	new MAEProduct("ehi3", "EHI - Sfc-3km", 1, 1, 1),
	new MAEProduct("vgp3", "VGP - Sfc-3km", 1, 1, 1),
	new MAEProduct("crit", "Critical Angle", 0, 1, 1),

	// Multi-Parameter Fields
	new MAEProduct("CATEGORY", "Multi-Parameter Fields", 1, 1, 1),
	new MAEProduct("mlcp_eshr", "100mb Mixed-Layer CAPE / Effective Bulk Shear", 0, 1, 1),
	new MAEProduct("cpsh", "Most-Unstable CAPE / Effective Bulk Shear", 1, 1, 1),
	new MAEProduct("comp", "Most-Unstable LI / 850 & 500mb Winds", 1, 0, 1),
	new MAEProduct("lcls", "LCL Height / Sfc-1km SR Helicity", 1, 1, 1),
	new MAEProduct("lr3c", "Sfc-3km Lapse Rate / Sfc-3km MLCAPE", 1, 1, 1),
	new MAEProduct("3cape_shr3", "Bulk Shear - Sfc-3km / Sfc-3km MLCAPE", 0, 1, 1),
	new MAEProduct("3cvr", "Sfc Vorticity / Sfc-3km MLCAPE", 1, 1, 1),
	new MAEProduct("tdlr", "Sfc Dwpt / 700-500mb Lapse Rates", 1, 1, 1),
	new MAEProduct("hail", "Hail Parameters", 1, 1, 1),
	new MAEProduct("qlcs1", "Lowest 3km max. Theta-e diff., MUCAPE, and 0-3km vector shear", 0, 1, 1),
	new MAEProduct("qlcs2", "Lowest 3km max. Theta-e diff., MLCAPE, and 0-3km vector shear", 0, 1, 1),

	// Heavy Rain
	new MAEProduct("CATEGORY", "Heavy Rain", 1, 1, 1),
	new MAEProduct("pwtr", "Precipitable Water", 1, 1, 1),
	new MAEProduct("pwtr2", "Precipitable Water (w/850mb Moisture Transport Vector)", 0, 1, 1),
	new MAEProduct("tran", "850mb Moisture Transport", 1, 0, 1),
	new MAEProduct("tran_925", "925mb Moisture Transport", 0, 0, 1),
	new MAEProduct("tran_925-850", "925-850mb Moisture Transport", 0, 0, 1),
	new MAEProduct("prop", "Upwind Propagation Vector", 1, 0, 1),
	new MAEProduct("peff", "Precipitation Potential Placement", 1, 1, 1),
	new MAEProduct("mixr", "100mb Mean Mixing Ratio", 0, 1, 1),

	// Winter / Fire
	new MAEProduct("CATEGORY", "Winter / Fire", 1, 1, 1),
	new MAEProduct("ptyp", "Precipitation Type", 0, 1, 1),
	new MAEProduct("fztp", "Near-Freezing Surface Temp", 1, 1, 1),
	new MAEProduct("swbt", "Surface Wet-Bulb Temp", 1, 1, 1),
	new MAEProduct("fzlv", "Freezing Level", 1, 0, 1),
	new MAEProduct("thck", "Critical Thicknesses", 1, 0, 1),
	new MAEProduct("epvl", "800-750mb EPVg", 1, 0, 1),
	new MAEProduct("epvm", "650-500mb EPVg", 1, 0, 1),
	new MAEProduct("les1", "Lake Effect Snow 1", 1, 0, 1),
	new MAEProduct("les2", "Lake Effect Snow 2", 1, 0, 1),
	new MAEProduct("dend", "Dendritic Growth Layer Depth", 0, 1, 1),
	new MAEProduct("dendrh", "Dendritic Growth Layer RH", 0, 1, 1),
	new MAEProduct("ddrh", "Dendritic Growth Layer Depth & RH", 0, 1, 1),
	new MAEProduct("mxwb", "Max Wet Bulb Temperature", 0, 1, 1),
	new MAEProduct("sfir", "Sfc RH / Temp / Wind", 1, 1, 1),
	new MAEProduct("fosb", "Fosberg Index", 1, 1, 1),
	new MAEProduct("lhan", "Low Altitude Haines Index", 1, 0, 1),
	new MAEProduct("mhan", "Mid Altitude Haines Index", 1, 0, 1),
	new MAEProduct("hhan", "High Altitude Haines Index", 1, 0, 1),
	new MAEProduct("lasi", "Lower Atmospheric Severity Index", 1, 0, 1),
	new MAEProduct("lfrh2", "LCL-LFC Mean RH (fire wx version)", 0, 1, 1),

	// Beta
	new MAEProduct("CATEGORY", "Beta", 0, 1, 1),
	new MAEProduct("sherbe", "SHERBE", 0, 1, 1),
	new MAEProduct("moshe", "Modified SHERBE", 0, 1, 1),
	new MAEProduct("cwasp", "CWASP (Craven-Wiedenfeld Aggregate Severe Parameter)", 0, 1, 1),
	new MAEProduct("tehi", "Tornadic 0-1km EHI", 0, 1, 1),
	new MAEProduct("tts", "Tornadic Tilting & Stretching", 0, 1, 1),
	new MAEProduct("oprh", "OPRH (Dendritic Layer Omega * PWat * RH)", 0, 1, 1),
	new MAEProduct("ptstpe", "Prob EF0+ (conditional on RM supercell)", 0, 1, 1),
	new MAEProduct("pstpe", "Prob EF2+ (conditional on RM supercell)", 0, 1, 1),
	new MAEProduct("pvstpe", "Prob EF4+ (conditional on RM supercell)", 0, 1, 1),
	new MAEProduct("pw3k", "PW * 3kmRH", 0, 1, 1),
];