calc = {"maxsmchars":57, "maxchars":11, "display":"", "hasdot":false, "hasequals":false, "prob":[]};

options = {"bgH":0,"bgS":75,"bgL":40};

// BACKGROUND COLOR
function changebg() {
	var h = options.bgH;
	var s = options.bgS;
	var l = options.bgL;
	var hsl = `hsl(${h},${s}%,${l}%)`;
	document.body.style.background = `linear-gradient(to top, #333333, ${hsl})`;
	//document.body.style.color = `${(l >= 50) ? "black" : "white"}`
	document.getElementById("header").style.color = `${(l >= 60) ? "black" : "white"}`;
}

function changetheme(s) {
	document.getElementById("class_name").href = s;
}

function kbcontrols() {
	//console.log(event);

	// BACKSPACE PRESSED
	if (event.keyCode == 8) {
		// Thanks to https://stackoverflow.com/questions/6309693/how-can-i-disabling-backspace-key-press-on-all-browsers for making me aware of the preventDefault method
		event.preventDefault();
		if (event.shiftKey) {CLEAR("CE"); highlight("bCE");}
		else {CLEAR("C"); highlight("bC");}
	}
	else if (event.keyCode == 49 || event.keyCode == 97) {numberpress('1'); highlight("b1");}
	else if (event.keyCode == 50 || event.keyCode == 98) {numberpress('2'); highlight("b2");}
	else if (event.keyCode == 51 || event.keyCode == 99) {numberpress('3'); highlight("b3");}
	else if (event.keyCode == 52 || event.keyCode == 100) {numberpress('4'); highlight("b4");}
	else if (event.keyCode == 53 || event.keyCode == 101) {numberpress('5'); highlight("b5");}
	else if (event.keyCode == 54 || event.keyCode == 102) {numberpress('6'); highlight("b6");}
	else if (event.keyCode == 55 || event.keyCode == 103) {numberpress('7'); highlight("b7");}
	else if (event.keyCode == 56 || event.keyCode == 104) {
		if (event.shiftKey) {mathpress('*'); highlight("btimes");}
		else {numberpress('8'); highlight("b8");}
	}
	else if (event.keyCode == 57 || event.keyCode == 105) {numberpress('9'); highlight("b9");}
	else if (event.keyCode == 48 || event.keyCode == 96) {numberpress('0'); highlight("b0");}
	else if (event.keyCode == 189 || event.keyCode == 109) {
		if (event.shiftKey) {signpress(); highlight("bsign");}
		else {mathpress('-'); highlight("bminus");}
	}
	else if (event.keyCode == 190 || event.keyCode == 110) {dotpress(); highlight("bdot");}
	else if (event.keyCode == 88 && event.ctrlKey == false) {mathpress('*'); highlight("btimes");}
	else if (event.keyCode == 191 || event.keyCode == 111) {mathpress('/'); highlight("bdivide");}
	else if (event.keyCode == 187 || event.keyCode == 107) {
		if (event.shiftKey) {mathpress('+'); highlight("bplus");}
		else {equals(); highlight("bequals");}
	}
	else if (event.keyCode == 13) {equals(); highlight("bequals");}
	else if (event.keyCode == 67) {
		if (event.ctrlKey == false) {
			if (event.shiftKey) {CLEAR("CE"); highlight("bCE");}
			else {CLEAR("C"); highlight("bC");}
		}
	}

}

