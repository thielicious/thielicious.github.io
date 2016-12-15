// DOM-ready code

function AiO(api,list,doc,sb,docs) {									
	loadAPI(list,doc,api+'/'+api.toLowerCase()+'.htm');					// loads content of the clicked API
	loadDoc(sb,api,docs);												// loads docs of an API
	loadHash('#'+api.toLowerCase(),list,'ul.api li a');					// loads hash link
}

$(function() {
	soon();																// 'Soon'-Dialog
	activeLnkMenu();													// active style of a menu link
	activeLnk('sidebar');												// active style of a sidebar link
	lnkJump($('html, body'),800);										// link jump scroll animation
	
	stay();																// prevents scrolling to the top
	toggleCode();														// toggle code preview
	
	AiO('swIMG',0,0,0,['doc','clog','dls','demo','lic']);
	AiO('unPOSTer',2,5,21,['doc','dls','lic']);
	AiO('Dynamizer',3,3,13,['doc','clog','dls','demo','lic']);
	AiO('eMM',5,2,8,['doc','clog','dls','demo','lic']);
	AiO('aLocal',6,1,5,['doc','dls','lic']);
	AiO('aLoad',7,4,18,['doc','dls','lic']);
});