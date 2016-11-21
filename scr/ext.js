// Extern Functions


// replaces the opening HTML tags with &lt;
function unTag() {													
	this.code = null;
	this.get =()=> {												// returns unTag'ed code
		if (this.code != null) {
			return this.code.replace('<','&lt;');
		}
	}
	unTag.prototype.set =(code)=> {									// receive code
		this.code = code;
	}
	unTag.prototype.insert =(where)=> {								// places the unTag'ed code in a desired HTML element
		let loc = document.getElementsByTagName(where)[0];
		loc.outerHTML = this.get();
	}
}
/*
Ex:
	var code = new unTag();
	code.set('test');
	code.insert('code');
*/


// generates links to be loaded with ajax
function LnkGen(sel) {
	var selector = sel;												// sets a selector
	this.cont;
	this.path;
	this.idx;
	LnkGen.prototype.setContent =(cont)=> {							// sets content element to be loaded
		this.cont = cont;
	}
	LnkGen.prototype.setPath =(path)=> {							// sets path to the links
		this.path = path;
	}
	LnkGen.prototype.getTo =(num,lnk)=> {							// loads the linked file 
		let path = this.path,
			cont = this.cont;
		selector.on('click',function() {
			this.idx = selector.index($(this));
			if (this.idx == num) {
				return cont.load(path+lnk);
			}
		}); 
	}
}
/*
Ex:
	var demos = new LnkGen($('.topics li a'));
	demos.setContent($('section.content'));
	demos.setPath('apis/swIMG/demos/');
	demos.getTo(0,'swimg_demo_img.htm');
*/


// link jump 
function lnkJump(where, spd) {
	$('a[href*="#"]:not([href="#"])').click(function() {			
		let target = $(this.hash);
		where.animate({
			scrollTop: target.offset().top
		}, spd);
	});
}


// get HTM page
function getPage() {
	let goto = window.location.href;
	return(
		goto.substring(
			goto.lastIndexOf("/")+1
		)
	);
}


// active link main menu
function activeLnkMenu() {
	let gP = function(find) {
		return getPage().match(find);
	};
	let act = function(find) {
		let rep = find.replace("/","",gP(find));
		if (gP(find)) {										
			$('.menuitem a').removeClass('activemenu');
			$('.menuitem a[href="'+rep+'"]').addClass('activemenu');
		}
	};
	act('index.html');
}


// active link sidebar
function activeLnk(where) {
	$.fn.active = function() { $(this).addClass('active'); }
	$.fn.inactive = function() { $(this).removeClass('active'); }
	if (where == 'sidebar') {
		$('.sidemenu a:not(.soon)').on('click',function() {
			$('.sidemenu a').inactive();
			$(this).active();
		});
	} 
	if (where == 'ov') {
		$('.ov').on('click',function() {
			let idx = $('.ov').index($(this)),
				eq = $('ul.docs li a:eq('+idx+')');
			$('.sidemenu a').inactive();
			eq.active();
		});
	}
}


// dynamic ajax text link
function TxtLnk(cont, path) {
	this.cont = $(cont);
	this.path = path;
	this.pg = [];
	TxtLnk.prototype.click = (pg) => {
		let cont = this.cont,
			path = this.path,
			arr = this.pg;
		pg.forEach(k => {
			arr.push(k);
		});
		arr.forEach(k => {
			return $('.'+k)
				.attr('onClick', "javascript: return true;")
				.on('click', () => {
					cont.load(path+k+'.htm');
				});
		});
	}
}


// store client-sided data
function store() {
	store.prototype.set = function(key, val) {
		sessionStorage[key] = val;
	}
	store.prototype.get = function(key) {
		sessionStorage[key];
	}
}

// hash trigger
function loadHash(rgx, el) {
	var hash = window.location.hash,
		rgx = new RegExp(rgx,'i');
	if (hash.match(rgx)) {
		$(el).trigger('click');
	}
}


// ajax api loader
function loadAPI(eq, api) {
	$('ul.api li a').on('click',function() {
		let act = $('ul.api li a').index($(this));
			docs = $('ul.docs:eq('+eq+')');
		if (act == eq) {
			$('section.content').load('apis/'+api);
			$('h2.sb-topic').show();
			docs
				.css('opacity','0')
				.show()
				.animate({
					opacity: '1'
				},800);
		}
	});
}


// ajax doc loader
function loadDoc(idx, doc) {
	$('ul.docs li a').on('click',function() {
		let act = $('ul.docs li a').index($(this));
		if (act == idx) {
			$('section.content').load('apis/'+doc);
		}
	});
}


// dialog box 'Soon'
function soon() {
	$('body').prepend('<div id="soon"><h2>Coming Soon.</h2></div>');
	let soon = $('#soon');
	soon.css({													
		'width'	 	 : '140px',
		'height' 	 : '50px',
		'background' : '#033',
		'color'		 : 'white',
		'display'	 : 'none',
		'position'	 : 'fixed',
		'top'		 : '50%',
		'left'		 : '50%',
		'margin-left': '-70px',
		'margin-top' : '-25px',
		'z-index'	 : '10',
		'text-align' : 'center',
		'cursor'	 : 'pointer',
		'line-height': '50px'
	}),
	$('.soon')
		.attr('onClick', "javascript: return false;")
		.click(function() {
			soon.show();
			$('main').css('opacity','0.3');
			let dialog = function() {
				soon.hide();
				$('main').css('opacity','1');
				clearInterval(timer);
			},
			timer = setInterval(dialog,2000);
			soon.click(function() {
				dialog();
			});
		});
}


// load extern javascript function
var extern = function(url) {
	let func = $.extend({}, {
		dataType: 'script',
		cache: true,
		url: url 
	});
	return $.ajax(func);
};
function ext(script) {												// prototype filename
	this.script = script;
	ext.prototype.do = function(func) {
		return extern(this.script).done(func);
	}
}
/*
Ex:
	var ext = new ext('scr/ext.js');
	ext.do(()=> debugResponder());
*/


// debug test for callbacks
function debugResponder() {	
	return alert('1');
}


// toggle code
function toggleCode() {
	$('.vcode').click(function() {
		$('.toggleCode').toggle(300);
	});
}


// prevents scrolling to top
function stay() {
	$('a[href="#"]').attr('onClick', "javascript: return false;");
}
