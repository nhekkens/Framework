// Helper functions

// Polyfil for performance fix
(function() {
    if ("performance" in window == false) {
        window.performance = {};
    }
    Date.now = (Date.now || function() { // thanks IE8
        return new Date().getTime();
    });
    if ("now" in window.performance == false) {
        var nowOffset = Date.now();
        if (performance.timing && performance.timing.navigationStart) {
            nowOffset = performance.timing.navigationStart
        }
        window.performance.now = function now() {
            return Date.now() - nowOffset;
        }
    }
})();

// Log manager - logs only if config.application.debug is true.
var log = function(message, data) {
    if (config.application.debug) {
        if (data !== undefined) {
            console.log(message, data);
        } else {
            console.log(message);
        }
    }
}

// Get value of the key provided in the Query string.
var getQueryValue = function(key) {
    return (key || document.location.search).replace(/(^\?)/, '').split("&").map(function(n) {
        return n = n.split("="), this[n[0]] = n[1], this;
    }.bind({}))[0];
}

// Add a remote sccript into the DOM and run the call back
function loadScript(url, callback) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    script.onreadystatechange = callback;
    script.onload = callback;

    head.appendChild(script);
}

// Make element blink
function blink(elem, times, speed) {
    if (times > 0 || times < 0) {
        if ($(elem).hasClass('blink'))
            $(elem).removeClass('blink');
        else
            $(elem).addClass('blink');
    }

    clearTimeout(function() {
        blink(elem, times, speed);
    });

    if (times > 0 || times < 0) {
        setTimeout(function() {
            blink(elem, times, speed);
        }, speed);
        times -= 0.5;
    }
}

// smooth scrolling function
$(function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});