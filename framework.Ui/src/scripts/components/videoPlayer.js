// Making a new JS component
// 1 - Replace videoPlayer with new name ( 8 occurences in this file )
// 2 - All code goes into init()
// 3 - Save file as new name .js
var videoPlayer = {
    name: 'videoPlayer',
    componentInitSelector: '.videoPlayer',
    registerComponent: function() {
        if ($(videoPlayer.componentInitSelector).length) {
            framework.registerComponent(videoPlayer);
        }
    },
    initvideoPlayer: function() {
        // Put your target search here with their options.
        // Documentation https://github.com/Selz/plyrw
        plyr.setup();

        // End
        log(config.application.name + " •• videoPlayer in " + Math.round( performance.now() - framework.initComponents.componentInitTime) + " milliseconds" );
    },
    init: function() {
        // All code for this component goes in here
        // Documentation https://github.com/Selz/plyrw
        ! function(e, t) { "use strict"; "object" == typeof module && "object" == typeof module.exports ? module.exports = t(e, document) : "function" == typeof define && define.amd ? define(null, function() { t(e, document) }) : e.plyr = t(e, document) }("undefined" != typeof window ? window : this, function(e, t) {
            "use strict";

            function n() {
                var e, n, r, a = navigator.userAgent,
                    s = navigator.appName,
                    o = "" + parseFloat(navigator.appVersion),
                    i = parseInt(navigator.appVersion, 10),
                    l = !1,
                    u = !1,
                    c = !1,
                    p = !1;
                return -1 !== navigator.appVersion.indexOf("Windows NT") && -1 !== navigator.appVersion.indexOf("rv:11") ? (l = !0, s = "IE", o = "11") : -1 !== (n = a.indexOf("MSIE")) ? (l = !0, s = "IE", o = a.substring(n + 5)) : -1 !== (n = a.indexOf("Chrome")) ? (c = !0, s = "Chrome", o = a.substring(n + 7)) : -1 !== (n = a.indexOf("Safari")) ? (p = !0, s = "Safari", o = a.substring(n + 7), -1 !== (n = a.indexOf("Version")) && (o = a.substring(n + 8))) : -1 !== (n = a.indexOf("Firefox")) ? (u = !0, s = "Firefox", o = a.substring(n + 8)) : (e = a.lastIndexOf(" ") + 1) < (n = a.lastIndexOf("/")) && (s = a.substring(e, n), o = a.substring(n + 1), s.toLowerCase() == s.toUpperCase() && (s = navigator.appName)), -1 !== (r = o.indexOf(";")) && (o = o.substring(0, r)), -1 !== (r = o.indexOf(" ")) && (o = o.substring(0, r)), i = parseInt("" + o, 10), isNaN(i) && (o = "" + parseFloat(navigator.appVersion), i = parseInt(navigator.appVersion, 10)), { name: s, version: i, isIE: l, isFirefox: u, isChrome: c, isSafari: p, isIos: /(iPad|iPhone|iPod)/g.test(navigator.platform), isTouch: "ontouchstart" in t.documentElement }
            }

            function r(e, t) {
                var n = e.media;
                if ("video" == e.type) switch (t) {
                        case "video/webm":
                            return !(!n.canPlayType || !n.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/no/, ""));
                        case "video/mp4":
                            return !(!n.canPlayType || !n.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"').replace(/no/, ""));
                        case "video/ogg":
                            return !(!n.canPlayType || !n.canPlayType('video/ogg; codecs="theora"').replace(/no/, ""))
                    } else if ("audio" == e.type) switch (t) {
                        case "audio/mpeg":
                            return !(!n.canPlayType || !n.canPlayType("audio/mpeg;").replace(/no/, ""));
                        case "audio/ogg":
                            return !(!n.canPlayType || !n.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, ""));
                        case "audio/wav":
                            return !(!n.canPlayType || !n.canPlayType('audio/wav; codecs="1"').replace(/no/, ""))
                    }
                return !1
            }

            function a(e) {
                if (!t.querySelectorAll('script[src="' + e + '"]').length) {
                    var n = t.createElement("script");
                    n.src = e;
                    var r = t.getElementsByTagName("script")[0];
                    r.parentNode.insertBefore(n, r)
                }
            }

            function s(e, t) {
                return Array.prototype.indexOf && -1 != e.indexOf(t)
            }

            function o(e, t, n) {
                return e.replace(new RegExp(t.replace(/([.*+?\^=!:${}()|\[\]\/\\])/g, "\\$1"), "g"), n)
            }

            function i(e, t) {
                e.length || (e = [e]);
                for (var n = e.length - 1; n >= 0; n--) {
                    var r = n > 0 ? t.cloneNode(!0) : t,
                        a = e[n],
                        s = a.parentNode,
                        o = a.nextSibling;
                    return r.appendChild(a), o ? s.insertBefore(r, o) : s.appendChild(r), r
                }
            }

            function l(e) {
                for (var t = e.parentNode; e.firstChild;) t.insertBefore(e.firstChild, e);
                t.removeChild(e)
            }

            function u(e) { e && e.parentNode.removeChild(e) }

            function c(e, t) { e.insertBefore(t, e.firstChild) }

            function p(e, t) {
                for (var n in t) e.setAttribute(n, "boolean" == typeof t[n] && t[n] ? "" : t[n])
            }

            function d(e, n, r) {
                var a = t.createElement(e);
                p(a, r), c(n, a)
            }

            function A(e) {
                return e.replace(".", "")
            }

            function m(e, t, n) {
                if (e)
                    if (e.classList) e.classList[n ? "add" : "remove"](t);
                    else {
                        var r = (" " + e.className + " ").replace(/\s+/g, " ").replace(" " + t + " ", "");
                        e.className = r + (n ? " " + t : "")
                    }
            }

            function f(e, t) {
                return e ? e.classList ? e.classList.contains(t) : new RegExp("(\\s|^)" + t + "(\\s|$)").test(e.className) : !1
            }

            function y(e, n) {
                var r = Element.prototype,
                    a = r.matches || r.webkitMatchesSelector || r.mozMatchesSelector || r.msMatchesSelector || function(e) {
                        return -1 !== [].indexOf.call(t.querySelectorAll(e), this)
                    };
                return a.call(e, n)
            }

            function b(e, t, n, r) { e && h(e, t, n, !0, r) }

            function v(e, t, n, r) { e && h(e, t, n, !1, r) }

            function g(e, t, n, r, a) { b(e, t, function(t) { n && n.apply(e, [t]), r.apply(e, [t]) }, a) }

            function h(e, t, n, r, a) {
                var s = t.split(" ");
                if ("boolean" != typeof a && (a = !1), e instanceof NodeList)
                    for (var o = 0; o < e.length; o++) e[o] instanceof Node && h(e[o], arguments[1], arguments[2], arguments[3]);
                else
                    for (var i = 0; i < s.length; i++) e[r ? "addEventListener" : "removeEventListener"](s[i], n, a)
            }

            function k(e, t, n, r) {
                if (e && t) {
                    "boolean" != typeof n && (n = !1);
                    var a = new CustomEvent(t, { bubbles: n, detail: r });
                    e.dispatchEvent(a)
                }
            }

            function w(e, t) {
                return e ? (t = "boolean" == typeof t ? t : !e.getAttribute("aria-pressed"), e.setAttribute("aria-pressed", t), t) : void 0
            }

            function x(e, t) {
                return 0 === e || 0 === t || isNaN(e) || isNaN(t) ? 0 : (e / t * 100).toFixed(2)
            }

            function T() {
                var e = arguments;
                if (e.length) {
                    if (1 == e.lenth) return e[0];
                    for (var t = Array.prototype.shift.call(e), n = e.length, r = 0; n > r; r++) {
                        var a = e[r];
                        for (var s in a) a[s] && a[s].constructor && a[s].constructor === Object ? (t[s] = t[s] || {}, T(t[s], a[s])) : t[s] = a[s]
                    }
                    return t
                }
            }

            function E() {
                var e = {
                        supportsFullScreen: !1,
                        isFullScreen: function() {
                            return !1
                        },
                        requestFullScreen: function() {},
                        cancelFullScreen: function() {},
                        fullScreenEventName: "",
                        element: null,
                        prefix: ""
                    },
                    n = "webkit moz o ms khtml".split(" ");
                if ("undefined" != typeof t.cancelFullScreen) e.supportsFullScreen = !0;
                else
                    for (var r = 0, a = n.length; a > r; r++) {
                        if (e.prefix = n[r], "undefined" != typeof t[e.prefix + "CancelFullScreen"]) {
                            e.supportsFullScreen = !0;
                            break
                        }
                        if ("undefined" != typeof t.msExitFullscreen && t.msFullscreenEnabled) {
                            e.prefix = "ms", e.supportsFullScreen = !0;
                            break
                        }
                    }
                return e.supportsFullScreen && (e.fullScreenEventName = "ms" == e.prefix ? "MSFullscreenChange" : e.prefix + "fullscreenchange", e.isFullScreen = function(e) {
                    switch ("undefined" == typeof e && (e = t.body), this.prefix) {
                        case "":
                            return t.fullscreenElement == e;
                        case "moz":
                            return t.mozFullScreenElement == e;
                        default:
                            return t[this.prefix + "FullscreenElement"] == e
                    }
                }, e.requestFullScreen = function(e) {
                    return "undefined" == typeof e && (e = t.body), "" === this.prefix ? e.requestFullScreen() : e[this.prefix + ("ms" == this.prefix ? "RequestFullscreen" : "RequestFullScreen")]()
                }, e.cancelFullScreen = function() {
                    return "" === this.prefix ? t.cancelFullScreen() : t[this.prefix + ("ms" == this.prefix ? "ExitFullscreen" : "CancelFullScreen")]()
                }, e.element = function() {
                    return "" === this.prefix ? t.fullscreenElement : t[this.prefix + "FullscreenElement"]
                }), e
            }

            function _() {
                var t = {
                    supported: function() {
                        if (!("localStorage" in e)) return !1;
                        try {
                            e.localStorage.setItem("___test", "OK");
                            var t = e.localStorage.getItem("___test");
                            return e.localStorage.removeItem("___test"), "OK" === t
                        } catch (n) {
                            return !1
                        }
                        return !1
                    }()
                };
                return t
            }

            function C(y, h) {
                function T() { h.debug && e.console && console.log.apply(console, arguments) }

                function C() { h.debug && e.console && console.warn.apply(console, arguments) }

                function I() {
                    return { url: h.iconUrl, absolute: 0 === h.iconUrl.indexOf("http") || Oe.browser.isIE }
                }

                function P() {
                    var e = [],
                        t = I(),
                        n = (t.absolute ? "" : t.url) + "#" + h.iconPrefix;
                    return s(h.controls, "play-large") && e.push('<button type="button" data-plyr="play" class="plyr__play-large">', '<img src="' + config.application.root + 'Assets/images/videoPlay.png">', '<span class="plyr__sr-only">' + h.i18n.play + "</span>", "</button>"), e.push('<div class="plyr__controls">'), s(h.controls, "restart") && e.push('<button type="button" data-plyr="restart">', '<svg><use xlink:href="' + n + '-restart" /></svg>', '<span class="plyr__sr-only">' + h.i18n.restart + "</span>", "</button>"), s(h.controls, "rewind") && e.push('<button type="button" data-plyr="rewind">', '<svg><use xlink:href="' + n + '-rewind" /></svg>', '<span class="plyr__sr-only">' + h.i18n.rewind + "</span>", "</button>"), s(h.controls, "play") && e.push('<button type="button" data-plyr="play">', '<svg><use xlink:href="' + n + '-play" /></svg>', '<span class="plyr__sr-only">' + h.i18n.play + "</span>", "</button>", '<button type="button" data-plyr="pause">', '<svg><use xlink:href="' + n + '-pause" /></svg>', '<span class="plyr__sr-only">' + h.i18n.pause + "</span>", "</button>"), s(h.controls, "fast-forward") && e.push('<button type="button" data-plyr="fast-forward">', '<svg><use xlink:href="' + n + '-fast-forward" /></svg>', '<span class="plyr__sr-only">' + h.i18n.forward + "</span>", "</button>"), s(h.controls, "progress") && (e.push('<span class="plyr__progress">', '<label for="seek{id}" class="plyr__sr-only">Seek</label>', '<input id="seek{id}" class="plyr__progress--seek" type="range" min="0" max="100" step="0.1" value="0" data-plyr="seek">', '<progress class="plyr__progress--played" max="100" value="0" role="presentation"></progress>', '<progress class="plyr__progress--buffer" max="100" value="0">', "<span>0</span>% " + h.i18n.buffered, "</progress>"), h.tooltips.seek && e.push('<span class="plyr__tooltip">00:00</span>'), e.push("</span>")), s(h.controls, "current-time") && e.push('<span class="plyr__time">', '<span class="plyr__sr-only">' + h.i18n.currentTime + "</span>", '<span class="plyr__time--current">00:00</span>', "</span>"), s(h.controls, "duration") && e.push('<span class="plyr__time">', '<span class="plyr__sr-only">' + h.i18n.duration + "</span>", '<span class="plyr__time--duration">00:00</span>', "</span>"), s(h.controls, "mute") && e.push('<button type="button" data-plyr="mute">', '<svg class="icon--muted"><use xlink:href="' + n + '-muted" /></svg>', '<svg><use xlink:href="' + n + '-volume" /></svg>', '<span class="plyr__sr-only">' + h.i18n.toggleMute + "</span>", "</button>"), s(h.controls, "volume") && e.push('<span class="plyr__volume">', '<label for="volume{id}" class="plyr__sr-only">' + h.i18n.volume + "</label>", '<input id="volume{id}" class="plyr__volume--input" type="range" min="' + h.volumeMin + '" max="' + h.volumeMax + '" value="' + h.volume + '" data-plyr="volume">', '<progress class="plyr__volume--display" max="' + h.volumeMax + '" value="' + h.volumeMin + '" role="presentation"></progress>', "</span>"), s(h.controls, "captions") && e.push('<button type="button" data-plyr="captions">', '<svg class="icon--captions-on"><use xlink:href="' + n + '-captions-on" /></svg>', '<svg><use xlink:href="' + n + '-captions-off" /></svg>', '<span class="plyr__sr-only">' + h.i18n.toggleCaptions + "</span>", "</button>"), s(h.controls, "fullscreen") && e.push('<button type="button" data-plyr="fullscreen">', '<svg class="icon--exit-fullscreen"><use xlink:href="' + n + '-exit-fullscreen" /></svg>', '<svg><use xlink:href="' + n + '-enter-fullscreen" /></svg>', '<span class="plyr__sr-only">' + h.i18n.toggleFullscreen + "</span>", "</button>"), e.push("</div>"), e.join("")
                }

                function R() {
                    if (Oe.supported.full && ("audio" != Oe.type || h.fullscreen.allowAudio) && h.fullscreen.enabled) {
                        var e = M.supportsFullScreen;
                        e || h.fullscreen.fallback && !W() ? (T((e ? "Native" : "Fallback") + " fullscreen enabled"), m(Oe.container, h.classes.fullscreen.enabled, !0)) : T("Fullscreen not supported and fallback disabled"), w(Oe.buttons.fullscreen, !1), Y()
                    }
                }

                function L() {
                    if ("video" === Oe.type) {
                        G(h.selectors.captions) || Oe.videoContainer.insertAdjacentHTML("afterbegin", '<div class="' + A(h.selectors.captions) + '"></div>'), Oe.usingTextTracks = !1, Oe.media.textTracks && (Oe.usingTextTracks = !0);
                        for (var e, t = "", n = Oe.media.childNodes, r = 0; r < n.length; r++) "track" === n[r].nodeName.toLowerCase() && (e = n[r].kind, "captions" !== e && "subtitles" !== e || (t = n[r].getAttribute("src")));
                        if (Oe.captionExists = !0, "" === t ? (Oe.captionExists = !1, T("No caption track found")) : T("Caption track found; URI: " + t), Oe.captionExists) {
                            for (var a = Oe.media.textTracks, s = 0; s < a.length; s++) a[s].mode = "hidden";
                            if (H(Oe), (Oe.browser.isIE && Oe.browser.version >= 10 || Oe.browser.isFirefox && Oe.browser.version >= 31) && (T("Detected browser with known TextTrack issues - using manual fallback"), Oe.usingTextTracks = !1), Oe.usingTextTracks) {
                                T("TextTracks supported");
                                for (var o = 0; o < a.length; o++) {
                                    var i = a[o];
                                    "captions" !== i.kind && "subtitles" !== i.kind || b(i, "cuechange", function() { this.activeCues[0] && "text" in this.activeCues[0] ? B(this.activeCues[0].getCueAsHTML()) : B() })
                                }
                            } else if (T("TextTracks not supported so rendering captions manually"), Oe.currentCaption = "", Oe.captions = [], "" !== t) {
                                var l = new XMLHttpRequest;
                                l.onreadystatechange = function() {
                                    if (4 === l.readyState)
                                        if (200 === l.status) {
                                            var e, t = [],
                                                n = l.responseText;
                                            t = n.split("\n\n");
                                            for (var r = 0; r < t.length; r++) {
                                                e = t[r], Oe.captions[r] = [];
                                                var a = e.split("\n"),
                                                    s = 0; - 1 === a[s].indexOf(":") && (s = 1), Oe.captions[r] = [a[s], a[s + 1]]
                                            }
                                            Oe.captions.shift(), T("Successfully loaded the caption file via AJAX")
                                        } else C("There was a problem loading the caption file via AJAX")
                                }, l.open("get", t, !0), l.send()
                            }
                        } else m(Oe.container, h.classes.captions.enabled)
                    }
                }

                function B(e) {
                    var n = G(h.selectors.captions),
                        r = t.createElement("span");
                    n.innerHTML = "", "undefined" == typeof e && (e = ""), "string" == typeof e ? r.innerHTML = e.trim() : r.appendChild(e), n.appendChild(r);
                    n.offsetHeight
                }

                function O(e) {
                    function t(e, t) {
                        var n = [];
                        n = e.split(" --> ");
                        for (var r = 0; r < n.length; r++) n[r] = n[r].replace(/(\d+:\d+:\d+\.\d+).*/, "$1");
                        return a(n[t])
                    }

                    function n(e) {
                        return t(e, 0)
                    }

                    function r(e) {
                        return t(e, 1)
                    }

                    function a(e) {
                        if (null === e || void 0 === e) return 0;
                        var t, n = [],
                            r = [];
                        return n = e.split(","), r = n[0].split(":"), t = Math.floor(60 * r[0] * 60) + Math.floor(60 * r[1]) + Math.floor(r[2])
                    }
                    if (!Oe.usingTextTracks && "video" === Oe.type && Oe.supported.full && (Oe.subcount = 0, e = "number" == typeof e ? e : Oe.media.currentTime, Oe.captions[Oe.subcount])) {
                        for (; r(Oe.captions[Oe.subcount][0]) < e.toFixed(1);)
                            if (Oe.subcount++, Oe.subcount > Oe.captions.length - 1) {
                                Oe.subcount = Oe.captions.length - 1;
                                break
                            }
                        Oe.media.currentTime.toFixed(1) >= n(Oe.captions[Oe.subcount][0]) && Oe.media.currentTime.toFixed(1) <= r(Oe.captions[Oe.subcount][0]) ? (Oe.currentCaption = Oe.captions[Oe.subcount][1], B(Oe.currentCaption)) : B()
                    }
                }

                function H() { Oe.buttons.captions && (m(Oe.container, h.classes.captions.enabled, !0), h.captions.defaultActive && (m(Oe.container, h.classes.captions.active, !0), w(Oe.buttons.captions, !0))) }

                function V(e) {
                    return Oe.container.querySelectorAll(e)
                }

                function G(e) {
                    return V(e)[0]
                }

                function W() {
                    try {
                        return e.self !== e.top
                    } catch (t) {
                        return !0
                    }
                }

                function Y() {
                    function e(e) { 9 === e.which && Oe.isFullscreen && (e.target !== r || e.shiftKey ? e.target === n && e.shiftKey && (e.preventDefault(), r.focus()) : (e.preventDefault(), n.focus())) }
                    var t = V("input:not([disabled]), button:not([disabled])"),
                        n = t[0],
                        r = t[t.length - 1];
                    b(Oe.container, "keydown", e)
                }

                function q(e, t) {
                    if ("string" == typeof t) d(e, Oe.media, { src: t });
                    else if (t.constructor === Array)
                        for (var n = t.length - 1; n >= 0; n--) d(e, Oe.media, t[n])
                }

                function X() {
                    if (h.loadSprite) {
                        var e = I();
                        e.absolute ? (T("AJAX loading absolute SVG sprite" + (Oe.browser.isIE ? " (due to IE)" : "")), S(e.url, "sprite-plyr")) : T("Sprite will be used as external resource directly")
                    }
                    var n = h.html;
                    T("Injecting custom controls"), n || (n = P()), n = o(n, "{seektime}", h.seekTime), n = o(n, "{id}", Math.floor(1e4 * Math.random()));
                    var r;
                    if (null !== h.selectors.controls.container && (r = h.selectors.controls.container, "string" == typeof selector && (r = t.querySelector(r))), r instanceof HTMLElement || (r = Oe.container), r.insertAdjacentHTML("beforeend", n), h.tooltips.controls)
                        for (var a = V([h.selectors.controls.wrapper, " ", h.selectors.labels, " .", h.classes.hidden].join("")), s = a.length - 1; s >= 0; s--) {
                            var i = a[s];
                            m(i, h.classes.hidden, !1), m(i, h.classes.tooltip, !0)
                        }
                }

                function z() {
                    try {
                        return Oe.controls = G(h.selectors.controls.wrapper), Oe.buttons = {}, Oe.buttons.seek = G(h.selectors.buttons.seek), Oe.buttons.play = V(h.selectors.buttons.play), Oe.buttons.pause = G(h.selectors.buttons.pause), Oe.buttons.restart = G(h.selectors.buttons.restart), Oe.buttons.rewind = G(h.selectors.buttons.rewind), Oe.buttons.forward = G(h.selectors.buttons.forward), Oe.buttons.fullscreen = G(h.selectors.buttons.fullscreen), Oe.buttons.mute = G(h.selectors.buttons.mute), Oe.buttons.captions = G(h.selectors.buttons.captions), Oe.progress = {}, Oe.progress.container = G(h.selectors.progress.container), Oe.progress.buffer = {}, Oe.progress.buffer.bar = G(h.selectors.progress.buffer), Oe.progress.buffer.text = Oe.progress.buffer.bar && Oe.progress.buffer.bar.getElementsByTagName("span")[0], Oe.progress.played = G(h.selectors.progress.played), Oe.progress.tooltip = Oe.progress.container && Oe.progress.container.querySelector("." + h.classes.tooltip), Oe.volume = {}, Oe.volume.input = G(h.selectors.volume.input), Oe.volume.display = G(h.selectors.volume.display), Oe.duration = G(h.selectors.duration), Oe.currentTime = G(h.selectors.currentTime), Oe.seekTime = V(h.selectors.seekTime), !0
                    } catch (e) {
                        return C("It looks like there is a problem with your controls HTML"), Q(!0), !1
                    }
                }

                function D() { m(Oe.container, h.selectors.container.replace(".", ""), Oe.supported.full) }

                function Q(e) { e && s(h.types.html5, Oe.type) ? Oe.media.setAttribute("controls", "") : Oe.media.removeAttribute("controls") }

                function j(e) {
                    var t = h.i18n.play;
                    if ("undefined" != typeof h.title && h.title.length && (t += ", " + h.title), Oe.supported.full && Oe.buttons.play)
                        for (var n = Oe.buttons.play.length - 1; n >= 0; n--) Oe.buttons.play[n].setAttribute("aria-label", t);
                    e instanceof HTMLElement && e.setAttribute("title", h.i18n.frameTitle.replace("{title}", h.title))
                }

                function U() {
                    if (!Oe.media) return void C("No media element found!");
                    if (Oe.supported.full && (m(Oe.container, h.classes.type.replace("{0}", Oe.type), !0), s(h.types.embed, Oe.type) && m(Oe.container, h.classes.type.replace("{0}", "video"), !0), m(Oe.container, h.classes.stopped, h.autoplay), m(Oe.container, h.classes.isIos, Oe.browser.isIos), m(Oe.container, h.classes.isTouch, Oe.browser.isTouch), "video" === Oe.type)) {
                        var e = t.createElement("div");
                        e.setAttribute("class", h.classes.videoWrapper), i(Oe.media, e), Oe.videoContainer = e
                    }
                    s(h.types.embed, Oe.type) && (Z(), Oe.embedId = null)
                }

                function Z() {
                    for (var n = t.createElement("div"), r = Oe.embedId, s = Oe.type + "-" + Math.floor(1e4 * Math.random()), o = V('[id^="' + Oe.type + '-"]'), i = o.length - 1; i >= 0; i--) u(o[i]);
                    if (m(Oe.media, h.classes.videoWrapper, !0), m(Oe.media, h.classes.embedWrapper, !0), "youtube" === Oe.type) Oe.media.appendChild(n), n.setAttribute("id", s), "object" == typeof YT ? J(r, n) : (a(h.urls.youtube.api), e.onYouTubeReadyCallbacks = e.onYouTubeReadyCallbacks || [], e.onYouTubeReadyCallbacks.push(function() { J(r, n) }), e.onYouTubeIframeAPIReady = function() { e.onYouTubeReadyCallbacks.forEach(function(e) { e() }) });
                    else if ("vimeo" === Oe.type) {
                        var l = t.createElement("iframe");
                        l.loaded = !1, b(l, "load", function() { l.loaded = !0 }), p(l, { src: "https://player.vimeo.com/video/" + r + "?player_id=" + s + "&api=1&badge=0&byline=0&portrait=0&title=0", id: s, allowfullscreen: "", frameborder: 0 }), Oe.supported.full ? (n.appendChild(l), Oe.media.appendChild(n)) : Oe.media.appendChild(l), "$f" in e || a(h.urls.vimeo.api);
                        var c = e.setInterval(function() { "$f" in e && l.loaded && (e.clearInterval(c), K.call(l)) }, 50)
                    } else if ("soundcloud" === Oe.type) {
                        var d = t.createElement("iframe");
                        d.loaded = !1, b(d, "load", function() { d.loaded = !0 }), p(d, { src: "https://w.soundcloud.com/player/?url=https://api.soundcloud.com/tracks/" + r, id: s }), n.appendChild(d), Oe.media.appendChild(n), e.SC || a(h.urls.soundcloud.api);
                        var A = e.setInterval(function() { e.SC && d.loaded && (e.clearInterval(A), ee.call(d)) }, 50)
                    }
                }

                function $() { Oe.container.plyr.embed = Oe.embed, Oe.supported.full && Be(), j(G("iframe")) }

                function J(t, n) {
                    "timer" in Oe || (Oe.timer = {}), Oe.embed = new YT.Player(n.id, {
                        videoId: t,
                        playerVars: { autoplay: h.autoplay ? 1 : 0, controls: Oe.supported.full ? 0 : 1, rel: 0, showinfo: 0, iv_load_policy: 3, cc_load_policy: h.captions.defaultActive ? 1 : 0, cc_lang_pref: "en", wmode: "transparent", modestbranding: 1, disablekb: 1, origin: "*" },
                        events: {
                            onError: function(e) { k(Oe.container, "error", !0, { code: e.data, embed: e.target }) },
                            onReady: function(t) {
                                var n = t.target;
                                Oe.media.play = function() { n.playVideo(), Oe.media.paused = !1 }, Oe.media.pause = function() { n.pauseVideo(), Oe.media.paused = !0 }, Oe.media.stop = function() { n.stopVideo(), Oe.media.paused = !0 }, Oe.media.duration = n.getDuration(), Oe.media.paused = !0, Oe.media.currentTime = n.getCurrentTime(), Oe.media.muted = n.isMuted(), h.title = n.getVideoData().title, k(Oe.media, "timeupdate"), e.clearInterval(Oe.timer.buffering), Oe.timer.buffering = e.setInterval(function() { Oe.media.buffered = n.getVideoLoadedFraction(), k(Oe.media, "progress"), 1 === Oe.media.buffered && (e.clearInterval(Oe.timer.buffering), k(Oe.media, "canplaythrough")) }, 200), $(), xe()
                            },
                            onStateChange: function(t) {
                                var n = t.target;
                                switch (e.clearInterval(Oe.timer.playing), t.data) {
                                    case 0:
                                        Oe.media.paused = !0, k(Oe.media, "ended");
                                        break;
                                    case 1:
                                        Oe.media.paused = !1, Oe.media.seeking = !1, k(Oe.media, "play"), k(Oe.media, "playing"), Oe.timer.playing = e.setInterval(function() { Oe.media.currentTime = n.getCurrentTime(), k(Oe.media, "timeupdate") }, 100);
                                        break;
                                    case 2:
                                        Oe.media.paused = !0, k(Oe.media, "pause")
                                }
                                k(Oe.container, "statechange", !1, { code: t.data })
                            }
                        }
                    })
                }

                function K() { Oe.embed = $f(this), Oe.embed.addEvent("ready", function() { Oe.media.play = function() { Oe.embed.api("play"), Oe.media.paused = !1 }, Oe.media.pause = function() { Oe.embed.api("pause"), Oe.media.paused = !0 }, Oe.media.stop = function() { Oe.embed.api("stop"), Oe.media.paused = !0 }, Oe.media.paused = !0, Oe.media.currentTime = 0, $(), Oe.embed.api("getCurrentTime", function(e) { Oe.media.currentTime = e, k(Oe.media, "timeupdate") }), Oe.embed.api("getDuration", function(e) { Oe.media.duration = e, xe() }), Oe.embed.addEvent("play", function() { Oe.media.paused = !1, k(Oe.media, "play"), k(Oe.media, "playing") }), Oe.embed.addEvent("pause", function() { Oe.media.paused = !0, k(Oe.media, "pause") }), Oe.embed.addEvent("playProgress", function(e) { Oe.media.seeking = !1, Oe.media.currentTime = e.seconds, k(Oe.media, "timeupdate") }), Oe.embed.addEvent("loadProgress", function(e) { Oe.media.buffered = e.percent, k(Oe.media, "progress"), 1 === parseInt(e.percent) && k(Oe.media, "canplaythrough") }), Oe.embed.addEvent("finish", function() { Oe.media.paused = !0, k(Oe.media, "ended") }), h.autoplay && Oe.embed.api("play") }) }

                function ee() { Oe.embed = e.SC.Widget(this), Oe.embed.bind(e.SC.Widget.Events.READY, function() { Oe.media.play = function() { Oe.embed.play(), Oe.media.paused = !1 }, Oe.media.pause = function() { Oe.embed.pause(), Oe.media.paused = !0 }, Oe.media.stop = function() { Oe.embed.seekTo(0), Oe.embed.pause(), Oe.media.paused = !0 }, Oe.media.paused = !0, Oe.media.currentTime = 0, $(), Oe.embed.getPosition(function(e) { Oe.media.currentTime = e, k(Oe.media, "timeupdate") }), Oe.embed.getDuration(function(e) { Oe.media.duration = e / 1e3, xe() }), Oe.embed.bind(e.SC.Widget.Events.PLAY, function() { Oe.media.paused = !1, k(Oe.media, "play"), k(Oe.media, "playing") }), Oe.embed.bind(e.SC.Widget.Events.PAUSE, function() { Oe.media.paused = !0, k(Oe.media, "pause") }), Oe.embed.bind(e.SC.Widget.Events.PLAY_PROGRESS, function(e) { Oe.media.seeking = !1, Oe.media.currentTime = e.currentPosition / 1e3, k(Oe.media, "timeupdate") }), Oe.embed.bind(e.SC.Widget.Events.LOAD_PROGRESS, function(e) { Oe.media.buffered = e.loadProgress, k(Oe.media, "progress"), 1 === parseInt(e.loadProgress) && k(Oe.media, "canplaythrough") }), Oe.embed.bind(e.SC.Widget.Events.FINISH, function() { Oe.media.paused = !0, k(Oe.media, "ended") }), h.autoplay && Oe.embed.play() }) }

                function te() { "play" in Oe.media && Oe.media.play() }

                function ne() { "pause" in Oe.media && Oe.media.pause() }

                function re(e) { e === !0 ? te() : e === !1 ? ne() : Oe.media[Oe.media.paused ? "play" : "pause"]() }

                function ae(e) { "number" != typeof e && (e = h.seekTime), oe(Oe.media.currentTime - e) }

                function se(e) { "number" != typeof e && (e = h.seekTime), oe(Oe.media.currentTime + e) }

                function oe(e) {
                    var t = 0,
                        n = Oe.media.paused,
                        r = ie();
                    "number" == typeof e ? t = e : e.type && s(["input", "change"], e.type) && (t = e.target.value / e.target.max * r), 0 > t ? t = 0 : t > r && (t = r), Ee(t);
                    try { Oe.media.currentTime = t.toFixed(4) } catch (a) {}
                    if (s(h.types.embed, Oe.type)) {
                        switch (Oe.type) {
                            case "youtube":
                                Oe.embed.seekTo(t);
                                break;
                            case "vimeo":
                                Oe.embed.api("seekTo", t.toFixed(0));
                                break;
                            case "soundcloud":
                                Oe.embed.seekTo(1e3 * t)
                        }
                        n && ne(), k(Oe.media, "timeupdate"), Oe.media.seeking = !0
                    }
                    T("Seeking to " + Oe.media.currentTime + " seconds"), O(t)
                }

                function ie() {
                    var e = parseInt(h.duration),
                        t = 0;
                    return null === Oe.media.duration || isNaN(Oe.media.duration) || (t = Oe.media.duration), isNaN(e) ? t : e
                }

                function le() { m(Oe.container, h.classes.playing, !Oe.media.paused), m(Oe.container, h.classes.stopped, Oe.media.paused), Ce(Oe.media.paused) }

                function ue() { N = { x: e.pageXOffset || 0, y: e.pageYOffset || 0 } }

                function ce() { e.scrollTo(N.x, N.y) }

                function pe(e) {
                    var n = M.supportsFullScreen;
                    e && e.type === M.fullScreenEventName ? Oe.isFullscreen = M.isFullScreen(Oe.container) : n ? (M.isFullScreen(Oe.container) ? M.cancelFullScreen() : (ue(), M.requestFullScreen(Oe.container)), Oe.isFullscreen = M.isFullScreen(Oe.container)) : (Oe.isFullscreen = !Oe.isFullscreen, Oe.isFullscreen ? (b(t, "keyup", de), t.body.style.overflow = "hidden") : (v(t, "keyup", de), t.body.style.overflow = "")), m(Oe.container, h.classes.fullscreen.active, Oe.isFullscreen), Oe.isFullscreen ? Oe.container.setAttribute("tabindex", "-1") : Oe.container.removeAttribute("tabindex"), Y(Oe.isFullscreen), w(Oe.buttons.fullscreen, Oe.isFullscreen), k(Oe.container, Oe.isFullscreen ? "enterfullscreen" : "exitfullscreen", !0), !Oe.isFullscreen && n && ce()
                }

                function de(e) { 27 === (e.which || e.charCode || e.keyCode) && Oe.isFullscreen && pe() }

                function Ae(e) {
                    if ("boolean" != typeof e && (e = !Oe.media.muted), w(Oe.buttons.mute, e), Oe.media.muted = e, 0 === Oe.media.volume && me(h.volume), s(h.types.embed, Oe.type)) {
                        switch (Oe.type) {
                            case "youtube":
                                Oe.embed[Oe.media.muted ? "mute" : "unMute"]();
                                break;
                            case "vimeo":
                                Oe.embed.api("setVolume", Oe.media.muted ? 0 : parseFloat(h.volume / h.volumeMax));
                                break;
                            case "soundcloud":
                                Oe.embed.setVolume(Oe.media.muted ? 0 : parseFloat(h.volume / h.volumeMax))
                        }
                        k(Oe.media, "volumechange")
                    }
                }

                function me(t) {
                    var n = h.volumeMax,
                        r = h.volumeMin;
                    if ("undefined" == typeof t && (t = h.volume, h.storage.enabled && _().supported && (t = e.localStorage.getItem(h.storage.key), e.localStorage.removeItem("plyr-volume"))), (null === t || isNaN(t)) && (t = h.volume), t > n && (t = n), r > t && (t = r), Oe.media.volume = parseFloat(t / n), Oe.volume.display && (Oe.volume.display.value = t), s(h.types.embed, Oe.type)) {
                        switch (Oe.type) {
                            case "youtube":
                                Oe.embed.setVolume(100 * Oe.media.volume);
                                break;
                            case "vimeo":
                                Oe.embed.api("setVolume", Oe.media.volume);
                                break;
                            case "soundcloud":
                                Oe.embed.setVolume(Oe.media.volume)
                        }
                        k(Oe.media, "volumechange")
                    }
                    Oe.media.muted && t > 0 && Ae()
                }

                function fe() {
                    var e = Oe.media.muted ? 0 : Oe.media.volume * h.volumeMax;
                    me(e + h.volumeStep / 5)
                }

                function ye() {
                    var e = Oe.media.muted ? 0 : Oe.media.volume * h.volumeMax;
                    me(e - h.volumeStep / 5)
                }

                function be() {
                    var t = Oe.media.muted ? 0 : Oe.media.volume * h.volumeMax;
                    Oe.supported.full && (Oe.volume.input && (Oe.volume.input.value = t), Oe.volume.display && (Oe.volume.display.value = t)), h.storage.enabled && _().supported && !isNaN(t) && e.localStorage.setItem(h.storage.key, t), m(Oe.container, h.classes.muted, 0 === t), Oe.supported.full && Oe.buttons.mute && w(Oe.buttons.mute, 0 === t)
                }

                function ve(e) { Oe.supported.full && Oe.buttons.captions && ("boolean" != typeof e && (e = -1 === Oe.container.className.indexOf(h.classes.captions.active)), Oe.captionsEnabled = e, w(Oe.buttons.captions, Oe.captionsEnabled), m(Oe.container, h.classes.captions.active, Oe.captionsEnabled), k(Oe.container, Oe.captionsEnabled ? "captionsenabled" : "captionsdisabled", !0)) }

                function ge(e) {
                    var t = "waiting" === e.type;
                    clearTimeout(Oe.timers.loading), Oe.timers.loading = setTimeout(function() { m(Oe.container, h.classes.loading, t) }, t ? 250 : 0)
                }

                function he(e) {
                    if (Oe.supported.full) {
                        var t = Oe.progress.played,
                            n = 0,
                            r = ie();
                        if (e) switch (e.type) {
                            case "timeupdate":
                            case "seeking":
                                if (Oe.controls.pressed) return;
                                n = x(Oe.media.currentTime, r), "timeupdate" == e.type && Oe.buttons.seek && (Oe.buttons.seek.value = n);
                                break;
                            case "playing":
                            case "progress":
                                t = Oe.progress.buffer, n = function() {
                                    var e = Oe.media.buffered;
                                    return e && e.length ? x(e.end(0), r) : "number" == typeof e ? 100 * e : 0
                                }()
                        }
                        ke(t, n)
                    }
                }

                function ke(e, t) {
                    if (Oe.supported.full) {
                        if ("undefined" == typeof t && (t = 0), "undefined" == typeof e) {
                            if (!Oe.progress || !Oe.progress.buffer) return;
                            e = Oe.progress.buffer
                        }
                        e instanceof HTMLElement ? e.value = t : e && (e.bar && (e.bar.value = t), e.text && (e.text.innerHTML = t))
                    }
                }

                function we(e, t) {
                    if (t) {
                        isNaN(e) && (e = 0), Oe.secs = parseInt(e % 60), Oe.mins = parseInt(e / 60 % 60), Oe.hours = parseInt(e / 60 / 60 % 60);
                        var n = parseInt(ie() / 60 / 60 % 60) > 0;
                        Oe.secs = ("0" + Oe.secs).slice(-2), Oe.mins = ("0" + Oe.mins).slice(-2), t.innerHTML = (n ? Oe.hours + ":" : "") + Oe.mins + ":" + Oe.secs
                    }
                }

                function xe() {
                    if (Oe.supported.full) {
                        var e = ie() || 0;
                        !Oe.duration && h.displayDuration && Oe.media.paused && we(e, Oe.currentTime), Oe.duration && we(e, Oe.duration), _e()
                    }
                }

                function Te(e) { we(Oe.media.currentTime, Oe.currentTime), e && "timeupdate" == e.type && Oe.media.seeking || he(e) }

                function Ee(e) {
                    "number" != typeof e && (e = 0);
                    var t = ie(),
                        n = x(e, t);
                    Oe.progress && Oe.progress.played && (Oe.progress.played.value = n), Oe.buttons && Oe.buttons.seek && (Oe.buttons.seek.value = n)
                }

                function _e(e) {
                    var t = ie();
                    if (h.tooltips.seek && Oe.progress.container && 0 !== t) {
                        var n = Oe.progress.container.getBoundingClientRect(),
                            r = 0,
                            a = h.classes.tooltip + "--visible";
                        if (e) r = 100 / n.width * (e.pageX - n.left);
                        else {
                            if (!f(Oe.progress.tooltip, a)) return;
                            r = Oe.progress.tooltip.style.left.replace("%", "")
                        }
                        0 > r ? r = 0 : r > 100 && (r = 100), we(t / 100 * r, Oe.progress.tooltip), Oe.progress.tooltip.style.left = r + "%", e && s(["mouseenter", "mouseleave"], e.type) && m(Oe.progress.tooltip, a, "mouseenter" === e.type)
                    }
                }

                function Ce(t) {
                    if (h.hideControls && "audio" !== Oe.type) {
                        var n = 0,
                            r = !1,
                            a = t;
                        if ("boolean" != typeof t && (t && t.type ? (r = "enterfullscreen" === t.type, a = s(["mousemove", "touchstart", "mouseenter", "focus"], t.type), s(["mousemove", "touchmove"], t.type) && (n = 2e3), "focus" === t.type && (n = 3e3)) : a = f(Oe.container, h.classes.hideControls)), e.clearTimeout(Oe.timers.hover), a || Oe.media.paused) {
                            if (m(Oe.container, h.classes.hideControls, !1), Oe.media.paused) return;
                            Oe.browser.isTouch && (n = 3e3)
                        }
                        a && Oe.media.paused || (Oe.timers.hover = e.setTimeout(function() {
                            (!Oe.controls.pressed && !Oe.controls.hover || r) && m(Oe.container, h.classes.hideControls, !0)
                        }, n))
                    }
                }

                function Se(e) {
                    if ("undefined" != typeof e) return void Fe(e);
                    var t;
                    switch (Oe.type) {
                        case "youtube":
                            t = Oe.embed.getVideoUrl();
                            break;
                        case "vimeo":
                            Oe.embed.api("getVideoUrl", function(e) { t = e });
                            break;
                        case "soundcloud":
                            Oe.embed.getCurrentSound(function(e) { t = e.permalink_url });
                            break;
                        default:
                            t = Oe.media.currentSrc
                    }
                    return t || ""
                }

                function Fe(n) {
                    if (!("undefined" != typeof n && "sources" in n && n.sources.length)) return void C("Invalid source format");
                    if (ne(), Ee(), ke(), Pe(), "youtube" === Oe.type ? (Oe.embed.destroy(), e.clearInterval(Oe.timer.buffering), e.clearInterval(Oe.timer.playing)) : "video" === Oe.type && Oe.videoContainer && u(Oe.videoContainer), Oe.embed = null, u(Oe.media), "type" in n && (Oe.type = n.type, "video" === Oe.type)) {
                        var r = n.sources[0];
                        "type" in r && s(h.types.embed, r.type) && (Oe.type = r.type)
                    }
                    switch (Oe.supported = F(Oe.type), Oe.type) {
                        case "video":
                            Oe.media = t.createElement("video");
                            break;
                        case "audio":
                            Oe.media = t.createElement("audio");
                            break;
                        case "youtube":
                        case "vimeo":
                        case "soundcloud":
                            Oe.media = t.createElement("div"), Oe.embedId = n.sources[0].src
                    }
                    c(Oe.container, Oe.media), "undefined" != typeof n.autoplay && (h.autoplay = n.autoplay), s(h.types.html5, Oe.type) && (h.crossorigin && Oe.media.setAttribute("crossorigin", ""), h.autoplay && Oe.media.setAttribute("autoplay", ""), "poster" in n && Oe.media.setAttribute("poster", n.poster), h.loop && Oe.media.setAttribute("loop", "")), Oe.container.className = Oe.originalClassName, m(Oe.container, h.classes.fullscreen.active, Oe.isFullscreen), m(Oe.container, h.classes.captions.active, Oe.captionsEnabled), D(), s(h.types.html5, Oe.type) && q("source", n.sources), U(), s(h.types.html5, Oe.type) ? ("tracks" in n && q("track", n.tracks), Oe.media.load(), Be(), xe()) : s(h.types.embed, Oe.type) && !Oe.supported.full && Be(), h.title = n.title, j(), Oe.container.plyr.media = Oe.media
                }

                function Ie(e) { "video" === Oe.type && Oe.media.setAttribute("poster", e) }

                function Me() {
                    function n() {
                        var e = Oe.media.paused;
                        e ? te() : ne();
                        var t = Oe.buttons[e ? "play" : "pause"],
                            n = Oe.buttons[e ? "pause" : "play"];
                        if (n = n && n.length > 1 ? n[n.length - 1] : n[0]) {
                            var r = f(t, h.classes.tabFocus);
                            setTimeout(function() { n.focus(), r && (m(t, h.classes.tabFocus, !1), m(n, h.classes.tabFocus, !0)) }, 100)
                        }
                    }

                    function r() {
                        var e = t.activeElement;
                        e && e != t.body ? t.querySelector && (e = t.querySelector(":focus")) : e = null;
                        for (var n in Oe.buttons) {
                            var r = Oe.buttons[n];
                            if (r instanceof NodeList)
                                for (var a = 0; a < r.length; a++) m(r[a], h.classes.tabFocus, r[a] === e);
                            else m(r, h.classes.tabFocus, r === e)
                        }
                    }
                    var a = Oe.browser.isIE ? "change" : "input";
                    b(e, "keyup", function(e) {
                        var t = e.keyCode ? e.keyCode : e.which;
                        9 == t && r()
                    }), b(t.body, "click", function() { m(G("." + h.classes.tabFocus), h.classes.tabFocus, !1) });
                    for (var o in Oe.buttons) {
                        var i = Oe.buttons[o];
                        b(i, "blur", function() { m(i, "tab-focus", !1) })
                    }
                    g(Oe.buttons.play, "click", h.listeners.play, n), g(Oe.buttons.pause, "click", h.listeners.pause, n), g(Oe.buttons.restart, "click", h.listeners.restart, oe), g(Oe.buttons.rewind, "click", h.listeners.rewind, ae), g(Oe.buttons.forward, "click", h.listeners.forward, se), g(Oe.buttons.seek, a, h.listeners.seek, oe), g(Oe.volume.input, a, h.listeners.volume, function() { me(Oe.volume.input.value) }), g(Oe.buttons.mute, "click", h.listeners.mute, Ae), g(Oe.buttons.fullscreen, "click", h.listeners.fullscreen, pe), M.supportsFullScreen && b(t, M.fullScreenEventName, pe), b(Oe.buttons.captions, "click", ve), b(Oe.progress.container, "mouseenter mouseleave mousemove", _e), h.hideControls && (b(Oe.container, "mouseenter mouseleave mousemove touchstart touchend touchcancel touchmove enterfullscreen", Ce), b(Oe.controls, "mouseenter mouseleave", function(e) { Oe.controls.hover = "mouseenter" === e.type }), b(Oe.controls, "mousedown mouseup touchstart touchend touchcancel", function(e) { Oe.controls.pressed = s(["mousedown", "touchstart"], e.type) }), b(Oe.controls, "focus blur", Ce, !0)), b(Oe.volume.input, "wheel", function(e) {
                        e.preventDefault();
                        var t = e.webkitDirectionInvertedFromDevice;
                        (e.deltaY < 0 || e.deltaX > 0) && (t ? ye() : fe()), (e.deltaY > 0 || e.deltaX < 0) && (t ? fe() : ye())
                    })
                }

                function Ne() {
                    if (b(Oe.media, "timeupdate seeking", Te), b(Oe.media, "timeupdate", O), b(Oe.media, "durationchange loadedmetadata", xe), b(Oe.media, "ended", function() { "video" === Oe.type && B(), le(), oe(0), xe(), "video" === Oe.type && h.showPosterOnEnd && Oe.media.load() }), b(Oe.media, "progress playing", he), b(Oe.media, "volumechange", be), b(Oe.media, "play pause", le), b(Oe.media, "waiting canplay seeked", ge), h.clickToPlay && "audio" !== Oe.type) {
                        var e = G("." + h.classes.videoWrapper);
                        if (!e) return;
                        e.style.cursor = "pointer", b(e, "click", function() { Oe.browser.isTouch && !Oe.media.paused || (Oe.media.paused ? te() : Oe.media.ended ? (oe(), te()) : ne()) })
                    }
                    h.disableContextMenu && b(Oe.media, "contextmenu", function(e) { e.preventDefault() }), b(Oe.media, h.events.join(" "), function(e) { k(Oe.container, e.type, !0) })
                }

                function Pe() {
                    if (s(h.types.html5, Oe.type)) {
                        for (var e = Oe.media.querySelectorAll("source"), t = 0; t < e.length; t++) u(e[t]);
                        Oe.media.setAttribute("src", "data:video/mp4;base64,AAAAHGZ0eXBpc29tAAACAGlzb21pc28ybXA0MQAAAAhmcmVlAAAAGm1kYXQAAAGzABAHAAABthBgUYI9t+8AAAMNbW9vdgAAAGxtdmhkAAAAAMXMvvrFzL76AAAD6AAAACoAAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAABhpb2RzAAAAABCAgIAHAE/////+/wAAAiF0cmFrAAAAXHRraGQAAAAPxcy++sXMvvoAAAABAAAAAAAAACoAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAgAAAAIAAAAAAG9bWRpYQAAACBtZGhkAAAAAMXMvvrFzL76AAAAGAAAAAEVxwAAAAAALWhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABWaWRlb0hhbmRsZXIAAAABaG1pbmYAAAAUdm1oZAAAAAEAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAShzdGJsAAAAxHN0c2QAAAAAAAAAAQAAALRtcDR2AAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAgACABIAAAASAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGP//AAAAXmVzZHMAAAAAA4CAgE0AAQAEgICAPyARAAAAAAMNQAAAAAAFgICALQAAAbABAAABtYkTAAABAAAAASAAxI2IAMUARAEUQwAAAbJMYXZjNTMuMzUuMAaAgIABAgAAABhzdHRzAAAAAAAAAAEAAAABAAAAAQAAABxzdHNjAAAAAAAAAAEAAAABAAAAAQAAAAEAAAAUc3RzegAAAAAAAAASAAAAAQAAABRzdGNvAAAAAAAAAAEAAAAsAAAAYHVkdGEAAABYbWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAbWRpcmFwcGwAAAAAAAAAAAAAAAAraWxzdAAAACOpdG9vAAAAG2RhdGEAAAABAAAAAExhdmY1My4yMS4x"), Oe.media.load(), T("Cancelled network requests for old media")
                    }
                }

                function Re() {
                    if (!Oe.init) return null;
                    if (Oe.container.setAttribute("class", A(h.selectors.container)), Oe.init = !1, u(G(h.selectors.controls.wrapper)), "youtube" === Oe.type) return void Oe.embed.destroy();
                    "video" === Oe.type && (u(G(h.selectors.captions)), l(Oe.videoContainer)), Q(!0);
                    var e = Oe.media.cloneNode(!0);
                    Oe.media.parentNode.replaceChild(e, Oe.media)
                }

                function Le() {
                    if (Oe.init) return null;
                    if (M = E(), Oe.browser = n(), Oe.media = Oe.container.querySelectorAll("audio, video")[0], Oe.media || (Oe.media = Oe.container.querySelectorAll("[data-type]")[0]), Oe.media) {
                        Oe.originalClassName = Oe.container.className;
                        var e = Oe.media.tagName.toLowerCase();
                        if ("div" === e ? (Oe.type = Oe.media.getAttribute("data-type"), Oe.embedId = Oe.media.getAttribute("data-video-id"), Oe.media.removeAttribute("data-type"), Oe.media.removeAttribute("data-video-id")) : (Oe.type = e, h.crossorigin = null !== Oe.media.getAttribute("crossorigin"), h.autoplay = h.autoplay || null !== Oe.media.getAttribute("autoplay"), h.loop = h.loop || null !== Oe.media.getAttribute("loop")), Oe.supported = F(Oe.type), D(), !Oe.supported.basic) return !1;
                        if (T(Oe.browser.name + " " + Oe.browser.version), U(), s(h.types.html5, Oe.type)) {
                            if (!Oe.supported.full) return void(Oe.init = !0);
                            Be(), j(), h.autoplay && te()
                        } else s(h.types.embed, Oe.type) && !Oe.supported.full && Be();
                        Oe.init = !0
                    }
                }

                function Be() {
                    if (!Oe.supported.full) return C("No full support for this media type (" + Oe.type + ")"), u(G(h.selectors.controls.wrapper)), u(G(h.selectors.buttons.play)), void Q(!0);
                    var e = !V(h.selectors.controls.wrapper).length;
                    e && X(), z() && (e && Me(), Ne(), Q(), R(), L(), me(), be(), Te(), le(), xe(), k(Oe.container, "ready", !0))
                }
                var Oe = this;
                return Oe.container = y, Oe.timers = {}, T(h), Le(), Oe.init ? {
                    media: Oe.media,
                    play: te,
                    pause: ne,
                    restart: oe,
                    rewind: ae,
                    forward: se,
                    seek: oe,
                    source: Se,
                    poster: Ie,
                    setVolume: me,
                    togglePlay: re,
                    toggleMute: Ae,
                    toggleCaptions: ve,
                    toggleFullscreen: pe,
                    toggleControls: Ce,
                    isFullscreen: function() {
                        return Oe.isFullscreen || !1
                    },
                    support: function(e) {
                        return r(Oe, e)
                    },
                    destroy: Re,
                    restore: Le
                } : {}
            }

            function S(e, n) {
                var r = new XMLHttpRequest;
                "string" == typeof n && null !== t.querySelector("#" + n) || "withCredentials" in r && (r.open("GET", e, !0), r.onload = function() {
                    var e = t.createElement("div");
                    e.setAttribute("hidden", ""), "string" == typeof n && e.setAttribute("id", n), e.innerHTML = r.responseText, t.body.insertBefore(e, t.body.childNodes[0])
                }, r.send())
            }

            function F(e) {
                var r, a, s = n(),
                    o = s.isIE && s.version <= 9,
                    i = s.isIos,
                    l = /iPhone|iPod/i.test(navigator.userAgent),
                    u = !!t.createElement("audio").canPlayType,
                    c = !!t.createElement("video").canPlayType;
                switch (e) {
                    case "video":
                        r = c, a = r && !o && !l;
                        break;
                    case "audio":
                        r = u, a = r && !o;
                        break;
                    case "vimeo":
                    case "youtube":
                    case "soundcloud":
                        r = !0, a = !o && !i;
                        break;
                    default:
                        r = u && c, a = r && !o
                }
                return { basic: r, full: a }
            }

            function I(e, n) {
                var r = [],
                    a = [],
                    s = [P.selectors.html5, P.selectors.embed].join(",");
                if ("string" == typeof e ? e = t.querySelectorAll(e) : e instanceof HTMLElement ? e = [e] : e instanceof NodeList || "string" == typeof e || ("undefined" == typeof n && "object" == typeof e && (n = e), e = t.querySelectorAll(s)), !F().basic || !e.length) return !1;
                e instanceof NodeList && (e = Array.prototype.slice.call(e));
                for (var o = 0; o < e.length; o++) {
                    var l = e[o],
                        u = l.querySelectorAll(s);
                    if (u.length > 1)
                        for (var c = 0; c < u.length; c++) a.push({ element: i(u[c], t.createElement("div")), original: l });
                    else a.push({ element: l })
                }
                for (var p in a) {
                    var d = a[p].element,
                        A = a[p].original || d;
                    if (y(d, s) && (d = i(d, t.createElement("div"))), !("plyr" in d)) {
                        var m = T({}, P, n, JSON.parse(A.getAttribute("data-plyr")));
                        if (!m.enabled) return null;
                        var f = new C(d, m);
                        d.plyr = Object.keys(f).length ? f : !1, k(A, "setup", !0, { plyr: d.plyr })
                    }
                    r.push(d)
                }
                return r
            }
            var M, N = { x: 0, y: 0 },
                P = { enabled: !0, debug: !1, autoplay: !1, loop: !1, seekTime: 10, volume: 5, volumeMin: 0, volumeMax: 10, volumeStep: 1, duration: null, displayDuration: !0, loadSprite: !0, iconPrefix: "plyr", iconUrl: "https://cdn.plyr.io/1.8.6/plyr.svg", clickToPlay: !0, hideControls: !0, showPosterOnEnd: !1, disableContextMenu: !0, tooltips: { controls: !1, seek: !0 }, selectors: { html5: "video, audio", embed: "[data-type]", container: ".plyr", controls: { container: null, wrapper: ".plyr__controls" }, labels: "[data-plyr]", buttons: { seek: '[data-plyr="seek"]', play: '[data-plyr="play"]', pause: '[data-plyr="pause"]', restart: '[data-plyr="restart"]', rewind: '[data-plyr="rewind"]', forward: '[data-plyr="fast-forward"]', mute: '[data-plyr="mute"]', captions: '[data-plyr="captions"]', fullscreen: '[data-plyr="fullscreen"]' }, volume: { input: '[data-plyr="volume"]', display: ".plyr__volume--display" }, progress: { container: ".plyr__progress", buffer: ".plyr__progress--buffer", played: ".plyr__progress--played" }, captions: ".plyr__captions", currentTime: ".plyr__time--current", duration: ".plyr__time--duration" }, classes: { videoWrapper: "plyr__video-wrapper", embedWrapper: "plyr__video-embed", type: "plyr--{0}", stopped: "plyr--stopped", playing: "plyr--playing", muted: "plyr--muted", loading: "plyr--loading", hover: "plyr--hover", tooltip: "plyr__tooltip", hidden: "plyr__sr-only", hideControls: "plyr--hide-controls", isIos: "plyr--is-ios", isTouch: "plyr--is-touch", captions: { enabled: "plyr--captions-enabled", active: "plyr--captions-active" }, fullscreen: { enabled: "plyr--fullscreen-enabled", active: "plyr--fullscreen-active" }, tabFocus: "tab-focus" }, captions: { defaultActive: !1 }, fullscreen: { enabled: !0, fallback: !0, allowAudio: !1 }, storage: { enabled: !0, key: "plyr" }, controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "captions", "fullscreen"], i18n: { restart: "Restart", rewind: "Rewind {seektime} secs", play: "Play", pause: "Pause", forward: "Forward {seektime} secs", played: "played", buffered: "buffered", currentTime: "Current time", duration: "Duration", volume: "Volume", toggleMute: "Toggle Mute", toggleCaptions: "Toggle Captions", toggleFullscreen: "Toggle Fullscreen", frameTitle: "Player for {title}" }, types: { embed: ["youtube", "vimeo", "soundcloud"], html5: ["video", "audio"] }, urls: { vimeo: { api: "https://cdn.plyr.io/froogaloop/1.0.1/plyr.froogaloop.js" }, youtube: { api: "https://www.youtube.com/iframe_api" }, soundcloud: { api: "https://w.soundcloud.com/player/api.js" } }, listeners: { seek: null, play: null, pause: null, restart: null, rewind: null, forward: null, mute: null, volume: null, captions: null, fullscreen: null }, events: ["ended", "progress", "stalled", "playing", "waiting", "canplay", "canplaythrough", "loadstart", "loadeddata", "loadedmetadata", "timeupdate", "volumechange", "play", "pause", "error", "seeking", "emptied"] };
            return { setup: I, supported: F, loadSprite: S }
        }),
        function() {
            function e(e, t) {
                t = t || { bubbles: !1, cancelable: !1, detail: void 0 };
                var n = document.createEvent("CustomEvent");
                return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n
            }
            return "function" == typeof window.CustomEvent ? !1 : (e.prototype = window.Event.prototype, void(window.CustomEvent = e))
        }();
        // End
        videoPlayer.initvideoPlayer();
    }
}

// Register self to the framework
videoPlayer.registerComponent();
