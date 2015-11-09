!function () {
	
	'use strict';

	$(document).ready(function() {
		var scrollUp = $('#scrollUp');

		bindClickEvents();

		if(typeof scrollUp != 'undefined' && scrollUp != null) {

			// Show to top button
			$(window).scroll(function () {
				if ($(window).scrollTop() >= 200) {
					scrollUp.addClass('visible');
				} else {
					scrollUp.removeClass('visible');
				}
			});

		}

		if($('body').hasClass('index')) {

		}

		$('.post article p img').on('click', function (e) {
			var copy = $(e.target).clone();
			copy.attr('id', 'fullscreen_image');
			$('body').append(copy);


			copy.on('load', function(e) {
				var jso = new jsOverlay({
					content: 'fullscreen_image',
					usePushState: false
				});
			});

		});
	});

	function bindClickEvents() {
		$('#toggle-menu').on('click', onToggleMenuClick);
		$('#scrollUp').on('click', onScrollUpClick);
		$('#navigation > a').on('click', onNavigationScrollClick);
	}

	function onToggleMenuClick(e) {
		e.preventDefault();

		var $self = $(e.target);

		if(!$self.attr('id') == ('toggle-menu')) {
			$self = $('#toggle-menu');
		}

		if($self.hasClass('open')) {
			$self.removeClass('open');
		} else {
			$self.addClass('open');
		}
	}

	function onScrollUpClick(e) {
		e.preventDefault();
		$('html, body').animate({scrollTop: 0}, 1000);
	}

	function onNavigationScrollClick(e) {
		e.preventDefault();

		var href = $(e.target).attr('href').split('#')[1];

		$('html, body').animate( {
				scrollTop: $('#' + href).offset().top},
			800
		);
	}
}();