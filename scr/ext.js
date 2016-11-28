// ::::: EXTERN FUNCTIONS


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
	$('a[href*="#"]:not([href="#"]').click(function() {
		if ($(this).hasClass('jump')) {
			var select = '.sidemenu li a',
				getURL = $(this).attr('href').replace('#',''),
				api = getURL.substr(0,getURL.lastIndexOf('_')),
				doc = getURL.substr(getURL.lastIndexOf('_')+1);
			$(select).removeClass('active');
			$('ul.'+api+' li a.'+doc).addClass('active');
		} else {
			let target = $(this.hash);
			where.animate({
				scrollTop: target.offset().top
			}, spd);
		}
	});
}
/*function lnkJump(where, spd) {
	$('a[href*="#"]:not([href="#"])').click(function() {			
		let target = $(this.hash);
		where.animate({
			scrollTop: target.offset().top
		}, spd);
	});
}*/

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
function activeLnk(where, docsid = null) {
	var el = '.sidemenu a';
	$.fn.active = function() { $(this).addClass('active'); }
	$.fn.inactive = function() { $(this).removeClass('active'); }
	if (where == 'sidebar') {
		$(el+':not(.soon)').on('click',function() {
			$(el).inactive();
			$(this).active();
		});
	} 
	if (where == 'ov') {
		$('.ov').on('click',function() {
			let idx = $('.ov').index($(this)),
				eq = $('ul.docs:eq('+docsid+') li a:eq('+idx+')');
			$(el).inactive();
			eq.active();
		});
	}
}

// dynamic ajax text link
function TxtLnk(cont, path) {
	this.cont = $(cont);
	this.path = path;
	TxtLnk.prototype.clk = (api, pg) => {
		let cont = this.cont,
			path = this.path;
		pg.forEach(k => {
			return $('.'+api+'_'+k)
				.attr('onClick', "javascript: return true;")
				.on('click', function() {
					cont.load(path+api+'_'+k+'.htm');
				});
		});
	}
}

// hash trigger
function loadHash(api, i, el, rgx = null) {
	let hash = window.location.hash;
	this.trig = (el, i) => {
		return $(el+':eq('+i+')').trigger('click');
	}
	if (rgx != null) {
		rgx.forEach(k=> {
			chk = new RegExp(api+'_'+k,'i');
			if (hash.match(k)) {
				this.trig(el, i);
			}
			i++;
		});
	} else {
		chk = new RegExp(api,'i');
		if (hash.match(api)) {
			this.trig(el, i);
		}
	}
}

// ajax api loader
function loadAPI(eq, sb, api) {
	let el = 'ul.api li a',
		ul = 'ul.docs',
		h2 = 'h2.sb-api-topic',
		docs_api = $(ul+','+h2);
	$(el).on('click',function() {
		let act = $(el).index($(this)),
			docs = $(ul+':eq('+sb+')');
		if (act == eq) {
			docs_api.hide();
			$('section.content').load('apis/'+api);
			$(h2+':eq('+sb+')').show();
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
function loadDoc(at, api, doc) {
	this.abc = function(idx,doc) {
		let el = 'ul.docs li a';
		$(el).on('click',function() {
			let act = $(el).index($(this));
			if (act == idx) {
				$('section.content').load('apis/'+doc);
			}
		});
	}
	this.def = function(at, api, doc) {
		doc.forEach(k => {
			this.abc(at++,api+'/'+api.toLowerCase()+'_'+k+'.htm');
		});		
	}
	return this.def(at, api, doc);
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