function t_lazyload_update() { "undefined" != typeof lazyload_cover && lazyload_cover.update(), "undefined" != typeof lazyload_img && lazyload_img.update(), "undefined" != typeof lazyload_bgimg && lazyload_bgimg.update(), "undefined" != typeof lazyload_iframe && lazyload_iframe.update() } function t_lazyload_updateResize_elem(e) { if (window.jQuery && e instanceof jQuery) { if (0 == e.length) return; e = e.get(0) } var t, o, n, i, l, a, s; null != e && (s = "IMG" == (t = e.tagName) ? (o = e.getAttribute("src"), "-/resize/") : "undefined" != typeof getComputedStyle ? (o = getComputedStyle(e)["background-image"].replace("url(", "").replace(")", "").replace(/"/gi, ""), "contain" == getComputedStyle(e)["background-size"] ? "-/contain/" : "-/cover/") : "-/cover/", null == o || -1 === o.indexOf(s) || 0 < o.indexOf(".svg") || 0 < o.indexOf(".gif") || 0 < o.indexOf(".ico") || -1 === o.indexOf("thumb.tildacdn.com") || 0 < o.indexOf("-/empty/") && 0 < o.indexOf("-/resizeb/") || (s = o.indexOf(s) + s.length, n = o.indexOf("/", s), 0 < s && 0 < n && (i = o.slice(s, n).split("x"), l = e.clientWidth, a = e.clientHeight, 0 < l && 0 < a && (0 < i[0] || 0 < i[1]) && (0 < i[0] && l > i[0] || 0 < i[1] && a > i[1]) && (0 < i[0] && 100 < l - i[0] || 0 < i[1] && 100 < a - i[1]) && (s = o.slice(0, s) + (0 < i[0] ? l : "") + "x" + (0 < i[1] ? a : "") + o.substring(n), "IMG" == t ? e.setAttribute("src", s) : e.style.backgroundImage = "url('" + s + "')")))) } !function (e, t) { "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? module.exports = t() : e.LazyLoad = t() }(this, function () { function i(e, t, o) { var n; h ? e.addEventListener(t, o) : _ && e.attachEvent("on" + t, (n = e, function () { o.call(n, window.event) })) } function l(e, t, o) { h ? e.removeEventListener(t, o) : _ && e.detachEvent("on" + t, o) } function a(e, t, o) { var n, i, l; function a() { return window.innerWidth || n.documentElement.clientWidth || document.body.clientWidth } function s(e) { return e.getBoundingClientRect().top + i - n.documentElement.clientTop } function r(e) { return e.getBoundingClientRect().left + l - n.documentElement.clientLeft } return n = e.ownerDocument, i = window.pageYOffset || n.body.scrollTop, l = window.pageXOffset || n.body.scrollLeft, "fixed" === e.getAttribute("data-content-cover-parallax") && e.closest && e.closest(".t-cover__container") && (e = e.closest(".t-cover__container")), !((t === window ? (window.innerHeight || n.documentElement.clientHeight || document.body.clientHeight) + i : s(t) + t.offsetHeight) <= s(e) - o || (t === window ? i : s(t)) >= s(e) + 1200 + e.offsetHeight || (t === window ? a() + window.pageXOffset : r(t) + a()) <= r(e) - o || (t === window ? l : r(t)) >= r(e) + o + e.offsetWidth) } function n() { return (new Date).getTime() } function s(e, t) { for (var o = []; (e = e.parentNode) && e !== document;)t && !e.matches(t) || o.unshift(e); return o } function r(e, t) { o ? e.classList.add(t) : e.className += (e.className ? " " : "") + t } function c(e, t) { o ? e.classList.remove(t) : e.className = e.className.replace(new RegExp("(^|\\s+)" + t + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, "") } function d(e, t, o, n) { n = t.getAttribute("data-" + n), t = t.getAttribute("data-" + o), o = e.tagName; "IMG" === o ? (t && e.setAttribute("srcset", t), n && e.setAttribute("src", n)) : "IFRAME" === o ? n && e.setAttribute("src", n) : e.style.backgroundImage = "url(" + n + ")" } function u(e, t) { return function () { return e.apply(t, arguments) } } function e(e) { p || (t = { elements_selector: "img", container: window, threshold: 300, throttle: 50, data_src: "original", data_srcset: "original-set", class_loading: "loading", class_loaded: "loaded", skip_invisible: !0, show_while_loading: !0, callback_load: null, callback_error: null, callback_set: null, callback_processed: null, placeholder: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" }, h = !!window.addEventListener, _ = !!window.attachEvent, o = !!document.body.classList, p = !0), this._settings = function (e, t) { var o, n = {}; for (o in e) e.hasOwnProperty(o) && (n[o] = e[o]); for (o in t) t.hasOwnProperty(o) && (n[o] = t[o]); return n }(t, e), this._queryOriginNode = this._settings.container === window ? document : this._settings.container, this._previousLoopTime = 0, this._loopTimeout = null, this._handleScrollFn = u(this.handleScroll, this), i(window, "resize", this._handleScrollFn), this.update() } var t, h, _, o, p = !1; return e.prototype._showOnLoad = function (t) { var o, n = this._settings; t.getAttribute("src") || t.setAttribute("src", n.placeholder), i(o = document.createElement("img"), "load", function e() { null !== n && (n.callback_load && n.callback_load(t), d(t, t, n.data_srcset, n.data_src), n.callback_set && n.callback_set(t), c(t, n.class_loading), r(t, n.class_loaded), l(o, "load", e)) }), i(o, "error", function () { c(t, n.class_loading), n.callback_error && n.callback_error(t) }), r(t, n.class_loading), d(o, t, n.data_srcset, n.data_src) }, e.prototype._showOnAppear = function (e) { function t() { null !== o && (o.callback_load && o.callback_load(e), c(e, o.class_loading), r(e, o.class_loaded), l(e, "load", t)) } var o = this._settings; "IMG" !== e.tagName && "IFRAME" !== e.tagName || (i(e, "load", t), i(e, "error", function () { l(e, "load", t), c(e, o.class_loading), o.callback_error && o.callback_error(e) }), r(e, o.class_loading)), d(e, e, o.data_srcset, o.data_src), o.callback_set && o.callback_set(e) }, e.prototype._loopThroughElements = function () { for (var e, t = this._settings, o = this._elements, n = o ? o.length : 0, i = [], l = 0; l < n; l++)e = o[l], t.skip_invisible && e.isSkipByPosition || a(e, t.container, t.threshold) && (t.show_while_loading ? this._showOnAppear(e) : this._showOnLoad(e), i.push(l), e.wasProcessed = !0); for (; 0 < i.length;)o.splice(i.pop(), 1), t.callback_processed && t.callback_processed(o.length); 0 === n && this._stopScrollHandler() }, e.prototype._purgeElements = function () { for (var e = this._elements, t = e.length, o = [], n = 0; n < t; n++)e[n].wasProcessed && o.push(n); for (; 0 < o.length;)e.splice(o.pop(), 1) }, e.prototype._startScrollHandler = function () { this._isHandlingScroll || (this._isHandlingScroll = !0, i(this._settings.container, "scroll", this._handleScrollFn)) }, e.prototype._stopScrollHandler = function () { this._isHandlingScroll && (this._isHandlingScroll = !1, l(this._settings.container, "scroll", this._handleScrollFn)) }, e.prototype.handleScroll = function () { var e, t, o; this._settings && (t = n(), 0 !== (o = this._settings.throttle) ? (e = o - (t - this._previousLoopTime)) <= 0 || o < e ? (this._loopTimeout && (clearTimeout(this._loopTimeout), this._loopTimeout = null), this._previousLoopTime = t, this._loopThroughElements()) : this._loopTimeout || (this._loopTimeout = setTimeout(u(function () { this._previousLoopTime = n(), this._loopTimeout = null, this._loopThroughElements() }, this), e)) : this._loopThroughElements()) }, e.prototype.update = function () { this._elements = function (t) { var o; try { o = Array.prototype.slice.call(t) } catch (e) { for (var n = [], i = t.length, l = 0; l < i; l++)n.push(t[l]); o = n } return o.forEach(function (e) { e.isSkipByPosition = null === e.offsetParent && 0 === s(e, ".t396__carrier-wrapper").length && "fixed" !== e.getAttribute("data-content-cover-parallax"), e.isNotUnderScreenRange = 0 === s(e, ".t-rec[data-screen-max]").length && 0 === s(e, ".t-rec[data-screen-min]").length }), o }(this._queryOriginNode.querySelectorAll(this._settings.elements_selector)), this._purgeElements(), this._loopThroughElements(), this._startScrollHandler() }, e.prototype.destroy = function () { l(window, "resize", this._handleScrollFn), this._loopTimeout && (clearTimeout(this._loopTimeout), this._loopTimeout = null), this._stopScrollHandler(), this._elements = null, this._queryOriginNode = null, this._settings = null }, e }), window.lazy = "y", t_onReady(function () { setTimeout(function () { lazyload_cover = new LazyLoad({ elements_selector: ".t-cover__carrier", show_while_loading: !1, data_src: "content-cover-bg", placeholder: "", threshold: 700 }) }, 100), setTimeout(function () { var e, t; lazyload_img = new LazyLoad({ elements_selector: ".t-img", threshold: 800 }), lazyload_bgimg = new LazyLoad({ elements_selector: ".t-bgimg", show_while_loading: !1, placeholder: "", threshold: 800 }), lazyload_iframe = new LazyLoad({ elements_selector: ".t-iframe" }), document.addEventListener("slide.bs.carousel", function (e) { setTimeout(function () { lazyload_cover.update(), lazyload_img.update(), lazyload_bgimg.update() }, 500) }), /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && !document.body.classList && ((e = document.createElement("div")).classList.add("t-mbfix"), document.body.appendChild(e), t = document.querySelector(".t-mbfix"), setTimeout(function () { t.classList.add("t-mbfix_hide") }, 50), setTimeout(function () { null !== t.parentNode && t.parentNode.removeChild(t) }, 1e3)) }, 500) });