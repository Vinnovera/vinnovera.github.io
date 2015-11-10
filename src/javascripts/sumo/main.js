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

(function() {
  "use strict";

  var element = document.getElementById("quotes");
  

  var quotes = [
    ["It was the most fucking awesome fun that I had in a long time. Kudos to everyone who attended!!", "random attendee"],
    ["Spectacular! Insane amounts of fun was had!", "random attendee"],
    ["It was awesome. I'm just mad I didn't win!", "random attendee"],
    ["It was awesome, more people should have tried it!", "random attendee"]
  ];

  var random = quotes[Math.floor(Math.random() * quotes.length)];

  console.log(random);
  function quote() {
  	element.innerHTML = "<p class='quote'>"+ random[0] + "</p><footer>" + random[1] + "</footer>";
    //return "<p>&ldquo;"+  +"&rdquo;</p>";
  }

  quote();

  //element.innerHTML = rand(quotes);

}());