function getPage() {													// get HTM page
	var goto = window.location.href;
	return(
		goto.substring(
			goto.lastIndexOf("?")+1
		)
	);
}

$(function() {
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
	
	$('a[href*="#"]:not([href="#"])').click(function() {				// link jump 
		var target = $(this.hash);
		$('html, body').animate({
			scrollTop: target.offset().top
		}, 800);
	});
	
	$('.vcode').click(()=> {											// toggle code
		$('.toggleCode').toggle(300);
	});
	
	(activeLink=()=> { 													// active link
		$.fn.active = function() {										// add class
			return $(this).addClass('active');
		};
		var lnk =(sel,goto)=> {											// select link element
				var a = sel+' a[href="?'+goto;
				if (sel == 'nav.sidemenu' || 'li.menuitem') {
					return $(a+'"]');
				}
			},
			gPage =(find)=> {											// return page if found
				return getPage().match(find);
			};
		if (gPage(/swimg_demo/g)) {										// swimg demos
			lnk('nav.sidemenu','goto=swimg_demo_img').active();
		} else if (gPage(/home|apis|dls|demos|ctc/g)) { 				// main navi
			lnk('li.menuitem',getPage()).addClass('activemenu');
		} else {														// others
			lnk('nav.sidemenu',getPage()).active();
		}
	})();
	
	(activeColumn =()=> {												// shows active column
		if (getPage().match(/swimg/g)) {
			$('h2.sb-topic, ul.docs').show();
		}
	})();
	
});