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
		["Was very funny to watch.", "Nordic.js Mini-Sumo Robo Clash Spectator"],
		["Funny and unexpected.", "Nordic.js Mini-Sumo Robo Clash Spectator"],
		["It was great fun! Possibly there should be more than one ring at a time to make it move at a better pace.", "Nordic.js Mini-Sumo Robo Clash Attendee"],
		["Great fun to watch. Would like to attend next time.", "Nordic.js Mini-Sumo Robo Clash Spectator"],
		["Cool!", "Nordic.js Mini-Sumo Robo Clash Spectator"]
	];

	$("#quotes").html("<p class='quote'>"+ quotes[0][0] + "</p><footer>" + quotes[0][1] + "</footer>")

	var interval = setInterval(setQuote, 5000),
		currentQuote;

	function setQuote() {

		var randomQuote = quotes[(Math.round((Math.random()) * quotes.length)) - 1];

		if (randomQuote === currentQuote) {
			setQuote();
			return;
		}

		currentQuote = randomQuote;
		if(typeof randomQuote != 'undefined') {
			$('#quotes').addClass('fadeOut');
			var timer = setTimeout(function () {
				$("#quotes p.quote").text(randomQuote[0]);
				$("#quotes footer").text(randomQuote[1]);
				$('#quotes').removeClass('fadeOut');
				clearTimeout(timer);
			}, 500);
		}
	}
};


function loadFancybox() {
	$(".fancybox").fancybox();
};