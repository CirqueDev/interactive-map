import { defineComponent as ce, toRef as I, ref as x, computed as A, openBlock as T, createElementBlock as N, createElementVNode as b, withDirectives as Xe, toDisplayString as _, createCommentVNode as F, Fragment as R, renderList as pe, vModelSelect as ot, reactive as Be, onMounted as ke, onBeforeUnmount as st, createTextVNode as ge, normalizeClass as ut, vShow as lt, nextTick as dt, watch as we, resolveComponent as be, renderSlot as Ve, createBlock as Se, createVNode as Ue, Transition as mt, withCtx as Re, mergeProps as ct } from "vue";
function he() {
  function e(o, u = null) {
    if (!!o)
      try {
        const s = i(o, u), l = n(s);
        a(l);
      } catch (s) {
        console.warn("[useTracking] - ", s);
      }
  }
  function t(o, u = null) {
    if (!!o)
      try {
        const s = i(o, u), l = n(s);
        a(l);
      } catch (s) {
        console.warn("[useTracking] - ", s);
      }
  }
  function a(o) {
    if (!!o)
      if (window.dataLayer || (window.dataLayer = []), Array.isArray(o))
        for (let u = 0; u < o.length; u++)
          window.dataLayer.push(o[u]);
      else
        window.dataLayer.push(o);
  }
  function r(o, u = null) {
    if (!o)
      return;
    const s = Object.keys(o);
    for (let l = 0; l < s.length; ++l) {
      const m = s[l], d = o[m];
      switch (m) {
        case "ga4":
          t(d, u);
          break;
        case "gua":
          e(d, u);
          break;
      }
    }
  }
  function n(o) {
    if (typeof o != "string")
      return o;
    let u = o.replace(/\\n/g, "\\n").replace(/\\'/g, "\\'").replace(/\\"/g, '\\"').replace(/\\&/g, "\\&").replace(/\\r/g, "\\r").replace(/\\t/g, "\\t").replace(/\\b/g, "\\b").replace(/\\f/g, "\\f");
    return u = u.replace(/[\u0000-\u0019]+/g, ""), JSON.parse(u);
  }
  function i(o, u = null) {
    return u ? Object.keys(u).reduce((l, m) => l.replaceAll(m, u[m]), o) : o;
  }
  return {
    pushDatalayer: a,
    pushTracking: r,
    pushGua: e,
    pushGa4: t
  };
}
const fe = (e, t) => {
  const a = e.__vccOpts || e;
  for (const [r, n] of t)
    a[r] = n;
  return a;
}, ht = ce({
  name: "DropdownFilters",
  emits: ["onfilterchange"],
  props: {
    placeholder: { type: String, required: !1, default: "" },
    filters: { type: Array, required: !1, default: () => [] },
    labelDefault: { type: String, required: !1, default: "All shows" },
    tracking: { type: Object, required: !1, default: null }
  },
  setup(e, { emit: t }) {
    const a = I(e, "filters"), r = x(e.placeholder ? "" : "all"), n = (l) => {
      r.value = l, t("onfilterchange", r.value);
    }, i = () => {
      r.value = "", t("onfilterchange", r.value);
    }, o = A(
      () => a.value.filter((l) => !!l.value)
    ), { pushTracking: u } = he();
    return {
      filtersWithoutEmptyValue: o,
      currentFilter: r,
      resetFilter: i,
      filter: n,
      trackClick: () => {
        u(e.tracking?.clickShowToggle);
      }
    };
  }
}), ft = { class: "dropdown-filters" }, gt = { class: "dropdown-filters__input" }, vt = {
  key: 0,
  value: "",
  selected: "",
  disabled: ""
}, pt = { value: "all" }, wt = ["value"], bt = /* @__PURE__ */ b("svg", {
  class: "dropdown-filters__arrow-down",
  width: "14",
  height: "9",
  viewBox: "0 0 14 9",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ b("path", {
    d: "M1 1L7.10049 7.10049L13.201 1",
    stroke: "black",
    "stroke-width": "2"
  })
], -1);
function yt(e, t, a, r, n, i) {
  return T(), N("div", ft, [
    b("div", gt, [
      Xe(b("select", {
        name: "dropdown-filters__select",
        class: "dropdown-filters__select",
        onChange: t[0] || (t[0] = (o) => e.filter(o.target.value)),
        onClick: t[1] || (t[1] = (o) => e.trackClick()),
        "onUpdate:modelValue": t[2] || (t[2] = (o) => e.currentFilter = o)
      }, [
        e.placeholder ? (T(), N("option", vt, _(e.placeholder), 1)) : F("", !0),
        b("option", pt, _(e.labelDefault), 1),
        (T(!0), N(R, null, pe(e.filtersWithoutEmptyValue, (o, u) => (T(), N("option", {
          key: u,
          value: o.value
        }, _(o.label || o.value), 9, wt))), 128))
      ], 544), [
        [ot, e.currentFilter]
      ]),
      bt
    ])
  ]);
}
const Mt = /* @__PURE__ */ fe(ht, [["render", yt]]);
function j(e) {
  if (e === null || e === !0 || e === !1)
    return NaN;
  var t = Number(e);
  return isNaN(t) ? t : t < 0 ? Math.ceil(t) : Math.floor(t);
}
function $(e, t) {
  if (t.length < e)
    throw new TypeError(e + " argument" + (e > 1 ? "s" : "") + " required, but only " + t.length + " present");
}
function O(e) {
  $(1, arguments);
  var t = Object.prototype.toString.call(e);
  return e instanceof Date || typeof e == "object" && t === "[object Date]" ? new Date(e.getTime()) : typeof e == "number" || t === "[object Number]" ? new Date(e) : ((typeof e == "string" || t === "[object String]") && typeof console < "u" && (console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"), console.warn(new Error().stack)), new Date(NaN));
}
function Pt(e, t) {
  $(2, arguments);
  var a = O(e), r = j(t);
  return isNaN(r) ? new Date(NaN) : (r && a.setDate(a.getDate() + r), a);
}
function Te(e, t) {
  $(2, arguments);
  var a = O(e), r = j(t);
  if (isNaN(r))
    return new Date(NaN);
  if (!r)
    return a;
  var n = a.getDate(), i = new Date(a.getTime());
  i.setMonth(a.getMonth() + r + 1, 0);
  var o = i.getDate();
  return n >= o ? i : (a.setFullYear(i.getFullYear(), i.getMonth(), n), a);
}
function kt(e, t) {
  $(2, arguments);
  var a = O(e).getTime(), r = j(t);
  return new Date(a + r);
}
function Dt(e, t) {
  $(1, arguments);
  var a = t || {}, r = a.locale, n = r && r.options && r.options.weekStartsOn, i = n == null ? 0 : j(n), o = a.weekStartsOn == null ? i : j(a.weekStartsOn);
  if (!(o >= 0 && o <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  var u = O(e), s = u.getDay(), l = (s < o ? 7 : 0) + s - o;
  return u.setDate(u.getDate() - l), u.setHours(0, 0, 0, 0), u;
}
function $t(e) {
  var t = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
  return t.setUTCFullYear(e.getFullYear()), e.getTime() - t.getTime();
}
function Ct(e, t) {
  var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    inclusive: !1
  };
  $(2, arguments);
  var r = e || {}, n = t || {}, i = O(r.start).getTime(), o = O(r.end).getTime(), u = O(n.start).getTime(), s = O(n.end).getTime();
  if (!(i <= o && u <= s))
    throw new RangeError("Invalid interval");
  return a.inclusive ? i <= s && u <= o : i < s && u < o;
}
function Wt(e) {
  return $(1, arguments), e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function St(e) {
  if ($(1, arguments), !Wt(e) && typeof e != "number")
    return !1;
  var t = O(e);
  return !isNaN(Number(t));
}
function Tt(e) {
  $(1, arguments);
  var t = O(e), a = t.getMonth();
  return t.setFullYear(t.getFullYear(), a + 1, 0), t.setHours(23, 59, 59, 999), t;
}
function Ot(e) {
  $(1, arguments);
  var t = O(e);
  return t.setDate(1), t.setHours(0, 0, 0, 0), t;
}
var Nt = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
}, xt = function(e, t, a) {
  var r, n = Nt[e];
  return typeof n == "string" ? r = n : t === 1 ? r = n.one : r = n.other.replace("{{count}}", t.toString()), a != null && a.addSuffix ? a.comparison && a.comparison > 0 ? "in " + r : r + " ago" : r;
};
const Et = xt;
function y(e) {
  return function() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, a = t.width ? String(t.width) : e.defaultWidth, r = e.formats[a] || e.formats[e.defaultWidth];
    return r;
  };
}
var jt = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, Lt = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, zt = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, _t = {
  date: y({
    formats: jt,
    defaultWidth: "full"
  }),
  time: y({
    formats: Lt,
    defaultWidth: "full"
  }),
  dateTime: y({
    formats: zt,
    defaultWidth: "full"
  })
};
const At = _t;
var Ft = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, It = function(e, t, a, r) {
  return Ft[e];
};
const Je = It;
function f(e) {
  return function(t, a) {
    var r = a || {}, n = r.context ? String(r.context) : "standalone", i;
    if (n === "formatting" && e.formattingValues) {
      var o = e.defaultFormattingWidth || e.defaultWidth, u = r.width ? String(r.width) : o;
      i = e.formattingValues[u] || e.formattingValues[o];
    } else {
      var s = e.defaultWidth, l = r.width ? String(r.width) : e.defaultWidth;
      i = e.values[l] || e.values[s];
    }
    var m = e.argumentCallback ? e.argumentCallback(t) : t;
    return i[m];
  };
}
var qt = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, Ht = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, Gt = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
}, Yt = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
}, Xt = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
}, Bt = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
}, Vt = function(e, t) {
  var a = Number(e), r = a % 100;
  if (r > 20 || r < 10)
    switch (r % 10) {
      case 1:
        return a + "st";
      case 2:
        return a + "nd";
      case 3:
        return a + "rd";
    }
  return a + "th";
}, Ut = {
  ordinalNumber: Vt,
  era: f({
    values: qt,
    defaultWidth: "wide"
  }),
  quarter: f({
    values: Ht,
    defaultWidth: "wide",
    argumentCallback: function(e) {
      return e - 1;
    }
  }),
  month: f({
    values: Gt,
    defaultWidth: "wide"
  }),
  day: f({
    values: Yt,
    defaultWidth: "wide"
  }),
  dayPeriod: f({
    values: Xt,
    defaultWidth: "wide",
    formattingValues: Bt,
    defaultFormattingWidth: "wide"
  })
};
const Qe = Ut;
function g(e) {
  return function(t) {
    var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = a.width, n = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], i = t.match(n);
    if (!i)
      return null;
    var o = i[0], u = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], s = Array.isArray(u) ? Jt(u, function(d) {
      return d.test(o);
    }) : Rt(u, function(d) {
      return d.test(o);
    }), l;
    l = e.valueCallback ? e.valueCallback(s) : s, l = a.valueCallback ? a.valueCallback(l) : l;
    var m = t.slice(o.length);
    return {
      value: l,
      rest: m
    };
  };
}
function Rt(e, t) {
  for (var a in e)
    if (e.hasOwnProperty(a) && t(e[a]))
      return a;
}
function Jt(e, t) {
  for (var a = 0; a < e.length; a++)
    if (t(e[a]))
      return a;
}
function q(e) {
  return function(t) {
    var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = t.match(e.matchPattern);
    if (!r)
      return null;
    var n = r[0], i = t.match(e.parsePattern);
    if (!i)
      return null;
    var o = e.valueCallback ? e.valueCallback(i[0]) : i[0];
    o = a.valueCallback ? a.valueCallback(o) : o;
    var u = t.slice(n.length);
    return {
      value: o,
      rest: u
    };
  };
}
var Qt = /^(\d+)(th|st|nd|rd)?/i, Zt = /\d+/i, Kt = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, ea = {
  any: [/^b/i, /^(a|c)/i]
}, ta = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, aa = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, ra = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, na = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
}, ia = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, oa = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, sa = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, ua = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
}, la = {
  ordinalNumber: q({
    matchPattern: Qt,
    parsePattern: Zt,
    valueCallback: function(e) {
      return parseInt(e, 10);
    }
  }),
  era: g({
    matchPatterns: Kt,
    defaultMatchWidth: "wide",
    parsePatterns: ea,
    defaultParseWidth: "any"
  }),
  quarter: g({
    matchPatterns: ta,
    defaultMatchWidth: "wide",
    parsePatterns: aa,
    defaultParseWidth: "any",
    valueCallback: function(e) {
      return e + 1;
    }
  }),
  month: g({
    matchPatterns: ra,
    defaultMatchWidth: "wide",
    parsePatterns: na,
    defaultParseWidth: "any"
  }),
  day: g({
    matchPatterns: ia,
    defaultMatchWidth: "wide",
    parsePatterns: oa,
    defaultParseWidth: "any"
  }),
  dayPeriod: g({
    matchPatterns: sa,
    defaultMatchWidth: "any",
    parsePatterns: ua,
    defaultParseWidth: "any"
  })
};
const Ze = la;
var da = {
  code: "en-US",
  formatDistance: Et,
  formatLong: At,
  formatRelative: Je,
  localize: Qe,
  match: Ze,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
const ma = da;
function ca(e, t) {
  $(2, arguments);
  var a = j(t);
  return kt(e, -a);
}
var ha = 864e5;
function fa(e) {
  $(1, arguments);
  var t = O(e), a = t.getTime();
  t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
  var r = t.getTime(), n = a - r;
  return Math.floor(n / ha) + 1;
}
function ue(e) {
  $(1, arguments);
  var t = 1, a = O(e), r = a.getUTCDay(), n = (r < t ? 7 : 0) + r - t;
  return a.setUTCDate(a.getUTCDate() - n), a.setUTCHours(0, 0, 0, 0), a;
}
function Ke(e) {
  $(1, arguments);
  var t = O(e), a = t.getUTCFullYear(), r = new Date(0);
  r.setUTCFullYear(a + 1, 0, 4), r.setUTCHours(0, 0, 0, 0);
  var n = ue(r), i = new Date(0);
  i.setUTCFullYear(a, 0, 4), i.setUTCHours(0, 0, 0, 0);
  var o = ue(i);
  return t.getTime() >= n.getTime() ? a + 1 : t.getTime() >= o.getTime() ? a : a - 1;
}
function ga(e) {
  $(1, arguments);
  var t = Ke(e), a = new Date(0);
  a.setUTCFullYear(t, 0, 4), a.setUTCHours(0, 0, 0, 0);
  var r = ue(a);
  return r;
}
var va = 6048e5;
function pa(e) {
  $(1, arguments);
  var t = O(e), a = ue(t).getTime() - ga(t).getTime();
  return Math.round(a / va) + 1;
}
function Q(e, t) {
  $(1, arguments);
  var a = t || {}, r = a.locale, n = r && r.options && r.options.weekStartsOn, i = n == null ? 0 : j(n), o = a.weekStartsOn == null ? i : j(a.weekStartsOn);
  if (!(o >= 0 && o <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  var u = O(e), s = u.getUTCDay(), l = (s < o ? 7 : 0) + s - o;
  return u.setUTCDate(u.getUTCDate() - l), u.setUTCHours(0, 0, 0, 0), u;
}
function et(e, t) {
  $(1, arguments);
  var a = O(e), r = a.getUTCFullYear(), n = t || {}, i = n.locale, o = i && i.options && i.options.firstWeekContainsDate, u = o == null ? 1 : j(o), s = n.firstWeekContainsDate == null ? u : j(n.firstWeekContainsDate);
  if (!(s >= 1 && s <= 7))
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  var l = new Date(0);
  l.setUTCFullYear(r + 1, 0, s), l.setUTCHours(0, 0, 0, 0);
  var m = Q(l, t), d = new Date(0);
  d.setUTCFullYear(r, 0, s), d.setUTCHours(0, 0, 0, 0);
  var h = Q(d, t);
  return a.getTime() >= m.getTime() ? r + 1 : a.getTime() >= h.getTime() ? r : r - 1;
}
function wa(e, t) {
  $(1, arguments);
  var a = t || {}, r = a.locale, n = r && r.options && r.options.firstWeekContainsDate, i = n == null ? 1 : j(n), o = a.firstWeekContainsDate == null ? i : j(a.firstWeekContainsDate), u = et(e, t), s = new Date(0);
  s.setUTCFullYear(u, 0, o), s.setUTCHours(0, 0, 0, 0);
  var l = Q(s, t);
  return l;
}
var ba = 6048e5;
function ya(e, t) {
  $(1, arguments);
  var a = O(e), r = Q(a, t).getTime() - wa(a, t).getTime();
  return Math.round(r / ba) + 1;
}
function P(e, t) {
  for (var a = e < 0 ? "-" : "", r = Math.abs(e).toString(); r.length < t; )
    r = "0" + r;
  return a + r;
}
var Ma = {
  y: function(e, t) {
    var a = e.getUTCFullYear(), r = a > 0 ? a : 1 - a;
    return P(t === "yy" ? r % 100 : r, t.length);
  },
  M: function(e, t) {
    var a = e.getUTCMonth();
    return t === "M" ? String(a + 1) : P(a + 1, 2);
  },
  d: function(e, t) {
    return P(e.getUTCDate(), t.length);
  },
  a: function(e, t) {
    var a = e.getUTCHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return a.toUpperCase();
      case "aaa":
        return a;
      case "aaaaa":
        return a[0];
      case "aaaa":
      default:
        return a === "am" ? "a.m." : "p.m.";
    }
  },
  h: function(e, t) {
    return P(e.getUTCHours() % 12 || 12, t.length);
  },
  H: function(e, t) {
    return P(e.getUTCHours(), t.length);
  },
  m: function(e, t) {
    return P(e.getUTCMinutes(), t.length);
  },
  s: function(e, t) {
    return P(e.getUTCSeconds(), t.length);
  },
  S: function(e, t) {
    var a = t.length, r = e.getUTCMilliseconds(), n = Math.floor(r * Math.pow(10, a - 3));
    return P(n, t.length);
  }
};
const G = Ma;
var V = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, Pa = {
  G: function(e, t, a) {
    var r = e.getUTCFullYear() > 0 ? 1 : 0;
    switch (t) {
      case "G":
      case "GG":
      case "GGG":
        return a.era(r, {
          width: "abbreviated"
        });
      case "GGGGG":
        return a.era(r, {
          width: "narrow"
        });
      case "GGGG":
      default:
        return a.era(r, {
          width: "wide"
        });
    }
  },
  y: function(e, t, a) {
    if (t === "yo") {
      var r = e.getUTCFullYear(), n = r > 0 ? r : 1 - r;
      return a.ordinalNumber(n, {
        unit: "year"
      });
    }
    return G.y(e, t);
  },
  Y: function(e, t, a, r) {
    var n = et(e, r), i = n > 0 ? n : 1 - n;
    if (t === "YY") {
      var o = i % 100;
      return P(o, 2);
    }
    return t === "Yo" ? a.ordinalNumber(i, {
      unit: "year"
    }) : P(i, t.length);
  },
  R: function(e, t) {
    var a = Ke(e);
    return P(a, t.length);
  },
  u: function(e, t) {
    var a = e.getUTCFullYear();
    return P(a, t.length);
  },
  Q: function(e, t, a) {
    var r = Math.ceil((e.getUTCMonth() + 1) / 3);
    switch (t) {
      case "Q":
        return String(r);
      case "QQ":
        return P(r, 2);
      case "Qo":
        return a.ordinalNumber(r, {
          unit: "quarter"
        });
      case "QQQ":
        return a.quarter(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "QQQQQ":
        return a.quarter(r, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return a.quarter(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  q: function(e, t, a) {
    var r = Math.ceil((e.getUTCMonth() + 1) / 3);
    switch (t) {
      case "q":
        return String(r);
      case "qq":
        return P(r, 2);
      case "qo":
        return a.ordinalNumber(r, {
          unit: "quarter"
        });
      case "qqq":
        return a.quarter(r, {
          width: "abbreviated",
          context: "standalone"
        });
      case "qqqqq":
        return a.quarter(r, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return a.quarter(r, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  M: function(e, t, a) {
    var r = e.getUTCMonth();
    switch (t) {
      case "M":
      case "MM":
        return G.M(e, t);
      case "Mo":
        return a.ordinalNumber(r + 1, {
          unit: "month"
        });
      case "MMM":
        return a.month(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "MMMMM":
        return a.month(r, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return a.month(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  L: function(e, t, a) {
    var r = e.getUTCMonth();
    switch (t) {
      case "L":
        return String(r + 1);
      case "LL":
        return P(r + 1, 2);
      case "Lo":
        return a.ordinalNumber(r + 1, {
          unit: "month"
        });
      case "LLL":
        return a.month(r, {
          width: "abbreviated",
          context: "standalone"
        });
      case "LLLLL":
        return a.month(r, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return a.month(r, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  w: function(e, t, a, r) {
    var n = ya(e, r);
    return t === "wo" ? a.ordinalNumber(n, {
      unit: "week"
    }) : P(n, t.length);
  },
  I: function(e, t, a) {
    var r = pa(e);
    return t === "Io" ? a.ordinalNumber(r, {
      unit: "week"
    }) : P(r, t.length);
  },
  d: function(e, t, a) {
    return t === "do" ? a.ordinalNumber(e.getUTCDate(), {
      unit: "date"
    }) : G.d(e, t);
  },
  D: function(e, t, a) {
    var r = fa(e);
    return t === "Do" ? a.ordinalNumber(r, {
      unit: "dayOfYear"
    }) : P(r, t.length);
  },
  E: function(e, t, a) {
    var r = e.getUTCDay();
    switch (t) {
      case "E":
      case "EE":
      case "EEE":
        return a.day(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "EEEEE":
        return a.day(r, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return a.day(r, {
          width: "short",
          context: "formatting"
        });
      case "EEEE":
      default:
        return a.day(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  e: function(e, t, a, r) {
    var n = e.getUTCDay(), i = (n - r.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      case "e":
        return String(i);
      case "ee":
        return P(i, 2);
      case "eo":
        return a.ordinalNumber(i, {
          unit: "day"
        });
      case "eee":
        return a.day(n, {
          width: "abbreviated",
          context: "formatting"
        });
      case "eeeee":
        return a.day(n, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return a.day(n, {
          width: "short",
          context: "formatting"
        });
      case "eeee":
      default:
        return a.day(n, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  c: function(e, t, a, r) {
    var n = e.getUTCDay(), i = (n - r.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      case "c":
        return String(i);
      case "cc":
        return P(i, t.length);
      case "co":
        return a.ordinalNumber(i, {
          unit: "day"
        });
      case "ccc":
        return a.day(n, {
          width: "abbreviated",
          context: "standalone"
        });
      case "ccccc":
        return a.day(n, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return a.day(n, {
          width: "short",
          context: "standalone"
        });
      case "cccc":
      default:
        return a.day(n, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  i: function(e, t, a) {
    var r = e.getUTCDay(), n = r === 0 ? 7 : r;
    switch (t) {
      case "i":
        return String(n);
      case "ii":
        return P(n, t.length);
      case "io":
        return a.ordinalNumber(n, {
          unit: "day"
        });
      case "iii":
        return a.day(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "iiiii":
        return a.day(r, {
          width: "narrow",
          context: "formatting"
        });
      case "iiiiii":
        return a.day(r, {
          width: "short",
          context: "formatting"
        });
      case "iiii":
      default:
        return a.day(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  a: function(e, t, a) {
    var r = e.getUTCHours(), n = r / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return a.dayPeriod(n, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return a.dayPeriod(n, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return a.dayPeriod(n, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return a.dayPeriod(n, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  b: function(e, t, a) {
    var r = e.getUTCHours(), n;
    switch (r === 12 ? n = V.noon : r === 0 ? n = V.midnight : n = r / 12 >= 1 ? "pm" : "am", t) {
      case "b":
      case "bb":
        return a.dayPeriod(n, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return a.dayPeriod(n, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return a.dayPeriod(n, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return a.dayPeriod(n, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  B: function(e, t, a) {
    var r = e.getUTCHours(), n;
    switch (r >= 17 ? n = V.evening : r >= 12 ? n = V.afternoon : r >= 4 ? n = V.morning : n = V.night, t) {
      case "B":
      case "BB":
      case "BBB":
        return a.dayPeriod(n, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return a.dayPeriod(n, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return a.dayPeriod(n, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  h: function(e, t, a) {
    if (t === "ho") {
      var r = e.getUTCHours() % 12;
      return r === 0 && (r = 12), a.ordinalNumber(r, {
        unit: "hour"
      });
    }
    return G.h(e, t);
  },
  H: function(e, t, a) {
    return t === "Ho" ? a.ordinalNumber(e.getUTCHours(), {
      unit: "hour"
    }) : G.H(e, t);
  },
  K: function(e, t, a) {
    var r = e.getUTCHours() % 12;
    return t === "Ko" ? a.ordinalNumber(r, {
      unit: "hour"
    }) : P(r, t.length);
  },
  k: function(e, t, a) {
    var r = e.getUTCHours();
    return r === 0 && (r = 24), t === "ko" ? a.ordinalNumber(r, {
      unit: "hour"
    }) : P(r, t.length);
  },
  m: function(e, t, a) {
    return t === "mo" ? a.ordinalNumber(e.getUTCMinutes(), {
      unit: "minute"
    }) : G.m(e, t);
  },
  s: function(e, t, a) {
    return t === "so" ? a.ordinalNumber(e.getUTCSeconds(), {
      unit: "second"
    }) : G.s(e, t);
  },
  S: function(e, t) {
    return G.S(e, t);
  },
  X: function(e, t, a, r) {
    var n = r._originalDate || e, i = n.getTimezoneOffset();
    if (i === 0)
      return "Z";
    switch (t) {
      case "X":
        return Ne(i);
      case "XXXX":
      case "XX":
        return Y(i);
      case "XXXXX":
      case "XXX":
      default:
        return Y(i, ":");
    }
  },
  x: function(e, t, a, r) {
    var n = r._originalDate || e, i = n.getTimezoneOffset();
    switch (t) {
      case "x":
        return Ne(i);
      case "xxxx":
      case "xx":
        return Y(i);
      case "xxxxx":
      case "xxx":
      default:
        return Y(i, ":");
    }
  },
  O: function(e, t, a, r) {
    var n = r._originalDate || e, i = n.getTimezoneOffset();
    switch (t) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + Oe(i, ":");
      case "OOOO":
      default:
        return "GMT" + Y(i, ":");
    }
  },
  z: function(e, t, a, r) {
    var n = r._originalDate || e, i = n.getTimezoneOffset();
    switch (t) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + Oe(i, ":");
      case "zzzz":
      default:
        return "GMT" + Y(i, ":");
    }
  },
  t: function(e, t, a, r) {
    var n = r._originalDate || e, i = Math.floor(n.getTime() / 1e3);
    return P(i, t.length);
  },
  T: function(e, t, a, r) {
    var n = r._originalDate || e, i = n.getTime();
    return P(i, t.length);
  }
};
function Oe(e, t) {
  var a = e > 0 ? "-" : "+", r = Math.abs(e), n = Math.floor(r / 60), i = r % 60;
  if (i === 0)
    return a + String(n);
  var o = t || "";
  return a + String(n) + o + P(i, 2);
}
function Ne(e, t) {
  if (e % 60 === 0) {
    var a = e > 0 ? "-" : "+";
    return a + P(Math.abs(e) / 60, 2);
  }
  return Y(e, t);
}
function Y(e, t) {
  var a = t || "", r = e > 0 ? "-" : "+", n = Math.abs(e), i = P(Math.floor(n / 60), 2), o = P(n % 60, 2);
  return r + i + a + o;
}
const ka = Pa;
function xe(e, t) {
  switch (e) {
    case "P":
      return t.date({
        width: "short"
      });
    case "PP":
      return t.date({
        width: "medium"
      });
    case "PPP":
      return t.date({
        width: "long"
      });
    case "PPPP":
    default:
      return t.date({
        width: "full"
      });
  }
}
function tt(e, t) {
  switch (e) {
    case "p":
      return t.time({
        width: "short"
      });
    case "pp":
      return t.time({
        width: "medium"
      });
    case "ppp":
      return t.time({
        width: "long"
      });
    case "pppp":
    default:
      return t.time({
        width: "full"
      });
  }
}
function Da(e, t) {
  var a = e.match(/(P+)(p+)?/) || [], r = a[1], n = a[2];
  if (!n)
    return xe(e, t);
  var i;
  switch (r) {
    case "P":
      i = t.dateTime({
        width: "short"
      });
      break;
    case "PP":
      i = t.dateTime({
        width: "medium"
      });
      break;
    case "PPP":
      i = t.dateTime({
        width: "long"
      });
      break;
    case "PPPP":
    default:
      i = t.dateTime({
        width: "full"
      });
      break;
  }
  return i.replace("{{date}}", xe(r, t)).replace("{{time}}", tt(n, t));
}
var $a = {
  p: tt,
  P: Da
};
const Ca = $a;
var Wa = ["D", "DD"], Sa = ["YY", "YYYY"];
function Ta(e) {
  return Wa.indexOf(e) !== -1;
}
function Oa(e) {
  return Sa.indexOf(e) !== -1;
}
function Ee(e, t, a) {
  if (e === "YYYY")
    throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(t, "`) for formatting years to the input `").concat(a, "`; see: https://git.io/fxCyr"));
  if (e === "YY")
    throw new RangeError("Use `yy` instead of `YY` (in `".concat(t, "`) for formatting years to the input `").concat(a, "`; see: https://git.io/fxCyr"));
  if (e === "D")
    throw new RangeError("Use `d` instead of `D` (in `".concat(t, "`) for formatting days of the month to the input `").concat(a, "`; see: https://git.io/fxCyr"));
  if (e === "DD")
    throw new RangeError("Use `dd` instead of `DD` (in `".concat(t, "`) for formatting days of the month to the input `").concat(a, "`; see: https://git.io/fxCyr"));
}
var Na = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, xa = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Ea = /^'([^]*?)'?$/, ja = /''/g, La = /[a-zA-Z]/;
function H(e, t, a) {
  $(2, arguments);
  var r = String(t), n = a || {}, i = n.locale || ma, o = i.options && i.options.firstWeekContainsDate, u = o == null ? 1 : j(o), s = n.firstWeekContainsDate == null ? u : j(n.firstWeekContainsDate);
  if (!(s >= 1 && s <= 7))
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  var l = i.options && i.options.weekStartsOn, m = l == null ? 0 : j(l), d = n.weekStartsOn == null ? m : j(n.weekStartsOn);
  if (!(d >= 0 && d <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  if (!i.localize)
    throw new RangeError("locale must contain localize property");
  if (!i.formatLong)
    throw new RangeError("locale must contain formatLong property");
  var h = O(e);
  if (!St(h))
    throw new RangeError("Invalid time value");
  var M = $t(h), w = ca(h, M), v = {
    firstWeekContainsDate: s,
    weekStartsOn: d,
    locale: i,
    _originalDate: h
  }, p = r.match(xa).map(function(k) {
    var W = k[0];
    if (W === "p" || W === "P") {
      var z = Ca[W];
      return z(k, i.formatLong, v);
    }
    return k;
  }).join("").match(Na).map(function(k) {
    if (k === "''")
      return "'";
    var W = k[0];
    if (W === "'")
      return za(k);
    var z = ka[W];
    if (z)
      return !n.useAdditionalWeekYearTokens && Oa(k) && Ee(k, t, e), !n.useAdditionalDayOfYearTokens && Ta(k) && Ee(k, t, e), z(w, k, i.localize, v);
    if (W.match(La))
      throw new RangeError("Format string contains an unescaped latin alphabet character `" + W + "`");
    return k;
  }).join("");
  return p;
}
function za(e) {
  return e.match(Ea)[1].replace(ja, "'");
}
function je(e) {
  $(1, arguments);
  var t = O(e), a = t.getDay();
  return a;
}
function _a(e) {
  $(1, arguments);
  var t = O(e), a = t.getFullYear(), r = t.getMonth(), n = new Date(0);
  return n.setFullYear(a, r + 1, 0), n.setHours(0, 0, 0, 0), n.getDate();
}
function le(e, t, a) {
  $(2, arguments);
  var r = Q(e, a), n = Q(t, a);
  return r.getTime() === n.getTime();
}
var U = {
  lessThanXSeconds: {
    one: "menys d'un segon",
    eleven: "menys d'onze segons",
    other: "menys de {{count}} segons"
  },
  xSeconds: {
    one: "1 segon",
    other: "{{count}} segons"
  },
  halfAMinute: "mig minut",
  lessThanXMinutes: {
    one: "menys d'un minut",
    eleven: "menys d'onze minuts",
    other: "menys de {{count}} minuts"
  },
  xMinutes: {
    one: "1 minut",
    other: "{{count}} minuts"
  },
  aboutXHours: {
    one: "aproximadament una hora",
    other: "aproximadament {{count}} hores"
  },
  xHours: {
    one: "1 hora",
    other: "{{count}} hores"
  },
  xDays: {
    one: "1 dia",
    other: "{{count}} dies"
  },
  aboutXWeeks: {
    one: "aproximadament una setmana",
    other: "aproximadament {{count}} setmanes"
  },
  xWeeks: {
    one: "1 setmana",
    other: "{{count}} setmanes"
  },
  aboutXMonths: {
    one: "aproximadament un mes",
    other: "aproximadament {{count}} mesos"
  },
  xMonths: {
    one: "1 mes",
    other: "{{count}} mesos"
  },
  aboutXYears: {
    one: "aproximadament un any",
    other: "aproximadament {{count}} anys"
  },
  xYears: {
    one: "1 any",
    other: "{{count}} anys"
  },
  overXYears: {
    one: "m\xE9s d'un any",
    eleven: "m\xE9s d'onze anys",
    other: "m\xE9s de {{count}} anys"
  },
  almostXYears: {
    one: "gaireb\xE9 un any",
    other: "gaireb\xE9 {{count}} anys"
  }
};
function Aa(e, t, a) {
  a = a || {};
  var r;
  return typeof U[e] == "string" ? r = U[e] : t === 1 ? r = U[e].one : t === 11 && U[e].eleven ? r = U[e].eleven : r = U[e].other.replace("{{count}}", t), a.addSuffix ? a.comparison > 0 ? "en " + r : "fa " + r : r;
}
var Fa = {
  full: "EEEE, d 'de' MMMM y",
  long: "d 'de' MMMM y",
  medium: "d MMM y",
  short: "dd/MM/y"
}, Ia = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
}, qa = {
  full: "{{date}} 'a les' {{time}}",
  long: "{{date}} 'a les' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Ha = {
  date: y({
    formats: Fa,
    defaultWidth: "full"
  }),
  time: y({
    formats: Ia,
    defaultWidth: "full"
  }),
  dateTime: y({
    formats: qa,
    defaultWidth: "full"
  })
};
const Ga = Ha;
var Ya = {
  lastWeek: "'el' eeee 'passat a la' LT",
  yesterday: "'ahir a la' p",
  today: "'avui a la' p",
  tomorrow: "'dem\xE0 a la' p",
  nextWeek: "eeee 'a la' p",
  other: "P"
}, Xa = {
  lastWeek: "'el' eeee 'passat a les' p",
  yesterday: "'ahir a les' p",
  today: "'avui a les' p",
  tomorrow: "'dem\xE0 a les' p",
  nextWeek: "eeee 'a les' p",
  other: "P"
};
function Ba(e, t, a, r) {
  return t.getUTCHours() !== 1 ? Xa[e] : Ya[e];
}
var Va = {
  narrow: ["aC", "dC"],
  abbreviated: ["a. de C.", "d. de C."],
  wide: ["abans de Crist", "despr\xE9s de Crist"]
}, Ua = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["T1", "T2", "T3", "T4"],
  wide: ["1r trimestre", "2n trimestre", "3r trimestre", "4t trimestre"]
}, Ra = {
  narrow: ["GN", "FB", "M\xC7", "AB", "MG", "JN", "JL", "AG", "ST", "OC", "NV", "DS"],
  abbreviated: ["gen.", "febr.", "mar\xE7", "abr.", "maig", "juny", "jul.", "ag.", "set.", "oct.", "nov.", "des."],
  wide: ["gener", "febrer", "mar\xE7", "abril", "maig", "juny", "juliol", "agost", "setembre", "octubre", "novembre", "desembre"]
}, Ja = {
  narrow: ["dg.", "dl.", "dt.", "dm.", "dj.", "dv.", "ds."],
  short: ["dg.", "dl.", "dt.", "dm.", "dj.", "dv.", "ds."],
  abbreviated: ["dg.", "dl.", "dt.", "dm.", "dj.", "dv.", "ds."],
  wide: ["diumenge", "dilluns", "dimarts", "dimecres", "dijous", "divendres", "dissabte"]
}, Qa = {
  narrow: {
    am: "am",
    pm: "pm",
    midnight: "mitjanit",
    noon: "migdia",
    morning: "mat\xED",
    afternoon: "tarda",
    evening: "vespre",
    night: "nit"
  },
  abbreviated: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "mitjanit",
    noon: "migdia",
    morning: "mat\xED",
    afternoon: "tarda",
    evening: "vespre",
    night: "nit"
  },
  wide: {
    am: "ante meridiem",
    pm: "post meridiem",
    midnight: "mitjanit",
    noon: "migdia",
    morning: "mat\xED",
    afternoon: "tarda",
    evening: "vespre",
    night: "nit"
  }
}, Za = {
  narrow: {
    am: "am",
    pm: "pm",
    midnight: "de la mitjanit",
    noon: "del migdia",
    morning: "del mat\xED",
    afternoon: "de la tarda",
    evening: "del vespre",
    night: "de la nit"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "de la mitjanit",
    noon: "del migdia",
    morning: "del mat\xED",
    afternoon: "de la tarda",
    evening: "del vespre",
    night: "de la nit"
  },
  wide: {
    am: "ante meridiem",
    pm: "post meridiem",
    midnight: "de la mitjanit",
    noon: "del migdia",
    morning: "del mat\xED",
    afternoon: "de la tarda",
    evening: "del vespre",
    night: "de la nit"
  }
};
function Ka(e, t) {
  var a = Number(e), r = a % 100;
  if (r > 20 || r < 10)
    switch (r % 10) {
      case 1:
        return a + "r";
      case 2:
        return a + "n";
      case 3:
        return a + "r";
      case 4:
        return a + "t";
    }
  return a + "\xE8";
}
var er = {
  ordinalNumber: Ka,
  era: f({
    values: Va,
    defaultWidth: "wide"
  }),
  quarter: f({
    values: Ua,
    defaultWidth: "wide",
    argumentCallback: function(e) {
      return Number(e) - 1;
    }
  }),
  month: f({
    values: Ra,
    defaultWidth: "wide"
  }),
  day: f({
    values: Ja,
    defaultWidth: "wide"
  }),
  dayPeriod: f({
    values: Qa,
    defaultWidth: "wide",
    formattingValues: Za,
    defaultFormattingWidth: "wide"
  })
};
const tr = er;
var ar = /^(\d+)(è|r|n|r|t)?/i, rr = /\d+/i, nr = {
  narrow: /^(aC|dC)/i,
  abbreviated: /^(a. de C.|d. de C.)/i,
  wide: /^(abans de Crist|despr[eé]s de Crist)/i
}, ir = {
  narrow: [/^aC/i, /^dC/i],
  abbreviated: [/^(a. de C.)/i, /^(d. de C.)/i],
  wide: [/^(abans de Crist)/i, /^(despr[eé]s de Crist)/i]
}, or = {
  narrow: /^[1234]/i,
  abbreviated: /^T[1234]/i,
  wide: /^[1234](è|r|n|r|t)? trimestre/i
}, sr = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, ur = {
  narrow: /^(GN|FB|MÇ|AB|MG|JN|JL|AG|ST|OC|NV|DS)/i,
  abbreviated: /^(gen.|febr.|març|abr.|maig|juny|jul.|ag.|set.|oct.|nov.|des.)/i,
  wide: /^(gener|febrer|març|abril|maig|juny|juliol|agost|setembre|octubre|novembre|desembre)/i
}, lr = {
  narrow: [/^GN/i, /^FB/i, /^MÇ/i, /^AB/i, /^MG/i, /^JN/i, /^JL/i, /^AG/i, /^ST/i, /^OC/i, /^NV/i, /^DS/i],
  abbreviated: [/^gen./i, /^febr./i, /^març/i, /^abr./i, /^maig/i, /^juny/i, /^jul./i, /^ag./i, /^set./i, /^oct./i, /^nov./i, /^des./i],
  wide: [/^gener/i, /^febrer/i, /^març/i, /^abril/i, /^maig/i, /^juny/i, /^juliol/i, /^agost/i, /^setembre/i, /^octubre/i, /^novembre/i, /^desembre/i]
}, dr = {
  narrow: /^(dg\.|dl\.|dt\.|dm\.|dj\.|dv\.|ds\.)/i,
  short: /^(dg\.|dl\.|dt\.|dm\.|dj\.|dv\.|ds\.)/i,
  abbreviated: /^(dg\.|dl\.|dt\.|dm\.|dj\.|dv\.|ds\.)/i,
  wide: /^(diumenge|dilluns|dimarts|dimecres|dijous|divendres|dissabte)/i
}, mr = {
  narrow: [/^dg./i, /^dl./i, /^dt./i, /^dm./i, /^dj./i, /^dv./i, /^ds./i],
  abbreviated: [/^dg./i, /^dl./i, /^dt./i, /^dm./i, /^dj./i, /^dv./i, /^ds./i],
  wide: [/^diumenge/i, /^dilluns/i, /^dimarts/i, /^dimecres/i, /^dijous/i, /^divendres/i, /^disssabte/i]
}, cr = {
  narrow: /^(a|p|mn|md|(del|de la) (matí|tarda|vespre|nit))/i,
  abbreviated: /^([ap]\.?\s?m\.?|mitjanit|migdia|(del|de la) (matí|tarda|vespre|nit))/i,
  wide: /^(ante meridiem|post meridiem|mitjanit|migdia|(del|de la) (matí|tarda|vespre|nit))/i
}, hr = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mitjanit/i,
    noon: /^migdia/i,
    morning: /matí/i,
    afternoon: /tarda/i,
    evening: /vespre/i,
    night: /nit/i
  }
}, fr = {
  ordinalNumber: q({
    matchPattern: ar,
    parsePattern: rr,
    valueCallback: function(e) {
      return parseInt(e, 10);
    }
  }),
  era: g({
    matchPatterns: nr,
    defaultMatchWidth: "wide",
    parsePatterns: ir,
    defaultParseWidth: "any"
  }),
  quarter: g({
    matchPatterns: or,
    defaultMatchWidth: "wide",
    parsePatterns: sr,
    defaultParseWidth: "any",
    valueCallback: function(e) {
      return e + 1;
    }
  }),
  month: g({
    matchPatterns: ur,
    defaultMatchWidth: "wide",
    parsePatterns: lr,
    defaultParseWidth: "any"
  }),
  day: g({
    matchPatterns: dr,
    defaultMatchWidth: "wide",
    parsePatterns: mr,
    defaultParseWidth: "any"
  }),
  dayPeriod: g({
    matchPatterns: cr,
    defaultMatchWidth: "any",
    parsePatterns: hr,
    defaultParseWidth: "any"
  })
};
const gr = fr;
var vr = {
  code: "ca",
  formatDistance: Aa,
  formatLong: Ga,
  formatRelative: Ba,
  localize: tr,
  match: gr,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
const pr = vr;
var ne = {
  lessThanXSeconds: {
    one: "mindre end \xE9t sekund",
    other: "mindre end {{count}} sekunder"
  },
  xSeconds: {
    one: "1 sekund",
    other: "{{count}} sekunder"
  },
  halfAMinute: "\xE9t halvt minut",
  lessThanXMinutes: {
    one: "mindre end \xE9t minut",
    other: "mindre end {{count}} minutter"
  },
  xMinutes: {
    one: "1 minut",
    other: "{{count}} minutter"
  },
  aboutXHours: {
    one: "cirka 1 time",
    other: "cirka {{count}} timer"
  },
  xHours: {
    one: "1 time",
    other: "{{count}} timer"
  },
  xDays: {
    one: "1 dag",
    other: "{{count}} dage"
  },
  aboutXWeeks: {
    one: "cirka 1 uge",
    other: "cirka {{count}} uger"
  },
  xWeeks: {
    one: "1 uge",
    other: "{{count}} uger"
  },
  aboutXMonths: {
    one: "cirka 1 m\xE5ned",
    other: "cirka {{count}} m\xE5neder"
  },
  xMonths: {
    one: "1 m\xE5ned",
    other: "{{count}} m\xE5neder"
  },
  aboutXYears: {
    one: "cirka 1 \xE5r",
    other: "cirka {{count}} \xE5r"
  },
  xYears: {
    one: "1 \xE5r",
    other: "{{count}} \xE5r"
  },
  overXYears: {
    one: "over 1 \xE5r",
    other: "over {{count}} \xE5r"
  },
  almostXYears: {
    one: "n\xE6sten 1 \xE5r",
    other: "n\xE6sten {{count}} \xE5r"
  }
};
function wr(e, t, a) {
  a = a || {};
  var r;
  return typeof ne[e] == "string" ? r = ne[e] : t === 1 ? r = ne[e].one : r = ne[e].other.replace("{{count}}", t), a.addSuffix ? a.comparison > 0 ? "om " + r : r + " siden" : r;
}
var br = {
  full: "EEEE 'den' d. MMMM y",
  long: "d. MMMM y",
  medium: "d. MMM y",
  short: "dd/MM/y"
}, yr = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
}, Mr = {
  full: "{{date}} 'kl'. {{time}}",
  long: "{{date}} 'kl'. {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
}, Pr = {
  date: y({
    formats: br,
    defaultWidth: "full"
  }),
  time: y({
    formats: yr,
    defaultWidth: "full"
  }),
  dateTime: y({
    formats: Mr,
    defaultWidth: "full"
  })
};
const kr = Pr;
var Dr = {
  lastWeek: "'sidste' eeee 'kl.' p",
  yesterday: "'i g\xE5r kl.' p",
  today: "'i dag kl.' p",
  tomorrow: "'i morgen kl.' p",
  nextWeek: "'p\xE5' eeee 'kl.' p",
  other: "P"
};
function $r(e, t, a, r) {
  return Dr[e];
}
var Cr = {
  narrow: ["fvt", "vt"],
  abbreviated: ["f.v.t.", "v.t."],
  wide: ["f\xF8r vesterlandsk tidsregning", "vesterlandsk tidsregning"]
}, Wr = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["1. kvt.", "2. kvt.", "3. kvt.", "4. kvt."],
  wide: ["1. kvartal", "2. kvartal", "3. kvartal", "4. kvartal"]
}, Sr = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["jan.", "feb.", "mar.", "apr.", "maj", "jun.", "jul.", "aug.", "sep.", "okt.", "nov.", "dec."],
  wide: ["januar", "februar", "marts", "april", "maj", "juni", "juli", "august", "september", "oktober", "november", "december"]
}, Tr = {
  narrow: ["S", "M", "T", "O", "T", "F", "L"],
  short: ["s\xF8", "ma", "ti", "on", "to", "fr", "l\xF8"],
  abbreviated: ["s\xF8n.", "man.", "tir.", "ons.", "tor.", "fre.", "l\xF8r."],
  wide: ["s\xF8ndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "l\xF8rdag"]
}, Or = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "midnat",
    noon: "middag",
    morning: "morgen",
    afternoon: "eftermiddag",
    evening: "aften",
    night: "nat"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnat",
    noon: "middag",
    morning: "morgen",
    afternoon: "eftermiddag",
    evening: "aften",
    night: "nat"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnat",
    noon: "middag",
    morning: "morgen",
    afternoon: "eftermiddag",
    evening: "aften",
    night: "nat"
  }
}, Nr = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "midnat",
    noon: "middag",
    morning: "om morgenen",
    afternoon: "om eftermiddagen",
    evening: "om aftenen",
    night: "om natten"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnat",
    noon: "middag",
    morning: "om morgenen",
    afternoon: "om eftermiddagen",
    evening: "om aftenen",
    night: "om natten"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnat",
    noon: "middag",
    morning: "om morgenen",
    afternoon: "om eftermiddagen",
    evening: "om aftenen",
    night: "om natten"
  }
};
function xr(e) {
  var t = Number(e);
  return t + ".";
}
var Er = {
  ordinalNumber: xr,
  era: f({
    values: Cr,
    defaultWidth: "wide"
  }),
  quarter: f({
    values: Wr,
    defaultWidth: "wide",
    argumentCallback: function(e) {
      return Number(e) - 1;
    }
  }),
  month: f({
    values: Sr,
    defaultWidth: "wide"
  }),
  day: f({
    values: Tr,
    defaultWidth: "wide"
  }),
  dayPeriod: f({
    values: Or,
    defaultWidth: "wide",
    formattingValues: Nr,
    defaultFormattingWidth: "wide"
  })
};
const jr = Er;
var Lr = /^(\d+)(\.)?/i, zr = /\d+/i, _r = {
  narrow: /^(fKr|fvt|eKr|vt)/i,
  abbreviated: /^(f\.Kr\.?|f\.v\.t\.?|e\.Kr\.?|v\.t\.)/i,
  wide: /^(f.Kr.|før vesterlandsk tidsregning|e.Kr.|vesterlandsk tidsregning)/i
}, Ar = {
  any: [/^f/i, /^(v|e)/i]
}, Fr = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234]. kvt\./i,
  wide: /^[1234]\.? kvartal/i
}, Ir = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, qr = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan.|feb.|mar.|apr.|maj|jun.|jul.|aug.|sep.|okt.|nov.|dec.)/i,
  wide: /^(januar|februar|marts|april|maj|juni|juli|august|september|oktober|november|december)/i
}, Hr = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^maj/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
}, Gr = {
  narrow: /^[smtofl]/i,
  short: /^(søn.|man.|tir.|ons.|tor.|fre.|lør.)/i,
  abbreviated: /^(søn|man|tir|ons|tor|fre|lør)/i,
  wide: /^(søndag|mandag|tirsdag|onsdag|torsdag|fredag|lørdag)/i
}, Yr = {
  narrow: [/^s/i, /^m/i, /^t/i, /^o/i, /^t/i, /^f/i, /^l/i],
  any: [/^s/i, /^m/i, /^ti/i, /^o/i, /^to/i, /^f/i, /^l/i]
}, Xr = {
  narrow: /^(a|p|midnat|middag|(om) (morgenen|eftermiddagen|aftenen|natten))/i,
  any: /^([ap]\.?\s?m\.?|midnat|middag|(om) (morgenen|eftermiddagen|aftenen|natten))/i
}, Br = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /midnat/i,
    noon: /middag/i,
    morning: /morgen/i,
    afternoon: /eftermiddag/i,
    evening: /aften/i,
    night: /nat/i
  }
}, Vr = {
  ordinalNumber: q({
    matchPattern: Lr,
    parsePattern: zr,
    valueCallback: function(e) {
      return parseInt(e, 10);
    }
  }),
  era: g({
    matchPatterns: _r,
    defaultMatchWidth: "wide",
    parsePatterns: Ar,
    defaultParseWidth: "any"
  }),
  quarter: g({
    matchPatterns: Fr,
    defaultMatchWidth: "wide",
    parsePatterns: Ir,
    defaultParseWidth: "any",
    valueCallback: function(e) {
      return e + 1;
    }
  }),
  month: g({
    matchPatterns: qr,
    defaultMatchWidth: "wide",
    parsePatterns: Hr,
    defaultParseWidth: "any"
  }),
  day: g({
    matchPatterns: Gr,
    defaultMatchWidth: "wide",
    parsePatterns: Yr,
    defaultParseWidth: "any"
  }),
  dayPeriod: g({
    matchPatterns: Xr,
    defaultMatchWidth: "any",
    parsePatterns: Br,
    defaultParseWidth: "any"
  })
};
const Ur = Vr;
var Rr = {
  code: "da",
  formatDistance: wr,
  formatLong: kr,
  formatRelative: $r,
  localize: jr,
  match: Ur,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
const Jr = Rr;
var Le = {
  lessThanXSeconds: {
    standalone: {
      one: "weniger als 1 Sekunde",
      other: "weniger als {{count}} Sekunden"
    },
    withPreposition: {
      one: "weniger als 1 Sekunde",
      other: "weniger als {{count}} Sekunden"
    }
  },
  xSeconds: {
    standalone: {
      one: "1 Sekunde",
      other: "{{count}} Sekunden"
    },
    withPreposition: {
      one: "1 Sekunde",
      other: "{{count}} Sekunden"
    }
  },
  halfAMinute: {
    standalone: "halbe Minute",
    withPreposition: "halben Minute"
  },
  lessThanXMinutes: {
    standalone: {
      one: "weniger als 1 Minute",
      other: "weniger als {{count}} Minuten"
    },
    withPreposition: {
      one: "weniger als 1 Minute",
      other: "weniger als {{count}} Minuten"
    }
  },
  xMinutes: {
    standalone: {
      one: "1 Minute",
      other: "{{count}} Minuten"
    },
    withPreposition: {
      one: "1 Minute",
      other: "{{count}} Minuten"
    }
  },
  aboutXHours: {
    standalone: {
      one: "etwa 1 Stunde",
      other: "etwa {{count}} Stunden"
    },
    withPreposition: {
      one: "etwa 1 Stunde",
      other: "etwa {{count}} Stunden"
    }
  },
  xHours: {
    standalone: {
      one: "1 Stunde",
      other: "{{count}} Stunden"
    },
    withPreposition: {
      one: "1 Stunde",
      other: "{{count}} Stunden"
    }
  },
  xDays: {
    standalone: {
      one: "1 Tag",
      other: "{{count}} Tage"
    },
    withPreposition: {
      one: "1 Tag",
      other: "{{count}} Tagen"
    }
  },
  aboutXWeeks: {
    standalone: {
      one: "etwa 1 Woche",
      other: "etwa {{count}} Wochen"
    },
    withPreposition: {
      one: "etwa 1 Woche",
      other: "etwa {{count}} Wochen"
    }
  },
  xWeeks: {
    standalone: {
      one: "1 Woche",
      other: "{{count}} Wochen"
    },
    withPreposition: {
      one: "1 Woche",
      other: "{{count}} Wochen"
    }
  },
  aboutXMonths: {
    standalone: {
      one: "etwa 1 Monat",
      other: "etwa {{count}} Monate"
    },
    withPreposition: {
      one: "etwa 1 Monat",
      other: "etwa {{count}} Monaten"
    }
  },
  xMonths: {
    standalone: {
      one: "1 Monat",
      other: "{{count}} Monate"
    },
    withPreposition: {
      one: "1 Monat",
      other: "{{count}} Monaten"
    }
  },
  aboutXYears: {
    standalone: {
      one: "etwa 1 Jahr",
      other: "etwa {{count}} Jahre"
    },
    withPreposition: {
      one: "etwa 1 Jahr",
      other: "etwa {{count}} Jahren"
    }
  },
  xYears: {
    standalone: {
      one: "1 Jahr",
      other: "{{count}} Jahre"
    },
    withPreposition: {
      one: "1 Jahr",
      other: "{{count}} Jahren"
    }
  },
  overXYears: {
    standalone: {
      one: "mehr als 1 Jahr",
      other: "mehr als {{count}} Jahre"
    },
    withPreposition: {
      one: "mehr als 1 Jahr",
      other: "mehr als {{count}} Jahren"
    }
  },
  almostXYears: {
    standalone: {
      one: "fast 1 Jahr",
      other: "fast {{count}} Jahre"
    },
    withPreposition: {
      one: "fast 1 Jahr",
      other: "fast {{count}} Jahren"
    }
  }
}, Qr = function(e, t, a) {
  var r, n = a != null && a.addSuffix ? Le[e].withPreposition : Le[e].standalone;
  return typeof n == "string" ? r = n : t === 1 ? r = n.one : r = n.other.replace("{{count}}", String(t)), a != null && a.addSuffix ? a.comparison && a.comparison > 0 ? "in " + r : "vor " + r : r;
};
const Zr = Qr;
var Kr = {
  full: "EEEE, do MMMM y",
  long: "do MMMM y",
  medium: "do MMM y",
  short: "dd.MM.y"
}, en = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
}, tn = {
  full: "{{date}} 'um' {{time}}",
  long: "{{date}} 'um' {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
}, an = {
  date: y({
    formats: Kr,
    defaultWidth: "full"
  }),
  time: y({
    formats: en,
    defaultWidth: "full"
  }),
  dateTime: y({
    formats: tn,
    defaultWidth: "full"
  })
};
const rn = an;
var nn = {
  lastWeek: "'letzten' eeee 'um' p",
  yesterday: "'gestern um' p",
  today: "'heute um' p",
  tomorrow: "'morgen um' p",
  nextWeek: "eeee 'um' p",
  other: "P"
}, on = function(e, t, a, r) {
  return nn[e];
};
const sn = on;
var un = {
  narrow: ["v.Chr.", "n.Chr."],
  abbreviated: ["v.Chr.", "n.Chr."],
  wide: ["vor Christus", "nach Christus"]
}, ln = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1. Quartal", "2. Quartal", "3. Quartal", "4. Quartal"]
}, ye = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["Jan", "Feb", "M\xE4r", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
  wide: ["Januar", "Februar", "M\xE4rz", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]
}, dn = {
  narrow: ye.narrow,
  abbreviated: ["Jan.", "Feb.", "M\xE4rz", "Apr.", "Mai", "Juni", "Juli", "Aug.", "Sep.", "Okt.", "Nov.", "Dez."],
  wide: ye.wide
}, mn = {
  narrow: ["S", "M", "D", "M", "D", "F", "S"],
  short: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
  abbreviated: ["So.", "Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."],
  wide: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]
}, cn = {
  narrow: {
    am: "vm.",
    pm: "nm.",
    midnight: "Mitternacht",
    noon: "Mittag",
    morning: "Morgen",
    afternoon: "Nachm.",
    evening: "Abend",
    night: "Nacht"
  },
  abbreviated: {
    am: "vorm.",
    pm: "nachm.",
    midnight: "Mitternacht",
    noon: "Mittag",
    morning: "Morgen",
    afternoon: "Nachmittag",
    evening: "Abend",
    night: "Nacht"
  },
  wide: {
    am: "vormittags",
    pm: "nachmittags",
    midnight: "Mitternacht",
    noon: "Mittag",
    morning: "Morgen",
    afternoon: "Nachmittag",
    evening: "Abend",
    night: "Nacht"
  }
}, hn = {
  narrow: {
    am: "vm.",
    pm: "nm.",
    midnight: "Mitternacht",
    noon: "Mittag",
    morning: "morgens",
    afternoon: "nachm.",
    evening: "abends",
    night: "nachts"
  },
  abbreviated: {
    am: "vorm.",
    pm: "nachm.",
    midnight: "Mitternacht",
    noon: "Mittag",
    morning: "morgens",
    afternoon: "nachmittags",
    evening: "abends",
    night: "nachts"
  },
  wide: {
    am: "vormittags",
    pm: "nachmittags",
    midnight: "Mitternacht",
    noon: "Mittag",
    morning: "morgens",
    afternoon: "nachmittags",
    evening: "abends",
    night: "nachts"
  }
}, fn = function(e) {
  var t = Number(e);
  return t + ".";
}, gn = {
  ordinalNumber: fn,
  era: f({
    values: un,
    defaultWidth: "wide"
  }),
  quarter: f({
    values: ln,
    defaultWidth: "wide",
    argumentCallback: function(e) {
      return e - 1;
    }
  }),
  month: f({
    values: ye,
    formattingValues: dn,
    defaultWidth: "wide"
  }),
  day: f({
    values: mn,
    defaultWidth: "wide"
  }),
  dayPeriod: f({
    values: cn,
    defaultWidth: "wide",
    formattingValues: hn,
    defaultFormattingWidth: "wide"
  })
};
const vn = gn;
var pn = /^(\d+)(\.)?/i, wn = /\d+/i, bn = {
  narrow: /^(v\.? ?Chr\.?|n\.? ?Chr\.?)/i,
  abbreviated: /^(v\.? ?Chr\.?|n\.? ?Chr\.?)/i,
  wide: /^(vor Christus|vor unserer Zeitrechnung|nach Christus|unserer Zeitrechnung)/i
}, yn = {
  any: [/^v/i, /^n/i]
}, Mn = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](\.)? Quartal/i
}, Pn = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, kn = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(j[aä]n|feb|mär[z]?|apr|mai|jun[i]?|jul[i]?|aug|sep|okt|nov|dez)\.?/i,
  wide: /^(januar|februar|märz|april|mai|juni|juli|august|september|oktober|november|dezember)/i
}, Dn = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^j[aä]/i, /^f/i, /^mär/i, /^ap/i, /^mai/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
}, $n = {
  narrow: /^[smdmf]/i,
  short: /^(so|mo|di|mi|do|fr|sa)/i,
  abbreviated: /^(son?|mon?|die?|mit?|don?|fre?|sam?)\.?/i,
  wide: /^(sonntag|montag|dienstag|mittwoch|donnerstag|freitag|samstag)/i
}, Cn = {
  any: [/^so/i, /^mo/i, /^di/i, /^mi/i, /^do/i, /^f/i, /^sa/i]
}, Wn = {
  narrow: /^(vm\.?|nm\.?|Mitternacht|Mittag|morgens|nachm\.?|abends|nachts)/i,
  abbreviated: /^(vorm\.?|nachm\.?|Mitternacht|Mittag|morgens|nachm\.?|abends|nachts)/i,
  wide: /^(vormittags|nachmittags|Mitternacht|Mittag|morgens|nachmittags|abends|nachts)/i
}, Sn = {
  any: {
    am: /^v/i,
    pm: /^n/i,
    midnight: /^Mitte/i,
    noon: /^Mitta/i,
    morning: /morgens/i,
    afternoon: /nachmittags/i,
    evening: /abends/i,
    night: /nachts/i
  }
}, Tn = {
  ordinalNumber: q({
    matchPattern: pn,
    parsePattern: wn,
    valueCallback: function(e) {
      return parseInt(e);
    }
  }),
  era: g({
    matchPatterns: bn,
    defaultMatchWidth: "wide",
    parsePatterns: yn,
    defaultParseWidth: "any"
  }),
  quarter: g({
    matchPatterns: Mn,
    defaultMatchWidth: "wide",
    parsePatterns: Pn,
    defaultParseWidth: "any",
    valueCallback: function(e) {
      return e + 1;
    }
  }),
  month: g({
    matchPatterns: kn,
    defaultMatchWidth: "wide",
    parsePatterns: Dn,
    defaultParseWidth: "any"
  }),
  day: g({
    matchPatterns: $n,
    defaultMatchWidth: "wide",
    parsePatterns: Cn,
    defaultParseWidth: "any"
  }),
  dayPeriod: g({
    matchPatterns: Wn,
    defaultMatchWidth: "wide",
    parsePatterns: Sn,
    defaultParseWidth: "any"
  })
};
const On = Tn;
var Nn = {
  code: "de",
  formatDistance: Zr,
  formatLong: rn,
  formatRelative: sn,
  localize: vn,
  match: On,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
const xn = Nn;
var En = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "a second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "a minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about an hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "an hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "a day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about a week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "a week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about a month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "a month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about a year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "a year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over a year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost a year",
    other: "almost {{count}} years"
  }
}, jn = function(e, t, a) {
  var r, n = En[e];
  return typeof n == "string" ? r = n : t === 1 ? r = n.one : r = n.other.replace("{{count}}", t.toString()), a != null && a.addSuffix ? a.comparison && a.comparison > 0 ? "in " + r : r + " ago" : r;
};
const Ln = jn;
var zn = {
  full: "EEEE, MMMM do, yyyy",
  long: "MMMM do, yyyy",
  medium: "MMM d, yyyy",
  short: "yyyy-MM-dd"
}, _n = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, An = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Fn = {
  date: y({
    formats: zn,
    defaultWidth: "full"
  }),
  time: y({
    formats: _n,
    defaultWidth: "full"
  }),
  dateTime: y({
    formats: An,
    defaultWidth: "full"
  })
};
const In = Fn;
var qn = {
  code: "en-CA",
  formatDistance: Ln,
  formatLong: In,
  formatRelative: Je,
  localize: Qe,
  match: Ze,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
const Hn = qn;
var Gn = {
  lessThanXSeconds: {
    one: "menos de un segundo",
    other: "menos de {{count}} segundos"
  },
  xSeconds: {
    one: "1 segundo",
    other: "{{count}} segundos"
  },
  halfAMinute: "medio minuto",
  lessThanXMinutes: {
    one: "menos de un minuto",
    other: "menos de {{count}} minutos"
  },
  xMinutes: {
    one: "1 minuto",
    other: "{{count}} minutos"
  },
  aboutXHours: {
    one: "alrededor de 1 hora",
    other: "alrededor de {{count}} horas"
  },
  xHours: {
    one: "1 hora",
    other: "{{count}} horas"
  },
  xDays: {
    one: "1 d\xEDa",
    other: "{{count}} d\xEDas"
  },
  aboutXWeeks: {
    one: "alrededor de 1 semana",
    other: "alrededor de {{count}} semanas"
  },
  xWeeks: {
    one: "1 semana",
    other: "{{count}} semanas"
  },
  aboutXMonths: {
    one: "alrededor de 1 mes",
    other: "alrededor de {{count}} meses"
  },
  xMonths: {
    one: "1 mes",
    other: "{{count}} meses"
  },
  aboutXYears: {
    one: "alrededor de 1 a\xF1o",
    other: "alrededor de {{count}} a\xF1os"
  },
  xYears: {
    one: "1 a\xF1o",
    other: "{{count}} a\xF1os"
  },
  overXYears: {
    one: "m\xE1s de 1 a\xF1o",
    other: "m\xE1s de {{count}} a\xF1os"
  },
  almostXYears: {
    one: "casi 1 a\xF1o",
    other: "casi {{count}} a\xF1os"
  }
}, Yn = function(e, t, a) {
  var r, n = Gn[e];
  return typeof n == "string" ? r = n : t === 1 ? r = n.one : r = n.other.replace("{{count}}", t.toString()), a != null && a.addSuffix ? a.comparison && a.comparison > 0 ? "en " + r : "hace " + r : r;
};
const Xn = Yn;
var Bn = {
  full: "EEEE, d 'de' MMMM 'de' y",
  long: "d 'de' MMMM 'de' y",
  medium: "d MMM y",
  short: "dd/MM/y"
}, Vn = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
}, Un = {
  full: "{{date}} 'a las' {{time}}",
  long: "{{date}} 'a las' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Rn = {
  date: y({
    formats: Bn,
    defaultWidth: "full"
  }),
  time: y({
    formats: Vn,
    defaultWidth: "full"
  }),
  dateTime: y({
    formats: Un,
    defaultWidth: "full"
  })
};
const Jn = Rn;
var Qn = {
  lastWeek: "'el' eeee 'pasado a la' p",
  yesterday: "'ayer a la' p",
  today: "'hoy a la' p",
  tomorrow: "'ma\xF1ana a la' p",
  nextWeek: "eeee 'a la' p",
  other: "P"
}, Zn = {
  lastWeek: "'el' eeee 'pasado a las' p",
  yesterday: "'ayer a las' p",
  today: "'hoy a las' p",
  tomorrow: "'ma\xF1ana a las' p",
  nextWeek: "eeee 'a las' p",
  other: "P"
}, Kn = function(e, t, a, r) {
  return t.getUTCHours() !== 1 ? Zn[e] : Qn[e];
};
const ei = Kn;
var ti = {
  narrow: ["AC", "DC"],
  abbreviated: ["AC", "DC"],
  wide: ["antes de cristo", "despu\xE9s de cristo"]
}, ai = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["T1", "T2", "T3", "T4"],
  wide: ["1\xBA trimestre", "2\xBA trimestre", "3\xBA trimestre", "4\xBA trimestre"]
}, ri = {
  narrow: ["e", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"],
  abbreviated: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
  wide: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
}, ni = {
  narrow: ["d", "l", "m", "m", "j", "v", "s"],
  short: ["do", "lu", "ma", "mi", "ju", "vi", "s\xE1"],
  abbreviated: ["dom", "lun", "mar", "mi\xE9", "jue", "vie", "s\xE1b"],
  wide: ["domingo", "lunes", "martes", "mi\xE9rcoles", "jueves", "viernes", "s\xE1bado"]
}, ii = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mn",
    noon: "md",
    morning: "ma\xF1ana",
    afternoon: "tarde",
    evening: "tarde",
    night: "noche"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "medianoche",
    noon: "mediodia",
    morning: "ma\xF1ana",
    afternoon: "tarde",
    evening: "tarde",
    night: "noche"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "medianoche",
    noon: "mediodia",
    morning: "ma\xF1ana",
    afternoon: "tarde",
    evening: "tarde",
    night: "noche"
  }
}, oi = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mn",
    noon: "md",
    morning: "de la ma\xF1ana",
    afternoon: "de la tarde",
    evening: "de la tarde",
    night: "de la noche"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "medianoche",
    noon: "mediodia",
    morning: "de la ma\xF1ana",
    afternoon: "de la tarde",
    evening: "de la tarde",
    night: "de la noche"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "medianoche",
    noon: "mediodia",
    morning: "de la ma\xF1ana",
    afternoon: "de la tarde",
    evening: "de la tarde",
    night: "de la noche"
  }
}, si = function(e, t) {
  var a = Number(e);
  return a + "\xBA";
}, ui = {
  ordinalNumber: si,
  era: f({
    values: ti,
    defaultWidth: "wide"
  }),
  quarter: f({
    values: ai,
    defaultWidth: "wide",
    argumentCallback: function(e) {
      return Number(e) - 1;
    }
  }),
  month: f({
    values: ri,
    defaultWidth: "wide"
  }),
  day: f({
    values: ni,
    defaultWidth: "wide"
  }),
  dayPeriod: f({
    values: ii,
    defaultWidth: "wide",
    formattingValues: oi,
    defaultFormattingWidth: "wide"
  })
};
const li = ui;
var di = /^(\d+)(º)?/i, mi = /\d+/i, ci = {
  narrow: /^(ac|dc|a|d)/i,
  abbreviated: /^(a\.?\s?c\.?|a\.?\s?e\.?\s?c\.?|d\.?\s?c\.?|e\.?\s?c\.?)/i,
  wide: /^(antes de cristo|antes de la era com[uú]n|despu[eé]s de cristo|era com[uú]n)/i
}, hi = {
  any: [/^ac/i, /^dc/i],
  wide: [/^(antes de cristo|antes de la era com[uú]n)/i, /^(despu[eé]s de cristo|era com[uú]n)/i]
}, fi = {
  narrow: /^[1234]/i,
  abbreviated: /^T[1234]/i,
  wide: /^[1234](º)? trimestre/i
}, gi = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, vi = {
  narrow: /^[efmajsond]/i,
  abbreviated: /^(ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)/i,
  wide: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i
}, pi = {
  narrow: [/^e/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^en/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i]
}, wi = {
  narrow: /^[dlmjvs]/i,
  short: /^(do|lu|ma|mi|ju|vi|s[áa])/i,
  abbreviated: /^(dom|lun|mar|mi[ée]|jue|vie|s[áa]b)/i,
  wide: /^(domingo|lunes|martes|mi[ée]rcoles|jueves|viernes|s[áa]bado)/i
}, bi = {
  narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^j/i, /^v/i, /^s/i],
  any: [/^do/i, /^lu/i, /^ma/i, /^mi/i, /^ju/i, /^vi/i, /^sa/i]
}, yi = {
  narrow: /^(a|p|mn|md|(de la|a las) (mañana|tarde|noche))/i,
  any: /^([ap]\.?\s?m\.?|medianoche|mediodia|(de la|a las) (mañana|tarde|noche))/i
}, Mi = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mn/i,
    noon: /^md/i,
    morning: /mañana/i,
    afternoon: /tarde/i,
    evening: /tarde/i,
    night: /noche/i
  }
}, Pi = {
  ordinalNumber: q({
    matchPattern: di,
    parsePattern: mi,
    valueCallback: function(e) {
      return parseInt(e, 10);
    }
  }),
  era: g({
    matchPatterns: ci,
    defaultMatchWidth: "wide",
    parsePatterns: hi,
    defaultParseWidth: "any"
  }),
  quarter: g({
    matchPatterns: fi,
    defaultMatchWidth: "wide",
    parsePatterns: gi,
    defaultParseWidth: "any",
    valueCallback: function(e) {
      return e + 1;
    }
  }),
  month: g({
    matchPatterns: vi,
    defaultMatchWidth: "wide",
    parsePatterns: pi,
    defaultParseWidth: "any"
  }),
  day: g({
    matchPatterns: wi,
    defaultMatchWidth: "wide",
    parsePatterns: bi,
    defaultParseWidth: "any"
  }),
  dayPeriod: g({
    matchPatterns: yi,
    defaultMatchWidth: "any",
    parsePatterns: Mi,
    defaultParseWidth: "any"
  })
};
const ki = Pi;
var Di = {
  code: "es",
  formatDistance: Xn,
  formatLong: Jn,
  formatRelative: ei,
  localize: li,
  match: ki,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
};
const $i = Di;
var Ci = {
  lessThanXSeconds: {
    one: "moins d\u2019une seconde",
    other: "moins de {{count}} secondes"
  },
  xSeconds: {
    one: "1 seconde",
    other: "{{count}} secondes"
  },
  halfAMinute: "30 secondes",
  lessThanXMinutes: {
    one: "moins d\u2019une minute",
    other: "moins de {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "environ 1 heure",
    other: "environ {{count}} heures"
  },
  xHours: {
    one: "1 heure",
    other: "{{count}} heures"
  },
  xDays: {
    one: "1 jour",
    other: "{{count}} jours"
  },
  aboutXWeeks: {
    one: "environ 1 semaine",
    other: "environ {{count}} semaines"
  },
  xWeeks: {
    one: "1 semaine",
    other: "{{count}} semaines"
  },
  aboutXMonths: {
    one: "environ 1 mois",
    other: "environ {{count}} mois"
  },
  xMonths: {
    one: "1 mois",
    other: "{{count}} mois"
  },
  aboutXYears: {
    one: "environ 1 an",
    other: "environ {{count}} ans"
  },
  xYears: {
    one: "1 an",
    other: "{{count}} ans"
  },
  overXYears: {
    one: "plus d\u2019un an",
    other: "plus de {{count}} ans"
  },
  almostXYears: {
    one: "presqu\u2019un an",
    other: "presque {{count}} ans"
  }
}, Wi = function(e, t, a) {
  var r, n = Ci[e];
  return typeof n == "string" ? r = n : t === 1 ? r = n.one : r = n.other.replace("{{count}}", String(t)), a != null && a.addSuffix ? a.comparison && a.comparison > 0 ? "dans " + r : "il y a " + r : r;
};
const Si = Wi;
var Ti = {
  lastWeek: "eeee 'dernier \xE0' p",
  yesterday: "'hier \xE0' p",
  today: "'aujourd\u2019hui \xE0' p",
  tomorrow: "'demain \xE0' p'",
  nextWeek: "eeee 'prochain \xE0' p",
  other: "P"
}, Oi = function(e, t, a, r) {
  return Ti[e];
};
const Ni = Oi;
var xi = {
  narrow: ["av. J.-C", "ap. J.-C"],
  abbreviated: ["av. J.-C", "ap. J.-C"],
  wide: ["avant J\xE9sus-Christ", "apr\xE8s J\xE9sus-Christ"]
}, Ei = {
  narrow: ["T1", "T2", "T3", "T4"],
  abbreviated: ["1er trim.", "2\xE8me trim.", "3\xE8me trim.", "4\xE8me trim."],
  wide: ["1er trimestre", "2\xE8me trimestre", "3\xE8me trimestre", "4\xE8me trimestre"]
}, ji = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["janv.", "f\xE9vr.", "mars", "avr.", "mai", "juin", "juil.", "ao\xFBt", "sept.", "oct.", "nov.", "d\xE9c."],
  wide: ["janvier", "f\xE9vrier", "mars", "avril", "mai", "juin", "juillet", "ao\xFBt", "septembre", "octobre", "novembre", "d\xE9cembre"]
}, Li = {
  narrow: ["D", "L", "M", "M", "J", "V", "S"],
  short: ["di", "lu", "ma", "me", "je", "ve", "sa"],
  abbreviated: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
  wide: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"]
}, zi = {
  narrow: {
    am: "AM",
    pm: "PM",
    midnight: "minuit",
    noon: "midi",
    morning: "mat.",
    afternoon: "ap.m.",
    evening: "soir",
    night: "mat."
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "minuit",
    noon: "midi",
    morning: "matin",
    afternoon: "apr\xE8s-midi",
    evening: "soir",
    night: "matin"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "minuit",
    noon: "midi",
    morning: "du matin",
    afternoon: "de l\u2019apr\xE8s-midi",
    evening: "du soir",
    night: "du matin"
  }
}, _i = function(e, t) {
  var a = Number(e), r = t?.unit;
  if (a === 0)
    return "0";
  var n = ["year", "week", "hour", "minute", "second"], i;
  return a === 1 ? i = r && n.includes(r) ? "\xE8re" : "er" : i = "\xE8me", a + i;
}, Ai = {
  ordinalNumber: _i,
  era: f({
    values: xi,
    defaultWidth: "wide"
  }),
  quarter: f({
    values: Ei,
    defaultWidth: "wide",
    argumentCallback: function(e) {
      return e - 1;
    }
  }),
  month: f({
    values: ji,
    defaultWidth: "wide"
  }),
  day: f({
    values: Li,
    defaultWidth: "wide"
  }),
  dayPeriod: f({
    values: zi,
    defaultWidth: "wide"
  })
};
const Fi = Ai;
var Ii = /^(\d+)(ième|ère|ème|er|e)?/i, qi = /\d+/i, Hi = {
  narrow: /^(av\.J\.C|ap\.J\.C|ap\.J\.-C)/i,
  abbreviated: /^(av\.J\.-C|av\.J-C|apr\.J\.-C|apr\.J-C|ap\.J-C)/i,
  wide: /^(avant Jésus-Christ|après Jésus-Christ)/i
}, Gi = {
  any: [/^av/i, /^ap/i]
}, Yi = {
  narrow: /^T?[1234]/i,
  abbreviated: /^[1234](er|ème|e)? trim\.?/i,
  wide: /^[1234](er|ème|e)? trimestre/i
}, Xi = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Bi = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(janv|févr|mars|avr|mai|juin|juill|juil|août|sept|oct|nov|déc)\.?/i,
  wide: /^(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)/i
}, Vi = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^av/i, /^ma/i, /^juin/i, /^juil/i, /^ao/i, /^s/i, /^o/i, /^n/i, /^d/i]
}, Ui = {
  narrow: /^[lmjvsd]/i,
  short: /^(di|lu|ma|me|je|ve|sa)/i,
  abbreviated: /^(dim|lun|mar|mer|jeu|ven|sam)\.?/i,
  wide: /^(dimanche|lundi|mardi|mercredi|jeudi|vendredi|samedi)/i
}, Ri = {
  narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^j/i, /^v/i, /^s/i],
  any: [/^di/i, /^lu/i, /^ma/i, /^me/i, /^je/i, /^ve/i, /^sa/i]
}, Ji = {
  narrow: /^(a|p|minuit|midi|mat\.?|ap\.?m\.?|soir|nuit)/i,
  any: /^([ap]\.?\s?m\.?|du matin|de l'après[-\s]midi|du soir|de la nuit)/i
}, Qi = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^min/i,
    noon: /^mid/i,
    morning: /mat/i,
    afternoon: /ap/i,
    evening: /soir/i,
    night: /nuit/i
  }
}, Zi = {
  ordinalNumber: q({
    matchPattern: Ii,
    parsePattern: qi,
    valueCallback: function(e) {
      return parseInt(e);
    }
  }),
  era: g({
    matchPatterns: Hi,
    defaultMatchWidth: "wide",
    parsePatterns: Gi,
    defaultParseWidth: "any"
  }),
  quarter: g({
    matchPatterns: Yi,
    defaultMatchWidth: "wide",
    parsePatterns: Xi,
    defaultParseWidth: "any",
    valueCallback: function(e) {
      return e + 1;
    }
  }),
  month: g({
    matchPatterns: Bi,
    defaultMatchWidth: "wide",
    parsePatterns: Vi,
    defaultParseWidth: "any"
  }),
  day: g({
    matchPatterns: Ui,
    defaultMatchWidth: "wide",
    parsePatterns: Ri,
    defaultParseWidth: "any"
  }),
  dayPeriod: g({
    matchPatterns: Ji,
    defaultMatchWidth: "any",
    parsePatterns: Qi,
    defaultParseWidth: "any"
  })
};
const Ki = Zi;
var eo = {
  full: "EEEE d MMMM y",
  long: "d MMMM y",
  medium: "d MMM y",
  short: "yy-MM-dd"
}, to = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
}, ao = {
  full: "{{date}} '\xE0' {{time}}",
  long: "{{date}} '\xE0' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, ro = {
  date: y({
    formats: eo,
    defaultWidth: "full"
  }),
  time: y({
    formats: to,
    defaultWidth: "full"
  }),
  dateTime: y({
    formats: ao,
    defaultWidth: "full"
  })
};
const no = ro;
var io = {
  code: "fr-CA",
  formatDistance: Si,
  formatLong: no,
  formatRelative: Ni,
  localize: Fi,
  match: Ki,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
const oo = io;
var so = {
  lessThanXSeconds: {
    one: "meno di un secondo",
    other: "meno di {{count}} secondi"
  },
  xSeconds: {
    one: "un secondo",
    other: "{{count}} secondi"
  },
  halfAMinute: "alcuni secondi",
  lessThanXMinutes: {
    one: "meno di un minuto",
    other: "meno di {{count}} minuti"
  },
  xMinutes: {
    one: "un minuto",
    other: "{{count}} minuti"
  },
  aboutXHours: {
    one: "circa un'ora",
    other: "circa {{count}} ore"
  },
  xHours: {
    one: "un'ora",
    other: "{{count}} ore"
  },
  xDays: {
    one: "un giorno",
    other: "{{count}} giorni"
  },
  aboutXWeeks: {
    one: "circa una settimana",
    other: "circa {{count}} settimane"
  },
  xWeeks: {
    one: "una settimana",
    other: "{{count}} settimane"
  },
  aboutXMonths: {
    one: "circa un mese",
    other: "circa {{count}} mesi"
  },
  xMonths: {
    one: "un mese",
    other: "{{count}} mesi"
  },
  aboutXYears: {
    one: "circa un anno",
    other: "circa {{count}} anni"
  },
  xYears: {
    one: "un anno",
    other: "{{count}} anni"
  },
  overXYears: {
    one: "pi\xF9 di un anno",
    other: "pi\xF9 di {{count}} anni"
  },
  almostXYears: {
    one: "quasi un anno",
    other: "quasi {{count}} anni"
  }
}, uo = function(e, t, a) {
  var r, n = so[e];
  return typeof n == "string" ? r = n : t === 1 ? r = n.one : r = n.other.replace("{{count}}", t.toString()), a != null && a.addSuffix ? a.comparison && a.comparison > 0 ? "tra " + r : r + " fa" : r;
};
const lo = uo;
var mo = {
  full: "EEEE d MMMM y",
  long: "d MMMM y",
  medium: "d MMM y",
  short: "dd/MM/y"
}, co = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
}, ho = {
  full: "{{date}} {{time}}",
  long: "{{date}} {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
}, fo = {
  date: y({
    formats: mo,
    defaultWidth: "full"
  }),
  time: y({
    formats: co,
    defaultWidth: "full"
  }),
  dateTime: y({
    formats: ho,
    defaultWidth: "full"
  })
};
const go = fo;
var De = ["domenica", "luned\xEC", "marted\xEC", "mercoled\xEC", "gioved\xEC", "venerd\xEC", "sabato"];
function vo(e) {
  switch (e) {
    case 0:
      return "'domenica scorsa alle' p";
    default:
      return "'" + De[e] + " scorso alle' p";
  }
}
function ze(e) {
  return "'" + De[e] + " alle' p";
}
function po(e) {
  switch (e) {
    case 0:
      return "'domenica prossima alle' p";
    default:
      return "'" + De[e] + " prossimo alle' p";
  }
}
var wo = {
  lastWeek: function(e, t, a) {
    var r = e.getUTCDay();
    return le(e, t, a) ? ze(r) : vo(r);
  },
  yesterday: "'ieri alle' p",
  today: "'oggi alle' p",
  tomorrow: "'domani alle' p",
  nextWeek: function(e, t, a) {
    var r = e.getUTCDay();
    return le(e, t, a) ? ze(r) : po(r);
  },
  other: "P"
}, bo = function(e, t, a, r) {
  var n = wo[e];
  return typeof n == "function" ? n(t, a, r) : n;
};
const yo = bo;
var Mo = {
  narrow: ["aC", "dC"],
  abbreviated: ["a.C.", "d.C."],
  wide: ["avanti Cristo", "dopo Cristo"]
}, Po = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["T1", "T2", "T3", "T4"],
  wide: ["1\xBA trimestre", "2\xBA trimestre", "3\xBA trimestre", "4\xBA trimestre"]
}, ko = {
  narrow: ["G", "F", "M", "A", "M", "G", "L", "A", "S", "O", "N", "D"],
  abbreviated: ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"],
  wide: ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"]
}, Do = {
  narrow: ["D", "L", "M", "M", "G", "V", "S"],
  short: ["dom", "lun", "mar", "mer", "gio", "ven", "sab"],
  abbreviated: ["dom", "lun", "mar", "mer", "gio", "ven", "sab"],
  wide: ["domenica", "luned\xEC", "marted\xEC", "mercoled\xEC", "gioved\xEC", "venerd\xEC", "sabato"]
}, $o = {
  narrow: {
    am: "m.",
    pm: "p.",
    midnight: "mezzanotte",
    noon: "mezzogiorno",
    morning: "mattina",
    afternoon: "pomeriggio",
    evening: "sera",
    night: "notte"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "mezzanotte",
    noon: "mezzogiorno",
    morning: "mattina",
    afternoon: "pomeriggio",
    evening: "sera",
    night: "notte"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "mezzanotte",
    noon: "mezzogiorno",
    morning: "mattina",
    afternoon: "pomeriggio",
    evening: "sera",
    night: "notte"
  }
}, Co = {
  narrow: {
    am: "m.",
    pm: "p.",
    midnight: "mezzanotte",
    noon: "mezzogiorno",
    morning: "di mattina",
    afternoon: "del pomeriggio",
    evening: "di sera",
    night: "di notte"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "mezzanotte",
    noon: "mezzogiorno",
    morning: "di mattina",
    afternoon: "del pomeriggio",
    evening: "di sera",
    night: "di notte"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "mezzanotte",
    noon: "mezzogiorno",
    morning: "di mattina",
    afternoon: "del pomeriggio",
    evening: "di sera",
    night: "di notte"
  }
}, Wo = function(e, t) {
  var a = Number(e);
  return a + "\xBA";
}, So = {
  ordinalNumber: Wo,
  era: f({
    values: Mo,
    defaultWidth: "wide"
  }),
  quarter: f({
    values: Po,
    defaultWidth: "wide",
    argumentCallback: function(e) {
      return e - 1;
    }
  }),
  month: f({
    values: ko,
    defaultWidth: "wide"
  }),
  day: f({
    values: Do,
    defaultWidth: "wide"
  }),
  dayPeriod: f({
    values: $o,
    defaultWidth: "wide",
    formattingValues: Co,
    defaultFormattingWidth: "wide"
  })
};
const To = So;
var Oo = /^(\d+)(º)?/i, No = /\d+/i, xo = {
  narrow: /^(aC|dC)/i,
  abbreviated: /^(a\.?\s?C\.?|a\.?\s?e\.?\s?v\.?|d\.?\s?C\.?|e\.?\s?v\.?)/i,
  wide: /^(avanti Cristo|avanti Era Volgare|dopo Cristo|Era Volgare)/i
}, Eo = {
  any: [/^a/i, /^(d|e)/i]
}, jo = {
  narrow: /^[1234]/i,
  abbreviated: /^t[1234]/i,
  wide: /^[1234](º)? trimestre/i
}, Lo = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, zo = {
  narrow: /^[gfmalsond]/i,
  abbreviated: /^(gen|feb|mar|apr|mag|giu|lug|ago|set|ott|nov|dic)/i,
  wide: /^(gennaio|febbraio|marzo|aprile|maggio|giugno|luglio|agosto|settembre|ottobre|novembre|dicembre)/i
}, _o = {
  narrow: [/^g/i, /^f/i, /^m/i, /^a/i, /^m/i, /^g/i, /^l/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ge/i, /^f/i, /^mar/i, /^ap/i, /^mag/i, /^gi/i, /^l/i, /^ag/i, /^s/i, /^o/i, /^n/i, /^d/i]
}, Ao = {
  narrow: /^[dlmgvs]/i,
  short: /^(do|lu|ma|me|gi|ve|sa)/i,
  abbreviated: /^(dom|lun|mar|mer|gio|ven|sab)/i,
  wide: /^(domenica|luned[i|ì]|marted[i|ì]|mercoled[i|ì]|gioved[i|ì]|venerd[i|ì]|sabato)/i
}, Fo = {
  narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^g/i, /^v/i, /^s/i],
  any: [/^d/i, /^l/i, /^ma/i, /^me/i, /^g/i, /^v/i, /^s/i]
}, Io = {
  narrow: /^(a|m\.|p|mezzanotte|mezzogiorno|(di|del) (mattina|pomeriggio|sera|notte))/i,
  any: /^([ap]\.?\s?m\.?|mezzanotte|mezzogiorno|(di|del) (mattina|pomeriggio|sera|notte))/i
}, qo = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mezza/i,
    noon: /^mezzo/i,
    morning: /mattina/i,
    afternoon: /pomeriggio/i,
    evening: /sera/i,
    night: /notte/i
  }
}, Ho = {
  ordinalNumber: q({
    matchPattern: Oo,
    parsePattern: No,
    valueCallback: function(e) {
      return parseInt(e, 10);
    }
  }),
  era: g({
    matchPatterns: xo,
    defaultMatchWidth: "wide",
    parsePatterns: Eo,
    defaultParseWidth: "any"
  }),
  quarter: g({
    matchPatterns: jo,
    defaultMatchWidth: "wide",
    parsePatterns: Lo,
    defaultParseWidth: "any",
    valueCallback: function(e) {
      return e + 1;
    }
  }),
  month: g({
    matchPatterns: zo,
    defaultMatchWidth: "wide",
    parsePatterns: _o,
    defaultParseWidth: "any"
  }),
  day: g({
    matchPatterns: Ao,
    defaultMatchWidth: "wide",
    parsePatterns: Fo,
    defaultParseWidth: "any"
  }),
  dayPeriod: g({
    matchPatterns: Io,
    defaultMatchWidth: "any",
    parsePatterns: qo,
    defaultParseWidth: "any"
  })
};
const Go = Ho;
var Yo = {
  code: "it",
  formatDistance: lo,
  formatLong: go,
  formatRelative: yo,
  localize: To,
  match: Go,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
const Xo = Yo;
var Bo = {
  lessThanXSeconds: {
    one: "1\uCD08 \uBBF8\uB9CC",
    other: "{{count}}\uCD08 \uBBF8\uB9CC"
  },
  xSeconds: {
    one: "1\uCD08",
    other: "{{count}}\uCD08"
  },
  halfAMinute: "30\uCD08",
  lessThanXMinutes: {
    one: "1\uBD84 \uBBF8\uB9CC",
    other: "{{count}}\uBD84 \uBBF8\uB9CC"
  },
  xMinutes: {
    one: "1\uBD84",
    other: "{{count}}\uBD84"
  },
  aboutXHours: {
    one: "\uC57D 1\uC2DC\uAC04",
    other: "\uC57D {{count}}\uC2DC\uAC04"
  },
  xHours: {
    one: "1\uC2DC\uAC04",
    other: "{{count}}\uC2DC\uAC04"
  },
  xDays: {
    one: "1\uC77C",
    other: "{{count}}\uC77C"
  },
  aboutXWeeks: {
    one: "\uC57D 1\uC8FC",
    other: "\uC57D {{count}}\uC8FC"
  },
  xWeeks: {
    one: "1\uC8FC",
    other: "{{count}}\uC8FC"
  },
  aboutXMonths: {
    one: "\uC57D 1\uAC1C\uC6D4",
    other: "\uC57D {{count}}\uAC1C\uC6D4"
  },
  xMonths: {
    one: "1\uAC1C\uC6D4",
    other: "{{count}}\uAC1C\uC6D4"
  },
  aboutXYears: {
    one: "\uC57D 1\uB144",
    other: "\uC57D {{count}}\uB144"
  },
  xYears: {
    one: "1\uB144",
    other: "{{count}}\uB144"
  },
  overXYears: {
    one: "1\uB144 \uC774\uC0C1",
    other: "{{count}}\uB144 \uC774\uC0C1"
  },
  almostXYears: {
    one: "\uAC70\uC758 1\uB144",
    other: "\uAC70\uC758 {{count}}\uB144"
  }
}, Vo = function(e, t, a) {
  var r, n = Bo[e];
  return typeof n == "string" ? r = n : t === 1 ? r = n.one : r = n.other.replace("{{count}}", t.toString()), a != null && a.addSuffix ? a.comparison && a.comparison > 0 ? r + " \uD6C4" : r + " \uC804" : r;
};
const Uo = Vo;
var Ro = {
  full: "y\uB144 M\uC6D4 d\uC77C EEEE",
  long: "y\uB144 M\uC6D4 d\uC77C",
  medium: "y.MM.dd",
  short: "y.MM.dd"
}, Jo = {
  full: "a H\uC2DC mm\uBD84 ss\uCD08 zzzz",
  long: "a H:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
}, Qo = {
  full: "{{date}} {{time}}",
  long: "{{date}} {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
}, Zo = {
  date: y({
    formats: Ro,
    defaultWidth: "full"
  }),
  time: y({
    formats: Jo,
    defaultWidth: "full"
  }),
  dateTime: y({
    formats: Qo,
    defaultWidth: "full"
  })
};
const Ko = Zo;
var es = {
  lastWeek: "'\uC9C0\uB09C' eeee p",
  yesterday: "'\uC5B4\uC81C' p",
  today: "'\uC624\uB298' p",
  tomorrow: "'\uB0B4\uC77C' p",
  nextWeek: "'\uB2E4\uC74C' eeee p",
  other: "P"
}, ts = function(e, t, a, r) {
  return es[e];
};
const as = ts;
var rs = {
  narrow: ["BC", "AD"],
  abbreviated: ["BC", "AD"],
  wide: ["\uAE30\uC6D0\uC804", "\uC11C\uAE30"]
}, ns = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1\uBD84\uAE30", "2\uBD84\uAE30", "3\uBD84\uAE30", "4\uBD84\uAE30"]
}, is = {
  narrow: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
  abbreviated: ["1\uC6D4", "2\uC6D4", "3\uC6D4", "4\uC6D4", "5\uC6D4", "6\uC6D4", "7\uC6D4", "8\uC6D4", "9\uC6D4", "10\uC6D4", "11\uC6D4", "12\uC6D4"],
  wide: ["1\uC6D4", "2\uC6D4", "3\uC6D4", "4\uC6D4", "5\uC6D4", "6\uC6D4", "7\uC6D4", "8\uC6D4", "9\uC6D4", "10\uC6D4", "11\uC6D4", "12\uC6D4"]
}, os = {
  narrow: ["\uC77C", "\uC6D4", "\uD654", "\uC218", "\uBAA9", "\uAE08", "\uD1A0"],
  short: ["\uC77C", "\uC6D4", "\uD654", "\uC218", "\uBAA9", "\uAE08", "\uD1A0"],
  abbreviated: ["\uC77C", "\uC6D4", "\uD654", "\uC218", "\uBAA9", "\uAE08", "\uD1A0"],
  wide: ["\uC77C\uC694\uC77C", "\uC6D4\uC694\uC77C", "\uD654\uC694\uC77C", "\uC218\uC694\uC77C", "\uBAA9\uC694\uC77C", "\uAE08\uC694\uC77C", "\uD1A0\uC694\uC77C"]
}, ss = {
  narrow: {
    am: "\uC624\uC804",
    pm: "\uC624\uD6C4",
    midnight: "\uC790\uC815",
    noon: "\uC815\uC624",
    morning: "\uC544\uCE68",
    afternoon: "\uC624\uD6C4",
    evening: "\uC800\uB141",
    night: "\uBC24"
  },
  abbreviated: {
    am: "\uC624\uC804",
    pm: "\uC624\uD6C4",
    midnight: "\uC790\uC815",
    noon: "\uC815\uC624",
    morning: "\uC544\uCE68",
    afternoon: "\uC624\uD6C4",
    evening: "\uC800\uB141",
    night: "\uBC24"
  },
  wide: {
    am: "\uC624\uC804",
    pm: "\uC624\uD6C4",
    midnight: "\uC790\uC815",
    noon: "\uC815\uC624",
    morning: "\uC544\uCE68",
    afternoon: "\uC624\uD6C4",
    evening: "\uC800\uB141",
    night: "\uBC24"
  }
}, us = {
  narrow: {
    am: "\uC624\uC804",
    pm: "\uC624\uD6C4",
    midnight: "\uC790\uC815",
    noon: "\uC815\uC624",
    morning: "\uC544\uCE68",
    afternoon: "\uC624\uD6C4",
    evening: "\uC800\uB141",
    night: "\uBC24"
  },
  abbreviated: {
    am: "\uC624\uC804",
    pm: "\uC624\uD6C4",
    midnight: "\uC790\uC815",
    noon: "\uC815\uC624",
    morning: "\uC544\uCE68",
    afternoon: "\uC624\uD6C4",
    evening: "\uC800\uB141",
    night: "\uBC24"
  },
  wide: {
    am: "\uC624\uC804",
    pm: "\uC624\uD6C4",
    midnight: "\uC790\uC815",
    noon: "\uC815\uC624",
    morning: "\uC544\uCE68",
    afternoon: "\uC624\uD6C4",
    evening: "\uC800\uB141",
    night: "\uBC24"
  }
}, ls = function(e, t) {
  var a = Number(e), r = t || {}, n = String(r.unit);
  switch (n) {
    case "minute":
    case "second":
      return String(a);
    case "date":
      return a + "\uC77C";
    default:
      return a + "\uBC88\uC9F8";
  }
}, ds = {
  ordinalNumber: ls,
  era: f({
    values: rs,
    defaultWidth: "wide"
  }),
  quarter: f({
    values: ns,
    defaultWidth: "wide",
    argumentCallback: function(e) {
      return e - 1;
    }
  }),
  month: f({
    values: is,
    defaultWidth: "wide"
  }),
  day: f({
    values: os,
    defaultWidth: "wide"
  }),
  dayPeriod: f({
    values: ss,
    defaultWidth: "wide",
    formattingValues: us,
    defaultFormattingWidth: "wide"
  })
};
const ms = ds;
var cs = /^(\d+)(일|번째)?/i, hs = /\d+/i, fs = {
  narrow: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(기원전|서기)/i
}, gs = {
  any: [/^(bc|기원전)/i, /^(ad|서기)/i]
}, vs = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234]사?분기/i
}, ps = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, ws = {
  narrow: /^(1[012]|[123456789])/,
  abbreviated: /^(1[012]|[123456789])월/i,
  wide: /^(1[012]|[123456789])월/i
}, bs = {
  any: [/^1월?$/, /^2/, /^3/, /^4/, /^5/, /^6/, /^7/, /^8/, /^9/, /^10/, /^11/, /^12/]
}, ys = {
  narrow: /^[일월화수목금토]/,
  short: /^[일월화수목금토]/,
  abbreviated: /^[일월화수목금토]/,
  wide: /^[일월화수목금토]요일/
}, Ms = {
  any: [/^일/, /^월/, /^화/, /^수/, /^목/, /^금/, /^토/]
}, Ps = {
  any: /^(am|pm|오전|오후|자정|정오|아침|저녁|밤)/i
}, ks = {
  any: {
    am: /^(am|오전)/i,
    pm: /^(pm|오후)/i,
    midnight: /^자정/i,
    noon: /^정오/i,
    morning: /^아침/i,
    afternoon: /^오후/i,
    evening: /^저녁/i,
    night: /^밤/i
  }
}, Ds = {
  ordinalNumber: q({
    matchPattern: cs,
    parsePattern: hs,
    valueCallback: function(e) {
      return parseInt(e, 10);
    }
  }),
  era: g({
    matchPatterns: fs,
    defaultMatchWidth: "wide",
    parsePatterns: gs,
    defaultParseWidth: "any"
  }),
  quarter: g({
    matchPatterns: vs,
    defaultMatchWidth: "wide",
    parsePatterns: ps,
    defaultParseWidth: "any",
    valueCallback: function(e) {
      return e + 1;
    }
  }),
  month: g({
    matchPatterns: ws,
    defaultMatchWidth: "wide",
    parsePatterns: bs,
    defaultParseWidth: "any"
  }),
  day: g({
    matchPatterns: ys,
    defaultMatchWidth: "wide",
    parsePatterns: Ms,
    defaultParseWidth: "any"
  }),
  dayPeriod: g({
    matchPatterns: Ps,
    defaultMatchWidth: "any",
    parsePatterns: ks,
    defaultParseWidth: "any"
  })
};
const $s = Ds;
var Cs = {
  code: "ko",
  formatDistance: Uo,
  formatLong: Ko,
  formatRelative: as,
  localize: ms,
  match: $s,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
const Ws = Cs;
var ie = {
  lessThanXSeconds: {
    one: "menos de um segundo",
    other: "menos de {{count}} segundos"
  },
  xSeconds: {
    one: "1 segundo",
    other: "{{count}} segundos"
  },
  halfAMinute: "meio minuto",
  lessThanXMinutes: {
    one: "menos de um minuto",
    other: "menos de {{count}} minutos"
  },
  xMinutes: {
    one: "1 minuto",
    other: "{{count}} minutos"
  },
  aboutXHours: {
    one: "aproximadamente 1 hora",
    other: "aproximadamente {{count}} horas"
  },
  xHours: {
    one: "1 hora",
    other: "{{count}} horas"
  },
  xDays: {
    one: "1 dia",
    other: "{{count}} dias"
  },
  aboutXWeeks: {
    one: "aproximadamente 1 semana",
    other: "aproximadamente {{count}} semanas"
  },
  xWeeks: {
    one: "1 semana",
    other: "{{count}} semanas"
  },
  aboutXMonths: {
    one: "aproximadamente 1 m\xEAs",
    other: "aproximadamente {{count}} meses"
  },
  xMonths: {
    one: "1 m\xEAs",
    other: "{{count}} meses"
  },
  aboutXYears: {
    one: "aproximadamente 1 ano",
    other: "aproximadamente {{count}} anos"
  },
  xYears: {
    one: "1 ano",
    other: "{{count}} anos"
  },
  overXYears: {
    one: "mais de 1 ano",
    other: "mais de {{count}} anos"
  },
  almostXYears: {
    one: "quase 1 ano",
    other: "quase {{count}} anos"
  }
};
function Ss(e, t, a) {
  a = a || {};
  var r;
  return typeof ie[e] == "string" ? r = ie[e] : t === 1 ? r = ie[e].one : r = ie[e].other.replace("{{count}}", t), a.addSuffix ? a.comparison > 0 ? "daqui a " + r : "h\xE1 " + r : r;
}
var Ts = {
  full: "EEEE, d 'de' MMMM 'de' y",
  long: "d 'de' MMMM 'de' y",
  medium: "d 'de' MMM 'de' y",
  short: "dd/MM/y"
}, Os = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
}, Ns = {
  full: "{{date}} '\xE0s' {{time}}",
  long: "{{date}} '\xE0s' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, xs = {
  date: y({
    formats: Ts,
    defaultWidth: "full"
  }),
  time: y({
    formats: Os,
    defaultWidth: "full"
  }),
  dateTime: y({
    formats: Ns,
    defaultWidth: "full"
  })
};
const Es = xs;
var js = {
  lastWeek: "'na \xFAltima' eeee '\xE0s' p",
  yesterday: "'ontem \xE0s' p",
  today: "'hoje \xE0s' p",
  tomorrow: "'amanh\xE3 \xE0s' p",
  nextWeek: "eeee '\xE0s' p",
  other: "P"
};
function Ls(e, t, a, r) {
  return js[e];
}
function zs(e) {
  var t = Number(e);
  return t + "\xBA";
}
var _s = {
  narrow: ["aC", "dC"],
  abbreviated: ["a.C.", "d.C."],
  wide: ["antes de Cristo", "depois de Cristo"]
}, As = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["T1", "T2", "T3", "T4"],
  wide: ["1\xBA trimestre", "2\xBA trimestre", "3\xBA trimestre", "4\xBA trimestre"]
}, Fs = {
  narrow: ["j", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"],
  abbreviated: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
  wide: ["janeiro", "fevereiro", "mar\xE7o", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"]
}, Is = {
  narrow: ["d", "s", "t", "q", "q", "s", "s"],
  short: ["dom", "seg", "ter", "qua", "qui", "sex", "s\xE1b"],
  abbreviated: ["dom", "seg", "ter", "qua", "qui", "sex", "s\xE1b"],
  wide: ["domingo", "segunda-feira", "ter\xE7a-feira", "quarta-feira", "quinta-feira", "sexta-feira", "s\xE1bado"]
}, qs = {
  narrow: {
    am: "AM",
    pm: "PM",
    midnight: "meia-noite",
    noon: "meio-dia",
    morning: "manh\xE3",
    afternoon: "tarde",
    evening: "noite",
    night: "madrugada"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "meia-noite",
    noon: "meio-dia",
    morning: "manh\xE3",
    afternoon: "tarde",
    evening: "noite",
    night: "madrugada"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "meia-noite",
    noon: "meio-dia",
    morning: "manh\xE3",
    afternoon: "tarde",
    evening: "noite",
    night: "madrugada"
  }
}, Hs = {
  narrow: {
    am: "AM",
    pm: "PM",
    midnight: "meia-noite",
    noon: "meio-dia",
    morning: "da manh\xE3",
    afternoon: "da tarde",
    evening: "da noite",
    night: "da madrugada"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "meia-noite",
    noon: "meio-dia",
    morning: "da manh\xE3",
    afternoon: "da tarde",
    evening: "da noite",
    night: "da madrugada"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "meia-noite",
    noon: "meio-dia",
    morning: "da manh\xE3",
    afternoon: "da tarde",
    evening: "da noite",
    night: "da madrugada"
  }
}, Gs = {
  ordinalNumber: zs,
  era: f({
    values: _s,
    defaultWidth: "wide"
  }),
  quarter: f({
    values: As,
    defaultWidth: "wide",
    argumentCallback: function(e) {
      return Number(e) - 1;
    }
  }),
  month: f({
    values: Fs,
    defaultWidth: "wide"
  }),
  day: f({
    values: Is,
    defaultWidth: "wide"
  }),
  dayPeriod: f({
    values: qs,
    defaultWidth: "wide",
    formattingValues: Hs,
    defaultFormattingWidth: "wide"
  })
};
const Ys = Gs;
var Xs = /^(\d+)(º|ª)?/i, Bs = /\d+/i, Vs = {
  narrow: /^(ac|dc|a|d)/i,
  abbreviated: /^(a\.?\s?c\.?|a\.?\s?e\.?\s?c\.?|d\.?\s?c\.?|e\.?\s?c\.?)/i,
  wide: /^(antes de cristo|antes da era comum|depois de cristo|era comum)/i
}, Us = {
  any: [/^ac/i, /^dc/i],
  wide: [/^(antes de cristo|antes da era comum)/i, /^(depois de cristo|era comum)/i]
}, Rs = {
  narrow: /^[1234]/i,
  abbreviated: /^T[1234]/i,
  wide: /^[1234](º|ª)? trimestre/i
}, Js = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Qs = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez)/i,
  wide: /^(janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)/i
}, Zs = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ab/i, /^mai/i, /^jun/i, /^jul/i, /^ag/i, /^s/i, /^o/i, /^n/i, /^d/i]
}, Ks = {
  narrow: /^[dstq]/i,
  short: /^(dom|seg|ter|qua|qui|sex|s[áa]b)/i,
  abbreviated: /^(dom|seg|ter|qua|qui|sex|s[áa]b)/i,
  wide: /^(domingo|segunda-?\s?feira|terça-?\s?feira|quarta-?\s?feira|quinta-?\s?feira|sexta-?\s?feira|s[áa]bado)/i
}, eu = {
  narrow: [/^d/i, /^s/i, /^t/i, /^q/i, /^q/i, /^s/i, /^s/i],
  any: [/^d/i, /^seg/i, /^t/i, /^qua/i, /^qui/i, /^sex/i, /^s[áa]/i]
}, tu = {
  narrow: /^(a|p|meia-?\s?noite|meio-?\s?dia|(da) (manh[ãa]|tarde|noite|madrugada))/i,
  any: /^([ap]\.?\s?m\.?|meia-?\s?noite|meio-?\s?dia|(da) (manh[ãa]|tarde|noite|madrugada))/i
}, au = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^meia/i,
    noon: /^meio/i,
    morning: /manh[ãa]/i,
    afternoon: /tarde/i,
    evening: /noite/i,
    night: /madrugada/i
  }
}, ru = {
  ordinalNumber: q({
    matchPattern: Xs,
    parsePattern: Bs,
    valueCallback: function(e) {
      return parseInt(e, 10);
    }
  }),
  era: g({
    matchPatterns: Vs,
    defaultMatchWidth: "wide",
    parsePatterns: Us,
    defaultParseWidth: "any"
  }),
  quarter: g({
    matchPatterns: Rs,
    defaultMatchWidth: "wide",
    parsePatterns: Js,
    defaultParseWidth: "any",
    valueCallback: function(e) {
      return e + 1;
    }
  }),
  month: g({
    matchPatterns: Qs,
    defaultMatchWidth: "wide",
    parsePatterns: Zs,
    defaultParseWidth: "any"
  }),
  day: g({
    matchPatterns: Ks,
    defaultMatchWidth: "wide",
    parsePatterns: eu,
    defaultParseWidth: "any"
  }),
  dayPeriod: g({
    matchPatterns: tu,
    defaultMatchWidth: "any",
    parsePatterns: au,
    defaultParseWidth: "any"
  })
};
const nu = ru;
var iu = {
  code: "pt",
  formatDistance: Ss,
  formatLong: Es,
  formatRelative: Ls,
  localize: Ys,
  match: nu,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
const ou = iu;
function K(e, t) {
  if (e.one !== void 0 && t === 1)
    return e.one;
  var a = t % 10, r = t % 100;
  return a === 1 && r !== 11 ? e.singularNominative.replace("{{count}}", t) : a >= 2 && a <= 4 && (r < 10 || r > 20) ? e.singularGenitive.replace("{{count}}", t) : e.pluralGenitive.replace("{{count}}", t);
}
function L(e) {
  return function(t, a) {
    return a.addSuffix ? a.comparison > 0 ? e.future ? K(e.future, t) : "\u0447\u0435\u0440\u0435\u0437 " + K(e.regular, t) : e.past ? K(e.past, t) : K(e.regular, t) + " \u043D\u0430\u0437\u0430\u0434" : K(e.regular, t);
  };
}
var su = {
  lessThanXSeconds: L({
    regular: {
      one: "\u043C\u0435\u043D\u044C\u0448\u0435 \u0441\u0435\u043A\u0443\u043D\u0434\u044B",
      singularNominative: "\u043C\u0435\u043D\u044C\u0448\u0435 {{count}} \u0441\u0435\u043A\u0443\u043D\u0434\u044B",
      singularGenitive: "\u043C\u0435\u043D\u044C\u0448\u0435 {{count}} \u0441\u0435\u043A\u0443\u043D\u0434",
      pluralGenitive: "\u043C\u0435\u043D\u044C\u0448\u0435 {{count}} \u0441\u0435\u043A\u0443\u043D\u0434"
    },
    future: {
      one: "\u043C\u0435\u043D\u044C\u0448\u0435, \u0447\u0435\u043C \u0447\u0435\u0440\u0435\u0437 \u0441\u0435\u043A\u0443\u043D\u0434\u0443",
      singularNominative: "\u043C\u0435\u043D\u044C\u0448\u0435, \u0447\u0435\u043C \u0447\u0435\u0440\u0435\u0437 {{count}} \u0441\u0435\u043A\u0443\u043D\u0434\u0443",
      singularGenitive: "\u043C\u0435\u043D\u044C\u0448\u0435, \u0447\u0435\u043C \u0447\u0435\u0440\u0435\u0437 {{count}} \u0441\u0435\u043A\u0443\u043D\u0434\u044B",
      pluralGenitive: "\u043C\u0435\u043D\u044C\u0448\u0435, \u0447\u0435\u043C \u0447\u0435\u0440\u0435\u0437 {{count}} \u0441\u0435\u043A\u0443\u043D\u0434"
    }
  }),
  xSeconds: L({
    regular: {
      singularNominative: "{{count}} \u0441\u0435\u043A\u0443\u043D\u0434\u0430",
      singularGenitive: "{{count}} \u0441\u0435\u043A\u0443\u043D\u0434\u044B",
      pluralGenitive: "{{count}} \u0441\u0435\u043A\u0443\u043D\u0434"
    },
    past: {
      singularNominative: "{{count}} \u0441\u0435\u043A\u0443\u043D\u0434\u0443 \u043D\u0430\u0437\u0430\u0434",
      singularGenitive: "{{count}} \u0441\u0435\u043A\u0443\u043D\u0434\u044B \u043D\u0430\u0437\u0430\u0434",
      pluralGenitive: "{{count}} \u0441\u0435\u043A\u0443\u043D\u0434 \u043D\u0430\u0437\u0430\u0434"
    },
    future: {
      singularNominative: "\u0447\u0435\u0440\u0435\u0437 {{count}} \u0441\u0435\u043A\u0443\u043D\u0434\u0443",
      singularGenitive: "\u0447\u0435\u0440\u0435\u0437 {{count}} \u0441\u0435\u043A\u0443\u043D\u0434\u044B",
      pluralGenitive: "\u0447\u0435\u0440\u0435\u0437 {{count}} \u0441\u0435\u043A\u0443\u043D\u0434"
    }
  }),
  halfAMinute: function(e, t) {
    return t.addSuffix ? t.comparison > 0 ? "\u0447\u0435\u0440\u0435\u0437 \u043F\u043E\u043B\u043C\u0438\u043D\u0443\u0442\u044B" : "\u043F\u043E\u043B\u043C\u0438\u043D\u0443\u0442\u044B \u043D\u0430\u0437\u0430\u0434" : "\u043F\u043E\u043B\u043C\u0438\u043D\u0443\u0442\u044B";
  },
  lessThanXMinutes: L({
    regular: {
      one: "\u043C\u0435\u043D\u044C\u0448\u0435 \u043C\u0438\u043D\u0443\u0442\u044B",
      singularNominative: "\u043C\u0435\u043D\u044C\u0448\u0435 {{count}} \u043C\u0438\u043D\u0443\u0442\u044B",
      singularGenitive: "\u043C\u0435\u043D\u044C\u0448\u0435 {{count}} \u043C\u0438\u043D\u0443\u0442",
      pluralGenitive: "\u043C\u0435\u043D\u044C\u0448\u0435 {{count}} \u043C\u0438\u043D\u0443\u0442"
    },
    future: {
      one: "\u043C\u0435\u043D\u044C\u0448\u0435, \u0447\u0435\u043C \u0447\u0435\u0440\u0435\u0437 \u043C\u0438\u043D\u0443\u0442\u0443",
      singularNominative: "\u043C\u0435\u043D\u044C\u0448\u0435, \u0447\u0435\u043C \u0447\u0435\u0440\u0435\u0437 {{count}} \u043C\u0438\u043D\u0443\u0442\u0443",
      singularGenitive: "\u043C\u0435\u043D\u044C\u0448\u0435, \u0447\u0435\u043C \u0447\u0435\u0440\u0435\u0437 {{count}} \u043C\u0438\u043D\u0443\u0442\u044B",
      pluralGenitive: "\u043C\u0435\u043D\u044C\u0448\u0435, \u0447\u0435\u043C \u0447\u0435\u0440\u0435\u0437 {{count}} \u043C\u0438\u043D\u0443\u0442"
    }
  }),
  xMinutes: L({
    regular: {
      singularNominative: "{{count}} \u043C\u0438\u043D\u0443\u0442\u0430",
      singularGenitive: "{{count}} \u043C\u0438\u043D\u0443\u0442\u044B",
      pluralGenitive: "{{count}} \u043C\u0438\u043D\u0443\u0442"
    },
    past: {
      singularNominative: "{{count}} \u043C\u0438\u043D\u0443\u0442\u0443 \u043D\u0430\u0437\u0430\u0434",
      singularGenitive: "{{count}} \u043C\u0438\u043D\u0443\u0442\u044B \u043D\u0430\u0437\u0430\u0434",
      pluralGenitive: "{{count}} \u043C\u0438\u043D\u0443\u0442 \u043D\u0430\u0437\u0430\u0434"
    },
    future: {
      singularNominative: "\u0447\u0435\u0440\u0435\u0437 {{count}} \u043C\u0438\u043D\u0443\u0442\u0443",
      singularGenitive: "\u0447\u0435\u0440\u0435\u0437 {{count}} \u043C\u0438\u043D\u0443\u0442\u044B",
      pluralGenitive: "\u0447\u0435\u0440\u0435\u0437 {{count}} \u043C\u0438\u043D\u0443\u0442"
    }
  }),
  aboutXHours: L({
    regular: {
      singularNominative: "\u043E\u043A\u043E\u043B\u043E {{count}} \u0447\u0430\u0441\u0430",
      singularGenitive: "\u043E\u043A\u043E\u043B\u043E {{count}} \u0447\u0430\u0441\u043E\u0432",
      pluralGenitive: "\u043E\u043A\u043E\u043B\u043E {{count}} \u0447\u0430\u0441\u043E\u0432"
    },
    future: {
      singularNominative: "\u043F\u0440\u0438\u0431\u043B\u0438\u0437\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0447\u0435\u0440\u0435\u0437 {{count}} \u0447\u0430\u0441",
      singularGenitive: "\u043F\u0440\u0438\u0431\u043B\u0438\u0437\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0447\u0435\u0440\u0435\u0437 {{count}} \u0447\u0430\u0441\u0430",
      pluralGenitive: "\u043F\u0440\u0438\u0431\u043B\u0438\u0437\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0447\u0435\u0440\u0435\u0437 {{count}} \u0447\u0430\u0441\u043E\u0432"
    }
  }),
  xHours: L({
    regular: {
      singularNominative: "{{count}} \u0447\u0430\u0441",
      singularGenitive: "{{count}} \u0447\u0430\u0441\u0430",
      pluralGenitive: "{{count}} \u0447\u0430\u0441\u043E\u0432"
    }
  }),
  xDays: L({
    regular: {
      singularNominative: "{{count}} \u0434\u0435\u043D\u044C",
      singularGenitive: "{{count}} \u0434\u043D\u044F",
      pluralGenitive: "{{count}} \u0434\u043D\u0435\u0439"
    }
  }),
  aboutXWeeks: L({
    regular: {
      singularNominative: "\u043E\u043A\u043E\u043B\u043E {{count}} \u043D\u0435\u0434\u0435\u043B\u0438",
      singularGenitive: "\u043E\u043A\u043E\u043B\u043E {{count}} \u043D\u0435\u0434\u0435\u043B\u044C",
      pluralGenitive: "\u043E\u043A\u043E\u043B\u043E {{count}} \u043D\u0435\u0434\u0435\u043B\u044C"
    },
    future: {
      singularNominative: "\u043F\u0440\u0438\u0431\u043B\u0438\u0437\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0447\u0435\u0440\u0435\u0437 {{count}} \u043D\u0435\u0434\u0435\u043B\u044E",
      singularGenitive: "\u043F\u0440\u0438\u0431\u043B\u0438\u0437\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0447\u0435\u0440\u0435\u0437 {{count}} \u043D\u0435\u0434\u0435\u043B\u0438",
      pluralGenitive: "\u043F\u0440\u0438\u0431\u043B\u0438\u0437\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0447\u0435\u0440\u0435\u0437 {{count}} \u043D\u0435\u0434\u0435\u043B\u044C"
    }
  }),
  xWeeks: L({
    regular: {
      singularNominative: "{{count}} \u043D\u0435\u0434\u0435\u043B\u044F",
      singularGenitive: "{{count}} \u043D\u0435\u0434\u0435\u043B\u0438",
      pluralGenitive: "{{count}} \u043D\u0435\u0434\u0435\u043B\u044C"
    }
  }),
  aboutXMonths: L({
    regular: {
      singularNominative: "\u043E\u043A\u043E\u043B\u043E {{count}} \u043C\u0435\u0441\u044F\u0446\u0430",
      singularGenitive: "\u043E\u043A\u043E\u043B\u043E {{count}} \u043C\u0435\u0441\u044F\u0446\u0435\u0432",
      pluralGenitive: "\u043E\u043A\u043E\u043B\u043E {{count}} \u043C\u0435\u0441\u044F\u0446\u0435\u0432"
    },
    future: {
      singularNominative: "\u043F\u0440\u0438\u0431\u043B\u0438\u0437\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0447\u0435\u0440\u0435\u0437 {{count}} \u043C\u0435\u0441\u044F\u0446",
      singularGenitive: "\u043F\u0440\u0438\u0431\u043B\u0438\u0437\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0447\u0435\u0440\u0435\u0437 {{count}} \u043C\u0435\u0441\u044F\u0446\u0430",
      pluralGenitive: "\u043F\u0440\u0438\u0431\u043B\u0438\u0437\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0447\u0435\u0440\u0435\u0437 {{count}} \u043C\u0435\u0441\u044F\u0446\u0435\u0432"
    }
  }),
  xMonths: L({
    regular: {
      singularNominative: "{{count}} \u043C\u0435\u0441\u044F\u0446",
      singularGenitive: "{{count}} \u043C\u0435\u0441\u044F\u0446\u0430",
      pluralGenitive: "{{count}} \u043C\u0435\u0441\u044F\u0446\u0435\u0432"
    }
  }),
  aboutXYears: L({
    regular: {
      singularNominative: "\u043E\u043A\u043E\u043B\u043E {{count}} \u0433\u043E\u0434\u0430",
      singularGenitive: "\u043E\u043A\u043E\u043B\u043E {{count}} \u043B\u0435\u0442",
      pluralGenitive: "\u043E\u043A\u043E\u043B\u043E {{count}} \u043B\u0435\u0442"
    },
    future: {
      singularNominative: "\u043F\u0440\u0438\u0431\u043B\u0438\u0437\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0447\u0435\u0440\u0435\u0437 {{count}} \u0433\u043E\u0434",
      singularGenitive: "\u043F\u0440\u0438\u0431\u043B\u0438\u0437\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0447\u0435\u0440\u0435\u0437 {{count}} \u0433\u043E\u0434\u0430",
      pluralGenitive: "\u043F\u0440\u0438\u0431\u043B\u0438\u0437\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0447\u0435\u0440\u0435\u0437 {{count}} \u043B\u0435\u0442"
    }
  }),
  xYears: L({
    regular: {
      singularNominative: "{{count}} \u0433\u043E\u0434",
      singularGenitive: "{{count}} \u0433\u043E\u0434\u0430",
      pluralGenitive: "{{count}} \u043B\u0435\u0442"
    }
  }),
  overXYears: L({
    regular: {
      singularNominative: "\u0431\u043E\u043B\u044C\u0448\u0435 {{count}} \u0433\u043E\u0434\u0430",
      singularGenitive: "\u0431\u043E\u043B\u044C\u0448\u0435 {{count}} \u043B\u0435\u0442",
      pluralGenitive: "\u0431\u043E\u043B\u044C\u0448\u0435 {{count}} \u043B\u0435\u0442"
    },
    future: {
      singularNominative: "\u0431\u043E\u043B\u044C\u0448\u0435, \u0447\u0435\u043C \u0447\u0435\u0440\u0435\u0437 {{count}} \u0433\u043E\u0434",
      singularGenitive: "\u0431\u043E\u043B\u044C\u0448\u0435, \u0447\u0435\u043C \u0447\u0435\u0440\u0435\u0437 {{count}} \u0433\u043E\u0434\u0430",
      pluralGenitive: "\u0431\u043E\u043B\u044C\u0448\u0435, \u0447\u0435\u043C \u0447\u0435\u0440\u0435\u0437 {{count}} \u043B\u0435\u0442"
    }
  }),
  almostXYears: L({
    regular: {
      singularNominative: "\u043F\u043E\u0447\u0442\u0438 {{count}} \u0433\u043E\u0434",
      singularGenitive: "\u043F\u043E\u0447\u0442\u0438 {{count}} \u0433\u043E\u0434\u0430",
      pluralGenitive: "\u043F\u043E\u0447\u0442\u0438 {{count}} \u043B\u0435\u0442"
    },
    future: {
      singularNominative: "\u043F\u043E\u0447\u0442\u0438 \u0447\u0435\u0440\u0435\u0437 {{count}} \u0433\u043E\u0434",
      singularGenitive: "\u043F\u043E\u0447\u0442\u0438 \u0447\u0435\u0440\u0435\u0437 {{count}} \u0433\u043E\u0434\u0430",
      pluralGenitive: "\u043F\u043E\u0447\u0442\u0438 \u0447\u0435\u0440\u0435\u0437 {{count}} \u043B\u0435\u0442"
    }
  })
};
function uu(e, t, a) {
  return a = a || {}, su[e](t, a);
}
var lu = {
  full: "EEEE, d MMMM y '\u0433.'",
  long: "d MMMM y '\u0433.'",
  medium: "d MMM y '\u0433.'",
  short: "dd.MM.y"
}, du = {
  full: "H:mm:ss zzzz",
  long: "H:mm:ss z",
  medium: "H:mm:ss",
  short: "H:mm"
}, mu = {
  any: "{{date}}, {{time}}"
}, cu = {
  date: y({
    formats: lu,
    defaultWidth: "full"
  }),
  time: y({
    formats: du,
    defaultWidth: "full"
  }),
  dateTime: y({
    formats: mu,
    defaultWidth: "any"
  })
};
const hu = cu;
var $e = ["\u0432\u043E\u0441\u043A\u0440\u0435\u0441\u0435\u043D\u044C\u0435", "\u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A", "\u0432\u0442\u043E\u0440\u043D\u0438\u043A", "\u0441\u0440\u0435\u0434\u0443", "\u0447\u0435\u0442\u0432\u0435\u0440\u0433", "\u043F\u044F\u0442\u043D\u0438\u0446\u0443", "\u0441\u0443\u0431\u0431\u043E\u0442\u0443"];
function fu(e) {
  var t = $e[e];
  switch (e) {
    case 0:
      return "'\u0432 \u043F\u0440\u043E\u0448\u043B\u043E\u0435 " + t + " \u0432' p";
    case 1:
    case 2:
    case 4:
      return "'\u0432 \u043F\u0440\u043E\u0448\u043B\u044B\u0439 " + t + " \u0432' p";
    case 3:
    case 5:
    case 6:
      return "'\u0432 \u043F\u0440\u043E\u0448\u043B\u0443\u044E " + t + " \u0432' p";
  }
}
function _e(e) {
  var t = $e[e];
  return e === 2 ? "'\u0432\u043E " + t + " \u0432' p" : "'\u0432 " + t + " \u0432' p";
}
function gu(e) {
  var t = $e[e];
  switch (e) {
    case 0:
      return "'\u0432 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0435 " + t + " \u0432' p";
    case 1:
    case 2:
    case 4:
      return "'\u0432 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 " + t + " \u0432' p";
    case 3:
    case 5:
    case 6:
      return "'\u0432 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0443\u044E " + t + " \u0432' p";
  }
}
var vu = {
  lastWeek: function(e, t, a) {
    var r = e.getUTCDay();
    return le(e, t, a) ? _e(r) : fu(r);
  },
  yesterday: "'\u0432\u0447\u0435\u0440\u0430 \u0432' p",
  today: "'\u0441\u0435\u0433\u043E\u0434\u043D\u044F \u0432' p",
  tomorrow: "'\u0437\u0430\u0432\u0442\u0440\u0430 \u0432' p",
  nextWeek: function(e, t, a) {
    var r = e.getUTCDay();
    return le(e, t, a) ? _e(r) : gu(r);
  },
  other: "P"
};
function pu(e, t, a, r) {
  var n = vu[e];
  return typeof n == "function" ? n(t, a, r) : n;
}
var wu = {
  narrow: ["\u0434\u043E \u043D.\u044D.", "\u043D.\u044D."],
  abbreviated: ["\u0434\u043E \u043D. \u044D.", "\u043D. \u044D."],
  wide: ["\u0434\u043E \u043D\u0430\u0448\u0435\u0439 \u044D\u0440\u044B", "\u043D\u0430\u0448\u0435\u0439 \u044D\u0440\u044B"]
}, bu = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["1-\u0439 \u043A\u0432.", "2-\u0439 \u043A\u0432.", "3-\u0439 \u043A\u0432.", "4-\u0439 \u043A\u0432."],
  wide: ["1-\u0439 \u043A\u0432\u0430\u0440\u0442\u0430\u043B", "2-\u0439 \u043A\u0432\u0430\u0440\u0442\u0430\u043B", "3-\u0439 \u043A\u0432\u0430\u0440\u0442\u0430\u043B", "4-\u0439 \u043A\u0432\u0430\u0440\u0442\u0430\u043B"]
}, yu = {
  narrow: ["\u042F", "\u0424", "\u041C", "\u0410", "\u041C", "\u0418", "\u0418", "\u0410", "\u0421", "\u041E", "\u041D", "\u0414"],
  abbreviated: ["\u044F\u043D\u0432.", "\u0444\u0435\u0432.", "\u043C\u0430\u0440\u0442", "\u0430\u043F\u0440.", "\u043C\u0430\u0439", "\u0438\u044E\u043D\u044C", "\u0438\u044E\u043B\u044C", "\u0430\u0432\u0433.", "\u0441\u0435\u043D\u0442.", "\u043E\u043A\u0442.", "\u043D\u043E\u044F\u0431.", "\u0434\u0435\u043A."],
  wide: ["\u044F\u043D\u0432\u0430\u0440\u044C", "\u0444\u0435\u0432\u0440\u0430\u043B\u044C", "\u043C\u0430\u0440\u0442", "\u0430\u043F\u0440\u0435\u043B\u044C", "\u043C\u0430\u0439", "\u0438\u044E\u043D\u044C", "\u0438\u044E\u043B\u044C", "\u0430\u0432\u0433\u0443\u0441\u0442", "\u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044C", "\u043E\u043A\u0442\u044F\u0431\u0440\u044C", "\u043D\u043E\u044F\u0431\u0440\u044C", "\u0434\u0435\u043A\u0430\u0431\u0440\u044C"]
}, Mu = {
  narrow: ["\u042F", "\u0424", "\u041C", "\u0410", "\u041C", "\u0418", "\u0418", "\u0410", "\u0421", "\u041E", "\u041D", "\u0414"],
  abbreviated: ["\u044F\u043D\u0432.", "\u0444\u0435\u0432.", "\u043C\u0430\u0440.", "\u0430\u043F\u0440.", "\u043C\u0430\u044F", "\u0438\u044E\u043D.", "\u0438\u044E\u043B.", "\u0430\u0432\u0433.", "\u0441\u0435\u043D\u0442.", "\u043E\u043A\u0442.", "\u043D\u043E\u044F\u0431.", "\u0434\u0435\u043A."],
  wide: ["\u044F\u043D\u0432\u0430\u0440\u044F", "\u0444\u0435\u0432\u0440\u0430\u043B\u044F", "\u043C\u0430\u0440\u0442\u0430", "\u0430\u043F\u0440\u0435\u043B\u044F", "\u043C\u0430\u044F", "\u0438\u044E\u043D\u044F", "\u0438\u044E\u043B\u044F", "\u0430\u0432\u0433\u0443\u0441\u0442\u0430", "\u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044F", "\u043E\u043A\u0442\u044F\u0431\u0440\u044F", "\u043D\u043E\u044F\u0431\u0440\u044F", "\u0434\u0435\u043A\u0430\u0431\u0440\u044F"]
}, Pu = {
  narrow: ["\u0412", "\u041F", "\u0412", "\u0421", "\u0427", "\u041F", "\u0421"],
  short: ["\u0432\u0441", "\u043F\u043D", "\u0432\u0442", "\u0441\u0440", "\u0447\u0442", "\u043F\u0442", "\u0441\u0431"],
  abbreviated: ["\u0432\u0441\u043A", "\u043F\u043D\u0434", "\u0432\u0442\u0440", "\u0441\u0440\u0434", "\u0447\u0442\u0432", "\u043F\u0442\u043D", "\u0441\u0443\u0431"],
  wide: ["\u0432\u043E\u0441\u043A\u0440\u0435\u0441\u0435\u043D\u044C\u0435", "\u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A", "\u0432\u0442\u043E\u0440\u043D\u0438\u043A", "\u0441\u0440\u0435\u0434\u0430", "\u0447\u0435\u0442\u0432\u0435\u0440\u0433", "\u043F\u044F\u0442\u043D\u0438\u0446\u0430", "\u0441\u0443\u0431\u0431\u043E\u0442\u0430"]
}, ku = {
  narrow: {
    am: "\u0414\u041F",
    pm: "\u041F\u041F",
    midnight: "\u043F\u043E\u043B\u043D.",
    noon: "\u043F\u043E\u043B\u0434.",
    morning: "\u0443\u0442\u0440\u043E",
    afternoon: "\u0434\u0435\u043D\u044C",
    evening: "\u0432\u0435\u0447.",
    night: "\u043D\u043E\u0447\u044C"
  },
  abbreviated: {
    am: "\u0414\u041F",
    pm: "\u041F\u041F",
    midnight: "\u043F\u043E\u043B\u043D.",
    noon: "\u043F\u043E\u043B\u0434.",
    morning: "\u0443\u0442\u0440\u043E",
    afternoon: "\u0434\u0435\u043D\u044C",
    evening: "\u0432\u0435\u0447.",
    night: "\u043D\u043E\u0447\u044C"
  },
  wide: {
    am: "\u0414\u041F",
    pm: "\u041F\u041F",
    midnight: "\u043F\u043E\u043B\u043D\u043E\u0447\u044C",
    noon: "\u043F\u043E\u043B\u0434\u0435\u043D\u044C",
    morning: "\u0443\u0442\u0440\u043E",
    afternoon: "\u0434\u0435\u043D\u044C",
    evening: "\u0432\u0435\u0447\u0435\u0440",
    night: "\u043D\u043E\u0447\u044C"
  }
}, Du = {
  narrow: {
    am: "\u0414\u041F",
    pm: "\u041F\u041F",
    midnight: "\u043F\u043E\u043B\u043D.",
    noon: "\u043F\u043E\u043B\u0434.",
    morning: "\u0443\u0442\u0440\u0430",
    afternoon: "\u0434\u043D\u044F",
    evening: "\u0432\u0435\u0447.",
    night: "\u043D\u043E\u0447\u0438"
  },
  abbreviated: {
    am: "\u0414\u041F",
    pm: "\u041F\u041F",
    midnight: "\u043F\u043E\u043B\u043D.",
    noon: "\u043F\u043E\u043B\u0434.",
    morning: "\u0443\u0442\u0440\u0430",
    afternoon: "\u0434\u043D\u044F",
    evening: "\u0432\u0435\u0447.",
    night: "\u043D\u043E\u0447\u0438"
  },
  wide: {
    am: "\u0414\u041F",
    pm: "\u041F\u041F",
    midnight: "\u043F\u043E\u043B\u043D\u043E\u0447\u044C",
    noon: "\u043F\u043E\u043B\u0434\u0435\u043D\u044C",
    morning: "\u0443\u0442\u0440\u0430",
    afternoon: "\u0434\u043D\u044F",
    evening: "\u0432\u0435\u0447\u0435\u0440\u0430",
    night: "\u043D\u043E\u0447\u0438"
  }
};
function $u(e, t) {
  var a = t || {}, r = String(a.unit), n;
  return r === "date" ? n = "-\u0435" : r === "week" || r === "minute" || r === "second" ? n = "-\u044F" : n = "-\u0439", e + n;
}
var Cu = {
  ordinalNumber: $u,
  era: f({
    values: wu,
    defaultWidth: "wide"
  }),
  quarter: f({
    values: bu,
    defaultWidth: "wide",
    argumentCallback: function(e) {
      return Number(e) - 1;
    }
  }),
  month: f({
    values: yu,
    defaultWidth: "wide",
    formattingValues: Mu,
    defaultFormattingWidth: "wide"
  }),
  day: f({
    values: Pu,
    defaultWidth: "wide"
  }),
  dayPeriod: f({
    values: ku,
    defaultWidth: "any",
    formattingValues: Du,
    defaultFormattingWidth: "wide"
  })
};
const Wu = Cu;
var Su = /^(\d+)(-?(е|я|й|ое|ье|ая|ья|ый|ой|ий|ый))?/i, Tu = /\d+/i, Ou = {
  narrow: /^((до )?н\.?\s?э\.?)/i,
  abbreviated: /^((до )?н\.?\s?э\.?)/i,
  wide: /^(до нашей эры|нашей эры|наша эра)/i
}, Nu = {
  any: [/^д/i, /^н/i]
}, xu = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234](-?[ыои]?й?)? кв.?/i,
  wide: /^[1234](-?[ыои]?й?)? квартал/i
}, Eu = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, ju = {
  narrow: /^[яфмаисонд]/i,
  abbreviated: /^(янв|фев|март?|апр|ма[йя]|июн[ья]?|июл[ья]?|авг|сент?|окт|нояб?|дек)\.?/i,
  wide: /^(январ[ья]|феврал[ья]|марта?|апрел[ья]|ма[йя]|июн[ья]|июл[ья]|августа?|сентябр[ья]|октябр[ья]|октябр[ья]|ноябр[ья]|декабр[ья])/i
}, Lu = {
  narrow: [/^я/i, /^ф/i, /^м/i, /^а/i, /^м/i, /^и/i, /^и/i, /^а/i, /^с/i, /^о/i, /^н/i, /^я/i],
  any: [/^я/i, /^ф/i, /^мар/i, /^ап/i, /^ма[йя]/i, /^июн/i, /^июл/i, /^ав/i, /^с/i, /^о/i, /^н/i, /^д/i]
}, zu = {
  narrow: /^[впсч]/i,
  short: /^(вс|во|пн|по|вт|ср|чт|че|пт|пя|сб|су)\.?/i,
  abbreviated: /^(вск|вос|пнд|пон|втр|вто|срд|сре|чтв|чет|птн|пят|суб).?/i,
  wide: /^(воскресень[ея]|понедельника?|вторника?|сред[аы]|четверга?|пятниц[аы]|суббот[аы])/i
}, _u = {
  narrow: [/^в/i, /^п/i, /^в/i, /^с/i, /^ч/i, /^п/i, /^с/i],
  any: [/^в[ос]/i, /^п[он]/i, /^в/i, /^ср/i, /^ч/i, /^п[ят]/i, /^с[уб]/i]
}, Au = {
  narrow: /^([дп]п|полн\.?|полд\.?|утр[оа]|день|дня|веч\.?|ноч[ьи])/i,
  abbreviated: /^([дп]п|полн\.?|полд\.?|утр[оа]|день|дня|веч\.?|ноч[ьи])/i,
  wide: /^([дп]п|полночь|полдень|утр[оа]|день|дня|вечера?|ноч[ьи])/i
}, Fu = {
  any: {
    am: /^дп/i,
    pm: /^пп/i,
    midnight: /^полн/i,
    noon: /^полд/i,
    morning: /^у/i,
    afternoon: /^д[ен]/i,
    evening: /^в/i,
    night: /^н/i
  }
}, Iu = {
  ordinalNumber: q({
    matchPattern: Su,
    parsePattern: Tu,
    valueCallback: function(e) {
      return parseInt(e, 10);
    }
  }),
  era: g({
    matchPatterns: Ou,
    defaultMatchWidth: "wide",
    parsePatterns: Nu,
    defaultParseWidth: "any"
  }),
  quarter: g({
    matchPatterns: xu,
    defaultMatchWidth: "wide",
    parsePatterns: Eu,
    defaultParseWidth: "any",
    valueCallback: function(e) {
      return e + 1;
    }
  }),
  month: g({
    matchPatterns: ju,
    defaultMatchWidth: "wide",
    parsePatterns: Lu,
    defaultParseWidth: "any"
  }),
  day: g({
    matchPatterns: zu,
    defaultMatchWidth: "wide",
    parsePatterns: _u,
    defaultParseWidth: "any"
  }),
  dayPeriod: g({
    matchPatterns: Au,
    defaultMatchWidth: "wide",
    parsePatterns: Fu,
    defaultParseWidth: "any"
  })
};
const qu = Iu;
var Hu = {
  code: "ru",
  formatDistance: uu,
  formatLong: hu,
  formatRelative: pu,
  localize: Wu,
  match: qu,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
};
const Gu = Hu, de = { en: Hn, fr: oo, es: $i, de: xn, ca: pr, it: Xo, ru: Gu, pt: ou, da: Jr, ko: Ws };
function Yu(e = x(new Date()), t = x("en")) {
  const a = Be({
    start: null,
    end: null
  }), r = A(() => ({
    start: a && a.start ? H(
      new Date(
        a.start.year,
        a.start.month,
        a.start.date
      ),
      "yyyy-MM-dd"
    ) : null,
    end: a && a.end ? H(
      new Date(
        a.end.year,
        a.end.month,
        a.end.date
      ),
      "yyyy-MM-dd"
    ) : null
  })), n = A(() => ({
    start: a && a.start ? H(
      new Date(
        a.start.year,
        a.start.month,
        a.start.date,
        0,
        -1
      ),
      "yyyy-MM-dd'T'HH:mm:ss"
    ) : null,
    end: a && a.end ? H(
      new Date(
        a.end.year,
        a.end.month,
        a.end.date,
        23,
        59,
        59
      ),
      "yyyy-MM-dd'T'HH:mm:ss"
    ) : null
  })), i = A(() => {
    const v = new Array(o.value), p = _a(e.value), k = e.value.getMonth(), W = e.value.getFullYear();
    for (let E = 1; E <= p; E++)
      v.push({
        year: W,
        month: k,
        date: E,
        formatted: H(new Date(W, k, E), "yyyy-MM-dd")
      });
    const z = new Array(6 - u.value);
    return v.concat(z);
  }), o = A(() => je(Ot(e.value))), u = A(() => je(Tt(e.value))), s = A(() => H(e.value, "MMMM yyyy", {
    locale: de[t.value]
  })), l = A(() => {
    const v = Dt(new Date());
    return [...Array(7).keys()].map(
      (k) => H(Pt(v, k), "EEEEEE", {
        locale: de[t.value]
      })
    );
  });
  return {
    selectedDates: a,
    isoSelectedDates: n,
    readableSelectedDates: r,
    daysInMonth: i,
    firstDayOfMonth: o,
    lastDayOfMonth: u,
    shownMonthName: s,
    weekdays: l,
    changeShownMonth: (v = new Date()) => {
      e.value = v;
    },
    changeSelectedDate: (v) => {
      if (v && (a.start == null || a.end != null ? (a.start = v, a.end != null && (a.end = null)) : a.end == null && (a.end = v), a && a.end && a.start && a.end.formatted < a.start.formatted)) {
        const p = a.start;
        a.start = a.end, a.end = p;
      }
    },
    clearSelectedDate: () => {
      Object.assign(a, {
        start: null,
        end: null
      });
    },
    showNextMonth: () => {
      e.value = Te(e.value, 1);
    },
    showPreviousMonth: () => {
      e.value = Te(e.value, -1);
    }
  };
}
const Xu = ce({
  name: "DateRangePicker",
  emits: ["datechanged", "close"],
  props: {
    pickerId: { type: String, required: !0 },
    dateLocale: { type: String, required: !1, default: "en" },
    labelDatesFilter: { type: String, required: !1, default: "Dates" },
    labelClearButton: { type: String, required: !1, default: "Clear" },
    labelSaveButton: { type: String, required: !1, default: "Save" },
    ariaSelectDate: { type: String, required: !1, default: "Select " },
    ariaNextMonth: { type: String, required: !1, default: "Next Month" },
    ariaPreviousMonth: {
      type: String,
      required: !1,
      default: "Previous Month"
    },
    ariaToggleCalendar: {
      type: String,
      required: !1,
      default: "Toggle the calendar"
    },
    defaultDate: { type: Date, required: !1, default: () => new Date() },
    tracking: { type: Object, required: !1, default: null }
  },
  setup(e, { emit: t }) {
    const a = I(e, "dateLocale"), r = x(!1), n = x(null), i = x(null), o = x(null), u = (c) => c.stopPropagation(), s = () => {
      r.value && (r.value = !1);
    };
    ke(() => {
      document.addEventListener("click", s), n.value && n.value.addEventListener("click", u);
    }), st(() => {
      document.removeEventListener("click", s), n.value && n.value.removeEventListener(
        "click",
        u
      );
    });
    const {
      isoSelectedDates: l,
      readableSelectedDates: m,
      clearSelectedDate: d,
      changeSelectedDate: h,
      weekdays: M,
      shownMonthName: w,
      showNextMonth: v,
      showPreviousMonth: p,
      daysInMonth: k,
      selectedDates: W
    } = Yu(x(e.defaultDate), a), z = () => {
      d(), t("datechanged", l.value), i.value = m.value.start, o.value = m.value.end, s();
    }, E = () => {
      W && !l.value.end && h(W.start), t("datechanged", l.value), i.value = m.value.start, o.value = m.value.end, s();
    }, { pushTracking: B } = he();
    return {
      locale: a,
      isoSelectedDates: l,
      readableSelectedDates: m,
      readableStartDate: i,
      readableEndDate: o,
      clearSelectedDate: d,
      changeSelectedDate: h,
      weekdays: M,
      shownMonthName: w,
      showNextMonth: v,
      showPreviousMonth: p,
      daysInMonth: k,
      selectedDates: W,
      clear: z,
      save: E,
      showDateRange: r,
      closeDatePicker: s,
      dateRangePickerElement: n,
      toggleDatePicker: () => {
        r.value = !r.value, B(e.tracking?.clickDateToggle);
      }
    };
  }
}), Bu = {
  class: "date-range-picker__wrapper",
  ref: "dateRangePickerElement"
}, Vu = ["aria-label", "aria-expanded", "aria-controls"], Uu = /* @__PURE__ */ b("svg", {
  class: "dropdown-filters__arrow-down",
  width: "14",
  height: "9",
  viewBox: "0 0 14 9",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ b("path", {
    d: "M1 1L7.10049 7.10049L13.201 1",
    stroke: "black",
    "stroke-width": "2"
  })
], -1), Ru = ["id"], Ju = { class: "months" }, Qu = { class: "month" }, Zu = { class: "month__name" }, Ku = ["aria-label"], el = /* @__PURE__ */ b("svg", {
  width: "9",
  height: "14",
  viewBox: "0 0 9 14",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ b("path", {
    d: "M8.10049 1L2 7.10049L8.10049 13.201",
    stroke: "#1B1B1B",
    "stroke-width": "2"
  })
], -1), tl = [
  el
], al = ["aria-label"], rl = /* @__PURE__ */ b("svg", {
  width: "9",
  height: "14",
  viewBox: "0 0 9 14",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ b("path", {
    d: "M0.899536 13L7.00003 6.89951L0.899537 0.799012",
    stroke: "#1B1B1B",
    "stroke-width": "2"
  })
], -1), nl = [
  rl
], il = { class: "days" }, ol = ["onClick", "aria-hidden", "disabled", "aria-label"], sl = {
  key: 0,
  class: "day__number"
}, ul = { class: "date-range-picker__buttons" }, ll = ["disabled"], dl = { class: "week" };
function ml(e, t, a, r, n, i) {
  return T(), N("div", Bu, [
    b("button", {
      class: "date-range-picker__toggle",
      onClick: t[0] || (t[0] = (o) => e.toggleDatePicker()),
      "aria-label": e.ariaToggleCalendar,
      "aria-expanded": e.showDateRange + "",
      "aria-controls": e.pickerId
    }, [
      !e.readableStartDate && !e.readableEndDate ? (T(), N(R, { key: 0 }, [
        ge(_(e.labelDatesFilter), 1)
      ], 64)) : F("", !0),
      e.readableStartDate ? (T(), N(R, { key: 1 }, [
        ge(_(e.readableStartDate), 1)
      ], 64)) : F("", !0),
      e.readableEndDate && e.readableStartDate !== e.readableEndDate ? (T(), N(R, { key: 2 }, [
        ge(" - " + _(e.readableEndDate), 1)
      ], 64)) : F("", !0),
      Uu
    ], 8, Vu),
    Xe(b("div", {
      id: e.pickerId,
      class: "date-range-picker"
    }, [
      b("div", Ju, [
        b("div", Qu, [
          b("div", Zu, [
            b("button", {
              class: "month-selector month-selector--previous",
              "aria-label": e.ariaPreviousMonth,
              onClick: t[1] || (t[1] = (...o) => e.showPreviousMonth && e.showPreviousMonth(...o))
            }, tl, 8, Ku),
            b("span", null, _(e.shownMonthName), 1),
            b("button", {
              class: "month-selector month-selector--next",
              "aria-label": e.ariaNextMonth,
              onClick: t[2] || (t[2] = (...o) => e.showNextMonth && e.showNextMonth(...o))
            }, nl, 8, al)
          ]),
          b("div", il, [
            (T(!0), N(R, null, pe(e.daysInMonth, (o, u) => (T(), N("button", {
              key: u,
              onClick: (s) => e.changeSelectedDate(o),
              class: ut(["day", [
                o ? `day--${o.date}` : "day--empty",
                o && e.selectedDates && e.selectedDates.start && e.selectedDates.end && o.formatted >= e.selectedDates.start.formatted && o.formatted <= e.selectedDates.end.formatted ? "day--active" : "",
                o && e.selectedDates && e.selectedDates.start && o.formatted == e.selectedDates.start.formatted ? "day--active-first" : "",
                o && e.selectedDates && e.selectedDates.end && o.formatted == e.selectedDates.end.formatted ? "day--active-last" : ""
              ]]),
              "aria-hidden": !o,
              disabled: !o,
              "aria-label": o ? e.ariaSelectDate + o.date + " " + e.shownMonthName : ""
            }, [
              o ? (T(), N("span", sl, _(o.date), 1)) : F("", !0)
            ], 10, ol))), 128))
          ]),
          b("div", ul, [
            b("button", {
              class: "date-range-picker__reset",
              onClick: t[3] || (t[3] = (...o) => e.clear && e.clear(...o))
            }, _(e.labelClearButton), 1),
            b("button", {
              class: "date-range-picker__save",
              onClick: t[4] || (t[4] = (...o) => e.save && e.save(...o)),
              disabled: !e.selectedDates || !e.selectedDates.start && !e.selectedDates.end
            }, _(e.labelSaveButton), 9, ll)
          ])
        ])
      ]),
      b("table", dl, [
        b("tr", null, [
          (T(!0), N(R, null, pe(e.weekdays, (o) => (T(), N("td", {
            class: "weekday",
            key: o
          }, _(o), 1))), 128))
        ])
      ])
    ], 8, Ru), [
      [lt, e.showDateRange]
    ])
  ], 512);
}
const cl = /* @__PURE__ */ fe(Xu, [["render", ml]]);
function Me(e, t, a, r, n, i) {
  if (n - r <= a)
    return;
  const o = r + n >> 1;
  at(e, t, o, r, n, i % 2), Me(e, t, a, r, o - 1, i + 1), Me(e, t, a, o + 1, n, i + 1);
}
function at(e, t, a, r, n, i) {
  for (; n > r; ) {
    if (n - r > 600) {
      const l = n - r + 1, m = a - r + 1, d = Math.log(l), h = 0.5 * Math.exp(2 * d / 3), M = 0.5 * Math.sqrt(d * h * (l - h) / l) * (m - l / 2 < 0 ? -1 : 1), w = Math.max(r, Math.floor(a - m * h / l + M)), v = Math.min(n, Math.floor(a + (l - m) * h / l + M));
      at(e, t, a, w, v, i);
    }
    const o = t[2 * a + i];
    let u = r, s = n;
    for (ee(e, t, r, a), t[2 * n + i] > o && ee(e, t, r, n); u < s; ) {
      for (ee(e, t, u, s), u++, s--; t[2 * u + i] < o; )
        u++;
      for (; t[2 * s + i] > o; )
        s--;
    }
    t[2 * r + i] === o ? ee(e, t, r, s) : (s++, ee(e, t, s, n)), s <= a && (r = s + 1), a <= s && (n = s - 1);
  }
}
function ee(e, t, a, r) {
  ve(e, a, r), ve(t, 2 * a, 2 * r), ve(t, 2 * a + 1, 2 * r + 1);
}
function ve(e, t, a) {
  const r = e[t];
  e[t] = e[a], e[a] = r;
}
function hl(e, t, a, r, n, i, o) {
  const u = [0, e.length - 1, 0], s = [];
  let l, m;
  for (; u.length; ) {
    const d = u.pop(), h = u.pop(), M = u.pop();
    if (h - M <= o) {
      for (let p = M; p <= h; p++)
        l = t[2 * p], m = t[2 * p + 1], l >= a && l <= n && m >= r && m <= i && s.push(e[p]);
      continue;
    }
    const w = Math.floor((M + h) / 2);
    l = t[2 * w], m = t[2 * w + 1], l >= a && l <= n && m >= r && m <= i && s.push(e[w]);
    const v = (d + 1) % 2;
    (d === 0 ? a <= l : r <= m) && (u.push(M), u.push(w - 1), u.push(v)), (d === 0 ? n >= l : i >= m) && (u.push(w + 1), u.push(h), u.push(v));
  }
  return s;
}
function fl(e, t, a, r, n, i) {
  const o = [0, e.length - 1, 0], u = [], s = n * n;
  for (; o.length; ) {
    const l = o.pop(), m = o.pop(), d = o.pop();
    if (m - d <= i) {
      for (let p = d; p <= m; p++)
        Ae(t[2 * p], t[2 * p + 1], a, r) <= s && u.push(e[p]);
      continue;
    }
    const h = Math.floor((d + m) / 2), M = t[2 * h], w = t[2 * h + 1];
    Ae(M, w, a, r) <= s && u.push(e[h]);
    const v = (l + 1) % 2;
    (l === 0 ? a - n <= M : r - n <= w) && (o.push(d), o.push(h - 1), o.push(v)), (l === 0 ? a + n >= M : r + n >= w) && (o.push(h + 1), o.push(m), o.push(v));
  }
  return u;
}
function Ae(e, t, a, r) {
  const n = e - a, i = t - r;
  return n * n + i * i;
}
const gl = (e) => e[0], vl = (e) => e[1];
class Fe {
  constructor(t, a = gl, r = vl, n = 64, i = Float64Array) {
    this.nodeSize = n, this.points = t;
    const o = t.length < 65536 ? Uint16Array : Uint32Array, u = this.ids = new o(t.length), s = this.coords = new i(t.length * 2);
    for (let l = 0; l < t.length; l++)
      u[l] = l, s[2 * l] = a(t[l]), s[2 * l + 1] = r(t[l]);
    Me(u, s, n, 0, u.length - 1, 0);
  }
  range(t, a, r, n) {
    return hl(this.ids, this.coords, t, a, r, n, this.nodeSize);
  }
  within(t, a, r) {
    return fl(this.ids, this.coords, t, a, r, this.nodeSize);
  }
}
const pl = {
  minZoom: 0,
  maxZoom: 16,
  minPoints: 2,
  radius: 40,
  extent: 512,
  nodeSize: 64,
  log: !1,
  generateId: !1,
  reduce: null,
  map: (e) => e
}, me = Math.fround || ((e) => (t) => (e[0] = +t, e[0]))(new Float32Array(1));
class wl {
  constructor(t) {
    this.options = te(Object.create(pl), t), this.trees = new Array(this.options.maxZoom + 1);
  }
  load(t) {
    const { log: a, minZoom: r, maxZoom: n, nodeSize: i } = this.options;
    a && console.time("total time");
    const o = `prepare ${t.length} points`;
    a && console.time(o), this.points = t;
    let u = [];
    for (let s = 0; s < t.length; s++)
      !t[s].geometry || u.push(yl(t[s], s));
    this.trees[n + 1] = new Fe(u, qe, He, i, Float32Array), a && console.timeEnd(o);
    for (let s = n; s >= r; s--) {
      const l = +Date.now();
      u = this._cluster(u, s), this.trees[s] = new Fe(u, qe, He, i, Float32Array), a && console.log("z%d: %d clusters in %dms", s, u.length, +Date.now() - l);
    }
    return a && console.timeEnd("total time"), this;
  }
  getClusters(t, a) {
    let r = ((t[0] + 180) % 360 + 360) % 360 - 180;
    const n = Math.max(-90, Math.min(90, t[1]));
    let i = t[2] === 180 ? 180 : ((t[2] + 180) % 360 + 360) % 360 - 180;
    const o = Math.max(-90, Math.min(90, t[3]));
    if (t[2] - t[0] >= 360)
      r = -180, i = 180;
    else if (r > i) {
      const m = this.getClusters([r, n, 180, o], a), d = this.getClusters([-180, n, i, o], a);
      return m.concat(d);
    }
    const u = this.trees[this._limitZoom(a)], s = u.range(oe(r), se(o), oe(i), se(n)), l = [];
    for (const m of s) {
      const d = u.points[m];
      l.push(d.numPoints ? Ie(d) : this.points[d.index]);
    }
    return l;
  }
  getChildren(t) {
    const a = this._getOriginId(t), r = this._getOriginZoom(t), n = "No cluster with the specified id.", i = this.trees[r];
    if (!i)
      throw new Error(n);
    const o = i.points[a];
    if (!o)
      throw new Error(n);
    const u = this.options.radius / (this.options.extent * Math.pow(2, r - 1)), s = i.within(o.x, o.y, u), l = [];
    for (const m of s) {
      const d = i.points[m];
      d.parentId === t && l.push(d.numPoints ? Ie(d) : this.points[d.index]);
    }
    if (l.length === 0)
      throw new Error(n);
    return l;
  }
  getLeaves(t, a, r) {
    a = a || 10, r = r || 0;
    const n = [];
    return this._appendLeaves(n, t, a, r, 0), n;
  }
  getTile(t, a, r) {
    const n = this.trees[this._limitZoom(t)], i = Math.pow(2, t), { extent: o, radius: u } = this.options, s = u / o, l = (r - s) / i, m = (r + 1 + s) / i, d = {
      features: []
    };
    return this._addTileFeatures(
      n.range((a - s) / i, l, (a + 1 + s) / i, m),
      n.points,
      a,
      r,
      i,
      d
    ), a === 0 && this._addTileFeatures(
      n.range(1 - s / i, l, 1, m),
      n.points,
      i,
      r,
      i,
      d
    ), a === i - 1 && this._addTileFeatures(
      n.range(0, l, s / i, m),
      n.points,
      -1,
      r,
      i,
      d
    ), d.features.length ? d : null;
  }
  getClusterExpansionZoom(t) {
    let a = this._getOriginZoom(t) - 1;
    for (; a <= this.options.maxZoom; ) {
      const r = this.getChildren(t);
      if (a++, r.length !== 1)
        break;
      t = r[0].properties.cluster_id;
    }
    return a;
  }
  _appendLeaves(t, a, r, n, i) {
    const o = this.getChildren(a);
    for (const u of o) {
      const s = u.properties;
      if (s && s.cluster ? i + s.point_count <= n ? i += s.point_count : i = this._appendLeaves(t, s.cluster_id, r, n, i) : i < n ? i++ : t.push(u), t.length === r)
        break;
    }
    return i;
  }
  _addTileFeatures(t, a, r, n, i, o) {
    for (const u of t) {
      const s = a[u], l = s.numPoints;
      let m, d, h;
      if (l)
        m = rt(s), d = s.x, h = s.y;
      else {
        const v = this.points[s.index];
        m = v.properties, d = oe(v.geometry.coordinates[0]), h = se(v.geometry.coordinates[1]);
      }
      const M = {
        type: 1,
        geometry: [[
          Math.round(this.options.extent * (d * i - r)),
          Math.round(this.options.extent * (h * i - n))
        ]],
        tags: m
      };
      let w;
      l ? w = s.id : this.options.generateId ? w = s.index : this.points[s.index].id && (w = this.points[s.index].id), w !== void 0 && (M.id = w), o.features.push(M);
    }
  }
  _limitZoom(t) {
    return Math.max(this.options.minZoom, Math.min(Math.floor(+t), this.options.maxZoom + 1));
  }
  _cluster(t, a) {
    const r = [], { radius: n, extent: i, reduce: o, minPoints: u } = this.options, s = n / (i * Math.pow(2, a));
    for (let l = 0; l < t.length; l++) {
      const m = t[l];
      if (m.zoom <= a)
        continue;
      m.zoom = a;
      const d = this.trees[a + 1], h = d.within(m.x, m.y, s), M = m.numPoints || 1;
      let w = M;
      for (const v of h) {
        const p = d.points[v];
        p.zoom > a && (w += p.numPoints || 1);
      }
      if (w > M && w >= u) {
        let v = m.x * M, p = m.y * M, k = o && M > 1 ? this._map(m, !0) : null;
        const W = (l << 5) + (a + 1) + this.points.length;
        for (const z of h) {
          const E = d.points[z];
          if (E.zoom <= a)
            continue;
          E.zoom = a;
          const B = E.numPoints || 1;
          v += E.x * B, p += E.y * B, E.parentId = W, o && (k || (k = this._map(m, !0)), o(k, this._map(E)));
        }
        m.parentId = W, r.push(bl(v / w, p / w, W, w, k));
      } else if (r.push(m), w > 1)
        for (const v of h) {
          const p = d.points[v];
          p.zoom <= a || (p.zoom = a, r.push(p));
        }
    }
    return r;
  }
  _getOriginId(t) {
    return t - this.points.length >> 5;
  }
  _getOriginZoom(t) {
    return (t - this.points.length) % 32;
  }
  _map(t, a) {
    if (t.numPoints)
      return a ? te({}, t.properties) : t.properties;
    const r = this.points[t.index].properties, n = this.options.map(r);
    return a && n === r ? te({}, n) : n;
  }
}
function bl(e, t, a, r, n) {
  return {
    x: me(e),
    y: me(t),
    zoom: 1 / 0,
    id: a,
    parentId: -1,
    numPoints: r,
    properties: n
  };
}
function yl(e, t) {
  const [a, r] = e.geometry.coordinates;
  return {
    x: me(oe(a)),
    y: me(se(r)),
    zoom: 1 / 0,
    index: t,
    parentId: -1
  };
}
function Ie(e) {
  return {
    type: "Feature",
    id: e.id,
    properties: rt(e),
    geometry: {
      type: "Point",
      coordinates: [Ml(e.x), Pl(e.y)]
    }
  };
}
function rt(e) {
  const t = e.numPoints, a = t >= 1e4 ? `${Math.round(t / 1e3)}k` : t >= 1e3 ? `${Math.round(t / 100) / 10}k` : t;
  return te(te({}, e.properties), {
    cluster: !0,
    cluster_id: e.id,
    point_count: t,
    point_count_abbreviated: a
  });
}
function oe(e) {
  return e / 360 + 0.5;
}
function se(e) {
  const t = Math.sin(e * Math.PI / 180), a = 0.5 - 0.25 * Math.log((1 + t) / (1 - t)) / Math.PI;
  return a < 0 ? 0 : a > 1 ? 1 : a;
}
function Ml(e) {
  return (e - 0.5) * 360;
}
function Pl(e) {
  const t = (180 - e * 360) * Math.PI / 180;
  return 360 * Math.atan(Math.exp(t)) / Math.PI - 90;
}
function te(e, t) {
  for (const a in t)
    e[a] = t[a];
  return e;
}
function qe(e) {
  return e.x;
}
function He(e) {
  return e.y;
}
var Ge = function e(t, a) {
  if (t === a)
    return !0;
  if (t && a && typeof t == "object" && typeof a == "object") {
    if (t.constructor !== a.constructor)
      return !1;
    var r, n, i;
    if (Array.isArray(t)) {
      if (r = t.length, r != a.length)
        return !1;
      for (n = r; n-- !== 0; )
        if (!e(t[n], a[n]))
          return !1;
      return !0;
    }
    if (t.constructor === RegExp)
      return t.source === a.source && t.flags === a.flags;
    if (t.valueOf !== Object.prototype.valueOf)
      return t.valueOf() === a.valueOf();
    if (t.toString !== Object.prototype.toString)
      return t.toString() === a.toString();
    if (i = Object.keys(t), r = i.length, r !== Object.keys(a).length)
      return !1;
    for (n = r; n-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(a, i[n]))
        return !1;
    for (n = r; n-- !== 0; ) {
      var o = i[n];
      if (!e(t[o], a[o]))
        return !1;
    }
    return !0;
  }
  return t !== t && a !== a;
};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function kl(e, t) {
  var a = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (a[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var n = 0, r = Object.getOwnPropertySymbols(e); n < r.length; n++)
      t.indexOf(r[n]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[n]) && (a[r[n]] = e[r[n]]);
  return a;
}
class Pe {
  constructor({ markers: t, position: a }) {
    this.markers = t, a && (a instanceof google.maps.LatLng ? this._position = a : this._position = new google.maps.LatLng(a));
  }
  get bounds() {
    if (!(this.markers.length === 0 && !this._position))
      return this.markers.reduce((t, a) => t.extend(a.getPosition()), new google.maps.LatLngBounds(this._position, this._position));
  }
  get position() {
    return this._position || this.bounds.getCenter();
  }
  get count() {
    return this.markers.filter((t) => t.getVisible()).length;
  }
  push(t) {
    this.markers.push(t);
  }
  delete() {
    this.marker && (this.marker.setMap(null), delete this.marker), this.markers.length = 0;
  }
}
class Dl {
  constructor({ maxZoom: t = 16 }) {
    this.maxZoom = t;
  }
  noop({ markers: t }) {
    return $l(t);
  }
}
const $l = (e) => e.map((a) => new Pe({
  position: a.getPosition(),
  markers: [a]
}));
class Cl extends Dl {
  constructor(t) {
    var { maxZoom: a, radius: r = 60 } = t, n = kl(t, ["maxZoom", "radius"]);
    super({ maxZoom: a }), this.superCluster = new wl(Object.assign({ maxZoom: this.maxZoom, radius: r }, n)), this.state = { zoom: null };
  }
  calculate(t) {
    let a = !1;
    if (!Ge(t.markers, this.markers)) {
      a = !0, this.markers = [...t.markers];
      const n = this.markers.map((i) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            i.getPosition().lng(),
            i.getPosition().lat()
          ]
        },
        properties: { marker: i }
      }));
      this.superCluster.load(n);
    }
    const r = { zoom: t.map.getZoom() };
    return a || this.state.zoom > this.maxZoom && r.zoom > this.maxZoom || (a = a || !Ge(this.state, r)), this.state = r, a && (this.clusters = this.cluster(t)), { clusters: this.clusters, changed: a };
  }
  cluster({ map: t }) {
    return this.superCluster.getClusters([-180, -90, 180, 90], Math.round(t.getZoom())).map(this.transformCluster.bind(this));
  }
  transformCluster({ geometry: { coordinates: [t, a] }, properties: r }) {
    if (r.cluster)
      return new Pe({
        markers: this.superCluster.getLeaves(r.cluster_id, 1 / 0).map((n) => n.properties.marker),
        position: new google.maps.LatLng({ lat: a, lng: t })
      });
    {
      const n = r.marker;
      return new Pe({
        markers: [n],
        position: n.getPosition()
      });
    }
  }
}
class Wl {
  constructor(t, a) {
    this.markers = { sum: t.length };
    const r = a.map((i) => i.count), n = r.reduce((i, o) => i + o, 0);
    this.clusters = {
      count: a.length,
      markers: {
        mean: n / a.length,
        sum: n,
        min: Math.min(...r),
        max: Math.max(...r)
      }
    };
  }
}
class Sl {
  render({ count: t, position: a }, r) {
    const n = t > Math.max(10, r.clusters.markers.mean) ? "#ff0000" : "#0000ff", i = window.btoa(`
  <svg fill="${n}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
    <circle cx="120" cy="120" opacity=".6" r="70" />
    <circle cx="120" cy="120" opacity=".3" r="90" />
    <circle cx="120" cy="120" opacity=".2" r="110" />
  </svg>`);
    return new google.maps.Marker({
      position: a,
      icon: {
        url: `data:image/svg+xml;base64,${i}`,
        scaledSize: new google.maps.Size(45, 45)
      },
      label: {
        text: String(t),
        color: "rgba(255,255,255,0.9)",
        fontSize: "12px"
      },
      title: `Cluster of ${t} markers`,
      zIndex: Number(google.maps.Marker.MAX_ZINDEX) + t
    });
  }
}
function Tl(e, t) {
  for (let a in t.prototype)
    e.prototype[a] = t.prototype[a];
}
class Ce {
  constructor() {
    Tl(Ce, google.maps.OverlayView);
  }
}
var ae;
(function(e) {
  e.CLUSTERING_BEGIN = "clusteringbegin", e.CLUSTERING_END = "clusteringend", e.CLUSTER_CLICK = "click";
})(ae || (ae = {}));
const Ol = (e, t, a) => {
  a.fitBounds(t.bounds);
};
class Nl extends Ce {
  constructor({ map: t, markers: a = [], algorithm: r = new Cl({}), renderer: n = new Sl(), onClusterClick: i = Ol }) {
    super(), this.markers = [...a], this.clusters = [], this.algorithm = r, this.renderer = n, this.onClusterClick = i, t && this.setMap(t);
  }
  addMarker(t, a) {
    this.markers.includes(t) || (this.markers.push(t), a || this.render());
  }
  addMarkers(t, a) {
    t.forEach((r) => {
      this.addMarker(r, !0);
    }), a || this.render();
  }
  removeMarker(t, a) {
    const r = this.markers.indexOf(t);
    return r === -1 ? !1 : (t.setMap(null), this.markers.splice(r, 1), a || this.render(), !0);
  }
  removeMarkers(t, a) {
    let r = !1;
    return t.forEach((n) => {
      r = this.removeMarker(n, !0) || r;
    }), r && !a && this.render(), r;
  }
  clearMarkers(t) {
    this.markers.length = 0, t || this.render();
  }
  render() {
    const t = this.getMap();
    if (t instanceof google.maps.Map && this.getProjection()) {
      google.maps.event.trigger(this, ae.CLUSTERING_BEGIN, this);
      const { clusters: a, changed: r } = this.algorithm.calculate({
        markers: this.markers,
        map: t,
        mapCanvasProjection: this.getProjection()
      });
      (r || r == null) && (this.reset(), this.clusters = a, this.renderClusters()), google.maps.event.trigger(this, ae.CLUSTERING_END, this);
    }
  }
  onAdd() {
    this.idleListener = this.getMap().addListener("idle", this.render.bind(this)), this.render();
  }
  onRemove() {
    google.maps.event.removeListener(this.idleListener), this.reset();
  }
  reset() {
    this.markers.forEach((t) => t.setMap(null)), this.clusters.forEach((t) => t.delete()), this.clusters = [];
  }
  renderClusters() {
    const t = new Wl(this.markers, this.clusters), a = this.getMap();
    this.clusters.forEach((r) => {
      r.markers.length === 1 ? r.marker = r.markers[0] : (r.marker = this.renderer.render(r, t), this.onClusterClick && r.marker.addListener(
        "click",
        (n) => {
          google.maps.event.trigger(this, ae.CLUSTER_CLICK, r), this.onClusterClick(n, r, a);
        }
      )), r.marker.setMap(a);
    });
  }
}
var xl = function e(t, a) {
  if (t === a)
    return !0;
  if (t && a && typeof t == "object" && typeof a == "object") {
    if (t.constructor !== a.constructor)
      return !1;
    var r, n, i;
    if (Array.isArray(t)) {
      if (r = t.length, r != a.length)
        return !1;
      for (n = r; n-- !== 0; )
        if (!e(t[n], a[n]))
          return !1;
      return !0;
    }
    if (t.constructor === RegExp)
      return t.source === a.source && t.flags === a.flags;
    if (t.valueOf !== Object.prototype.valueOf)
      return t.valueOf() === a.valueOf();
    if (t.toString !== Object.prototype.toString)
      return t.toString() === a.toString();
    if (i = Object.keys(t), r = i.length, r !== Object.keys(a).length)
      return !1;
    for (n = r; n-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(a, i[n]))
        return !1;
    for (n = r; n-- !== 0; ) {
      var o = i[n];
      if (!e(t[o], a[o]))
        return !1;
    }
    return !0;
  }
  return t !== t && a !== a;
};
const Ye = "__googleMapsScriptId";
var J;
(function(e) {
  e[e.INITIALIZED = 0] = "INITIALIZED", e[e.LOADING = 1] = "LOADING", e[e.SUCCESS = 2] = "SUCCESS", e[e.FAILURE = 3] = "FAILURE";
})(J || (J = {}));
class X {
  constructor({ apiKey: t, channel: a, client: r, id: n = Ye, libraries: i = [], language: o, region: u, version: s, mapIds: l, nonce: m, retries: d = 3, url: h = "https://maps.googleapis.com/maps/api/js" }) {
    if (this.CALLBACK = "__googleMapsCallback", this.callbacks = [], this.done = !1, this.loading = !1, this.errors = [], this.version = s, this.apiKey = t, this.channel = a, this.client = r, this.id = n || Ye, this.libraries = i, this.language = o, this.region = u, this.mapIds = l, this.nonce = m, this.retries = d, this.url = h, X.instance) {
      if (!xl(this.options, X.instance.options))
        throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(X.instance.options)}`);
      return X.instance;
    }
    X.instance = this;
  }
  get options() {
    return {
      version: this.version,
      apiKey: this.apiKey,
      channel: this.channel,
      client: this.client,
      id: this.id,
      libraries: this.libraries,
      language: this.language,
      region: this.region,
      mapIds: this.mapIds,
      nonce: this.nonce,
      url: this.url
    };
  }
  get status() {
    return this.errors.length ? J.FAILURE : this.done ? J.SUCCESS : this.loading ? J.LOADING : J.INITIALIZED;
  }
  get failed() {
    return this.done && !this.loading && this.errors.length >= this.retries + 1;
  }
  createUrl() {
    let t = this.url;
    return t += `?callback=${this.CALLBACK}`, this.apiKey && (t += `&key=${this.apiKey}`), this.channel && (t += `&channel=${this.channel}`), this.client && (t += `&client=${this.client}`), this.libraries.length > 0 && (t += `&libraries=${this.libraries.join(",")}`), this.language && (t += `&language=${this.language}`), this.region && (t += `&region=${this.region}`), this.version && (t += `&v=${this.version}`), this.mapIds && (t += `&map_ids=${this.mapIds.join(",")}`), t;
  }
  deleteScript() {
    const t = document.getElementById(this.id);
    t && t.remove();
  }
  load() {
    return this.loadPromise();
  }
  loadPromise() {
    return new Promise((t, a) => {
      this.loadCallback((r) => {
        r ? a(r.error) : t(window.google);
      });
    });
  }
  loadCallback(t) {
    this.callbacks.push(t), this.execute();
  }
  setScript() {
    if (document.getElementById(this.id)) {
      this.callback();
      return;
    }
    const t = this.createUrl(), a = document.createElement("script");
    a.id = this.id, a.type = "text/javascript", a.src = t, a.onerror = this.loadErrorCallback.bind(this), a.defer = !0, a.async = !0, this.nonce && (a.nonce = this.nonce), document.head.appendChild(a);
  }
  reset() {
    this.deleteScript(), this.done = !1, this.loading = !1, this.errors = [], this.onerrorEvent = null;
  }
  resetIfRetryingFailed() {
    this.failed && this.reset();
  }
  loadErrorCallback(t) {
    if (this.errors.push(t), this.errors.length <= this.retries) {
      const a = this.errors.length * Math.pow(2, this.errors.length);
      console.log(`Failed to load Google Maps script, retrying in ${a} ms.`), setTimeout(() => {
        this.deleteScript(), this.setScript();
      }, a);
    } else
      this.onerrorEvent = t, this.callback();
  }
  setCallback() {
    window.__googleMapsCallback = this.callback.bind(this);
  }
  callback() {
    this.done = !0, this.loading = !1, this.callbacks.forEach((t) => {
      t(this.onerrorEvent);
    }), this.callbacks = [];
  }
  execute() {
    if (this.resetIfRetryingFailed(), this.done)
      this.callback();
    else {
      if (window.google && window.google.maps && window.google.maps.version) {
        console.warn("Google Maps already loaded outside @googlemaps/js-api-loader.This may result in undesirable behavior as options and script parameters may not match."), this.callback();
        return;
      }
      this.loading || (this.loading = !0, this.setCallback(), this.setScript());
    }
  }
}
const El = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAA1CAYAAADh5qNwAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMXSURBVHgB7ZnPbxJBFMcfajRBRTQYTdWKBw1JL403kh7w0niDgz+O/qLXCukfUHrzUtt4LUq96qF4q73YJo29UQ+ijcZASjWaElsw4u/gm2WHDhsg+2ZnGw7zSV52ZoHd+c6bX+8BoNFoNBqNRqNpgwdcoF6vB/ESRYugDaIFhY+Lpi2iLXk8nkXoZVBMBO1FnUYB7Qb0GswzEmLaiQuCAhwPP2xIDC8ZND+/V639hdfrNXi6XIaXa9+MerX2z/hsoN8LpwMH4PJFP9pR8Hn3WR85gUMyBQ5wJAoF3YSGoCYzC5/hfvZjU0Q3fN69EB8+CSPDJ6ziHAmTFmV6aI7XS+VfcOfBO8iv/wAqZwL74eHoBcOLAtLCpESZY38VzCGXx6F2GwVtlH+DE6bj5+Dq0HHx1iWZ1XEPyDEFpiDmIRWCGIl0AVZwDgpksAP9QIQsypxHMV6/cu+tEkGcZPqDsbCYBNHuAhEZTzX3lCfLm0oFMUr4vMnsJ/FWguotkihzLkV4fRJXOTdI4woqeIsJGqT8nuqpKC/M57aUe0lkZuGLWCWdOKiiIrzARLmJZcGIAAGqqCAvvMFl3E1W1qot76XMK6qo5tjOuyyKsYHbhcARsInsPtXTaFHQCO4M2EnbbSzvqIBNqKJe8UI4dBjcZKD/oFgt4hlwG2wiLcpyolZOOHSo7XvtQBW1xAvXhwJGPOQWIxhnCWSBAEmUGQYwM4K6OAZ3bnANO0yYT2zYPSP8XGr1e8wLrDdVLxiss8Zip8RbWcp8YpBF4QtmwRzjrAGPRs+DSsZifWJHFdEmgIjsPpXkBbZgTGHEqgLmoXjrXEphJxaBiJMcRQIaEbBBI6R/bz3a2KIx5PqsgqZRUBIkcJpNGsdLitdZaM9iLJYas0s45DNyE5a5OYuCboEkKvJ+LcIYTNx8bhue575aQwiDnbzfsXabuLSHlFJvpJsLnVKvpc2fTat8/9Ppa1to5HyE67BGdRPXRcy4TNZoV8EGRtEyaKsdhBTQ5sxOUC7Glb9yrGDDzwrVCnUz1Wg0Go1Go9l9/gNvkCMbp4Ut3AAAAABJRU5ErkJggg==";
function jl(e = {
  apiKey: null,
  mapId: null,
  markersData: x([]),
  center: x(null),
  defaultPinImg: null,
  defaultLocationImg: null,
  clusterOptions: null,
  markerSize: 50,
  hasCluster: !0,
  fitMarkers: !1,
  tracking: null,
  zoom: 15,
  mapOptions: null,
  dateLocale: x("en"),
  labelBuyButton: x("Buy Tickets"),
  labelDirectionButton: x("View on Google Maps"),
  ariaLocateButton: "Your Location"
}) {
  const { pushTracking: t } = he();
  let a = null, r = null, n = [], i = null, o = null;
  const u = new X({
    apiKey: e.apiKey,
    version: "weekly"
  }), s = () => new Promise(async (c) => {
    if (!e.mapOptions)
      throw new Error("[useGoogleMap.js] no map options");
    await u.load(), a = new google.maps.Map(
      document.getElementById(e.mapId),
      e.mapOptions
    ), r = new google.maps.InfoWindow(), google.maps.event.addListenerOnce(a, "idle", () => {
      c(!0);
    });
  }), l = () => {
    n.forEach((c) => c.setMap(null)), n = [];
  }, m = () => {
    l();
    const c = [...e.markersData.value];
    if (!c)
      return;
    const S = [];
    c.forEach((C) => {
      if (!C || typeof C.visible < "u" && !C.visible)
        return;
      let D = { ...C }, re = null;
      D.pinImg ? re = {
        url: D.pinImg,
        scaledSize: new google.maps.Size(e.markerSize, e.markerSize),
        labelOrigin: new google.maps.Point(
          e.markerSize / 2,
          e.markerSize + 4
        )
      } : D.category && D.category.pinImg ? re = {
        url: D.category.pinImg,
        scaledSize: new google.maps.Size(e.markerSize, e.markerSize),
        labelOrigin: new google.maps.Point(
          e.markerSize / 2,
          e.markerSize + 4
        )
      } : e.defaultPinImg && (re = {
        url: e.defaultPinImg,
        scaledSize: new google.maps.Size(e.markerSize, e.markerSize),
        labelOrigin: new google.maps.Point(
          e.markerSize / 2,
          e.markerSize + 4
        )
      });
      const nt = D.pinLabel ? {
        text: D.pinLabel,
        color: "#000",
        fontSize: "14px",
        fontWeight: "bold"
      } : void 0;
      if (D.showName && D.latitude && D.longitude && parseFloat(D.latitude) != NaN && parseFloat(D.longitude) != NaN && parseFloat(D.latitude) >= -90 && parseFloat(D.latitude) <= 90 && parseFloat(D.longitude) >= -180 && parseFloat(D.longitude) <= 180) {
        const it = new google.maps.LatLng(
          parseFloat(D.latitude),
          parseFloat(D.longitude)
        ), We = new google.maps.Marker({
          position: it,
          icon: re,
          title: `${D.showName}`,
          optimized: !1,
          map: a,
          label: nt
        });
        We.info = D, S.push(We);
      }
    }), o = new google.maps.LatLngBounds(), S.forEach((C) => {
      o.extend(C.getPosition()), C.addListener("click", (D) => {
        W(C), C && C.info && C.info.showName && t(e.tracking?.clickMarker, {
          "<show_name>": C.info.showName,
          "<city_name>": C.info.city
        });
      });
    }), n = S;
  }, d = () => {
    i && i.clearMarkers(), i = null;
  }, h = () => {
    d();
    const c = {
      render: ({ count: S, position: C }) => new google.maps.Marker({
        label: { text: String(S), color: "white", fontSize: "14px" },
        position: C,
        icon: {
          url: e.clusterOptions && e.clusterOptions[0] ? e.clusterOptions[0].url : "https://raw.githubusercontent.com/googlemaps/js-marker-clusterer/gh-pages/images/m1.png",
          scaledSize: e.clusterOptions && e.clusterOptions[0] ? new google.maps.Size(
            e.clusterOptions[0].width,
            e.clusterOptions[0].height
          ) : new google.maps.Size(53, 53),
          labelOrigin: e.clusterOptions && e.clusterOptions[0] ? new google.maps.Point(
            e.clusterOptions[0].width / 2,
            e.clusterOptions[0].height / 2.5
          ) : new google.maps.Point(26, 21)
        },
        zIndex: Number(google.maps.Marker.MAX_ZINDEX) + S
      })
    };
    i = new Nl({
      map: a,
      markers: n,
      renderer: c
    });
  }, M = () => {
    if (!(!a || !o)) {
      a.fitBounds(o);
      var c = k();
      c > 12 && a.setZoom(12);
    }
  }, w = (c) => {
    !a || !c || a.panTo(c.getPosition());
  }, v = (c, S) => {
    !a || !c || !S || a.panTo({ lat: c, lng: S });
  }, p = (c) => {
    !a || !c || a.setZoom(parseFloat(c));
  }, k = () => {
    if (!!a)
      return a.getZoom();
  }, W = (c) => {
    if (!c || !c.info)
      return;
    const S = c.info.showName ? c.info.showName.split('"').join("") : "", C = c.info.showThumbnail ? c.info.showThumbnail : c.info.showImage, D = {
      pixelOffset: c ? null : new google.maps.Size(0, -50),
      content: `<div class="marker marker--${c.info.id}">
            <div class="marker__image-wrapper">
              ${C ? ` <img class="marker__image" width="590" height="590" src="${C}" />` : ""}
              <div class="marker__content">
                <h2 class="marker__title">${c.info.showName}</h2>
                ${c.info.city ? `<p class="marker__city">${c.info.city}</p>` : ""}
                ${c.info.facility ? `<p class="marker__venue">${c.info.facility}</p>` : ""}
                ${e.dateLocale && c.info.startDate && c.info.endDate ? `<p class="marker__date">${H(
        new Date(c.info.startDate),
        "PPP",
        { locale: de[e.dateLocale.value] }
      )} - ${H(new Date(c.info.endDate), "PPP", {
        locale: de[e.dateLocale.value]
      })}</p>` : ""}
              </div>
            </div>
            <div class="marker__buttons">
              <a class="marker__cta marker__cta--small cta-btn cta-btn--ghost cta-btn--full-width" href="https://www.google.com/maps/dir/?api=1&destination=${c.info.latitude},${c.info.longitude}&travelmode=driving" onclick='window.mapTrackingViewGmap("${S}", "${c.info.city}")'>
      ${e.labelDirectionButton.value}
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.12498 1.875L10.1831 3.93313L5.80811 8.30812L6.69186 9.19187L11.0669 4.81687L13.125 6.875V1.875H8.12498Z" fill="white"/>
                  <path d="M11.875 11.875H3.125V3.125H7.5L6.25 1.875H3.125C2.43562 1.875 1.875 2.43562 1.875 3.125V11.875C1.875 12.5644 2.43562 13.125 3.125 13.125H11.875C12.5644 13.125 13.125 12.5644 13.125 11.875V8.75L11.875 7.5V11.875Z" fill="white"/>
                </svg>
              </a>
              ${c.info.ticketPageUrl || c.info.showPageUrl ? `<a class="marker__cta cta-btn cta-btn--grey cta-btn--full-width" href="${c.info.ticketPageUrl || c.info.showPageUrl}" onclick='window.mapTrackingBuyTicket("${S}", "${c.info.city}", "${e.labelBuyButton.value}", "${c.info.ticketPageUrl || c.info.showPageUrl}")'>
                      ${e.labelBuyButton.value}
                    </a>` : ""}

            </div>
            </div>`
    };
    z(c, D);
  }, z = (c, S) => {
    r.setOptions(S), r.open({
      map: a,
      anchor: c
    });
  }, E = () => {
    r.close();
  }, B = () => {
    const c = document.createElement("button");
    c.ariaLabel = e.ariaLocateButton, c.innerHTML = `
    <svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.3873 0.939606C9.06938 0.171571 7.53429 -0.138686 6.0215 0.0572265C4.50872 0.253139 3.1033 0.944205 2.02447 2.02264C0.945634 3.10107 0.25404 4.50622 0.0575599 6.01893C-0.13892 7.53165 0.170761 9.06685 0.938302 10.3851L6.28307 19.6372C6.33025 19.7198 6.39334 19.7922 6.46869 19.8503C6.54404 19.9083 6.63016 19.9508 6.72205 19.9754C6.87609 20.0166 7.0394 20.0058 7.18669 19.9448C7.33398 19.8837 7.45702 19.7758 7.53673 19.6377L12.878 10.3881C13.7983 8.80437 14.053 6.92023 13.5861 5.14895C13.1192 3.37768 11.9688 1.86389 10.3873 0.939606ZM12.3681 6.90817C12.3685 7.87495 12.112 8.82447 11.6248 9.65954L6.90737 17.8296L2.18842 9.65701C1.70554 8.82753 1.44964 7.88551 1.44647 6.92573C1.44329 5.96594 1.69295 5.02225 2.17033 4.1896C2.6477 3.35695 3.33596 2.66471 4.16584 2.18253C4.99572 1.70036 5.93796 1.44526 6.89775 1.44289C7.37068 1.44313 7.84159 1.50457 8.29875 1.62568C9.46505 1.93308 10.4968 2.61793 11.2329 3.57336C11.9691 4.52878 12.3682 5.70103 12.3681 6.90715V6.90817Z" fill="black"/>
      <path d="M6.90737 3.43528C5.98644 3.43528 5.10322 3.80112 4.45203 4.45232C3.80083 5.10352 3.43499 5.98673 3.43499 6.90766C3.43499 7.82859 3.80083 8.71181 4.45203 9.363C5.10322 10.0142 5.98644 10.38 6.90737 10.38C7.8283 10.38 8.71151 10.0142 9.36271 9.363C10.0139 8.71181 10.3797 7.82859 10.3797 6.90766C10.3797 5.98673 10.0139 5.10352 9.36271 4.45232C8.71151 3.80112 7.8283 3.43528 6.90737 3.43528ZM6.90737 8.93347C6.5068 8.93347 6.11523 8.81469 5.78217 8.59214C5.44911 8.3696 5.18952 8.05329 5.03623 7.68322C4.88294 7.31314 4.84284 6.90592 4.92098 6.51305C4.99913 6.12018 5.19202 5.75931 5.47527 5.47606C5.75851 5.19282 6.11938 4.99993 6.51225 4.92178C6.90512 4.84364 7.31234 4.88374 7.68242 5.03703C8.05249 5.19032 8.3688 5.44991 8.59134 5.78297C8.81389 6.11603 8.93267 6.5076 8.93267 6.90817C8.93267 7.44531 8.71929 7.96045 8.33947 8.34027C7.95965 8.72009 7.44451 8.93347 6.90737 8.93347Z" fill="black"/>
    </svg>`, c.classList.add("location-button"), a.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(c), c.addEventListener("click", () => {
      navigator.geolocation ? navigator.geolocation.getCurrentPosition(
        (S) => {
          const C = {
            lat: S.coords.latitude,
            lng: S.coords.longitude
          }, D = {
            url: e.defaultLocationImg ? e.defaultLocationImg : El,
            scaledSize: new google.maps.Size(30, 30)
          };
          new google.maps.Marker({
            position: C,
            optimized: !1,
            map: a,
            icon: D
          }), a.setCenter(C), a.setZoom(8);
        },
        () => {
          console.warn("Error: The Geolocation service failed.");
        }
      ) : console.warn("Error: Your browser doesn't support geolocation.");
    });
  }, Z = () => {
    e.fitMarkers ? n && n.length > 0 ? M() : (p(2), v(40.866667, 34.566667)) : e.center.value && e.zoom && (p(e.zoom), v(e.center.value.lat, e.center.value.lng));
  };
  return ke(() => {
    window.mapTrackingBuyTicket = (c, S, C, D) => {
      t(e.tracking?.clickBuy, {
        "<show_name>": c,
        "<city_name>": S,
        "<link_text>": C,
        "<link_url>": D
      });
    }, window.mapTrackingViewGmap = (c, S) => {
      t(e.tracking?.clickViewGmap, {
        "<show_name>": c,
        "<city_name>": S
      });
    }, dt(async () => {
      try {
        await s(), B(), e.markersData.value.length > 0 && (m(), e.hasCluster && h(), Z()), we(e.markersData, () => {
          m(), e.hasCluster && h(), Z();
        }), we(e.center, () => {
          Z();
        });
      } catch (c) {
        console.warn("[useGoogleMap.js] error loading the sdk", c);
      }
    });
  }), {
    loadMap: s,
    closeInfoWindow: E,
    openInfoWindow: z,
    openShowInfo: W,
    setZoom: p,
    getZoom: k,
    centerOnMarker: w,
    createMarkers: m,
    clearMarkers: l,
    createClusters: h,
    resetMapPosition: Z
  };
}
function Ll(e, t = null) {
  const { pushTracking: a } = he(), r = x(null), n = x(null), i = Be({
    start: null,
    end: null
  }), o = A(() => {
    let d = [];
    return e.value.forEach((h) => {
      d.findIndex((M) => M.value === h.category.value) < 0 && d.push(h.category);
    }), d;
  }), u = A(
    () => [...new Set(e.value.map((d) => d.showName))].map(
      (d) => ({ label: d, value: d })
    )
  ), s = A(() => e.value.filter((d) => {
    let h = !0;
    if (typeof d.visible < "u" && !d.visible)
      return !1;
    if (r.value && (h = Math.min(
      d.showType === r.value,
      h
    )), n.value && n.value !== "all" && (h = Math.min(
      d.showName === n.value,
      h
    )), e.value && i.end) {
      const M = new Date(i.start), w = new Date(i.end), v = new Date(d.startDate), p = new Date(d.endDate);
      h = Math.min(
        Ct(
          { start: M, end: w },
          { start: v, end: p }
        ),
        h
      );
    }
    return h;
  }) || []);
  return {
    showTypes: o,
    showNames: u,
    markersDataResults: s,
    changeCurrentDates: (d) => {
      Object.assign(i, d), d.start && d.end ? a(t?.clickDateSearch) : a(t?.clickDateClear);
    },
    changeCurrentShowName: (d) => {
      n.value = d, a(t?.clickShow, {
        "<show_name>": d
      });
    }
  };
}
const zl = ce({
  name: "InteractiveMap",
  components: {
    DropdownFilters: Mt,
    DateRangePicker: cl
  },
  props: {
    mapTitle: { type: String, required: !1, default: "" },
    mapDescription: { type: String, required: !1, default: "" },
    mapId: { type: String, required: !0 },
    googleMapApiKey: { type: String, required: !0 },
    googleMapStyleId: { type: String, required: !1, default: null },
    zoom: { type: Number, required: !1, default: 15 },
    backgroundColor: { type: String, required: !1, default: "#000000" },
    markersData: { type: Array, required: !1, default: () => [] },
    center: {
      type: Object,
      required: !1,
      default: () => ({ lat: 0, lng: 0 })
    },
    hideFilters: { type: Boolean, required: !1, default: !1 },
    fitMarkers: { type: Boolean, required: !1, default: !1 },
    markerSize: { type: Number, required: !1, default: 50 },
    restriction: { type: Object, required: !1, default: () => null },
    hasCluster: { type: Boolean, required: !1, default: !0 },
    clusterOptions: { type: Array, required: !1, default: null },
    defaultPinImg: { type: String, required: !1, default: null },
    dateLocale: { type: String, required: !1, default: "en" },
    labelBuyButton: { type: String, required: !1, default: "Buy Tickets" },
    labelDirectionButton: {
      type: String,
      required: !1,
      default: "View on Google Maps"
    },
    labelClearButton: { type: String, required: !1, default: "Clear" },
    labelSaveButton: { type: String, required: !1, default: "Save" },
    labelShowNameFilterDefault: {
      type: String,
      required: !1,
      default: "All Shows"
    },
    placeholderShowNameFilter: {
      type: String,
      required: !1,
      default: ""
    },
    labelDatesFilter: {
      type: String,
      required: !1,
      default: "Dates"
    },
    ariaToggleCalendar: {
      type: String,
      required: !1,
      default: "Toggle the calendar"
    },
    ariaSelectDate: { type: String, required: !1, default: "Select " },
    ariaNextMonth: { type: String, required: !1, default: "Next Month" },
    ariaPreviousMonth: {
      type: String,
      required: !1,
      default: "Previous Month"
    },
    ariaLocateButton: {
      type: String,
      required: !1,
      default: "Your Location"
    },
    isLoading: { type: Boolean, required: !1, default: !1 },
    tracking: {
      type: Object,
      required: !1,
      default: null
    }
  },
  setup(e) {
    const t = I(e, "markersData"), a = I(e, "dateLocale"), r = I(e, "labelBuyButton"), n = I(e, "labelDirectionButton"), i = I(e, "center"), {
      showNames: o,
      markersDataResults: u,
      changeCurrentDates: s,
      changeCurrentShowName: l
    } = Ll(t, e.tracking), m = (h) => {
      l(h);
    }, d = (h) => {
      s(h);
    };
    return jl({
      apiKey: e.googleMapApiKey,
      mapId: e.mapId,
      markersData: u,
      center: i,
      zoom: e.zoom,
      defaultPinImg: e.defaultPinImg,
      hasCluster: e.hasCluster,
      markerSize: e.markerSize ? parseInt(e.markerSize) : 50,
      fitMarkers: e.fitMarkers,
      clusterOptions: e.clusterOptions,
      dateLocale: a,
      labelBuyButton: r,
      labelDirectionButton: n,
      ariaLocateButton: e.ariaLocateButton,
      tracking: e.tracking,
      mapOptions: {
        streetViewControl: !1,
        mapTypeControl: !1,
        center: e.center,
        zoom: e.zoom,
        mapId: e.googleMapStyleId,
        restriction: e.restriction,
        backgroundColor: e.backgroundColor
      }
    }), {
      showNames: o,
      onShowNameFilterChange: m,
      onDateChanged: d,
      locale: a
    };
  }
}), _l = { class: "interactive-map__container" }, Al = { class: "interactive-map__split" }, Fl = {
  key: 0,
  class: "filters-wrapper"
}, Il = {
  key: 0,
  class: "interactive-map__title"
}, ql = {
  key: 1,
  class: "interactive-map__description"
}, Hl = { class: "interactive-map__slots" }, Gl = { class: "filters" }, Yl = { class: "interactive-map__wrapper" }, Xl = { class: "interactive-map" }, Bl = ["id"], Vl = {
  key: 0,
  class: "loading"
}, Ul = /* @__PURE__ */ b("div", { class: "spinner" }, null, -1), Rl = [
  Ul
];
function Jl(e, t, a, r, n, i) {
  const o = be("DateRangePicker"), u = be("DropdownFilters");
  return T(), N("div", _l, [
    b("div", Al, [
      e.mapTitle || !e.hideFilters ? (T(), N("div", Fl, [
        e.mapTitle ? (T(), N("h2", Il, _(e.mapTitle), 1)) : F("", !0),
        e.mapDescription ? (T(), N("p", ql, _(e.mapDescription), 1)) : F("", !0),
        b("div", Hl, [
          Ve(e.$slots, "default")
        ]),
        b("div", Gl, [
          e.hideFilters ? F("", !0) : (T(), Se(o, {
            key: 0,
            class: "filters__daterange",
            onDatechanged: e.onDateChanged,
            "date-locale": e.locale,
            "label-clear-button": e.labelClearButton,
            "label-save-button": e.labelSaveButton,
            "label-dates-filter": e.labelDatesFilter,
            "aria-select-date": e.ariaSelectDate,
            "aria-next-month": e.ariaNextMonth,
            "aria-previous-month": e.ariaPreviousMonth,
            "aria-toggle-calendar": e.ariaToggleCalendar,
            "picker-id": e.mapId + "__picker",
            tracking: e.tracking
          }, null, 8, ["onDatechanged", "date-locale", "label-clear-button", "label-save-button", "label-dates-filter", "aria-select-date", "aria-next-month", "aria-previous-month", "aria-toggle-calendar", "picker-id", "tracking"])),
          e.hideFilters ? F("", !0) : (T(), Se(u, {
            key: 1,
            class: "filters__shownames",
            ref: "filterDropdownElement",
            filters: e.showNames,
            "label-default": e.labelShowNameFilterDefault,
            placeholder: e.placeholderShowNameFilter,
            onOnfilterchange: e.onShowNameFilterChange,
            tracking: e.tracking
          }, null, 8, ["filters", "label-default", "placeholder", "onOnfilterchange", "tracking"]))
        ])
      ])) : F("", !0),
      b("div", Yl, [
        b("div", Xl, [
          b("div", {
            id: e.mapId,
            class: "map"
          }, null, 8, Bl),
          Ue(mt, { name: "spinner-fade" }, {
            default: Re(() => [
              e.isLoading ? (T(), N("div", Vl, Rl)) : F("", !0)
            ]),
            _: 1
          })
        ])
      ])
    ])
  ]);
}
const Ql = /* @__PURE__ */ fe(zl, [["render", Jl]]);
function Zl(e, t, a) {
  let r = x(!1);
  const n = x([]), i = A(() => {
    let u = [];
    return n.value.forEach((s, l) => {
      if (a && a.value) {
        const m = a.value.find(
          (d) => d.value == s.showName
        );
        m && (s = { ...s, ...m });
      }
      s && s.runs && s.runs.filter((m) => m !== null).forEach((m) => {
        const d = { ...s, ...m };
        t && t.value && (d.category = t.value.find(
          (h) => h.value == d.showType
        )), delete d.runs, u.push(d);
      });
    }), u;
  }), o = async () => {
    if (!e.value)
      return;
    r.value = !0;
    const u = fetch(e.value).then((s) => s.json()).catch((s) => (console.warn("[InteractiveMapApi] Failed silently because of: ", s), []));
    return n.value = await u.then((s) => (r.value = !1, s && s.content && s.content.Result && s.content.Result.shows ? s.content.Result.shows : [])).catch(() => r.value = !1), Promise.resolve(!0);
  };
  return ke(o), we(e, o), { shows: n, runs: i, isLoading: r, fetchShows: o };
}
const Kl = ce({
  name: "InteractiveMapApi",
  components: {
    InteractiveMap: Ql
  },
  props: {
    apiUrl: { type: String, required: !0 },
    categoriesOverwrite: { type: Array, default: () => [] },
    showsOverwrite: { type: Array, default: () => [] }
  },
  setup(e) {
    const t = I(e, "apiUrl"), a = I(e, "categoriesOverwrite"), r = I(e, "showsOverwrite"), { runs: n, isLoading: i } = Zl(
      t,
      a,
      r
    );
    return {
      runs: n,
      isLoading: i
    };
  }
}), ed = { class: "interactive-map-api" };
function td(e, t, a, r, n, i) {
  const o = be("InteractiveMap");
  return T(), N("div", null, [
    b("div", ed, [
      Ue(o, ct({ ...e.$props, ...e.$attrs }, {
        "markers-data": e.runs,
        "is-loading": e.isLoading
      }), {
        default: Re(() => [
          Ve(e.$slots, "default")
        ]),
        _: 3
      }, 16, ["markers-data", "is-loading"])
    ])
  ]);
}
const rd = /* @__PURE__ */ fe(Kl, [["render", td]]);
export {
  cl as DateRangePicker,
  Mt as DropdownFilters,
  Ql as InteractiveMap,
  rd as InteractiveMapApi,
  Zl as useShowsApi
};
