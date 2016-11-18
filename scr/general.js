// DOM-ready code

$(function() {	
	soon();																// 'Soon'-Dialog
	activeLnkMenu();													// active style of a menu link
	activeLnk('sidebar');												// active style of a sidebar link
	lnkJump($('html, body'),800);										// link jump scroll animation

	loadAPI(0,'swIMG/swimg.htm');										// loads content of the clicked API
	loadDoc(0,'swIMG/swimg_doc.htm');									// loads docs of an API
	loadDoc(1,'swIMG/swimg_clog.htm');
	loadDoc(2,'swIMG/swimg_dls.htm');
	loadDoc(3,'swIMG/swimg_demo.htm');
	loadDoc(4,'swIMG/swimg_lic.htm');

	stay();																// prevents scrolling to the top
	toggleCode();														// toggle code preview
});