// Making a new JS component
// 1 - Replace animateText with new name ( 8 occurences in this file )
// 2 - All code goes into init()
// 3 - Save file as new name .js
var animateText = {
	name: 'animateText',
	componentInitSelector: '.animate-text',
	registerComponent: function() {
		if ( $(animateText.componentInitSelector).length ) {
			framework.registerComponent(animateText);
		}
	},
	initanimateText: function() {
        // Put your target search here with their options.

        // End
        log(config.application.name + " •• animateText in " + Math.round( performance.now() - framework.initComponents.componentInitTime) + " milliseconds" );
    },
	init: function() {
		// All code for this component goes in here

		// Setting animate options
		var animateTextOptions = {
            blinkTime: 500,
            blinkCount: 3
        }

		var animateTitle = $('.animate-text');

		// Splitting characters and wrapping in a span
		animateTitle.each(function (i) {
			var characters = $(this).text().split("");

			$this = $(this);
			$this.empty();
			$.each(characters, function (i, el) {
				$this.append("<span class='animate-char'>" + el + "</span>");
			});
		});

		// Showing each character
		setTimeout(function() {
			$('.animate-text span').each(function (i) {
				// store the item around for use in the 'timeout' function
				var item = $(this);
				// execute this function sometime later:
				setTimeout(function() {
					item.show();
				}, 500*i);
				// each element should animate half a second after the last one.
			});
		}, 3000);

		// Calling blink function from helper js
		blink('.blink-text', animateTextOptions.blinkCount, animateTextOptions.blinkTime);

		animateText.initanimateText();
	}
}

// Register self to the framework
animateText.registerComponent();