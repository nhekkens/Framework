// Making a new JS component
// 1 - Replace componentTemplate with new name ( 8 occurences in this file )
// 2 - All code goes into init()
// 3 - Save file as new name .js
var componentTemplate = {
	name: 'componentTemplate',
	componentInitSelector: '.componentTemplate',
	registerComponent: function() {
		if ( $(componentTemplate.componentInitSelector).length ) {
			framework.registerComponent(componentTemplate);
		}
	},
	initcomponentTemplate: function() {
        // Put your args and inits here with their options.

        // End
        log(config.application.name + " •• componentTemplate in " + Math.round( performance.now() - framework.initComponents.componentInitTime) + " milliseconds" );
    },
	init: function() {
		// All code for this component goes in here

		// End
		componentTemplate.initcomponentTemplate();
	}
}

// Register self to the framework
componentTemplate.registerComponent();