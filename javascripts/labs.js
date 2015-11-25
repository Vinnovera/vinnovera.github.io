/**
 * Created by sandra on 17/11/15.
 */

$(document).ready(function() {
	initIsotop();
	bindEvents();
});

function bindEvents() {
	$('.labs-filter').on( 'click', 'button', onFilterButton);
}

function initIsotop() {
	var $grid = $('.grid').isotope({
		itemSelector: '.labs-item',
		layoutMode: 'packery'
	});
}

function onFilterButton(e) {
	e.preventDefault();

	var filterValue = $(e.target).attr('data-filter');
	$('.labs').isotope({ filter: filterValue });
}