(function(){

	var
		jso,
		iscrollSlider,
		clickAndTouchPosition,
		clickMargin = 8,
		firstOpen = true
		;

	$(document).ready(function() {
		addEvent('click', document.getElementById('openoverlay'), onImageClick);
	});

	function onImageClick(e){
		preventDefault(e);

		//copy Html from page
		var $imageslider_holder = $('#imageslider_holder').clone();

		createElementWithContent('div', 'sliderwrapper', 'sliderwrapper',$imageslider_holder.html());

		setWidthOfScrollerAndItems('#sliderwrapper > ul', '#sliderwrapper li');

		onOrientationChange(null);

		createJSOverlay('sliderwrapper', false, false);
		createIScroll('#sliderwrapper', 200);

		addEvents();

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

	function createElementWithContent(elem, id, cssClass, content) {
		var element = document.createElement(elem);
		element.setAttribute('id', id);
		element.className = cssClass;
		element.innerHTML = content;
		document.body.appendChild(element);
	}

	function createJSOverlay (content, scrollable, modal) {
		// Create the overlay
		jso = new jsOverlay({
			content: content,
			scrollable: scrollable,
			modal: modal,
			additionalStyleClasses: {
				closebutton: 'btn btn-block btn-lg btn-primary'
			}
		});
	}

	function createIScroll(id, speed) {
		// Create the iScroll (only for browsers which iScroll supports)
		if (document.addEventListener){
			iscrollSlider = new IScroll(id, {
				scrollX: true,
				scrollY: false,
				momentum: false,
				snap: true,
				snapSpeed: speed,
				keyBindings: true,
				eventPassthrough: false
			});
		}
	}

	function addEvents() {
		// We need to trick around a bit to manage conflicting clicks and touches
		addEvent('mousedown', document.getElementById('imageslider_holder'), downStart);
		addEvent('mouseup', document.getElementById('imageslider_holder'), downEnd);
		addEvent('touchstart', document.getElementById('imageslider_holder'), downStart);
		addEvent('touchend', document.getElementById('imageslider_holder'), downEnd);

		var linkelems = document.getElementById('imageslider_holder').getElementsByTagName('a');
		for(var i=0;i<linkelems.length;i++){
			addEvent('click', linkelems[i], onImageLinkClick);
		}

		// And handle resizing and similar troubles
		if(firstOpen){
			addEvent('orientationchange', window, onOrientationChange);
			addEvent('resize', window, onOrientationChange);
		}
	}
	function setWidthOfScrollerAndItems(list, items) {
		// Set the width of the scroller and scroll elements in percentages based on no of elements
		var listelems = document.querySelectorAll(items);
		$(list).width((listelems.length*100)+'%');
		for(var i=0;i<listelems.length;i++) {
			listelems[i].style.width = (100 / listelems.length) + '%';
		}
	}
}());