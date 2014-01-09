!function () {
	
	'use strict';
	
	window.addEvent('domready', function () {
	
		var scroll, scrollUp = document.id('scrollUp');
		
		window.addEvent('scroll', function (e) {
			scroll = document.documentElement.scrollTop || document.body.scrollTop;
			
			if (scroll > 200) {
				scrollUp.addClass('visible');
			} else {
				scrollUp.removeClass('visible');
			}
		});
		
	});
	
}();