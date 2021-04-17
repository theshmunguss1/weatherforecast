var footer = document.getElementById("footer");
	let _vis = "hidden";

let links = [

	{"tag": "a", "label": "HOME",
	 "attr": {"href": "index.html"}},
	{"tag": "a", "label": "iR&#233;sume",
	"attr": {"href": "iresume/iresume.html"}},
	{"tag": "a", "label": "Digital Portfolio",
	"attr": {"href": "iresume/digiport.html"}},
	{"tag": "a", "label": "Contact (GitHub Login Required)",
	"attr": {"href": "https://github.com/ksgwxfan/ksgwxfan.github.io/issues"}},
	{"tag": "span", "label": "<u>Contact (email)</u>",
	"attr": {"title": "Click to reveal email",
			    "id": "c_email",
		   "onClick": "toggle_email()"}},
	{"tag": "a", "label": "Echo Tops Weather Blog",
	"attr": {"href": "http://echotops.blogspot.com/"}}
];

function createLink(tag, label, attrs, last=false) {
	element = document.createElement(tag);
	element.innerHTML = label
	for (attr in attrs) {
		element.setAttribute(attr, attrs[attr])
	};
	footer.appendChild(element);
	if (last == false) {
		footer.innerHTML += "<span> &bull; </span>";
	}
}

// Build Links
for (i=0; i<links.length; i++) {
	createLink(
		links[i].tag,
		links[i].label,
		links[i].attr,
		(i == links.length - 1) ? true : false
	);
}

function toggle_email() {

	let pre1 = "Kyle";
	let pre3 = "Gentry";
	let pre2 = "S";
	let pre5 = ".com";
	let pre4 = "@outlook";
	let emailid = document.getElementById("c_email");

	if (_vis == "hidden") {
		_vis = "show";
		emailid.innerHTML = `<a href="mailto:${pre1+pre2+pre3+pre4+pre5}">${pre1+pre2+pre3+pre4+pre5}</a>`;
		emailid.title = "";
		//emailid.style.userSelect = "visible";
	}
}