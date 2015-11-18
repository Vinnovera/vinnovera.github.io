!function () {
	
	'use strict';

	$(document).ready(function() {
		bindEvents();
	});

	function bindEvents() {
		$('#toggle-menu').on('click', onToggleMenuClick);
		$('#scrollUp').on('click', onScrollUpClick);
		$('.post article p img').on('click', onArticleImageClick);
		$(window).on('scroll', onWindowScroll);

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
		animatedScrollTop($('html, body'), 0, 1000);
	}

	function onNavigationScroll(e) {
		e.preventDefault();

		var href = $(e.target).attr('href').split('#')[1];

		animatedScrollTop($('html, body'), $('#' + href).offset().top, 800);
	}

	function animatedScrollTop($target, position, speed){
		$target.animate({scrollTop: position}, speed);
	}

	function onArticleImageClick(e) {
		var
			$copy = $(e.target).clone(),
			id    = 'fullscreen_image';

		loadOverlayContent(id, $copy, createOverlay);
	}

	function loadOverlayContent(id, $content, callback) {
		callback = callback || function() {};

		$content.attr('id', id);
		$('body').append($content);

		$content.on('load', function() {
			callback(id, $content);
		});
	}

	function createOverlay(id) {
		var jso = new jsOverlay({
			content: id,
			usePushState: false
		});
	}

	function onWindowScroll() {
		if ($(window).scrollTop() >= 200) {
			toggleScrollUp(false);
		} else {
			toggleScrollUp(true);
		}
	}

	function toggleScrollUp(condition) {
		if(condition) {
			$('#scrollUp').removeClass('visible');
		} else {
			$('#scrollUp').addClass('visible');
		}
	}
}();