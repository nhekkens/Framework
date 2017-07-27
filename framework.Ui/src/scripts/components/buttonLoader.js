// Making a new JS component
// 1 - Replace buttonLoader with new name ( 8 occurences in this file )
// 2 - All code goes into init()
// 3 - Save file as new name .js
var buttonLoader = {
	name: 'buttonLoader',
	componentInitSelector: '.button-loader',
	registerComponent: function() {
		if ( $(buttonLoader.componentInitSelector).length ) {
			framework.registerComponent(buttonLoader);
		}
	},
	initButtonLoader: function() {
        // Put your args and inits here with their options.

        // End
        log(config.application.name + " •• buttonLoader in " + Math.round( performance.now() - framework.initComponents.componentInitTime) + " milliseconds" );
    },
	init: function() {
		// All code for this component goes in here
		$.fn.extend({
        	buttonLoader: function(percent) {
        		// var buttonLoader = $('.button-loader');

				log('yes');

			}
    	});
    	
		$('.button-loader').on('click', function (){
			$(this).addClass('button-loader-active');
			that = this
			setTimeout(function(){
  				$(that).removeClass('button-loader-active');
      		}, 2000);
      		then = this
      		setTimeout(function(){
      			$(then).addClass('button-loader-success');
      		}, 2000);
      		after = this
      		setTimeout(function(){
      			$(after).removeClass('button-loader-success');
      		}, 6000);

			if($(this).hasClass('button-loader-active')) {
				$('.button-loader-progress').animate({
					width: '100%',
				}, 2000);
			} else {
				// not working need to discuss and revise
				$('.button-loader-progress').css('width', '0%');
			}
		});

		// End
		buttonLoader.initButtonLoader();
	}
}

// Register self to the framework
buttonLoader.registerComponent();