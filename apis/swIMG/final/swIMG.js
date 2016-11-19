/*
		
		
		swIMG v0.92 (c) 2016 by Michel Thiel 
		----------------------
		m.thiel@claxdesign.com
		www.claxdesign.com 
		
			
			Built with the newest JavaScript 1.8.5(ES5, issued on January 20th 2016)
			Free Licence: This code is free to use.
			
			swImg ('sw': abbr. for 'switch') is a fullsize image viewer for a triggered 
			thumbnail gallery. It extracts the URLs and shows them in fullsize. Use the 
			left and right arrow keys to switch images. 
			
			The following libraries are necessary in order to run swIMG:
			- JQuery v1.8+
			- jgestures.js v0.90.1
			
			Open README.txt to follow instructions. Feel free to change configuration. 
			Altering program code is up to your own risk.
			
			
		Version History:
			v0.92		improved interface design, direct configuration added
			v0.91		mobile compatibility improved, available with jgesture.js
			v0.9		added Background-Image extraction
			v0.5		first creation with image source extraction
			
			
		_________________________________________________________________________________
*/
		
		
			
	swIMG = function(cfg = null) {	
	
		window.onload = function() {
			
			// ---------- Configuration ----------
			
			chkcfg = function(prop, defaultVal) {
				if (cfg != null) {
					if(cfg[prop] != null) {
						return cfg[prop];
					} 
					else if (cfg[prop] == null) {
						return defaultVal;
					} else {
						alert('[!]Error:\n Unknown parameter');
					}
				} else {
					return defaultVal;
				}
			};
			
				
			var cfg_default = {
				
				method	 	: chkcfg('method', 'small'),				/* display methods for images in the gallery
																			> choose 'small' if you want to display the image source from the thumbnails	
																			> choose 'large' if you would like to display bigger images from a given path */
				
				imagePath	: chkcfg('imagePath', null),				// when method is set to 'large' define this path to your image folder
				parent	 	: chkcfg('parent', '.swIMG'),				// parent class element (container) which wraps all thumbnails
				thumbs	 	: chkcfg('thumbs', '.sw_image'),			// class element for the thumbnails
				count 	 	: chkcfg('count', 'auto'),					/* if set to 'auto' all thumbnails inside the parent class will be applied
																			> choose a number to apply only a specified amount */
																									   
				mobile	 	: chkcfg('mobile', '640px'),				// width for mobile devices which triggers the 'maxSize' (see below)
				
				maxSize	 	: chkcfg('maxSize', '100%'),				// maximum size of images in fullsize for mobile devices
				minSize	 	: chkcfg('minSize', '80%'),					// images original size will be set down to 80%(standard) for desktop devices  
				
				
				bgColor	 	: chkcfg('bgColor', '0,0,0'),				// sets the background color in the gallery (R,G,B)
				opacity	 	: chkcfg('opacity', '0.8'),					// sets the transparency for the background (0-1 from transparent to full)
				
				arrowColor		: chkcfg('arrowColor', 'grey'), 		// sets the arrow colors
				arrowColorHover	: chkcfg('arrowColorHover', 'white'),	// same thing for the MouseOver effect
				
				closeColor		: chkcfg('closeColor', 'grey'), 		// sets the color for the close button (x)
				closeColorHover	: chkcfg('closeColorHover', 'white'),	// Same thing for the MouseOver effect
				
				
				increment	: chkcfg('increment', false),				/* only when method is set to 'large', orginal large images can be named into numbers
																		(1.jpg, 2.jpg, 3.jpg) .. etc
																			> choose 'true' in order to increment the number in an array to display numbered images
																			> choose 'false' if you want to use individual names in 'LargeImages' see below */
													   
													   
				// insert your large images
				
				LargeImages : chkcfg('LargeImages', []),				// insert large images if method is set to 'large' and increment 'false'
				
				
				// DO NOT CHANGE THESE TWO BELOW
				
				gallery  	: '.gallery',								// class element of the gallery			   
				fullSize 	: '#fullsize'								// class element of the fullsize image 
			
			};
		
		
			// ---------- Program (change at your own risk) ----------
		
		
			error = function() {																	// throws an error
				this.prefix = '[!] Error\n';
				
				error.prototype.check = function(cls) {
					return alert(
						this.prefix+'Please attach '+cls+' to your DOM element.'
					);
				}
				
				error.prototype.def = function(msg) {	
					return alert(this.prefix+msg);
				}
			}
			
			
			isinDOM = function(find) {																// checks if the gallery(with class elements) is fully implemented
				this.find = find;
				
				if ($(document).find(this.find).length != 0) {
					rgx = [ /Image/g, /Div/g, /Anchor/g ],
					query = document.querySelector(this.find);
						query += this.toString();
						
					return query;
				}
			}
			
			
			addLrg = function() {																	// function to attach large images
				if (cfg_default.method == 'large') {
					
					(function() {
						path = cfg_default.imagePath;
						if (cfg_default.increment == true) {
							
							for (
								i = 1; 
								i < (sw.count + 1); 
								i ++) {
									sw.images.push(
										path+i+'.jpg'
									)
								}		
						} else {
							if (cfg_default.LargeImages.length != 0) {
								cfg_default.LargeImages.forEach(function(image) {
									sw.images.push(path+image);
								});
							} else {
								var err = new error();
								err.def('Large images do not exist.');
							}
						}
					})();
				}
			}
			
			
			fetchBG = function(cls) {
				var img = cls,
					style = (function() {
						if (img.style || img.currentStyle) {
							return getComputedStyle(img, false);
						} else {
							var err = new error();
							err.def('Could not fetch Background-URL.');
						}
					})(),
					bi = style.backgroundImage;
				
				return bi;
			}
			
			
			var sw = {
					
					
				images: [],																			// contains image URLs that have been extracted from the thumbnails
		
				
				count: cfg_default.count != 'auto' ? 												// determines if the thumbnail count is set to 'auto' or has a specified number 										
						cfg_default.count : 												
						$(cfg_default.thumbs).length,
				
					
				addEvent: (function() {																// attaches click events to the thumbnails
					if (isinDOM(cfg_default.thumbs)) {									

						$(cfg_default.thumbs).click(function() { 									// click event for images
							if (query.match(rgx[0])) {	
							
								if (cfg_default.method == 'large') {
									sw.show(
										sw.images[
											$(cfg_default.parent+' '+cfg_default.thumbs).index($(this))
										]
									);	
								} else {
									sw.show(this.src);					
								}
							}
						});

						$(cfg_default.thumbs).click(function() { 									// click event for div elements
							if (query.match(rgx[1])) {		
								
								if (cfg_default.method == 'large') {
									
									sw.show(
										sw.images[
											$(cfg_default.parent+' '+cfg_default.thumbs).index($(this))
										]
									);
									
								} else {
									sw.show(fetchBG(this));				
								}
							}
						});
					}
				})(),

				
				gallery: $(function() {																// creates the gallery layer
					var arrleft = '&#10092;',
						arrright = '&#10093;';
					var larr = '.arrleft',
						rarr = '.arrright';
					
					mobile = function() {															// image size will be adjusted for mobile devices and desktop
						var mobile = window.matchMedia('(max-width: '+cfg_default.mobile+')');
						return ((mobile.matches) ?
							cfg_default.maxSize : cfg_default.minSize
						)
					}
					
					$.fn.reset = function() {														// resets margin and padding values to 0
						this.css({ 
							'margin':'0',
							'padding':'0' 
						}) 
					}
					
					$(document.body).prepend(														// adds the gallery layer to the current DOM
						'<div class="gallery">'+
							'<div class="close">&#215;</div>'+ 
							'<div id="arrows">'+
								'<div class="arrleft">'+
									'&#10092;'+
								'</div>'+
								'<div class="arrright">'+
									'&#10093;'+
								'</div>'+
							'</div>'+
							'<img id="fullsize"/>'+
						'</div>'
					);	
					
					$(cfg_default.gallery).css({													// styles for the gallery
						'position'	 : 'fixed',
						'z-index'	 : '10',
						'background' : 'rgba('+cfg_default.bgColor+','+cfg_default.opacity+')',
						'width'		 : '100%',
						'height'	 : '100%',
						'display'	 : 'none',
						'user-select': 'none'
					}).reset();
					$('.close').css({
						'position'	 : 'fixed',
						'right'		 : '0px',
						'z-index'	 : '5',
						'display' 	 : 'inline',
						'padding'	 : '10px',
						'fontSize'	 : '5vw',
						'color'		 : cfg_default.closeColor,
						'line-height': '0.6',
						'cursor'	 : 'pointer'
					}).mouseenter(function() {
						$(this).css('color',cfg_default.closeColorHover);
					}).mouseleave(function() {
						$(this).css('color',cfg_default.closeColor);
					}).reset();
					$(cfg_default.fullSize).css({													// styles for the fullsize images
						'position'	: 'fixed',
						'z-index'	: '3',
						'min-width'	: 'auto',
						'max-width'	: mobile(),
						'max-height': mobile(),
						'top'		: '50%',
						'left'		: '50%',
						'transform'	: 'translate(-50%,-50%)',
						'-moz-transform'	: 'translate(-50%,-50%)',
						'-webkit-transform'	: 'translate(-50%,-50%)'
					}).reset();
					$('#arrows').css({																// styles for the arrows
						'position'	 : 'fixed',
						'color'		 : cfg_default.arrowColor,
						'width'		 : '100%',
						'top'		 : '50vh',
						'transform'	 : 'translateY(-50%)'
					}).reset();
					$('.arrright').css('float','right');
					$('#arrows div').css({
						'display'	 : 'inline-block',
						'text-align' : 'center',
						'width'		 : '10vw',
						'line-height': '100vh',			
						'font-size'	 : '5vw',
						'cursor'	 : 'pointer'
					}).mouseenter(function() {
						$(this).css({
							'background': 'rgba(0,0,0,0.5',
							'color'		: cfg_default.arrowColorHover
						});
					}).mouseleave(function() {
						$(this).css({
							'background': 'transparent',
							'color'		: cfg_default.arrowColor
						});
					}).reset();
					$(larr).css('float','left');
					$(rarr).css('float','right');
				}),
				
				
				show: function(url) {																// creates the fullsize image in the gallery 
					img = url.replace(/.*\s?url\([\'\"]?/,'').replace(/[\'\"]?\).*/,'');			// and displays the current URL of the image that was clicked
					
					$(cfg_default.fullSize)
						.empty()
						.attr('src',img)
						.reset();
						
					$(cfg_default.gallery)
						.fadeIn('fast')
						.show();
						
					$('.close').click(function() { 
						$(cfg_default.gallery).hide() 
					});
				},
				

				getSrc: function() {																// fetches image URLs from thumbnails
					var err = new error();															// and stores them in array 'images'	
					
					if (isinDOM(cfg_default.parent)) {		
					
						if (isinDOM(cfg_default.thumbs)) {
							
							if (cfg_default.method == 'large') {
								addLrg();
							} else {
							
								for (
									i = 0; 
									i < sw.count; 
									i ++) {
	 
										url = $(cfg_default.thumbs+':eq('+i+')');
										
										if (cfg_default.method == 'small') {
									
											this.images.push(
												
												((query.match(rgx[0])) ?
													url.attr('src') :
													
													((query.match(rgx[1])) ?
														url.css('backgroundImage') :
														url.attr('src')
													)
												)
												
												.replace(/.*\s?url\([\'\"]?/,'')					// URL filter
												.replace(/[\'\"]?\).*/,'')		
											)
										}
									}
							} 
							
						} else {
							err.check(cfg_default.thumbs);
						}
						
					} else {
						err.check(cfg_default.parent);
					}
				
				},
				
				
				index: (function() {																// keeps index number of a clicked thumbnail
					$(function() {
						var getIndex = $(cfg_default.parent+' '+cfg_default.thumbs);	
						
						getIndex.click(function() {
							return num = getIndex.index($(this));
						});
						
						sw.getSrc();
					});
				})(),
				
				
				left: function(Arr) {																// changes image by going left
					if (num == -1) {
						num = 0;
					}
					
					$(cfg_default.fullSize).attr('src',Arr[num]).show();
				},
				
				
				right: function(Arr,current,last) {													// same with right
					if (num == current) {
						num = last;
					}
					
					$(cfg_default.fullSize).attr('src',Arr[num]).show();
				},		
				
				
				keys: $(window).keydown(function(e) { 												// keyboard control for using arrow keys left and right
					if (typeof e.keyCode !== 'undefined') {
						
						if (e.keyCode == 37) {
							num--;
							sw.left(sw.images);
						}
						
						if (e.keyCode == 39) {
							num++;
							sw.right(
								sw.images,sw.count,(sw.count - 1)
							);
						}
					}
				}),
				
				
				arrows: $(function() {																// arrows button control left and right
					$('.arrleft').click(function() {
						num--;
						sw.left(sw.images);
					});
					
					$('.arrright').click(function() {
						num++;
						sw.right(
							sw.images,sw.count,(sw.count - 1)
						);
					});
					
				}),
				
				
				swipe: $(function() {																// mobile swipe control left and right
					var mobile = window.matchMedia('(max-width: '+cfg_default.mobile+')');
					if (mobile.matches) {
						
						$('#arrows').hide();
						var l_arrow = $('.arrleft');
						var r_arrow = $('.arrright'); 
						
						$('img').on('dragstart', function(event) { 
							event.preventDefault(); 
						});	
						$(cfg_default.gallery).on('swipeleft swipeleftup swipeleftdown', function() {
							r_arrow.trigger('click');
						});
						$(cfg_default.gallery).on('swiperight swiperightup swiperightdown', function() {
							l_arrow.trigger('click');
						});
					}
				})
			}
		}
	}