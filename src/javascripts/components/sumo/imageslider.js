(function(){

	var 
		jso,
		iscrollSlider,
		clickAndTouchPosition,
		clickMargin = 8,
		firstOpen = true
	;

	window.addEvent('domready', function () {
		//addEvent('click', document.getElementById('openoverlay'), onOpenBtnClick);
		addEvent('click', document.getElementById('openoverlay'),openImageSlider)
	});

	function openImageSlider(e){
		preventDefault(e);

		// These are the images we wish to load
		//Ersätt med li
		/*var items = [
			{url:'img/nasa/12372208463_385729b160_o.jpg', id:'nasa-0'},
			{url:'img/nasa/12372503404_f1e11b653a_o.jpg', id:'nasa-1'},
			{url:'img/nasa/12464994965_2569b4472e_o.jpg', id:'nasa-2'},
			{url:'img/nasa/12644030263_d78f34ea07_o.jpg', id:'nasa-3'},
			{url:'img/nasa/12752402055_947e748c90_o.jpg', id:'nasa-4'},
			{url:'img/nasa/12801808743_11e311245e_o.jpg', id:'nasa-5'}
		];*/

		// Create html based on image data and template NO

		//hämta ul'n
		//var template = _.template(document.getElementById('imageSliderTemplate').innerHTML, {items:items});
		var sumo_imageslider_wrapper_HTML = document.getElementById('sumo-imageSlider-wrapper').innerHTML;

		// Create a wrapper for everything and add to DOM
		var imageslider_holder = document.createElement('div');
		imageslider_holder.setAttribute('id', 'sliderwrapper');
		imageslider_holder.className = 'sliderwrapper';
		imageslider_holder.innerHTML = sumo_imageslider_wrapper_HTML;
		document.body.appendChild(imageslider_holder);

		var ul = document.getElementById('sliderwrapper').getElementsByTagName('ul');
		//var listelems = ul.getElementsByTagName('li');
		// Set the width of the scroller and scroll elements in percentages based on no of elements
		//ul.style.width = listelems.length*100+'%';
		
		/*for(var i=0;i<listelems.length;i++){
			listelems[i].style.width = (100/listelems.length) + '%';
		}*/

		// And handle resizing and similar troubles
		if(firstOpen){
			addEvent('orientationchange', window, onOrientationChange);
	 		addEvent('resize', window, onOrientationChange);
		}
		onOrientationChange(null);
		
		// Create the overlay
		jso = new jsOverlay({
			content: 'imageslider_holder',
			scrollable: false,
			modal: false,
			additionalStyleClasses: {
				closebutton: 'btn btn-block btn-lg btn-primary'
			}
		});

		// Create the iScroll (only for browsers which iScroll supports)
		if (document.addEventListener){
			iscrollSlider = new IScroll('#imageslider_holder', {
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
		var linkelems = document.getElementById('imageslider').getElementsByTagName('a');
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
		var listelems = document.getElementById('sliderwrapper').getElementsByTagName('ul').getElementsByTagName('li');
		for(var i=0;i<listelems.length;i++){
			listelems[i].style.height = (window.innerHeight - 40) + 'px';
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