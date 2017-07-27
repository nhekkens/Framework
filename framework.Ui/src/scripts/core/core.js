// The framework Object
framework = {
	// Init time for timer
	initTime: performance.now(),
	// array of components to be initialised
	components: [],
	// register components to the array
	registerComponent: function(component) {
		framework.components.push(component);
		// log('Registerd component: ', component);
	},
	// init components in the array
	initComponents: function() {
		log( config.application.name + " •••••••••••••••••••••••••••••••••••••••••••••••");
		var componentInitCount = 0
		var componentInitTime = 0;
		var componentInitTotalTime = performance.now();

		$.each( framework.components, function(index) {
			framework.initComponents.componentInitTime = performance.now();
			this.init();
			componentInitCount++;
		});

		log( config.application.name + " •••••••••••••••••••••••••••••••••••••••••••••••");
		log( config.application.name + " •• " + componentInitCount + " Components Ready in " + Math.round( performance.now() - componentInitTotalTime ) + " milliseconds");
		log( config.application.name + " •••••••••••••••••••••••••••••••••••••••••••••••");
		log(' ');
	},
	// init components for bootstrap ( must be set true in config )
	initBootstrapComponents: function() {
		// Tooltips
		if ( config.bootstrap.tooltips ) { $('[data-toggle="tooltip"]').tooltip();}
	},
	// init components for Core files
	initCoreComponents: function() {
		log( config.application.name + " •••••••••••••••••••••••••••••••••••••••••••••••");
		var coreInitTime = performance.now();

		initNotifications();
		initCookies();
		initValidation();

		log( config.application.name + " •••••••••••••••••••••••••••••••••••••••••••••••");
		log( config.application.name + " •• 3 Core Components Ready in " + Math.round( performance.now() - coreInitTime ) + " milliseconds");
		log( config.application.name + " •••••••••••••••••••••••••••••••••••••••••••••••");
		log(' ');
	},
	// init components for Core files
	initDevComponents: function() {
		log( config.application.name + " •••••••••••••••••••••••••••••••••••••••••••••••");
		var devInitTime = performance.now();

		// Run framework Demo Code
		if ( config.demo.active ) { initDemo();	}
		// Run Global js
		initGlobal();

		log( config.application.name + " •••••••••••••••••••••••••••••••••••••••••••••••");
		log( config.application.name + " •• Dev Components Ready in " + Math.round( performance.now() - devInitTime ) + " milliseconds");
		log( config.application.name + " •••••••••••••••••••••••••••••••••••••••••••••••");
		log(' ');
	},
	Ready: function() {
		// Run framework core functions
		framework.initCoreComponents();
		// Run the registered componets
		framework.initComponents();
		// Run bootstrap config functions
		framework.initBootstrapComponents();
		// Run framework core functions
		framework.initDevComponents();

		// Finish log time
		log( config.application.name + " •• Doc.Ready has finished in " + Math.round( performance.now() - framework.initTime ) + " milliseconds");
	},
	Load: function() {
		$("body").removeClass("preload");

		// Finish log time
		log( config.application.name + " •• Doc.Load has finished in " + Math.round( performance.now() - framework.initTime ) + " milliseconds");
	}
}

$(document).on("ready", framework.Ready);

$(window).on("load", framework.Load);

