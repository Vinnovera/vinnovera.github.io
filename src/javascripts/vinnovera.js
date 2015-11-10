!function () {
	
	'use strict';

	$(document).ready(function() {

		bindClickEvents();

		// Show to top button
		$(window).scroll(function () {
			checkIfWindowScrolledShowTarget($('#scrollUp'), 200, 'visible');
		});
	});

	function bindClickEvents() {
		$('#toggle-menu').on('click', onToggleMenuClick);
		$('#scrollUp').on('click', onScrollUpClick);
		$('.post article p img').on('click', openJSOverlayFromArticleImage);

		if($('body').hasClass('index')) {
			$('#navigation > a').on('click', onNavigationScrollClick);
		}
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

	function openJSOverlayFromArticleImage(e) {
		var copy = $(e.target).clone();
		copy.attr('id', 'fullscreen_image');
		$('body').append(copy);
		
		copy.on('load', function(e) {
			var jso = new jsOverlay({
				content: 'fullscreen_image',
				usePushState: false
			});
		});
	}

	function checkIfWindowScrolledShowTarget(target, distance, cssClass) {
		if ($(window).scrollTop() >= distance) {
			target.addClass(cssClass);
		} else {
			target.removeClass(cssClass);
		}
	}
}();