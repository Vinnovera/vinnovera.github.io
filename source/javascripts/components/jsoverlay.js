/*!
 * jsOverlay v0.1
 * 
 * MIT License
 */

(function(w){

	// Reference DOM root
	var d = w.document;
	var doc = d.documentElement;
	var b = d.body;
	var _this = null;
	var goodAndroidVersion = 4;

	jsOverlay = function(o){
		_this = this;
		if(o){
			this.options = deepextend(this.options, o);
		}
		this.createOverlay();
	};

	// Default options
	jsOverlay.prototype.options = {
		content: '',
		showOnCreate: true,
		zIndex: 10000,
		styleNS: 'jso-',
		styleNames: {
			overlay: 'overlay',
			closebutton: 'closebutton'
		},
		additionalStyleClasses: {
			closebutton: '',
			overlay: ''
		},
		usePushState: true,
		pushStateName: 'jso',
		closebutton: {
			show: true,
			text: 'Close',
			margin: {
				top: 10,
				right: 10
			}
		},
		modal: true,
		scrollable: true,
		onBeforeClose: function(){},
		onClose: function(){},
		onOpen: function(){}
	};

	// Manage touchscrolls without blocking pinching
	jsOverlay.prototype.preventTouchScroll = function(e){
		e.preventDefault();
	};
	jsOverlay.prototype.preventTouchScrollPropagation = function(e){
		if(_this.isBadAndroid){
			e.preventDefault();
			_this.content.scrollTop = _this.scrollStartPos - e.touches[0].pageY;
			return false;
		}
		var stopProp = true;
		var currentClientY = e.touches[0].clientY;
		var contentScrollTop = _this.content.scrollTop;
		if(currentClientY < _this.prevClientY){
			if(contentScrollTop >= (_this.content.scrollHeight-_this.content.offsetHeight)){
				stopProp = false;
			}
		} else {
			if(contentScrollTop <= 0){
				stopProp = false;
			}
		}
		if(_this.isPinching){
			stopProp = true;
		}
		if(stopProp){
			e.stopPropagation();
		}
	};
	jsOverlay.prototype.preventTouchScrollStart = function(e){
		_this.prevClientY = e.touches[0].clientY;
		if(_this.isBadAndroid){
			if(e.target.tagName.toLowerCase() == 'a' || e.target.tagName.toLowerCase() == 'button' || _this.isPinching){

			} else {
				e.preventDefault();
			}
			_this.scrollStartPos = _this.content.scrollTop + e.touches[0].pageY;
		}
	};
	jsOverlay.prototype.preventTouchScrollEnd = function(e){
		_this.lockContentTimeout = setTimeout(_this.lockContent, 50);
	};
	jsOverlay.prototype.lockContent = function(){
		if(_this.isBadAndroid){
			return false;
		}
		if(_this.isGoodAndroid){
			if(w.outerWidth / w.innerWidth > 2) {
				return false;
			}
		}
		if(_this.pinchScale > 1){
			return false;
		}
		w.scrollTo(0, _this.contentTop);
		_this.positionModal();
		
	};

	// Handle clicks on overlay for closing
	jsOverlay.prototype.overlayClick = function(e){
		if(e.target === _this.overlay){
			_this.close();
		}
	};

 	// Handle resizing and reorientation
 	jsOverlay.prototype.onOrientationChange = function(e){
		var winh = getWinSize().h;
		_this.overlay.setAttribute('style', 'position:absolute;top:'+_this.contentTop+'px;left:0;width:100%;height:'+winh+'px;z-index:'+_this.options.zIndex+';');
		if(!_this.isBadAndroid){
			w.scrollTo(0, _this.currentScrollTop);
		} 
		if(_this.options.modal){
			_this.positionModal();
		}
 	};

 	// Position modal window
 	jsOverlay.prototype.positionModal = function(){
 		if(!_this.options.modal){
 			return false;
 		}
 		_this.winsize = getWinSize();
		if(_this.winsize.w-_this.content.offsetWidth > 0){
			_this.content.style.left = (_this.winsize.w-_this.content.offsetWidth) / 2 + 'px';
		} else {
			_this.content.style.left = 0 + 'px';
		}
		if(_this.winsize.h-_this.content.offsetHeight > 0){
			_this.content.style.top = (_this.winsize.h-_this.content.offsetHeight) / 2 + 'px';
		} else {
			_this.content.style.top = 0 + 'px';
		}
		_this.overlay.style.opacity = '1';

		// Lock touchscrolling of content
		addEvent('touchmove', d, _this.preventTouchScroll);
		addEvent('touchstart', d, _this.preventTouchScrollStart);
		addEvent('touchend', d, _this.preventTouchScrollEnd);
		if(_this.winsize.h-_this.content.offsetHeight <= 0){
			addEvent('touchmove', _this.content, _this.preventTouchScrollPropagation);
		} else {
			removeEvent('touchmove', _this.content, _this.preventTouchScrollPropagation);
		}

		if(!_this.isBadAndroid){
			w.scrollTo(0, _this.currentScrollTop);
		} else {
	 		b.style.overflow = 'auto';
	 		b.style.height = 'auto';
			w.scrollTo(0, _this.currentScrollTop);
		}
 	};

 	// Create the overlay DOM elements
 	jsOverlay.prototype.createOverlay = function(){
 		// Make some measurements
		this.currentScrollTop = (w.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
		this.contentTop = this.currentScrollTop;
		this.winsize = getWinSize();

 		// Create, grab and setup elements
 		this.overlay = d.createElement('div');
 		this.content = d.getElementById(this.options.content);
 		
 		// Set some scrolling styles on content wrapper
 		this.originalContentStyle = this.content.getAttribute('style');
 		var overflowstyle = this.options.scrollable ? 'auto' : 'hidden'; 
 		this.content.setAttribute('style', this.originalContentStyle + ';position:absolute;max-width:100%;max-height:100%;overflow:'+overflowstyle+';-webkit-overflow-scrolling:touch;overflow-scrolling:touch');
 		
 		// Set class name and positioning styles on overlay wrapper
 		this.overlay.className = this.options.styleNS + this.options.styleNames.overlay + ' ' + this.options.additionalStyleClasses.overlay;
 		this.overlay.setAttribute('style', 'position:absolute;top:'+this.contentTop+'px;left:0;width:100%;height:'+this.winsize.h+'px;z-index:'+this.options.zIndex+';');
 		
 		// Lock body
 		b.style.overflow = 'hidden';
 		b.style.height = this.winsize.h;
 		
 		// Push state management
 		if(history.pushState && this.options.usePushState){
 			addEvent('popstate', w, this.popStateChange);
			history.pushState({src:'jso'}, "jso", location.href+"#jso");
		}
		
		// Is it a modal window
		if(this.options.modal){
			this.overlay.style.opacity = '0';

			// Pinch management
			this.pinchScale = 1;
			if(b.addEventListener){
				b.addEventListener('gesturestart', function(e){
					_this.isPinching = true;
				});
				b.addEventListener('gestureend', function(e){
					_this.pinchScale = e.scale;
					setTimeout(function(){
						_this.isPinching = false;
					}, 100);
				});
			}

			// Wait for everything to get into place, then reposition
			setTimeout(function(){
				_this.content.style.position = 'absolute';
				_this.positionModal();
			}, 10);
		}
		
		// Manage resizing and reorientation
 		addEvent('orientationchange', w, this.onOrientationChange);
 		addEvent('resize', w, this.onOrientationChange);
 		
 		// Add content to overlay
 		this.overlay.appendChild(this.content);
 		
 		// Add a close-button
		if(this.options.closebutton.show){
			this.closebtn = d.createElement('a');
			this.closebtn.innerHTML = this.options.closebutton.text;
			this.closebtn.setAttribute('style', 'position:absolute;right:'+this.options.closebutton.margin.right+'px;top:'+this.options.closebutton.margin.top+'px;');
			this.closebtn.className = this.options.styleNS + this.options.styleNames.closebutton + ' ' + this.options.additionalStyleClasses.closebutton;
			this.overlay.appendChild(this.closebtn);
			addEvent('click', this.closebtn, this.close);
		}

		// Close on click outside content
		addEvent('click', this.overlay, this.overlayClick);
		addEvent('touchend', this.overlay, this.overlayClick);

		// Are we dealing with old Android versions?
		this.isBadAndroid = false;
		this.isGoodAndroid = false;
		var androidMatch = navigator.userAgent.match(/Android\s([0-9\.]*)/);
		if(androidMatch){
			if(parseInt(androidMatch[1]) < goodAndroidVersion){
				this.isBadAndroid = true;
			} else {
				this.isGoodAndroid = true;
			}
		}

		if(this.options.showOnCreate){
			this.show();
		}
 	};

	// Manage popstate changes
	jsOverlay.prototype.popStateChange = function(e){
		if(document.location.href.indexOf('#'+_this.options.pushStateName) == -1){
			_this.kill();
			removeEvent('popstate', w, _this.popStateChange);
		}
 	};

 	// Show the overlay
 	jsOverlay.prototype.show = function(){
 		// Add elements to body
 		b.appendChild(this.overlay);
 		setTimeout(function(){
			_this.positionModal();
			_this.options.onOpen.apply();
		}, 10);
 	};

 	// Hide the overlay
 	jsOverlay.prototype.hide = function(){
 		// Remove elements to body
 		b.removeChild(this.overlay);
 	};

 	// Close the overlay
 	jsOverlay.prototype.close = function(){
 		if(history.pushState){
			if(_this.options.usePushState){
				w.location.replace("#");
				if (typeof w.history.replaceState == 'function') {
					history.back();
				}
			} else {
				_this.kill();
			}
		} else {
			_this.kill();
		}
 	};

 	// Kill the overlay
 	jsOverlay.prototype.kill = function(){
 		_this.options.onBeforeClose.apply();
		clearTimeout(this.lockContentTimeout);
		removeEvent('touchmove', d, this.preventTouchScroll);
		removeEvent('touchstart', d, this.preventTouchScrollStart);
		removeEvent('touchend', d, this.preventTouchScrollEnd);
		removeEvent('orientationchange', w, this.onOrientationChange);
		removeEvent('resize', w, this.onOrientationChange);
		b.style.overflow = 'auto';
		b.style.height = 'auto';
		this.overlay.parentNode.removeChild(this.overlay);
		this.content.setAttribute('style', this.originalContentStyle);
		
		// If browser is repositioning scroll to top, jump to startoff point
		w.scrollTo(0, this.contentTop);
		setTimeout(function(){
			w.scrollTo(0, _this.contentTop);
			_this.options.onClose.apply();
		}, 50);

 	};

 	// --- Helper functions --- //
 	// Simple extend
	function extend(foo, bar){
		for(var prop in bar){
			foo[prop] = bar[prop];
		}
		return foo;
	}
	// Deep extend
	function deepextend(foo, bar) {
		if(foo && bar){
			var merged = {};
			if(foo instanceof Array){
				merged = [];
			}
			for (var each in bar) {
				if (foo.hasOwnProperty(each) && bar.hasOwnProperty(each)) {
					if (typeof(foo[each]) == "object" && typeof(bar[each]) == "object") {
						merged[each] = deepextend(foo[each], bar[each]);
					} else {
						merged[each] = bar[each];
					}
				} else if(bar.hasOwnProperty(each)) {
					merged[each] = bar[each];
				}
			}
			for (var each in foo) {
				if (!(each in bar) && foo.hasOwnProperty(each)) {
					merged[each] = foo[each];
				}
			}
			return merged;
		} else {
			return null;
		}
	}
	// Event manangement functions
	function addEvent(evnt, elem, func){
		if (elem.addEventListener)  // W3C DOM
			elem.addEventListener(evnt,func,false);
		else if (elem.attachEvent) { // IE DOM
			elem.attachEvent("on"+evnt, func);
		}
		else { // No much to do
			elem[evnt] = func;
		}
	}
	// Check if works
	function removeEvent(evnt, elem, func){
		if (elem.removeEventListener)  // W3C DOM
			elem.removeEventListener(evnt,func,false);
		else if (elem.detachEvent) { // IE DOM
			elem.detachEvent("on"+evnt, func);
		}
		else { // No much to do
			elem[evnt] = null;
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
	//Console.log Fallback for IE
	function log(msg){
		if(w.console){
			console.log(msg);
		} else {
			alert(msg);
		}
	}
	// Get window size
	function getWinSize(){
		return {
			w: (w.innerWidth || doc.clientWidth),
			h: (w.innerHeight || doc.clientHeight),
		};
	};


 	return jsOverlay;

 }(this));