function highlight(bid) {
	var btnid = bid;
	if (document.getElementById("class_name").href.includes("calc/style1.css")) {
		if (/b(\d|\.)/.test(btnid)) {document.getElementById(bid).setAttribute("class",document.getElementById(bid).getAttribute("class") + " KDOWNnum");}
		else if (/b(plus|minus|times|divide)/.test(btnid)) {document.getElementById(bid).setAttribute("class",document.getElementById(bid).getAttribute("class") + " KDOWNmath");}
		else if (/bequals/.test(btnid)) {document.getElementById(bid).setAttribute("class",document.getElementById(bid).getAttribute("class") + " KDOWNeq");}
		else if (/b(C|CE)/.test(btnid)) {document.getElementById(bid).setAttribute("class",document.getElementById(bid).getAttribute("class") + " KDOWNclr");}
		else if (/bsign/.test(btnid)) {document.getElementById(bid).setAttribute("class",document.getElementById(bid).getAttribute("class") + " KDOWNsign");}
	}
	else {
		document.getElementById(bid).setAttribute("class",document.getElementById(bid).getAttribute("class") + " KDOWN");
	}
	
	setTimeout(dehighlight,220,btnid);
}

function dehighlight(bid) {
	var btnid = bid;
	if (document.getElementById("class_name").href.includes("calc/style1.css")) {
		if (/b(\d|\.)/.test(btnid)) {document.getElementById(bid).setAttribute("class",document.getElementById(bid).getAttribute("class").replace(" KDOWNnum",""));}
		else if (/b(plus|minus|times|divide)/.test(btnid)) {document.getElementById(bid).setAttribute("class",document.getElementById(bid).getAttribute("class").replace(" KDOWNmath",""));}
		else if (/bequals/.test(btnid)) {document.getElementById(bid).setAttribute("class",document.getElementById(bid).getAttribute("class").replace(" KDOWNeq",""));}
		else if (/b(C|CE)/.test(btnid)) {document.getElementById(bid).setAttribute("class",document.getElementById(bid).getAttribute("class").replace(" KDOWNclr",""));}
		else if (/bsign/.test(btnid)) {document.getElementById(bid).setAttribute("class",document.getElementById(bid).getAttribute("class").replace(" KDOWNsign",""));}
	}
	else {
		document.getElementById(btnid).setAttribute("class",document.getElementById(btnid).getAttribute("class").replace(" KDOWN",""));	
	}
}

function CLEAR(btn) {
	if (btn == "CE" && calc.hasequals == false) {
		document.getElementById("output").innerHTML = "0.";
	}
	calc.display = "";
	calc.hasdot = false;
	if (btn == "C") {
		calc.problem = "";
		calc.prob = [];
		calc.hasequals = false;
		document.getElementById("output").innerHTML = "0.";
		document.getElementById("smoutput").innerHTML = "CLEAR";
	}
}

function numberpress(btn) {
	if (calc.hasequals == true) {CLEAR("C");}
	if (calc.display.length < calc.maxchars) {
		if (calc.display != "0" && calc.display != "-0") {
			calc.display += btn;
			document.getElementById("output").innerHTML = calc.display;
		}
	}
}

function dotpress() {
	if (calc.hasequals == true) {CLEAR("C");}
	if (calc.hasdot == false && calc.display.length < calc.maxchars) {
		if (calc.display.length == 0) {calc.display = "0.";}
		else {calc.display += ".";}
		calc.hasdot = true;
		document.getElementById("output").innerHTML = calc.display;
	}
}

function signpress() {
	if (calc.hasequals == false) {
		if (calc.display != "") {
			// If we want to make the number a negative
			if (calc.display[0] != "-") {
				calc.display = "-" + calc.display;
			}
			// If we want to make the number a positive
			else {
				calc.display = calc.display.slice(1);
			}
			document.getElementById("output").innerHTML = calc.display;
		}
	}
}

function ROUND(n,d) {
	var nstr = n.toString();
	if (nstr.includes(".")) {
		let i = nstr.indexOf(".");
		let decimalplaces = nstr.slice(i+1).length;
		if (d < decimalplaces) {
			if (parseInt(nstr[i+d+1]) < 5) {return parseInt(nstr.slice(0,i+d+1));}
			else {return Math.ceil(n * 10**d) / 10**d;}
		}
		else {return n}
	}
	else {return n}
}

