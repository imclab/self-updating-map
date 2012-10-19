/*
 Copyright (c) 2010-2012, CloudMade, Vladimir Agafonkin
 Leaflet is an open-source JavaScript library for mobile-friendly interactive maps.
 http://leaflet.cloudmade.com
*/
(function(e, t) {
  var n, r;
  typeof exports != t + "" ? n = exports : (r = e.L, n = {}, n.noConflict = function() {
    return e.L = r, this
  }, e.L = n), n.version = "0.4.4", n.Util = {
    extend: function(e) {
      var t = Array.prototype.slice.call(arguments, 1);
      for (var n = 0, r = t.length, i; n < r; n++) {
        i = t[n] || {};
        for (var s in i) i.hasOwnProperty(s) && (e[s] = i[s])
      }
      return e
    },
    bind: function(e, t) {
      var n = arguments.length > 2 ? Array.prototype.slice.call(arguments, 2) : null;
      return function() {
        return e.apply(t, n || arguments)
      }
    },
    stamp: function() {
      var e = 0,
        t = "_leaflet_id";
      return function(n) {
        return n[t] = n[t] || ++e, n[t]
      }
    }(),
    limitExecByInterval: function(e, t, n) {
      var r, i;
      return function s() {
        var o = arguments;
        if (r) {
          i = !0;
          return
        }
        r = !0, setTimeout(function() {
          r = !1, i && (s.apply(n, o), i = !1)
        }, t), e.apply(n, o)
      }
    },
    falseFn: function() {
      return !1
    },
    formatNum: function(e, t) {
      var n = Math.pow(10, t || 5);
      return Math.round(e * n) / n
    },
    splitWords: function(e) {
      return e.replace(/^\s+|\s+$/g, "").split(/\s+/)
    },
    setOptions: function(e, t) {
      return e.options = n.Util.extend({}, e.options, t), e.options
    },
    getParamString: function(e) {
      var t = [];
      for (var n in e) e.hasOwnProperty(n) && t.push(n + "=" + e[n]);
      return "?" + t.join("&")
    },
    template: function(e, t) {
      return e.replace(/\{ *([\w_]+) *\}/g, function(e, n) {
        var r = t[n];
        if (!t.hasOwnProperty(n)) throw Error("No value provided for variable " + e);
        return r
      })
    },
    emptyImageUrl: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
  }, function() {
    function t(t) {
      var n, r, i = ["webkit", "moz", "o", "ms"];
      for (n = 0; n < i.length && !r; n++) r = e[i[n] + t];
      return r
    }
    function i(t) {
      var n = +(new Date),
        i = Math.max(0, 16 - (n - r));
      return r = n + i, e.setTimeout(t, i)
    }
    var r = 0,
      s = e.requestAnimationFrame || t("RequestAnimationFrame") || i,
      o = e.cancelAnimationFrame || t("CancelAnimationFrame") || t("CancelRequestAnimationFrame") ||
    function(t) {
      e.clearTimeout(t)
    };
    n.Util.requestAnimFrame = function(t, r, o, u) {
      t = n.Util.bind(t, r);
      if (!o || s !== i) return s.call(e, t, u);
      t()
    }, n.Util.cancelAnimFrame = function(t) {
      t && o.call(e, t)
    }
  }(), n.Class = function() {}, n.Class.extend = function(e) {
    var t = function() {
        this.initialize && this.initialize.apply(this, arguments)
      },
      r = function() {};
    r.prototype = this.prototype;
    var i = new r;
    i.constructor = t, t.prototype = i;
    for (var s in this) this.hasOwnProperty(s) && s !== "prototype" && (t[s] = this[s]);
    return e.statics && (n.Util.extend(t, e.statics), delete e.statics), e.includes && (n.Util.extend.apply(null, [i].concat(e.includes)), delete e.includes), e.options && i.options && (e.options = n.Util.extend({}, i.options, e.options)), n.Util.extend(i, e), t
  }, n.Class.include = function(e) {
    n.Util.extend(this.prototype, e)
  }, n.Class.mergeOptions = function(e) {
    n.Util.extend(this.prototype.options, e)
  };
  var i = "_leaflet_events";
  n.Mixin = {}, n.Mixin.Events = {
    addEventListener: function(e, t, r) {
      var s = this[i] = this[i] || {},
        o, u, a;
      if (typeof e == "object") {
        for (o in e) e.hasOwnProperty(o) && this.addEventListener(o, e[o], t);
        return this
      }
      e = n.Util.splitWords(e);
      for (u = 0, a = e.length; u < a; u++) s[e[u]] = s[e[u]] || [], s[e[u]].push({
        action: t,
        context: r || this
      });
      return this
    },
    hasEventListeners: function(e) {
      return i in this && e in this[i] && this[i][e].length > 0
    },
    removeEventListener: function(e, t, r) {
      var s = this[i],
        o, u, a, f, l;
      if (typeof e == "object") {
        for (o in e) e.hasOwnProperty(o) && this.removeEventListener(o, e[o], t);
        return this
      }
      e = n.Util.splitWords(e);
      for (u = 0, a = e.length; u < a; u++) if (this.hasEventListeners(e[u])) {
        f = s[e[u]];
        for (l = f.length - 1; l >= 0; l--)(!t || f[l].action === t) && (!r || f[l].context === r) && f.splice(l, 1)
      }
      return this
    },
    fireEvent: function(e, t) {
      if (!this.hasEventListeners(e)) return this;
      var r = n.Util.extend({
        type: e,
        target: this
      }, t),
        s = this[i][e].slice();
      for (var o = 0, u = s.length; o < u; o++) s[o].action.call(s[o].context || this, r);
      return this
    }
  }, n.Mixin.Events.on = n.Mixin.Events.addEventListener, n.Mixin.Events.off = n.Mixin.Events.removeEventListener, n.Mixin.Events.fire = n.Mixin.Events.fireEvent, function() {
    var r = navigator.userAgent.toLowerCase(),
      i = !! e.ActiveXObject,
      s = i && !e.XMLHttpRequest,
      o = r.indexOf("webkit") !== -1,
      u = r.indexOf("gecko") !== -1,
      a = r.indexOf("chrome") !== -1,
      f = e.opera,
      l = r.indexOf("android") !== -1,
      c = r.search("android [23]") !== -1,
      h = typeof orientation != t + "" ? !0 : !1,
      p = document.documentElement,
      d = i && "transition" in p.style,
      v = o && "WebKitCSSMatrix" in e && "m11" in new e.WebKitCSSMatrix,
      m = u && "MozPerspective" in p.style,
      g = f && "OTransition" in p.style,
      y = e.navigator && e.navigator.msPointerEnabled && e.navigator.msMaxTouchPoints,
      b = !e.L_NO_TOUCH &&
    function() {
      var e = "ontouchstart";
      if (y) return !0;
      if (e in p) return !0;
      var t = document.createElement("div"),
        n = !1;
      return t.setAttribute ? (t.setAttribute(e, "return;"), typeof t[e] == "function" && (n = !0), t.removeAttribute(e), t = null, n) : !1
    }(), w = "devicePixelRatio" in e && e.devicePixelRatio > 1 || "matchMedia" in e && e.matchMedia("(min-resolution:144dpi)").matches;
    n.Browser = {
      ua: r,
      ie: i,
      ie6: s,
      webkit: o,
      gecko: u,
      opera: f,
      android: l,
      android23: c,
      chrome: a,
      ie3d: d,
      webkit3d: v,
      gecko3d: m,
      opera3d: g,
      any3d: !e.L_DISABLE_3D && (d || v || m || g),
      mobile: h,
      mobileWebkit: h && o,
      mobileWebkit3d: h && v,
      mobileOpera: h && f,
      touch: b,
      msTouch: y,
      retina: w
    }
  }(), n.Point = function(e, t, n) {
    this.x = n ? Math.round(e) : e, this.y = n ? Math.round(t) : t
  }, n.Point.prototype = {
    clone: function() {
      return new n.Point(this.x, this.y)
    },
    add: function(e) {
      return this.clone()._add(n.point(e))
    },
    _add: function(e) {
      return this.x += e.x, this.y += e.y, this
    },
    subtract: function(e) {
      return this.clone()._subtract(n.point(e))
    },
    _subtract: function(e) {
      return this.x -= e.x, this.y -= e.y, this
    },
    divideBy: function(e) {
      return this.clone()._divideBy(e)
    },
    _divideBy: function(e) {
      return this.x /= e, this.y /= e, this
    },
    multiplyBy: function(e) {
      return this.clone()._multiplyBy(e)
    },
    _multiplyBy: function(e) {
      return this.x *= e, this.y *= e, this
    },
    round: function() {
      return this.clone()._round()
    },
    _round: function() {
      return this.x = Math.round(this.x), this.y = Math.round(this.y), this
    },
    floor: function() {
      return this.clone()._floor()
    },
    _floor: function() {
      return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
    },
    distanceTo: function(e) {
      e = n.point(e);
      var t = e.x - this.x,
        r = e.y - this.y;
      return Math.sqrt(t * t + r * r)
    },
    toString: function() {
      return "Point(" + n.Util.formatNum(this.x) + ", " + n.Util.formatNum(this.y) + ")"
    }
  }, n.point = function(e, t, r) {
    return e instanceof n.Point ? e : e instanceof Array ? new n.Point(e[0], e[1]) : isNaN(e) ? e : new n.Point(e, t, r)
  }, n.Bounds = n.Class.extend({
    initialize: function(e, t) {
      if (!e) return;
      var n = t ? [e, t] : e;
      for (var r = 0, i = n.length; r < i; r++) this.extend(n[r])
    },
    extend: function(e) {
      return e = n.point(e), !this.min && !this.max ? (this.min = e.clone(), this.max = e.clone()) : (this.min.x = Math.min(e.x, this.min.x), this.max.x = Math.max(e.x, this.max.x), this.min.y = Math.min(e.y, this.min.y), this.max.y = Math.max(e.y, this.max.y)), this
    },
    getCenter: function(e) {
      return new n.Point((this.min.x + this.max.x) / 2, (this.min.y + this.max.y) / 2, e)
    },
    getBottomLeft: function() {
      return new n.Point(this.min.x, this.max.y)
    },
    getTopRight: function() {
      return new n.Point(this.max.x, this.min.y)
    },
    contains: function(e) {
      var t, r;
      return typeof e[0] == "number" || e instanceof n.Point ? e = n.point(e) : e = n.bounds(e), e instanceof n.Bounds ? (t = e.min, r = e.max) : t = r = e, t.x >= this.min.x && r.x <= this.max.x && t.y >= this.min.y && r.y <= this.max.y
    },
    intersects: function(e) {
      e = n.bounds(e);
      var t = this.min,
        r = this.max,
        i = e.min,
        s = e.max,
        o = s.x >= t.x && i.x <= r.x,
        u = s.y >= t.y && i.y <= r.y;
      return o && u
    },
    isValid: function() {
      return !!this.min && !! this.max
    }
  }), n.bounds = function(e, t) {
    return !e || e instanceof n.Bounds ? e : new n.Bounds(e, t)
  }, n.Transformation = n.Class.extend({
    initialize: function(e, t, n, r) {
      this._a = e, this._b = t, this._c = n, this._d = r
    },
    transform: function(e, t) {
      return this._transform(e.clone(), t)
    },
    _transform: function(e, t) {
      return t = t || 1, e.x = t * (this._a * e.x + this._b), e.y = t * (this._c * e.y + this._d), e
    },
    untransform: function(e, t) {
      return t = t || 1, new n.Point((e.x / t - this._b) / this._a, (e.y / t - this._d) / this._c)
    }
  }), n.DomUtil = {
    get: function(e) {
      return typeof e == "string" ? document.getElementById(e) : e
    },
    getStyle: function(e, t) {
      var n = e.style[t];
      !n && e.currentStyle && (n = e.currentStyle[t]);
      if (!n || n === "auto") {
        var r = document.defaultView.getComputedStyle(e, null);
        n = r ? r[t] : null
      }
      return n === "auto" ? null : n
    },
    getViewportOffset: function(e) {
      var t = 0,
        r = 0,
        i = e,
        s = document.body,
        o;
      do {
        t += i.offsetTop || 0, r += i.offsetLeft || 0, o = n.DomUtil.getStyle(i, "position");
        if (i.offsetParent === s && o === "absolute") break;
        if (o === "fixed") {
          t += s.scrollTop || 0, r += s.scrollLeft || 0;
          break
        }
        i = i.offsetParent
      } while (i);
      i = e;
      do {
        if (i === s) break;
        t -= i.scrollTop || 0, r -= i.scrollLeft || 0, i = i.parentNode
      } while (i);
      return new n.Point(r, t)
    },
    create: function(e, t, n) {
      var r = document.createElement(e);
      return r.className = t, n && n.appendChild(r), r
    },
    disableTextSelection: function() {
      document.selection && document.selection.empty && document.selection.empty(), this._onselectstart || (this._onselectstart = document.onselectstart, document.onselectstart = n.Util.falseFn)
    },
    enableTextSelection: function() {
      document.onselectstart === n.Util.falseFn && (document.onselectstart = this._onselectstart, this._onselectstart = null)
    },
    hasClass: function(e, t) {
      return e.className.length > 0 && RegExp("(^|\\s)" + t + "(\\s|$)").test(e.className)
    },
    addClass: function(e, t) {
      n.DomUtil.hasClass(e, t) || (e.className += (e.className ? " " : "") + t)
    },
    removeClass: function(e, t) {
      function n(e, n) {
        return n === t ? "" : e
      }
      e.className = e.className.replace(/(\S+)\s*/g, n).replace(/(^\s+|\s+$)/, "")
    },
    setOpacity: function(e, t) {
      if ("opacity" in e.style) e.style.opacity = t;
      else if (n.Browser.ie) {
        var r = !1,
          i = "DXImageTransform.Microsoft.Alpha";
        try {
          r = e.filters.item(i)
        } catch (s) {}
        t = Math.round(t * 100), r ? (r.Enabled = t !== 100, r.Opacity = t) : e.style.filter += " progid:" + i + "(opacity=" + t + ")"
      }
    },
    testProp: function(e) {
      var t = document.documentElement.style;
      for (var n = 0; n < e.length; n++) if (e[n] in t) return e[n];
      return !1
    },
    getTranslateString: function(e) {
      var t = n.Browser.webkit3d,
        r = "translate" + (t ? "3d" : "") + "(",
        i = (t ? ",0" : "") + ")";
      return r + e.x + "px," + e.y + "px" + i
    },
    getScaleString: function(e, t) {
      var r = n.DomUtil.getTranslateString(t.add(t.multiplyBy(-1 * e))),
        i = " scale(" + e + ") ";
      return r + i
    },
    setPosition: function(e, t, r) {
      e._leaflet_pos = t, !r && n.Browser.any3d ? (e.style[n.DomUtil.TRANSFORM] = n.DomUtil.getTranslateString(t), n.Browser.mobileWebkit3d && (e.style.WebkitBackfaceVisibility = "hidden")) : (e.style.left = t.x + "px", e.style.top = t.y + "px")
    },
    getPosition: function(e) {
      return e._leaflet_pos
    }
  }, n.DomUtil.TRANSFORM = n.DomUtil.testProp(["transform", "WebkitTransform", "OTransform", "MozTransform", "msTransform"]), n.DomUtil.TRANSITION = n.DomUtil.testProp(["transition", "webkitTransition", "OTransition", "MozTransition", "msTransition"]), n.DomUtil.TRANSITION_END = n.DomUtil.TRANSITION === "webkitTransition" || n.DomUtil.TRANSITION === "OTransition" ? n.DomUtil.TRANSITION + "End" : "transitionend", n.LatLng = function(e, t, n) {
    var r = parseFloat(e),
      i = parseFloat(t);
    if (isNaN(r) || isNaN(i)) throw Error("Invalid LatLng object: (" + e + ", " + t + ")");
    n !== !0 && (r = Math.max(Math.min(r, 90), -90), i = (i + 180) % 360 + (i < -180 || i === 180 ? 180 : -180)), this.lat = r, this.lng = i
  }, n.Util.extend(n.LatLng, {
    DEG_TO_RAD: Math.PI / 180,
    RAD_TO_DEG: 180 / Math.PI,
    MAX_MARGIN: 1e-9
  }), n.LatLng.prototype = {
    equals: function(e) {
      if (!e) return !1;
      e = n.latLng(e);
      var t = Math.max(Math.abs(this.lat - e.lat), Math.abs(this.lng - e.lng));
      return t <= n.LatLng.MAX_MARGIN
    },
    toString: function(e) {
      return "LatLng(" + n.Util.formatNum(this.lat, e) + ", " + n.Util.formatNum(this.lng, e) + ")"
    },
    distanceTo: function(e) {
      e = n.latLng(e);
      var t = 6378137,
        r = n.LatLng.DEG_TO_RAD,
        i = (e.lat - this.lat) * r,
        s = (e.lng - this.lng) * r,
        o = this.lat * r,
        u = e.lat * r,
        a = Math.sin(i / 2),
        f = Math.sin(s / 2),
        l = a * a + f * f * Math.cos(o) * Math.cos(u);
      return t * 2 * Math.atan2(Math.sqrt(l), Math.sqrt(1 - l))
    }
  }, n.latLng = function(e, t, r) {
    return e instanceof n.LatLng ? e : e instanceof Array ? new n.LatLng(e[0], e[1]) : isNaN(e) ? e : new n.LatLng(e, t, r)
  }, n.LatLngBounds = n.Class.extend({
    initialize: function(e, t) {
      if (!e) return;
      var n = t ? [e, t] : e;
      for (var r = 0, i = n.length; r < i; r++) this.extend(n[r])
    },
    extend: function(e) {
      return typeof e[0] == "number" || e instanceof n.LatLng ? e = n.latLng(e) : e = n.latLngBounds(e), e instanceof n.LatLng ? !this._southWest && !this._northEast ? (this._southWest = new n.LatLng(e.lat, e.lng, !0), this._northEast = new n.LatLng(e.lat, e.lng, !0)) : (this._southWest.lat = Math.min(e.lat, this._southWest.lat), this._southWest.lng = Math.min(e.lng, this._southWest.lng), this._northEast.lat = Math.max(e.lat, this._northEast.lat), this._northEast.lng = Math.max(e.lng, this._northEast.lng)) : e instanceof n.LatLngBounds && (this.extend(e._southWest), this.extend(e._northEast)), this
    },
    pad: function(e) {
      var t = this._southWest,
        r = this._northEast,
        i = Math.abs(t.lat - r.lat) * e,
        s = Math.abs(t.lng - r.lng) * e;
      return new n.LatLngBounds(new n.LatLng(t.lat - i, t.lng - s), new n.LatLng(r.lat + i, r.lng + s))
    },
    getCenter: function() {
      return new n.LatLng((this._southWest.lat + this._northEast.lat) / 2, (this._southWest.lng + this._northEast.lng) / 2)
    },
    getSouthWest: function() {
      return this._southWest
    },
    getNorthEast: function() {
      return this._northEast
    },
    getNorthWest: function() {
      return new n.LatLng(this._northEast.lat, this._southWest.lng, !0)
    },
    getSouthEast: function() {
      return new n.LatLng(this._southWest.lat, this._northEast.lng, !0)
    },
    contains: function(e) {
      typeof e[0] == "number" || e instanceof n.LatLng ? e = n.latLng(e) : e = n.latLngBounds(e);
      var t = this._southWest,
        r = this._northEast,
        i, s;
      return e instanceof n.LatLngBounds ? (i = e.getSouthWest(), s = e.getNorthEast()) : i = s = e, i.lat >= t.lat && s.lat <= r.lat && i.lng >= t.lng && s.lng <= r.lng
    },
    intersects: function(e) {
      e = n.latLngBounds(e);
      var t = this._southWest,
        r = this._northEast,
        i = e.getSouthWest(),
        s = e.getNorthEast(),
        o = s.lat >= t.lat && i.lat <= r.lat,
        u = s.lng >= t.lng && i.lng <= r.lng;
      return o && u
    },
    toBBoxString: function() {
      var e = this._southWest,
        t = this._northEast;
      return [e.lng, e.lat, t.lng, t.lat].join(",")
    },
    equals: function(e) {
      return e ? (e = n.latLngBounds(e), this._southWest.equals(e.getSouthWest()) && this._northEast.equals(e.getNorthEast())) : !1
    },
    isValid: function() {
      return !!this._southWest && !! this._northEast
    }
  }), n.latLngBounds = function(e, t) {
    return !e || e instanceof n.LatLngBounds ? e : new n.LatLngBounds(e, t)
  }, n.Projection = {}, n.Projection.SphericalMercator = {
    MAX_LATITUDE: 85.0511287798,
    project: function(e) {
      var t = n.LatLng.DEG_TO_RAD,
        r = this.MAX_LATITUDE,
        i = Math.max(Math.min(r, e.lat), -r),
        s = e.lng * t,
        o = i * t;
      return o = Math.log(Math.tan(Math.PI / 4 + o / 2)), new n.Point(s, o)
    },
    unproject: function(e) {
      var t = n.LatLng.RAD_TO_DEG,
        r = e.x * t,
        i = (2 * Math.atan(Math.exp(e.y)) - Math.PI / 2) * t;
      return new n.LatLng(i, r, !0)
    }
  }, n.Projection.LonLat = {
    project: function(e) {
      return new n.Point(e.lng, e.lat)
    },
    unproject: function(e) {
      return new n.LatLng(e.y, e.x, !0)
    }
  }, n.CRS = {
    latLngToPoint: function(e, t) {
      var n = this.projection.project(e),
        r = this.scale(t);
      return this.transformation._transform(n, r)
    },
    pointToLatLng: function(e, t) {
      var n = this.scale(t),
        r = this.transformation.untransform(e, n);
      return this.projection.unproject(r)
    },
    project: function(e) {
      return this.projection.project(e)
    },
    scale: function(e) {
      return 256 * Math.pow(2, e)
    }
  }, n.CRS.EPSG3857 = n.Util.extend({}, n.CRS, {
    code: "EPSG:3857",
    projection: n.Projection.SphericalMercator,
    transformation: new n.Transformation(.5 / Math.PI, .5, -0.5 / Math.PI, .5),
    project: function(e) {
      var t = this.projection.project(e),
        n = 6378137;
      return t.multiplyBy(n)
    }
  }), n.CRS.EPSG900913 = n.Util.extend({}, n.CRS.EPSG3857, {
    code: "EPSG:900913"
  }), n.CRS.EPSG4326 = n.Util.extend({}, n.CRS, {
    code: "EPSG:4326",
    projection: n.Projection.LonLat,
    transformation: new n.Transformation(1 / 360, .5, -1 / 360, .5)
  }), n.Map = n.Class.extend({
    includes: n.Mixin.Events,
    options: {
      crs: n.CRS.EPSG3857,
      fadeAnimation: n.DomUtil.TRANSITION && !n.Browser.android23,
      trackResize: !0,
      markerZoomAnimation: n.DomUtil.TRANSITION && n.Browser.any3d
    },
    initialize: function(e, r) {
      r = n.Util.setOptions(this, r), this._initContainer(e), this._initLayout(), this._initHooks(), this._initEvents(), r.maxBounds && this.setMaxBounds(r.maxBounds), r.center && r.zoom !== t && this.setView(n.latLng(r.center), r.zoom, !0), this._initLayers(r.layers)
    },
    setView: function(e, t) {
      return this._resetView(n.latLng(e), this._limitZoom(t)), this
    },
    setZoom: function(e) {
      return this.setView(this.getCenter(), e)
    },
    zoomIn: function(e) {
      return this.setZoom(this._zoom + (e || 1))
    },
    zoomOut: function(e) {
      return this.setZoom(this._zoom - (e || 1))
    },
    fitBounds: function(e) {
      var t = this.getBoundsZoom(e);
      return this.setView(n.latLngBounds(e).getCenter(), t)
    },
    fitWorld: function() {
      var e = new n.LatLng(-60, -170),
        t = new n.LatLng(85, 179);
      return this.fitBounds(new n.LatLngBounds(e, t))
    },
    panTo: function(e) {
      return this.setView(e, this._zoom)
    },
    panBy: function(e) {
      return this.fire("movestart"), this._rawPanBy(n.point(e)), this.fire("move"), this.fire("moveend")
    },
    setMaxBounds: function(e) {
      e = n.latLngBounds(e), this.options.maxBounds = e;
      if (!e) return this._boundsMinZoom = null, this;
      var t = this.getBoundsZoom(e, !0);
      return this._boundsMinZoom = t, this._loaded && (this._zoom < t ? this.setView(e.getCenter(), t) : this.panInsideBounds(e)), this
    },
    panInsideBounds: function(e) {
      e = n.latLngBounds(e);
      var t = this.getBounds(),
        r = this.project(t.getSouthWest()),
        i = this.project(t.getNorthEast()),
        s = this.project(e.getSouthWest()),
        o = this.project(e.getNorthEast()),
        u = 0,
        a = 0;
      return i.y < o.y && (a = o.y - i.y), i.x > o.x && (u = o.x - i.x), r.y > s.y && (a = s.y - r.y), r.x < s.x && (u = s.x - r.x), this.panBy(new n.Point(u, a, !0))
    },
    addLayer: function(e) {
      var t = n.Util.stamp(e);
      return this._layers[t] ? this : (this._layers[t] = e, e.options && !isNaN(e.options.maxZoom) && (this._layersMaxZoom = Math.max(this._layersMaxZoom || 0, e.options.maxZoom)), e.options && !isNaN(e.options.minZoom) && (this._layersMinZoom = Math.min(this._layersMinZoom || Infinity, e.options.minZoom)), this.options.zoomAnimation && n.TileLayer && e instanceof n.TileLayer && (this._tileLayersNum++, this._tileLayersToLoad++, e.on("load", this._onTileLayerLoad, this)), this.whenReady(function() {
        e.onAdd(this), this.fire("layeradd", {
          layer: e
        })
      }, this), this)
    },
    removeLayer: function(e) {
      var t = n.Util.stamp(e);
      if (!this._layers[t]) return;
      return e.onRemove(this), delete this._layers[t], this.options.zoomAnimation && n.TileLayer && e instanceof n.TileLayer && (this._tileLayersNum--, this._tileLayersToLoad--, e.off("load", this._onTileLayerLoad, this)), this.fire("layerremove", {
        layer: e
      })
    },
    hasLayer: function(e) {
      var t = n.Util.stamp(e);
      return this._layers.hasOwnProperty(t)
    },
    invalidateSize: function(e) {
      var t = this.getSize();
      this._sizeChanged = !0, this.options.maxBounds && this.setMaxBounds(this.options.maxBounds);
      if (!this._loaded) return this;
      var r = t._subtract(this.getSize())._divideBy(2)._round();
      return e === !0 ? this.panBy(r) : (this._rawPanBy(r), this.fire("move"), clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(n.Util.bind(this.fire, this, "moveend"), 200)), this
    },
    addHandler: function(e, t) {
      if (!t) return;
      return this[e] = new t(this), this.options[e] && this[e].enable(), this
    },
    getCenter: function() {
      return this.layerPointToLatLng(this._getCenterLayerPoint())
    },
    getZoom: function() {
      return this._zoom
    },
    getBounds: function() {
      var e = this.getPixelBounds(),
        t = this.unproject(e.getBottomLeft()),
        r = this.unproject(e.getTopRight());
      return new n.LatLngBounds(t, r)
    },
    getMinZoom: function() {
      var e = this.options.minZoom || 0,
        t = this._layersMinZoom || 0,
        n = this._boundsMinZoom || 0;
      return Math.max(e, t, n)
    },
    getMaxZoom: function() {
      var e = this.options.maxZoom === t ? Infinity : this.options.maxZoom,
        n = this._layersMaxZoom === t ? Infinity : this._layersMaxZoom;
      return Math.min(e, n)
    },
    getBoundsZoom: function(e, t) {
      e = n.latLngBounds(e);
      var r = this.getSize(),
        i = this.options.minZoom || 0,
        s = this.getMaxZoom(),
        o = e.getNorthEast(),
        u = e.getSouthWest(),
        a, f, l, c = !0;
      t && i--;
      do i++, f = this.project(o, i), l = this.project(u, i), a = new n.Point(Math.abs(f.x - l.x), Math.abs(l.y - f.y)), t ? c = a.x < r.x || a.y < r.y : c = a.x <= r.x && a.y <= r.y;
      while (c && i <= s);
      return c && t ? null : t ? i : i - 1
    },
    getSize: function() {
      if (!this._size || this._sizeChanged) this._size = new n.Point(this._container.clientWidth, this._container.clientHeight), this._sizeChanged = !1;
      return this._size.clone()
    },
    getPixelBounds: function() {
      var e = this._getTopLeftPoint();
      return new n.Bounds(e, e.add(this.getSize()))
    },
    getPixelOrigin: function() {
      return this._initialTopLeftPoint
    },
    getPanes: function() {
      return this._panes
    },
    getContainer: function() {
      return this._container
    },
    getZoomScale: function(e) {
      var t = this.options.crs;
      return t.scale(e) / t.scale(this._zoom)
    },
    getScaleZoom: function(e) {
      return this._zoom + Math.log(e) / Math.LN2
    },
    project: function(e, r) {
      return r = r === t ? this._zoom : r, this.options.crs.latLngToPoint(n.latLng(e), r)
    },
    unproject: function(e, r) {
      return r = r === t ? this._zoom : r, this.options.crs.pointToLatLng(n.point(e), r)
    },
    layerPointToLatLng: function(e) {
      var t = n.point(e).add(this._initialTopLeftPoint);
      return this.unproject(t)
    },
    latLngToLayerPoint: function(e) {
      var t = this.project(n.latLng(e))._round();
      return t._subtract(this._initialTopLeftPoint)
    },
    containerPointToLayerPoint: function(e) {
      return n.point(e).subtract(this._getMapPanePos())
    },
    layerPointToContainerPoint: function(e) {
      return n.point(e).add(this._getMapPanePos())
    },
    containerPointToLatLng: function(e) {
      var t = this.containerPointToLayerPoint(n.point(e));
      return this.layerPointToLatLng(t)
    },
    latLngToContainerPoint: function(e) {
      return this.layerPointToContainerPoint(this.latLngToLayerPoint(n.latLng(e)))
    },
    mouseEventToContainerPoint: function(e) {
      return n.DomEvent.getMousePosition(e, this._container)
    },
    mouseEventToLayerPoint: function(e) {
      return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e))
    },
    mouseEventToLatLng: function(e) {
      return this.layerPointToLatLng(this.mouseEventToLayerPoint(e))
    },
    _initContainer: function(e) {
      var t = this._container = n.DomUtil.get(e);
      if (t._leaflet) throw Error("Map container is already initialized.");
      t._leaflet = !0
    },
    _initLayout: function() {
      var e = this._container;
      e.innerHTML = "", n.DomUtil.addClass(e, "leaflet-container"), n.Browser.touch && n.DomUtil.addClass(e, "leaflet-touch"), this.options.fadeAnimation && n.DomUtil.addClass(e, "leaflet-fade-anim");
      var t = n.DomUtil.getStyle(e, "position");
      t !== "absolute" && t !== "relative" && t !== "fixed" && (e.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos()
    },
    _initPanes: function() {
      var e = this._panes = {};
      this._mapPane = e.mapPane = this._createPane("leaflet-map-pane", this._container), this._tilePane = e.tilePane = this._createPane("leaflet-tile-pane", this._mapPane), this._objectsPane = e.objectsPane = this._createPane("leaflet-objects-pane", this._mapPane), e.shadowPane = this._createPane("leaflet-shadow-pane"), e.overlayPane = this._createPane("leaflet-overlay-pane"), e.markerPane = this._createPane("leaflet-marker-pane"), e.popupPane = this._createPane("leaflet-popup-pane");
      var t = " leaflet-zoom-hide";
      this.options.markerZoomAnimation || (n.DomUtil.addClass(e.markerPane, t), n.DomUtil.addClass(e.shadowPane, t), n.DomUtil.addClass(e.popupPane, t))
    },
    _createPane: function(e, t) {
      return n.DomUtil.create("div", e, t || this._objectsPane)
    },
    _initializers: [],
    _initHooks: function() {
      var e, t;
      for (e = 0, t = this._initializers.length; e < t; e++) this._initializers[e].call(this)
    },
    _initLayers: function(e) {
      e = e ? e instanceof Array ? e : [e] : [], this._layers = {}, this._tileLayersNum = 0;
      var t, n;
      for (t = 0, n = e.length; t < n; t++) this.addLayer(e[t])
    },
    _resetView: function(e, t, r, i) {
      var s = this._zoom !== t;
      i || (this.fire("movestart"), s && this.fire("zoomstart")), this._zoom = t, this._initialTopLeftPoint = this._getNewTopLeftPoint(e), r ? this._initialTopLeftPoint._add(this._getMapPanePos()) : n.DomUtil.setPosition(this._mapPane, new n.Point(0, 0)), this._tileLayersToLoad = this._tileLayersNum;
      var o = !this._loaded;
      this._loaded = !0, this.fire("viewreset", {
        hard: !r
      }), this.fire("move"), (s || i) && this.fire("zoomend"), this.fire("moveend", {
        hard: !r
      }), o && this.fire("load")
    },
    _rawPanBy: function(e) {
      n.DomUtil.setPosition(this._mapPane, this._getMapPanePos().subtract(e))
    },
    _initEvents: function() {
      if (!n.DomEvent) return;
      n.DomEvent.on(this._container, "click", this._onMouseClick, this);
      var t = ["dblclick", "mousedown", "mouseup", "mouseenter", "mouseleave", "mousemove", "contextmenu"],
        r, i;
      for (r = 0, i = t.length; r < i; r++) n.DomEvent.on(this._container, t[r], this._fireMouseEvent, this);
      this.options.trackResize && n.DomEvent.on(e, "resize", this._onResize, this)
    },
    _onResize: function() {
      n.Util.cancelAnimFrame(this._resizeRequest), this._resizeRequest = n.Util.requestAnimFrame(this.invalidateSize, this, !1, this._container)
    },
    _onMouseClick: function(e) {
      if (!this._loaded || this.dragging && this.dragging.moved()) return;
      this.fire("preclick"), this._fireMouseEvent(e)
    },
    _fireMouseEvent: function(e) {
      if (!this._loaded) return;
      var t = e.type;
      t = t === "mouseenter" ? "mouseover" : t === "mouseleave" ? "mouseout" : t;
      if (!this.hasEventListeners(t)) return;
      t === "contextmenu" && n.DomEvent.preventDefault(e);
      var r = this.mouseEventToContainerPoint(e),
        i = this.containerPointToLayerPoint(r),
        s = this.layerPointToLatLng(i);
      this.fire(t, {
        latlng: s,
        layerPoint: i,
        containerPoint: r,
        originalEvent: e
      })
    },
    _onTileLayerLoad: function() {
      this._tileLayersToLoad--, this._tileLayersNum && !this._tileLayersToLoad && this._tileBg && (clearTimeout(this._clearTileBgTimer), this._clearTileBgTimer = setTimeout(n.Util.bind(this._clearTileBg, this), 500))
    },
    whenReady: function(e, t) {
      return this._loaded ? e.call(t || this, this) : this.on("load", e, t), this
    },
    _getMapPanePos: function() {
      return n.DomUtil.getPosition(this._mapPane)
    },
    _getTopLeftPoint: function() {
      if (!this._loaded) throw Error("Set map center and zoom first.");
      return this._initialTopLeftPoint.subtract(this._getMapPanePos())
    },
    _getNewTopLeftPoint: function(e, t) {
      var n = this.getSize()._divideBy(2);
      return this.project(e, t)._subtract(n)._round()
    },
    _latLngToNewLayerPoint: function(e, t, n) {
      var r = this._getNewTopLeftPoint(n, t).add(this._getMapPanePos());
      return this.project(e, t)._subtract(r)
    },
    _getCenterLayerPoint: function() {
      return this.containerPointToLayerPoint(this.getSize()._divideBy(2))
    },
    _getCenterOffset: function(e) {
      return this.latLngToLayerPoint(e).subtract(this._getCenterLayerPoint())
    },
    _limitZoom: function(e) {
      var t = this.getMinZoom(),
        n = this.getMaxZoom();
      return Math.max(t, Math.min(n, e))
    }
  }), n.Map.addInitHook = function(e) {
    var t = Array.prototype.slice.call(arguments, 1),
      n = typeof e == "function" ? e : function() {
        this[e].apply(this, t)
      };
    this.prototype._initializers.push(n)
  }, n.map = function(e, t) {
    return new n.Map(e, t)
  }, n.Projection.Mercator = {
    MAX_LATITUDE: 85.0840591556,
    R_MINOR: 6356752.3142,
    R_MAJOR: 6378137,
    project: function(e) {
      var t = n.LatLng.DEG_TO_RAD,
        r = this.MAX_LATITUDE,
        i = Math.max(Math.min(r, e.lat), -r),
        s = this.R_MAJOR,
        o = this.R_MINOR,
        u = e.lng * t * s,
        a = i * t,
        f = o / s,
        l = Math.sqrt(1 - f * f),
        c = l * Math.sin(a);
      c = Math.pow((1 - c) / (1 + c), l * .5);
      var h = Math.tan(.5 * (Math.PI * .5 - a)) / c;
      return a = -o * Math.log(h), new n.Point(u, a)
    },
    unproject: function(e) {
      var t = n.LatLng.RAD_TO_DEG,
        r = this.R_MAJOR,
        i = this.R_MINOR,
        s = e.x * t / r,
        o = i / r,
        u = Math.sqrt(1 - o * o),
        a = Math.exp(-e.y / i),
        f = Math.PI / 2 - 2 * Math.atan(a),
        l = 15,
        c = 1e-7,
        h = l,
        p = .1,
        d;
      while (Math.abs(p) > c && --h > 0) d = u * Math.sin(f), p = Math.PI / 2 - 2 * Math.atan(a * Math.pow((1 - d) / (1 + d), .5 * u)) - f, f += p;
      return new n.LatLng(f * t, s, !0)
    }
  }, n.CRS.EPSG3395 = n.Util.extend({}, n.CRS, {
    code: "EPSG:3395",
    projection: n.Projection.Mercator,
    transformation: function() {
      var e = n.Projection.Mercator,
        t = e.R_MAJOR,
        r = e.R_MINOR;
      return new n.Transformation(.5 / (Math.PI * t), .5, -0.5 / (Math.PI * r), .5)
    }()
  }), n.TileLayer = n.Class.extend({
    includes: n.Mixin.Events,
    options: {
      minZoom: 0,
      maxZoom: 18,
      tileSize: 256,
      subdomains: "abc",
      errorTileUrl: "",
      attribution: "",
      zoomOffset: 0,
      opacity: 1,
      unloadInvisibleTiles: n.Browser.mobile,
      updateWhenIdle: n.Browser.mobile
    },
    initialize: function(e, t) {
      t = n.Util.setOptions(this, t), t.detectRetina && n.Browser.retina && t.maxZoom > 0 && (t.tileSize = Math.floor(t.tileSize / 2), t.zoomOffset++, t.minZoom > 0 && t.minZoom--, this.options.maxZoom--), this._url = e;
      var r = this.options.subdomains;
      typeof r == "string" && (this.options.subdomains = r.split(""))
    },
    onAdd: function(e) {
      this._map = e, this._initContainer(), this._createTileProto(), e.on({
        viewreset: this._resetCallback,
        moveend: this._update
      }, this), this.options.updateWhenIdle || (this._limitedUpdate = n.Util.limitExecByInterval(this._update, 150, this), e.on("move", this._limitedUpdate, this)), this._reset(), this._update()
    },
    addTo: function(e) {
      return e.addLayer(this), this
    },
    onRemove: function(e) {
      e._panes.tilePane.removeChild(this._container), e.off({
        viewreset: this._resetCallback,
        moveend: this._update
      }, this), this.options.updateWhenIdle || e.off("move", this._limitedUpdate, this), this._container = null, this._map = null
    },
    bringToFront: function() {
      var e = this._map._panes.tilePane;
      return this._container && (e.appendChild(this._container), this._setAutoZIndex(e, Math.max)), this
    },
    bringToBack: function() {
      var e = this._map._panes.tilePane;
      return this._container && (e.insertBefore(this._container, e.firstChild), this._setAutoZIndex(e, Math.min)), this
    },
    getAttribution: function() {
      return this.options.attribution
    },
    setOpacity: function(e) {
      return this.options.opacity = e, this._map && this._updateOpacity(), this
    },
    setZIndex: function(e) {
      return this.options.zIndex = e, this._updateZIndex(), this
    },
    setUrl: function(e, t) {
      return this._url = e, t || this.redraw(), this
    },
    redraw: function() {
      return this._map && (this._map._panes.tilePane.empty = !1, this._reset(!0), this._update()), this
    },
    _updateZIndex: function() {
      this._container && this.options.zIndex !== t && (this._container.style.zIndex = this.options.zIndex)
    },
    _setAutoZIndex: function(e, t) {
      var n = e.getElementsByClassName("leaflet-layer"),
        r = -t(Infinity, -Infinity),
        i;
      for (var s = 0, o = n.length; s < o; s++) n[s] !== this._container && (i = parseInt(n[s].style.zIndex, 10), isNaN(i) || (r = t(r, i)));
      this.options.zIndex = this._container.style.zIndex = (isFinite(r) ? r : 0) + t(1, -1)
    },
    _updateOpacity: function() {
      n.DomUtil.setOpacity(this._container, this.options.opacity);
      var e, t = this._tiles;
      if (n.Browser.webkit) for (e in t) t.hasOwnProperty(e) && (t[e].style.webkitTransform += " translate(0,0)")
    },
    _initContainer: function() {
      var e = this._map._panes.tilePane;
      if (!this._container || e.empty) this._container = n.DomUtil.create("div", "leaflet-layer"), this._updateZIndex(), e.appendChild(this._container), this.options.opacity < 1 && this._updateOpacity()
    },
    _resetCallback: function(e) {
      this._reset(e.hard)
    },
    _reset: function(e) {
      var t, n = this._tiles;
      for (t in n) n.hasOwnProperty(t) && this.fire("tileunload", {
        tile: n[t]
      });
      this._tiles = {}, this._tilesToLoad = 0, this.options.reuseTiles && (this._unusedTiles = []), e && this._container && (this._container.innerHTML = ""), this._initContainer()
    },
    _update: function(e) {
      if (!this._map) return;
      var t = this._map.getPixelBounds(),
        r = this._map.getZoom(),
        i = this.options.tileSize;
      if (r > this.options.maxZoom || r < this.options.minZoom) return;
      var s = new n.Point(Math.floor(t.min.x / i), Math.floor(t.min.y / i)),
        o = new n.Point(Math.floor(t.max.x / i), Math.floor(t.max.y / i)),
        u = new n.Bounds(s, o);
      this._addTilesFromCenterOut(u), (this.options.unloadInvisibleTiles || this.options.reuseTiles) && this._removeOtherTiles(u)
    },
    _addTilesFromCenterOut: function(e) {
      var t = [],
        r = e.getCenter(),
        i, s, o;
      for (i = e.min.y; i <= e.max.y; i++) for (s = e.min.x; s <= e.max.x; s++) o = new n.Point(s, i), this._tileShouldBeLoaded(o) && t.push(o);
      var u = t.length;
      if (u === 0) return;
      t.sort(function(e, t) {
        return e.distanceTo(r) - t.distanceTo(r)
      });
      var a = document.createDocumentFragment();
      this._tilesToLoad || this.fire("loading"), this._tilesToLoad += u;
      for (s = 0; s < u; s++) this._addTile(t[s], a);
      this._container.appendChild(a)
    },
    _tileShouldBeLoaded: function(e) {
      if (e.x + ":" + e.y in this._tiles) return !1;
      if (!this.options.continuousWorld) {
        var t = this._getWrapTileNum();
        if (this.options.noWrap && (e.x < 0 || e.x >= t) || e.y < 0 || e.y >= t) return !1
      }
      return !0
    },
    _removeOtherTiles: function(e) {
      var t, n, r, i;
      for (i in this._tiles) this._tiles.hasOwnProperty(i) && (t = i.split(":"), n = parseInt(t[0], 10), r = parseInt(t[1], 10), (n < e.min.x || n > e.max.x || r < e.min.y || r > e.max.y) && this._removeTile(i))
    },
    _removeTile: function(e) {
      var t = this._tiles[e];
      this.fire("tileunload", {
        tile: t,
        url: t.src
      }), this.options.reuseTiles ? (n.DomUtil.removeClass(t, "leaflet-tile-loaded"), this._unusedTiles.push(t)) : t.parentNode === this._container && this._container.removeChild(t), n.Browser.android || (t.src = n.Util.emptyImageUrl), delete this._tiles[e]
    },
    _addTile: function(e, t) {
      var r = this._getTilePos(e),
        i = this._getTile();
      n.DomUtil.setPosition(i, r, n.Browser.chrome || n.Browser.android23), this._tiles[e.x + ":" + e.y] = i, this._loadTile(i, e), i.parentNode !== this._container && t.appendChild(i)
    },
    _getZoomForUrl: function() {
      var e = this.options,
        t = this._map.getZoom();
      return e.zoomReverse && (t = e.maxZoom - t), t + e.zoomOffset
    },
    _getTilePos: function(e) {
      var t = this._map.getPixelOrigin(),
        n = this.options.tileSize;
      return e.multiplyBy(n).subtract(t)
    },
    getTileUrl: function(e) {
      return this._adjustTilePoint(e), n.Util.template(this._url, n.Util.extend({
        s: this._getSubdomain(e),
        z: this._getZoomForUrl(),
        x: e.x,
        y: e.y
      }, this.options))
    },
    _getWrapTileNum: function() {
      return Math.pow(2, this._getZoomForUrl())
    },
    _adjustTilePoint: function(e) {
      var t = this._getWrapTileNum();
      !this.options.continuousWorld && !this.options.noWrap && (e.x = (e.x % t + t) % t), this.options.tms && (e.y = t - e.y - 1)
    },
    _getSubdomain: function(e) {
      var t = (e.x + e.y) % this.options.subdomains.length;
      return this.options.subdomains[t]
    },
    _createTileProto: function() {
      var e = this._tileImg = n.DomUtil.create("img", "leaflet-tile");
      e.galleryimg = "no";
      var t = this.options.tileSize;
      e.style.width = t + "px", e.style.height = t + "px"
    },
    _getTile: function() {
      if (this.options.reuseTiles && this._unusedTiles.length > 0) {
        var e = this._unusedTiles.pop();
        return this._resetTile(e), e
      }
      return this._createTile()
    },
    _resetTile: function(e) {},
    _createTile: function() {
      var e = this._tileImg.cloneNode(!1);
      return e.onselectstart = e.onmousemove = n.Util.falseFn, e
    },
    _loadTile: function(e, t) {
      e._layer = this, e.onload = this._tileOnLoad, e.onerror = this._tileOnError, e.src = this.getTileUrl(t)
    },
    _tileLoaded: function() {
      this._tilesToLoad--, this._tilesToLoad || this.fire("load")
    },
    _tileOnLoad: function(e) {
      var t = this._layer;
      this.src !== n.Util.emptyImageUrl && (n.DomUtil.addClass(this, "leaflet-tile-loaded"), t.fire("tileload", {
        tile: this,
        url: this.src
      })), t._tileLoaded()
    },
    _tileOnError: function(e) {
      var t = this._layer;
      t.fire("tileerror", {
        tile: this,
        url: this.src
      });
      var n = t.options.errorTileUrl;
      n && (this.src = n), t._tileLoaded()
    }
  }), n.tileLayer = function(e, t) {
    return new n.TileLayer(e, t)
  }, n.TileLayer.WMS = n.TileLayer.extend({
    defaultWmsParams: {
      service: "WMS",
      request: "GetMap",
      version: "1.1.1",
      layers: "",
      styles: "",
      format: "image/jpeg",
      transparent: !1
    },
    initialize: function(e, t) {
      this._url = e;
      var r = n.Util.extend({}, this.defaultWmsParams);
      t.detectRetina && n.Browser.retina ? r.width = r.height = this.options.tileSize * 2 : r.width = r.height = this.options.tileSize;
      for (var i in t) this.options.hasOwnProperty(i) || (r[i] = t[i]);
      this.wmsParams = r, n.Util.setOptions(this, t)
    },
    onAdd: function(e) {
      var t = parseFloat(this.wmsParams.version) >= 1.3 ? "crs" : "srs";
      this.wmsParams[t] = e.options.crs.code, n.TileLayer.prototype.onAdd.call(this, e)
    },
    getTileUrl: function(e, t) {
      var r = this._map,
        i = r.options.crs,
        s = this.options.tileSize,
        o = e.multiplyBy(s),
        u = o.add(new n.Point(s, s)),
        a = i.project(r.unproject(o, t)),
        f = i.project(r.unproject(u, t)),
        l = [a.x, f.y, f.x, a.y].join(","),
        c = n.Util.template(this._url, {
          s: this._getSubdomain(e)
        });
      return c + n.Util.getParamString(this.wmsParams) + "&bbox=" + l
    },
    setParams: function(e, t) {
      return n.Util.extend(this.wmsParams, e), t || this.redraw(), this
    }
  }), n.tileLayer.wms = function(e, t) {
    return new n.TileLayer.WMS(e, t)
  }, n.TileLayer.Canvas = n.TileLayer.extend({
    options: {
      async: !1
    },
    initialize: function(e) {
      n.Util.setOptions(this, e)
    },
    redraw: function() {
      var e, t = this._tiles;
      for (e in t) t.hasOwnProperty(e) && this._redrawTile(t[e])
    },
    _redrawTile: function(e) {
      this.drawTile(e, e._tilePoint, e._zoom)
    },
    _createTileProto: function() {
      var e = this._canvasProto = n.DomUtil.create("canvas", "leaflet-tile"),
        t = this.options.tileSize;
      e.width = t, e.height = t
    },
    _createTile: function() {
      var e = this._canvasProto.cloneNode(!1);
      return e.onselectstart = e.onmousemove = n.Util.falseFn, e
    },
    _loadTile: function(e, t, n) {
      e._layer = this, e._tilePoint = t, e._zoom = n, this.drawTile(e, t, n), this.options.async || this.tileDrawn(e)
    },
    drawTile: function(e, t, n) {},
    tileDrawn: function(e) {
      this._tileOnLoad.call(e)
    }
  }), n.tileLayer.canvas = function(e) {
    return new n.TileLayer.Canvas(e)
  }, n.ImageOverlay = n.Class.extend({
    includes: n.Mixin.Events,
    options: {
      opacity: 1
    },
    initialize: function(e, t, r) {
      this._url = e, this._bounds = n.latLngBounds(t), n.Util.setOptions(this, r)
    },
    onAdd: function(e) {
      this._map = e, this._image || this._initImage(), e._panes.overlayPane.appendChild(this._image), e.on("viewreset", this._reset, this), e.options.zoomAnimation && n.Browser.any3d && e.on("zoomanim", this._animateZoom, this), this._reset()
    },
    onRemove: function(e) {
      e.getPanes().overlayPane.removeChild(this._image), e.off("viewreset", this._reset, this), e.options.zoomAnimation && e.off("zoomanim", this._animateZoom, this)
    },
    addTo: function(e) {
      return e.addLayer(this), this
    },
    setOpacity: function(e) {
      return this.options.opacity = e, this._updateOpacity(), this
    },
    bringToFront: function() {
      return this._image && this._map._panes.overlayPane.appendChild(this._image), this
    },
    bringToBack: function() {
      var e = this._map._panes.overlayPane;
      return this._image && e.insertBefore(this._image, e.firstChild), this
    },
    _initImage: function() {
      this._image = n.DomUtil.create("img", "leaflet-image-layer"), this._map.options.zoomAnimation && n.Browser.any3d ? n.DomUtil.addClass(this._image, "leaflet-zoom-animated") : n.DomUtil.addClass(this._image, "leaflet-zoom-hide"), this._updateOpacity(), n.Util.extend(this._image, {
        galleryimg: "no",
        onselectstart: n.Util.falseFn,
        onmousemove: n.Util.falseFn,
        onload: n.Util.bind(this._onImageLoad, this),
        src: this._url
      })
    },
    _animateZoom: function(e) {
      var t = this._map,
        r = this._image,
        i = t.getZoomScale(e.zoom),
        s = this._bounds.getNorthWest(),
        o = this._bounds.getSouthEast(),
        u = t._latLngToNewLayerPoint(s, e.zoom, e.center),
        a = t._latLngToNewLayerPoint(o, e.zoom, e.center)._subtract(u),
        f = t.latLngToLayerPoint(o)._subtract(t.latLngToLayerPoint(s)),
        l = u._add(a._subtract(f)._divideBy(2));
      r.style[n.DomUtil.TRANSFORM] = n.DomUtil.getTranslateString(l) + " scale(" + i + ") "
    },
    _reset: function() {
      var e = this._image,
        t = this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
        r = this._map.latLngToLayerPoint(this._bounds.getSouthEast())._subtract(t);
      n.DomUtil.setPosition(e, t), e.style.width = r.x + "px", e.style.height = r.y + "px"
    },
    _onImageLoad: function() {
      this.fire("load")
    },
    _updateOpacity: function() {
      n.DomUtil.setOpacity(this._image, this.options.opacity)
    }
  }), n.imageOverlay = function(e, t, r) {
    return new n.ImageOverlay(e, t, r)
  }, n.Icon = n.Class.extend({
    options: {
      className: ""
    },
    initialize: function(e) {
      n.Util.setOptions(this, e)
    },
    createIcon: function() {
      return this._createIcon("icon")
    },
    createShadow: function() {
      return this._createIcon("shadow")
    },
    _createIcon: function(e) {
      var t = this._getIconUrl(e);
      if (!t) {
        if (e === "icon") throw Error("iconUrl not set in Icon options (see the docs).");
        return null
      }
      var n = this._createImg(t);
      return this._setIconStyles(n, e), n
    },
    _setIconStyles: function(e, t) {
      var r = this.options,
        i = n.point(r[t + "Size"]),
        s;
      t === "shadow" ? s = n.point(r.shadowAnchor || r.iconAnchor) : s = n.point(r.iconAnchor), !s && i && (s = i.divideBy(2, !0)), e.className = "leaflet-marker-" + t + " " + r.className, s && (e.style.marginLeft = -s.x + "px", e.style.marginTop = -s.y + "px"), i && (e.style.width = i.x + "px", e.style.height = i.y + "px")
    },
    _createImg: function(e) {
      var t;
      return n.Browser.ie6 ? (t = document.createElement("div"), t.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + e + '")') : (t = document.createElement("img"), t.src = e), t
    },
    _getIconUrl: function(e) {
      return this.options[e + "Url"]
    }
  }), n.icon = function(e) {
    return new n.Icon(e)
  }, n.Icon.Default = n.Icon.extend({
    options: {
      iconSize: new n.Point(25, 41),
      iconAnchor: new n.Point(12, 41),
      popupAnchor: new n.Point(1, -34),
      shadowSize: new n.Point(41, 41)
    },
    _getIconUrl: function(e) {
      var t = e + "Url";
      if (this.options[t]) return this.options[t];
      var r = n.Icon.Default.imagePath;
      if (!r) throw Error("Couldn't autodetect L.Icon.Default.imagePath, set it manually.");
      return r + "/marker-" + e + ".png"
    }
  }), n.Icon.Default.imagePath = function() {
    var e = document.getElementsByTagName("script"),
      t = /\/?leaflet[\-\._]?([\w\-\._]*)\.js\??/,
      n, r, i, s;
    for (n = 0, r = e.length; n < r; n++) {
      i = e[n].src, s = i.match(t);
      if (s) return i.split(t)[0] + "/images"
    }
  }(), n.Marker = n.Class.extend({
    includes: n.Mixin.Events,
    options: {
      icon: new n.Icon.Default,
      title: "",
      clickable: !0,
      draggable: !1,
      zIndexOffset: 0,
      opacity: 1
    },
    initialize: function(e, t) {
      n.Util.setOptions(this, t), this._latlng = n.latLng(e)
    },
    onAdd: function(e) {
      this._map = e, e.on("viewreset", this.update, this), this._initIcon(), this.update(), e.options.zoomAnimation && e.options.markerZoomAnimation && e.on("zoomanim", this._animateZoom, this)
    },
    addTo: function(e) {
      return e.addLayer(this), this
    },
    onRemove: function(e) {
      this._removeIcon(), this.fire("remove"), e.off({
        viewreset: this.update,
        zoomanim: this._animateZoom
      }, this), this._map = null
    },
    getLatLng: function() {
      return this._latlng
    },
    setLatLng: function(e) {
      this._latlng = n.latLng(e), this.update(), this.fire("move", {
        latlng: this._latlng
      })
    },
    setZIndexOffset: function(e) {
      this.options.zIndexOffset = e, this.update()
    },
    setIcon: function(e) {
      this._map && this._removeIcon(), this.options.icon = e, this._map && (this._initIcon(), this.update())
    },
    update: function() {
      if (!this._icon) return;
      var e = this._map.latLngToLayerPoint(this._latlng).round();
      this._setPos(e)
    },
    _initIcon: function() {
      var e = this.options,
        t = this._map,
        r = t.options.zoomAnimation && t.options.markerZoomAnimation,
        i = r ? "leaflet-zoom-animated" : "leaflet-zoom-hide",
        s = !1;
      this._icon || (this._icon = e.icon.createIcon(), e.title && (this._icon.title = e.title), this._initInteraction(), s = this.options.opacity < 1, n.DomUtil.addClass(this._icon, i)), this._shadow || (this._shadow = e.icon.createShadow(), this._shadow && (n.DomUtil.addClass(this._shadow, i), s = this.options.opacity < 1)), s && this._updateOpacity();
      var o = this._map._panes;
      o.markerPane.appendChild(this._icon), this._shadow && o.shadowPane.appendChild(this._shadow)
    },
    _removeIcon: function() {
      var e = this._map._panes;
      e.markerPane.removeChild(this._icon), this._shadow && e.shadowPane.removeChild(this._shadow), this._icon = this._shadow = null
    },
    _setPos: function(e) {
      n.DomUtil.setPosition(this._icon, e), this._shadow && n.DomUtil.setPosition(this._shadow, e), this._icon.style.zIndex = e.y + this.options.zIndexOffset
    },
    _animateZoom: function(e) {
      var t = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center);
      this._setPos(t)
    },
    _initInteraction: function() {
      if (!this.options.clickable) return;
      var e = this._icon,
        t = ["dblclick", "mousedown", "mouseover", "mouseout"];
      n.DomUtil.addClass(e, "leaflet-clickable"), n.DomEvent.on(e, "click", this._onMouseClick, this);
      for (var r = 0; r < t.length; r++) n.DomEvent.on(e, t[r], this._fireMouseEvent, this);
      n.Handler.MarkerDrag && (this.dragging = new n.Handler.MarkerDrag(this), this.options.draggable && this.dragging.enable())
    },
    _onMouseClick: function(e) {
      this.hasEventListeners(e.type) && n.DomEvent.stopPropagation(e);
      if (this.dragging && this.dragging.moved()) return;
      if (this._map.dragging && this._map.dragging.moved()) return;
      this.fire(e.type, {
        originalEvent: e
      })
    },
    _fireMouseEvent: function(e) {
      this.fire(e.type, {
        originalEvent: e
      }), e.type !== "mousedown" && n.DomEvent.stopPropagation(e)
    },
    setOpacity: function(e) {
      this.options.opacity = e, this._map && this._updateOpacity()
    },
    _updateOpacity: function() {
      n.DomUtil.setOpacity(this._icon, this.options.opacity), this._shadow && n.DomUtil.setOpacity(this._shadow, this.options.opacity)
    }
  }), n.marker = function(e, t) {
    return new n.Marker(e, t)
  }, n.DivIcon = n.Icon.extend({
    options: {
      iconSize: new n.Point(12, 12),
      className: "leaflet-div-icon"
    },
    createIcon: function() {
      var e = document.createElement("div"),
        t = this.options;
      return t.html && (e.innerHTML = t.html), t.bgPos && (e.style.backgroundPosition = -t.bgPos.x + "px " + -t.bgPos.y + "px"), this._setIconStyles(e, "icon"), e
    },
    createShadow: function() {
      return null
    }
  }), n.divIcon = function(e) {
    return new n.DivIcon(e)
  }, n.Map.mergeOptions({
    closePopupOnClick: !0
  }), n.Popup = n.Class.extend({
    includes: n.Mixin.Events,
    options: {
      minWidth: 50,
      maxWidth: 300,
      maxHeight: null,
      autoPan: !0,
      closeButton: !0,
      offset: new n.Point(0, 6),
      autoPanPadding: new n.Point(5, 5),
      className: ""
    },
    initialize: function(e, t) {
      n.Util.setOptions(this, e), this._source = t
    },
    onAdd: function(e) {
      this._map = e, this._container || this._initLayout(), this._updateContent();
      var t = e.options.fadeAnimation;
      t && n.DomUtil.setOpacity(this._container, 0), e._panes.popupPane.appendChild(this._container), e.on("viewreset", this._updatePosition, this), n.Browser.any3d && e.on("zoomanim", this._zoomAnimation, this), e.options.closePopupOnClick && e.on("preclick", this._close, this), this._update(), t && n.DomUtil.setOpacity(this._container, 1)
    },
    addTo: function(e) {
      return e.addLayer(this), this
    },
    openOn: function(e) {
      return e.openPopup(this), this
    },
    onRemove: function(e) {
      e._panes.popupPane.removeChild(this._container), n.Util.falseFn(this._container.offsetWidth), e.off({
        viewreset: this._updatePosition,
        preclick: this._close,
        zoomanim: this._zoomAnimation
      }, this), e.options.fadeAnimation && n.DomUtil.setOpacity(this._container, 0), this._map = null
    },
    setLatLng: function(e) {
      return this._latlng = n.latLng(e), this._update(), this
    },
    setContent: function(e) {
      return this._content = e, this._update(), this
    },
    _close: function() {
      var e = this._map;
      e && (e._popup = null, e.removeLayer(this).fire("popupclose", {
        popup: this
      }))
    },
    _initLayout: function() {
      var e = "leaflet-popup",
        t = this._container = n.DomUtil.create("div", e + " " + this.options.className + " leaflet-zoom-animated"),
        r;
      this.options.closeButton && (r = this._closeButton = n.DomUtil.create("a", e + "-close-button", t), r.href = "#close", r.innerHTML = "&#215;", n.DomEvent.on(r, "click", this._onCloseButtonClick, this));
      var i = this._wrapper = n.DomUtil.create("div", e + "-content-wrapper", t);
      n.DomEvent.disableClickPropagation(i), this._contentNode = n.DomUtil.create("div", e + "-content", i), n.DomEvent.on(this._contentNode, "mousewheel", n.DomEvent.stopPropagation), this._tipContainer = n.DomUtil.create("div", e + "-tip-container", t), this._tip = n.DomUtil.create("div", e + "-tip", this._tipContainer)
    },
    _update: function() {
      if (!this._map) return;
      this._container.style.visibility = "hidden", this._updateContent(), this._updateLayout(), this._updatePosition(), this._container.style.visibility = "", this._adjustPan()
    },
    _updateContent: function() {
      if (!this._content) return;
      if (typeof this._content == "string") this._contentNode.innerHTML = this._content;
      else {
        while (this._contentNode.hasChildNodes()) this._contentNode.removeChild(this._contentNode.firstChild);
        this._contentNode.appendChild(this._content)
      }
      this.fire("contentupdate")
    },
    _updateLayout: function() {
      var e = this._contentNode,
        t = e.style;
      t.width = "", t.whiteSpace = "nowrap";
      var r = e.offsetWidth;
      r = Math.min(r, this.options.maxWidth), r = Math.max(r, this.options.minWidth), t.width = r + 1 + "px", t.whiteSpace = "", t.height = "";
      var i = e.offsetHeight,
        s = this.options.maxHeight,
        o = "leaflet-popup-scrolled";
      s && i > s ? (t.height = s + "px", n.DomUtil.addClass(e, o)) : n.DomUtil.removeClass(e, o), this._containerWidth = this._container.offsetWidth
    },
    _updatePosition: function() {
      var e = this._map.latLngToLayerPoint(this._latlng),
        t = n.Browser.any3d,
        r = this.options.offset;
      t && n.DomUtil.setPosition(this._container, e), this._containerBottom = -r.y - (t ? 0 : e.y), this._containerLeft = -Math.round(this._containerWidth / 2) + r.x + (t ? 0 : e.x), this._container.style.bottom = this._containerBottom + "px", this._container.style.left = this._containerLeft + "px"
    },
    _zoomAnimation: function(e) {
      var t = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center);
      n.DomUtil.setPosition(this._container, t)
    },
    _adjustPan: function() {
      if (!this.options.autoPan) return;
      var e = this._map,
        t = this._container.offsetHeight,
        r = this._containerWidth,
        i = new n.Point(this._containerLeft, -t - this._containerBottom);
      n.Browser.any3d && i._add(n.DomUtil.getPosition(this._container));
      var s = e.layerPointToContainerPoint(i),
        o = this.options.autoPanPadding,
        u = e.getSize(),
        a = 0,
        f = 0;
      s.x < 0 && (a = s.x - o.x), s.x + r > u.x && (a = s.x + r - u.x + o.x), s.y < 0 && (f = s.y - o.y), s.y + t > u.y && (f = s.y + t - u.y + o.y), (a || f) && e.panBy(new n.Point(a, f))
    },
    _onCloseButtonClick: function(e) {
      this._close(), n.DomEvent.stop(e)
    }
  }), n.popup = function(e, t) {
    return new n.Popup(e, t)
  }, n.Marker.include({
    openPopup: function() {
      return this._popup && this._map && (this._popup.setLatLng(this._latlng), this._map.openPopup(this._popup)), this
    },
    closePopup: function() {
      return this._popup && this._popup._close(), this
    },
    bindPopup: function(e, t) {
      var r = n.point(this.options.icon.options.popupAnchor) || new n.Point(0, 0);
      return r = r.add(n.Popup.prototype.options.offset), t && t.offset && (r = r.add(t.offset)), t = n.Util.extend({
        offset: r
      }, t), this._popup || this.on("click", this.openPopup, this).on("remove", this.closePopup, this).on("move", this._movePopup, this), this._popup = (new n.Popup(t, this)).setContent(e), this
    },
    unbindPopup: function() {
      return this._popup && (this._popup = null, this.off("click", this.openPopup).off("remove", this.closePopup).off("move", this._movePopup)), this
    },
    _movePopup: function(e) {
      this._popup.setLatLng(e.latlng)
    }
  }), n.Map.include({
    openPopup: function(e) {
      return this.closePopup(), this._popup = e, this.addLayer(e).fire("popupopen", {
        popup: this._popup
      })
    },
    closePopup: function() {
      return this._popup && this._popup._close(), this
    }
  }), n.LayerGroup = n.Class.extend({
    initialize: function(e) {
      this._layers = {};
      var t, n;
      if (e) for (t = 0, n = e.length; t < n; t++) this.addLayer(e[t])
    },
    addLayer: function(e) {
      var t = n.Util.stamp(e);
      return this._layers[t] = e, this._map && this._map.addLayer(e), this
    },
    removeLayer: function(e) {
      var t = n.Util.stamp(e);
      return delete this._layers[t], this._map && this._map.removeLayer(e), this
    },
    clearLayers: function() {
      return this.eachLayer(this.removeLayer, this), this
    },
    invoke: function(e) {
      var t = Array.prototype.slice.call(arguments, 1),
        n, r;
      for (n in this._layers) this._layers.hasOwnProperty(n) && (r = this._layers[n], r[e] && r[e].apply(r, t));
      return this
    },
    onAdd: function(e) {
      this._map = e, this.eachLayer(e.addLayer, e)
    },
    onRemove: function(e) {
      this.eachLayer(e.removeLayer, e), this._map = null
    },
    addTo: function(e) {
      return e.addLayer(this), this
    },
    eachLayer: function(e, t) {
      for (var n in this._layers) this._layers.hasOwnProperty(n) && e.call(t, this._layers[n])
    }
  }), n.layerGroup = function(e) {
    return new n.LayerGroup(e)
  }, n.FeatureGroup = n.LayerGroup.extend({
    includes: n.Mixin.Events,
    addLayer: function(e) {
      return this._layers[n.Util.stamp(e)] ? this : (e.on("click dblclick mouseover mouseout mousemove contextmenu", this._propagateEvent, this), n.LayerGroup.prototype.addLayer.call(this, e), this._popupContent && e.bindPopup && e.bindPopup(this._popupContent), this)
    },
    removeLayer: function(e) {
      return e.off("click dblclick mouseover mouseout mousemove contextmenu", this._propagateEvent, this), n.LayerGroup.prototype.removeLayer.call(this, e), this._popupContent ? this.invoke("unbindPopup") : this
    },
    bindPopup: function(e) {
      return this._popupContent = e, this.invoke("bindPopup", e)
    },
    setStyle: function(e) {
      return this.invoke("setStyle", e)
    },
    bringToFront: function() {
      return this.invoke("bringToFront")
    },
    bringToBack: function() {
      return this.invoke("bringToBack")
    },
    getBounds: function() {
      var e = new n.LatLngBounds;
      return this.eachLayer(function(t) {
        e.extend(t instanceof n.Marker ? t.getLatLng() : t.getBounds())
      }, this), e
    },
    _propagateEvent: function(e) {
      e.layer = e.target, e.target = this, this.fire(e.type, e)
    }
  }), n.featureGroup = function(e) {
    return new n.FeatureGroup(e)
  }, n.Path = n.Class.extend({
    includes: [n.Mixin.Events],
    statics: {
      CLIP_PADDING: n.Browser.mobile ? Math.max(0, Math.min(.5, (1280 / Math.max(e.innerWidth, e.innerHeight) - 1) / 2)) : .5
    },
    options: {
      stroke: !0,
      color: "#0033ff",
      dashArray: null,
      weight: 5,
      opacity: .5,
      fill: !1,
      fillColor: null,
      fillOpacity: .2,
      clickable: !0
    },
    initialize: function(e) {
      n.Util.setOptions(this, e)
    },
    onAdd: function(e) {
      this._map = e, this._container || (this._initElements(), this._initEvents()), this.projectLatlngs(), this._updatePath(), this._container && this._map._pathRoot.appendChild(this._container), e.on({
        viewreset: this.projectLatlngs,
        moveend: this._updatePath
      }, this)
    },
    addTo: function(e) {
      return e.addLayer(this), this
    },
    onRemove: function(e) {
      e._pathRoot.removeChild(this._container), this._map = null, n.Browser.vml && (this._container = null, this._stroke = null, this._fill = null), this.fire("remove"), e.off({
        viewreset: this.projectLatlngs,
        moveend: this._updatePath
      }, this)
    },
    projectLatlngs: function() {},
    setStyle: function(e) {
      return n.Util.setOptions(this, e), this._container && this._updateStyle(), this
    },
    redraw: function() {
      return this._map && (this.projectLatlngs(), this._updatePath()), this
    }
  }), n.Map.include({
    _updatePathViewport: function() {
      var e = n.Path.CLIP_PADDING,
        t = this.getSize(),
        r = n.DomUtil.getPosition(this._mapPane),
        i = r.multiplyBy(-1)._subtract(t.multiplyBy(e)._round()),
        s = i.add(t.multiplyBy(1 + e * 2)._round());
      this._pathViewport = new n.Bounds(i, s)
    }
  }), n.Path.SVG_NS = "http://www.w3.org/2000/svg", n.Browser.svg = !! document.createElementNS && !! document.createElementNS(n.Path.SVG_NS, "svg").createSVGRect, n.Path = n.Path.extend({
    statics: {
      SVG: n.Browser.svg
    },
    bringToFront: function() {
      var e = this._map._pathRoot,
        t = this._container;
      return t && e.lastChild !== t && e.appendChild(t), this
    },
    bringToBack: function() {
      var e = this._map._pathRoot,
        t = this._container,
        n = e.firstChild;
      return t && n !== t && e.insertBefore(t, n), this
    },
    getPathString: function() {},
    _createElement: function(e) {
      return document.createElementNS(n.Path.SVG_NS, e)
    },
    _initElements: function() {
      this._map._initPathRoot(), this._initPath(), this._initStyle()
    },
    _initPath: function() {
      this._container = this._createElement("g"), this._path = this._createElement("path"), this._container.appendChild(this._path)
    },
    _initStyle: function() {
      this.options.stroke && (this._path.setAttribute("stroke-linejoin", "round"), this._path.setAttribute("stroke-linecap", "round")), this.options.fill && this._path.setAttribute("fill-rule", "evenodd"), this._updateStyle()
    },
    _updateStyle: function() {
      this.options.stroke ? (this._path.setAttribute("stroke", this.options.color), this._path.setAttribute("stroke-opacity", this.options.opacity), this._path.setAttribute("stroke-width", this.options.weight), this.options.dashArray ? this._path.setAttribute("stroke-dasharray", this.options.dashArray) : this._path.removeAttribute("stroke-dasharray")) : this._path.setAttribute("stroke", "none"), this.options.fill ? (this._path.setAttribute("fill", this.options.fillColor || this.options.color), this._path.setAttribute("fill-opacity", this.options.fillOpacity)) : this._path.setAttribute("fill", "none")
    },
    _updatePath: function() {
      var e = this.getPathString();
      e || (e = "M0 0"), this._path.setAttribute("d", e)
    },
    _initEvents: function() {
      if (this.options.clickable) {
        (n.Browser.svg || !n.Browser.vml) && this._path.setAttribute("class", "leaflet-clickable"), n.DomEvent.on(this._container, "click", this._onMouseClick, this);
        var e = ["dblclick", "mousedown", "mouseover", "mouseout", "mousemove", "contextmenu"];
        for (var t = 0; t < e.length; t++) n.DomEvent.on(this._container, e[t], this._fireMouseEvent, this)
      }
    },
    _onMouseClick: function(e) {
      if (this._map.dragging && this._map.dragging.moved()) return;
      this._fireMouseEvent(e)
    },
    _fireMouseEvent: function(e) {
      if (!this.hasEventListeners(e.type)) return;
      var t = this._map,
        r = t.mouseEventToContainerPoint(e),
        i = t.containerPointToLayerPoint(r),
        s = t.layerPointToLatLng(i);
      this.fire(e.type, {
        latlng: s,
        layerPoint: i,
        containerPoint: r,
        originalEvent: e
      }), e.type === "contextmenu" && n.DomEvent.preventDefault(e), n.DomEvent.stopPropagation(e)
    }
  }), n.Map.include({
    _initPathRoot: function() {
      this._pathRoot || (this._pathRoot = n.Path.prototype._createElement("svg"), this._panes.overlayPane.appendChild(this._pathRoot), this.options.zoomAnimation && n.Browser.any3d ? (this._pathRoot.setAttribute("class", " leaflet-zoom-animated"), this.on({
        zoomanim: this._animatePathZoom,
        zoomend: this._endPathZoom
      })) : this._pathRoot.setAttribute("class", " leaflet-zoom-hide"), this.on("moveend", this._updateSvgViewport), this._updateSvgViewport())
    },
    _animatePathZoom: function(e) {
      var t = this.getZoomScale(e.zoom),
        r = this._getCenterOffset(e.center).divideBy(1 - 1 / t),
        i = this.containerPointToLayerPoint(this.getSize().multiplyBy(-n.Path.CLIP_PADDING)),
        s = i.add(r).round();
      this._pathRoot.style[n.DomUtil.TRANSFORM] = n.DomUtil.getTranslateString(s.multiplyBy(-1).add(n.DomUtil.getPosition(this._pathRoot)).multiplyBy(t).add(s)) + " scale(" + t + ") ", this._pathZooming = !0
    },
    _endPathZoom: function() {
      this._pathZooming = !1
    },
    _updateSvgViewport: function() {
      if (this._pathZooming) return;
      this._updatePathViewport();
      var e = this._pathViewport,
        t = e.min,
        r = e.max,
        i = r.x - t.x,
        s = r.y - t.y,
        o = this._pathRoot,
        u = this._panes.overlayPane;
      n.Browser.mobileWebkit && u.removeChild(o), n.DomUtil.setPosition(o, t), o.setAttribute("width", i), o.setAttribute("height", s), o.setAttribute("viewBox", [t.x, t.y, i, s].join(" ")), n.Browser.mobileWebkit && u.appendChild(o)
    }
  }), n.Path.include({
    bindPopup: function(e, t) {
      if (!this._popup || this._popup.options !== t) this._popup = new n.Popup(t, this);
      return this._popup.setContent(e), this._popupHandlersAdded || (this.on("click", this._openPopup, this).on("remove", this._closePopup, this), this._popupHandlersAdded = !0), this
    },
    unbindPopup: function() {
      return this._popup && (this._popup = null, this.off("click", this.openPopup).off("remove", this.closePopup)), this
    },
    openPopup: function(e) {
      return this._popup && (e = e || this._latlng || this._latlngs[Math.floor(this._latlngs.length / 2)], this._openPopup({
        latlng: e
      })), this
    },
    _openPopup: function(e) {
      this._popup.setLatLng(e.latlng), this._map.openPopup(this._popup)
    },
    _closePopup: function() {
      this._popup._close()
    }
  }), n.Browser.vml = !n.Browser.svg &&
  function() {
    try {
      var e = document.createElement("div");
      e.innerHTML = '<v:shape adj="1"/>';
      var t = e.firstChild;
      return t.style.behavior = "url(#default#VML)", t && typeof t.adj == "object"
    } catch (n) {
      return !1
    }
  }(), n.Path = n.Browser.svg || !n.Browser.vml ? n.Path : n.Path.extend({
    statics: {
      VML: !0,
      CLIP_PADDING: .02
    },
    _createElement: function() {
      try {
        return document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"), function(e) {
          return document.createElement("<lvml:" + e + ' class="lvml">')
        }
      } catch (e) {
        return function(e) {
          return document.createElement("<" + e + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')
        }
      }
    }(),
    _initPath: function() {
      var e = this._container = this._createElement("shape");
      n.DomUtil.addClass(e, "leaflet-vml-shape"), this.options.clickable && n.DomUtil.addClass(e, "leaflet-clickable"), e.coordsize = "1 1", this._path = this._createElement("path"), e.appendChild(this._path), this._map._pathRoot.appendChild(e)
    },
    _initStyle: function() {
      this._updateStyle()
    },
    _updateStyle: function() {
      var e = this._stroke,
        t = this._fill,
        n = this.options,
        r = this._container;
      r.stroked = n.stroke, r.filled = n.fill, n.stroke ? (e || (e = this._stroke = this._createElement("stroke"), e.endcap = "round", r.appendChild(e)), e.weight = n.weight + "px", e.color = n.color, e.opacity = n.opacity, n.dashArray ? e.dashStyle = n.dashArray.replace(/ *, */g, " ") : e.dashStyle = "") : e && (r.removeChild(e), this._stroke = null), n.fill ? (t || (t = this._fill = this._createElement("fill"), r.appendChild(t)), t.color = n.fillColor || n.color, t.opacity = n.fillOpacity) : t && (r.removeChild(t), this._fill = null)
    },
    _updatePath: function() {
      var e = this._container.style;
      e.display = "none", this._path.v = this.getPathString() + " ", e.display = ""
    }
  }), n.Map.include(n.Browser.svg || !n.Browser.vml ? {} : {
    _initPathRoot: function() {
      if (this._pathRoot) return;
      var e = this._pathRoot = document.createElement("div");
      e.className = "leaflet-vml-container", this._panes.overlayPane.appendChild(e), this.on("moveend", this._updatePathViewport), this._updatePathViewport()
    }
  }), n.Browser.canvas = function() {
    return !!document.createElement("canvas").getContext
  }(), n.Path = n.Path.SVG && !e.L_PREFER_CANVAS || !n.Browser.canvas ? n.Path : n.Path.extend({
    statics: {
      CANVAS: !0,
      SVG: !1
    },
    redraw: function() {
      return this._map && (this.projectLatlngs(), this._requestUpdate()), this
    },
    setStyle: function(e) {
      return n.Util.setOptions(this, e), this._map && (this._updateStyle(), this._requestUpdate()), this
    },
    onRemove: function(e) {
      e.off("viewreset", this.projectLatlngs, this).off("moveend", this._updatePath, this), this._requestUpdate(), this._map = null
    },
    _requestUpdate: function() {
      this._map && !n.Path._updateRequest && (n.Path._updateRequest = n.Util.requestAnimFrame(this._fireMapMoveEnd, this._map))
    },
    _fireMapMoveEnd: function() {
      n.Path._updateRequest = null, this.fire("moveend")
    },
    _initElements: function() {
      this._map._initPathRoot(), this._ctx = this._map._canvasCtx
    },
    _updateStyle: function() {
      var e = this.options;
      e.stroke && (this._ctx.lineWidth = e.weight, this._ctx.strokeStyle = e.color), e.fill && (this._ctx.fillStyle = e.fillColor || e.color)
    },
    _drawPath: function() {
      var e, t, r, i, s, o;
      this._ctx.beginPath();
      for (e = 0, r = this._parts.length; e < r; e++) {
        for (t = 0, i = this._parts[e].length; t < i; t++) s = this._parts[e][t], o = (t === 0 ? "move" : "line") + "To", this._ctx[o](s.x, s.y);
        this instanceof n.Polygon && this._ctx.closePath()
      }
    },
    _checkIfEmpty: function() {
      return !this._parts.length
    },
    _updatePath: function() {
      if (this._checkIfEmpty()) return;
      var e = this._ctx,
        t = this.options;
      this._drawPath(), e.save(), this._updateStyle(), t.fill && (t.fillOpacity < 1 && (e.globalAlpha = t.fillOpacity), e.fill()), t.stroke && (t.opacity < 1 && (e.globalAlpha = t.opacity), e.stroke()), e.restore()
    },
    _initEvents: function() {
      this.options.clickable && this._map.on("click", this._onClick, this)
    },
    _onClick: function(e) {
      this._containsPoint(e.layerPoint) && this.fire("click", e)
    }
  }), n.Map.include(n.Path.SVG && !e.L_PREFER_CANVAS || !n.Browser.canvas ? {} : {
    _initPathRoot: function() {
      var e = this._pathRoot,
        t;
      e || (e = this._pathRoot = document.createElement("canvas"), e.style.position = "absolute", t = this._canvasCtx = e.getContext("2d"), t.lineCap = "round", t.lineJoin = "round", this._panes.overlayPane.appendChild(e), this.options.zoomAnimation && (this._pathRoot.className = "leaflet-zoom-animated", this.on("zoomanim", this._animatePathZoom), this.on("zoomend", this._endPathZoom)), this.on("moveend", this._updateCanvasViewport), this._updateCanvasViewport())
    },
    _updateCanvasViewport: function() {
      if (this._pathZooming) return;
      this._updatePathViewport();
      var e = this._pathViewport,
        t = e.min,
        r = e.max.subtract(t),
        i = this._pathRoot;
      n.DomUtil.setPosition(i, t), i.width = r.x, i.height = r.y, i.getContext("2d").translate(-t.x, -t.y)
    }
  }), n.LineUtil = {
    simplify: function(e, t) {
      if (!t || !e.length) return e.slice();
      var n = t * t;
      return e = this._reducePoints(e, n), e = this._simplifyDP(e, n), e
    },
    pointToSegmentDistance: function(e, t, n) {
      return Math.sqrt(this._sqClosestPointOnSegment(e, t, n, !0))
    },
    closestPointOnSegment: function(e, t, n) {
      return this._sqClosestPointOnSegment(e, t, n)
    },
    _simplifyDP: function(e, n) {
      var r = e.length,
        i = typeof Uint8Array != t + "" ? Uint8Array : Array,
        s = new i(r);
      s[0] = s[r - 1] = 1, this._simplifyDPStep(e, s, n, 0, r - 1);
      var o, u = [];
      for (o = 0; o < r; o++) s[o] && u.push(e[o]);
      return u
    },
    _simplifyDPStep: function(e, t, n, r, i) {
      var s = 0,
        o, u, a;
      for (u = r + 1; u <= i - 1; u++) a = this._sqClosestPointOnSegment(e[u], e[r], e[i], !0), a > s && (o = u, s = a);
      s > n && (t[o] = 1, this._simplifyDPStep(e, t, n, r, o), this._simplifyDPStep(e, t, n, o, i))
    },
    _reducePoints: function(e, t) {
      var n = [e[0]];
      for (var r = 1, i = 0, s = e.length; r < s; r++) this._sqDist(e[r], e[i]) > t && (n.push(e[r]), i = r);
      return i < s - 1 && n.push(e[s - 1]), n
    },
    clipSegment: function(e, t, n, r) {
      var i = n.min,
        s = n.max,
        o = r ? this._lastCode : this._getBitCode(e, n),
        u = this._getBitCode(t, n);
      this._lastCode = u;
      for (;;) {
        if (!(o | u)) return [e, t];
        if (o & u) return !1;
        var a = o || u,
          f = this._getEdgeIntersection(e, t, a, n),
          l = this._getBitCode(f, n);
        a === o ? (e = f, o = l) : (t = f, u = l)
      }
    },
    _getEdgeIntersection: function(e, t, r, i) {
      var s = t.x - e.x,
        o = t.y - e.y,
        u = i.min,
        a = i.max;
      if (r & 8) return new n.Point(e.x + s * (a.y - e.y) / o, a.y);
      if (r & 4) return new n.Point(e.x + s * (u.y - e.y) / o, u.y);
      if (r & 2) return new n.Point(a.x, e.y + o * (a.x - e.x) / s);
      if (r & 1) return new n.Point(u.x, e.y + o * (u.x - e.x) / s)
    },
    _getBitCode: function(e, t) {
      var n = 0;
      return e.x < t.min.x ? n |= 1 : e.x > t.max.x && (n |= 2), e.y < t.min.y ? n |= 4 : e.y > t.max.y && (n |= 8), n
    },
    _sqDist: function(e, t) {
      var n = t.x - e.x,
        r = t.y - e.y;
      return n * n + r * r
    },
    _sqClosestPointOnSegment: function(e, t, r, i) {
      var s = t.x,
        o = t.y,
        u = r.x - s,
        a = r.y - o,
        f = u * u + a * a,
        l;
      return f > 0 && (l = ((e.x - s) * u + (e.y - o) * a) / f, l > 1 ? (s = r.x, o = r.y) : l > 0 && (s += u * l, o += a * l)), u = e.x - s, a = e.y - o, i ? u * u + a * a : new n.Point(s, o)
    }
  }, n.Polyline = n.Path.extend({
    initialize: function(e, t) {
      n.Path.prototype.initialize.call(this, t), this._latlngs = this._convertLatLngs(e), n.Handler.PolyEdit && (this.editing = new n.Handler.PolyEdit(this), this.options.editable && this.editing.enable())
    },
    options: {
      smoothFactor: 1,
      noClip: !1
    },
    projectLatlngs: function() {
      this._originalPoints = [];
      for (var e = 0, t = this._latlngs.length; e < t; e++) this._originalPoints[e] = this._map.latLngToLayerPoint(this._latlngs[e])
    },
    getPathString: function() {
      for (var e = 0, t = this._parts.length, n = ""; e < t; e++) n += this._getPathPartStr(this._parts[e]);
      return n
    },
    getLatLngs: function() {
      return this._latlngs
    },
    setLatLngs: function(e) {
      return this._latlngs = this._convertLatLngs(e), this.redraw()
    },
    addLatLng: function(e) {
      return this._latlngs.push(n.latLng(e)), this.redraw()
    },
    spliceLatLngs: function(e, t) {
      var n = [].splice.apply(this._latlngs, arguments);
      return this._convertLatLngs(this._latlngs), this.redraw(), n
    },
    closestLayerPoint: function(e) {
      var t = Infinity,
        r = this._parts,
        i, s, o = null;
      for (var u = 0, a = r.length; u < a; u++) {
        var f = r[u];
        for (var l = 1, c = f.length; l < c; l++) {
          i = f[l - 1], s = f[l];
          var h = n.LineUtil._sqClosestPointOnSegment(e, i, s, !0);
          h < t && (t = h, o = n.LineUtil._sqClosestPointOnSegment(e, i, s))
        }
      }
      return o && (o.distance = Math.sqrt(t)), o
    },
    getBounds: function() {
      var e = new n.LatLngBounds,
        t = this.getLatLngs();
      for (var r = 0, i = t.length; r < i; r++) e.extend(t[r]);
      return e
    },
    onAdd: function(e) {
      n.Path.prototype.onAdd.call(this, e), this.editing && this.editing.enabled() && this.editing.addHooks()
    },
    onRemove: function(e) {
      this.editing && this.editing.enabled() && this.editing.removeHooks(), n.Path.prototype.onRemove.call(this, e)
    },
    _convertLatLngs: function(e) {
      var t, r;
      for (t = 0, r = e.length; t < r; t++) {
        if (e[t] instanceof Array && typeof e[t][0] != "number") return;
        e[t] = n.latLng(e[t])
      }
      return e
    },
    _initEvents: function() {
      n.Path.prototype._initEvents.call(this)
    },
    _getPathPartStr: function(e) {
      var t = n.Path.VML;
      for (var r = 0, i = e.length, s = "", o; r < i; r++) o = e[r], t && o._round(), s += (r ? "L" : "M") + o.x + " " + o.y;
      return s
    },
    _clipPoints: function() {
      var e = this._originalPoints,
        t = e.length,
        r, i, s;
      if (this.options.noClip) {
        this._parts = [e];
        return
      }
      this._parts = [];
      var o = this._parts,
        u = this._map._pathViewport,
        a = n.LineUtil;
      for (r = 0, i = 0; r < t - 1; r++) {
        s = a.clipSegment(e[r], e[r + 1], u, r);
        if (!s) continue;
        o[i] = o[i] || [], o[i].push(s[0]);
        if (s[1] !== e[r + 1] || r === t - 2) o[i].push(s[1]), i++
      }
    },
    _simplifyPoints: function() {
      var e = this._parts,
        t = n.LineUtil;
      for (var r = 0, i = e.length; r < i; r++) e[r] = t.simplify(e[r], this.options.smoothFactor)
    },
    _updatePath: function() {
      if (!this._map) return;
      this._clipPoints(), this._simplifyPoints(), n.Path.prototype._updatePath.call(this)
    }
  }), n.polyline = function(e, t) {
    return new n.Polyline(e, t)
  }, n.PolyUtil = {}, n.PolyUtil.clipPolygon = function(e, t) {
    var r = t.min,
      i = t.max,
      s, o = [1, 4, 2, 8],
      u, a, f, l, c, h, p, d, v = n.LineUtil;
    for (u = 0, h = e.length; u < h; u++) e[u]._code = v._getBitCode(e[u], t);
    for (f = 0; f < 4; f++) {
      p = o[f], s = [];
      for (u = 0, h = e.length, a = h - 1; u < h; a = u++) l = e[u], c = e[a], l._code & p ? c._code & p || (d = v._getEdgeIntersection(c, l, p, t), d._code = v._getBitCode(d, t), s.push(d)) : (c._code & p && (d = v._getEdgeIntersection(c, l, p, t), d._code = v._getBitCode(d, t), s.push(d)), s.push(l));
      e = s
    }
    return e
  }, n.Polygon = n.Polyline.extend({
    options: {
      fill: !0
    },
    initialize: function(e, t) {
      n.Polyline.prototype.initialize.call(this, e, t), e && e[0] instanceof Array && typeof e[0][0] != "number" && (this._latlngs = this._convertLatLngs(e[0]), this._holes = e.slice(1))
    },
    projectLatlngs: function() {
      n.Polyline.prototype.projectLatlngs.call(this), this._holePoints = [];
      if (!this._holes) return;
      for (var e = 0, t = this._holes.length, r; e < t; e++) {
        this._holePoints[e] = [];
        for (var i = 0, s = this._holes[e].length; i < s; i++) this._holePoints[e][i] = this._map.latLngToLayerPoint(this._holes[e][i])
      }
    },
    _clipPoints: function() {
      var e = this._originalPoints,
        t = [];
      this._parts = [e].concat(this._holePoints);
      if (this.options.noClip) return;
      for (var r = 0, i = this._parts.length; r < i; r++) {
        var s = n.PolyUtil.clipPolygon(this._parts[r], this._map._pathViewport);
        if (!s.length) continue;
        t.push(s)
      }
      this._parts = t
    },
    _getPathPartStr: function(e) {
      var t = n.Polyline.prototype._getPathPartStr.call(this, e);
      return t + (n.Browser.svg ? "z" : "x")
    }
  }), n.polygon = function(e, t) {
    return new n.Polygon(e, t)
  }, function() {
    function e(e) {
      return n.FeatureGroup.extend({
        initialize: function(e, t) {
          this._layers = {}, this._options = t, this.setLatLngs(e)
        },
        setLatLngs: function(t) {
          var n = 0,
            r = t.length;
          this.eachLayer(function(e) {
            n < r ? e.setLatLngs(t[n++]) : this.removeLayer(e)
          }, this);
          while (n < r) this.addLayer(new e(t[n++], this._options));
          return this
        }
      })
    }
    n.MultiPolyline = e(n.Polyline), n.MultiPolygon = e(n.Polygon), n.multiPolyline = function(e, t) {
      return new n.MultiPolyline(e, t)
    }, n.multiPolygon = function(e, t) {
      return new n.MultiPolygon(e, t)
    }
  }(), n.Rectangle = n.Polygon.extend({
    initialize: function(e, t) {
      n.Polygon.prototype.initialize.call(this, this._boundsToLatLngs(e), t)
    },
    setBounds: function(e) {
      this.setLatLngs(this._boundsToLatLngs(e))
    },
    _boundsToLatLngs: function(e) {
      return e = n.latLngBounds(e), [e.getSouthWest(), e.getNorthWest(), e.getNorthEast(), e.getSouthEast(), e.getSouthWest()]
    }
  }), n.rectangle = function(e, t) {
    return new n.Rectangle(e, t)
  }, n.Circle = n.Path.extend({
    initialize: function(e, t, r) {
      n.Path.prototype.initialize.call(this, r), this._latlng = n.latLng(e), this._mRadius = t
    },
    options: {
      fill: !0
    },
    setLatLng: function(e) {
      return this._latlng = n.latLng(e), this.redraw()
    },
    setRadius: function(e) {
      return this._mRadius = e, this.redraw()
    },
    projectLatlngs: function() {
      var e = this._getLngRadius(),
        t = new n.LatLng(this._latlng.lat, this._latlng.lng - e, !0),
        r = this._map.latLngToLayerPoint(t);
      this._point = this._map.latLngToLayerPoint(this._latlng), this._radius = Math.max(Math.round(this._point.x - r.x), 1)
    },
    getBounds: function() {
      var e = this._getLngRadius(),
        t = this._mRadius / 40075017 * 360,
        r = this._latlng,
        i = new n.LatLng(r.lat - t, r.lng - e),
        s = new n.LatLng(r.lat + t, r.lng + e);
      return new n.LatLngBounds(i, s)
    },
    getLatLng: function() {
      return this._latlng
    },
    getPathString: function() {
      var e = this._point,
        t = this._radius;
      return this._checkIfEmpty() ? "" : n.Browser.svg ? "M" + e.x + "," + (e.y - t) + "A" + t + "," + t + ",0,1,1," + (e.x - .1) + "," + (e.y - t) + " z" : (e._round(), t = Math.round(t), "AL " + e.x + "," + e.y + " " + t + "," + t + " 0," + 23592600)
    },
    getRadius: function() {
      return this._mRadius
    },
    _getLatRadius: function() {
      return this._mRadius / 40075017 * 360
    },
    _getLngRadius: function() {
      return this._getLatRadius() / Math.cos(n.LatLng.DEG_TO_RAD * this._latlng.lat)
    },
    _checkIfEmpty: function() {
      if (!this._map) return !1;
      var e = this._map._pathViewport,
        t = this._radius,
        n = this._point;
      return n.x - t > e.max.x || n.y - t > e.max.y || n.x + t < e.min.x || n.y + t < e.min.y
    }
  }), n.circle = function(e, t, r) {
    return new n.Circle(e, t, r)
  }, n.CircleMarker = n.Circle.extend({
    options: {
      radius: 10,
      weight: 2
    },
    initialize: function(e, t) {
      n.Circle.prototype.initialize.call(this, e, null, t), this._radius = this.options.radius
    },
    projectLatlngs: function() {
      this._point = this._map.latLngToLayerPoint(this._latlng)
    },
    setRadius: function(e) {
      return this._radius = e, this.redraw()
    }
  }), n.circleMarker = function(e, t) {
    return new n.CircleMarker(e, t)
  }, n.Polyline.include(n.Path.CANVAS ? {
    _containsPoint: function(e, t) {
      var r, i, s, o, u, a, f, l = this.options.weight / 2;
      n.Browser.touch && (l += 10);
      for (r = 0, o = this._parts.length; r < o; r++) {
        f = this._parts[r];
        for (i = 0, u = f.length, s = u - 1; i < u; s = i++) {
          if (!t && i === 0) continue;
          a = n.LineUtil.pointToSegmentDistance(e, f[s], f[i]);
          if (a <= l) return !0
        }
      }
      return !1
    }
  } : {}), n.Polygon.include(n.Path.CANVAS ? {
    _containsPoint: function(e) {
      var t = !1,
        r, i, s, o, u, a, f, l;
      if (n.Polyline.prototype._containsPoint.call(this, e, !0)) return !0;
      for (o = 0, f = this._parts.length; o < f; o++) {
        r = this._parts[o];
        for (u = 0, l = r.length, a = l - 1; u < l; a = u++) i = r[u], s = r[a], i.y > e.y != s.y > e.y && e.x < (s.x - i.x) * (e.y - i.y) / (s.y - i.y) + i.x && (t = !t)
      }
      return t
    }
  } : {}), n.Circle.include(n.Path.CANVAS ? {
    _drawPath: function() {
      var e = this._point;
      this._ctx.beginPath(), this._ctx.arc(e.x, e.y, this._radius, 0, Math.PI * 2, !1)
    },
    _containsPoint: function(e) {
      var t = this._point,
        n = this.options.stroke ? this.options.weight / 2 : 0;
      return e.distanceTo(t) <= this._radius + n
    }
  } : {}), n.GeoJSON = n.FeatureGroup.extend({
    initialize: function(e, t) {
      n.Util.setOptions(this, t), this._layers = {}, e && this.addData(e)
    },
    addData: function(e) {
      var t = e instanceof Array ? e : e.features,
        r, i;
      if (t) {
        for (r = 0, i = t.length; r < i; r++) this.addData(t[r]);
        return this
      }
      var s = this.options;
      if (s.filter && !s.filter(e)) return;
      var o = n.GeoJSON.geometryToLayer(e, s.pointToLayer);
      return o.feature = e, this.resetStyle(o), s.onEachFeature && s.onEachFeature(e, o), this.addLayer(o)
    },
    resetStyle: function(e) {
      var t = this.options.style;
      t && this._setLayerStyle(e, t)
    },
    setStyle: function(e) {
      this.eachLayer(function(t) {
        this._setLayerStyle(t, e)
      }, this)
    },
    _setLayerStyle: function(e, t) {
      typeof t == "function" && (t = t(e.feature)), e.setStyle && e.setStyle(t)
    }
  }), n.Util.extend(n.GeoJSON, {
    geometryToLayer: function(e, t) {
      var r = e.type === "Feature" ? e.geometry : e,
        i = r.coordinates,
        s = [],
        o, u, a, f, l;
      switch (r.type) {
      case "Point":
        return o = this.coordsToLatLng(i), t ? t(e, o) : new n.Marker(o);
      case "MultiPoint":
        for (a = 0, f = i.length; a < f; a++) o = this.coordsToLatLng(i[a]), l = t ? t(e, o) : new n.Marker(o), s.push(l);
        return new n.FeatureGroup(s);
      case "LineString":
        return u = this.coordsToLatLngs(i), new n.Polyline(u);
      case "Polygon":
        return u = this.coordsToLatLngs(i, 1), new n.Polygon(u);
      case "MultiLineString":
        return u = this.coordsToLatLngs(i, 1), new n.MultiPolyline(u);
      case "MultiPolygon":
        return u = this.coordsToLatLngs(i, 2), new n.MultiPolygon(u);
      case "GeometryCollection":
        for (a = 0, f = r.geometries.length; a < f; a++) l = this.geometryToLayer(r.geometries[a], t), s.push(l);
        return new n.FeatureGroup(s);
      default:
        throw Error("Invalid GeoJSON object.")
      }
    },
    coordsToLatLng: function(e, t) {
      var r = parseFloat(e[t ? 0 : 1]),
        i = parseFloat(e[t ? 1 : 0]);
      return new n.LatLng(r, i, !0)
    },
    coordsToLatLngs: function(e, t, n) {
      var r, i = [],
        s, o;
      for (s = 0, o = e.length; s < o; s++) r = t ? this.coordsToLatLngs(e[s], t - 1, n) : this.coordsToLatLng(e[s], n), i.push(r);
      return i
    }
  }), n.geoJson = function(e, t) {
    return new n.GeoJSON(e, t)
  }, n.DomEvent = {
    addListener: function(e, t, r, i) {
      var s = n.Util.stamp(r),
        o = "_leaflet_" + t + s,
        u, a, f;
      return e[o] ? this : (u = function(t) {
        return r.call(i || e, t || n.DomEvent._getEvent())
      }, n.Browser.msTouch && t.indexOf("touch") === 0 ? this.addMsTouchListener(e, t, u, s) : n.Browser.touch && t === "dblclick" && this.addDoubleTapListener ? this.addDoubleTapListener(e, u, s) : ("addEventListener" in e ? t === "mousewheel" ? (e.addEventListener("DOMMouseScroll", u, !1), e.addEventListener(t, u, !1)) : t === "mouseenter" || t === "mouseleave" ? (a = u, f = t === "mouseenter" ? "mouseover" : "mouseout", u = function(t) {
        if (!n.DomEvent._checkMouse(e, t)) return;
        return a(t)
      }, e.addEventListener(f, u, !1)) : e.addEventListener(t, u, !1) : "attachEvent" in e && e.attachEvent("on" + t, u), e[o] = u, this))
    },
    removeListener: function(e, t, r) {
      var i = n.Util.stamp(r),
        s = "_leaflet_" + t + i,
        o = e[s];
      if (!o) return;
      return n.Browser.msTouch && t.indexOf("touch") === 0 ? this.removeMsTouchListener(e, t, i) : n.Browser.touch && t === "dblclick" && this.removeDoubleTapListener ? this.removeDoubleTapListener(e, i) : "removeEventListener" in e ? t === "mousewheel" ? (e.removeEventListener("DOMMouseScroll", o, !1), e.removeEventListener(t, o, !1)) : t === "mouseenter" || t === "mouseleave" ? e.removeEventListener(t === "mouseenter" ? "mouseover" : "mouseout", o, !1) : e.removeEventListener(t, o, !1) : "detachEvent" in e && e.detachEvent("on" + t, o), e[s] = null, this
    },
    stopPropagation: function(e) {
      return e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0, this
    },
    disableClickPropagation: function(e) {
      var t = n.DomEvent.stopPropagation;
      return n.DomEvent.addListener(e, n.Draggable.START, t).addListener(e, "click", t).addListener(e, "dblclick", t)
    },
    preventDefault: function(e) {
      return e.preventDefault ? e.preventDefault() : e.returnValue = !1, this
    },
    stop: function(e) {
      return n.DomEvent.preventDefault(e).stopPropagation(e)
    },
    getMousePosition: function(e, t) {
      var r = document.body,
        i = document.documentElement,
        s = e.pageX ? e.pageX : e.clientX + r.scrollLeft + i.scrollLeft,
        o = e.pageY ? e.pageY : e.clientY + r.scrollTop + i.scrollTop,
        u = new n.Point(s, o);
      return t ? u._subtract(n.DomUtil.getViewportOffset(t)) : u
    },
    getWheelDelta: function(e) {
      var t = 0;
      return e.wheelDelta && (t = e.wheelDelta / 120), e.detail && (t = -e.detail / 3), t
    },
    _checkMouse: function(e, t) {
      var n = t.relatedTarget;
      if (!n) return !0;
      try {
        while (n && n !== e) n = n.parentNode
      } catch (r) {
        return !1
      }
      return n !== e
    },
    _getEvent: function() {
      var t = e.event;
      if (!t) {
        var n = arguments.callee.caller;
        while (n) {
          t = n.arguments[0];
          if (t && e.Event === t.constructor) break;
          n = n.caller
        }
      }
      return t
    }
  }, n.DomEvent.on = n.DomEvent.addListener, n.DomEvent.off = n.DomEvent.removeListener, n.Draggable = n.Class.extend({
    includes: n.Mixin.Events,
    statics: {
      START: n.Browser.touch ? "touchstart" : "mousedown",
      END: n.Browser.touch ? "touchend" : "mouseup",
      MOVE: n.Browser.touch ? "touchmove" : "mousemove",
      TAP_TOLERANCE: 15
    },
    initialize: function(e, t) {
      this._element = e, this._dragStartTarget = t || e
    },
    enable: function() {
      if (this._enabled) return;
      n.DomEvent.on(this._dragStartTarget, n.Draggable.START, this._onDown, this), this._enabled = !0
    },
    disable: function() {
      if (!this._enabled) return;
      n.DomEvent.off(this._dragStartTarget, n.Draggable.START, this._onDown), this._enabled = !1, this._moved = !1
    },
    _onDown: function(e) {
      if (!n.Browser.touch && e.shiftKey || e.which !== 1 && e.button !== 1 && !e.touches) return;
      n.DomEvent.preventDefault(e);
      if (n.Draggable._disabled) return;
      this._simulateClick = !0;
      if (e.touches && e.touches.length > 1) {
        this._simulateClick = !1;
        return
      }
      var t = e.touches && e.touches.length === 1 ? e.touches[0] : e,
        r = t.target;
      n.Browser.touch && r.tagName.toLowerCase() === "a" && n.DomUtil.addClass(r, "leaflet-active"), this._moved = !1;
      if (this._moving) return;
      this._startPoint = new n.Point(t.clientX, t.clientY), this._startPos = this._newPos = n.DomUtil.getPosition(this._element), n.DomEvent.on(document, n.Draggable.MOVE, this._onMove, this), n.DomEvent.on(document, n.Draggable.END, this._onUp, this)
    },
    _onMove: function(e) {
      if (e.touches && e.touches.length > 1) return;
      var t = e.touches && e.touches.length === 1 ? e.touches[0] : e,
        r = new n.Point(t.clientX, t.clientY),
        i = r.subtract(this._startPoint);
      if (!i.x && !i.y) return;
      n.DomEvent.preventDefault(e), this._moved || (this.fire("dragstart"), this._moved = !0, this._startPos = n.DomUtil.getPosition(this._element).subtract(i), n.Browser.touch || (n.DomUtil.disableTextSelection(), this._setMovingCursor())), this._newPos = this._startPos.add(i), this._moving = !0, n.Util.cancelAnimFrame(this._animRequest), this._animRequest = n.Util.requestAnimFrame(this._updatePosition, this, !0, this._dragStartTarget)
    },
    _updatePosition: function() {
      this.fire("predrag"), n.DomUtil.setPosition(this._element, this._newPos), this.fire("drag")
    },
    _onUp: function(e) {
      var t;
      if (this._simulateClick && e.changedTouches) {
        var r = e.changedTouches[0],
          i = r.target,
          s = this._newPos && this._newPos.distanceTo(this._startPos) || 0;
        i.tagName.toLowerCase() === "a" && n.DomUtil.removeClass(i, "leaflet-active"), s < n.Draggable.TAP_TOLERANCE && (t = r)
      }
      n.Browser.touch || (n.DomUtil.enableTextSelection(), this._restoreCursor()), n.DomEvent.off(document, n.Draggable.MOVE, this._onMove), n.DomEvent.off(document, n.Draggable.END, this._onUp), this._moved && (n.Util.cancelAnimFrame(this._animRequest), this.fire("dragend")), this._moving = !1, t && (this._moved = !1, this._simulateEvent("click", t))
    },
    _setMovingCursor: function() {
      n.DomUtil.addClass(document.body, "leaflet-dragging")
    },
    _restoreCursor: function() {
      n.DomUtil.removeClass(document.body, "leaflet-dragging")
    },
    _simulateEvent: function(t, n) {
      var r = document.createEvent("MouseEvents");
      r.initMouseEvent(t, !0, !0, e, 1, n.screenX, n.screenY, n.clientX, n.clientY, !1, !1, !1, !1, 0, null), n.target.dispatchEvent(r)
    }
  }), n.Handler = n.Class.extend({
    initialize: function(e) {
      this._map = e
    },
    enable: function() {
      if (this._enabled) return;
      this._enabled = !0, this.addHooks()
    },
    disable: function() {
      if (!this._enabled) return;
      this._enabled = !1, this.removeHooks()
    },
    enabled: function() {
      return !!this._enabled
    }
  }), n.Map.mergeOptions({
    dragging: !0,
    inertia: !n.Browser.android23,
    inertiaDeceleration: 3400,
    inertiaMaxSpeed: 6e3,
    inertiaThreshold: n.Browser.touch ? 32 : 18,
    worldCopyJump: !0
  }), n.Map.Drag = n.Handler.extend({
    addHooks: function() {
      if (!this._draggable) {
        this._draggable = new n.Draggable(this._map._mapPane, this._map._container), this._draggable.on({
          dragstart: this._onDragStart,
          drag: this._onDrag,
          dragend: this._onDragEnd
        }, this);
        var e = this._map.options;
        e.worldCopyJump && (this._draggable.on("predrag", this._onPreDrag, this), this._map.on("viewreset", this._onViewReset, this))
      }
      this._draggable.enable()
    },
    removeHooks: function() {
      this._draggable.disable()
    },
    moved: function() {
      return this._draggable && this._draggable._moved
    },
    _onDragStart: function() {
      var e = this._map;
      e._panAnim && e._panAnim.stop(), e.fire("movestart").fire("dragstart"), e.options.inertia && (this._positions = [], this._times = [])
    },
    _onDrag: function() {
      if (this._map.options.inertia) {
        var e = this._lastTime = +(new Date),
          t = this._lastPos = this._draggable._newPos;
        this._positions.push(t), this._times.push(e), e - this._times[0] > 200 && (this._positions.shift(), this._times.shift())
      }
      this._map.fire("move").fire("drag")
    },
    _onViewReset: function() {
      var e = this._map.getSize()._divideBy(2),
        t = this._map.latLngToLayerPoint(new n.LatLng(0, 0));
      this._initialWorldOffset = t.subtract(e).x, this._worldWidth = this._map.project(new n.LatLng(0, 180)).x
    },
    _onPreDrag: function() {
      var e = this._map,
        t = this._worldWidth,
        n = Math.round(t / 2),
        r = this._initialWorldOffset,
        i = this._draggable._newPos.x,
        s = (i - n + r) % t + n - r,
        o = (i + n + r) % t - n - r,
        u = Math.abs(s + r) < Math.abs(o + r) ? s : o;
      this._draggable._newPos.x = u
    },
    _onDragEnd: function() {
      var e = this._map,
        r = e.options,
        i = +(new Date) - this._lastTime,
        s = !r.inertia || i > r.inertiaThreshold || this._positions[0] === t;
      if (s) e.fire("moveend");
      else {
        var o = this._lastPos.subtract(this._positions[0]),
          u = (this._lastTime + i - this._times[0]) / 1e3,
          a = o.multiplyBy(.58 / u),
          f = a.distanceTo(new n.Point(0, 0)),
          l = Math.min(r.inertiaMaxSpeed, f),
          c = a.multiplyBy(l / f),
          h = l / r.inertiaDeceleration,
          p = c.multiplyBy(-h / 2).round();
        n.Util.requestAnimFrame(n.Util.bind(function() {
          this._map.panBy(p, h)
        }, this))
      }
      e.fire("dragend"), r.maxBounds && n.Util.requestAnimFrame(this._panInsideMaxBounds, e, !0, e._container)
    },
    _panInsideMaxBounds: function() {
      this.panInsideBounds(this.options.maxBounds)
    }
  }), n.Map.addInitHook("addHandler", "dragging", n.Map.Drag), n.Map.mergeOptions({
    doubleClickZoom: !0
  }), n.Map.DoubleClickZoom = n.Handler.extend({
    addHooks: function() {
      this._map.on("dblclick", this._onDoubleClick)
    },
    removeHooks: function() {
      this._map.off("dblclick", this._onDoubleClick)
    },
    _onDoubleClick: function(e) {
      this.setView(e.latlng, this._zoom + 1)
    }
  }), n.Map.addInitHook("addHandler", "doubleClickZoom", n.Map.DoubleClickZoom), n.Map.mergeOptions({
    scrollWheelZoom: !n.Browser.touch || n.Browser.msTouch
  }), n.Map.ScrollWheelZoom = n.Handler.extend({
    addHooks: function() {
      n.DomEvent.on(this._map._container, "mousewheel", this._onWheelScroll, this), this._delta = 0
    },
    removeHooks: function() {
      n.DomEvent.off(this._map._container, "mousewheel", this._onWheelScroll)
    },
    _onWheelScroll: function(e) {
      var t = n.DomEvent.getWheelDelta(e);
      this._delta += t, this._lastMousePos = this._map.mouseEventToContainerPoint(e), this._startTime || (this._startTime = +(new Date));
      var r = Math.max(40 - (+(new Date) - this._startTime), 0);
      clearTimeout(this._timer), this._timer = setTimeout(n.Util.bind(this._performZoom, this), r), n.DomEvent.preventDefault(e), n.DomEvent.stopPropagation(e)
    },
    _performZoom: function() {
      var e = this._map,
        t = Math.round(this._delta),
        n = e.getZoom();
      t = Math.max(Math.min(t, 4), -4), t = e._limitZoom(n + t) - n, this._delta = 0, this._startTime = null;
      if (!t) return;
      var r = n + t,
        i = this._getCenterForScrollWheelZoom(r);
      e.setView(i, r)
    },
    _getCenterForScrollWheelZoom: function(e) {
      var t = this._map,
        n = t.getZoomScale(e),
        r = t.getSize()._divideBy(2),
        i = this._lastMousePos._subtract(r)._multiplyBy(1 - 1 / n),
        s = t._getTopLeftPoint()._add(r)._add(i);
      return t.unproject(s)
    }
  }), n.Map.addInitHook("addHandler", "scrollWheelZoom", n.Map.ScrollWheelZoom), n.Util.extend(n.DomEvent, {
    _touchstart: n.Browser.msTouch ? "MSPointerDown" : "touchstart",
    _touchend: n.Browser.msTouch ? "MSPointerUp" : "touchend",
    addDoubleTapListener: function(e, t, r) {
      function h(e) {
        var t;
        n.Browser.msTouch ? (c.push(e.pointerId), t = c.length) : t = e.touches.length;
        if (t > 1) return;
        var r = Date.now(),
          a = r - (i || r);
        u = e.touches ? e.touches[0] : e, s = a > 0 && a <= o, i = r
      }
      function p(e) {
        if (n.Browser.msTouch) {
          var r = c.indexOf(e.pointerId);
          if (r === -1) return;
          c.splice(r, 1)
        }
        if (s) {
          if (n.Browser.msTouch) {
            var o = {},
              a;
            for (var f in u) a = u[f], typeof a == "function" ? o[f] = a.bind(u) : o[f] = a;
            u = o
          }
          u.type = "dblclick", t(u), i = null
        }
      }
      var i, s = !1,
        o = 250,
        u, a = "_leaflet_",
        f = this._touchstart,
        l = this._touchend,
        c = [];
      e[a + f + r] = h, e[a + l + r] = p;
      var d = n.Browser.msTouch ? document.documentElement : e;
      return e.addEventListener(f, h, !1), d.addEventListener(l, p, !1), n.Browser.msTouch && d.addEventListener("MSPointerCancel", p, !1), this
    },
    removeDoubleTapListener: function(e, t) {
      var r = "_leaflet_";
      return e.removeEventListener(this._touchstart, e[r + this._touchstart + t], !1), (n.Browser.msTouch ? document.documentElement : e).removeEventListener(this._touchend, e[r + this._touchend + t], !1), n.Browser.msTouch && document.documentElement.removeEventListener("MSPointerCancel", e[r + this._touchend + t], !1), this
    }
  }), n.Util.extend(n.DomEvent, {
    _msTouches: [],
    _msDocumentListener: !1,
    addMsTouchListener: function(e, t, n, r) {
      switch (t) {
      case "touchstart":
        return this.addMsTouchListenerStart(e, t, n, r);
      case "touchend":
        return this.addMsTouchListenerEnd(e, t, n, r);
      case "touchmove":
        return this.addMsTouchListenerMove(e, t, n, r);
      default:
        throw "Unknown touch event type"
      }
    },
    addMsTouchListenerStart: function(e, t, n, r) {
      var i = "_leaflet_",
        s = this._msTouches,
        o = function(e) {
          var t = !1;
          for (var r = 0; r < s.length; r++) if (s[r].pointerId === e.pointerId) {
            t = !0;
            break
          }
          t || s.push(e), e.touches = s.slice(), e.changedTouches = [e], n(e)
        };
      e[i + "touchstart" + r] = o, e.addEventListener("MSPointerDown", o, !1);
      if (!this._msDocumentListener) {
        var u = function(e) {
            for (var t = 0; t < s.length; t++) if (s[t].pointerId === e.pointerId) {
              s.splice(t, 1);
              break
            }
          };
        document.documentElement.addEventListener("MSPointerUp", u, !1), document.documentElement.addEventListener("MSPointerCancel", u, !1), this._msDocumentListener = !0
      }
      return this
    },
    addMsTouchListenerMove: function(e, t, n, r) {
      var i = "_leaflet_",
        s = this._msTouches,
        o = function(e) {
          if (e.pointerType === e.MSPOINTER_TYPE_MOUSE && e.buttons === 0) return;
          for (var t = 0; t < s.length; t++) if (s[t].pointerId === e.pointerId) {
            s[t] = e;
            break
          }
          e.touches = s.slice(), e.changedTouches = [e], n(e)
        };
      return e[i + "touchmove" + r] = o, e.addEventListener("MSPointerMove", o, !1), this
    },
    addMsTouchListenerEnd: function(e, t, n, r) {
      var i = "_leaflet_",
        s = this._msTouches,
        o = function(e) {
          for (var t = 0; t < s.length; t++) if (s[t].pointerId === e.pointerId) {
            s.splice(t, 1);
            break
          }
          e.touches = s.slice(), e.changedTouches = [e], n(e)
        };
      return e[i + "touchend" + r] = o, e.addEventListener("MSPointerUp", o, !1), e.addEventListener("MSPointerCancel", o, !1), this
    },
    removeMsTouchListener: function(e, t, n) {
      var r = "_leaflet_",
        i = e[r + t + n];
      switch (t) {
      case "touchstart":
        e.removeEventListener("MSPointerDown", i, !1);
        break;
      case "touchmove":
        e.removeEventListener("MSPointerMove", i, !1);
        break;
      case "touchend":
        e.removeEventListener("MSPointerUp", i, !1), e.removeEventListener("MSPointerCancel", i, !1)
      }
      return this
    }
  }), n.Map.mergeOptions({
    touchZoom: n.Browser.touch && !n.Browser.android23
  }), n.Map.TouchZoom = n.Handler.extend({
    addHooks: function() {
      n.DomEvent.on(this._map._container, "touchstart", this._onTouchStart, this)
    },
    removeHooks: function() {
      n.DomEvent.off(this._map._container, "touchstart", this._onTouchStart, this)
    },
    _onTouchStart: function(e) {
      var t = this._map;
      if (!e.touches || e.touches.length !== 2 || t._animatingZoom || this._zooming) return;
      var r = t.mouseEventToLayerPoint(e.touches[0]),
        i = t.mouseEventToLayerPoint(e.touches[1]),
        s = t._getCenterLayerPoint();
      this._startCenter = r.add(i)._divideBy(2), this._startDist = r.distanceTo(i), this._moved = !1, this._zooming = !0, this._centerOffset = s.subtract(this._startCenter), t._panAnim && t._panAnim.stop(), n.DomEvent.on(document, "touchmove", this._onTouchMove, this).on(document, "touchend", this._onTouchEnd, this), n.DomEvent.preventDefault(e)
    },
    _onTouchMove: function(e) {
      if (!e.touches || e.touches.length !== 2) return;
      var t = this._map,
        r = t.mouseEventToLayerPoint(e.touches[0]),
        i = t.mouseEventToLayerPoint(e.touches[1]);
      this._scale = r.distanceTo(i) / this._startDist, this._delta = r._add(i)._divideBy(2)._subtract(this._startCenter);
      if (this._scale === 1) return;
      this._moved || (n.DomUtil.addClass(t._mapPane, "leaflet-zoom-anim leaflet-touching"), t.fire("movestart").fire("zoomstart")._prepareTileBg(), this._moved = !0), n.Util.cancelAnimFrame(this._animRequest), this._animRequest = n.Util.requestAnimFrame(this._updateOnMove, this, !0, this._map._container), n.DomEvent.preventDefault(e)
    },
    _updateOnMove: function() {
      var e = this._map,
        t = this._getScaleOrigin(),
        r = e.layerPointToLatLng(t);
      e.fire("zoomanim", {
        center: r,
        zoom: e.getScaleZoom(this._scale)
      }), e._tileBg.style[n.DomUtil.TRANSFORM] = n.DomUtil.getTranslateString(this._delta) + " " + n.DomUtil.getScaleString(this._scale, this._startCenter)
    },
    _onTouchEnd: function(e) {
      if (!this._moved || !this._zooming) return;
      var t = this._map;
      this._zooming = !1, n.DomUtil.removeClass(t._mapPane, "leaflet-touching"), n.DomEvent.off(document, "touchmove", this._onTouchMove).off(document, "touchend", this._onTouchEnd);
      var r = this._getScaleOrigin(),
        i = t.layerPointToLatLng(r),
        s = t.getZoom(),
        o = t.getScaleZoom(this._scale) - s,
        u = o > 0 ? Math.ceil(o) : Math.floor(o),
        a = t._limitZoom(s + u);
      t.fire("zoomanim", {
        center: i,
        zoom: a
      }), t._runAnimation(i, a, t.getZoomScale(a) / this._scale, r, !0)
    },
    _getScaleOrigin: function() {
      var e = this._centerOffset.subtract(this._delta).divideBy(this._scale);
      return this._startCenter.add(e)
    }
  }), n.Map.addInitHook("addHandler", "touchZoom", n.Map.TouchZoom), n.Map.mergeOptions({
    boxZoom: !0
  }), n.Map.BoxZoom = n.Handler.extend({
    initialize: function(e) {
      this._map = e, this._container = e._container, this._pane = e._panes.overlayPane
    },
    addHooks: function() {
      n.DomEvent.on(this._container, "mousedown", this._onMouseDown, this)
    },
    removeHooks: function() {
      n.DomEvent.off(this._container, "mousedown", this._onMouseDown)
    },
    _onMouseDown: function(e) {
      if (!e.shiftKey || e.which !== 1 && e.button !== 1) return !1;
      n.DomUtil.disableTextSelection(), this._startLayerPoint = this._map.mouseEventToLayerPoint(e), this._box = n.DomUtil.create("div", "leaflet-zoom-box", this._pane), n.DomUtil.setPosition(this._box, this._startLayerPoint), this._container.style.cursor = "crosshair", n.DomEvent.on(document, "mousemove", this._onMouseMove, this).on(document, "mouseup", this._onMouseUp, this).preventDefault(e), this._map.fire("boxzoomstart")
    },
    _onMouseMove: function(e) {
      var t = this._startLayerPoint,
        r = this._box,
        i = this._map.mouseEventToLayerPoint(e),
        s = i.subtract(t),
        o = new n.Point(Math.min(i.x, t.x), Math.min(i.y, t.y));
      n.DomUtil.setPosition(r, o), r.style.width = Math.max(0, Math.abs(s.x) - 4) + "px", r.style.height = Math.max(0, Math.abs(s.y) - 4) + "px"
    },
    _onMouseUp: function(e) {
      this._pane.removeChild(this._box), this._container.style.cursor = "", n.DomUtil.enableTextSelection(), n.DomEvent.off(document, "mousemove", this._onMouseMove).off(document, "mouseup", this._onMouseUp);
      var t = this._map,
        r = t.mouseEventToLayerPoint(e),
        i = new n.LatLngBounds(t.layerPointToLatLng(this._startLayerPoint), t.layerPointToLatLng(r));
      t.fitBounds(i), t.fire("boxzoomend", {
        boxZoomBounds: i
      })
    }
  }), n.Map.addInitHook("addHandler", "boxZoom", n.Map.BoxZoom), n.Map.mergeOptions({
    keyboard: !0,
    keyboardPanOffset: 80,
    keyboardZoomOffset: 1
  }), n.Map.Keyboard = n.Handler.extend({
    keyCodes: {
      left: [37],
      right: [39],
      down: [40],
      up: [38],
      zoomIn: [187, 107, 61],
      zoomOut: [189, 109]
    },
    initialize: function(e) {
      this._map = e, this._setPanOffset(e.options.keyboardPanOffset), this._setZoomOffset(e.options.keyboardZoomOffset)
    },
    addHooks: function() {
      var e = this._map._container;
      e.tabIndex === -1 && (e.tabIndex = "0"), n.DomEvent.addListener(e, "focus", this._onFocus, this).addListener(e, "blur", this._onBlur, this).addListener(e, "mousedown", this._onMouseDown, this), this._map.on("focus", this._addHooks, this).on("blur", this._removeHooks, this)
    },
    removeHooks: function() {
      this._removeHooks();
      var e = this._map._container;
      n.DomEvent.removeListener(e, "focus", this._onFocus, this).removeListener(e, "blur", this._onBlur, this).removeListener(e, "mousedown", this._onMouseDown, this), this._map.off("focus", this._addHooks, this).off("blur", this._removeHooks, this)
    },
    _onMouseDown: function() {
      this._focused || this._map._container.focus()
    },
    _onFocus: function() {
      this._focused = !0, this._map.fire("focus")
    },
    _onBlur: function() {
      this._focused = !1, this._map.fire("blur")
    },
    _setPanOffset: function(e) {
      var t = this._panKeys = {},
        n = this.keyCodes,
        r, i;
      for (r = 0, i = n.left.length; r < i; r++) t[n.left[r]] = [-1 * e, 0];
      for (r = 0, i = n.right.length; r < i; r++) t[n.right[r]] = [e, 0];
      for (r = 0, i = n.down.length; r < i; r++) t[n.down[r]] = [0, e];
      for (r = 0, i = n.up.length; r < i; r++) t[n.up[r]] = [0, -1 * e]
    },
    _setZoomOffset: function(e) {
      var t = this._zoomKeys = {},
        n = this.keyCodes,
        r, i;
      for (r = 0, i = n.zoomIn.length; r < i; r++) t[n.zoomIn[r]] = e;
      for (r = 0, i = n.zoomOut.length; r < i; r++) t[n.zoomOut[r]] = -e
    },
    _addHooks: function() {
      n.DomEvent.addListener(document, "keydown", this._onKeyDown, this)
    },
    _removeHooks: function() {
      n.DomEvent.removeListener(document, "keydown", this._onKeyDown, this)
    },
    _onKeyDown: function(e) {
      var t = e.keyCode;
      if (this._panKeys.hasOwnProperty(t)) this._map.panBy(this._panKeys[t]);
      else {
        if (!this._zoomKeys.hasOwnProperty(t)) return;
        this._map.setZoom(this._map.getZoom() + this._zoomKeys[t])
      }
      n.DomEvent.stop(e)
    }
  }), n.Map.addInitHook("addHandler", "keyboard", n.Map.Keyboard), n.Handler.MarkerDrag = n.Handler.extend({
    initialize: function(e) {
      this._marker = e
    },
    addHooks: function() {
      var e = this._marker._icon;
      this._draggable || (this._draggable = (new n.Draggable(e, e)).on("dragstart", this._onDragStart, this).on("drag", this._onDrag, this).on("dragend", this._onDragEnd, this)), this._draggable.enable()
    },
    removeHooks: function() {
      this._draggable.disable()
    },
    moved: function() {
      return this._draggable && this._draggable._moved
    },
    _onDragStart: function(e) {
      this._marker.closePopup().fire("movestart").fire("dragstart")
    },
    _onDrag: function(e) {
      var t = this._marker,
        r = t._shadow,
        i = n.DomUtil.getPosition(t._icon),
        s = t._map.layerPointToLatLng(i);
      r && n.DomUtil.setPosition(r, i), t._latlng = s, t.fire("move", {
        latlng: s
      }).fire("drag")
    },
    _onDragEnd: function() {
      this._marker.fire("moveend").fire("dragend")
    }
  }), n.Handler.PolyEdit = n.Handler.extend({
    options: {
      icon: new n.DivIcon({
        iconSize: new n.Point(8, 8),
        className: "leaflet-div-icon leaflet-editing-icon"
      })
    },
    initialize: function(e, t) {
      this._poly = e, n.Util.setOptions(this, t)
    },
    addHooks: function() {
      this._poly._map && (this._markerGroup || this._initMarkers(), this._poly._map.addLayer(this._markerGroup))
    },
    removeHooks: function() {
      this._poly._map && (this._poly._map.removeLayer(this._markerGroup), delete this._markerGroup, delete this._markers)
    },
    updateMarkers: function() {
      this._markerGroup.clearLayers(), this._initMarkers()
    },
    _initMarkers: function() {
      this._markerGroup || (this._markerGroup = new n.LayerGroup), this._markers = [];
      var e = this._poly._latlngs,
        t, r, i, s;
      for (t = 0, i = e.length; t < i; t++) s = this._createMarker(e[t], t), s.on("click", this._onMarkerClick, this), this._markers.push(s);
      var o, u;
      for (t = 0, r = i - 1; t < i; r = t++) {
        if (t === 0 && !(n.Polygon && this._poly instanceof n.Polygon)) continue;
        o = this._markers[r], u = this._markers[t], this._createMiddleMarker(o, u), this._updatePrevNext(o, u)
      }
    },
    _createMarker: function(e, t) {
      var r = new n.Marker(e, {
        draggable: !0,
        icon: this.options.icon
      });
      return r._origLatLng = e, r._index = t, r.on("drag", this._onMarkerDrag, this), r.on("dragend", this._fireEdit, this), this._markerGroup.addLayer(r), r
    },
    _fireEdit: function() {
      this._poly.fire("edit")
    },
    _onMarkerDrag: function(e) {
      var t = e.target;
      n.Util.extend(t._origLatLng, t._latlng), t._middleLeft && t._middleLeft.setLatLng(this._getMiddleLatLng(t._prev, t)), t._middleRight && t._middleRight.setLatLng(this._getMiddleLatLng(t, t._next)), this._poly.redraw()
    },
    _onMarkerClick: function(e) {
      if (this._poly._latlngs.length < 3) return;
      var t = e.target,
        n = t._index;
      t._prev && t._next ? this._createMiddleMarker(t._prev, t._next) : t._prev ? t._next || (t._prev._middleRight = null) : t._next._middleLeft = null, this._updatePrevNext(t._prev, t._next), this._markerGroup.removeLayer(t), t._middleLeft && this._markerGroup.removeLayer(t._middleLeft), t._middleRight && this._markerGroup.removeLayer(t._middleRight), this._markers.splice(n, 1), this._poly.spliceLatLngs(n, 1), this._updateIndexes(n, -1), this._poly.fire("edit")
    },
    _updateIndexes: function(e, t) {
      this._markerGroup.eachLayer(function(n) {
        n._index > e && (n._index += t)
      })
    },
    _createMiddleMarker: function(e, t) {
      var n = this._getMiddleLatLng(e, t),
        r = this._createMarker(n),
        i, s, o;
      r.setOpacity(.6), e._middleRight = t._middleLeft = r, s = function() {
        var s = t._index;
        r._index = s, r.off("click", i).on("click", this._onMarkerClick, this), n.lat = r.getLatLng().lat, n.lng = r.getLatLng().lng, this._poly.spliceLatLngs(s, 0, n), this._markers.splice(s, 0, r), r.setOpacity(1), this._updateIndexes(s, 1), t._index++, this._updatePrevNext(e, r), this._updatePrevNext(r, t)
      }, o = function() {
        r.off("dragstart", s, this), r.off("dragend", o, this), this._createMiddleMarker(e, r), this._createMiddleMarker(r, t)
      }, i = function() {
        s.call(this), o.call(this), this._poly.fire("edit")
      }, r.on("click", i, this).on("dragstart", s, this).on("dragend", o, this), this._markerGroup.addLayer(r)
    },
    _updatePrevNext: function(e, t) {
      e && (e._next = t), t && (t._prev = e)
    },
    _getMiddleLatLng: function(e, t) {
      var n = this._poly._map,
        r = n.latLngToLayerPoint(e.getLatLng()),
        i = n.latLngToLayerPoint(t.getLatLng());
      return n.layerPointToLatLng(r._add(i)._divideBy(2))
    }
  }), n.Control = n.Class.extend({
    options: {
      position: "topright"
    },
    initialize: function(e) {
      n.Util.setOptions(this, e)
    },
    getPosition: function() {
      return this.options.position
    },
    setPosition: function(e) {
      var t = this._map;
      return t && t.removeControl(this), this.options.position = e, t && t.addControl(this), this
    },
    addTo: function(e) {
      this._map = e;
      var t = this._container = this.onAdd(e),
        r = this.getPosition(),
        i = e._controlCorners[r];
      return n.DomUtil.addClass(t, "leaflet-control"), r.indexOf("bottom") !== -1 ? i.insertBefore(t, i.firstChild) : i.appendChild(t), this
    },
    removeFrom: function(e) {
      var t = this.getPosition(),
        n = e._controlCorners[t];
      return n.removeChild(this._container), this._map = null, this.onRemove && this.onRemove(e), this
    }
  }), n.control = function(e) {
    return new n.Control(e)
  }, n.Map.include({
    addControl: function(e) {
      return e.addTo(this), this
    },
    removeControl: function(e) {
      return e.removeFrom(this), this
    },
    _initControlPos: function() {
      function i(i, s) {
        var o = t + i + " " + t + s;
        e[i + s] = n.DomUtil.create("div", o, r)
      }
      var e = this._controlCorners = {},
        t = "leaflet-",
        r = this._controlContainer = n.DomUtil.create("div", t + "control-container", this._container);
      i("top", "left"), i("top", "right"), i("bottom", "left"), i("bottom", "right")
    }
  }), n.Control.Zoom = n.Control.extend({
    options: {
      position: "topleft"
    },
    onAdd: function(e) {
      var t = "leaflet-control-zoom",
        r = n.DomUtil.create("div", t);
      return this._map = e, this._createButton("Zoom in", t + "-in", r, this._zoomIn, this), this._createButton("Zoom out", t + "-out", r, this._zoomOut, this), r
    },
    _zoomIn: function(e) {
      this._map.zoomIn(e.shiftKey ? 3 : 1)
    },
    _zoomOut: function(e) {
      this._map.zoomOut(e.shiftKey ? 3 : 1)
    },
    _createButton: function(e, t, r, i, s) {
      var o = n.DomUtil.create("a", t, r);
      return o.href = "#", o.title = e, n.DomEvent.on(o, "click", n.DomEvent.stopPropagation).on(o, "mousedown", n.DomEvent.stopPropagation).on(o, "dblclick", n.DomEvent.stopPropagation).on(o, "click", n.DomEvent.preventDefault).on(o, "click", i, s), o
    }
  }), n.Map.mergeOptions({
    zoomControl: !0
  }), n.Map.addInitHook(function() {
    this.options.zoomControl && (this.zoomControl = new n.Control.Zoom, this.addControl(this.zoomControl))
  }), n.control.zoom = function(e) {
    return new n.Control.Zoom(e)
  }, n.Control.Attribution = n.Control.extend({
    options: {
      position: "bottomright",
      prefix: 'Powered by <a href="http://leaflet.cloudmade.com">Leaflet</a>'
    },
    initialize: function(e) {
      n.Util.setOptions(this, e), this._attributions = {}
    },
    onAdd: function(e) {
      return this._container = n.DomUtil.create("div", "leaflet-control-attribution"), n.DomEvent.disableClickPropagation(this._container), e.on("layeradd", this._onLayerAdd, this).on("layerremove", this._onLayerRemove, this), this._update(), this._container
    },
    onRemove: function(e) {
      e.off("layeradd", this._onLayerAdd).off("layerremove", this._onLayerRemove)
    },
    setPrefix: function(e) {
      return this.options.prefix = e, this._update(), this
    },
    addAttribution: function(e) {
      if (!e) return;
      return this._attributions[e] || (this._attributions[e] = 0), this._attributions[e]++, this._update(), this
    },
    removeAttribution: function(e) {
      if (!e) return;
      return this._attributions[e]--, this._update(), this
    },
    _update: function() {
      if (!this._map) return;
      var e = [];
      for (var t in this._attributions) this._attributions.hasOwnProperty(t) && this._attributions[t] && e.push(t);
      var n = [];
      this.options.prefix && n.push(this.options.prefix), e.length && n.push(e.join(", ")), this._container.innerHTML = n.join(" &#8212; ")
    },
    _onLayerAdd: function(e) {
      e.layer.getAttribution && this.addAttribution(e.layer.getAttribution())
    },
    _onLayerRemove: function(e) {
      e.layer.getAttribution && this.removeAttribution(e.layer.getAttribution())
    }
  }), n.Map.mergeOptions({
    attributionControl: !0
  }), n.Map.addInitHook(function() {
    this.options.attributionControl && (this.attributionControl = (new n.Control.Attribution).addTo(this))
  }), n.control.attribution = function(e) {
    return new n.Control.Attribution(e)
  }, n.Control.Scale = n.Control.extend({
    options: {
      position: "bottomleft",
      maxWidth: 100,
      metric: !0,
      imperial: !0,
      updateWhenIdle: !1
    },
    onAdd: function(e) {
      this._map = e;
      var t = "leaflet-control-scale",
        r = n.DomUtil.create("div", t),
        i = this.options;
      return this._addScales(i, t, r), e.on(i.updateWhenIdle ? "moveend" : "move", this._update, this), e.whenReady(this._update, this), r
    },
    onRemove: function(e) {
      e.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this)
    },
    _addScales: function(e, t, r) {
      e.metric && (this._mScale = n.DomUtil.create("div", t + "-line", r)), e.imperial && (this._iScale = n.DomUtil.create("div", t + "-line", r))
    },
    _update: function() {
      var e = this._map.getBounds(),
        t = e.getCenter().lat,
        n = 6378137 * Math.PI * Math.cos(t * Math.PI / 180),
        r = n * (e.getNorthEast().lng - e.getSouthWest().lng) / 180,
        i = this._map.getSize(),
        s = this.options,
        o = 0;
      i.x > 0 && (o = r * (s.maxWidth / i.x)), this._updateScales(s, o)
    },
    _updateScales: function(e, t) {
      e.metric && t && this._updateMetric(t), e.imperial && t && this._updateImperial(t)
    },
    _updateMetric: function(e) {
      var t = this._getRoundNum(e);
      this._mScale.style.width = this._getScaleWidth(t / e) + "px", this._mScale.innerHTML = t < 1e3 ? t + " m" : t / 1e3 + " km"
    },
    _updateImperial: function(e) {
      var t = e * 3.2808399,
        n = this._iScale,
        r, i, s;
      t > 5280 ? (r = t / 5280, i = this._getRoundNum(r), n.style.width = this._getScaleWidth(i / r) + "px", n.innerHTML = i + " mi") : (s = this._getRoundNum(t), n.style.width = this._getScaleWidth(s / t) + "px", n.innerHTML = s + " ft")
    },
    _getScaleWidth: function(e) {
      return Math.round(this.options.maxWidth * e) - 10
    },
    _getRoundNum: function(e) {
      var t = Math.pow(10, (Math.floor(e) + "").length - 1),
        n = e / t;
      return n = n >= 10 ? 10 : n >= 5 ? 5 : n >= 3 ? 3 : n >= 2 ? 2 : 1, t * n
    }
  }), n.control.scale = function(e) {
    return new n.Control.Scale(e)
  }, n.Control.Layers = n.Control.extend({
    options: {
      collapsed: !0,
      position: "topright",
      autoZIndex: !0
    },
    initialize: function(e, t, r) {
      n.Util.setOptions(this, r), this._layers = {}, this._lastZIndex = 0;
      for (var i in e) e.hasOwnProperty(i) && this._addLayer(e[i], i);
      for (i in t) t.hasOwnProperty(i) && this._addLayer(t[i], i, !0)
    },
    onAdd: function(e) {
      return this._initLayout(), this._update(), this._container
    },
    addBaseLayer: function(e, t) {
      return this._addLayer(e, t), this._update(), this
    },
    addOverlay: function(e, t) {
      return this._addLayer(e, t, !0), this._update(), this
    },
    removeLayer: function(e) {
      var t = n.Util.stamp(e);
      return delete this._layers[t], this._update(), this
    },
    _initLayout: function() {
      var e = "leaflet-control-layers",
        t = this._container = n.DomUtil.create("div", e);
      n.Browser.touch ? n.DomEvent.on(t, "click", n.DomEvent.stopPropagation) : n.DomEvent.disableClickPropagation(t);
      var r = this._form = n.DomUtil.create("form", e + "-list");
      if (this.options.collapsed) {
        n.DomEvent.on(t, "mouseover", this._expand, this).on(t, "mouseout", this._collapse, this);
        var i = this._layersLink = n.DomUtil.create("a", e + "-toggle", t);
        i.href = "#", i.title = "Layers", n.Browser.touch ? n.DomEvent.on(i, "click", n.DomEvent.stopPropagation).on(i, "click", n.DomEvent.preventDefault).on(i, "click", this._expand, this) : n.DomEvent.on(i, "focus", this._expand, this), this._map.on("movestart", this._collapse, this)
      } else this._expand();
      this._baseLayersList = n.DomUtil.create("div", e + "-base", r), this._separator = n.DomUtil.create("div", e + "-separator", r), this._overlaysList = n.DomUtil.create("div", e + "-overlays", r), t.appendChild(r)
    },
    _addLayer: function(e, t, r) {
      var i = n.Util.stamp(e);
      this._layers[i] = {
        layer: e,
        name: t,
        overlay: r
      }, this.options.autoZIndex && e.setZIndex && (this._lastZIndex++, e.setZIndex(this._lastZIndex))
    },
    _update: function() {
      if (!this._container) return;
      this._baseLayersList.innerHTML = "", this._overlaysList.innerHTML = "";
      var e = !1,
        t = !1;
      for (var n in this._layers) if (this._layers.hasOwnProperty(n)) {
        var r = this._layers[n];
        this._addItem(r), t = t || r.overlay, e = e || !r.overlay
      }
      this._separator.style.display = t && e ? "" : "none"
    },
    _createRadioElement: function(e, t) {
      var n = '<input type="radio" class="leaflet-control-layers-selector" name="' + e + '"';
      t && (n += ' checked="checked"'), n += "/>";
      var r = document.createElement("div");
      return r.innerHTML = n, r.firstChild
    },
    _addItem: function(e) {
      var t = document.createElement("label"),
        r, i = this._map.hasLayer(e.layer);
      e.overlay ? (r = document.createElement("input"), r.type = "checkbox", r.className = "leaflet-control-layers-selector", r.defaultChecked = i) : r = this._createRadioElement("leaflet-base-layers", i), r.layerId = n.Util.stamp(e.layer), n.DomEvent.on(r, "click", this._onInputClick, this);
      var s = document.createElement("span");
      s.innerHTML = " " + e.name, t.appendChild(r), t.appendChild(s);
      var o = e.overlay ? this._overlaysList : this._baseLayersList;
      o.appendChild(t)
    },
    _onInputClick: function() {
      var e, t, n, r = this._form.getElementsByTagName("input"),
        i = r.length,
        s;
      for (e = 0; e < i; e++) t = r[e], n = this._layers[t.layerId], t.checked && !this._map.hasLayer(n.layer) ? (this._map.addLayer(n.layer), n.overlay || (s = n.layer)) : !t.checked && this._map.hasLayer(n.layer) && this._map.removeLayer(n.layer);
      s && this._map.fire("baselayerchange", {
        layer: s
      })
    },
    _expand: function() {
      n.DomUtil.addClass(this._container, "leaflet-control-layers-expanded")
    },
    _collapse: function() {
      this._container.className = this._container.className.replace(" leaflet-control-layers-expanded", "")
    }
  }), n.control.layers = function(e, t, r) {
    return new n.Control.Layers(e, t, r)
  }, n.PosAnimation = n.Class.extend({
    includes: n.Mixin.Events,
    run: function(e, t, r, i) {
      this.stop(), this._el = e, this._inProgress = !0, this.fire("start"), e.style[n.DomUtil.TRANSITION] = "all " + (r || .25) + "s " + (i || "ease-out"), n.DomEvent.on(e, n.DomUtil.TRANSITION_END, this._onTransitionEnd, this), n.DomUtil.setPosition(e, t), n.Util.falseFn(e.offsetWidth), this._stepTimer = setInterval(n.Util.bind(this.fire, this, "step"), 50)
    },
    stop: function() {
      if (!this._inProgress) return;
      n.DomUtil.setPosition(this._el, this._getPos()), this._onTransitionEnd()
    },
    _transformRe: /(-?[\d\.]+), (-?[\d\.]+)\)/,
    _getPos: function() {
      var t, r, i, s = this._el,
        o = e.getComputedStyle(s);
      return n.Browser.any3d ? (i = o[n.DomUtil.TRANSFORM].match(this._transformRe), t = parseFloat(i[1]), r = parseFloat(i[2])) : (t = parseFloat(o.left), r = parseFloat(o.top)), new n.Point(t, r, !0)
    },
    _onTransitionEnd: function() {
      n.DomEvent.off(this._el, n.DomUtil.TRANSITION_END, this._onTransitionEnd, this);
      if (!this._inProgress) return;
      this._inProgress = !1, this._el.style[n.DomUtil.TRANSITION] = "", clearInterval(this._stepTimer), this.fire("step").fire("end")
    }
  }), n.Map.include({
    setView: function(e, t, n) {
      t = this._limitZoom(t);
      var r = this._zoom !== t;
      if (this._loaded && !n && this._layers) {
        this._panAnim && this._panAnim.stop();
        var i = r ? this._zoomToIfClose && this._zoomToIfClose(e, t) : this._panByIfClose(e);
        if (i) return clearTimeout(this._sizeTimer), this
      }
      return this._resetView(e, t), this
    },
    panBy: function(e, t) {
      e = n.point(e);
      if (!e.x && !e.y) return this;
      this._panAnim || (this._panAnim = new n.PosAnimation, this._panAnim.on({
        step: this._onPanTransitionStep,
        end: this._onPanTransitionEnd
      }, this)), this.fire("movestart"), n.DomUtil.addClass(this._mapPane, "leaflet-pan-anim");
      var r = n.DomUtil.getPosition(this._mapPane).subtract(e);
      return this._panAnim.run(this._mapPane, r, t || .25), this
    },
    _onPanTransitionStep: function() {
      this.fire("move")
    },
    _onPanTransitionEnd: function() {
      n.DomUtil.removeClass(this._mapPane, "leaflet-pan-anim"), this.fire("moveend")
    },
    _panByIfClose: function(e) {
      var t = this._getCenterOffset(e)._floor();
      return this._offsetIsWithinView(t) ? (this.panBy(t), !0) : !1
    },
    _offsetIsWithinView: function(e, t) {
      var n = t || 1,
        r = this.getSize();
      return Math.abs(e.x) <= r.x * n && Math.abs(e.y) <= r.y * n
    }
  }), n.PosAnimation = n.DomUtil.TRANSITION ? n.PosAnimation : n.PosAnimation.extend({
    run: function(e, t, r, i) {
      this.stop(), this._el = e, this._inProgress = !0, this._duration = r || .25, this._ease = this._easings[i || "ease-out"], this._startPos = n.DomUtil.getPosition(e), this._offset = t.subtract(this._startPos), this._startTime = +(new Date), this.fire("start"), this._animate()
    },
    stop: function() {
      if (!this._inProgress) return;
      this._step(), this._complete()
    },
    _animate: function() {
      this._animId = n.Util.requestAnimFrame(this._animate, this), this._step()
    },
    _step: function() {
      var e = +(new Date) - this._startTime,
        t = this._duration * 1e3;
      e < t ? this._runFrame(this._ease(e / t)) : (this._runFrame(1), this._complete())
    },
    _runFrame: function(e) {
      var t = this._startPos.add(this._offset.multiplyBy(e));
      n.DomUtil.setPosition(this._el, t), this.fire("step")
    },
    _complete: function() {
      n.Util.cancelAnimFrame(this._animId), this._inProgress = !1, this.fire("end")
    },
    _easings: {
      "ease-out": function(e) {
        return e * (2 - e)
      },
      linear: function(e) {
        return e
      }
    }
  }), n.Map.mergeOptions({
    zoomAnimation: n.DomUtil.TRANSITION && !n.Browser.android23 && !n.Browser.mobileOpera
  }), n.DomUtil.TRANSITION && n.Map.addInitHook(function() {
    n.DomEvent.on(this._mapPane, n.DomUtil.TRANSITION_END, this._catchTransitionEnd, this)
  }), n.Map.include(n.DomUtil.TRANSITION ? {
    _zoomToIfClose: function(e, t) {
      if (this._animatingZoom) return !0;
      if (!this.options.zoomAnimation) return !1;
      var r = this.getZoomScale(t),
        i = this._getCenterOffset(e)._divideBy(1 - 1 / r);
      if (!this._offsetIsWithinView(i, 1)) return !1;
      n.DomUtil.addClass(this._mapPane, "leaflet-zoom-anim"), this.fire("movestart").fire("zoomstart"), this.fire("zoomanim", {
        center: e,
        zoom: t
      });
      var s = this._getCenterLayerPoint().add(i);
      return this._prepareTileBg(), this._runAnimation(e, t, r, s), !0
    },
    _catchTransitionEnd: function(e) {
      this._animatingZoom && this._onZoomTransitionEnd()
    },
    _runAnimation: function(e, t, r, i, s) {
      this._animateToCenter = e, this._animateToZoom = t, this._animatingZoom = !0, n.Draggable && (n.Draggable._disabled = !0);
      var o = n.DomUtil.TRANSFORM,
        u = this._tileBg;
      clearTimeout(this._clearTileBgTimer), n.Util.falseFn(u.offsetWidth);
      var a = n.DomUtil.getScaleString(r, i),
        f = u.style[o];
      u.style[o] = s ? f + " " + a : a + " " + f
    },
    _prepareTileBg: function() {
      var e = this._tilePane,
        t = this._tileBg;
      if (t && this._getLoadedTilesPercentage(t) > .5 && this._getLoadedTilesPercentage(e) < .5) {
        e.style.visibility = "hidden", e.empty = !0, this._stopLoadingImages(e);
        return
      }
      t || (t = this._tileBg = this._createPane("leaflet-tile-pane", this._mapPane), t.style.zIndex = 1), t.style[n.DomUtil.TRANSFORM] = "", t.style.visibility = "hidden", t.empty = !0, e.empty = !1, this._tilePane = this._panes.tilePane = t;
      var r = this._tileBg = e;
      n.DomUtil.addClass(r, "leaflet-zoom-animated"), this._stopLoadingImages(r)
    },
    _getLoadedTilesPercentage: function(e) {
      var t = e.getElementsByTagName("img"),
        n, r, i = 0;
      for (n = 0, r = t.length; n < r; n++) t[n].complete && i++;
      return i / r
    },
    _stopLoadingImages: function(e) {
      var t = Array.prototype.slice.call(e.getElementsByTagName("img")),
        r, i, s;
      for (r = 0, i = t.length; r < i; r++) s = t[r], s.complete || (s.onload = n.Util.falseFn, s.onerror = n.Util.falseFn, s.src = n.Util.emptyImageUrl, s.parentNode.removeChild(s))
    },
    _onZoomTransitionEnd: function() {
      this._restoreTileFront(), n.Util.falseFn(this._tileBg.offsetWidth), this._resetView(this._animateToCenter, this._animateToZoom, !0, !0), n.DomUtil.removeClass(this._mapPane, "leaflet-zoom-anim"), this._animatingZoom = !1, n.Draggable && (n.Draggable._disabled = !1)
    },
    _restoreTileFront: function() {
      this._tilePane.innerHTML = "", this._tilePane.style.visibility = "", this._tilePane.style.zIndex = 2, this._tileBg.style.zIndex = 1
    },
    _clearTileBg: function() {
      !this._animatingZoom && !this.touchZoom._zooming && (this._tileBg.innerHTML = "")
    }
  } : {}), n.Map.include({
    _defaultLocateOptions: {
      watch: !1,
      setView: !1,
      maxZoom: Infinity,
      timeout: 1e4,
      maximumAge: 0,
      enableHighAccuracy: !1
    },
    locate: function(e) {
      e = this._locationOptions = n.Util.extend(this._defaultLocateOptions, e);
      if (!navigator.geolocation) return this._handleGeolocationError({
        code: 0,
        message: "Geolocation not supported."
      }), this;
      var t = n.Util.bind(this._handleGeolocationResponse, this),
        r = n.Util.bind(this._handleGeolocationError, this);
      return e.watch ? this._locationWatchId = navigator.geolocation.watchPosition(t, r, e) : navigator.geolocation.getCurrentPosition(t, r, e), this
    },
    stopLocate: function() {
      return navigator.geolocation && navigator.geolocation.clearWatch(this._locationWatchId), this
    },
    _handleGeolocationError: function(e) {
      var t = e.code,
        n = e.message || (t === 1 ? "permission denied" : t === 2 ? "position unavailable" : "timeout");
      this._locationOptions.setView && !this._loaded && this.fitWorld(), this.fire("locationerror", {
        code: t,
        message: "Geolocation error: " + n + "."
      })
    },
    _handleGeolocationResponse: function(e) {
      var t = 180 * e.coords.accuracy / 4e7,
        r = t * 2,
        i = e.coords.latitude,
        s = e.coords.longitude,
        o = new n.LatLng(i, s),
        u = new n.LatLng(i - t, s - r),
        a = new n.LatLng(i + t, s + r),
        f = new n.LatLngBounds(u, a),
        l = this._locationOptions;
      if (l.setView) {
        var c = Math.min(this.getBoundsZoom(f), l.maxZoom);
        this.setView(o, c)
      }
      this.fire("locationfound", {
        latlng: o,
        bounds: f,
        accuracy: e.coords.accuracy
      })
    }
  })
})(this);
