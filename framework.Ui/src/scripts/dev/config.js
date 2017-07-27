var config = {
	application: {
		name: 'Framework',
		touch: Modernizr.touch && !device.desktop(), // bool: Modernizr check returns true or false.
		debug: !window.frontEndProdMode, // bool: use log(); instead of console.log; for permanent debugging messages.
		root: typeof rootPath === "undefined" ? "" : rootPath // Path variable for javascript server side image loading.
	},
	bootstrap: {
		tooltips: true
	},
	notification: {
		active: true, // bool: on or off
		delay: 5000, // int: miliseconds for disappearance.
		tone: "default" // str: "default", "success", "warning", "failure".
	},
	cookie: {
		active: true, // bool: on or off
		message: "We use cookies to give you a better experience. By continuing to browse you are accepting our <a href='#' target='_blank'>Terms &amp; Conditions</a>.", // str: First visit cookie message.
		delay: 0 // int: First visit cookie delay on screen. 0 is permanent.
	},
	demo: {
		active: true, // bool: on or off - demo.js code will be run if true.
	}
};