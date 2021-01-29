function populate_options() {
	for (dy=1; dy<=7; dy++) {
		// Forecast Block
		let newdiv = document.createElement("div");
		newdiv.id = `day${dy}`;
		newdiv.className = "edit-day";
		document.getElementById("forecast-modify").appendChild(newdiv);
		// Forecast Day Heading
		let dname = document.createElement("span");
		dname.id = `d${dy}name`;
		dname.className = "optdaydisp";
		dname.innerHTML = prop.lang_packs[prop.language].dayNames[dy-1];
		newdiv.appendChild(dname);
		// PRCP Chance Header
		let prcpboxheader = document.createElement("label");
		prcpboxheader.className = "optvariable";
		prcpboxheader.htmlFor = `percentbox${dy}`;
		prcpboxheader.innerHTML = "PRCP (&percnt;):";
		newdiv.appendChild(prcpboxheader);
		// PRCP Chance Box
		let prcpbox = document.createElement("input");
		prcpbox.id = `percentbox${dy}`;
		prcpbox.type = "number";
		prcpbox.className = "percinsert";
		prcpbox.maxLength = 3;
		prcpbox.placeholder = 50;
		prcpbox.value = "";
		prcpbox.setAttribute("oninput", `prop["day${dy}"].prcp = this.value; draw();`);
		newdiv.appendChild(prcpbox);
		// UVI Toggle Header
		let uviheader = document.createElement("label");
		uviheader.className = "optvariable";
		uviheader.htmlFor = `uvitoggle${dy}`;
		uviheader.innerHTML = "UVI Toggle:";
		newdiv.appendChild(uviheader);
		// UVI Toggle
		let uvitoggle = document.createElement("div");
		uvitoggle.id = `uvitoggle${dy}`;
		uvitoggle.className = "toggle-button";
		uvitoggle.setAttribute("onclick", `chg_uvi_vis(parseInt(${dy}))`);
		uvitoggle.innerText = "OFF";
		newdiv.appendChild(uvitoggle);

		// Wind Header
		let windheader = document.createElement("label");
		windheader.className = "optvariable";
		windheader.htmlFor = `windtoggle${dy}`;
		windheader.innerHTML = "Wind Toggle:";
		newdiv.appendChild(windheader);
		// Wind Toggle
		let windtoggle = document.createElement("div");
		windtoggle.id = `windtoggle${dy}`;
		windtoggle.className = "toggle-button";
		windtoggle.setAttribute("onclick", `chg_wind_vis(parseInt(${dy}))`);
		windtoggle.innerText = "OFF";
		newdiv.appendChild(windtoggle);
		// Wind
		let winddesc = document.createElement("div");
		winddesc.id = `wind${dy}desc`;
		winddesc.style.display = "none";
		newdiv.appendChild(winddesc);
		// Wind Select
		windselectlbl = document.createElement("label");
		windselectlbl.htmlFor = `wind${dy}select`;
		windselectlbl.innerHTML = `Wind Direction:`;
		winddesc.appendChild(windselectlbl);
		windselect = document.createElement("select");
		windselect.title = "Wind Direction";
		windselect.id = `wind${dy}select`;
		windselect.innerHTML = `
						<option value="">--</option>
						<option value="VAR">Variable</option>
						<option value="N">N</option>
						<option value="NNE">NNE</option>
						<option value="NE">NE</option>
						<option value="ENE">ENE</option>
						<option value="E">E</option>
						<option value="ESE">ESE</option>
						<option value="SE">SE</option>
						<option value="SSE">SSE</option>
						<option value="S">S</option>
						<option value="SSW">SSW</option>
						<option value="SW">SW</option>
						<option value="WSW">WSW</option>
						<option value="W">W</option>
						<option value="WNW">WNW</option>
						<option value="NW">NW</option>
						<option value="NNW">NNW</option>
		`;
		windselect.setAttribute("onchange", `chg_wind(this)`);
		winddesc.appendChild(windselect);
		winddesc.innerHTML += "<br />";
		// Wind Input Number
		windnumlbl = document.createElement("label");
		windnumlbl.htmlFor = `wind${dy}speed`;
		windnumlbl.innerHTML = "Speed";
		winddesc.appendChild(windnumlbl);
		winddesc.innerHTML += "<br />";
		let windnum = document.createElement("input");
		windnum.type = "number";
		//windnum.max = "100";
		windnum.style.width = "50%";
		windnum.value = "";
		windnum.id = `wind${dy}speed`;
		windnum.placeholder = "Speed";
		windnum.setAttribute("oninput", `chg_wind(this)`);
		winddesc.appendChild(windnum);
		// HI TEMP Header
		let hitempheader = document.createElement("label");
		hitempheader.className = "optvariable";
		hitempheader.htmlFor = `tmax${dy}`;
		hitempheader.innerText = "High Temp:";
		newdiv.appendChild(hitempheader);
		// HI TEMP
		hitemp = document.createElement("input");
		hitemp.className = "tempinsert";
		hitemp.maxLength = 3;
		hitemp.type = "number"
		hitemp.value = "";
		hitemp.id = `tmax${dy}`;
		hitemp.setAttribute("oninput", "chg_temp(this);");
		newdiv.appendChild(hitemp);
		// LOW TEMP Header
		let lotempheader = document.createElement("label");
		lotempheader.className = "optvariable";
		lotempheader.htmlFor = `tmin${dy}`;
		lotempheader.innerText = "Low (AM) Temp:";
		newdiv.appendChild(lotempheader);
		// LOW TEMP
		lotemp = document.createElement("input");
		lotemp.className = "tempinsert";
		lotemp.maxLength = 3;
		lotemp.type = "number"
		lotemp.value = "";
		lotemp.id = `tmin${dy}`;
		lotemp.setAttribute("oninput",  "chg_temp(this);");
		newdiv.appendChild(lotemp);
	}































}