function mathpress(btn) {
	// Operating on the just-found answer
	if (calc.hasequals == true) {
		let lastans = SIMPLIFY(SOLVE(calc.prob));
		CLEAR("C");
		// Determine if scinotation is needed or not
		document.getElementById("smoutput").innerHTML = `${NEEDSCINOT(lastans,"smoutput")} ${btn}`.slice(-1 * calc.maxsmchars);
		calc.prob.push(lastans,btn);
	}
	// if equals hasn't been pressed
	else {
		// If there is some sort of entry on the calculator display
		if (calc.display.length != 0) {
			// NEW problem
			if (calc.prob.length == 0) {
				calc.prob.push(parseFloat(calc.display),btn);
				document.getElementById("smoutput").innerHTML = `${NEEDSCINOT(parseFloat(calc.display),"smoutput")} ${btn} `.slice(-1 * calc.maxsmchars);
				}
			// ADDENDUM (the 2nd variable)
			else {
				// account for prevention of div/0
				if (/[\+\-\*]/.test(calc.prob[1]) || (/[/]/.test(calc.prob[1]) && parseFloat(calc.display) != 0)) {
					calc.prob.push(parseFloat(calc.display)); 	// Append the display to the array
					let tempanswer = SIMPLIFY(SOLVE(calc.prob));
					document.getElementById("smoutput").innerHTML = (document.getElementById("smoutput").innerHTML + `${(calc.display[0] != "-") ? NEEDSCINOT(parseFloat(calc.display),"smoutput") : "(" + NEEDSCINOT(parseFloat(calc.display),"smoutput") + ")"} &vrtri; ${tempanswer} ${btn} `).slice(-1 * calc.maxsmchars);
					if (document.getElementById("smoutput").innerHTML.length >= calc.maxsmchars-6) {
						document.getElementById("smoutput").innerHTML = "..." + document.getElementById("smoutput").innerHTML;
					}
					calc.prob = [];
					calc.prob.push(tempanswer,btn);
				}
			}
			calc.display = "";
			calc.hasdot = false;
			document.getElementById("output").innerHTML = "0.";
		}
		// if display.length is == 0, and math button pressed, we want to change the operation
		else {
			if (calc.prob.length > 0) {
				calc.prob[1] = btn;
				document.getElementById("smoutput").innerHTML = (document.getElementById("smoutput").innerHTML.slice(0,-2) + btn + " ").slice(-1 * calc.maxsmchars);
			}
		}
	}
}

function NEEDSCINOT(n,wo) {
	// account for both scinot and truncation in one function
	// wo will either be 'smoutput' or 'output' depending on the element requesting

	// Small output
	if (wo == "smoutput") {
		if (Math.abs(n) > 99999999 || Math.abs(n) < 0.0000001) {
			return n.toExponential(2).toString().replace("e","E");
		}
		else {
			if (n.toString().length < 9) {return n;}
			else {return n.toString().slice(0,10) + "...";}
		}
	}
	// Large output
	else {
		if (Math.abs(n) > 9999999999 || Math.abs(n) < 0.000000001) {
			return n.toExponential(2).toString().replace("e","E");
		}
		else {
			if (n.toString().length < 11) {return n;}
			else {return n.toString().slice(0,12) + "...";}
		}
	}
}

function SOLVE(arr) {
	if (/[+]/.test(arr[1])) {return arr[0] + arr[2];}
	else if (/[-]/.test(arr[1])) {return arr[0] - arr[2];}
	else if (/[*]/.test(arr[1])) {return arr[0] * arr[2];}
	else if (/[/]/.test(arr[1])) {return arr[0] / arr[2];}
}

