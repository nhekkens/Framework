// Making a new JS component
// 1 - Replace accordion with new name ( 5 occurences in this file )
// 2 - All code goes into init()
// 3 - Save file as new name .js
var accordion = {
	name: 'accordion',
	componentInitSelector: '.accordion',
	registerComponent: function() {
		if ( $(accordion.componentInitSelector).length ) {
			framework.registerComponent(accordion);
		}
	},
	init: function() {
		// All code for this component goes in here

		$('[data-js="accordion"]').each(function(){
			var $this = $(this),
				$item = $('[data-js="accordionItem"]'),
				$trigger = $item.find('[data-js="accordionTrigger"]'),
				$content = $item.find('[data-js="accordionContent"]'),
				events = $('html').hasClass('desktop') ? 'click' : 'click';


			/* If Desktop/no-touch, toggle active class on hover
			   Else, trigger on click/touch */

			$trigger.on(events, function(){
				var $parent = $(this).parents('[data-js="accordionItem"]'),
					target = $(this);

				// Display content
				$item.not($parent).removeClass('is-active');
				$parent.toggleClass('is-active');

			});
		});

		// End
        log(config.application.name + " •• accordion in " + Math.round( performance.now() - framework.initComponents.componentInitTime) + " milliseconds" );
	}
}

// Register self to the framework
accordion.registerComponent();