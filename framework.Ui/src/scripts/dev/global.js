var initGlobal = function() {
	var initTime = performance.now();
	// Start

	if ($(videoPlayer.componentInitSelector).length) {
		// videos continue to play when a new entry is opened don't forget to pause them

		var players = plyr.setup('.timeline-video');

		$('.timeline--entryClose, .timeline--dot').on('click', function() {
			for (var i = 0; i < players.length; i++) {
				players[i].pause();
			}
		});
	}

	// End
	log(config.application.name + " •• global.js in " + Math.ceil( performance.now() - initTime) + " milliseconds" );
}


