!function () {
	
	'use strict';
	
	window.addEvent('domready', function () {
	
		var scroll, scrollUp = document.id('scrollUp'), bodyTween;

		if(typeof scrollUp != 'undefined' && scrollUp != null) {
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
		}
		
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