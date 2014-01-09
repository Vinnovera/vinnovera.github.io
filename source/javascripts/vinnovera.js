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
		
		document.body.addEvent('click:relay(nav > a)', function (e) {
			e.stop();
			
			var hash = this.hash.substr(1),
			    top  = document.id(hash).getPosition().y;
			
			bodyTween.start(0, top);
		});
		
	});
	
}();