/*function () {
		document.body.addEvent('click:relay(.sumo img)', function (e) {

		e.preventDefault();

		console.log('clicked');
			
		var copy = this.clone();
		copy.set('id', 'fullscreen_image');
		copy.inject(document.body);

		copy.addEvent('load', function(e) {
			var jso = new jsOverlay({
				content: 'fullscreen_image',
				usePushState: false,
				scrollable: true
			});
		});
	});

}();*/