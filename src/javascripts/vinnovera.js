!function () {
	
	'use strict';
	
	window.addEvent('domready', function () {
	
		var scroll, scrollUp = document.id('scrollUp'), bodyTween;
		
		// Body animation
		bodyTween = new Fx.Scroll(window);
		
		// Show to top button
		window.addEvent('scroll', function (e) {
			scroll = document.documentElement.scrollTop || document.body.scrollTop;
			if (scroll > 200) {
				scrollUp.addClass('visible');
			} else {
				scrollUp.removeClass('visible');
			}
		});
		
		// Scroll to top
		scrollUp.addEvent('click', function (e) {
			e.stop();
			
			bodyTween.start(0, 0);
		});
		
		document.body.addEvent('click:relay(.startpage > a)', function (e) {
			e.stop();
			
			var hash = this.hash.substr(1),
				top  = document.id(hash).getPosition().y;
			
			bodyTween.start(0, top);
		});
		
		document.body.addEvent('click:relay(#toggle-menu)', function (e) {
			e.stop();
			
			var open = this.hasClass('open');
			
			if(open) {
				this.removeClass('open');
			} else {
				this.addClass('open');
			}
		});
		
		if(document.body.hasClass('index')) {
			var fxScroll = new Fx.Scroll($(document.body), {
				wait: false,
				duration: 800,
				offset: {'x': 0, 'y': 0},
				transition: Fx.Transitions.Quad.easeInOut
			});
			
			document.body.addEvent('click:relay(#navigation > a)', function (e) {
				e.stop();

				var href = this.getAttribute('href').split('#')[1];
				fxScroll.toElement(href);
			});
		}

		document.body.addEvent('click:relay(.post article p img)', function (e) {
			
			var copy = this.clone();
			copy.set('id', 'fullscreen_image');
			copy.inject(document.body);

			copy.addEvent('load', function(e) {
				var jso = new jsOverlay({
					content: 'fullscreen_image',
					usePushState: false
				});
			});
			
		});

	});
	
}();

(function($,sr){

  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100);
      };
  }
  // smartresize 
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');


