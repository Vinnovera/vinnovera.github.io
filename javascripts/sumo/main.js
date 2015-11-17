$(document).ready(function() {
	loadFancybox();
	randomQuotes();
});


function randomQuotes() {

	var quotes = [
		["It was the most fucking awesome fun that I had in a long time. Kudos to everyone who attended!!", "Nordic.js Mini-Sumo Robo Clash Attendee"],
		["Spectacular! Insane amounts of fun was had!", "Nordic.js Mini-Sumo Robo Clash Attendee"],
		["It was awesome. I'm just mad I didn't win!", "Nordic.js Mini-Sumo Robo Clash Attendee"],
		["It was awesome, more people should have tried it!", "Nordic.js Mini-Sumo Robo Clash Attendee"],
		["Was very funny to watch.", "Nordic.js Mini-Sumo Robo Clash Attendee"],
		["Funny and unexpected.", "Nordic.js Mini-Sumo Robo Clash Attendee"],
		["It was great fun! Possibly there should be more than one ring at a time to make it move at a better pace.", "Nordic.js Mini-Sumo Robo Clash Attendee"],
		["Great fun to watch. Would like to attend next time.", "Nordic.js Mini-Sumo Robo Clash Attendee"],
		["Cool!", "Nordic.js Mini-Sumo Robo Clash Attendee"]
	];

	$("#quotes").html("<p class='quote'>"+ quotes[0][0] + "</p><footer>" + quotes[0][1] + "</footer>")

	var interval = setInterval(function() {

		var i = Math.round((Math.random()) * quotes.length);

		if (i == quotes.length) {
			--i;
		}
		$('#quotes').addClass('fadeOut');
			var timer = setTimeout(function() {
				$("#quotes p.quote").text(quotes[i][0]);
				$("#quotes footer").text(quotes[i][1]);
				$('#quotes').removeClass('fadeOut');
			clearTimeout(timer);
		}, 500);
	}, 5000);
};


function loadFancybox() {
	$(".fancybox").fancybox();
};