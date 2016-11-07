function extern(url,opt) {
	opt = $.extend(opt || {}, {
		dataType: "script",
		cache: true,
		url: url
	});
	return $.ajax(opt);
}


function getPage() {													// get HTM page
	var goto = window.location.href;
	return(
		goto.substring(
			goto.lastIndexOf("/")+1
		)
	);
}


function activeLnk() {													// active link menu
	var gP = function(find) {
		return getPage().match(find);
	};
	var act = function(find) {
		var rep = find.replace("/","",gP(find));
		if (gP(find)) {										
			$('.menuitem a').removeClass('activemenu');
			$('.menuitem a[href="'+rep+'"]').addClass('activemenu');
		}
	};
	act('index.html');
}


function loadAPI(eq,api) {
	$('ul.api li a').on('click',function() {							// load api
		var act = $('ul.api li a').index($(this));
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


function loadDoc(idx,doc) {
	$('ul.docs li a').on('click',function() {							// load docs
		var act = $('ul.docs li a').index($(this));
		if (act == idx) {
			$('section.content').load('apis/'+doc);
		}
	});
}


function soon() {
	$('body').prepend('<div id="soon"><h2>Coming Soon.</h2></div>');	// append soon dialog box
	var soon = $('#soon');
	soon.css({															// css settings
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
	$('.soon')															// triggers links with class '.soon'
		.attr('onClick', "javascript: return false;")
		.click(function() {
			soon.show();
			$('main').css('opacity','0.3');
			var dialog = function() {
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
$(function() {	
	
	// calls
	soon();
	activeLnk();
	loadAPI(0,'swIMG/swimg.htm');
	loadDoc(0,'swIMG/swimg_doc.htm');
	loadDoc(1,'swIMG/swimg_clog.htm');
	loadDoc(2,'swIMG/swimg_dls.htm');
	loadDoc(3,'swIMG/swimg_demo.htm');
	loadDoc(4,'swIMG/swimg_lic.htm');
	extern("scr/ext.js").done(function(script,textStatus) {
		lnkJump($('html, body'),800);
	});

	
	$('a[href="#"]').attr('onClick', "javascript: return false;");		// prevent scrolling to top
	
	
	$('.sidemenu a:not(.soon)').on('click',function() {					// active link sidebar
		$('.sidemenu a').removeClass('active');
		$(this).addClass('active');
	});
});