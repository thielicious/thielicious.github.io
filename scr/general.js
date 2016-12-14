// DOM-ready code

$(function() {
	soon();																// 'Soon'-Dialog
	activeLnkMenu();													// active style of a menu link
	activeLnk('sidebar');												// active style of a sidebar link
	lnkJump($('html, body'),800);										// link jump scroll animation
	
	loadAPI(0,0,'swIMG/swimg.htm');										// loads content of the clicked API
	loadDoc(0,'swIMG',['doc','clog','dls','demo','lic']);				// loads docs of an API
	
	loadAPI(5,2,'eMM/emm.htm');
	loadDoc(8,'eMM',['doc','clog','dls','demo','lic']);	
	
	loadAPI(6,1,'aLocal/alocal.htm');
	loadDoc(5,'aLocal',['doc','dls','lic']);

	stay();																// prevents scrolling to the top
	toggleCode();														// toggle code preview

	loadHash('#swimg',0,'ul.api li a');									// loads hash link
	loadHash('#emm',5,'ul.api li a');
	loadHash('#alocal',6,'ul.api li a');
});