function SIMPLIFY(n) {
	var nstr = n.toString();
	var valid0 = false;	 // bools that will control whether or not this block is ran
	var valid9 = false;
	if (nstr.includes(".")) {
		let i = nstr.indexOf(".");
		// 1.2000000000000002
		// 5.999999999999999
		// (1.2000000000000002).toString().match(/0*/g)[MAX((1.2000000000000002).toString().match(/0*/g))].length
		// q0 represents the length of longest stretch of zeroes found in the answer
		if (nstr.match(/0+/g) != null) {
			var a0 = nstr.match(/0+/g);
			valid0 = true;
		}
		if (nstr.match(/9+/g) != null) {
			var a9 = nstr.match(/9+/g);
			valid9 = true;
		}
		//console.log(valid0, valid9);
		if (valid0 == true && valid9 == true) {
			if (a0[MAXindex(a0)].length >= a9[MAXindex(a9)].length) {var qstr = a0;}
			else {var qstr = a9;}
		}
		else if (valid0 == true && valid9 == false) {
			var qstr = a0;
		}
		else if (valid9 == true && valid0 == false) {
			var qstr = a9;
		}
		else {return n}
		// 0.19999999954
		// di = 1; mi = 3;
		// 12.46000000001
		// di = 2; mi = 5;  mi-di-2
		// 105.72900000001
		// di = 3; mi = 7
		var mstr = qstr[MAXindex(qstr)];
		var mi = nstr.search(mstr);
		var di = nstr.indexOf(".");
		//console.log(mstr,mi,di,mi-3);
		if (mstr.length >= 6 && mi > di) {
			// 1.25830000002
			if (qstr == a0) {return parseFloat(nstr.slice(0,mi));}
			else {return ROUND(parseFloat(nstr.slice(0,mi+1)),mi-di-1);}
		}
		else {return n}
	}
	else {return n}
}

function MAXindex(arr) {
	mindex = 0;
	//console.log(arr);
	for (x=0; x < arr.length; x++) {
		if (typeof arr[x] == "string") {
			if (arr[x].length > arr[mindex].length) {mindex = x;}
		}
		else {
			if (arr[x].toString().length > arr[mindex].toString().length) {mindex = x;}
		}

	}
	return mindex;
}

function equals() {
	if (calc.hasequals == false) {
		// If the display and calc.prob ARE NOT empty...
		if (calc.display != "" && calc.prob.length > 0) {
			calc.hasequals = true;
			calc.prob.push(parseFloat(calc.display));
			document.getElementById("smoutput").innerHTML = (document.getElementById("smoutput").innerHTML + ` ${(calc.display[0] != "-") ? NEEDSCINOT(parseFloat(calc.display),"smoutput") : "(" + NEEDSCINOT(parseFloat(calc.display),"smoutput") + ")"} = `).slice(-1 * calc.maxsmchars);
			if (document.getElementById("smoutput").innerHTML.length >= calc.maxsmchars-6) {
				document.getElementById("smoutput").innerHTML = "..." + document.getElementById("smoutput").innerHTML;
			}
			let answer = SIMPLIFY(SOLVE(calc.prob));
			document.getElementById("output").innerHTML = `${NEEDSCINOT(answer,"output")}`; 
		}
	}
}

