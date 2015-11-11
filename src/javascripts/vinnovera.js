!function () {
	
	'use strict';

	$(document).ready(function() {

		bindEvents();

		// Show to top button
		$(window).scroll(function () {
			checkIfWindowScrolledShowTarget($('#scrollUp'), 200, 'visible');
		});
	});

	function bindEvents() {
		$('#toggle-menu').on('click', onToggleMenuClick);
		$('#scrollUp').on('click', onScrollUpClick);
		$('.post article p img').on('click', onOpenJSOverlayFromArticleImage);

		if($('body').hasClass('index')) {
			$('#navigation > a').on('click', onNavigationScroll);
		}
	}

	function onToggleMenuClick(e) {
		e.preventDefault();
		toggleMenu($(e.target));
	}

	function toggleMenu($target) {

		if($target.attr('id') != 'toggle-menu') {
			$target = $('#toggle-menu');
		}

		if($target.hasClass('open')) {
			$target.removeClass('open');
		} else {
			$target.addClass('open');
		}
	}

	function onScrollUpClick(e) {
		e.preventDefault();
		$('html, body').animate({scrollTop: 0}, 1000);
	}

	function onNavigationScroll(e) {
		e.preventDefault();

		var href = $(e.target).attr('href').split('#')[1];

		$('html, body').animate( {
				scrollTop: $('#' + href).offset().top},
			800
		);
	}

	function onOpenJSOverlayFromArticleImage(e) {
		var $copy = $(e.target).clone();
		articleImageEvent($copy);
	}

	function articleImageEvent($content) {
		$content.attr('id', 'fullscreen_image');
		$('body').append($content);

		$content.on('load', function() {
			openOverlay('fullscreen_image')
		});
	}

	function openOverlay(id) {
		var jso = new jsOverlay({
			content: id,
			usePushState: false
		});
	}

	function checkIfWindowScrolledShowTarget($target, distance, cssClass) {
		if ($(window).scrollTop() >= distance) {
			$target.addClass(cssClass);
		} else {
			$target.removeClass(cssClass);
		}
	}
}();