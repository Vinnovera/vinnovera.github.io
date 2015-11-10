(function(){

	var
		jso,
		iscrollSlider,
		clickAndTouchPosition,
		clickMargin = 8,
		firstOpen = true
		;

	$(document).ready(function() {
		addEvent('click', document.getElementById('openoverlay'), onOpenBtnClick);
	});

	function onOpenBtnClick(e){
		preventDefault(e);

		//copy Html from page
		var $imageslider_holder = $('#imageslider_holder').clone();

		var sliderWrapper = document.createElement('div');
		sliderWrapper.setAttribute('id', 'sliderwrapper');
		sliderWrapper.className = 'sliderwrapper';
		sliderWrapper.innerHTML = $imageslider_holder.html();
		document.body.appendChild(sliderWrapper);

		// Set the width of the scroller and scroll elements in percentages based on no of elements
		var listelems = document.querySelectorAll('#sliderwrapper li');
		$('#sliderwrapper > ul').width((listelems.length*100)+'%');
		for(var i=0;i<listelems.length;i++){
			listelems[i].style.width = (100/listelems.length) + '%';
		}

		// And handle resizing and similar troubles
		if(firstOpen){
			addEvent('orientationchange', window, onOrientationChange);
			addEvent('resize', window, onOrientationChange);
		}
		onOrientationChange(null);

		// Create the overlay
		jso = new jsOverlay({
			content: 'sliderwrapper',
			scrollable: false,
			modal: false,
			additionalStyleClasses: {
				closebutton: 'btn btn-block btn-lg btn-primary'
			}
		});

		// Create the iScroll (only for browsers which iScroll supports)
		if (document.addEventListener){
			iscrollSlider = new IScroll('#sliderwrapper', {
				scrollX: true,
				scrollY: false,
				momentum: false,
				snap: true,
				snapSpeed: 200,
				keyBindings: true,
				eventPassthrough: false
			});
		} else {
			// Older browser fallbacks here
		}

		// We need to trick around a bit to manage conflicting clicks and touches
		addEvent('mousedown', document.getElementById('imageslider_holder'), downStart);
		addEvent('mouseup', document.getElementById('imageslider_holder'), downEnd);
		addEvent('touchstart', document.getElementById('imageslider_holder'), downStart);
		addEvent('touchend', document.getElementById('imageslider_holder'), downEnd);
		var linkelems = document.getElementById('imageslider_holder').getElementsByTagName('a');
		for(var i=0;i<linkelems.length;i++){
			addEvent('click', linkelems[i], onImageLinkClick);
		}

		firstOpen = false;
	}

	function downStart(e){
		clickAndTouchPosition = getClickOrTouchPosition(e);
	}
	function downEnd(e){
		var upPosition = getClickOrTouchPosition(e);
		if(Math.abs(clickAndTouchPosition.x-upPosition.x) < clickMargin && Math.abs(clickAndTouchPosition.y-upPosition.y) < clickMargin){
			if(e.target.nodeName.toLowerCase() == 'li' || e.target.nodeName.toLowerCase() == 'a'){
				jso.close();
			} else if(e.target.nodeName.toLowerCase() == 'img'){
				window.open(e.target.parentNode.getAttribute('href'));
			}
		}
	}
	function onImageLinkClick(e){
		preventDefault(e);
	}
	function onOrientationChange(e){
		var $listelems = $('#sliderwrapper').children('ul').children('li');
		for(var i=0;i<$listelems.length;i++){
			$listelems[i].height = (window.innerHeight - 40) + 'px';
		}
	}

	/* And some usable functions */
	// Event manangement functions
	function addEvent(evnt, elem, func) {
		if (elem.addEventListener)  // W3C DOM
			elem.addEventListener(evnt,func,false);
		else if (elem.attachEvent) { // IE DOM
			elem.attachEvent("on"+evnt, func);
		}
		else { // No much to do
			elem[evnt] = func;
		}
	}
	function preventDefault(e){
		var evt = e || window.event;
		if(evt.preventDefault){
			evt.preventDefault();
		}else{
			evt.returnValue = false;
			evt.cancelBubble=true;
		}
	}
	function getClickOrTouchPosition(e){
		var ex, ey;
		if(e.pageX){
			ex = e.pageX;
			ey = e.pageY;
		} else if(e.touches) {
			if(e.touches.length > 0){
				ex = e.touches[0].pageX;
				ey = e.touches[0].pageY;
			} else {
				ex = e.changedTouches[0].pageX;
				ey = e.changedTouches[0].pageY;
			}
		} else {
			ex = window.event.clientX;
			ey = window.event.clientY;
		}
		return {
			x: ex,
			y: ey
		}
	}

}());