jQuery(document).ready(function($) {

			var the_content = $('.bildspel-wrapper').html(),
				sliderBreak = 3020;
			
			$(window).bind("mousewheel", function() {
    			$("html, body").stop();
			});

			function initSlider(){
			   var slider;
	           var viewportWidth = $(window).width();

	            if (viewportWidth < sliderBreak) {
	            	if (typeof slider !== 'undefined') {
					    slider.destroy();
					}

					slider = 0;
	            	
	            	$('.bildspel-wrapper').html(the_content);
	            	
	            	$('.bildspel-wrapper').addClass('visible');
	            	$('#bildspel .start').wrap('<div class="list" />');
	            	$('#bildspel > div:not(.list)').wrapAll('<div class="detail" />');
	            	$('#bildspel figure').removeClass('rsCaption');
	            	$('#bildspel').addClass('list-active');

	            	$('.people .background-image').removeClass('hide');

	            	function setNavItems(parent,item,link,firstOffset,secondOffset){
	            		
	            		var elements = $(parent).children( "div" );
			            
			            elements.each(function(index){
			              	
			              	var element = $(this).find( item ),
			              		links = element.find(link),
			              		activeClass = $(this).attr('class').split(' ')[0] + '-active',
			              		inActiveClass,
			              		order = index,
			              		block,
			              		targetOffset,
			              		theLink,
			              		offset;
				            
				            element.each(function(index){

				            	if (links.length < element.length) {
				            		theLink = $(this);
				            	}else{
				            		theLink = $(this).find(link);
				            	}
				              
				              theLink.on('click',function(){
								
								if (order % 2 == 0) {
									offset = firstOffset;
									block = elements.eq(1).find(item).eq(index);
									inActiveClass = elements.eq(1).attr('class').split(' ')[0] + '-active';
								}else{
									offset = secondOffset;
									if (viewportWidth > 750) {
										//block = elements.eq(0).find(item).eq(0);
										block = $('.bildspel-wrapper');
									}else{
										block = elements.eq(0).find(item).eq(index);
									}
									
									inActiveClass = elements.eq(0).attr('class').split(' ')[0] + '-active';
								}
								
								
								$(parent).toggleClass(activeClass);
								$(parent).toggleClass(inActiveClass);
								
								targetOffset = block.offset();

				              	$('html, body').scrollTop(targetOffset.top + offset);
				              	$('html, body').delay(300).animate({scrollTop: targetOffset.top}, 100);

								});

							});
						});
	            	}

	            	setNavItems('#bildspel','.rsItem','.rsItem-link',-100, +150);

	            } else {

	            $('.bildspel-wrapper').removeClass('visible');

	            $('#bildspel > .list > div, #bildspel > .detail > div').unwrap();
	            $('#bildspel figure').addClass('rsCaption');

	            $('.people .background-image').addClass('hide');

	            $('#bildspel').royalSlider({
	              addActiveClass: true,
	              loop: true,
	              autoScaleSlider: false,
	              autoHeight: true,
	              arrowsNav: false,
	              arrowsNavAutoHide: false,
	              controlsInside: false,
	              controlNavigation: 'none', 
	              transitionSpeed: 300,
	              imgWidth:220,
	              imgHeight: 220,
	              usePreloader: false,
	              imageScalePadding: 2,
	              globalCaption: true,
	              keyboardNavEnabled: true,
	              globalCaptionInside: false,
	              numImagesToPreload: 20,
	              fadeinLoadedSlide: true,
	              navigateByClick: true,

	              visibleNearby: {
	                enabled: true,
	                centerArea: 0.12,
	                center: true,
	                breakpoint: 1100,
	                breakpointCenterArea: 0.2,
	                navigateByCenterClick: true
	              }
	            });

	            slider = $("#bildspel").data('royalSlider');

	            if(slider.slides.length > 0) {
	              slider.updateSliderSize();
	              
	             
	              $('.bildspel-wrapper').addClass('visible');

	              var els = $('.humansCaption article'),
	              	  controls = $('.slide-controls i');

	             controls.each(function(){

	              $(this).on('click',function(){

	              	if ($(this).is('.next')) {
	              		slider.next();
	              	}

	              	if ($(this).is('.prev')) {
	              		slider.prev();
	              	}

	              	if ($(this).is('.home')) {
	              		slider.goTo(0);
	              	}

	              });

	          	 });


	              slider.ev.on('rsBeforeMove rsAfterSlideChange', function(event, type) {
				  controls.each(function(){


				  	$(this).removeClass('active');

	              	if (type == 'next' && $(this).is('.next')) {
	              		$(this).addClass('active');
	              	}
	              	
	              	if (type == 'prev' && $(this).is('.prev')) {
	              		$(this).addClass('active');
	              	}

	              	if (type == 0 && $(this).is('.home')) {
	              		$(this).addClass('active');
	              	}



					});


	              });

	              slider.ev.on('rsAfterContentSet rsAfterSlideChange', function(event) {
	              
	              if (event.type == 'rsAfterSlideChange') {
	              	$('body,html').animate({scrollTop: $('#bildspel').offset().top}, 200);
	              }

	              els.each(function(index){
	              		$(this).on('click', function(){
	              			slider.goTo(index+1);
	              		});
	              });

	              

	              $('.rsCaption>i').on('click', function(){
	              			slider.goTo(0);
	              });

				  });

				  slider.ev.on('rsAfterContentSet rsBeforeAnimStart', function(event) {

	              if (slider.currSlideId == 0) {
	              	$('.bildspel-wrapper').addClass('start');
	              }else{
	              	$('.bildspel-wrapper').removeClass('start');
	              }
				  });


	            }
	         }

	}

	initSlider();

	//Issue with resize event when scrolling on detail-active (something with markup)
	/*$(window).smartresize(function(){
	  initSlider();
	},500);*/

});