var tempval="",resultant=0,res_so_display="",decimalpressed=!1,op_pressed=!1,op_divide=!1,op_last="",smallprob="",eqlastbutton=!1,clrlastbutton=!0,lo=document.getElementById("largeoutput"),so=document.getElementById("smalloutput"),numarray=[];function chgbg(e){document.getElementById("bod").style.backgroundColor=e,document.getElementById("bod").style.color="#333333"==e?"white":"black"}function chglook(e){document.getElementById("class_name").href="calc/"+e+".css"}function numpress(e){"."==e&&1==decimalpressed||"0"==tempval&&"."!=e||1==op_divide&&"0"==e&&0==tempval.length||tempval.length>=13||(1==eqlastbutton&&(so.innerHTML=""),"+/-"==e?"-"==tempval[0]?(tempval=tempval.slice(1),lo.innerHTML=tempval):(tempval="-"+tempval,lo.innerHTML=tempval):("."==e&&(decimalpressed=!0),tempval+=e,lo.innerHTML=tempval,op_pressed=!1),eqlastbutton=!1),1==clrlastbutton&&(so.innerHTML=""),clrlastbutton=!1}function operator_press(op){1==op_pressed||""==tempval||"."==tempval[0]&&1==tempval.length||("/"==op&&(op_divide=!0),0==numarray.length?(numarray[0]=tempval,tempval.indexOf(".")>=0&&tempval.length-tempval.indexOf(".")>4?eval(tempval)<.001&&eval(tempval)>0||eval(tempval)<0&&eval(tempval)>-.001?so.innerHTML+=eval(tempval).toExponential(3).toString().replace("e"," * 10^").replace("+","")+" "+op+" ":so.innerHTML+=tempval.substr(0,tempval.indexOf(".")+4)+"... "+op+" ":eval(tempval)>=1e6?so.innerHTML+=eval(tempval).toExponential(3).toString().replace("e"," * 10^").replace("+","")+" "+op+" ":so.innerHTML+=tempval+" "+op+" ",lo.innerHTML="0."):(resultant=eval(numarray[0]+oplast+"("+tempval+")"),resultant.toString().length>=13?lo.innerHTML=resultant.toExponential(4).toString().replace("e"," * 10^").replace("+",""):lo.innerHTML=resultant,res_so_display=lo.innerHTML,"-"==tempval[0]&&(tempval="("+tempval+")"),tempval.indexOf(".")>=0&&tempval.length-tempval.indexOf(".")>4?eval(tempval)<.001&&eval(tempval)>0||eval(tempval)<0&&eval(tempval)>-.001?so.innerHTML=so.innerHTML+eval(tempval).toExponential(3).toString().replace("e"," * 10^").replace("+","")+" ::: ":so.innerHTML=so.innerHTML+tempval.substr(0,tempval.indexOf(".")+4)+"... ::: ":so.innerHTML=tempval>1e6?so.innerHTML+eval(tempval).toExponential(3).toString().replace("e"," * 10^").replace("+","")+" ::: ":so.innerHTML+tempval+" ::: ",so.innerHTML+=res_so_display+op,numarray[0]=resultant),op_pressed=!0,tempval="",decimalpressed=!1,oplast=op,so.innerHTML.length>=53&&(so.innerHTML="..."+so.innerHTML.substr(so.innerHTML.length-51,so.innerHTML.length)))}function clear_press(e){"C"==e?reset():1==eqlastbutton||(tempval="",lo.innerHTML="0.")}function reset(){tempval="",resultant=0,decimalpressed=!1,op_pressed=!1,op_divide=!1,op_last="",smallprob="",so.innerHTML="CLEAR",clrlastbutton=!0,eqlastbutton=!1,lo.innerHTML="0.",res_so_display="",numarray=[]}function equals_press(EQUALS){1==eqlastbutton||0==numarray.length||(resultant=eval(numarray[0]+oplast+"("+tempval+")"),resultant>=1e13?lo.innerHTML=resultant.toExponential(4).toString().replace("e"," * 10^").replace("+",""):resultant.toString().length>=13?(resultant=resultant>1e10?resultant.toExponential(4).toString().replace("e"," * 10^").replace("+",""):resultant.toString().substr(0,12)+"...",lo.innerHTML=resultant):lo.innerHTML=resultant,tempval.indexOf(".")>=0&&tempval.length-tempval.indexOf(".")>4?eval(tempval)<.001&&eval(tempval)>0||eval(tempval)<0&&eval(tempval)>-.001?so.innerHTML=so.innerHTML+eval(tempval).toExponential(3).toString().replace("e"," * 10^").replace("+","")+" = ":so.innerHTML=so.innerHTML+tempval.substr(0,tempval.indexOf(".")+4)+"... = ":eval(tempval)>=1e6?so.innerHTML=so.innerHTML+eval(tempval).toExponential(3).toString().replace("e"," * 10^").replace("+","")+" = ":so.innerHTML=so.innerHTML+tempval+" = ",eqlastbutton=!0,tempval="",resultant=0,numarray=[])}