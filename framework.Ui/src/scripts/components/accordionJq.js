// Making a new JS component
// 1 - Replace accordion with new name ( 5 occurences in this file )
// 2 - All code goes into init()
// 3 - Save file as new name .js
var accordionJq = {
	name: 'accordionJq',
	componentInitSelector: '.accordionJq',
	registerComponent: function() {
		if ( $(accordionJq.componentInitSelector).length ) {
			framework.registerComponent(accordionJq);
		}
	},
	init: function() {
		// All code for this component goes in here

		$('.accordionJq').accordion({
            collapsible: true,
            heightStyle: "content",
        });

		// End
        log(config.application.name + " •• accordionJq in " + Math.round( performance.now() - framework.initComponents.componentInitTime) + " milliseconds" );
	}
}

// Register self to the framework
accordionJq.registerComponent();