// Notifications
var initNotifications = function() {
    var initTime = performance.now();

    var notificationCount = 0;
    var cookieNotify = false;

    var Timer = function(callback, delay) {
        var timerId, start, remaining = delay;

        this.stop = function() {
            window.clearTimeout(timerId);
            remaining = delay;
        };
        this.pause = function() {
            window.clearTimeout(timerId);
            remaining -= new Date() - start;
        };
        this.resume = function() {
            start = new Date();
            window.clearTimeout(timerId);
            timerId = window.setTimeout(callback, remaining);
        };
        this.resume();
    }

    window.notify = function(message, delay, tone) {
        delay = typeof delay === "undefined" || isNaN(delay) || delay === "" ? config.notification.delay : delay;
        tone = typeof tone === "undefined" || tone === "" ? config.notification.tone : tone;

        var notifyShow = function() {
            var notification = '<div class="notification notification-' + notificationCount + '" data-type="' + tone + '">\
                                <span class="notification-message">' + message + '</span>\
                                <div class="notification-close">\
                                    <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>\
                                </div>\
                            </div>';

            $(".notification-wrapper").append(notification);
            var el = $(".notification-" + notificationCount);

            var clear = function() {
                el.removeClass("active");
                setTimeout(function() {
                    el.remove();
                }, 300);
            }

            if (delay !== 0) timer = new Timer(clear, delay);

            el
                .addClass(tone)
                .off("mouseenter")
                .on("mouseenter", function() {
                    if (delay !== 0) timer.pause();
                })
                .off("mouseleave")
                .on("mouseleave", function() {
                    if (delay !== 0) timer.resume();
                })
                .on("click", clear);

            if (cookieNotify) {
                el.addClass("cookie");
                cookieNotify = false;
            }

            setTimeout(function() {
                el.addClass("active");
            }, 10);

            notificationCount++;
        }

        if (config.notification.active) {
            notifyShow();
        } else {
            if (config.cookie.active) notifyShow();
        }
    }


    if ($("[data-notification]").length) {
        $("[data-notification]").on("click", function() {
            var message = $(this).attr("data-message"),
                delay = parseInt($(this).attr("data-delay")),
                tone = $(this).attr("data-tone");

            notify(message, delay, tone);
        });
    }

    log(config.application.name + " •• notifications in " + Math.ceil( performance.now() - initTime) + " milliseconds" );
}
