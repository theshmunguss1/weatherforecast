let pg_header = document.getElementById("header");

// <img id="headerphoto" src="profile_small.png" alt="Profile Image - Small">

let pg_title = pg_header.innerText;
// console.log(pg_title);

pg_header.innerHTML = [
	'<a href="index.html" title="Home">',
	[
		'<img id="headerphoto"',
		'src="profile_small.png"',
		'alt="Profile Image - Small">'
	].join(" "),
	'</img>',
	'</a>',
	'<span id="title">',
	pg_title,
	'</span>'
].join("");