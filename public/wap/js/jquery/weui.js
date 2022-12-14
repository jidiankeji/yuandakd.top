
!function(t) {
        "use strict";
        t.fn.transitionEnd = function(t) {
            function e(r) {
                if (r.target === this) for (t.call(this, r), n = 0; n < i.length; n++) a.off(i[n], e)
            }
            var n, i = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
                a = this;
            if (t) for (n = 0; n < i.length; n++) a.on(i[n], e);
            return this
        },
            t.support = function() {
                var t = {
                    touch: !!("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch)
                };
                return t
            } (),
            t.touchEvents = {
                start: t.support.touch ? "touchstart": "mousedown",
                move: t.support.touch ? "touchmove": "mousemove",
                end: t.support.touch ? "touchend": "mouseup"
            },
            t.getTouchPosition = function(t) {
                return t = t.originalEvent || t,
                    "touchstart" === t.type || "touchmove" === t.type || "touchend" === t.type ? {
                        x: t.targetTouches[0].pageX,
                        y: t.targetTouches[0].pageY
                    }: {
                        x: t.pageX,
                        y: t.pageY
                    }
            },
            t.fn.scrollHeight = function() {
                return this[0].scrollHeight
            },
            t.fn.transform = function(t) {
                for (var e = 0; e < this.length; e++) {
                    var n = this[e].style;
                    n.webkitTransform = n.MsTransform = n.msTransform = n.MozTransform = n.OTransform = n.transform = t
                }
                return this
            },
            t.fn.transition = function(t) {
                "string" != typeof t && (t += "ms");
                for (var e = 0; e < this.length; e++) {
                    var n = this[e].style;
                    n.webkitTransitionDuration = n.MsTransitionDuration = n.msTransitionDuration = n.MozTransitionDuration = n.OTransitionDuration = n.transitionDuration = t
                }
                return this
            },
            t.getTranslate = function(t, e) {
                var n, i, a, r;
                return "undefined" == typeof e && (e = "x"),
                    a = window.getComputedStyle(t, null),
                    window.WebKitCSSMatrix ? r = new WebKitCSSMatrix("none" === a.webkitTransform ? "": a.webkitTransform) : (r = a.MozTransform || a.OTransform || a.MsTransform || a.msTransform || a.transform || a.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), n = r.toString().split(",")),
                "x" === e && (i = window.WebKitCSSMatrix ? r.m41: 16 === n.length ? parseFloat(n[12]) : parseFloat(n[4])),
                "y" === e && (i = window.WebKitCSSMatrix ? r.m42: 16 === n.length ? parseFloat(n[13]) : parseFloat(n[5])),
                i || 0
            },
            t.requestAnimationFrame = function(t) {
                return window.requestAnimationFrame ? window.requestAnimationFrame(t) : window.webkitRequestAnimationFrame ? window.webkitRequestAnimationFrame(t) : window.mozRequestAnimationFrame ? window.mozRequestAnimationFrame(t) : window.setTimeout(t, 1e3 / 60)
            },
            t.cancelAnimationFrame = function(t) {
                return window.cancelAnimationFrame ? window.cancelAnimationFrame(t) : window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame(t) : window.mozCancelAnimationFrame ? window.mozCancelAnimationFrame(t) : window.clearTimeout(t)
            },
            t.fn.join = function(t) {
                return this.toArray().join(t)
            }
    } ($),
    +
        function(t) {
            "use strict";
            t.Template7 = t.t7 = function() {
                function t(t) {
                    return "[object Array]" === Object.prototype.toString.apply(t)
                }
                function e(t) {
                    return "function" == typeof t
                }
                function n(t) {
                    var e, n, i, a = t.replace(/[{}#}]/g, "").split(" "),
                        r = [];
                    for (n = 0; n < a.length; n++) {
                        var o = a[n];
                        if (0 === n) r.push(o);
                        else if (0 === o.indexOf('"')) if (2 === o.match(/"/g).length) r.push(o);
                        else {
                            for (e = 0, i = n + 1; i < a.length; i++) if (o += " " + a[i], a[i].indexOf('"') >= 0) {
                                e = i,
                                    r.push(o);
                                break
                            }
                            e && (n = e)
                        } else if (o.indexOf("=") > 0) {
                            var s = o.split("="),
                                c = s[0],
                                l = s[1];
                            if (2 !== l.match(/"/g).length) {
                                for (e = 0, i = n + 1; i < a.length; i++) if (l += " " + a[i], a[i].indexOf('"') >= 0) {
                                    e = i;
                                    break
                                }
                                e && (n = e)
                            }
                            var u = [c, l.replace(/"/g, "")];
                            r.push(u)
                        } else r.push(o)
                    }
                    return r
                }
                function i(e) {
                    var i, a, r = [];
                    if (!e) return [];
                    var o = e.split(/({{[^{^}]*}})/);
                    for (i = 0; i < o.length; i++) {
                        var s = o[i];
                        if ("" !== s) if (s.indexOf("{{") < 0) r.push({
                            type: "plain",
                            content: s
                        });
                        else {
                            if (s.indexOf("{/") >= 0) continue;
                            if (s.indexOf("{#") < 0 && s.indexOf(" ") < 0 && s.indexOf("else") < 0) {
                                r.push({
                                    type: "variable",
                                    contextName: s.replace(/[{}]/g, "")
                                });
                                continue
                            }
                            var c = n(s),
                                l = c[0],
                                u = [],
                                p = {};
                            for (a = 1; a < c.length; a++) {
                                var h = c[a];
                                t(h) ? p[h[0]] = "false" === h[1] ? !1 : h[1] : u.push(h)
                            }
                            if (s.indexOf("{#") >= 0) {
                                var d, f = "",
                                    m = "",
                                    v = 0,
                                    g = !1,
                                    w = !1,
                                    y = 0;
                                for (a = i + 1; a < o.length; a++) if (o[a].indexOf("{{#") >= 0 && y++, o[a].indexOf("{{/") >= 0 && y--, o[a].indexOf("{{#" + l) >= 0) f += o[a],
                                w && (m += o[a]),
                                    v++;
                                else if (o[a].indexOf("{{/" + l) >= 0) {
                                    if (! (v > 0)) {
                                        d = a,
                                            g = !0;
                                        break
                                    }
                                    v--,
                                        f += o[a],
                                    w && (m += o[a])
                                } else o[a].indexOf("else") >= 0 && 0 === y ? w = !0 : (w || (f += o[a]), w && (m += o[a]));
                                g && (d && (i = d), r.push({
                                    type: "helper",
                                    helperName: l,
                                    contextName: u,
                                    content: f,
                                    inverseContent: m,
                                    hash: p
                                }))
                            } else s.indexOf(" ") > 0 && r.push({
                                type: "helper",
                                helperName: l,
                                contextName: u,
                                hash: p
                            })
                        }
                    }
                    return r
                }
                var a = function(t) {
                    function e(t, e) {
                        return t.content ? o(t.content, e) : function() {
                            return ""
                        }
                    }
                    function n(t, e) {
                        return t.inverseContent ? o(t.inverseContent, e) : function() {
                            return ""
                        }
                    }
                    function a(t, e) {
                        var n, i, a = 0;
                        if (0 === t.indexOf("../")) {
                            a = t.split("../").length - 1;
                            var r = e.split("_")[1] - a;
                            e = "ctx_" + (r >= 1 ? r: 1),
                                i = t.split("../")[a].split(".")
                        } else 0 === t.indexOf("@global") ? (e = "$.Template7.global", i = t.split("@global.")[1].split(".")) : 0 === t.indexOf("@root") ? (e = "ctx_1", i = t.split("@root.")[1].split(".")) : i = t.split(".");
                        n = e;
                        for (var o = 0; o < i.length; o++) {
                            var s = i[o];
                            0 === s.indexOf("@") ? o > 0 ? n += "[(data && data." + s.replace("@", "") + ")]": n = "(data && data." + t.replace("@", "") + ")": isFinite(s) ? n += "[" + s + "]": 0 === s.indexOf("this") ? n = s.replace("this", e) : n += "." + s
                        }
                        return n
                    }
                    function r(t, e) {
                        for (var n = [], i = 0; i < t.length; i++) 0 === t[i].indexOf('"') ? n.push(t[i]) : n.push(a(t[i], e));
                        return n.join(", ")
                    }
                    function o(t, o) {
                        if (o = o || 1, t = t || s.template, "string" != typeof t) throw new Error("Template7: Template must be a string");
                        var c = i(t);
                        if (0 === c.length) return function() {
                            return ""
                        };
                        var l = "ctx_" + o,
                            u = "(function (" + l + ", data) {\n";
                        1 === o && (u += "function isArray(arr){return Object.prototype.toString.apply(arr) === '[object Array]';}\n", u += "function isFunction(func){return (typeof func === 'function');}\n", u += 'function c(val, ctx) {if (typeof val !== "undefined") {if (isFunction(val)) {return val.call(ctx);} else return val;} else return "";}\n'),
                            u += "var r = '';\n";
                        var p;
                        for (p = 0; p < c.length; p++) {
                            var h = c[p];
                            if ("plain" !== h.type) {
                                var d, f;
                                if ("variable" === h.type && (d = a(h.contextName, l), u += "r += c(" + d + ", " + l + ");"), "helper" === h.type) if (h.helperName in s.helpers) f = r(h.contextName, l),
                                    u += "r += ($.Template7.helpers." + h.helperName + ").call(" + l + ", " + (f && f + ", ") + "{hash:" + JSON.stringify(h.hash) + ", data: data || {}, fn: " + e(h, o + 1) + ", inverse: " + n(h, o + 1) + ", root: ctx_1});";
                                else {
                                    if (h.contextName.length > 0) throw new Error('Template7: Missing helper: "' + h.helperName + '"');
                                    d = a(h.helperName, l),
                                        u += "if (" + d + ") {",
                                        u += "if (isArray(" + d + ")) {",
                                        u += "r += ($.Template7.helpers.each).call(" + l + ", " + d + ", {hash:" + JSON.stringify(h.hash) + ", data: data || {}, fn: " + e(h, o + 1) + ", inverse: " + n(h, o + 1) + ", root: ctx_1});",
                                        u += "}else {",
                                        u += "r += ($.Template7.helpers.with).call(" + l + ", " + d + ", {hash:" + JSON.stringify(h.hash) + ", data: data || {}, fn: " + e(h, o + 1) + ", inverse: " + n(h, o + 1) + ", root: ctx_1});",
                                        u += "}}"
                                }
                            } else u += "r +='" + h.content.replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/'/g, "\\'") + "';"
                        }
                        return u += "\nreturn r;})",
                            eval.call(window, u)
                    }
                    var s = this;
                    s.template = t,
                        s.compile = function(t) {
                            return s.compiled || (s.compiled = o(t)),
                                s.compiled
                        }
                };
                a.prototype = {
                    options: {},
                    helpers: {
                        "if": function(t, n) {
                            return e(t) && (t = t.call(this)),
                                t ? n.fn(this, n.data) : n.inverse(this, n.data)
                        },
                        unless: function(t, n) {
                            return e(t) && (t = t.call(this)),
                                t ? n.inverse(this, n.data) : n.fn(this, n.data)
                        },
                        each: function(n, i) {
                            var a = "",
                                r = 0;
                            if (e(n) && (n = n.call(this)), t(n)) {
                                for (i.hash.reverse && (n = n.reverse()), r = 0; r < n.length; r++) a += i.fn(n[r], {
                                    first: 0 === r,
                                    last: r === n.length - 1,
                                    index: r
                                });
                                i.hash.reverse && (n = n.reverse())
                            } else for (var o in n) r++,
                                a += i.fn(n[o], {
                                    key: o
                                });
                            return r > 0 ? a: i.inverse(this)
                        },
                        "with": function(t, n) {
                            return e(t) && (t = t.call(this)),
                                n.fn(t)
                        },
                        join: function(t, n) {
                            return e(t) && (t = t.call(this)),
                                t.join(n.hash.delimiter || n.hash.delimeter)
                        },
                        js: function(t, e) {
                            var n;
                            return n = t.indexOf("return") >= 0 ? "(function(){" + t + "})": "(function(){return (" + t + ")})",
                                eval.call(this, n).call(this)
                        },
                        js_compare: function(t, e) {
                            var n;
                            n = t.indexOf("return") >= 0 ? "(function(){" + t + "})": "(function(){return (" + t + ")})";
                            var i = eval.call(this, n).call(this);
                            return i ? e.fn(this, e.data) : e.inverse(this, e.data)
                        }
                    }
                };
                var r = function(t, e) {
                    if (2 === arguments.length) {
                        var n = new a(t),
                            i = n.compile()(e);
                        return n = null,
                            i
                    }
                    return new a(t)
                };
                return r.registerHelper = function(t, e) {
                    a.prototype.helpers[t] = e
                },
                    r.unregisterHelper = function(t) {
                        a.prototype.helpers[t] = void 0,
                            delete a.prototype.helpers[t]
                    },
                    r.compile = function(t, e) {
                        var n = new a(t, e);
                        return n.compile()
                    },
                    r.options = a.prototype.options,
                    r.helpers = a.prototype.helpers,
                    r
            } ()
        } ($),
    /*! Hammer.JS - v2.0.8 - 2016-04-23
     * http://hammerjs.github.io/
     *
     * Copyright (c) 2016 Jorik Tangelder;
     * Licensed under the MIT license */
    function(t, e, n, i) {
        "use strict";
        function a(t, e, n) {
            return setTimeout(l(t, n), e)
        }
        function r(t, e, n) {
            return Array.isArray(t) ? (o(t, n[e], n), !0) : !1
        }
        function o(t, e, n) {
            var a;
            if (t) if (t.forEach) t.forEach(e, n);
            else if (t.length !== i) for (a = 0; a < t.length;) e.call(n, t[a], a, t),
                a++;
            else for (a in t) t.hasOwnProperty(a) && e.call(n, t[a], a, t)
        }
        function s(e, n, i) {
            var a = "DEPRECATED METHOD: " + n + "\n" + i + " AT \n";
            return function() {
                var n = new Error("get-stack-trace"),
                    i = n && n.stack ? n.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace",
                    r = t.console && (t.console.warn || t.console.log);
                return r && r.call(t.console, a, i),
                    e.apply(this, arguments)
            }
        }
        function c(t, e, n) {
            var i, a = e.prototype;
            i = t.prototype = Object.create(a),
                i.constructor = t,
                i._super = a,
            n && pt(i, n)
        }
        function l(t, e) {
            return function() {
                return t.apply(e, arguments)
            }
        }
        function u(t, e) {
            return typeof t == ft ? t.apply(e ? e[0] || i: i, e) : t
        }
        function p(t, e) {
            return t === i ? e: t
        }
        function h(t, e, n) {
            o(v(e),
                function(e) {
                    t.addEventListener(e, n, !1)
                })
        }
        function d(t, e, n) {
            o(v(e),
                function(e) {
                    t.removeEventListener(e, n, !1)
                })
        }
        function f(t, e) {
            for (; t;) {
                if (t == e) return ! 0;
                t = t.parentNode
            }
            return ! 1
        }
        function m(t, e) {
            return t.indexOf(e) > -1
        }
        function v(t) {
            return t.trim().split(/\s+/g)
        }
        function g(t, e, n) {
            if (t.indexOf && !n) return t.indexOf(e);
            for (var i = 0; i < t.length;) {
                if (n && t[i][n] == e || !n && t[i] === e) return i;
                i++
            }
            return - 1
        }
        function w(t) {
            return Array.prototype.slice.call(t, 0)
        }
        function y(t, e, n) {
            for (var i = [], a = [], r = 0; r < t.length;) {
                var o = e ? t[r][e] : t[r];
                g(a, o) < 0 && i.push(t[r]),
                    a[r] = o,
                    r++
            }
            return n && (i = e ? i.sort(function(t, n) {
                return t[e] > n[e]
            }) : i.sort()),
                i
        }
        function T(t, e) {
            for (var n, a, r = e[0].toUpperCase() + e.slice(1), o = 0; o < ht.length;) {
                if (n = ht[o], a = n ? n + r: e, a in t) return a;
                o++
            }
            return i
        }
        function k() {
            return Tt++
        }
        function x(e) {
            var n = e.ownerDocument || e;
            return n.defaultView || n.parentWindow || t
        }
        function C(t, e) {
            var n = this;
            this.manager = t,
                this.callback = e,
                this.element = t.element,
                this.target = t.options.inputTarget,
                this.domHandler = function(e) {
                    u(t.options.enable, [t]) && n.handler(e)
                },
                this.init()
        }
        function b(t) {
            var e, n = t.options.inputClass;
            return new(e = n ? n: Ct ? F: bt ? L: xt ? j: N)(t, M)
        }
        function M(t, e, n) {
            var i = n.pointers.length,
                a = n.changedPointers.length,
                r = e & Pt && i - a === 0,
                o = e & (It | Ht) && i - a === 0;
            n.isFirst = !!r,
                n.isFinal = !!o,
            r && (t.session = {}),
                n.eventType = e,
                _(t, n),
                t.emit("hammer.input", n),
                t.recognize(n),
                t.session.prevInput = n
        }
        function _(t, e) {
            var n = t.session,
                i = e.pointers,
                a = i.length;
            n.firstInput || (n.firstInput = O(e)),
                a > 1 && !n.firstMultiple ? n.firstMultiple = O(e) : 1 === a && (n.firstMultiple = !1);
            var r = n.firstInput,
                o = n.firstMultiple,
                s = o ? o.center: r.center,
                c = e.center = P(i);
            e.timeStamp = gt(),
                e.deltaTime = e.timeStamp - r.timeStamp,
                e.angle = S(s, c),
                e.distance = H(s, c),
                E(n, e),
                e.offsetDirection = I(e.deltaX, e.deltaY);
            var l = A(e.deltaTime, e.deltaX, e.deltaY);
            e.overallVelocityX = l.x,
                e.overallVelocityY = l.y,
                e.overallVelocity = vt(l.x) > vt(l.y) ? l.x: l.y,
                e.scale = o ? V(o.pointers, i) : 1,
                e.rotation = o ? Y(o.pointers, i) : 0,
                e.maxPointers = n.prevInput ? e.pointers.length > n.prevInput.maxPointers ? e.pointers.length: n.prevInput.maxPointers: e.pointers.length,
                D(n, e);
            var u = t.element;
            f(e.srcEvent.target, u) && (u = e.srcEvent.target),
                e.target = u
        }
        function E(t, e) {
            var n = e.center,
                i = t.offsetDelta || {},
                a = t.prevDelta || {},
                r = t.prevInput || {};
            e.eventType !== Pt && r.eventType !== It || (a = t.prevDelta = {
                x: r.deltaX || 0,
                y: r.deltaY || 0
            },
                i = t.offsetDelta = {
                    x: n.x,
                    y: n.y
                }),
                e.deltaX = a.x + (n.x - i.x),
                e.deltaY = a.y + (n.y - i.y)
        }
        function D(t, e) {
            var n, a, r, o, s = t.lastInterval || e,
                c = e.timeStamp - s.timeStamp;
            if (e.eventType != Ht && (c > Ot || s.velocity === i)) {
                var l = e.deltaX - s.deltaX,
                    u = e.deltaY - s.deltaY,
                    p = A(c, l, u);
                a = p.x,
                    r = p.y,
                    n = vt(p.x) > vt(p.y) ? p.x: p.y,
                    o = I(l, u),
                    t.lastInterval = e
            } else n = s.velocity,
                a = s.velocityX,
                r = s.velocityY,
                o = s.direction;
            e.velocity = n,
                e.velocityX = a,
                e.velocityY = r,
                e.direction = o
        }
        function O(t) {
            for (var e = [], n = 0; n < t.pointers.length;) e[n] = {
                clientX: mt(t.pointers[n].clientX),
                clientY: mt(t.pointers[n].clientY)
            },
                n++;
            return {
                timeStamp: gt(),
                pointers: e,
                center: P(e),
                deltaX: t.deltaX,
                deltaY: t.deltaY
            }
        }
        function P(t) {
            var e = t.length;
            if (1 === e) return {
                x: mt(t[0].clientX),
                y: mt(t[0].clientY)
            };
            for (var n = 0,
                     i = 0,
                     a = 0; e > a;) n += t[a].clientX,
                i += t[a].clientY,
                a++;
            return {
                x: mt(n / e),
                y: mt(i / e)
            }
        }
        function A(t, e, n) {
            return {
                x: e / t || 0,
                y: n / t || 0
            }
        }
        function I(t, e) {
            return t === e ? St: vt(t) >= vt(e) ? 0 > t ? Yt: Vt: 0 > e ? Nt: Ft
        }
        function H(t, e, n) {
            n || (n = Rt);
            var i = e[n[0]] - t[n[0]],
                a = e[n[1]] - t[n[1]];
            return Math.sqrt(i * i + a * a)
        }
        function S(t, e, n) {
            n || (n = Rt);
            var i = e[n[0]] - t[n[0]],
                a = e[n[1]] - t[n[1]];
            return 180 * Math.atan2(a, i) / Math.PI
        }
        function Y(t, e) {
            return S(e[1], e[0], jt) + S(t[1], t[0], jt)
        }
        function V(t, e) {
            return H(e[0], e[1], jt) / H(t[0], t[1], jt)
        }
        function N() {
            this.evEl = Xt,
                this.evWin = Wt,
                this.pressed = !1,
                C.apply(this, arguments)
        }
        function F() {
            this.evEl = Bt,
                this.evWin = Gt,
                C.apply(this, arguments),
                this.store = this.manager.session.pointerEvents = []
        }
        function q() {
            this.evTarget = Zt,
                this.evWin = Qt,
                this.started = !1,
                C.apply(this, arguments)
        }
        function z(t, e) {
            var n = w(t.touches),
                i = w(t.changedTouches);
            return e & (It | Ht) && (n = y(n.concat(i), "identifier", !0)),
                [n, i]
        }
        function L() {
            this.evTarget = ee,
                this.targetIds = {},
                C.apply(this, arguments)
        }
        function R(t, e) {
            var n = w(t.touches),
                i = this.targetIds;
            if (e & (Pt | At) && 1 === n.length) return i[n[0].identifier] = !0,
                [n, n];
            var a, r, o = w(t.changedTouches),
                s = [],
                c = this.target;
            if (r = n.filter(function(t) {
                    return f(t.target, c)
                }), e === Pt) for (a = 0; a < r.length;) i[r[a].identifier] = !0,
                a++;
            for (a = 0; a < o.length;) i[o[a].identifier] && s.push(o[a]),
            e & (It | Ht) && delete i[o[a].identifier],
                a++;
            return s.length ? [y(r.concat(s), "identifier", !0), s] : void 0
        }
        function j() {
            C.apply(this, arguments);
            var t = l(this.handler, this);
            this.touch = new L(this.manager, t),
                this.mouse = new N(this.manager, t),
                this.primaryTouch = null,
                this.lastTouches = []
        }
        function $(t, e) {
            t & Pt ? (this.primaryTouch = e.changedPointers[0].identifier, X.call(this, e)) : t & (It | Ht) && X.call(this, e)
        }
        function X(t) {
            var e = t.changedPointers[0];
            if (e.identifier === this.primaryTouch) {
                var n = {
                    x: e.clientX,
                    y: e.clientY
                };
                this.lastTouches.push(n);
                var i = this.lastTouches,
                    a = function() {
                        var t = i.indexOf(n);
                        t > -1 && i.splice(t, 1)
                    };
                setTimeout(a, ne)
            }
        }
        function W(t) {
            for (var e = t.srcEvent.clientX,
                     n = t.srcEvent.clientY,
                     i = 0; i < this.lastTouches.length; i++) {
                var a = this.lastTouches[i],
                    r = Math.abs(e - a.x),
                    o = Math.abs(n - a.y);
                if (ie >= r && ie >= o) return ! 0
            }
            return ! 1
        }
        function K(t, e) {
            this.manager = t,
                this.set(e)
        }
        function U(t) {
            if (m(t, le)) return le;
            var e = m(t, ue),
                n = m(t, pe);
            return e && n ? le: e || n ? e ? ue: pe: m(t, ce) ? ce: se
        }
        function B() {
            if (!re) return ! 1;
            var e = {},
                n = t.CSS && t.CSS.supports;
            return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function(i) {
                e[i] = n ? t.CSS.supports("touch-action", i) : !0
            }),
                e
        }
        function G(t) {
            this.options = pt({},
                this.defaults, t || {}),
                this.id = k(),
                this.manager = null,
                this.options.enable = p(this.options.enable, !0),
                this.state = de,
                this.simultaneous = {},
                this.requireFail = []
        }
        function J(t) {
            return t & we ? "cancel": t & ve ? "end": t & me ? "move": t & fe ? "start": ""
        }
        function Z(t) {
            return t == Ft ? "down": t == Nt ? "up": t == Yt ? "left": t == Vt ? "right": ""
        }
        function Q(t, e) {
            var n = e.manager;
            return n ? n.get(t) : t
        }
        function tt() {
            G.apply(this, arguments)
        }
        function et() {
            tt.apply(this, arguments),
                this.pX = null,
                this.pY = null
        }
        function nt() {
            tt.apply(this, arguments)
        }
        function it() {
            G.apply(this, arguments),
                this._timer = null,
                this._input = null
        }
        function at() {
            tt.apply(this, arguments)
        }
        function rt() {
            tt.apply(this, arguments)
        }
        function ot() {
            G.apply(this, arguments),
                this.pTime = !1,
                this.pCenter = !1,
                this._timer = null,
                this._input = null,
                this.count = 0
        }
        function st(t, e) {
            return e = e || {},
                e.recognizers = p(e.recognizers, st.defaults.preset),
                new ct(t, e)
        }
        function ct(t, e) {
            this.options = pt({},
                st.defaults, e || {}),
                this.options.inputTarget = this.options.inputTarget || t,
                this.handlers = {},
                this.session = {},
                this.recognizers = [],
                this.oldCssProps = {},
                this.element = t,
                this.input = b(this),
                this.touchAction = new K(this, this.options.touchAction),
                lt(this, !0),
                o(this.options.recognizers,
                    function(t) {
                        var e = this.add(new t[0](t[1]));
                        t[2] && e.recognizeWith(t[2]),
                        t[3] && e.requireFailure(t[3])
                    },
                    this)
        }
        function lt(t, e) {
            var n = t.element;
            if (n.style) {
                var i;
                o(t.options.cssProps,
                    function(a, r) {
                        i = T(n.style, r),
                            e ? (t.oldCssProps[i] = n.style[i], n.style[i] = a) : n.style[i] = t.oldCssProps[i] || ""
                    }),
                e || (t.oldCssProps = {})
            }
        }
        function ut(t, n) {
            var i = e.createEvent("Event");
            i.initEvent(t, !0, !0),
                i.gesture = n,
                n.target.dispatchEvent(i)
        }
        var pt, ht = ["", "webkit", "Moz", "MS", "ms", "o"],
            dt = e.createElement("div"),
            ft = "function",
            mt = Math.round,
            vt = Math.abs,
            gt = Date.now;
        pt = "function" != typeof Object.assign ?
            function(t) {
                if (t === i || null === t) throw new TypeError("Cannot convert undefined or null to object");
                for (var e = Object(t), n = 1; n < arguments.length; n++) {
                    var a = arguments[n];
                    if (a !== i && null !== a) for (var r in a) a.hasOwnProperty(r) && (e[r] = a[r])
                }
                return e
            }: Object.assign;
        var wt = s(function(t, e, n) {
                for (var a = Object.keys(e), r = 0; r < a.length;)(!n || n && t[a[r]] === i) && (t[a[r]] = e[a[r]]),
                    r++;
                return t
            },
            "extend", "Use `assign`."),
            yt = s(function(t, e) {
                    return wt(t, e, !0)
                },
                "merge", "Use `assign`."),
            Tt = 1,
            kt = /mobile|tablet|ip(ad|hone|od)|android/i,
            xt = "ontouchstart" in t,
            Ct = T(t, "PointerEvent") !== i,
            bt = xt && kt.test(navigator.userAgent),
            Mt = "touch",
            _t = "pen",
            Et = "mouse",
            Dt = "kinect",
            Ot = 25,
            Pt = 1,
            At = 2,
            It = 4,
            Ht = 8,
            St = 1,
            Yt = 2,
            Vt = 4,
            Nt = 8,
            Ft = 16,
            qt = Yt | Vt,
            zt = Nt | Ft,
            Lt = qt | zt,
            Rt = ["x", "y"],
            jt = ["clientX", "clientY"];
        C.prototype = {
            handler: function() {},
            init: function() {
                this.evEl && h(this.element, this.evEl, this.domHandler),
                this.evTarget && h(this.target, this.evTarget, this.domHandler),
                this.evWin && h(x(this.element), this.evWin, this.domHandler)
            },
            destroy: function() {
                this.evEl && d(this.element, this.evEl, this.domHandler),
                this.evTarget && d(this.target, this.evTarget, this.domHandler),
                this.evWin && d(x(this.element), this.evWin, this.domHandler)
            }
        };
        var $t = {
                mousedown: Pt,
                mousemove: At,
                mouseup: It
            },
            Xt = "mousedown",
            Wt = "mousemove mouseup";
        c(N, C, {
            handler: function(t) {
                var e = $t[t.type];
                e & Pt && 0 === t.button && (this.pressed = !0),
                e & At && 1 !== t.which && (e = It),
                this.pressed && (e & It && (this.pressed = !1), this.callback(this.manager, e, {
                    pointers: [t],
                    changedPointers: [t],
                    pointerType: Et,
                    srcEvent: t
                }))
            }
        });
        var Kt = {
                pointerdown: Pt,
                pointermove: At,
                pointerup: It,
                pointercancel: Ht,
                pointerout: Ht
            },
            Ut = {
                2 : Mt,
                3 : _t,
                4 : Et,
                5 : Dt
            },
            Bt = "pointerdown",
            Gt = "pointermove pointerup pointercancel";
        t.MSPointerEvent && !t.PointerEvent && (Bt = "MSPointerDown", Gt = "MSPointerMove MSPointerUp MSPointerCancel"),
            c(F, C, {
                handler: function(t) {
                    var e = this.store,
                        n = !1,
                        i = t.type.toLowerCase().replace("ms", ""),
                        a = Kt[i],
                        r = Ut[t.pointerType] || t.pointerType,
                        o = r == Mt,
                        s = g(e, t.pointerId, "pointerId");
                    a & Pt && (0 === t.button || o) ? 0 > s && (e.push(t), s = e.length - 1) : a & (It | Ht) && (n = !0),
                    0 > s || (e[s] = t, this.callback(this.manager, a, {
                        pointers: e,
                        changedPointers: [t],
                        pointerType: r,
                        srcEvent: t
                    }), n && e.splice(s, 1))
                }
            });
        var Jt = {
                touchstart: Pt,
                touchmove: At,
                touchend: It,
                touchcancel: Ht
            },
            Zt = "touchstart",
            Qt = "touchstart touchmove touchend touchcancel";
        c(q, C, {
            handler: function(t) {
                var e = Jt[t.type];
                if (e === Pt && (this.started = !0), this.started) {
                    var n = z.call(this, t, e);
                    e & (It | Ht) && n[0].length - n[1].length === 0 && (this.started = !1),
                        this.callback(this.manager, e, {
                            pointers: n[0],
                            changedPointers: n[1],
                            pointerType: Mt,
                            srcEvent: t
                        })
                }
            }
        });
        var te = {
                touchstart: Pt,
                touchmove: At,
                touchend: It,
                touchcancel: Ht
            },
            ee = "touchstart touchmove touchend touchcancel";
        c(L, C, {
            handler: function(t) {
                var e = te[t.type],
                    n = R.call(this, t, e);
                n && this.callback(this.manager, e, {
                    pointers: n[0],
                    changedPointers: n[1],
                    pointerType: Mt,
                    srcEvent: t
                })
            }
        });
        var ne = 2500,
            ie = 25;
        c(j, C, {
            handler: function(t, e, n) {
                var i = n.pointerType == Mt,
                    a = n.pointerType == Et;
                if (! (a && n.sourceCapabilities && n.sourceCapabilities.firesTouchEvents)) {
                    if (i) $.call(this, e, n);
                    else if (a && W.call(this, n)) return;
                    this.callback(t, e, n)
                }
            },
            destroy: function() {
                this.touch.destroy(),
                    this.mouse.destroy()
            }
        });
        var ae = T(dt.style, "touchAction"),
            re = ae !== i,
            oe = "compute",
            se = "auto",
            ce = "manipulation",
            le = "none",
            ue = "pan-x",
            pe = "pan-y",
            he = B();
        K.prototype = {
            set: function(t) {
                t == oe && (t = this.compute()),
                re && this.manager.element.style && he[t] && (this.manager.element.style[ae] = t),
                    this.actions = t.toLowerCase().trim()
            },
            update: function() {
                this.set(this.manager.options.touchAction)
            },
            compute: function() {
                var t = [];
                return o(this.manager.recognizers,
                    function(e) {
                        u(e.options.enable, [e]) && (t = t.concat(e.getTouchAction()))
                    }),
                    U(t.join(" "))
            },
            preventDefaults: function(t) {
                var e = t.srcEvent,
                    n = t.offsetDirection;
                if (this.manager.session.prevented) return void e.preventDefault();
                var i = this.actions,
                    a = m(i, le) && !he[le],
                    r = m(i, pe) && !he[pe],
                    o = m(i, ue) && !he[ue];
                if (a) {
                    var s = 1 === t.pointers.length,
                        c = t.distance < 2,
                        l = t.deltaTime < 250;
                    if (s && c && l) return
                }
                return o && r ? void 0 : a || r && n & qt || o && n & zt ? this.preventSrc(e) : void 0
            },
            preventSrc: function(t) {
                this.manager.session.prevented = !0,
                    t.preventDefault()
            }
        };
        var de = 1,
            fe = 2,
            me = 4,
            ve = 8,
            ge = ve,
            we = 16,
            ye = 32;
        G.prototype = {
            defaults: {},
            set: function(t) {
                return pt(this.options, t),
                this.manager && this.manager.touchAction.update(),
                    this
            },
            recognizeWith: function(t) {
                if (r(t, "recognizeWith", this)) return this;
                var e = this.simultaneous;
                return t = Q(t, this),
                e[t.id] || (e[t.id] = t, t.recognizeWith(this)),
                    this
            },
            dropRecognizeWith: function(t) {
                return r(t, "dropRecognizeWith", this) ? this: (t = Q(t, this), delete this.simultaneous[t.id], this)
            },
            requireFailure: function(t) {
                if (r(t, "requireFailure", this)) return this;
                var e = this.requireFail;
                return t = Q(t, this),
                -1 === g(e, t) && (e.push(t), t.requireFailure(this)),
                    this
            },
            dropRequireFailure: function(t) {
                if (r(t, "dropRequireFailure", this)) return this;
                t = Q(t, this);
                var e = g(this.requireFail, t);
                return e > -1 && this.requireFail.splice(e, 1),
                    this
            },
            hasRequireFailures: function() {
                return this.requireFail.length > 0
            },
            canRecognizeWith: function(t) {
                return !! this.simultaneous[t.id]
            },
            emit: function(t) {
                function e(e) {
                    n.manager.emit(e, t)
                }
                var n = this,
                    i = this.state;
                ve > i && e(n.options.event + J(i)),
                    e(n.options.event),
                t.additionalEvent && e(t.additionalEvent),
                i >= ve && e(n.options.event + J(i))
            },
            tryEmit: function(t) {
                return this.canEmit() ? this.emit(t) : void(this.state = ye)
            },
            canEmit: function() {
                for (var t = 0; t < this.requireFail.length;) {
                    if (! (this.requireFail[t].state & (ye | de))) return ! 1;
                    t++
                }
                return ! 0
            },
            recognize: function(t) {
                var e = pt({},
                    t);
                return u(this.options.enable, [this, e]) ? (this.state & (ge | we | ye) && (this.state = de), this.state = this.process(e), void(this.state & (fe | me | ve | we) && this.tryEmit(e))) : (this.reset(), void(this.state = ye))
            },
            process: function(t) {},
            getTouchAction: function() {},
            reset: function() {}
        },
            c(tt, G, {
                defaults: {
                    pointers: 1
                },
                attrTest: function(t) {
                    var e = this.options.pointers;
                    return 0 === e || t.pointers.length === e
                },
                process: function(t) {
                    var e = this.state,
                        n = t.eventType,
                        i = e & (fe | me),
                        a = this.attrTest(t);
                    return i && (n & Ht || !a) ? e | we: i || a ? n & It ? e | ve: e & fe ? e | me: fe: ye
                }
            }),
            c(et, tt, {
                defaults: {
                    event: "pan",
                    threshold: 10,
                    pointers: 1,
                    direction: Lt
                },
                getTouchAction: function() {
                    var t = this.options.direction,
                        e = [];
                    return t & qt && e.push(pe),
                    t & zt && e.push(ue),
                        e
                },
                directionTest: function(t) {
                    var e = this.options,
                        n = !0,
                        i = t.distance,
                        a = t.direction,
                        r = t.deltaX,
                        o = t.deltaY;
                    return a & e.direction || (e.direction & qt ? (a = 0 === r ? St: 0 > r ? Yt: Vt, n = r != this.pX, i = Math.abs(t.deltaX)) : (a = 0 === o ? St: 0 > o ? Nt: Ft, n = o != this.pY, i = Math.abs(t.deltaY))),
                        t.direction = a,
                    n && i > e.threshold && a & e.direction
                },
                attrTest: function(t) {
                    return tt.prototype.attrTest.call(this, t) && (this.state & fe || !(this.state & fe) && this.directionTest(t))
                },
                emit: function(t) {
                    this.pX = t.deltaX,
                        this.pY = t.deltaY;
                    var e = Z(t.direction);
                    e && (t.additionalEvent = this.options.event + e),
                        this._super.emit.call(this, t)
                }
            }),
            c(nt, tt, {
                defaults: {
                    event: "pinch",
                    threshold: 0,
                    pointers: 2
                },
                getTouchAction: function() {
                    return [le]
                },
                attrTest: function(t) {
                    return this._super.attrTest.call(this, t) && (Math.abs(t.scale - 1) > this.options.threshold || this.state & fe)
                },
                emit: function(t) {
                    if (1 !== t.scale) {
                        var e = t.scale < 1 ? "in": "out";
                        t.additionalEvent = this.options.event + e
                    }
                    this._super.emit.call(this, t)
                }
            }),
            c(it, G, {
                defaults: {
                    event: "press",
                    pointers: 1,
                    time: 251,
                    threshold: 9
                },
                getTouchAction: function() {
                    return [se]
                },
                process: function(t) {
                    var e = this.options,
                        n = t.pointers.length === e.pointers,
                        i = t.distance < e.threshold,
                        r = t.deltaTime > e.time;
                    if (this._input = t, !i || !n || t.eventType & (It | Ht) && !r) this.reset();
                    else if (t.eventType & Pt) this.reset(),
                        this._timer = a(function() {
                                this.state = ge,
                                    this.tryEmit()
                            },
                            e.time, this);
                    else if (t.eventType & It) return ge;
                    return ye
                },
                reset: function() {
                    clearTimeout(this._timer)
                },
                emit: function(t) {
                    this.state === ge && (t && t.eventType & It ? this.manager.emit(this.options.event + "up", t) : (this._input.timeStamp = gt(), this.manager.emit(this.options.event, this._input)))
                }
            }),
            c(at, tt, {
                defaults: {
                    event: "rotate",
                    threshold: 0,
                    pointers: 2
                },
                getTouchAction: function() {
                    return [le]
                },
                attrTest: function(t) {
                    return this._super.attrTest.call(this, t) && (Math.abs(t.rotation) > this.options.threshold || this.state & fe)
                }
            }),
            c(rt, tt, {
                defaults: {
                    event: "swipe",
                    threshold: 10,
                    velocity: .3,
                    direction: qt | zt,
                    pointers: 1
                },
                getTouchAction: function() {
                    return et.prototype.getTouchAction.call(this)
                },
                attrTest: function(t) {
                    var e, n = this.options.direction;
                    return n & (qt | zt) ? e = t.overallVelocity: n & qt ? e = t.overallVelocityX: n & zt && (e = t.overallVelocityY),
                    this._super.attrTest.call(this, t) && n & t.offsetDirection && t.distance > this.options.threshold && t.maxPointers == this.options.pointers && vt(e) > this.options.velocity && t.eventType & It
                },
                emit: function(t) {
                    var e = Z(t.offsetDirection);
                    e && this.manager.emit(this.options.event + e, t),
                        this.manager.emit(this.options.event, t)
                }
            }),
            c(ot, G, {
                defaults: {
                    event: "tap",
                    pointers: 1,
                    taps: 1,
                    interval: 300,
                    time: 250,
                    threshold: 9,
                    posThreshold: 10
                },
                getTouchAction: function() {
                    return [ce]
                },
                process: function(t) {
                    var e = this.options,
                        n = t.pointers.length === e.pointers,
                        i = t.distance < e.threshold,
                        r = t.deltaTime < e.time;
                    if (this.reset(), t.eventType & Pt && 0 === this.count) return this.failTimeout();
                    if (i && r && n) {
                        if (t.eventType != It) return this.failTimeout();
                        var o = this.pTime ? t.timeStamp - this.pTime < e.interval: !0,
                            s = !this.pCenter || H(this.pCenter, t.center) < e.posThreshold;
                        this.pTime = t.timeStamp,
                            this.pCenter = t.center,
                            s && o ? this.count += 1 : this.count = 1,
                            this._input = t;
                        var c = this.count % e.taps;
                        if (0 === c) return this.hasRequireFailures() ? (this._timer = a(function() {
                                this.state = ge,
                                    this.tryEmit()
                            },
                            e.interval, this), fe) : ge
                    }
                    return ye
                },
                failTimeout: function() {
                    return this._timer = a(function() {
                            this.state = ye
                        },
                        this.options.interval, this),
                        ye
                },
                reset: function() {
                    clearTimeout(this._timer)
                },
                emit: function() {
                    this.state == ge && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input))
                }
            }),
            st.VERSION = "2.0.8",
            st.defaults = {
                domEvents: !1,
                touchAction: oe,
                enable: !0,
                inputTarget: null,
                inputClass: null,
                preset: [[at, {
                    enable: !1
                }], [nt, {
                    enable: !1
                },
                    ["rotate"]], [rt, {
                    direction: qt
                }], [et, {
                    direction: qt
                },
                    ["swipe"]], [ot], [ot, {
                    event: "doubletap",
                    taps: 2
                },
                    ["tap"]], [it]],
                cssProps: {
                    userSelect: "none",
                    touchSelect: "none",
                    touchCallout: "none",
                    contentZooming: "none",
                    userDrag: "none",
                    tapHighlightColor: "rgba(0,0,0,0)"
                }
            };
        var Te = 1,
            ke = 2;
        ct.prototype = {
            set: function(t) {
                return pt(this.options, t),
                t.touchAction && this.touchAction.update(),
                t.inputTarget && (this.input.destroy(), this.input.target = t.inputTarget, this.input.init()),
                    this
            },
            stop: function(t) {
                this.session.stopped = t ? ke: Te
            },
            recognize: function(t) {
                var e = this.session;
                if (!e.stopped) {
                    this.touchAction.preventDefaults(t);
                    var n, i = this.recognizers,
                        a = e.curRecognizer; (!a || a && a.state & ge) && (a = e.curRecognizer = null);
                    for (var r = 0; r < i.length;) n = i[r],
                        e.stopped === ke || a && n != a && !n.canRecognizeWith(a) ? n.reset() : n.recognize(t),
                    !a && n.state & (fe | me | ve) && (a = e.curRecognizer = n),
                        r++
                }
            },
            get: function(t) {
                if (t instanceof G) return t;
                for (var e = this.recognizers,
                         n = 0; n < e.length; n++) if (e[n].options.event == t) return e[n];
                return null
            },
            add: function(t) {
                if (r(t, "add", this)) return this;
                var e = this.get(t.options.event);
                return e && this.remove(e),
                    this.recognizers.push(t),
                    t.manager = this,
                    this.touchAction.update(),
                    t
            },
            remove: function(t) {
                if (r(t, "remove", this)) return this;
                if (t = this.get(t)) {
                    var e = this.recognizers,
                        n = g(e, t); - 1 !== n && (e.splice(n, 1), this.touchAction.update())
                }
                return this
            },
            on: function(t, e) {
                if (t !== i && e !== i) {
                    var n = this.handlers;
                    return o(v(t),
                        function(t) {
                            n[t] = n[t] || [],
                                n[t].push(e)
                        }),
                        this
                }
            },
            off: function(t, e) {
                if (t !== i) {
                    var n = this.handlers;
                    return o(v(t),
                        function(t) {
                            e ? n[t] && n[t].splice(g(n[t], e), 1) : delete n[t]
                        }),
                        this
                }
            },
            emit: function(t, e) {
                this.options.domEvents && ut(t, e);
                var n = this.handlers[t] && this.handlers[t].slice();
                if (n && n.length) {
                    e.type = t,
                        e.preventDefault = function() {
                            e.srcEvent.preventDefault()
                        };
                    for (var i = 0; i < n.length;) n[i](e),
                        i++
                }
            },
            destroy: function() {
                this.element && lt(this, !1),
                    this.handlers = {},
                    this.session = {},
                    this.input.destroy(),
                    this.element = null
            }
        },
            pt(st, {
                INPUT_START: Pt,
                INPUT_MOVE: At,
                INPUT_END: It,
                INPUT_CANCEL: Ht,
                STATE_POSSIBLE: de,
                STATE_BEGAN: fe,
                STATE_CHANGED: me,
                STATE_ENDED: ve,
                STATE_RECOGNIZED: ge,
                STATE_CANCELLED: we,
                STATE_FAILED: ye,
                DIRECTION_NONE: St,
                DIRECTION_LEFT: Yt,
                DIRECTION_RIGHT: Vt,
                DIRECTION_UP: Nt,
                DIRECTION_DOWN: Ft,
                DIRECTION_HORIZONTAL: qt,
                DIRECTION_VERTICAL: zt,
                DIRECTION_ALL: Lt,
                Manager: ct,
                Input: C,
                TouchAction: K,
                TouchInput: L,
                MouseInput: N,
                PointerEventInput: F,
                TouchMouseInput: j,
                SingleTouchInput: q,
                Recognizer: G,
                AttrRecognizer: tt,
                Tap: ot,
                Pan: et,
                Swipe: rt,
                Pinch: nt,
                Rotate: at,
                Press: it,
                on: h,
                off: d,
                each: o,
                merge: yt,
                extend: wt,
                assign: pt,
                inherit: c,
                bindFn: l,
                prefixed: T
            });
        var xe = "undefined" != typeof t ? t: "undefined" != typeof self ? self: {};
        xe.Hammer = st,
            "function" == typeof define && define.amd ? define(function() {
                return st
            }) : "undefined" != typeof module && module.exports ? module.exports = st: t[n] = st
    } (window, document, "Hammer"),
    +
        function(t) {
            "use strict";
            var e;
            t.modal = function(n, i) {
                n = t.extend({},
                    e, n);
                var a = n.buttons,
                    r = a.map(function(t, e) {
                        return '<a href="javascript:;" class="weui-dialog__btn ' + (t.className || "") + '">' + t.text + "</a>"
                    }).join(""),
                    o = '<div class="weui-dialog"><div class="weui-dialog__hd"><strong class="weui-dialog__title">' + n.title + "</strong></div>" + (n.text ? '<div class="weui-dialog__bd">' + n.text + "</div>": "") + '<div class="weui-dialog__ft">' + r + "</div></div>",
                    s = t.openModal(o, i);
                return s.find(".weui-dialog__btn").each(function(e, i) {
                    var r = t(i);
                    r.click(function() {
                        n.autoClose && t.closeModal(),
                        a[e].onClick && a[e].onClick.call(s)
                    })
                }),
                    s
            },
                t.openModal = function(e, n) {
                    var i = t("<div class='weui-mask'></div>").appendTo(document.body);
                    i.show();
                    var a = t(e).appendTo(document.body);
                    return n && a.transitionEnd(function() {
                        n.call(a)
                    }),
                        a.show(),
                        i.addClass("weui-mask--visible"),
                        a.addClass("weui-dialog--visible"),
                        a
                },
                t.closeModal = function() {
                    t(".weui-mask--visible").removeClass("weui-mask--visible").transitionEnd(function() {
                        t(this).remove()
                    }),
                        t(".weui-dialog--visible").removeClass("weui-dialog--visible").transitionEnd(function() {
                            t(this).remove()
                        })
                },
                t.alert = function(n, i, a) {
                    var r;
                    return "object" == typeof n ? r = n: ("function" == typeof i && (a = arguments[1], i = void 0), r = {
                        text: n,
                        title: i,
                        onOK: a
                    }),
                        t.modal({
                            text: r.text,
                            title: r.title,
                            buttons: [{
                                text: e.buttonOK,
                                className: "primary",
                                onClick: r.onOK
                            }]
                        })
                },
                t.confirm = function(n, i, a, r) {
                    var o;
                    return "object" == typeof n ? o = n: ("function" == typeof i && (r = arguments[2], a = arguments[1], i = void 0), o = {
                        text: n,
                        title: i,
                        onOK: a,
                        onCancel: r
                    }),
                        t.modal({
                            text: o.text,
                            title: o.title,
                            buttons: [{
                                text: e.buttonCancel,
                                className: "default",
                                onClick: o.onCancel
                            },
                                {
                                    text: e.buttonOK,
                                    className: "primary",
                                    onClick: o.onOK
                                }]
                        })
                },
                t.prompt = function(n, i, a, r, o) {
                    var s;
                    "object" == typeof n ? s = n: ("function" == typeof i && (o = arguments[3], r = arguments[2], a = arguments[1], i = void 0), s = {
                        text: n,
                        title: i,
                        input: o,
                        onOK: a,
                        onCancel: r,
                        empty: !1
                    });
                    var c = t.modal({
                            text: '<p class="weui-prompt-text">' + (s.text || "") + '</p><input type="text" class="weui-input weui-prompt-input" id="weui-prompt-input" value="' + (s.input || "") + '" />',
                            title: s.title,
                            autoClose: !1,
                            buttons: [{
                                text: e.buttonCancel,
                                className: "default",
                                onClick: function() {
                                    t.closeModal(),
                                    s.onCancel && s.onCancel.call(c)
                                }
                            },
                                {
                                    text: e.buttonOK,
                                    className: "primary",
                                    onClick: function() {
                                        var e = t("#weui-prompt-input").val();
                                        return s.empty || "" !== e && null !== e ? (t.closeModal(), void(s.onOK && s.onOK.call(c, e))) : (c.find(".weui-prompt-input").focus()[0].select(), !1)
                                    }
                                }]
                        },
                        function() {
                            this.find(".weui-prompt-input").focus()[0].select()
                        });
                    return c
                },
                t.login = function(n, i, a, r, o, s) {
                    var c;
                    "object" == typeof n ? c = n: ("function" == typeof i && (s = arguments[4], o = arguments[3], r = arguments[2], a = arguments[1], i = void 0), c = {
                        text: n,
                        title: i,
                        username: o,
                        password: s,
                        onOK: a,
                        onCancel: r
                    });
                    var l = t.modal({
                            text: '<p class="weui-prompt-text">' + (c.text || "") + '</p><input type="text" class="weui-input weui-prompt-input" id="weui-prompt-username" value="' + (c.username || "") + '" placeholder="???????????????" /><input type="password" class="weui-input weui-prompt-input" id="weui-prompt-password" value="' + (c.password || "") + '" placeholder="????????????" />',
                            title: c.title,
                            autoClose: !1,
                            buttons: [{
                                text: e.buttonCancel,
                                className: "default",
                                onClick: function() {
                                    t.closeModal(),
                                    c.onCancel && c.onCancel.call(l)
                                }
                            },
                                {
                                    text: e.buttonOK,
                                    className: "primary",
                                    onClick: function() {
                                        var e = t("#weui-prompt-username").val(),
                                            n = t("#weui-prompt-password").val();
                                        return c.empty || "" !== e && null !== e ? c.empty || "" !== n && null !== n ? (t.closeModal(), void(c.onOK && c.onOK.call(l, e, n))) : (l.find("#weui-prompt-password").focus()[0].select(), !1) : (l.find("#weui-prompt-username").focus()[0].select(), !1)
                                    }
                                }]
                        },
                        function() {
                            this.find("#weui-prompt-username").focus()[0].select()
                        });
                    return l
                },
                e = t.modal.prototype.defaults = {
                    title: "??????",
                    text: void 0,
                    buttonOK: "??????",
                    buttonCancel: "??????",
                    buttons: [{
                        text: "??????",
                        className: "primary"
                    }],
                    autoClose: !0
                }
        } ($),
    +
        function(t) {
            "use strict";
            var e = function(e, n) {
                    n = n || "";
                    var i = (t("<div class='weui-mask_transparent'></div>").appendTo(document.body), '<div class="weui-toast ' + n + '">' + e + "</div>"),
                        a = t(i).appendTo(document.body);
                    a.show(),
                        a.addClass("weui-toast--visible")
                },
                n = function(e) {
                    t(".weui-mask_transparent").remove(),
                        t(".weui-toast--visible").removeClass("weui-toast--visible").transitionEnd(function() {
                            var n = t(this);
                            n.remove(),
                            e && e(n)
                        })
                };
            t.toast = function(t, a, r) {
                "function" == typeof a && (r = a);
                var o, s = "weui-icon-success-no-circle",
                    c = i.duration;
                "cancel" == a ? (o = "weui-toast_cancel", s = "weui-icon-cancel") : "forbidden" == a ? (o = "weui-toast--forbidden", s = "weui-icon-warn") : "text" == a ? o = "weui-toast--text": "number" == typeof a && (c = a),
                    e('<i class="' + s + ' weui-icon_toast"></i><p class="weui-toast_content">' + (t || "????????????") + "</p>", o),
                    setTimeout(function() {
                            n(r)
                        },
                        c)
            },
                t.showLoading = function(t) {
                    var n = '<div class="weui_loading">';
                    n += '<i class="weui-loading weui-icon_toast"></i>',
                        n += "</div>",
                        n += '<p class="weui-toast_content">' + (t || "???????????????") + "</p>",
                        e(n, "weui_loading_toast")
                },
                t.hideLoading = function() {
                    n()
                };
            var i = t.toast.prototype.defaults = {
                duration: 2500
            }
        } ($),
    +
        function(t) {
            "use strict";
            var e, n = function(e) {
                    var n = t("<div class='weui-mask weui-actions_mask'></div>").appendTo(document.body),
                        i = e.actions || [],
                        a = i.map(function(t, e) {
                            return '<div class="weui-actionsheet__cell ' + (t.className || "") + '">' + t.text + "</div>"
                        }).join(""),
                        r = "";
                    e.title && (r = '<div class="weui-actionsheet__title">' + e.title + "</div>");
                    var o = '<div class="weui-actionsheet " id="weui-actionsheet">' + r + '<div class="weui-actionsheet__menu">' + a + '</div><div class="weui-actionsheet__action"><div class="weui-actionsheet__cell weui-actionsheet_cancel">??????</div></div></div>',
                        s = t(o).appendTo(document.body);
                    s.find(".weui-actionsheet__menu .weui-actionsheet__cell, .weui-actionsheet__action .weui-actionsheet__cell").each(function(n, a) {
                        t(a).click(function() {
                            t.closeActions(),
                            e.onClose && e.onClose(),
                            i[n] && i[n].onClick && i[n].onClick()
                        })
                    }),
                        n.show(),
                        s.show(),
                        n.addClass("weui-mask--visible"),
                        s.addClass("weui-actionsheet_toggle")
                },
                i = function() {
                    t(".weui-mask").removeClass("weui-mask--visible").transitionEnd(function() {
                        t(this).remove()
                    }),
                        t(".weui-actionsheet").removeClass("weui-actionsheet_toggle").transitionEnd(function() {
                            t(this).remove()
                        })
                };
            t.actions = function(i) {
                i = t.extend({},
                    e, i),
                    n(i)
            },
                t.closeActions = function() {
                    i()
                },
                t(document).on("click", ".weui-actions_mask",
                    function() {
                        t.closeActions()
                    });
            var e = t.actions.prototype.defaults = {
                title: void 0,
                onClose: void 0
            }
        } ($),
    +
        function(t) {
            "use strict";
            var e = function(e) {
                this.container = t(e),
                    this.distance = 50,
                    this.attachEvents()
            };
            e.prototype.touchStart = function(e) {
                if (!this.container.hasClass("refreshing")) {
                    var n = t.getTouchPosition(e);
                    this.start = n,
                        this.diffX = this.diffY = 0
                }
            },
                e.prototype.touchMove = function(e) {
                    if (!this.container.hasClass("refreshing")) {
                        if (!this.start) return ! 1;
                        if (! (this.container.scrollTop() > 0)) {
                            var n = t.getTouchPosition(e);
                            this.diffX = n.x - this.start.x,
                                this.diffY = n.y - this.start.y,
                            this.diffY < 0 || (this.container.addClass("touching"), e.preventDefault(), e.stopPropagation(), this.diffY = Math.pow(this.diffY, .8), this.container.css("transform", "translate3d(0, " + this.diffY + "px, 0)"), this.diffY < this.distance ? this.container.removeClass("pull-up").addClass("pull-down") : this.container.removeClass("pull-down").addClass("pull-up"))
                        }
                    }
                },
                e.prototype.touchEnd = function() {
                    this.start = !1,
                    this.diffY <= 0 || this.container.hasClass("refreshing") || (this.container.removeClass("touching"), this.container.removeClass("pull-down pull-up"), this.container.css("transform", ""), Math.abs(this.diffY) <= this.distance || (this.container.addClass("refreshing"), this.container.trigger("pull-to-refresh")))
                },
                e.prototype.attachEvents = function() {
                    var e = this.container;
                    e.addClass("weui-pull-to-refresh"),
                        e.on(t.touchEvents.start, t.proxy(this.touchStart, this)),
                        e.on(t.touchEvents.move, t.proxy(this.touchMove, this)),
                        e.on(t.touchEvents.end, t.proxy(this.touchEnd, this))
                };
            var n = function(t) {
                    new e(t)
                },
                i = function(e) {
                    t(e).removeClass("refreshing")
                };
            t.fn.pullToRefresh = function() {
                return this.each(function() {
                    n(this)
                })
            },
                t.fn.pullToRefreshDone = function() {
                    return this.each(function() {
                        i(this)
                    })
                }
        } ($),
    +
        function(t) {
            "use strict";
            var e = function(e, n) {
                this.container = t(e),
                    this.container.data("infinite", this),
                    this.distance = n || 50,
                    this.attachEvents()
            };
            e.prototype.scroll = function() {
                var e = this.container,
                    n = e.scrollHeight() - (t(window).height() + e.scrollTop());
                n <= this.distance && e.trigger("infinite")
            },
                e.prototype.attachEvents = function(e) {
                    var n = this.container,
                        i = "BODY" === n[0].tagName.toUpperCase() ? t(document) : n;
                    i[e ? "off": "on"]("scroll", t.proxy(this.scroll, this))
                },
                e.prototype.detachEvents = function(t) {
                    this.attachEvents(!0)
                };
            t.fn.infinite = function(t) {
                return this.each(function() {
                    new e(this, t)
                })
            },
                t.fn.destroyInfinite = function() {
                    return this.each(function() {
                        var e = t(this).data("infinite");
                        e && e.detachEvents && e.detachEvents()
                    })
                }
        } ($),
    +
        function(t) {
            "use strict";
            var e = "weui-bar__item--on",
                n = function(n) {
                    var i = t(n);
                    if (!i.hasClass(e)) {
                        var a = i.attr("href");
                        if (/^#/.test(a)) {
                            i.parent().find("." + e).removeClass(e),
                                i.addClass(e);
                            var r = i.parents(".weui-tab").find(".weui-tab__bd");
                            r.find(".weui-tab__bd-item--active").removeClass("weui-tab__bd-item--active"),
                                t(a).addClass("weui-tab__bd-item--active")
                        }
                    }
                };
            t.showTab = n,
                t(document).on("click", ".weui-navbar__item, .weui-tabbar__item",
                    function(i) {
                        var a = t(i.currentTarget),
                            r = a.attr("href");
                        a.hasClass(e) || /^#/.test(r) && (i.preventDefault(), n(a))
                    })
        } ($),
    +
        function(t) {
            "use strict";
            t(document).on("click touchstart", ".weui-search-bar__label",
                function(e) {
                    t(e.target).parents(".weui-search-bar").addClass("weui-search-bar_focusing").find("input").focus()
                }).on("click", ".weui-search-bar__cancel-btn",
                function(e) {
                    t(e.target).parents(".weui-search-bar").removeClass("weui-search-bar_focusing").find(".weui-search-bar__input").val("").blur()
                }).on("click", ".weui-icon-clear",
                function(e) {
                    t(e.target).parents(".weui-search-bar").find(".weui-search-bar__input").val("").focus()
                })
        } ($),
    function(t) {
        "use strict";
        var e = {},
            n = navigator.userAgent,
            i = n.match(/(Android);?[\s\/]+([\d.]+)?/),
            a = n.match(/(iPad).*OS\s([\d_]+)/),
            r = n.match(/(iPod)(.*OS\s([\d_]+))?/),
            o = !a && n.match(/(iPhone\sOS)\s([\d_]+)/);
        if (e.ios = e.android = e.iphone = e.ipad = e.androidChrome = !1, i && (e.os = "android", e.osVersion = i[2], e.android = !0, e.androidChrome = n.toLowerCase().indexOf("chrome") >= 0), (a || o || r) && (e.os = "ios", e.ios = !0), o && !r && (e.osVersion = o[2].replace(/_/g, "."), e.iphone = !0), a && (e.osVersion = a[2].replace(/_/g, "."), e.ipad = !0), r && (e.osVersion = r[3] ? r[3].replace(/_/g, ".") : null, e.iphone = !0), e.ios && e.osVersion && n.indexOf("Version/") >= 0 && "10" === e.osVersion.split(".")[0] && (e.osVersion = n.toLowerCase().split("version/")[1].split(" ")[0]), e.webView = (o || a || r) && n.match(/.*AppleWebKit(?!.*Safari)/i), e.os && "ios" === e.os) {
            var s = e.osVersion.split(".");
            e.minimalUi = !e.webView && (r || o) && (1 * s[0] === 7 ? 1 * s[1] >= 1 : 1 * s[0] > 7) && t('meta[name="viewport"]').length > 0 && t('meta[name="viewport"]').attr("content").indexOf("minimal-ui") >= 0
        }
        var c = t(window).width(),
            l = t(window).height();
        e.statusBar = !1,
            e.webView && c * l === screen.width * screen.height ? e.statusBar = !0 : e.statusBar = !1;
        var u = [];
        if (e.pixelRatio = window.devicePixelRatio || 1, u.push("pixel-ratio-" + Math.floor(e.pixelRatio)), e.pixelRatio >= 2 && u.push("retina"), e.os && (u.push(e.os, e.os + "-" + e.osVersion.split(".")[0], e.os + "-" + e.osVersion.replace(/\./g, "-")), "ios" === e.os)) for (var p = parseInt(e.osVersion.split(".")[0], 10), h = p - 1; h >= 6; h--) u.push("ios-gt-" + h);
        e.statusBar ? u.push("with-statusbar-overlay") : t("html").removeClass("with-statusbar-overlay"),
        u.length > 0 && t("html").addClass(u.join(" ")),
            t.device = e
    } ($),
    +
        function(t) {
            "use strict";
            var e = function(e) {
                function n() {
                    var e = !1;
                    return c.params.convertToPopover || c.params.onlyInPopover ? (!c.inline && c.params.input && (c.params.onlyInPopover ? e = !0 : t.device.ios ? e = !!t.device.ipad: t(window).width() >= 768 && (e = !0)), e) : e
                }
                function i() {
                    return !! (c.opened && c.container && c.container.length > 0 && c.container.parents(".popover").length > 0)
                }
                function a() {
                    if (c.opened) for (var t = 0; t < c.cols.length; t++) c.cols[t].divider || (c.cols[t].calcSize(), c.cols[t].setValue(c.cols[t].value, 0, !1))
                }
                function r(t) {
                    if (t.preventDefault(), !c.opened && (c.open(), c.params.scrollToInput && !n())) {
                        var e = c.input.parents(".content");
                        if (0 === e.length) return;
                        var i, a = parseInt(e.css("padding-top"), 10),
                            r = parseInt(e.css("padding-bottom"), 10),
                            o = e[0].offsetHeight - a - c.container.height(),
                            s = e[0].scrollHeight - a - c.container.height(),
                            l = c.input.offset().top - a + c.input[0].offsetHeight;
                        if (l > o) {
                            var u = e.scrollTop() + l - o;
                            u + o > s && (i = u + o - s + r, o === s && (i = c.container.height()), e.css({
                                "padding-bottom": i + "px"
                            })),
                                e.scrollTop(u, 300)
                        }
                    }
                }
                function o(e) {
                    i() || (c.input && c.input.length > 0 ? e.target !== c.input[0] && 0 === t(e.target).parents(".weui-picker-modal").length && c.close() : 0 === t(e.target).parents(".weui-picker-modal").length && c.close())
                }
                function s() {
                    c.opened = !1,
                    c.input && c.input.length > 0 && c.input.parents(".page-content").css({
                        "padding-bottom": ""
                    }),
                    c.params.onClose && c.params.onClose(c),
                        c.container.find(".picker-items-col").each(function() {
                            c.destroyPickerCol(this)
                        })
                }
                var c = this,
                    l = {
                        updateValuesOnMomentum: !1,
                        updateValuesOnTouchmove: !0,
                        rotateEffect: !1,
                        momentumRatio: 7,
                        freeMode: !1,
                        scrollToInput: !0,
                        inputReadOnly: !0,
                        toolbar: !0,
                        toolbarCloseText: "??????",
                        title: "?????????",
                        toolbarTemplate: '<div class="toolbar">          <div class="toolbar-inner">          <a href="javascript:;" class="picker-button close-picker">{{closeText}}</a>          <h1 class="title">{{title}}</h1>          </div>          </div>'
                    };
                e = e || {};
                for (var u in l)"undefined" == typeof e[u] && (e[u] = l[u]);
                c.params = e,
                    c.cols = [],
                    c.initialized = !1,
                    c.inline = !!c.params.container;
                var p = t.device.ios || navigator.userAgent.toLowerCase().indexOf("safari") >= 0 && navigator.userAgent.toLowerCase().indexOf("chrome") < 0 && !t.device.android;
                return c.setValue = function(t, e) {
                    for (var n = 0,
                             i = 0; i < c.cols.length; i++) c.cols[i] && !c.cols[i].divider && (c.cols[i].setValue(t[n], e), n++)
                },
                    c.updateValue = function() {
                        for (var e = [], n = [], i = 0; i < c.cols.length; i++) c.cols[i].divider || (e.push(c.cols[i].value), n.push(c.cols[i].displayValue));
                        e.indexOf(void 0) >= 0 || (c.value = e, c.displayValue = n, c.params.onChange && c.params.onChange(c, c.value, c.displayValue), c.input && c.input.length > 0 && (t(c.input).val(c.params.formatValue ? c.params.formatValue(c, c.value, c.displayValue) : c.value.join(" ")), t(c.input).trigger("change")))
                    },
                    c.initPickerCol = function(e, n) {
                        function i() {
                            w = t.requestAnimationFrame(function() {
                                h.updateItems(void 0, void 0, 0),
                                    i()
                            })
                        }
                        function a(e) {
                            if (!T && !y) {
                                e.preventDefault(),
                                    y = !0;
                                var n = t.getTouchPosition(e);
                                k = x = n.y,
                                    C = (new Date).getTime(),
                                    A = !0,
                                    M = E = t.getTranslate(h.wrapper[0], "y")
                            }
                        }
                        function r(e) {
                            if (y) {
                                e.preventDefault(),
                                    A = !1;
                                var n = t.getTouchPosition(e);
                                x = n.y,
                                T || (t.cancelAnimationFrame(w), T = !0, M = E = t.getTranslate(h.wrapper[0], "y"), h.wrapper.transition(0)),
                                    e.preventDefault();
                                var i = x - k;
                                E = M + i,
                                    _ = void 0,
                                v > E && (E = v - Math.pow(v - E, .8), _ = "min"),
                                E > g && (E = g + Math.pow(E - g, .8), _ = "max"),
                                    h.wrapper.transform("translate3d(0," + E + "px,0)"),
                                    h.updateItems(void 0, E, 0, c.params.updateValuesOnTouchmove),
                                    O = E - D || E,
                                    P = (new Date).getTime(),
                                    D = E
                            }
                        }
                        function o(e) {
                            if (!y || !T) return void(y = T = !1);
                            y = T = !1,
                                h.wrapper.transition(""),
                            _ && ("min" === _ ? h.wrapper.transform("translate3d(0," + v + "px,0)") : h.wrapper.transform("translate3d(0," + g + "px,0)")),
                                b = (new Date).getTime();
                            var n, a;
                            b - C > 300 ? a = E: (n = Math.abs(O / (b - P)), a = E + O * c.params.momentumRatio),
                                a = Math.max(Math.min(a, g), v);
                            var r = -Math.floor((a - g) / f);
                            c.params.freeMode || (a = -r * f + g),
                                h.wrapper.transform("translate3d(0," + parseInt(a, 10) + "px,0)"),
                                h.updateItems(r, a, "", !0),
                            c.params.updateValuesOnMomentum && (i(), h.wrapper.transitionEnd(function() {
                                t.cancelAnimationFrame(w)
                            })),
                                setTimeout(function() {
                                        A = !0
                                    },
                                    100)
                        }
                        function s(e) {
                            if (A) {
                                t.cancelAnimationFrame(w);
                                var n = t(this).attr("data-picker-value");
                                h.setValue(n)
                            }
                        }
                        var l = t(e),
                            u = l.index(),
                            h = c.cols[u];
                        if (!h.divider) {
                            h.container = l,
                                h.wrapper = h.container.find(".picker-items-col-wrapper"),
                                h.items = h.wrapper.find(".picker-item");
                            var d, f, m, v, g;
                            h.replaceValues = function(t, e) {
                                h.destroyEvents(),
                                    h.values = t,
                                    h.displayValues = e;
                                var n = c.columnHTML(h, !0);
                                h.wrapper.html(n),
                                    h.items = h.wrapper.find(".picker-item"),
                                    h.calcSize(),
                                    h.setValue(h.values[0] || "", 0, !0),
                                    h.initEvents()
                            },
                                h.calcSize = function() {
                                    if (h.values.length) {
                                        c.params.rotateEffect && (h.container.removeClass("picker-items-col-absolute"), h.width || h.container.css({
                                            width: ""
                                        }));
                                        var e, n;
                                        e = 0,
                                            n = h.container[0].offsetHeight,
                                            d = h.wrapper[0].offsetHeight,
                                            f = h.items[0].offsetHeight,
                                            m = f * h.items.length,
                                            v = n / 2 - m + f / 2,
                                            g = n / 2 - f / 2,
                                        h.width && (e = h.width, parseInt(e, 10) === e && (e += "px"), h.container.css({
                                            width: e
                                        })),
                                        c.params.rotateEffect && (h.width || (h.items.each(function() {
                                            var n = t(this);
                                            n.css({
                                                width: "auto"
                                            }),
                                                e = Math.max(e, n[0].offsetWidth),
                                                n.css({
                                                    width: ""
                                                })
                                        }), h.container.css({
                                            width: e + 2 + "px"
                                        })), h.container.addClass("picker-items-col-absolute"))
                                    }
                                },
                                h.calcSize(),
                                h.wrapper.transform("translate3d(0," + g + "px,0)").transition(0);
                            var w;
                            h.setValue = function(e, n, a) {
                                "undefined" == typeof n && (n = "");
                                var r = h.wrapper.find('.picker-item[data-picker-value="' + e + '"]').index();
                                if ("undefined" == typeof r || -1 === r) return void(h.value = h.displayValue = e);
                                var o = -r * f + g;
                                h.wrapper.transition(n),
                                    h.wrapper.transform("translate3d(0," + o + "px,0)"),
                                c.params.updateValuesOnMomentum && h.activeIndex && h.activeIndex !== r && (t.cancelAnimationFrame(w), h.wrapper.transitionEnd(function() {
                                    t.cancelAnimationFrame(w)
                                }), i()),
                                    h.updateItems(r, o, n, a)
                            },
                                h.updateItems = function(e, n, i, a) {
                                    "undefined" == typeof n && (n = t.getTranslate(h.wrapper[0], "y")),
                                    "undefined" == typeof e && (e = -Math.round((n - g) / f)),
                                    0 > e && (e = 0),
                                    e >= h.items.length && (e = h.items.length - 1);
                                    var r = h.activeIndex;
                                    h.activeIndex = e,
                                        h.wrapper.find(".picker-selected").removeClass("picker-selected"),
                                    c.params.rotateEffect && h.items.transition(i);
                                    var o = h.items.eq(e).addClass("picker-selected").transform("");
                                    if ((a || "undefined" == typeof a) && (h.value = o.attr("data-picker-value"), h.displayValue = h.displayValues ? h.displayValues[e] : h.value, r !== e && (h.onChange && h.onChange(c, h.value, h.displayValue), c.updateValue())), c.params.rotateEffect) { (n - (Math.floor((n - g) / f) * f + g)) / f;
                                        h.items.each(function() {
                                            var e = t(this),
                                                i = e.index() * f,
                                                a = g - n,
                                                r = i - a,
                                                o = r / f,
                                                s = Math.ceil(h.height / f / 2) + 1,
                                                c = -18 * o;
                                            c > 180 && (c = 180),
                                            -180 > c && (c = -180),
                                                Math.abs(o) > s ? e.addClass("picker-item-far") : e.removeClass("picker-item-far"),
                                                e.transform("translate3d(0, " + ( - n + g) + "px, " + (p ? -110 : 0) + "px) rotateX(" + c + "deg)")
                                        })
                                    }
                                },
                            n && h.updateItems(0, g, 0);
                            var y, T, k, x, C, b, M, _, E, D, O, P, A = !0;
                            h.initEvents = function(e) {
                                var n = e ? "off": "on";
                                h.container[n](t.touchEvents.start, a),
                                    h.container[n](t.touchEvents.move, r),
                                    h.container[n](t.touchEvents.end, o),
                                    h.items[n]("click", s)
                            },
                                h.destroyEvents = function() {
                                    h.initEvents(!0)
                                },
                                h.container[0].f7DestroyPickerCol = function() {
                                    h.destroyEvents()
                                },
                                h.initEvents()
                        }
                    },
                    c.destroyPickerCol = function(e) {
                        e = t(e),
                        "f7DestroyPickerCol" in e[0] && e[0].f7DestroyPickerCol()
                    },
                    t(window).on("resize", a),
                    c.columnHTML = function(t, e) {
                        var n = "",
                            i = "";
                        if (t.divider) i += '<div class="picker-items-col picker-items-col-divider ' + (t.textAlign ? "picker-items-col-" + t.textAlign: "") + " " + (t.cssClass || "") + '">' + t.content + "</div>";
                        else {
                            for (var a = 0; a < t.values.length; a++) n += '<div class="picker-item" data-picker-value="' + t.values[a] + '">' + (t.displayValues ? t.displayValues[a] : t.values[a]) + "</div>";
                            i += '<div class="picker-items-col ' + (t.textAlign ? "picker-items-col-" + t.textAlign: "") + " " + (t.cssClass || "") + '"><div class="picker-items-col-wrapper">' + n + "</div></div>"
                        }
                        return e ? n: i
                    },
                    c.layout = function() {
                        var t, e = "",
                            n = "";
                        c.cols = [];
                        var i = "";
                        for (t = 0; t < c.params.cols.length; t++) {
                            var a = c.params.cols[t];
                            i += c.columnHTML(c.params.cols[t]),
                                c.cols.push(a)
                        }
                        n = "weui-picker-modal picker-columns " + (c.params.cssClass || "") + (c.params.rotateEffect ? " picker-3d": "") + (1 === c.params.cols.length ? " picker-columns-single": ""),
                            e = '<div class="' + n + '">' + (c.params.toolbar ? c.params.toolbarTemplate.replace(/{{closeText}}/g, c.params.toolbarCloseText).replace(/{{title}}/g, c.params.title) : "") + '<div class="picker-modal-inner picker-items">' + i + '<div class="picker-center-highlight"></div></div></div>',
                            c.pickerHTML = e
                    },
                c.params.input && (c.input = t(c.params.input), c.input.length > 0 && (c.params.inputReadOnly && c.input.prop("readOnly", !0), c.inline || c.input.on("click", r), c.params.inputReadOnly && c.input.on("focus mousedown",
                    function(t) {
                        t.preventDefault()
                    }))),
                c.inline || t("html").on("click", o),
                    c.opened = !1,
                    c.open = function() {
                        var e = n();
                        c.opened || (c.layout(), e ? (c.pickerHTML = '<div class="popover popover-picker-columns"><div class="popover-inner">' + c.pickerHTML + "</div></div>", c.popover = t.popover(c.pickerHTML, c.params.input, !0), c.container = t(c.popover).find(".weui-picker-modal"), t(c.popover).on("close",
                            function() {
                                s()
                            })) : c.inline ? (c.container = t(c.pickerHTML), c.container.addClass("picker-modal-inline"), t(c.params.container).append(c.container)) : (c.container = t(t.openPicker(c.pickerHTML)), t(c.container).on("close",
                            function() {
                                s()
                            })), c.container[0].f7Picker = c, c.container.find(".picker-items-col").each(function() {
                            var t = !0; (!c.initialized && c.params.value || c.initialized && c.value) && (t = !1),
                                c.initPickerCol(this, t)
                        }), c.initialized ? c.value && c.setValue(c.value, 0) : c.params.value && c.setValue(c.params.value, 0)),
                            c.opened = !0,
                            c.initialized = !0,
                        c.params.onOpen && c.params.onOpen(c)
                    },
                    c.close = function(e) {
                        return c.opened && !c.inline ? i() ? void t.closePicker(c.popover) : void t.closePicker(c.container) : void 0
                    },
                    c.destroy = function() {
                        c.close(),
                        c.params.input && c.input.length > 0 && (c.input.off("click focus", r), t(c.input).data("picker", null)),
                            t("html").off("click", o),
                            t(window).off("resize", a)
                    },
                c.inline && c.open(),
                    c
            };
            t(document).on("click", ".close-picker",
                function() {
                    var e = t(".weui-picker-modal.weui-picker-modal-visible");
                    e.length > 0 && t.closePicker(e)
                }),
                t(document).on(t.touchEvents.move, ".picker-modal-inner",
                    function(t) {
                        t.preventDefault()
                    }),
                t.openPicker = function(e, n, i) {
                    "function" == typeof n && (i = n, n = void 0),
                        t.closePicker();
                    var a = t("<div class='weui-picker-container " + (n || "") + "'></div>").appendTo(document.body);
                    a.show(),
                        a.addClass("weui-picker-container-visible");
                    var r = t(e).appendTo(a);
                    return r.width(),
                        r.addClass("weui-picker-modal-visible"),
                    i && a.on("close", i),
                        r
                },
                t.updatePicker = function(e) {
                    var n = t(".weui-picker-container-visible");
                    if (!n[0]) return ! 1;
                    n.html("");
                    var i = t(e).appendTo(n);
                    return i.addClass("weui-picker-modal-visible"),
                        i
                },
                t.closePicker = function(e, n) {
                    "function" == typeof e && (n = e),
                        t(".weui-picker-modal-visible").removeClass("weui-picker-modal-visible").transitionEnd(function() {
                            t(this).parent().remove(),
                            n && n()
                        }).trigger("close")
                },
                t.fn.picker = function(n) {
                    var i = arguments;
                    return this.each(function() {
                        if (this) {
                            var a = t(this),
                                r = a.data("picker");
                            if (!r) {
                                n = n || {};
                                var o = a.val();
                                void 0 === n.value && "" !== o && (n.value = n.cols && n.cols.length > 1 ? o.split(" ") : [o]);
                                var s = t.extend({
                                        input: this
                                    },
                                    n);
                                r = new e(s),
                                    a.data("picker", r)
                            }
                            "string" == typeof n && r[n].apply(r, Array.prototype.slice.call(i, 1))
                        }
                    })
                }
        } ($),
    +
        function(t) {
            "use strict";
            var e, n = [],
                i = function(e, i) {
                    this.config = i,
                        this.data = {
                            values: "",
                            titles: "",
                            origins: [],
                            length: 0
                        },
                        this.$input = t(e),
                        this.$input.prop("readOnly", !0),
                        this.initConfig(),
                        i = this.config,
                        this.$input.click(t.proxy(this.open, this)),
                        n.push(this)
                };
            i.prototype.initConfig = function() {
                this.config = t.extend({},
                    e, this.config);
                var n = this.config;
                n.items && n.items.length && (n.items = n.items.map(function(t, e) {
                    return "string" == typeof t ? {
                        title: t,
                        value: t
                    }: t
                }), this.tpl = t.t7.compile("<div class='weui-picker-modal weui-select-modal'>" + n.toolbarTemplate + (n.multi ? n.checkboxTemplate: n.radioTemplate) + "</div>"), void 0 !== n.input && this.$input.val(n.input), this.parseInitValue(), this._init = !0)
            },
                i.prototype.updateInputValue = function(t, e) {
                    var n, i;
                    this.config.multi ? (n = t.join(this.config.split), i = e.join(this.config.split)) : (n = t[0], i = e[0]);
                    var a = [];
                    this.config.items.forEach(function(e) {
                        t.each(function(t, n) {
                            e.value == n && a.push(e)
                        })
                    }),
                        this.$input.val(i).data("values", n),
                        this.$input.attr("value", i).attr("data-values", n);
                    var r = {
                        values: n,
                        titles: i,
                        valuesArray: t,
                        titlesArray: e,
                        origins: a,
                        length: a.length
                    };
                    this.data = r,
                        this.$input.trigger("change", r),
                    this.config.onChange && this.config.onChange.call(this, r)
                },
                i.prototype.parseInitValue = function() {
                    var t = this.$input.val(),
                        e = this.config.items;
                    if (this._init || void 0 !== t && null != t && "" !== t) for (var n = this.config.multi ? t.split(this.config.split) : [t], i = 0; i < e.length; i++) {
                        e[i].checked = !1;
                        for (var a = 0; a < n.length; a++) e[i].title === n[a] && (e[i].checked = !0)
                    }
                },
                i.prototype._bind = function(e) {
                    var n = this,
                        i = this.config;
                    e.on("change",
                        function(a) {
                            var r = e.find("input:checked"),
                                o = r.map(function() {
                                    return t(this).val()
                                }),
                                s = r.map(function() {
                                    return t(this).data("title")
                                });
                            n.updateInputValue(o, s),
                            i.autoClose && !i.multi && n.close()
                        }).on("click", ".close-select",
                        function() {
                            n.close()
                        })
                },
                i.prototype.update = function(e) {
                    this.config = t.extend({},
                        this.config, e),
                        this.initConfig(),
                    this._open && this._bind(t.updatePicker(this.getHTML()))
                },
                i.prototype.open = function(e, i) {
                    if (!this._open) {
                        for (var a = 0; a < n.length; a++) {
                            var r = n[a];
                            if (r !== this && r._open && !r.close()) return ! 1
                        }
                        this.parseInitValue();
                        var o = this.config,
                            s = this.dialog = t.openPicker(this.getHTML());
                        this._bind(s),
                            this._open = !0,
                        o.onOpen && o.onOpen(this)
                    }
                },
                i.prototype.close = function(e, n) {
                    if (!this._open) return ! 1;
                    var i = this,
                        a = this.config.beforeClose;
                    if (!n) {
                        if (a && "function" == typeof a && a.call(this, this.data.values, this.data.titles) === !1) return ! 1;
                        if (this.config.multi) {
                            if (void 0 !== this.config.min && this.data.length < this.config.min) return t.toast("???????????????" + this.config.min + "???", "text"),
                                !1;
                            if (void 0 !== this.config.max && this.data.length > this.config.max) return t.toast("??????????????????" + this.config.max + "???", "text"),
                                !1
                        }
                    }
                    return t.closePicker(function() {
                        i.onClose(),
                        e && e()
                    }),
                        !0
                },
                i.prototype.onClose = function() {
                    this._open = !1,
                    this.config.onClose && this.config.onClose(this)
                },
                i.prototype.getHTML = function(t) {
                    var e = this.config;
                    return this.tpl({
                        items: e.items,
                        title: e.title,
                        closeText: e.closeText
                    })
                },
                t.fn.select = function(e, n) {
                    return this.each(function() {
                        var a = t(this);
                        a.data("weui-select") || a.data("weui-select", new i(this, e));
                        var r = a.data("weui-select");
                        return "string" == typeof e && r[e].call(r, n),
                            r
                    })
                },
                e = t.fn.select.prototype.defaults = {
                    items: [],
                    input: void 0,
                    title: "?????????",
                    multi: !1,
                    closeText: "??????",
                    autoClose: !0,
                    onChange: void 0,
                    beforeClose: void 0,
                    onClose: void 0,
                    onOpen: void 0,
                    split: ",",
                    min: void 0,
                    max: void 0,
                    toolbarTemplate: '<div class="toolbar">      <div class="toolbar-inner">      <a href="javascript:;" class="picker-button close-select">{{closeText}}</a>      <h1 class="title">{{title}}</h1>      </div>      </div>',
                    radioTemplate: '<div class="weui-cells weui-cells_radio">        {{#items}}        <label class="weui-cell weui-check_label" for="weui-select-id-{{this.title}}">          <div class="weui-cell__bd weui-cell_primary">            <p>{{this.title}}</p>          </div>          <div class="weui-cell__ft">            <input type="radio" class="weui-check" name="weui-select" id="weui-select-id-{{this.title}}" value="{{this.value}}" {{#if this.checked}}checked="checked"{{/if}} data-title="{{this.title}}">            <span class="weui-icon-checked"></span>          </div>        </label>        {{/items}}      </div>',
                    checkboxTemplate: '<div class="weui-cells weui-cells_checkbox">        {{#items}}        <label class="weui-cell weui-check_label" for="weui-select-id-{{this.title}}">          <div class="weui-cell__bd weui-cell_primary">            <p>{{this.title}}</p>          </div>          <div class="weui-cell__ft">            <input type="checkbox" class="weui-check" name="weui-select" id="weui-select-id-{{this.title}}" value="{{this.value}}" {{#if this.checked}}checked="checked"{{/if}} data-title="{{this.title}}" >            <span class="weui-icon-checked"></span>          </div>        </label>        {{/items}}      </div>'
                }
        } ($),
    +
        function(t) {
            "use strict";
            var e, n = !1,
                i = function(t, e) {
                    var t = new Date(t),
                        e = new Date(e);
                    return t.getFullYear() === e.getFullYear() && t.getMonth() === e.getMonth() && t.getDate() === e.getDate()
                },
                a = function(a) {
                    function r() {
                        var e = !1;
                        return p.params.convertToPopover || p.params.onlyInPopover ? (!p.inline && p.params.input && (p.params.onlyInPopover ? e = !0 : t.device.ios ? e = !!t.device.ipad: t(window).width() >= 768 && (e = !0)), e) : e
                    }
                    function o() {
                        return !! (p.opened && p.container && p.container.length > 0 && p.container.parents(".popover").length > 0)
                    }
                    function s(t) {
                        t = new Date(t);
                        var e = t.getFullYear(),
                            n = t.getMonth(),
                            i = n + 1,
                            a = t.getDate(),
                            r = t.getDay();
                        return p.params.dateFormat.replace(/yyyy/g, e).replace(/yy/g, (e + "").substring(2)).replace(/mm/g, 10 > i ? "0" + i: i).replace(/m/g, i).replace(/MM/g, p.params.monthNames[n]).replace(/M/g, p.params.monthNamesShort[n]).replace(/dd/g, 10 > a ? "0" + a: a).replace(/d/g, a).replace(/DD/g, p.params.dayNames[r]).replace(/D/g, p.params.dayNamesShort[r])
                    }
                    function c(t) {
                        if (t.preventDefault(), !p.opened && (p.open(), p.params.scrollToInput && !r())) {
                            var e = p.input.parents(".page-content");
                            if (0 === e.length) return;
                            var n, i = parseInt(e.css("padding-top"), 10),
                                a = parseInt(e.css("padding-bottom"), 10),
                                o = e[0].offsetHeight - i - p.container.height(),
                                s = e[0].scrollHeight - i - p.container.height(),
                                c = p.input.offset().top - i + p.input[0].offsetHeight;
                            if (c > o) {
                                var l = e.scrollTop() + c - o;
                                l + o > s && (n = l + o - s + a, o === s && (n = p.container.height()), e.css({
                                    "padding-bottom": n + "px"
                                })),
                                    e.scrollTop(l, 300)
                            }
                        }
                    }
                    function l(e) {
                        o() || (p.input && p.input.length > 0 ? e.target !== p.input[0] && 0 === t(e.target).parents(".weui-picker-modal").length && p.close() : 0 === t(e.target).parents(".weui-picker-modal").length && p.close())
                    }
                    function u() {
                        p.opened = !1,
                        p.input && p.input.length > 0 && p.input.parents(".page-content").css({
                            "padding-bottom": ""
                        }),
                        p.params.onClose && p.params.onClose(p),
                            p.destroyCalendarEvents()
                    }
                    var p = this;
                    a = a || {};
                    for (var h in e)"undefined" == typeof a[h] && (a[h] = e[h]);
                    p.params = a,
                        p.initialized = !1,
                        p.inline = !!p.params.container,
                        p.isH = "horizontal" === p.params.direction;
                    var d = p.isH && n ? -1 : 1;
                    return p.animating = !1,
                        p.addValue = function(t) {
                            if (p.params.multiple) {
                                p.value || (p.value = []);
                                for (var e, n = 0; n < p.value.length; n++) i(t, p.value[n]) && (e = n);
                                "undefined" == typeof e ? p.value.push(t) : p.value.splice(e, 1),
                                    p.updateValue()
                            } else p.value = [t],
                                p.updateValue()
                        },
                        p.setValue = function(t) {
                            var e = new Date(t[0]);
                            p.setYearMonth(e.getFullYear(), e.getMonth()),
                                p.addValue( + e)
                        },
                        p.updateValue = function() {
                            p.wrapper.find(".picker-calendar-day-selected").removeClass("picker-calendar-day-selected");
                            var e, n;
                            for (e = 0; e < p.value.length; e++) {
                                var i = new Date(p.value[e]);
                                p.wrapper.find('.picker-calendar-day[data-date="' + i.getFullYear() + "-" + i.getMonth() + "-" + i.getDate() + '"]').addClass("picker-calendar-day-selected")
                            }
                            if (p.params.onChange && p.params.onChange(p, p.value.map(s), p.value.map(function(t) {
                                    return + new Date("string" == typeof t ? t.split(/\D/).filter(function(t) {
                                        return !! t
                                    }).join("-") : t)
                                })), p.input && p.input.length > 0) {
                                if (p.params.formatValue) n = p.params.formatValue(p, p.value);
                                else {
                                    for (n = [], e = 0; e < p.value.length; e++) n.push(s(p.value[e]));
                                    n = n.join(", ")
                                }
                                t(p.input).val(n),
                                    t(p.input).trigger("change")
                            }
                        },
                        p.initCalendarEvents = function() {
                            function e(e) {
                                if (!s && !o) {
                                    o = !0;
                                    var n = t.getTouchPosition(e);
                                    c = h = n.x,
                                        l = h = n.y,
                                        f = (new Date).getTime(),
                                        T = 0,
                                        C = !0,
                                        x = void 0,
                                        v = g = p.monthsTranslate
                                }
                            }
                            function i(e) {
                                if (o) {
                                    var n = t.getTouchPosition(e);
                                    if (u = n.x, h = n.y, "undefined" == typeof x && (x = !!(x || Math.abs(h - l) > Math.abs(u - c))), p.isH && x) return void(o = !1);
                                    if (e.preventDefault(), p.animating) return void(o = !1);
                                    C = !1,
                                    s || (s = !0, w = p.wrapper[0].offsetWidth, y = p.wrapper[0].offsetHeight, p.wrapper.transition(0)),
                                        e.preventDefault(),
                                        k = p.isH ? u - c: h - l,
                                        T = k / (p.isH ? w: y),
                                        g = 100 * (p.monthsTranslate * d + T),
                                        p.wrapper.transform("translate3d(" + (p.isH ? g: 0) + "%, " + (p.isH ? 0 : g) + "%, 0)")
                                }
                            }
                            function a(t) {
                                return o && s ? (o = s = !1, m = (new Date).getTime(), 300 > m - f ? Math.abs(k) < 10 ? p.resetMonth() : k >= 10 ? n ? p.nextMonth() : p.prevMonth() : n ? p.prevMonth() : p.nextMonth() : -.5 >= T ? n ? p.prevMonth() : p.nextMonth() : T >= .5 ? n ? p.nextMonth() : p.prevMonth() : p.resetMonth(), void setTimeout(function() {
                                        C = !0
                                    },
                                    100)) : void(o = s = !1)
                            }
                            function r(e) {
                                if (C) {
                                    var n = t(e.target).parents(".picker-calendar-day");
                                    if (0 === n.length && t(e.target).hasClass("picker-calendar-day") && (n = t(e.target)), 0 !== n.length && !n.hasClass("picker-calendar-day-disabled")) {
                                        n.hasClass("picker-calendar-day-next") && p.nextMonth(),
                                        n.hasClass("picker-calendar-day-prev") && p.prevMonth();
                                        var i = n.attr("data-year"),
                                            a = n.attr("data-month"),
                                            r = n.attr("data-day");
                                        p.params.onDayClick && p.params.onDayClick(p, n[0], i, a, r),
                                            p.addValue(new Date(i, a, r).getTime()),
                                        p.params.closeOnSelect && !p.params.multiple && p.close()
                                    }
                                }
                            }
                            var o, s, c, l, u, h, f, m, v, g, w, y, T, k, x, C = !0;
                            p.container.find(".picker-calendar-prev-month").on("click", p.prevMonth),
                                p.container.find(".picker-calendar-next-month").on("click", p.nextMonth),
                                p.container.find(".picker-calendar-prev-year").on("click", p.prevYear),
                                p.container.find(".picker-calendar-next-year").on("click", p.nextYear),
                                p.wrapper.on("click", r),
                            p.params.touchMove && (p.wrapper.on(t.touchEvents.start, e), p.wrapper.on(t.touchEvents.move, i), p.wrapper.on(t.touchEvents.end, a)),
                                p.container[0].f7DestroyCalendarEvents = function() {
                                    p.container.find(".picker-calendar-prev-month").off("click", p.prevMonth),
                                        p.container.find(".picker-calendar-next-month").off("click", p.nextMonth),
                                        p.container.find(".picker-calendar-prev-year").off("click", p.prevYear),
                                        p.container.find(".picker-calendar-next-year").off("click", p.nextYear),
                                        p.wrapper.off("click", r),
                                    p.params.touchMove && (p.wrapper.off(t.touchEvents.start, e), p.wrapper.off(t.touchEvents.move, i), p.wrapper.off(t.touchEvents.end, a))
                                }
                        },
                        p.destroyCalendarEvents = function(t) {
                            "f7DestroyCalendarEvents" in p.container[0] && p.container[0].f7DestroyCalendarEvents()
                        },
                        p.daysInMonth = function(t) {
                            var e = new Date(t);
                            return new Date(e.getFullYear(), e.getMonth() + 1, 0).getDate()
                        },
                        p.monthHTML = function(t, e) {
                            t = new Date(t);
                            var n = t.getFullYear(),
                                i = t.getMonth();
                            t.getDate();
                            "next" === e && (t = 11 === i ? new Date(n + 1, 0) : new Date(n, i + 1, 1)),
                            "prev" === e && (t = 0 === i ? new Date(n - 1, 11) : new Date(n, i - 1, 1)),
                            "next" !== e && "prev" !== e || (i = t.getMonth(), n = t.getFullYear());
                            var a = p.daysInMonth(new Date(t.getFullYear(), t.getMonth()).getTime() - 864e6),
                                r = p.daysInMonth(t),
                                o = new Date(t.getFullYear(), t.getMonth()).getDay();
                            0 === o && (o = 7);
                            var s, c, l, u = [],
                                h = 6,
                                d = 7,
                                f = "",
                                m = 0 + (p.params.firstDay - 1),
                                v = (new Date).setHours(0, 0, 0, 0),
                                g = p.params.minDate ? new Date(p.params.minDate).getTime() : null,
                                w = p.params.maxDate ? new Date(p.params.maxDate).getTime() : null;
                            if (p.value && p.value.length) for (c = 0; c < p.value.length; c++) u.push(new Date(p.value[c]).setHours(0, 0, 0, 0));
                            for (c = 1; h >= c; c++) {
                                var y = "";
                                for (l = 1; d >= l; l++) {
                                    var T = l;
                                    m++;
                                    var k = m - o,
                                        x = "";
                                    0 > k ? (k = a + k + 1, x += " picker-calendar-day-prev", s = new Date(0 > i - 1 ? n - 1 : n, 0 > i - 1 ? 11 : i - 1, k).getTime()) : (k += 1, k > r ? (k -= r, x += " picker-calendar-day-next", s = new Date(i + 1 > 11 ? n + 1 : n, i + 1 > 11 ? 0 : i + 1, k).getTime()) : s = new Date(n, i, k).getTime()),
                                    s === v && (x += " picker-calendar-day-today"),
                                    u.indexOf(s) >= 0 && (x += " picker-calendar-day-selected"),
                                    p.params.weekendDays.indexOf(T - 1) >= 0 && (x += " picker-calendar-day-weekend"),
                                    (g && g > s || w && s > w) && (x += " picker-calendar-day-disabled"),
                                        s = new Date(s);
                                    var C = s.getFullYear(),
                                        b = s.getMonth();
                                    y += '<div data-year="' + C + '" data-month="' + b + '" data-day="' + k + '" class="picker-calendar-day' + x + '" data-date="' + (C + "-" + b + "-" + k) + '"><span>' + k + "</span></div>"
                                }
                                f += '<div class="picker-calendar-row">' + y + "</div>"
                            }
                            return f = '<div class="picker-calendar-month" data-year="' + n + '" data-month="' + i + '">' + f + "</div>"
                        },
                        p.animating = !1,
                        p.updateCurrentMonthYear = function(t) {
                            "undefined" == typeof t ? (p.currentMonth = parseInt(p.months.eq(1).attr("data-month"), 10), p.currentYear = parseInt(p.months.eq(1).attr("data-year"), 10)) : (p.currentMonth = parseInt(p.months.eq("next" === t ? p.months.length - 1 : 0).attr("data-month"), 10), p.currentYear = parseInt(p.months.eq("next" === t ? p.months.length - 1 : 0).attr("data-year"), 10)),
                                p.container.find(".current-month-value").text(p.params.monthNames[p.currentMonth]),
                                p.container.find(".current-year-value").text(p.currentYear)
                        },
                        p.onMonthChangeStart = function(t) {
                            p.updateCurrentMonthYear(t),
                                p.months.removeClass("picker-calendar-month-current picker-calendar-month-prev picker-calendar-month-next");
                            var e = "next" === t ? p.months.length - 1 : 0;
                            p.months.eq(e).addClass("picker-calendar-month-current"),
                                p.months.eq("next" === t ? e - 1 : e + 1).addClass("next" === t ? "picker-calendar-month-prev": "picker-calendar-month-next"),
                            p.params.onMonthYearChangeStart && p.params.onMonthYearChangeStart(p, p.currentYear, p.currentMonth)
                        },
                        p.onMonthChangeEnd = function(t, e) {
                            p.animating = !1;
                            var n, i, a;
                            p.wrapper.find(".picker-calendar-month:not(.picker-calendar-month-prev):not(.picker-calendar-month-current):not(.picker-calendar-month-next)").remove(),
                            "undefined" == typeof t && (t = "next", e = !0),
                                e ? (p.wrapper.find(".picker-calendar-month-next, .picker-calendar-month-prev").remove(), i = p.monthHTML(new Date(p.currentYear, p.currentMonth), "prev"), n = p.monthHTML(new Date(p.currentYear, p.currentMonth), "next")) : a = p.monthHTML(new Date(p.currentYear, p.currentMonth), t),
                            ("next" === t || e) && p.wrapper.append(a || n),
                            ("prev" === t || e) && p.wrapper.prepend(a || i),
                                p.months = p.wrapper.find(".picker-calendar-month"),
                                p.setMonthsTranslate(p.monthsTranslate),
                            p.params.onMonthAdd && p.params.onMonthAdd(p, "next" === t ? p.months.eq(p.months.length - 1)[0] : p.months.eq(0)[0]),
                            p.params.onMonthYearChangeEnd && p.params.onMonthYearChangeEnd(p, p.currentYear, p.currentMonth)
                        },
                        p.setMonthsTranslate = function(t) {
                            t = t || p.monthsTranslate || 0,
                            "undefined" == typeof p.monthsTranslate && (p.monthsTranslate = t),
                                p.months.removeClass("picker-calendar-month-current picker-calendar-month-prev picker-calendar-month-next");
                            var e = 100 * -(t + 1) * d,
                                n = 100 * -t * d,
                                i = 100 * -(t - 1) * d;
                            p.months.eq(0).transform("translate3d(" + (p.isH ? e: 0) + "%, " + (p.isH ? 0 : e) + "%, 0)").addClass("picker-calendar-month-prev"),
                                p.months.eq(1).transform("translate3d(" + (p.isH ? n: 0) + "%, " + (p.isH ? 0 : n) + "%, 0)").addClass("picker-calendar-month-current"),
                                p.months.eq(2).transform("translate3d(" + (p.isH ? i: 0) + "%, " + (p.isH ? 0 : i) + "%, 0)").addClass("picker-calendar-month-next")
                        },
                        p.nextMonth = function(e) {
                            "undefined" != typeof e && "object" != typeof e || (e = "", p.params.animate || (e = 0));
                            var n = parseInt(p.months.eq(p.months.length - 1).attr("data-month"), 10),
                                i = parseInt(p.months.eq(p.months.length - 1).attr("data-year"), 10),
                                a = new Date(i, n),
                                r = a.getTime(),
                                o = !p.animating;
                            if (p.params.maxDate && r > new Date(p.params.maxDate).getTime()) return p.resetMonth();
                            if (p.monthsTranslate--, n === p.currentMonth) {
                                var s = 100 * -p.monthsTranslate * d,
                                    c = t(p.monthHTML(r, "next")).transform("translate3d(" + (p.isH ? s: 0) + "%, " + (p.isH ? 0 : s) + "%, 0)").addClass("picker-calendar-month-next");
                                p.wrapper.append(c[0]),
                                    p.months = p.wrapper.find(".picker-calendar-month"),
                                p.params.onMonthAdd && p.params.onMonthAdd(p, p.months.eq(p.months.length - 1)[0])
                            }
                            p.animating = !0,
                                p.onMonthChangeStart("next");
                            var l = 100 * p.monthsTranslate * d;
                            p.wrapper.transition(e).transform("translate3d(" + (p.isH ? l: 0) + "%, " + (p.isH ? 0 : l) + "%, 0)"),
                            o && p.wrapper.transitionEnd(function() {
                                p.onMonthChangeEnd("next")
                            }),
                            p.params.animate || p.onMonthChangeEnd("next")
                        },
                        p.prevMonth = function(e) {
                            "undefined" != typeof e && "object" != typeof e || (e = "", p.params.animate || (e = 0));
                            var n = parseInt(p.months.eq(0).attr("data-month"), 10),
                                i = parseInt(p.months.eq(0).attr("data-year"), 10),
                                a = new Date(i, n + 1, -1),
                                r = a.getTime(),
                                o = !p.animating;
                            if (p.params.minDate && r < new Date(p.params.minDate).getTime()) return p.resetMonth();
                            if (p.monthsTranslate++, n === p.currentMonth) {
                                var s = 100 * -p.monthsTranslate * d,
                                    c = t(p.monthHTML(r, "prev")).transform("translate3d(" + (p.isH ? s: 0) + "%, " + (p.isH ? 0 : s) + "%, 0)").addClass("picker-calendar-month-prev");
                                p.wrapper.prepend(c[0]),
                                    p.months = p.wrapper.find(".picker-calendar-month"),
                                p.params.onMonthAdd && p.params.onMonthAdd(p, p.months.eq(0)[0])
                            }
                            p.animating = !0,
                                p.onMonthChangeStart("prev");
                            var l = 100 * p.monthsTranslate * d;
                            p.wrapper.transition(e).transform("translate3d(" + (p.isH ? l: 0) + "%, " + (p.isH ? 0 : l) + "%, 0)"),
                            o && p.wrapper.transitionEnd(function() {
                                p.onMonthChangeEnd("prev")
                            }),
                            p.params.animate || p.onMonthChangeEnd("prev")
                        },
                        p.resetMonth = function(t) {
                            "undefined" == typeof t && (t = "");
                            var e = 100 * p.monthsTranslate * d;
                            p.wrapper.transition(t).transform("translate3d(" + (p.isH ? e: 0) + "%, " + (p.isH ? 0 : e) + "%, 0)")
                        },
                        p.setYearMonth = function(t, e, n) {
                            "undefined" == typeof t && (t = p.currentYear),
                            "undefined" == typeof e && (e = p.currentMonth),
                            "undefined" != typeof n && "object" != typeof n || (n = "", p.params.animate || (n = 0));
                            var i;
                            if (i = t < p.currentYear ? new Date(t, e + 1, -1).getTime() : new Date(t, e).getTime(), p.params.maxDate && i > new Date(p.params.maxDate).getTime()) return ! 1;
                            if (p.params.minDate && i < new Date(p.params.minDate).getTime()) return ! 1;
                            var a = new Date(p.currentYear, p.currentMonth).getTime(),
                                r = i > a ? "next": "prev",
                                o = p.monthHTML(new Date(t, e));
                            p.monthsTranslate = p.monthsTranslate || 0;
                            var s, c, l = p.monthsTranslate,
                                u = !p.animating;
                            i > a ? (p.monthsTranslate--, p.animating || p.months.eq(p.months.length - 1).remove(), p.wrapper.append(o), p.months = p.wrapper.find(".picker-calendar-month"), s = 100 * -(l - 1) * d, p.months.eq(p.months.length - 1).transform("translate3d(" + (p.isH ? s: 0) + "%, " + (p.isH ? 0 : s) + "%, 0)").addClass("picker-calendar-month-next")) : (p.monthsTranslate++, p.animating || p.months.eq(0).remove(), p.wrapper.prepend(o), p.months = p.wrapper.find(".picker-calendar-month"), s = 100 * -(l + 1) * d, p.months.eq(0).transform("translate3d(" + (p.isH ? s: 0) + "%, " + (p.isH ? 0 : s) + "%, 0)").addClass("picker-calendar-month-prev")),
                            p.params.onMonthAdd && p.params.onMonthAdd(p, "next" === r ? p.months.eq(p.months.length - 1)[0] : p.months.eq(0)[0]),
                                p.animating = !0,
                                p.onMonthChangeStart(r),
                                c = 100 * p.monthsTranslate * d,
                                p.wrapper.transition(n).transform("translate3d(" + (p.isH ? c: 0) + "%, " + (p.isH ? 0 : c) + "%, 0)"),
                            u && p.wrapper.transitionEnd(function() {
                                p.onMonthChangeEnd(r, !0)
                            }),
                            p.params.animate || p.onMonthChangeEnd(r)
                        },
                        p.nextYear = function() {
                            p.setYearMonth(p.currentYear + 1)
                        },
                        p.prevYear = function() {
                            p.setYearMonth(p.currentYear - 1)
                        },
                        p.layout = function() {
                            var t, e = "",
                                n = "",
                                i = p.value && p.value.length ? p.value[0] : (new Date).setHours(0, 0, 0, 0),
                                a = p.monthHTML(i, "prev"),
                                r = p.monthHTML(i),
                                o = p.monthHTML(i, "next"),
                                s = '<div class="picker-calendar-months"><div class="picker-calendar-months-wrapper">' + (a + r + o) + "</div></div>",
                                c = "";
                            if (p.params.weekHeader) {
                                for (t = 0; 7 > t; t++) {
                                    var l = t + p.params.firstDay > 6 ? t - 7 + p.params.firstDay: t + p.params.firstDay,
                                        u = p.params.dayNamesShort[l];
                                    c += '<div class="picker-calendar-week-day ' + (p.params.weekendDays.indexOf(l) >= 0 ? "picker-calendar-week-day-weekend": "") + '"> ' + u + "</div>"
                                }
                                c = '<div class="picker-calendar-week-days">' + c + "</div>"
                            }
                            n = "weui-picker-calendar " + (p.params.cssClass || ""),
                            p.inline || (n = "weui-picker-modal " + n);
                            var h = p.params.toolbar ? p.params.toolbarTemplate.replace(/{{closeText}}/g, p.params.toolbarCloseText) : "";
                            p.params.toolbar && (h = p.params.toolbarTemplate.replace(/{{closeText}}/g, p.params.toolbarCloseText).replace(/{{monthPicker}}/g, p.params.monthPicker ? p.params.monthPickerTemplate: "").replace(/{{yearPicker}}/g, p.params.yearPicker ? p.params.yearPickerTemplate: "")),
                                e = '<div class="' + n + '">' + h + '<div class="picker-modal-inner">' + c + s + "</div></div>",
                                p.pickerHTML = e
                        },
                    p.params.input && (p.input = t(p.params.input), p.input.length > 0 && (p.params.inputReadOnly && p.input.prop("readOnly", !0), p.inline || p.input.on("click", c), p.params.inputReadOnly && p.input.on("focus mousedown",
                        function(t) {
                            t.preventDefault()
                        }))),
                    p.inline || t(document).on("click touchend", l),
                        p.opened = !1,
                        p.open = function() {
                            var e = r() && !1,
                                n = !1;
                            p.opened || (p.value || p.params.value && (p.value = p.params.value, n = !0), p.layout(), e ? (p.pickerHTML = '<div class="popover popover-picker-calendar"><div class="popover-inner">' + p.pickerHTML + "</div></div>", p.popover = t.popover(p.pickerHTML, p.params.input, !0), p.container = t(p.popover).find(".weui-picker-modal"), t(p.popover).on("close",
                                function() {
                                    u()
                                })) : p.inline ? (p.container = t(p.pickerHTML), p.container.addClass("picker-modal-inline"), t(p.params.container).append(p.container)) : (p.container = t(t.openPicker(p.pickerHTML)), t(p.container).on("close",
                                function() {
                                    u()
                                })), p.container[0].f7Calendar = p, p.wrapper = p.container.find(".picker-calendar-months-wrapper"), p.months = p.wrapper.find(".picker-calendar-month"), p.updateCurrentMonthYear(), p.monthsTranslate = 0, p.setMonthsTranslate(), p.initCalendarEvents(), n && p.updateValue()),
                                p.opened = !0,
                                p.initialized = !0,
                            p.params.onMonthAdd && p.months.each(function() {
                                p.params.onMonthAdd(p, this)
                            }),
                            p.params.onOpen && p.params.onOpen(p)
                        },
                        p.close = function() {
                            return p.opened && !p.inline ? (p.animating = !1, o() ? void t.closePicker(p.popover) : void t.closePicker(p.container)) : void 0
                        },
                        p.destroy = function() {
                            p.close(),
                            p.params.input && p.input.length > 0 && (p.input.off("click focus", c), p.input.data("calendar", null)),
                                t("html").off("click", l)
                        },
                    p.inline && p.open(),
                        p
                },
                r = function(t) {
                    return 10 > t ? "0" + t: t
                };
            t.fn.calendar = function(e, n) {
                return e = e || {},
                    this.each(function() {
                        var i = t(this);
                        if (i[0]) {
                            var o = {};
                            "INPUT" === i[0].tagName.toUpperCase() ? o.input = i: o.container = i;
                            var s = i.data("calendar");
                            if (!s) if ("string" == typeof e);
                            else {
                                if (!e.value && i.val() && (e.value = [i.val()]), !e.value) {
                                    var c = new Date;
                                    e.value = [c.getFullYear() + "-" + r(c.getMonth() + 1) + "-" + r(c.getDate())]
                                }
                                s = i.data("calendar", new a(t.extend(o, e)))
                            }
                            "string" == typeof e && s[e].call(s, n)
                        }
                    })
            },
                e = t.fn.calendar.prototype.defaults = {
                    value: void 0,
                    monthNames: ["??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "?????????", "?????????"],
                    monthNamesShort: ["??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "?????????", "?????????"],
                    dayNames: ["??????", "??????", "??????", "??????", "??????", "??????", "??????"],
                    dayNamesShort: ["??????", "??????", "??????", "??????", "??????", "??????", "??????"],
                    firstDay: 1,
                    weekendDays: [0, 6],
                    multiple: !1,
                    dateFormat: "yyyy-mm-dd",
                    direction: "horizontal",
                    minDate: null,
                    maxDate: null,
                    touchMove: !0,
                    animate: !0,
                    closeOnSelect: !0,
                    monthPicker: !0,
                    monthPickerTemplate: '<div class="picker-calendar-month-picker"><a href="javascript:;" class="link icon-only picker-calendar-prev-month"><i class="icon icon-prev"></i></a><div class="current-month-value"></div><a href="javascript:;" class="link icon-only picker-calendar-next-month"><i class="icon icon-next"></i></a></div>',
                    yearPicker: !0,
                    yearPickerTemplate: '<div class="picker-calendar-year-picker"><a href="javascript:;" class="link icon-only picker-calendar-prev-year"><i class="icon icon-prev"></i></a><span class="current-year-value"></span><a href="javascript:;" class="link icon-only picker-calendar-next-year"><i class="icon icon-next"></i></a></div>',
                    weekHeader: !0,
                    scrollToInput: !0,
                    inputReadOnly: !0,
                    convertToPopover: !0,
                    onlyInPopover: !1,
                    toolbar: !0,
                    toolbarCloseText: "Done",
                    toolbarTemplate: '<div class="toolbar"><div class="toolbar-inner">{{yearPicker}}{{monthPicker}}</div></div>'
                }
        } ($),
    +
        function(t) {
            "use strict";
            var e, n = function(t) {
                    return 10 > t ? "0" + t: t
                },
                i = function(e, n) {
                    this.input = t(e),
                        this.params = n,
                        this.initMonthes = "01 02 03 04 05 06 07 08 09 10 11 12".split(" "),
                        this.initYears = function() {
                            for (var t = [], e = 1950; 2030 >= e; e++) t.push(e);
                            return t
                        } ();
                    var i = t.extend({},
                        n, this.getConfig());
                    t(this.input).picker(i)
                };
            i.prototype = {
                getDays: function(t) {
                    for (var e = [], n = 1; (t || 31) >= n; n++) e.push(10 > n ? "0" + n: n);
                    return e
                },
                getDaysByMonthAndYear: function(t, e) {
                    var n = new Date(e, parseInt(t) + 1 - 1, 1),
                        i = new Date(n - 1);
                    return this.getDays(i.getDate())
                },
                getConfig: function() {
                    var t, e = new Date,
                        i = this.params,
                        a = this,
                        r = {
                            rotateEffect: !1,
                            cssClass: "datetime-picker",
                            value: [e.getFullYear(), n(e.getMonth() + 1), n(e.getDate()), n(e.getHours()), n(e.getMinutes())],
                            onChange: function(e, n, r) {
                                var o = (e.cols, a.getDaysByMonthAndYear(n[1], n[0])),
                                    s = n[2];
                                s > o.length && (s = o.length),
                                    e.cols[4].setValue(s);
                                var c = new Date(n[0] + "-" + n[1] + "-" + n[2]),
                                    l = !0;
                                if (i.min) {
                                    var u = new Date("function" == typeof i.min ? i.min() : i.min); + u > c && (e.setValue(t), l = !1)
                                }
                                if (i.max) {
                                    var p = new Date("function" == typeof i.max ? i.max() : i.max);
                                    c > +p && (e.setValue(t), l = !1)
                                }
                                l && (t = n),
                                a.params.onChange && a.params.onChange.apply(this, arguments)
                            },
                            formatValue: function(t, e, n) {
                                return a.params.format(t, e, n)
                            },
                            cols: [{
                                values: function() {
                                    for (var t = [], e = 1950; 2050 >= e; e++) t.push(e);
                                    return t
                                } ()
                            },
                                {
                                    divider: !0,
                                    content: i.yearSplit
                                },
                                {
                                    values: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
                                },
                                {
                                    divider: !0,
                                    content: i.monthSplit
                                },
                                {
                                    values: function() {
                                        for (var t = [], e = 1; 31 >= e; e++) t.push(n(e));
                                        return t
                                    } ()
                                }]
                        };
                    i.dateSplit && r.cols.push({
                        divider: !0,
                        content: i.dateSplit
                    }),
                        r.cols.push({
                            divider: !0,
                            content: i.datetimeSplit
                        });
                    var o = a.params.times();
                    o && o.length && (r.cols = r.cols.concat(o));
                    var s = this.input.val();
                    return s && (r.value = i.parse(s)),
                    this.params.value && (this.input.val(this.params.value), r.value = i.parse(this.params.value)),
                        r
                }
            },
                t.fn.datetimePicker = function(n) {
                    return n = t.extend({},
                        e, n),
                        this.each(function() {
                            if (this) {
                                var e = t(this),
                                    a = e.data("datetime");
                                return a || e.data("datetime", new i(this, n)),
                                    a
                            }
                        })
                },
                e = t.fn.datetimePicker.prototype.defaults = {
                    input: void 0,
                    min: void 0,
                    max: void 0,
                    yearSplit: "-",
                    monthSplit: "-",
                    dateSplit: "",
                    datetimeSplit: " ",
                    times: function() {
                        return [{
                            values: function() {
                                for (var t = [], e = 0; 24 > e; e++) t.push(n(e));
                                return t
                            } ()
                        },
                            {
                                divider: !0,
                                content: ":"
                            },
                            {
                                values: function() {
                                    for (var t = [], e = 0; 60 > e; e++) t.push(n(e));
                                    return t
                                } ()
                            }]
                    },
                    format: function(t, e) {
                        return t.cols.map(function(t) {
                            return t.value || t.content
                        }).join("")
                    },
                    parse: function(t) {
                        var e = t.split(this.datetimeSplit);
                        return e[0].split(/\D/).concat(e[1].split(/:|???|???|???/)).filter(function(t) {
                            return !! t
                        })
                    }
                }
        } ($),
    +
        function(t) {
            "use strict";
            t.openPopup = function(e, n) {
                t.closePopup(),
                    e = t(e),
                    e.show(),
                    e.width(),
                    e.addClass("weui-popup__container--visible");
                var i = e.find(".weui-popup__modal");
                i.width(),
                    i.transitionEnd(function() {
                        i.trigger("open")
                    })
            },
                t.closePopup = function(e, n) {
                    e = t(e || ".weui-popup__container--visible"),
                        e.find(".weui-popup__modal").transitionEnd(function() {
                            var i = t(this);
                            i.trigger("close"),
                                e.hide(),
                            n && e.remove()
                        }),
                        e.removeClass("weui-popup__container--visible")
                },
                t(document).on("click", ".close-popup, .weui-popup__overlay",
                    function() {
                        t.closePopup()
                    }).on("click", ".open-popup",
                    function() {
                        t(t(this).data("target")).popup()
                    }).on("click", ".weui-popup__container",
                    function(e) {
                        t(e.target).hasClass("weui-popup__container") && t.closePopup()
                    }),
                t.fn.popup = function() {
                    return this.each(function() {
                        t.openPopup(this)
                    })
                }
        } ($),
    +
        function(t) {
            "use strict";
            var e, n, i, a, r, o, s = function(n) {
                    var i = t.getTouchPosition(n);
                    a = i,
                        r = o = 0,
                        e.addClass("touching")
                },
                c = function(n) {
                    if (!a) return ! 1;
                    n.preventDefault(),
                        n.stopPropagation();
                    var i = t.getTouchPosition(n);
                    r = i.x - a.x,
                        o = i.y - a.y,
                    o > 0 && (o = Math.sqrt(o)),
                        e.css("transform", "translate3d(0, " + o + "px, 0)")
                },
                l = function() {
                    e.removeClass("touching"),
                        e.attr("style", ""),
                    0 > o && Math.abs(o) > .38 * e.height() && t.closeNotification(),
                    Math.abs(r) <= 1 && Math.abs(o) <= 1 && e.trigger("noti-click"),
                        a = !1
                },
                u = function(e) {
                    e.on(t.touchEvents.start, s),
                        e.on(t.touchEvents.move, c),
                        e.on(t.touchEvents.end, l)
                };
            t.notification = t.noti = function(a) {
                a = t.extend({},
                    n, a),
                    e = t(".weui-notification"),
                e[0] || (e = t('<div class="weui-notification"></div>').appendTo(document.body), u(e)),
                    e.off("noti-click"),
                a.onClick && e.on("noti-click",
                    function() {
                        a.onClick(a.data)
                    }),
                    e.html(t.t7.compile(a.tpl)(a)),
                    e.show(),
                    e.addClass("weui-notification--in"),
                    e.data("params", a);
                var r = function() {
                    i && (clearTimeout(i), i = null),
                        i = setTimeout(function() {
                                e.hasClass("weui-notification--touching") ? r() : t.closeNotification()
                            },
                            a.time)
                };
                r()
            },
                t.closeNotification = function() {
                    i && clearTimeout(i),
                        i = null;
                    var e = t(".weui-notification").removeClass("weui-notification--in").transitionEnd(function() {
                        t(this).remove()
                    });
                    if (e[0]) {
                        var n = t(".weui-notification").data("params");
                        n && n.onClose && n.onClose(n.data)
                    }
                },
                n = t.noti.prototype.defaults = {
                    title: void 0,
                    text: void 0,
                    media: void 0,
                    time: 4e3,
                    onClick: void 0,
                    onClose: void 0,
                    data: void 0,
                    tpl: '<div class="weui-notification__inner">{{#if media}}<div class="weui-notification__media">{{media}}</div>{{/if}}<div class="weui-notification__content">{{#if title}}<div class="weui-notification__title">{{title}}</div>{{/if}}{{#if text}}<div class="weui-notification__text">{{text}}</div>{{/if}}</div><div class="weui-notification__handle-bar"></div></div>'
                }
        } ($),
    +
        function(t) {
            "use strict";
            var e;
            t.toptip = function(n, i, a) {
                if (n) {
                    "string" == typeof i && (a = i, i = void 0),
                        i = i || 3e3;
                    var r = a ? "bg-" + a: "bg-danger",
                        o = t(".weui-toptips").remove();
                    o = t('<div class="weui-toptips"></div>').appendTo(document.body),
                        o.html(n),
                        o[0].className = "weui-toptips " + r,
                        clearTimeout(e),
                    o.hasClass("weui-toptips_visible") || (o.show().width(), o.addClass("weui-toptips_visible")),
                        e = setTimeout(function() {
                                o.removeClass("weui-toptips_visible").transitionEnd(function() {
                                    o.remove()
                                })
                            },
                            i)
                }
            }
        } ($),
    +
        function(t) {
            "use strict";
            var e = function(e, n) {
                this.container = t(e),
                    this.handler = this.container.find(".weui-slider__handler"),
                    this.track = this.container.find(".weui-slider__track"),
                    this.value = this.container.find(".weui-slider-box__value"),
                    this.bind(),
                "function" == typeof n && (this.callback = n)
            };
            e.prototype.bind = function() {
                this.container.on(t.touchEvents.start, t.proxy(this.touchStart, this)).on(t.touchEvents.end, t.proxy(this.touchEnd, this)),
                    t(document.body).on(t.touchEvents.move, t.proxy(this.touchMove, this))
            },
                e.prototype.touchStart = function(e) {
                    e.preventDefault(),
                        this.start = t.getTouchPosition(e),
                        this.width = this.container.find(".weui-slider__inner").width(),
                        this.left = parseInt(this.container.find(".weui-slider__handler").css("left")),
                        this.touching = !0
                },
                e.prototype.touchMove = function(e) {
                    if (!this.touching) return ! 0;
                    var n = t.getTouchPosition(e),
                        i = n.x - this.start.x,
                        a = i + this.left,
                        r = parseInt(a / this.width * 100);
                    0 > r && (r = 0),
                    r > 100 && (r = 100),
                        this.handler.css("left", r + "%"),
                        this.track.css("width", r + "%"),
                        this.value.text(r),
                    this.callback && this.callback.call(this, r),
                        this.container.trigger("change", r)
                },
                e.prototype.touchEnd = function(t) {
                    this.touching = !1
                },
                t.fn.slider = function(n) {
                    this.each(function() {
                        var i = t(this),
                            a = i.data("slider");
                        return a ? a: void i.data("slider", new e(this, n))
                    })
                }
        } ($);