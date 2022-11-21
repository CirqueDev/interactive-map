import { defineComponent as ce, toRef as I, ref as O, computed as _, openBlock as W, createElementBlock as N, createElementVNode as y, withDirectives as Xe, toDisplayString as z, createCommentVNode as F, Fragment as J, renderList as pe, vModelSelect as ot, reactive as Re, onMounted as De, onBeforeUnmount as st, createTextVNode as ge, normalizeClass as ut, vShow as lt, nextTick as dt, watch as we, resolveComponent as be, renderSlot as Ve, createBlock as We, createVNode as Be, Transition as mt, withCtx as Ue, mergeProps as ct } from "vue";
const he = (e, t) => {
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
    gtm: { type: String, required: !1, default: void 0 }
  },
  setup(e, { emit: t }) {
    const a = I(e, "filters"), r = O(e.placeholder ? "" : "all"), n = (u) => {
      r.value = u, t("onfilterchange", r.value);
    }, i = () => {
      r.value = "", t("onfilterchange", r.value);
    };
    return {
      filtersWithoutEmptyValue: _(
        () => a.value.filter((u) => !!u.value)
      ),
      currentFilter: r,
      resetFilter: i,
      filter: n
    };
  }
}), ft = { class: "dropdown-filters" }, gt = { class: "dropdown-filters__input" }, vt = ["data-gtm"], pt = {
  key: 0,
  value: "",
  selected: "",
  disabled: ""
}, wt = { value: "all" }, bt = ["value"], yt = /* @__PURE__ */ y("svg", {
  class: "dropdown-filters__arrow-down",
  width: "14",
  height: "9",
  viewBox: "0 0 14 9",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ y("path", {
    d: "M1 1L7.10049 7.10049L13.201 1",
    stroke: "black",
    "stroke-width": "2"
  })
], -1);
function Mt(e, t, a, r, n, i) {
  return W(), N("div", ft, [
    y("div", gt, [
      Xe(y("select", {
        name: "dropdown-filters__select",
        class: "dropdown-filters__select",
        onChange: t[0] || (t[0] = (o) => e.filter(o.target.value)),
        "onUpdate:modelValue": t[1] || (t[1] = (o) => e.currentFilter = o),
        "data-gtm": e.gtm
      }, [
        e.placeholder ? (W(), N("option", pt, z(e.placeholder), 1)) : F("", !0),
        y("option", wt, z(e.labelDefault), 1),
        (W(!0), N(J, null, pe(e.filtersWithoutEmptyValue, (o, u) => (W(), N("option", {
          key: u,
          value: o.value
        }, z(o.label || o.value), 9, bt))), 128))
      ], 40, vt), [
        [ot, e.currentFilter]
      ]),
      yt
    ])
  ]);
}
const Pt = /* @__PURE__ */ he(ht, [["render", Mt]]);
function E(e) {
  if (e === null || e === !0 || e === !1)
    return NaN;
  var t = Number(e);
  return isNaN(t) ? t : t < 0 ? Math.ceil(t) : Math.floor(t);
}
function $(e, t) {
  if (t.length < e)
    throw new TypeError(e + " argument" + (e > 1 ? "s" : "") + " required, but only " + t.length + " present");
}
function T(e) {
  $(1, arguments);
  var t = Object.prototype.toString.call(e);
  return e instanceof Date || typeof e == "object" && t === "[object Date]" ? new Date(e.getTime()) : typeof e == "number" || t === "[object Number]" ? new Date(e) : ((typeof e == "string" || t === "[object String]") && typeof console < "u" && (console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"), console.warn(new Error().stack)), new Date(NaN));
}
function Dt(e, t) {
  $(2, arguments);
  var a = T(e), r = E(t);
  return isNaN(r) ? new Date(NaN) : (r && a.setDate(a.getDate() + r), a);
}
function Te(e, t) {
  $(2, arguments);
  var a = T(e), r = E(t);
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
  var a = T(e).getTime(), r = E(t);
  return new Date(a + r);
}
function $t(e, t) {
  $(1, arguments);
  var a = t || {}, r = a.locale, n = r && r.options && r.options.weekStartsOn, i = n == null ? 0 : E(n), o = a.weekStartsOn == null ? i : E(a.weekStartsOn);
  if (!(o >= 0 && o <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  var u = T(e), s = u.getDay(), d = (s < o ? 7 : 0) + s - o;
  return u.setDate(u.getDate() - d), u.setHours(0, 0, 0, 0), u;
}
function Ct(e) {
  var t = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
  return t.setUTCFullYear(e.getFullYear()), e.getTime() - t.getTime();
}
function St(e, t) {
  var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    inclusive: !1
  };
  $(2, arguments);
  var r = e || {}, n = t || {}, i = T(r.start).getTime(), o = T(r.end).getTime(), u = T(n.start).getTime(), s = T(n.end).getTime();
  if (!(i <= o && u <= s))
    throw new RangeError("Invalid interval");
  return a.inclusive ? i <= s && u <= o : i < s && u < o;
}
function Wt(e) {
  return $(1, arguments), e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function Tt(e) {
  if ($(1, arguments), !Wt(e) && typeof e != "number")
    return !1;
  var t = T(e);
  return !isNaN(Number(t));
}
function Ot(e) {
  $(1, arguments);
  var t = T(e), a = t.getMonth();
  return t.setFullYear(t.getFullYear(), a + 1, 0), t.setHours(23, 59, 59, 999), t;
}
function Nt(e) {
  $(1, arguments);
  var t = T(e);
  return t.setDate(1), t.setHours(0, 0, 0, 0), t;
}
var xt = {
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
}, Et = function(e, t, a) {
  var r, n = xt[e];
  return typeof n == "string" ? r = n : t === 1 ? r = n.one : r = n.other.replace("{{count}}", t.toString()), a != null && a.addSuffix ? a.comparison && a.comparison > 0 ? "in " + r : r + " ago" : r;
};
const Lt = Et;
function M(e) {
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
}, zt = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, At = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, _t = {
  date: M({
    formats: jt,
    defaultWidth: "full"
  }),
  time: M({
    formats: zt,
    defaultWidth: "full"
  }),
  dateTime: M({
    formats: At,
    defaultWidth: "full"
  })
};
const Ft = _t;
var It = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, qt = function(e, t, a, r) {
  return It[e];
};
const Je = qt;
function h(e) {
  return function(t, a) {
    var r = a || {}, n = r.context ? String(r.context) : "standalone", i;
    if (n === "formatting" && e.formattingValues) {
      var o = e.defaultFormattingWidth || e.defaultWidth, u = r.width ? String(r.width) : o;
      i = e.formattingValues[u] || e.formattingValues[o];
    } else {
      var s = e.defaultWidth, d = r.width ? String(r.width) : e.defaultWidth;
      i = e.values[d] || e.values[s];
    }
    var l = e.argumentCallback ? e.argumentCallback(t) : t;
    return i[l];
  };
}
var Ht = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, Gt = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, Yt = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
}, Xt = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
}, Rt = {
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
}, Vt = {
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
}, Bt = function(e, t) {
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
  ordinalNumber: Bt,
  era: h({
    values: Ht,
    defaultWidth: "wide"
  }),
  quarter: h({
    values: Gt,
    defaultWidth: "wide",
    argumentCallback: function(e) {
      return e - 1;
    }
  }),
  month: h({
    values: Yt,
    defaultWidth: "wide"
  }),
  day: h({
    values: Xt,
    defaultWidth: "wide"
  }),
  dayPeriod: h({
    values: Rt,
    defaultWidth: "wide",
    formattingValues: Vt,
    defaultFormattingWidth: "wide"
  })
};
const Qe = Ut;
function f(e) {
  return function(t) {
    var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = a.width, n = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], i = t.match(n);
    if (!i)
      return null;
    var o = i[0], u = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], s = Array.isArray(u) ? Qt(u, function(m) {
      return m.test(o);
    }) : Jt(u, function(m) {
      return m.test(o);
    }), d;
    d = e.valueCallback ? e.valueCallback(s) : s, d = a.valueCallback ? a.valueCallback(d) : d;
    var l = t.slice(o.length);
    return {
      value: d,
      rest: l
    };
  };
}
function Jt(e, t) {
  for (var a in e)
    if (e.hasOwnProperty(a) && t(e[a]))
      return a;
}
function Qt(e, t) {
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
var Zt = /^(\d+)(th|st|nd|rd)?/i, Kt = /\d+/i, ea = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, ta = {
  any: [/^b/i, /^(a|c)/i]
}, aa = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, ra = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, na = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, ia = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
}, oa = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, sa = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, ua = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, la = {
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
}, da = {
  ordinalNumber: q({
    matchPattern: Zt,
    parsePattern: Kt,
    valueCallback: function(e) {
      return parseInt(e, 10);
    }
  }),
  era: f({
    matchPatterns: ea,
    defaultMatchWidth: "wide",
    parsePatterns: ta,
    defaultParseWidth: "any"
  }),
  quarter: f({
    matchPatterns: aa,
    defaultMatchWidth: "wide",
    parsePatterns: ra,
    defaultParseWidth: "any",
    valueCallback: function(e) {
      return e + 1;
    }
  }),
  month: f({
    matchPatterns: na,
    defaultMatchWidth: "wide",
    parsePatterns: ia,
    defaultParseWidth: "any"
  }),
  day: f({
    matchPatterns: oa,
    defaultMatchWidth: "wide",
    parsePatterns: sa,
    defaultParseWidth: "any"
  }),
  dayPeriod: f({
    matchPatterns: ua,
    defaultMatchWidth: "any",
    parsePatterns: la,
    defaultParseWidth: "any"
  })
};
const Ze = da;
var ma = {
  code: "en-US",
  formatDistance: Lt,
  formatLong: Ft,
  formatRelative: Je,
  localize: Qe,
  match: Ze,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
const ca = ma;
function ha(e, t) {
  $(2, arguments);
  var a = E(t);
  return kt(e, -a);
}
var fa = 864e5;
function ga(e) {
  $(1, arguments);
  var t = T(e), a = t.getTime();
  t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
  var r = t.getTime(), n = a - r;
  return Math.floor(n / fa) + 1;
}
function ue(e) {
  $(1, arguments);
  var t = 1, a = T(e), r = a.getUTCDay(), n = (r < t ? 7 : 0) + r - t;
  return a.setUTCDate(a.getUTCDate() - n), a.setUTCHours(0, 0, 0, 0), a;
}
function Ke(e) {
  $(1, arguments);
  var t = T(e), a = t.getUTCFullYear(), r = new Date(0);
  r.setUTCFullYear(a + 1, 0, 4), r.setUTCHours(0, 0, 0, 0);
  var n = ue(r), i = new Date(0);
  i.setUTCFullYear(a, 0, 4), i.setUTCHours(0, 0, 0, 0);
  var o = ue(i);
  return t.getTime() >= n.getTime() ? a + 1 : t.getTime() >= o.getTime() ? a : a - 1;
}
function va(e) {
  $(1, arguments);
  var t = Ke(e), a = new Date(0);
  a.setUTCFullYear(t, 0, 4), a.setUTCHours(0, 0, 0, 0);
  var r = ue(a);
  return r;
}
var pa = 6048e5;
function wa(e) {
  $(1, arguments);
  var t = T(e), a = ue(t).getTime() - va(t).getTime();
  return Math.round(a / pa) + 1;
}
function Z(e, t) {
  $(1, arguments);
  var a = t || {}, r = a.locale, n = r && r.options && r.options.weekStartsOn, i = n == null ? 0 : E(n), o = a.weekStartsOn == null ? i : E(a.weekStartsOn);
  if (!(o >= 0 && o <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  var u = T(e), s = u.getUTCDay(), d = (s < o ? 7 : 0) + s - o;
  return u.setUTCDate(u.getUTCDate() - d), u.setUTCHours(0, 0, 0, 0), u;
}
function et(e, t) {
  $(1, arguments);
  var a = T(e), r = a.getUTCFullYear(), n = t || {}, i = n.locale, o = i && i.options && i.options.firstWeekContainsDate, u = o == null ? 1 : E(o), s = n.firstWeekContainsDate == null ? u : E(n.firstWeekContainsDate);
  if (!(s >= 1 && s <= 7))
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  var d = new Date(0);
  d.setUTCFullYear(r + 1, 0, s), d.setUTCHours(0, 0, 0, 0);
  var l = Z(d, t), m = new Date(0);
  m.setUTCFullYear(r, 0, s), m.setUTCHours(0, 0, 0, 0);
  var g = Z(m, t);
  return a.getTime() >= l.getTime() ? r + 1 : a.getTime() >= g.getTime() ? r : r - 1;
}
function ba(e, t) {
  $(1, arguments);
  var a = t || {}, r = a.locale, n = r && r.options && r.options.firstWeekContainsDate, i = n == null ? 1 : E(n), o = a.firstWeekContainsDate == null ? i : E(a.firstWeekContainsDate), u = et(e, t), s = new Date(0);
  s.setUTCFullYear(u, 0, o), s.setUTCHours(0, 0, 0, 0);
  var d = Z(s, t);
  return d;
}
var ya = 6048e5;
function Ma(e, t) {
  $(1, arguments);
  var a = T(e), r = Z(a, t).getTime() - ba(a, t).getTime();
  return Math.round(r / ya) + 1;
}
function P(e, t) {
  for (var a = e < 0 ? "-" : "", r = Math.abs(e).toString(); r.length < t; )
    r = "0" + r;
  return a + r;
}
var Pa = {
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
const G = Pa;
var B = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, Da = {
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
    var n = Ma(e, r);
    return t === "wo" ? a.ordinalNumber(n, {
      unit: "week"
    }) : P(n, t.length);
  },
  I: function(e, t, a) {
    var r = wa(e);
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
    var r = ga(e);
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
    switch (r === 12 ? n = B.noon : r === 0 ? n = B.midnight : n = r / 12 >= 1 ? "pm" : "am", t) {
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
    switch (r >= 17 ? n = B.evening : r >= 12 ? n = B.afternoon : r >= 4 ? n = B.morning : n = B.night, t) {
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
const ka = Da;
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
function $a(e, t) {
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
var Ca = {
  p: tt,
  P: $a
};
const Sa = Ca;
var Wa = ["D", "DD"], Ta = ["YY", "YYYY"];
function Oa(e) {
  return Wa.indexOf(e) !== -1;
}
function Na(e) {
  return Ta.indexOf(e) !== -1;
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
var xa = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Ea = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, La = /^'([^]*?)'?$/, ja = /''/g, za = /[a-zA-Z]/;
function H(e, t, a) {
  $(2, arguments);
  var r = String(t), n = a || {}, i = n.locale || ca, o = i.options && i.options.firstWeekContainsDate, u = o == null ? 1 : E(o), s = n.firstWeekContainsDate == null ? u : E(n.firstWeekContainsDate);
  if (!(s >= 1 && s <= 7))
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  var d = i.options && i.options.weekStartsOn, l = d == null ? 0 : E(d), m = n.weekStartsOn == null ? l : E(n.weekStartsOn);
  if (!(m >= 0 && m <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  if (!i.localize)
    throw new RangeError("locale must contain localize property");
  if (!i.formatLong)
    throw new RangeError("locale must contain formatLong property");
  var g = T(e);
  if (!Tt(g))
    throw new RangeError("Invalid time value");
  var b = Ct(g), p = ha(g, b), v = {
    firstWeekContainsDate: s,
    weekStartsOn: m,
    locale: i,
    _originalDate: g
  }, w = r.match(Ea).map(function(D) {
    var C = D[0];
    if (C === "p" || C === "P") {
      var A = Sa[C];
      return A(D, i.formatLong, v);
    }
    return D;
  }).join("").match(xa).map(function(D) {
    if (D === "''")
      return "'";
    var C = D[0];
    if (C === "'")
      return Aa(D);
    var A = ka[C];
    if (A)
      return !n.useAdditionalWeekYearTokens && Na(D) && Ee(D, t, e), !n.useAdditionalDayOfYearTokens && Oa(D) && Ee(D, t, e), A(p, D, i.localize, v);
    if (C.match(za))
      throw new RangeError("Format string contains an unescaped latin alphabet character `" + C + "`");
    return D;
  }).join("");
  return w;
}
function Aa(e) {
  return e.match(La)[1].replace(ja, "'");
}
function Le(e) {
  $(1, arguments);
  var t = T(e), a = t.getDay();
  return a;
}
function _a(e) {
  $(1, arguments);
  var t = T(e), a = t.getFullYear(), r = t.getMonth(), n = new Date(0);
  return n.setFullYear(a, r + 1, 0), n.setHours(0, 0, 0, 0), n.getDate();
}
function le(e, t, a) {
  $(2, arguments);
  var r = Z(e, a), n = Z(t, a);
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
function Fa(e, t, a) {
  a = a || {};
  var r;
  return typeof U[e] == "string" ? r = U[e] : t === 1 ? r = U[e].one : t === 11 && U[e].eleven ? r = U[e].eleven : r = U[e].other.replace("{{count}}", t), a.addSuffix ? a.comparison > 0 ? "en " + r : "fa " + r : r;
}
var Ia = {
  full: "EEEE, d 'de' MMMM y",
  long: "d 'de' MMMM y",
  medium: "d MMM y",
  short: "dd/MM/y"
}, qa = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
}, Ha = {
  full: "{{date}} 'a les' {{time}}",
  long: "{{date}} 'a les' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Ga = {
  date: M({
    formats: Ia,
    defaultWidth: "full"
  }),
  time: M({
    formats: qa,
    defaultWidth: "full"
  }),
  dateTime: M({
    formats: Ha,
    defaultWidth: "full"
  })
};
const Ya = Ga;
var Xa = {
  lastWeek: "'el' eeee 'passat a la' LT",
  yesterday: "'ahir a la' p",
  today: "'avui a la' p",
  tomorrow: "'dem\xE0 a la' p",
  nextWeek: "eeee 'a la' p",
  other: "P"
}, Ra = {
  lastWeek: "'el' eeee 'passat a les' p",
  yesterday: "'ahir a les' p",
  today: "'avui a les' p",
  tomorrow: "'dem\xE0 a les' p",
  nextWeek: "eeee 'a les' p",
  other: "P"
};
function Va(e, t, a, r) {
  return t.getUTCHours() !== 1 ? Ra[e] : Xa[e];
}
var Ba = {
  narrow: ["aC", "dC"],
  abbreviated: ["a. de C.", "d. de C."],
  wide: ["abans de Crist", "despr\xE9s de Crist"]
}, Ua = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["T1", "T2", "T3", "T4"],
  wide: ["1r trimestre", "2n trimestre", "3r trimestre", "4t trimestre"]
}, Ja = {
  narrow: ["GN", "FB", "M\xC7", "AB", "MG", "JN", "JL", "AG", "ST", "OC", "NV", "DS"],
  abbreviated: ["gen.", "febr.", "mar\xE7", "abr.", "maig", "juny", "jul.", "ag.", "set.", "oct.", "nov.", "des."],
  wide: ["gener", "febrer", "mar\xE7", "abril", "maig", "juny", "juliol", "agost", "setembre", "octubre", "novembre", "desembre"]
}, Qa = {
  narrow: ["dg.", "dl.", "dt.", "dm.", "dj.", "dv.", "ds."],
  short: ["dg.", "dl.", "dt.", "dm.", "dj.", "dv.", "ds."],
  abbreviated: ["dg.", "dl.", "dt.", "dm.", "dj.", "dv.", "ds."],
  wide: ["diumenge", "dilluns", "dimarts", "dimecres", "dijous", "divendres", "dissabte"]
}, Za = {
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
}, Ka = {
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
function er(e, t) {
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
var tr = {
  ordinalNumber: er,
  era: h({
    values: Ba,
    defaultWidth: "wide"
  }),
  quarter: h({
    values: Ua,
    defaultWidth: "wide",
    argumentCallback: function(e) {
      return Number(e) - 1;
    }
  }),
  month: h({
    values: Ja,
    defaultWidth: "wide"
  }),
  day: h({
    values: Qa,
    defaultWidth: "wide"
  }),
  dayPeriod: h({
    values: Za,
    defaultWidth: "wide",
    formattingValues: Ka,
    defaultFormattingWidth: "wide"
  })
};
const ar = tr;
var rr = /^(\d+)(è|r|n|r|t)?/i, nr = /\d+/i, ir = {
  narrow: /^(aC|dC)/i,
  abbreviated: /^(a. de C.|d. de C.)/i,
  wide: /^(abans de Crist|despr[eé]s de Crist)/i
}, or = {
  narrow: [/^aC/i, /^dC/i],
  abbreviated: [/^(a. de C.)/i, /^(d. de C.)/i],
  wide: [/^(abans de Crist)/i, /^(despr[eé]s de Crist)/i]
}, sr = {
  narrow: /^[1234]/i,
  abbreviated: /^T[1234]/i,
  wide: /^[1234](è|r|n|r|t)? trimestre/i
}, ur = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, lr = {
  narrow: /^(GN|FB|MÇ|AB|MG|JN|JL|AG|ST|OC|NV|DS)/i,
  abbreviated: /^(gen.|febr.|març|abr.|maig|juny|jul.|ag.|set.|oct.|nov.|des.)/i,
  wide: /^(gener|febrer|març|abril|maig|juny|juliol|agost|setembre|octubre|novembre|desembre)/i
}, dr = {
  narrow: [/^GN/i, /^FB/i, /^MÇ/i, /^AB/i, /^MG/i, /^JN/i, /^JL/i, /^AG/i, /^ST/i, /^OC/i, /^NV/i, /^DS/i],
  abbreviated: [/^gen./i, /^febr./i, /^març/i, /^abr./i, /^maig/i, /^juny/i, /^jul./i, /^ag./i, /^set./i, /^oct./i, /^nov./i, /^des./i],
  wide: [/^gener/i, /^febrer/i, /^març/i, /^abril/i, /^maig/i, /^juny/i, /^juliol/i, /^agost/i, /^setembre/i, /^octubre/i, /^novembre/i, /^desembre/i]
}, mr = {
  narrow: /^(dg\.|dl\.|dt\.|dm\.|dj\.|dv\.|ds\.)/i,
  short: /^(dg\.|dl\.|dt\.|dm\.|dj\.|dv\.|ds\.)/i,
  abbreviated: /^(dg\.|dl\.|dt\.|dm\.|dj\.|dv\.|ds\.)/i,
  wide: /^(diumenge|dilluns|dimarts|dimecres|dijous|divendres|dissabte)/i
}, cr = {
  narrow: [/^dg./i, /^dl./i, /^dt./i, /^dm./i, /^dj./i, /^dv./i, /^ds./i],
  abbreviated: [/^dg./i, /^dl./i, /^dt./i, /^dm./i, /^dj./i, /^dv./i, /^ds./i],
  wide: [/^diumenge/i, /^dilluns/i, /^dimarts/i, /^dimecres/i, /^dijous/i, /^divendres/i, /^disssabte/i]
}, hr = {
  narrow: /^(a|p|mn|md|(del|de la) (matí|tarda|vespre|nit))/i,
  abbreviated: /^([ap]\.?\s?m\.?|mitjanit|migdia|(del|de la) (matí|tarda|vespre|nit))/i,
  wide: /^(ante meridiem|post meridiem|mitjanit|migdia|(del|de la) (matí|tarda|vespre|nit))/i
}, fr = {
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
}, gr = {
  ordinalNumber: q({
    matchPattern: rr,
    parsePattern: nr,
    valueCallback: function(e) {
      return parseInt(e, 10);
    }
  }),
  era: f({
    matchPatterns: ir,
    defaultMatchWidth: "wide",
    parsePatterns: or,
    defaultParseWidth: "any"
  }),
  quarter: f({
    matchPatterns: sr,
    defaultMatchWidth: "wide",
    parsePatterns: ur,
    defaultParseWidth: "any",
    valueCallback: function(e) {
      return e + 1;
    }
  }),
  month: f({
    matchPatterns: lr,
    defaultMatchWidth: "wide",
    parsePatterns: dr,
    defaultParseWidth: "any"
  }),
  day: f({
    matchPatterns: mr,
    defaultMatchWidth: "wide",
    parsePatterns: cr,
    defaultParseWidth: "any"
  }),
  dayPeriod: f({
    matchPatterns: hr,
    defaultMatchWidth: "any",
    parsePatterns: fr,
    defaultParseWidth: "any"
  })
};
const vr = gr;
var pr = {
  code: "ca",
  formatDistance: Fa,
  formatLong: Ya,
  formatRelative: Va,
  localize: ar,
  match: vr,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
const wr = pr;
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
function br(e, t, a) {
  a = a || {};
  var r;
  return typeof ne[e] == "string" ? r = ne[e] : t === 1 ? r = ne[e].one : r = ne[e].other.replace("{{count}}", t), a.addSuffix ? a.comparison > 0 ? "om " + r : r + " siden" : r;
}
var yr = {
  full: "EEEE 'den' d. MMMM y",
  long: "d. MMMM y",
  medium: "d. MMM y",
  short: "dd/MM/y"
}, Mr = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
}, Pr = {
  full: "{{date}} 'kl'. {{time}}",
  long: "{{date}} 'kl'. {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
}, Dr = {
  date: M({
    formats: yr,
    defaultWidth: "full"
  }),
  time: M({
    formats: Mr,
    defaultWidth: "full"
  }),
  dateTime: M({
    formats: Pr,
    defaultWidth: "full"
  })
};
const kr = Dr;
var $r = {
  lastWeek: "'sidste' eeee 'kl.' p",
  yesterday: "'i g\xE5r kl.' p",
  today: "'i dag kl.' p",
  tomorrow: "'i morgen kl.' p",
  nextWeek: "'p\xE5' eeee 'kl.' p",
  other: "P"
};
function Cr(e, t, a, r) {
  return $r[e];
}
var Sr = {
  narrow: ["fvt", "vt"],
  abbreviated: ["f.v.t.", "v.t."],
  wide: ["f\xF8r vesterlandsk tidsregning", "vesterlandsk tidsregning"]
}, Wr = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["1. kvt.", "2. kvt.", "3. kvt.", "4. kvt."],
  wide: ["1. kvartal", "2. kvartal", "3. kvartal", "4. kvartal"]
}, Tr = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["jan.", "feb.", "mar.", "apr.", "maj", "jun.", "jul.", "aug.", "sep.", "okt.", "nov.", "dec."],
  wide: ["januar", "februar", "marts", "april", "maj", "juni", "juli", "august", "september", "oktober", "november", "december"]
}, Or = {
  narrow: ["S", "M", "T", "O", "T", "F", "L"],
  short: ["s\xF8", "ma", "ti", "on", "to", "fr", "l\xF8"],
  abbreviated: ["s\xF8n.", "man.", "tir.", "ons.", "tor.", "fre.", "l\xF8r."],
  wide: ["s\xF8ndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "l\xF8rdag"]
}, Nr = {
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
}, xr = {
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
function Er(e) {
  var t = Number(e);
  return t + ".";
}
var Lr = {
  ordinalNumber: Er,
  era: h({
    values: Sr,
    defaultWidth: "wide"
  }),
  quarter: h({
    values: Wr,
    defaultWidth: "wide",
    argumentCallback: function(e) {
      return Number(e) - 1;
    }
  }),
  month: h({
    values: Tr,
    defaultWidth: "wide"
  }),
  day: h({
    values: Or,
    defaultWidth: "wide"
  }),
  dayPeriod: h({
    values: Nr,
    defaultWidth: "wide",
    formattingValues: xr,
    defaultFormattingWidth: "wide"
  })
};
const jr = Lr;
var zr = /^(\d+)(\.)?/i, Ar = /\d+/i, _r = {
  narrow: /^(fKr|fvt|eKr|vt)/i,
  abbreviated: /^(f\.Kr\.?|f\.v\.t\.?|e\.Kr\.?|v\.t\.)/i,
  wide: /^(f.Kr.|før vesterlandsk tidsregning|e.Kr.|vesterlandsk tidsregning)/i
}, Fr = {
  any: [/^f/i, /^(v|e)/i]
}, Ir = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234]. kvt\./i,
  wide: /^[1234]\.? kvartal/i
}, qr = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Hr = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan.|feb.|mar.|apr.|maj|jun.|jul.|aug.|sep.|okt.|nov.|dec.)/i,
  wide: /^(januar|februar|marts|april|maj|juni|juli|august|september|oktober|november|december)/i
}, Gr = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^maj/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
}, Yr = {
  narrow: /^[smtofl]/i,
  short: /^(søn.|man.|tir.|ons.|tor.|fre.|lør.)/i,
  abbreviated: /^(søn|man|tir|ons|tor|fre|lør)/i,
  wide: /^(søndag|mandag|tirsdag|onsdag|torsdag|fredag|lørdag)/i
}, Xr = {
  narrow: [/^s/i, /^m/i, /^t/i, /^o/i, /^t/i, /^f/i, /^l/i],
  any: [/^s/i, /^m/i, /^ti/i, /^o/i, /^to/i, /^f/i, /^l/i]
}, Rr = {
  narrow: /^(a|p|midnat|middag|(om) (morgenen|eftermiddagen|aftenen|natten))/i,
  any: /^([ap]\.?\s?m\.?|midnat|middag|(om) (morgenen|eftermiddagen|aftenen|natten))/i
}, Vr = {
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
}, Br = {
  ordinalNumber: q({
    matchPattern: zr,
    parsePattern: Ar,
    valueCallback: function(e) {
      return parseInt(e, 10);
    }
  }),
  era: f({
    matchPatterns: _r,
    defaultMatchWidth: "wide",
    parsePatterns: Fr,
    defaultParseWidth: "any"
  }),
  quarter: f({
    matchPatterns: Ir,
    defaultMatchWidth: "wide",
    parsePatterns: qr,
    defaultParseWidth: "any",
    valueCallback: function(e) {
      return e + 1;
    }
  }),
  month: f({
    matchPatterns: Hr,
    defaultMatchWidth: "wide",
    parsePatterns: Gr,
    defaultParseWidth: "any"
  }),
  day: f({
    matchPatterns: Yr,
    defaultMatchWidth: "wide",
    parsePatterns: Xr,
    defaultParseWidth: "any"
  }),
  dayPeriod: f({
    matchPatterns: Rr,
    defaultMatchWidth: "any",
    parsePatterns: Vr,
    defaultParseWidth: "any"
  })
};
const Ur = Br;
var Jr = {
  code: "da",
  formatDistance: br,
  formatLong: kr,
  formatRelative: Cr,
  localize: jr,
  match: Ur,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
const Qr = Jr;
var je = {
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
}, Zr = function(e, t, a) {
  var r, n = a != null && a.addSuffix ? je[e].withPreposition : je[e].standalone;
  return typeof n == "string" ? r = n : t === 1 ? r = n.one : r = n.other.replace("{{count}}", String(t)), a != null && a.addSuffix ? a.comparison && a.comparison > 0 ? "in " + r : "vor " + r : r;
};
const Kr = Zr;
var en = {
  full: "EEEE, do MMMM y",
  long: "do MMMM y",
  medium: "do MMM y",
  short: "dd.MM.y"
}, tn = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
}, an = {
  full: "{{date}} 'um' {{time}}",
  long: "{{date}} 'um' {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
}, rn = {
  date: M({
    formats: en,
    defaultWidth: "full"
  }),
  time: M({
    formats: tn,
    defaultWidth: "full"
  }),
  dateTime: M({
    formats: an,
    defaultWidth: "full"
  })
};
const nn = rn;
var on = {
  lastWeek: "'letzten' eeee 'um' p",
  yesterday: "'gestern um' p",
  today: "'heute um' p",
  tomorrow: "'morgen um' p",
  nextWeek: "eeee 'um' p",
  other: "P"
}, sn = function(e, t, a, r) {
  return on[e];
};
const un = sn;
var ln = {
  narrow: ["v.Chr.", "n.Chr."],
  abbreviated: ["v.Chr.", "n.Chr."],
  wide: ["vor Christus", "nach Christus"]
}, dn = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1. Quartal", "2. Quartal", "3. Quartal", "4. Quartal"]
}, ye = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["Jan", "Feb", "M\xE4r", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
  wide: ["Januar", "Februar", "M\xE4rz", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]
}, mn = {
  narrow: ye.narrow,
  abbreviated: ["Jan.", "Feb.", "M\xE4rz", "Apr.", "Mai", "Juni", "Juli", "Aug.", "Sep.", "Okt.", "Nov.", "Dez."],
  wide: ye.wide
}, cn = {
  narrow: ["S", "M", "D", "M", "D", "F", "S"],
  short: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
  abbreviated: ["So.", "Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."],
  wide: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]
}, hn = {
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
}, fn = {
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
}, gn = function(e) {
  var t = Number(e);
  return t + ".";
}, vn = {
  ordinalNumber: gn,
  era: h({
    values: ln,
    defaultWidth: "wide"
  }),
  quarter: h({
    values: dn,
    defaultWidth: "wide",
    argumentCallback: function(e) {
      return e - 1;
    }
  }),
  month: h({
    values: ye,
    formattingValues: mn,
    defaultWidth: "wide"
  }),
  day: h({
    values: cn,
    defaultWidth: "wide"
  }),
  dayPeriod: h({
    values: hn,
    defaultWidth: "wide",
    formattingValues: fn,
    defaultFormattingWidth: "wide"
  })
};
const pn = vn;
var wn = /^(\d+)(\.)?/i, bn = /\d+/i, yn = {
  narrow: /^(v\.? ?Chr\.?|n\.? ?Chr\.?)/i,
  abbreviated: /^(v\.? ?Chr\.?|n\.? ?Chr\.?)/i,
  wide: /^(vor Christus|vor unserer Zeitrechnung|nach Christus|unserer Zeitrechnung)/i
}, Mn = {
  any: [/^v/i, /^n/i]
}, Pn = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](\.)? Quartal/i
}, Dn = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, kn = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(j[aä]n|feb|mär[z]?|apr|mai|jun[i]?|jul[i]?|aug|sep|okt|nov|dez)\.?/i,
  wide: /^(januar|februar|märz|april|mai|juni|juli|august|september|oktober|november|dezember)/i
}, $n = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^j[aä]/i, /^f/i, /^mär/i, /^ap/i, /^mai/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
}, Cn = {
  narrow: /^[smdmf]/i,
  short: /^(so|mo|di|mi|do|fr|sa)/i,
  abbreviated: /^(son?|mon?|die?|mit?|don?|fre?|sam?)\.?/i,
  wide: /^(sonntag|montag|dienstag|mittwoch|donnerstag|freitag|samstag)/i
}, Sn = {
  any: [/^so/i, /^mo/i, /^di/i, /^mi/i, /^do/i, /^f/i, /^sa/i]
}, Wn = {
  narrow: /^(vm\.?|nm\.?|Mitternacht|Mittag|morgens|nachm\.?|abends|nachts)/i,
  abbreviated: /^(vorm\.?|nachm\.?|Mitternacht|Mittag|morgens|nachm\.?|abends|nachts)/i,
  wide: /^(vormittags|nachmittags|Mitternacht|Mittag|morgens|nachmittags|abends|nachts)/i
}, Tn = {
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
}, On = {
  ordinalNumber: q({
    matchPattern: wn,
    parsePattern: bn,
    valueCallback: function(e) {
      return parseInt(e);
    }
  }),
  era: f({
    matchPatterns: yn,
    defaultMatchWidth: "wide",
    parsePatterns: Mn,
    defaultParseWidth: "any"
  }),
  quarter: f({
    matchPatterns: Pn,
    defaultMatchWidth: "wide",
    parsePatterns: Dn,
    defaultParseWidth: "any",
    valueCallback: function(e) {
      return e + 1;
    }
  }),
  month: f({
    matchPatterns: kn,
    defaultMatchWidth: "wide",
    parsePatterns: $n,
    defaultParseWidth: "any"
  }),
  day: f({
    matchPatterns: Cn,
    defaultMatchWidth: "wide",
    parsePatterns: Sn,
    defaultParseWidth: "any"
  }),
  dayPeriod: f({
    matchPatterns: Wn,
    defaultMatchWidth: "wide",
    parsePatterns: Tn,
    defaultParseWidth: "any"
  })
};
const Nn = On;
var xn = {
  code: "de",
  formatDistance: Kr,
  formatLong: nn,
  formatRelative: un,
  localize: pn,
  match: Nn,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
const En = xn;
var Ln = {
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
  var r, n = Ln[e];
  return typeof n == "string" ? r = n : t === 1 ? r = n.one : r = n.other.replace("{{count}}", t.toString()), a != null && a.addSuffix ? a.comparison && a.comparison > 0 ? "in " + r : r + " ago" : r;
};
const zn = jn;
var An = {
  full: "EEEE, MMMM do, yyyy",
  long: "MMMM do, yyyy",
  medium: "MMM d, yyyy",
  short: "yyyy-MM-dd"
}, _n = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, Fn = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, In = {
  date: M({
    formats: An,
    defaultWidth: "full"
  }),
  time: M({
    formats: _n,
    defaultWidth: "full"
  }),
  dateTime: M({
    formats: Fn,
    defaultWidth: "full"
  })
};
const qn = In;
var Hn = {
  code: "en-CA",
  formatDistance: zn,
  formatLong: qn,
  formatRelative: Je,
  localize: Qe,
  match: Ze,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
const Gn = Hn;
var Yn = {
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
}, Xn = function(e, t, a) {
  var r, n = Yn[e];
  return typeof n == "string" ? r = n : t === 1 ? r = n.one : r = n.other.replace("{{count}}", t.toString()), a != null && a.addSuffix ? a.comparison && a.comparison > 0 ? "en " + r : "hace " + r : r;
};
const Rn = Xn;
var Vn = {
  full: "EEEE, d 'de' MMMM 'de' y",
  long: "d 'de' MMMM 'de' y",
  medium: "d MMM y",
  short: "dd/MM/y"
}, Bn = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
}, Un = {
  full: "{{date}} 'a las' {{time}}",
  long: "{{date}} 'a las' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Jn = {
  date: M({
    formats: Vn,
    defaultWidth: "full"
  }),
  time: M({
    formats: Bn,
    defaultWidth: "full"
  }),
  dateTime: M({
    formats: Un,
    defaultWidth: "full"
  })
};
const Qn = Jn;
var Zn = {
  lastWeek: "'el' eeee 'pasado a la' p",
  yesterday: "'ayer a la' p",
  today: "'hoy a la' p",
  tomorrow: "'ma\xF1ana a la' p",
  nextWeek: "eeee 'a la' p",
  other: "P"
}, Kn = {
  lastWeek: "'el' eeee 'pasado a las' p",
  yesterday: "'ayer a las' p",
  today: "'hoy a las' p",
  tomorrow: "'ma\xF1ana a las' p",
  nextWeek: "eeee 'a las' p",
  other: "P"
}, ei = function(e, t, a, r) {
  return t.getUTCHours() !== 1 ? Kn[e] : Zn[e];
};
const ti = ei;
var ai = {
  narrow: ["AC", "DC"],
  abbreviated: ["AC", "DC"],
  wide: ["antes de cristo", "despu\xE9s de cristo"]
}, ri = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["T1", "T2", "T3", "T4"],
  wide: ["1\xBA trimestre", "2\xBA trimestre", "3\xBA trimestre", "4\xBA trimestre"]
}, ni = {
  narrow: ["e", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"],
  abbreviated: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
  wide: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
}, ii = {
  narrow: ["d", "l", "m", "m", "j", "v", "s"],
  short: ["do", "lu", "ma", "mi", "ju", "vi", "s\xE1"],
  abbreviated: ["dom", "lun", "mar", "mi\xE9", "jue", "vie", "s\xE1b"],
  wide: ["domingo", "lunes", "martes", "mi\xE9rcoles", "jueves", "viernes", "s\xE1bado"]
}, oi = {
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
}, si = {
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
}, ui = function(e, t) {
  var a = Number(e);
  return a + "\xBA";
}, li = {
  ordinalNumber: ui,
  era: h({
    values: ai,
    defaultWidth: "wide"
  }),
  quarter: h({
    values: ri,
    defaultWidth: "wide",
    argumentCallback: function(e) {
      return Number(e) - 1;
    }
  }),
  month: h({
    values: ni,
    defaultWidth: "wide"
  }),
  day: h({
    values: ii,
    defaultWidth: "wide"
  }),
  dayPeriod: h({
    values: oi,
    defaultWidth: "wide",
    formattingValues: si,
    defaultFormattingWidth: "wide"
  })
};
const di = li;
var mi = /^(\d+)(º)?/i, ci = /\d+/i, hi = {
  narrow: /^(ac|dc|a|d)/i,
  abbreviated: /^(a\.?\s?c\.?|a\.?\s?e\.?\s?c\.?|d\.?\s?c\.?|e\.?\s?c\.?)/i,
  wide: /^(antes de cristo|antes de la era com[uú]n|despu[eé]s de cristo|era com[uú]n)/i
}, fi = {
  any: [/^ac/i, /^dc/i],
  wide: [/^(antes de cristo|antes de la era com[uú]n)/i, /^(despu[eé]s de cristo|era com[uú]n)/i]
}, gi = {
  narrow: /^[1234]/i,
  abbreviated: /^T[1234]/i,
  wide: /^[1234](º)? trimestre/i
}, vi = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, pi = {
  narrow: /^[efmajsond]/i,
  abbreviated: /^(ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)/i,
  wide: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i
}, wi = {
  narrow: [/^e/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^en/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i]
}, bi = {
  narrow: /^[dlmjvs]/i,
  short: /^(do|lu|ma|mi|ju|vi|s[áa])/i,
  abbreviated: /^(dom|lun|mar|mi[ée]|jue|vie|s[áa]b)/i,
  wide: /^(domingo|lunes|martes|mi[ée]rcoles|jueves|viernes|s[áa]bado)/i
}, yi = {
  narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^j/i, /^v/i, /^s/i],
  any: [/^do/i, /^lu/i, /^ma/i, /^mi/i, /^ju/i, /^vi/i, /^sa/i]
}, Mi = {
  narrow: /^(a|p|mn|md|(de la|a las) (mañana|tarde|noche))/i,
  any: /^([ap]\.?\s?m\.?|medianoche|mediodia|(de la|a las) (mañana|tarde|noche))/i
}, Pi = {
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
}, Di = {
  ordinalNumber: q({
    matchPattern: mi,
    parsePattern: ci,
    valueCallback: function(e) {
      return parseInt(e, 10);
    }
  }),
  era: f({
    matchPatterns: hi,
    defaultMatchWidth: "wide",
    parsePatterns: fi,
    defaultParseWidth: "any"
  }),
  quarter: f({
    matchPatterns: gi,
    defaultMatchWidth: "wide",
    parsePatterns: vi,
    defaultParseWidth: "any",
    valueCallback: function(e) {
      return e + 1;
    }
  }),
  month: f({
    matchPatterns: pi,
    defaultMatchWidth: "wide",
    parsePatterns: wi,
    defaultParseWidth: "any"
  }),
  day: f({
    matchPatterns: bi,
    defaultMatchWidth: "wide",
    parsePatterns: yi,
    defaultParseWidth: "any"
  }),
  dayPeriod: f({
    matchPatterns: Mi,
    defaultMatchWidth: "any",
    parsePatterns: Pi,
    defaultParseWidth: "any"
  })
};
const ki = Di;
var $i = {
  code: "es",
  formatDistance: Rn,
  formatLong: Qn,
  formatRelative: ti,
  localize: di,
  match: ki,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
};
const Ci = $i;
var Si = {
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
  var r, n = Si[e];
  return typeof n == "string" ? r = n : t === 1 ? r = n.one : r = n.other.replace("{{count}}", String(t)), a != null && a.addSuffix ? a.comparison && a.comparison > 0 ? "dans " + r : "il y a " + r : r;
};
const Ti = Wi;
var Oi = {
  lastWeek: "eeee 'dernier \xE0' p",
  yesterday: "'hier \xE0' p",
  today: "'aujourd\u2019hui \xE0' p",
  tomorrow: "'demain \xE0' p'",
  nextWeek: "eeee 'prochain \xE0' p",
  other: "P"
}, Ni = function(e, t, a, r) {
  return Oi[e];
};
const xi = Ni;
var Ei = {
  narrow: ["av. J.-C", "ap. J.-C"],
  abbreviated: ["av. J.-C", "ap. J.-C"],
  wide: ["avant J\xE9sus-Christ", "apr\xE8s J\xE9sus-Christ"]
}, Li = {
  narrow: ["T1", "T2", "T3", "T4"],
  abbreviated: ["1er trim.", "2\xE8me trim.", "3\xE8me trim.", "4\xE8me trim."],
  wide: ["1er trimestre", "2\xE8me trimestre", "3\xE8me trimestre", "4\xE8me trimestre"]
}, ji = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["janv.", "f\xE9vr.", "mars", "avr.", "mai", "juin", "juil.", "ao\xFBt", "sept.", "oct.", "nov.", "d\xE9c."],
  wide: ["janvier", "f\xE9vrier", "mars", "avril", "mai", "juin", "juillet", "ao\xFBt", "septembre", "octobre", "novembre", "d\xE9cembre"]
}, zi = {
  narrow: ["D", "L", "M", "M", "J", "V", "S"],
  short: ["di", "lu", "ma", "me", "je", "ve", "sa"],
  abbreviated: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
  wide: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"]
}, Ai = {
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
}, Fi = {
  ordinalNumber: _i,
  era: h({
    values: Ei,
    defaultWidth: "wide"
  }),
  quarter: h({
    values: Li,
    defaultWidth: "wide",
    argumentCallback: function(e) {
      return e - 1;
    }
  }),
  month: h({
    values: ji,
    defaultWidth: "wide"
  }),
  day: h({
    values: zi,
    defaultWidth: "wide"
  }),
  dayPeriod: h({
    values: Ai,
    defaultWidth: "wide"
  })
};
const Ii = Fi;
var qi = /^(\d+)(ième|ère|ème|er|e)?/i, Hi = /\d+/i, Gi = {
  narrow: /^(av\.J\.C|ap\.J\.C|ap\.J\.-C)/i,
  abbreviated: /^(av\.J\.-C|av\.J-C|apr\.J\.-C|apr\.J-C|ap\.J-C)/i,
  wide: /^(avant Jésus-Christ|après Jésus-Christ)/i
}, Yi = {
  any: [/^av/i, /^ap/i]
}, Xi = {
  narrow: /^T?[1234]/i,
  abbreviated: /^[1234](er|ème|e)? trim\.?/i,
  wide: /^[1234](er|ème|e)? trimestre/i
}, Ri = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Vi = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(janv|févr|mars|avr|mai|juin|juill|juil|août|sept|oct|nov|déc)\.?/i,
  wide: /^(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)/i
}, Bi = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^av/i, /^ma/i, /^juin/i, /^juil/i, /^ao/i, /^s/i, /^o/i, /^n/i, /^d/i]
}, Ui = {
  narrow: /^[lmjvsd]/i,
  short: /^(di|lu|ma|me|je|ve|sa)/i,
  abbreviated: /^(dim|lun|mar|mer|jeu|ven|sam)\.?/i,
  wide: /^(dimanche|lundi|mardi|mercredi|jeudi|vendredi|samedi)/i
}, Ji = {
  narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^j/i, /^v/i, /^s/i],
  any: [/^di/i, /^lu/i, /^ma/i, /^me/i, /^je/i, /^ve/i, /^sa/i]
}, Qi = {
  narrow: /^(a|p|minuit|midi|mat\.?|ap\.?m\.?|soir|nuit)/i,
  any: /^([ap]\.?\s?m\.?|du matin|de l'après[-\s]midi|du soir|de la nuit)/i
}, Zi = {
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
}, Ki = {
  ordinalNumber: q({
    matchPattern: qi,
    parsePattern: Hi,
    valueCallback: function(e) {
      return parseInt(e);
    }
  }),
  era: f({
    matchPatterns: Gi,
    defaultMatchWidth: "wide",
    parsePatterns: Yi,
    defaultParseWidth: "any"
  }),
  quarter: f({
    matchPatterns: Xi,
    defaultMatchWidth: "wide",
    parsePatterns: Ri,
    defaultParseWidth: "any",
    valueCallback: function(e) {
      return e + 1;
    }
  }),
  month: f({
    matchPatterns: Vi,
    defaultMatchWidth: "wide",
    parsePatterns: Bi,
    defaultParseWidth: "any"
  }),
  day: f({
    matchPatterns: Ui,
    defaultMatchWidth: "wide",
    parsePatterns: Ji,
    defaultParseWidth: "any"
  }),
  dayPeriod: f({
    matchPatterns: Qi,
    defaultMatchWidth: "any",
    parsePatterns: Zi,
    defaultParseWidth: "any"
  })
};
const eo = Ki;
var to = {
  full: "EEEE d MMMM y",
  long: "d MMMM y",
  medium: "d MMM y",
  short: "yy-MM-dd"
}, ao = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
}, ro = {
  full: "{{date}} '\xE0' {{time}}",
  long: "{{date}} '\xE0' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, no = {
  date: M({
    formats: to,
    defaultWidth: "full"
  }),
  time: M({
    formats: ao,
    defaultWidth: "full"
  }),
  dateTime: M({
    formats: ro,
    defaultWidth: "full"
  })
};
const io = no;
var oo = {
  code: "fr-CA",
  formatDistance: Ti,
  formatLong: io,
  formatRelative: xi,
  localize: Ii,
  match: eo,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
const so = oo;
var uo = {
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
}, lo = function(e, t, a) {
  var r, n = uo[e];
  return typeof n == "string" ? r = n : t === 1 ? r = n.one : r = n.other.replace("{{count}}", t.toString()), a != null && a.addSuffix ? a.comparison && a.comparison > 0 ? "tra " + r : r + " fa" : r;
};
const mo = lo;
var co = {
  full: "EEEE d MMMM y",
  long: "d MMMM y",
  medium: "d MMM y",
  short: "dd/MM/y"
}, ho = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
}, fo = {
  full: "{{date}} {{time}}",
  long: "{{date}} {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
}, go = {
  date: M({
    formats: co,
    defaultWidth: "full"
  }),
  time: M({
    formats: ho,
    defaultWidth: "full"
  }),
  dateTime: M({
    formats: fo,
    defaultWidth: "full"
  })
};
const vo = go;
var ke = ["domenica", "luned\xEC", "marted\xEC", "mercoled\xEC", "gioved\xEC", "venerd\xEC", "sabato"];
function po(e) {
  switch (e) {
    case 0:
      return "'domenica scorsa alle' p";
    default:
      return "'" + ke[e] + " scorso alle' p";
  }
}
function ze(e) {
  return "'" + ke[e] + " alle' p";
}
function wo(e) {
  switch (e) {
    case 0:
      return "'domenica prossima alle' p";
    default:
      return "'" + ke[e] + " prossimo alle' p";
  }
}
var bo = {
  lastWeek: function(e, t, a) {
    var r = e.getUTCDay();
    return le(e, t, a) ? ze(r) : po(r);
  },
  yesterday: "'ieri alle' p",
  today: "'oggi alle' p",
  tomorrow: "'domani alle' p",
  nextWeek: function(e, t, a) {
    var r = e.getUTCDay();
    return le(e, t, a) ? ze(r) : wo(r);
  },
  other: "P"
}, yo = function(e, t, a, r) {
  var n = bo[e];
  return typeof n == "function" ? n(t, a, r) : n;
};
const Mo = yo;
var Po = {
  narrow: ["aC", "dC"],
  abbreviated: ["a.C.", "d.C."],
  wide: ["avanti Cristo", "dopo Cristo"]
}, Do = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["T1", "T2", "T3", "T4"],
  wide: ["1\xBA trimestre", "2\xBA trimestre", "3\xBA trimestre", "4\xBA trimestre"]
}, ko = {
  narrow: ["G", "F", "M", "A", "M", "G", "L", "A", "S", "O", "N", "D"],
  abbreviated: ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"],
  wide: ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"]
}, $o = {
  narrow: ["D", "L", "M", "M", "G", "V", "S"],
  short: ["dom", "lun", "mar", "mer", "gio", "ven", "sab"],
  abbreviated: ["dom", "lun", "mar", "mer", "gio", "ven", "sab"],
  wide: ["domenica", "luned\xEC", "marted\xEC", "mercoled\xEC", "gioved\xEC", "venerd\xEC", "sabato"]
}, Co = {
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
}, So = {
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
}, To = {
  ordinalNumber: Wo,
  era: h({
    values: Po,
    defaultWidth: "wide"
  }),
  quarter: h({
    values: Do,
    defaultWidth: "wide",
    argumentCallback: function(e) {
      return e - 1;
    }
  }),
  month: h({
    values: ko,
    defaultWidth: "wide"
  }),
  day: h({
    values: $o,
    defaultWidth: "wide"
  }),
  dayPeriod: h({
    values: Co,
    defaultWidth: "wide",
    formattingValues: So,
    defaultFormattingWidth: "wide"
  })
};
const Oo = To;
var No = /^(\d+)(º)?/i, xo = /\d+/i, Eo = {
  narrow: /^(aC|dC)/i,
  abbreviated: /^(a\.?\s?C\.?|a\.?\s?e\.?\s?v\.?|d\.?\s?C\.?|e\.?\s?v\.?)/i,
  wide: /^(avanti Cristo|avanti Era Volgare|dopo Cristo|Era Volgare)/i
}, Lo = {
  any: [/^a/i, /^(d|e)/i]
}, jo = {
  narrow: /^[1234]/i,
  abbreviated: /^t[1234]/i,
  wide: /^[1234](º)? trimestre/i
}, zo = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Ao = {
  narrow: /^[gfmalsond]/i,
  abbreviated: /^(gen|feb|mar|apr|mag|giu|lug|ago|set|ott|nov|dic)/i,
  wide: /^(gennaio|febbraio|marzo|aprile|maggio|giugno|luglio|agosto|settembre|ottobre|novembre|dicembre)/i
}, _o = {
  narrow: [/^g/i, /^f/i, /^m/i, /^a/i, /^m/i, /^g/i, /^l/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ge/i, /^f/i, /^mar/i, /^ap/i, /^mag/i, /^gi/i, /^l/i, /^ag/i, /^s/i, /^o/i, /^n/i, /^d/i]
}, Fo = {
  narrow: /^[dlmgvs]/i,
  short: /^(do|lu|ma|me|gi|ve|sa)/i,
  abbreviated: /^(dom|lun|mar|mer|gio|ven|sab)/i,
  wide: /^(domenica|luned[i|ì]|marted[i|ì]|mercoled[i|ì]|gioved[i|ì]|venerd[i|ì]|sabato)/i
}, Io = {
  narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^g/i, /^v/i, /^s/i],
  any: [/^d/i, /^l/i, /^ma/i, /^me/i, /^g/i, /^v/i, /^s/i]
}, qo = {
  narrow: /^(a|m\.|p|mezzanotte|mezzogiorno|(di|del) (mattina|pomeriggio|sera|notte))/i,
  any: /^([ap]\.?\s?m\.?|mezzanotte|mezzogiorno|(di|del) (mattina|pomeriggio|sera|notte))/i
}, Ho = {
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
}, Go = {
  ordinalNumber: q({
    matchPattern: No,
    parsePattern: xo,
    valueCallback: function(e) {
      return parseInt(e, 10);
    }
  }),
  era: f({
    matchPatterns: Eo,
    defaultMatchWidth: "wide",
    parsePatterns: Lo,
    defaultParseWidth: "any"
  }),
  quarter: f({
    matchPatterns: jo,
    defaultMatchWidth: "wide",
    parsePatterns: zo,
    defaultParseWidth: "any",
    valueCallback: function(e) {
      return e + 1;
    }
  }),
  month: f({
    matchPatterns: Ao,
    defaultMatchWidth: "wide",
    parsePatterns: _o,
    defaultParseWidth: "any"
  }),
  day: f({
    matchPatterns: Fo,
    defaultMatchWidth: "wide",
    parsePatterns: Io,
    defaultParseWidth: "any"
  }),
  dayPeriod: f({
    matchPatterns: qo,
    defaultMatchWidth: "any",
    parsePatterns: Ho,
    defaultParseWidth: "any"
  })
};
const Yo = Go;
var Xo = {
  code: "it",
  formatDistance: mo,
  formatLong: vo,
  formatRelative: Mo,
  localize: Oo,
  match: Yo,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
const Ro = Xo;
var Vo = {
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
}, Bo = function(e, t, a) {
  var r, n = Vo[e];
  return typeof n == "string" ? r = n : t === 1 ? r = n.one : r = n.other.replace("{{count}}", t.toString()), a != null && a.addSuffix ? a.comparison && a.comparison > 0 ? r + " \uD6C4" : r + " \uC804" : r;
};
const Uo = Bo;
var Jo = {
  full: "y\uB144 M\uC6D4 d\uC77C EEEE",
  long: "y\uB144 M\uC6D4 d\uC77C",
  medium: "y.MM.dd",
  short: "y.MM.dd"
}, Qo = {
  full: "a H\uC2DC mm\uBD84 ss\uCD08 zzzz",
  long: "a H:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
}, Zo = {
  full: "{{date}} {{time}}",
  long: "{{date}} {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
}, Ko = {
  date: M({
    formats: Jo,
    defaultWidth: "full"
  }),
  time: M({
    formats: Qo,
    defaultWidth: "full"
  }),
  dateTime: M({
    formats: Zo,
    defaultWidth: "full"
  })
};
const es = Ko;
var ts = {
  lastWeek: "'\uC9C0\uB09C' eeee p",
  yesterday: "'\uC5B4\uC81C' p",
  today: "'\uC624\uB298' p",
  tomorrow: "'\uB0B4\uC77C' p",
  nextWeek: "'\uB2E4\uC74C' eeee p",
  other: "P"
}, as = function(e, t, a, r) {
  return ts[e];
};
const rs = as;
var ns = {
  narrow: ["BC", "AD"],
  abbreviated: ["BC", "AD"],
  wide: ["\uAE30\uC6D0\uC804", "\uC11C\uAE30"]
}, is = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1\uBD84\uAE30", "2\uBD84\uAE30", "3\uBD84\uAE30", "4\uBD84\uAE30"]
}, os = {
  narrow: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
  abbreviated: ["1\uC6D4", "2\uC6D4", "3\uC6D4", "4\uC6D4", "5\uC6D4", "6\uC6D4", "7\uC6D4", "8\uC6D4", "9\uC6D4", "10\uC6D4", "11\uC6D4", "12\uC6D4"],
  wide: ["1\uC6D4", "2\uC6D4", "3\uC6D4", "4\uC6D4", "5\uC6D4", "6\uC6D4", "7\uC6D4", "8\uC6D4", "9\uC6D4", "10\uC6D4", "11\uC6D4", "12\uC6D4"]
}, ss = {
  narrow: ["\uC77C", "\uC6D4", "\uD654", "\uC218", "\uBAA9", "\uAE08", "\uD1A0"],
  short: ["\uC77C", "\uC6D4", "\uD654", "\uC218", "\uBAA9", "\uAE08", "\uD1A0"],
  abbreviated: ["\uC77C", "\uC6D4", "\uD654", "\uC218", "\uBAA9", "\uAE08", "\uD1A0"],
  wide: ["\uC77C\uC694\uC77C", "\uC6D4\uC694\uC77C", "\uD654\uC694\uC77C", "\uC218\uC694\uC77C", "\uBAA9\uC694\uC77C", "\uAE08\uC694\uC77C", "\uD1A0\uC694\uC77C"]
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
}, ls = {
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
}, ds = function(e, t) {
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
}, ms = {
  ordinalNumber: ds,
  era: h({
    values: ns,
    defaultWidth: "wide"
  }),
  quarter: h({
    values: is,
    defaultWidth: "wide",
    argumentCallback: function(e) {
      return e - 1;
    }
  }),
  month: h({
    values: os,
    defaultWidth: "wide"
  }),
  day: h({
    values: ss,
    defaultWidth: "wide"
  }),
  dayPeriod: h({
    values: us,
    defaultWidth: "wide",
    formattingValues: ls,
    defaultFormattingWidth: "wide"
  })
};
const cs = ms;
var hs = /^(\d+)(일|번째)?/i, fs = /\d+/i, gs = {
  narrow: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(기원전|서기)/i
}, vs = {
  any: [/^(bc|기원전)/i, /^(ad|서기)/i]
}, ps = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234]사?분기/i
}, ws = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, bs = {
  narrow: /^(1[012]|[123456789])/,
  abbreviated: /^(1[012]|[123456789])월/i,
  wide: /^(1[012]|[123456789])월/i
}, ys = {
  any: [/^1월?$/, /^2/, /^3/, /^4/, /^5/, /^6/, /^7/, /^8/, /^9/, /^10/, /^11/, /^12/]
}, Ms = {
  narrow: /^[일월화수목금토]/,
  short: /^[일월화수목금토]/,
  abbreviated: /^[일월화수목금토]/,
  wide: /^[일월화수목금토]요일/
}, Ps = {
  any: [/^일/, /^월/, /^화/, /^수/, /^목/, /^금/, /^토/]
}, Ds = {
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
}, $s = {
  ordinalNumber: q({
    matchPattern: hs,
    parsePattern: fs,
    valueCallback: function(e) {
      return parseInt(e, 10);
    }
  }),
  era: f({
    matchPatterns: gs,
    defaultMatchWidth: "wide",
    parsePatterns: vs,
    defaultParseWidth: "any"
  }),
  quarter: f({
    matchPatterns: ps,
    defaultMatchWidth: "wide",
    parsePatterns: ws,
    defaultParseWidth: "any",
    valueCallback: function(e) {
      return e + 1;
    }
  }),
  month: f({
    matchPatterns: bs,
    defaultMatchWidth: "wide",
    parsePatterns: ys,
    defaultParseWidth: "any"
  }),
  day: f({
    matchPatterns: Ms,
    defaultMatchWidth: "wide",
    parsePatterns: Ps,
    defaultParseWidth: "any"
  }),
  dayPeriod: f({
    matchPatterns: Ds,
    defaultMatchWidth: "any",
    parsePatterns: ks,
    defaultParseWidth: "any"
  })
};
const Cs = $s;
var Ss = {
  code: "ko",
  formatDistance: Uo,
  formatLong: es,
  formatRelative: rs,
  localize: cs,
  match: Cs,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
const Ws = Ss;
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
function Ts(e, t, a) {
  a = a || {};
  var r;
  return typeof ie[e] == "string" ? r = ie[e] : t === 1 ? r = ie[e].one : r = ie[e].other.replace("{{count}}", t), a.addSuffix ? a.comparison > 0 ? "daqui a " + r : "h\xE1 " + r : r;
}
var Os = {
  full: "EEEE, d 'de' MMMM 'de' y",
  long: "d 'de' MMMM 'de' y",
  medium: "d 'de' MMM 'de' y",
  short: "dd/MM/y"
}, Ns = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
}, xs = {
  full: "{{date}} '\xE0s' {{time}}",
  long: "{{date}} '\xE0s' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Es = {
  date: M({
    formats: Os,
    defaultWidth: "full"
  }),
  time: M({
    formats: Ns,
    defaultWidth: "full"
  }),
  dateTime: M({
    formats: xs,
    defaultWidth: "full"
  })
};
const Ls = Es;
var js = {
  lastWeek: "'na \xFAltima' eeee '\xE0s' p",
  yesterday: "'ontem \xE0s' p",
  today: "'hoje \xE0s' p",
  tomorrow: "'amanh\xE3 \xE0s' p",
  nextWeek: "eeee '\xE0s' p",
  other: "P"
};
function zs(e, t, a, r) {
  return js[e];
}
function As(e) {
  var t = Number(e);
  return t + "\xBA";
}
var _s = {
  narrow: ["aC", "dC"],
  abbreviated: ["a.C.", "d.C."],
  wide: ["antes de Cristo", "depois de Cristo"]
}, Fs = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["T1", "T2", "T3", "T4"],
  wide: ["1\xBA trimestre", "2\xBA trimestre", "3\xBA trimestre", "4\xBA trimestre"]
}, Is = {
  narrow: ["j", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"],
  abbreviated: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
  wide: ["janeiro", "fevereiro", "mar\xE7o", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"]
}, qs = {
  narrow: ["d", "s", "t", "q", "q", "s", "s"],
  short: ["dom", "seg", "ter", "qua", "qui", "sex", "s\xE1b"],
  abbreviated: ["dom", "seg", "ter", "qua", "qui", "sex", "s\xE1b"],
  wide: ["domingo", "segunda-feira", "ter\xE7a-feira", "quarta-feira", "quinta-feira", "sexta-feira", "s\xE1bado"]
}, Hs = {
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
}, Gs = {
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
}, Ys = {
  ordinalNumber: As,
  era: h({
    values: _s,
    defaultWidth: "wide"
  }),
  quarter: h({
    values: Fs,
    defaultWidth: "wide",
    argumentCallback: function(e) {
      return Number(e) - 1;
    }
  }),
  month: h({
    values: Is,
    defaultWidth: "wide"
  }),
  day: h({
    values: qs,
    defaultWidth: "wide"
  }),
  dayPeriod: h({
    values: Hs,
    defaultWidth: "wide",
    formattingValues: Gs,
    defaultFormattingWidth: "wide"
  })
};
const Xs = Ys;
var Rs = /^(\d+)(º|ª)?/i, Vs = /\d+/i, Bs = {
  narrow: /^(ac|dc|a|d)/i,
  abbreviated: /^(a\.?\s?c\.?|a\.?\s?e\.?\s?c\.?|d\.?\s?c\.?|e\.?\s?c\.?)/i,
  wide: /^(antes de cristo|antes da era comum|depois de cristo|era comum)/i
}, Us = {
  any: [/^ac/i, /^dc/i],
  wide: [/^(antes de cristo|antes da era comum)/i, /^(depois de cristo|era comum)/i]
}, Js = {
  narrow: /^[1234]/i,
  abbreviated: /^T[1234]/i,
  wide: /^[1234](º|ª)? trimestre/i
}, Qs = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Zs = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez)/i,
  wide: /^(janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)/i
}, Ks = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ab/i, /^mai/i, /^jun/i, /^jul/i, /^ag/i, /^s/i, /^o/i, /^n/i, /^d/i]
}, eu = {
  narrow: /^[dstq]/i,
  short: /^(dom|seg|ter|qua|qui|sex|s[áa]b)/i,
  abbreviated: /^(dom|seg|ter|qua|qui|sex|s[áa]b)/i,
  wide: /^(domingo|segunda-?\s?feira|terça-?\s?feira|quarta-?\s?feira|quinta-?\s?feira|sexta-?\s?feira|s[áa]bado)/i
}, tu = {
  narrow: [/^d/i, /^s/i, /^t/i, /^q/i, /^q/i, /^s/i, /^s/i],
  any: [/^d/i, /^seg/i, /^t/i, /^qua/i, /^qui/i, /^sex/i, /^s[áa]/i]
}, au = {
  narrow: /^(a|p|meia-?\s?noite|meio-?\s?dia|(da) (manh[ãa]|tarde|noite|madrugada))/i,
  any: /^([ap]\.?\s?m\.?|meia-?\s?noite|meio-?\s?dia|(da) (manh[ãa]|tarde|noite|madrugada))/i
}, ru = {
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
}, nu = {
  ordinalNumber: q({
    matchPattern: Rs,
    parsePattern: Vs,
    valueCallback: function(e) {
      return parseInt(e, 10);
    }
  }),
  era: f({
    matchPatterns: Bs,
    defaultMatchWidth: "wide",
    parsePatterns: Us,
    defaultParseWidth: "any"
  }),
  quarter: f({
    matchPatterns: Js,
    defaultMatchWidth: "wide",
    parsePatterns: Qs,
    defaultParseWidth: "any",
    valueCallback: function(e) {
      return e + 1;
    }
  }),
  month: f({
    matchPatterns: Zs,
    defaultMatchWidth: "wide",
    parsePatterns: Ks,
    defaultParseWidth: "any"
  }),
  day: f({
    matchPatterns: eu,
    defaultMatchWidth: "wide",
    parsePatterns: tu,
    defaultParseWidth: "any"
  }),
  dayPeriod: f({
    matchPatterns: au,
    defaultMatchWidth: "any",
    parsePatterns: ru,
    defaultParseWidth: "any"
  })
};
const iu = nu;
var ou = {
  code: "pt",
  formatDistance: Ts,
  formatLong: Ls,
  formatRelative: zs,
  localize: Xs,
  match: iu,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
const su = ou;
function K(e, t) {
  if (e.one !== void 0 && t === 1)
    return e.one;
  var a = t % 10, r = t % 100;
  return a === 1 && r !== 11 ? e.singularNominative.replace("{{count}}", t) : a >= 2 && a <= 4 && (r < 10 || r > 20) ? e.singularGenitive.replace("{{count}}", t) : e.pluralGenitive.replace("{{count}}", t);
}
function j(e) {
  return function(t, a) {
    return a.addSuffix ? a.comparison > 0 ? e.future ? K(e.future, t) : "\u0447\u0435\u0440\u0435\u0437 " + K(e.regular, t) : e.past ? K(e.past, t) : K(e.regular, t) + " \u043D\u0430\u0437\u0430\u0434" : K(e.regular, t);
  };
}
var uu = {
  lessThanXSeconds: j({
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
  xSeconds: j({
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
  lessThanXMinutes: j({
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
  xMinutes: j({
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
  aboutXHours: j({
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
  xHours: j({
    regular: {
      singularNominative: "{{count}} \u0447\u0430\u0441",
      singularGenitive: "{{count}} \u0447\u0430\u0441\u0430",
      pluralGenitive: "{{count}} \u0447\u0430\u0441\u043E\u0432"
    }
  }),
  xDays: j({
    regular: {
      singularNominative: "{{count}} \u0434\u0435\u043D\u044C",
      singularGenitive: "{{count}} \u0434\u043D\u044F",
      pluralGenitive: "{{count}} \u0434\u043D\u0435\u0439"
    }
  }),
  aboutXWeeks: j({
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
  xWeeks: j({
    regular: {
      singularNominative: "{{count}} \u043D\u0435\u0434\u0435\u043B\u044F",
      singularGenitive: "{{count}} \u043D\u0435\u0434\u0435\u043B\u0438",
      pluralGenitive: "{{count}} \u043D\u0435\u0434\u0435\u043B\u044C"
    }
  }),
  aboutXMonths: j({
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
  xMonths: j({
    regular: {
      singularNominative: "{{count}} \u043C\u0435\u0441\u044F\u0446",
      singularGenitive: "{{count}} \u043C\u0435\u0441\u044F\u0446\u0430",
      pluralGenitive: "{{count}} \u043C\u0435\u0441\u044F\u0446\u0435\u0432"
    }
  }),
  aboutXYears: j({
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
  xYears: j({
    regular: {
      singularNominative: "{{count}} \u0433\u043E\u0434",
      singularGenitive: "{{count}} \u0433\u043E\u0434\u0430",
      pluralGenitive: "{{count}} \u043B\u0435\u0442"
    }
  }),
  overXYears: j({
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
  almostXYears: j({
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
function lu(e, t, a) {
  return a = a || {}, uu[e](t, a);
}
var du = {
  full: "EEEE, d MMMM y '\u0433.'",
  long: "d MMMM y '\u0433.'",
  medium: "d MMM y '\u0433.'",
  short: "dd.MM.y"
}, mu = {
  full: "H:mm:ss zzzz",
  long: "H:mm:ss z",
  medium: "H:mm:ss",
  short: "H:mm"
}, cu = {
  any: "{{date}}, {{time}}"
}, hu = {
  date: M({
    formats: du,
    defaultWidth: "full"
  }),
  time: M({
    formats: mu,
    defaultWidth: "full"
  }),
  dateTime: M({
    formats: cu,
    defaultWidth: "any"
  })
};
const fu = hu;
var $e = ["\u0432\u043E\u0441\u043A\u0440\u0435\u0441\u0435\u043D\u044C\u0435", "\u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A", "\u0432\u0442\u043E\u0440\u043D\u0438\u043A", "\u0441\u0440\u0435\u0434\u0443", "\u0447\u0435\u0442\u0432\u0435\u0440\u0433", "\u043F\u044F\u0442\u043D\u0438\u0446\u0443", "\u0441\u0443\u0431\u0431\u043E\u0442\u0443"];
function gu(e) {
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
function Ae(e) {
  var t = $e[e];
  return e === 2 ? "'\u0432\u043E " + t + " \u0432' p" : "'\u0432 " + t + " \u0432' p";
}
function vu(e) {
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
var pu = {
  lastWeek: function(e, t, a) {
    var r = e.getUTCDay();
    return le(e, t, a) ? Ae(r) : gu(r);
  },
  yesterday: "'\u0432\u0447\u0435\u0440\u0430 \u0432' p",
  today: "'\u0441\u0435\u0433\u043E\u0434\u043D\u044F \u0432' p",
  tomorrow: "'\u0437\u0430\u0432\u0442\u0440\u0430 \u0432' p",
  nextWeek: function(e, t, a) {
    var r = e.getUTCDay();
    return le(e, t, a) ? Ae(r) : vu(r);
  },
  other: "P"
};
function wu(e, t, a, r) {
  var n = pu[e];
  return typeof n == "function" ? n(t, a, r) : n;
}
var bu = {
  narrow: ["\u0434\u043E \u043D.\u044D.", "\u043D.\u044D."],
  abbreviated: ["\u0434\u043E \u043D. \u044D.", "\u043D. \u044D."],
  wide: ["\u0434\u043E \u043D\u0430\u0448\u0435\u0439 \u044D\u0440\u044B", "\u043D\u0430\u0448\u0435\u0439 \u044D\u0440\u044B"]
}, yu = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["1-\u0439 \u043A\u0432.", "2-\u0439 \u043A\u0432.", "3-\u0439 \u043A\u0432.", "4-\u0439 \u043A\u0432."],
  wide: ["1-\u0439 \u043A\u0432\u0430\u0440\u0442\u0430\u043B", "2-\u0439 \u043A\u0432\u0430\u0440\u0442\u0430\u043B", "3-\u0439 \u043A\u0432\u0430\u0440\u0442\u0430\u043B", "4-\u0439 \u043A\u0432\u0430\u0440\u0442\u0430\u043B"]
}, Mu = {
  narrow: ["\u042F", "\u0424", "\u041C", "\u0410", "\u041C", "\u0418", "\u0418", "\u0410", "\u0421", "\u041E", "\u041D", "\u0414"],
  abbreviated: ["\u044F\u043D\u0432.", "\u0444\u0435\u0432.", "\u043C\u0430\u0440\u0442", "\u0430\u043F\u0440.", "\u043C\u0430\u0439", "\u0438\u044E\u043D\u044C", "\u0438\u044E\u043B\u044C", "\u0430\u0432\u0433.", "\u0441\u0435\u043D\u0442.", "\u043E\u043A\u0442.", "\u043D\u043E\u044F\u0431.", "\u0434\u0435\u043A."],
  wide: ["\u044F\u043D\u0432\u0430\u0440\u044C", "\u0444\u0435\u0432\u0440\u0430\u043B\u044C", "\u043C\u0430\u0440\u0442", "\u0430\u043F\u0440\u0435\u043B\u044C", "\u043C\u0430\u0439", "\u0438\u044E\u043D\u044C", "\u0438\u044E\u043B\u044C", "\u0430\u0432\u0433\u0443\u0441\u0442", "\u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044C", "\u043E\u043A\u0442\u044F\u0431\u0440\u044C", "\u043D\u043E\u044F\u0431\u0440\u044C", "\u0434\u0435\u043A\u0430\u0431\u0440\u044C"]
}, Pu = {
  narrow: ["\u042F", "\u0424", "\u041C", "\u0410", "\u041C", "\u0418", "\u0418", "\u0410", "\u0421", "\u041E", "\u041D", "\u0414"],
  abbreviated: ["\u044F\u043D\u0432.", "\u0444\u0435\u0432.", "\u043C\u0430\u0440.", "\u0430\u043F\u0440.", "\u043C\u0430\u044F", "\u0438\u044E\u043D.", "\u0438\u044E\u043B.", "\u0430\u0432\u0433.", "\u0441\u0435\u043D\u0442.", "\u043E\u043A\u0442.", "\u043D\u043E\u044F\u0431.", "\u0434\u0435\u043A."],
  wide: ["\u044F\u043D\u0432\u0430\u0440\u044F", "\u0444\u0435\u0432\u0440\u0430\u043B\u044F", "\u043C\u0430\u0440\u0442\u0430", "\u0430\u043F\u0440\u0435\u043B\u044F", "\u043C\u0430\u044F", "\u0438\u044E\u043D\u044F", "\u0438\u044E\u043B\u044F", "\u0430\u0432\u0433\u0443\u0441\u0442\u0430", "\u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044F", "\u043E\u043A\u0442\u044F\u0431\u0440\u044F", "\u043D\u043E\u044F\u0431\u0440\u044F", "\u0434\u0435\u043A\u0430\u0431\u0440\u044F"]
}, Du = {
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
}, $u = {
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
function Cu(e, t) {
  var a = t || {}, r = String(a.unit), n;
  return r === "date" ? n = "-\u0435" : r === "week" || r === "minute" || r === "second" ? n = "-\u044F" : n = "-\u0439", e + n;
}
var Su = {
  ordinalNumber: Cu,
  era: h({
    values: bu,
    defaultWidth: "wide"
  }),
  quarter: h({
    values: yu,
    defaultWidth: "wide",
    argumentCallback: function(e) {
      return Number(e) - 1;
    }
  }),
  month: h({
    values: Mu,
    defaultWidth: "wide",
    formattingValues: Pu,
    defaultFormattingWidth: "wide"
  }),
  day: h({
    values: Du,
    defaultWidth: "wide"
  }),
  dayPeriod: h({
    values: ku,
    defaultWidth: "any",
    formattingValues: $u,
    defaultFormattingWidth: "wide"
  })
};
const Wu = Su;
var Tu = /^(\d+)(-?(е|я|й|ое|ье|ая|ья|ый|ой|ий|ый))?/i, Ou = /\d+/i, Nu = {
  narrow: /^((до )?н\.?\s?э\.?)/i,
  abbreviated: /^((до )?н\.?\s?э\.?)/i,
  wide: /^(до нашей эры|нашей эры|наша эра)/i
}, xu = {
  any: [/^д/i, /^н/i]
}, Eu = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234](-?[ыои]?й?)? кв.?/i,
  wide: /^[1234](-?[ыои]?й?)? квартал/i
}, Lu = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, ju = {
  narrow: /^[яфмаисонд]/i,
  abbreviated: /^(янв|фев|март?|апр|ма[йя]|июн[ья]?|июл[ья]?|авг|сент?|окт|нояб?|дек)\.?/i,
  wide: /^(январ[ья]|феврал[ья]|марта?|апрел[ья]|ма[йя]|июн[ья]|июл[ья]|августа?|сентябр[ья]|октябр[ья]|октябр[ья]|ноябр[ья]|декабр[ья])/i
}, zu = {
  narrow: [/^я/i, /^ф/i, /^м/i, /^а/i, /^м/i, /^и/i, /^и/i, /^а/i, /^с/i, /^о/i, /^н/i, /^я/i],
  any: [/^я/i, /^ф/i, /^мар/i, /^ап/i, /^ма[йя]/i, /^июн/i, /^июл/i, /^ав/i, /^с/i, /^о/i, /^н/i, /^д/i]
}, Au = {
  narrow: /^[впсч]/i,
  short: /^(вс|во|пн|по|вт|ср|чт|че|пт|пя|сб|су)\.?/i,
  abbreviated: /^(вск|вос|пнд|пон|втр|вто|срд|сре|чтв|чет|птн|пят|суб).?/i,
  wide: /^(воскресень[ея]|понедельника?|вторника?|сред[аы]|четверга?|пятниц[аы]|суббот[аы])/i
}, _u = {
  narrow: [/^в/i, /^п/i, /^в/i, /^с/i, /^ч/i, /^п/i, /^с/i],
  any: [/^в[ос]/i, /^п[он]/i, /^в/i, /^ср/i, /^ч/i, /^п[ят]/i, /^с[уб]/i]
}, Fu = {
  narrow: /^([дп]п|полн\.?|полд\.?|утр[оа]|день|дня|веч\.?|ноч[ьи])/i,
  abbreviated: /^([дп]п|полн\.?|полд\.?|утр[оа]|день|дня|веч\.?|ноч[ьи])/i,
  wide: /^([дп]п|полночь|полдень|утр[оа]|день|дня|вечера?|ноч[ьи])/i
}, Iu = {
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
}, qu = {
  ordinalNumber: q({
    matchPattern: Tu,
    parsePattern: Ou,
    valueCallback: function(e) {
      return parseInt(e, 10);
    }
  }),
  era: f({
    matchPatterns: Nu,
    defaultMatchWidth: "wide",
    parsePatterns: xu,
    defaultParseWidth: "any"
  }),
  quarter: f({
    matchPatterns: Eu,
    defaultMatchWidth: "wide",
    parsePatterns: Lu,
    defaultParseWidth: "any",
    valueCallback: function(e) {
      return e + 1;
    }
  }),
  month: f({
    matchPatterns: ju,
    defaultMatchWidth: "wide",
    parsePatterns: zu,
    defaultParseWidth: "any"
  }),
  day: f({
    matchPatterns: Au,
    defaultMatchWidth: "wide",
    parsePatterns: _u,
    defaultParseWidth: "any"
  }),
  dayPeriod: f({
    matchPatterns: Fu,
    defaultMatchWidth: "wide",
    parsePatterns: Iu,
    defaultParseWidth: "any"
  })
};
const Hu = qu;
var Gu = {
  code: "ru",
  formatDistance: lu,
  formatLong: fu,
  formatRelative: wu,
  localize: Wu,
  match: Hu,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
};
const Yu = Gu, de = { en: Gn, fr: so, es: Ci, de: En, ca: wr, it: Ro, ru: Yu, pt: su, da: Qr, ko: Ws };
function Xu(e = O(new Date()), t = O("en")) {
  const a = Re({
    start: null,
    end: null
  }), r = _(() => ({
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
  })), n = _(() => ({
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
  })), i = _(() => {
    const v = new Array(o.value), w = _a(e.value), D = e.value.getMonth(), C = e.value.getFullYear();
    for (let L = 1; L <= w; L++)
      v.push({
        year: C,
        month: D,
        date: L,
        formatted: H(new Date(C, D, L), "yyyy-MM-dd")
      });
    const A = new Array(6 - u.value);
    return v.concat(A);
  }), o = _(() => Le(Nt(e.value))), u = _(() => Le(Ot(e.value))), s = _(() => H(e.value, "MMMM yyyy", {
    locale: de[t.value]
  })), d = _(() => {
    const v = $t(new Date());
    return [...Array(7).keys()].map(
      (D) => H(Dt(v, D), "EEEEEE", {
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
    weekdays: d,
    changeShownMonth: (v = new Date()) => {
      e.value = v;
    },
    changeSelectedDate: (v) => {
      if (v && (a.start == null || a.end != null ? (a.start = v, a.end != null && (a.end = null)) : a.end == null && (a.end = v), a && a.end && a.start && a.end.formatted < a.start.formatted)) {
        const w = a.start;
        a.start = a.end, a.end = w;
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
const Ru = ce({
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
    gtm: { type: String, required: !1, default: void 0 }
  },
  setup(e, { emit: t }) {
    const a = I(e, "dateLocale"), r = O(!1), n = O(null), i = O(null), o = O(null), u = (R) => R.stopPropagation(), s = () => {
      r.value && (r.value = !1);
    };
    De(() => {
      document.addEventListener("click", s), n.value && n.value.addEventListener("click", u);
    }), st(() => {
      document.removeEventListener("click", s), n.value && n.value.removeEventListener(
        "click",
        u
      );
    });
    const {
      isoSelectedDates: d,
      readableSelectedDates: l,
      clearSelectedDate: m,
      changeSelectedDate: g,
      weekdays: b,
      shownMonthName: p,
      showNextMonth: v,
      showPreviousMonth: w,
      daysInMonth: D,
      selectedDates: C
    } = Xu(O(e.defaultDate), a);
    return {
      locale: a,
      isoSelectedDates: d,
      readableSelectedDates: l,
      readableStartDate: i,
      readableEndDate: o,
      clearSelectedDate: m,
      changeSelectedDate: g,
      weekdays: b,
      shownMonthName: p,
      showNextMonth: v,
      showPreviousMonth: w,
      daysInMonth: D,
      selectedDates: C,
      clear: () => {
        m(), t("datechanged", d.value), i.value = l.value.start, o.value = l.value.end, s();
      },
      save: () => {
        C && !d.value.end && g(C.start), t("datechanged", d.value), i.value = l.value.start, o.value = l.value.end, s();
      },
      showDateRange: r,
      closeDatePicker: s,
      dateRangePickerElement: n
    };
  }
}), Vu = {
  class: "date-range-picker__wrapper",
  ref: "dateRangePickerElement"
}, Bu = ["aria-label", "aria-expanded", "aria-controls", "data-gtm"], Uu = /* @__PURE__ */ y("svg", {
  class: "dropdown-filters__arrow-down",
  width: "14",
  height: "9",
  viewBox: "0 0 14 9",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ y("path", {
    d: "M1 1L7.10049 7.10049L13.201 1",
    stroke: "black",
    "stroke-width": "2"
  })
], -1), Ju = ["id"], Qu = { class: "months" }, Zu = { class: "month" }, Ku = { class: "month__name" }, el = ["aria-label"], tl = /* @__PURE__ */ y("svg", {
  width: "9",
  height: "14",
  viewBox: "0 0 9 14",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ y("path", {
    d: "M8.10049 1L2 7.10049L8.10049 13.201",
    stroke: "#1B1B1B",
    "stroke-width": "2"
  })
], -1), al = [
  tl
], rl = ["aria-label"], nl = /* @__PURE__ */ y("svg", {
  width: "9",
  height: "14",
  viewBox: "0 0 9 14",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ y("path", {
    d: "M0.899536 13L7.00003 6.89951L0.899537 0.799012",
    stroke: "#1B1B1B",
    "stroke-width": "2"
  })
], -1), il = [
  nl
], ol = { class: "days" }, sl = ["onClick", "aria-hidden", "disabled", "aria-label"], ul = {
  key: 0,
  class: "day__number"
}, ll = { class: "date-range-picker__buttons" }, dl = ["disabled"], ml = { class: "week" };
function cl(e, t, a, r, n, i) {
  return W(), N("div", Vu, [
    y("button", {
      class: "date-range-picker__toggle",
      onClick: t[0] || (t[0] = (o) => e.showDateRange = !e.showDateRange),
      "aria-label": e.ariaToggleCalendar,
      "aria-expanded": e.showDateRange + "",
      "aria-controls": e.pickerId,
      "data-gtm": e.gtm
    }, [
      !e.readableStartDate && !e.readableEndDate ? (W(), N(J, { key: 0 }, [
        ge(z(e.labelDatesFilter), 1)
      ], 64)) : F("", !0),
      e.readableStartDate ? (W(), N(J, { key: 1 }, [
        ge(z(e.readableStartDate), 1)
      ], 64)) : F("", !0),
      e.readableEndDate && e.readableStartDate !== e.readableEndDate ? (W(), N(J, { key: 2 }, [
        ge(" - " + z(e.readableEndDate), 1)
      ], 64)) : F("", !0),
      Uu
    ], 8, Bu),
    Xe(y("div", {
      id: e.pickerId,
      class: "date-range-picker"
    }, [
      y("div", Qu, [
        y("div", Zu, [
          y("div", Ku, [
            y("button", {
              class: "month-selector month-selector--previous",
              "aria-label": e.ariaPreviousMonth,
              onClick: t[1] || (t[1] = (...o) => e.showPreviousMonth && e.showPreviousMonth(...o))
            }, al, 8, el),
            y("span", null, z(e.shownMonthName), 1),
            y("button", {
              class: "month-selector month-selector--next",
              "aria-label": e.ariaNextMonth,
              onClick: t[2] || (t[2] = (...o) => e.showNextMonth && e.showNextMonth(...o))
            }, il, 8, rl)
          ]),
          y("div", ol, [
            (W(!0), N(J, null, pe(e.daysInMonth, (o, u) => (W(), N("button", {
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
              o ? (W(), N("span", ul, z(o.date), 1)) : F("", !0)
            ], 10, sl))), 128))
          ]),
          y("div", ll, [
            y("button", {
              class: "date-range-picker__reset",
              onClick: t[3] || (t[3] = (...o) => e.clear && e.clear(...o))
            }, z(e.labelClearButton), 1),
            y("button", {
              class: "date-range-picker__save",
              onClick: t[4] || (t[4] = (...o) => e.save && e.save(...o)),
              disabled: !e.selectedDates || !e.selectedDates.start && !e.selectedDates.end
            }, z(e.labelSaveButton), 9, dl)
          ])
        ])
      ]),
      y("table", ml, [
        y("tr", null, [
          (W(!0), N(J, null, pe(e.weekdays, (o) => (W(), N("td", {
            class: "weekday",
            key: o
          }, z(o), 1))), 128))
        ])
      ])
    ], 8, Ju), [
      [lt, e.showDateRange]
    ])
  ], 512);
}
const hl = /* @__PURE__ */ he(Ru, [["render", cl]]);
function Me(e, t, a, r, n, i) {
  if (n - r <= a)
    return;
  const o = r + n >> 1;
  at(e, t, o, r, n, i % 2), Me(e, t, a, r, o - 1, i + 1), Me(e, t, a, o + 1, n, i + 1);
}
function at(e, t, a, r, n, i) {
  for (; n > r; ) {
    if (n - r > 600) {
      const d = n - r + 1, l = a - r + 1, m = Math.log(d), g = 0.5 * Math.exp(2 * m / 3), b = 0.5 * Math.sqrt(m * g * (d - g) / d) * (l - d / 2 < 0 ? -1 : 1), p = Math.max(r, Math.floor(a - l * g / d + b)), v = Math.min(n, Math.floor(a + (d - l) * g / d + b));
      at(e, t, a, p, v, i);
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
function fl(e, t, a, r, n, i, o) {
  const u = [0, e.length - 1, 0], s = [];
  let d, l;
  for (; u.length; ) {
    const m = u.pop(), g = u.pop(), b = u.pop();
    if (g - b <= o) {
      for (let w = b; w <= g; w++)
        d = t[2 * w], l = t[2 * w + 1], d >= a && d <= n && l >= r && l <= i && s.push(e[w]);
      continue;
    }
    const p = Math.floor((b + g) / 2);
    d = t[2 * p], l = t[2 * p + 1], d >= a && d <= n && l >= r && l <= i && s.push(e[p]);
    const v = (m + 1) % 2;
    (m === 0 ? a <= d : r <= l) && (u.push(b), u.push(p - 1), u.push(v)), (m === 0 ? n >= d : i >= l) && (u.push(p + 1), u.push(g), u.push(v));
  }
  return s;
}
function gl(e, t, a, r, n, i) {
  const o = [0, e.length - 1, 0], u = [], s = n * n;
  for (; o.length; ) {
    const d = o.pop(), l = o.pop(), m = o.pop();
    if (l - m <= i) {
      for (let w = m; w <= l; w++)
        _e(t[2 * w], t[2 * w + 1], a, r) <= s && u.push(e[w]);
      continue;
    }
    const g = Math.floor((m + l) / 2), b = t[2 * g], p = t[2 * g + 1];
    _e(b, p, a, r) <= s && u.push(e[g]);
    const v = (d + 1) % 2;
    (d === 0 ? a - n <= b : r - n <= p) && (o.push(m), o.push(g - 1), o.push(v)), (d === 0 ? a + n >= b : r + n >= p) && (o.push(g + 1), o.push(l), o.push(v));
  }
  return u;
}
function _e(e, t, a, r) {
  const n = e - a, i = t - r;
  return n * n + i * i;
}
const vl = (e) => e[0], pl = (e) => e[1];
class Fe {
  constructor(t, a = vl, r = pl, n = 64, i = Float64Array) {
    this.nodeSize = n, this.points = t;
    const o = t.length < 65536 ? Uint16Array : Uint32Array, u = this.ids = new o(t.length), s = this.coords = new i(t.length * 2);
    for (let d = 0; d < t.length; d++)
      u[d] = d, s[2 * d] = a(t[d]), s[2 * d + 1] = r(t[d]);
    Me(u, s, n, 0, u.length - 1, 0);
  }
  range(t, a, r, n) {
    return fl(this.ids, this.coords, t, a, r, n, this.nodeSize);
  }
  within(t, a, r) {
    return gl(this.ids, this.coords, t, a, r, this.nodeSize);
  }
}
const wl = {
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
class bl {
  constructor(t) {
    this.options = te(Object.create(wl), t), this.trees = new Array(this.options.maxZoom + 1);
  }
  load(t) {
    const { log: a, minZoom: r, maxZoom: n, nodeSize: i } = this.options;
    a && console.time("total time");
    const o = `prepare ${t.length} points`;
    a && console.time(o), this.points = t;
    let u = [];
    for (let s = 0; s < t.length; s++)
      !t[s].geometry || u.push(Ml(t[s], s));
    this.trees[n + 1] = new Fe(u, qe, He, i, Float32Array), a && console.timeEnd(o);
    for (let s = n; s >= r; s--) {
      const d = +Date.now();
      u = this._cluster(u, s), this.trees[s] = new Fe(u, qe, He, i, Float32Array), a && console.log("z%d: %d clusters in %dms", s, u.length, +Date.now() - d);
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
      const l = this.getClusters([r, n, 180, o], a), m = this.getClusters([-180, n, i, o], a);
      return l.concat(m);
    }
    const u = this.trees[this._limitZoom(a)], s = u.range(oe(r), se(o), oe(i), se(n)), d = [];
    for (const l of s) {
      const m = u.points[l];
      d.push(m.numPoints ? Ie(m) : this.points[m.index]);
    }
    return d;
  }
  getChildren(t) {
    const a = this._getOriginId(t), r = this._getOriginZoom(t), n = "No cluster with the specified id.", i = this.trees[r];
    if (!i)
      throw new Error(n);
    const o = i.points[a];
    if (!o)
      throw new Error(n);
    const u = this.options.radius / (this.options.extent * Math.pow(2, r - 1)), s = i.within(o.x, o.y, u), d = [];
    for (const l of s) {
      const m = i.points[l];
      m.parentId === t && d.push(m.numPoints ? Ie(m) : this.points[m.index]);
    }
    if (d.length === 0)
      throw new Error(n);
    return d;
  }
  getLeaves(t, a, r) {
    a = a || 10, r = r || 0;
    const n = [];
    return this._appendLeaves(n, t, a, r, 0), n;
  }
  getTile(t, a, r) {
    const n = this.trees[this._limitZoom(t)], i = Math.pow(2, t), { extent: o, radius: u } = this.options, s = u / o, d = (r - s) / i, l = (r + 1 + s) / i, m = {
      features: []
    };
    return this._addTileFeatures(
      n.range((a - s) / i, d, (a + 1 + s) / i, l),
      n.points,
      a,
      r,
      i,
      m
    ), a === 0 && this._addTileFeatures(
      n.range(1 - s / i, d, 1, l),
      n.points,
      i,
      r,
      i,
      m
    ), a === i - 1 && this._addTileFeatures(
      n.range(0, d, s / i, l),
      n.points,
      -1,
      r,
      i,
      m
    ), m.features.length ? m : null;
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
      const s = a[u], d = s.numPoints;
      let l, m, g;
      if (d)
        l = rt(s), m = s.x, g = s.y;
      else {
        const v = this.points[s.index];
        l = v.properties, m = oe(v.geometry.coordinates[0]), g = se(v.geometry.coordinates[1]);
      }
      const b = {
        type: 1,
        geometry: [[
          Math.round(this.options.extent * (m * i - r)),
          Math.round(this.options.extent * (g * i - n))
        ]],
        tags: l
      };
      let p;
      d ? p = s.id : this.options.generateId ? p = s.index : this.points[s.index].id && (p = this.points[s.index].id), p !== void 0 && (b.id = p), o.features.push(b);
    }
  }
  _limitZoom(t) {
    return Math.max(this.options.minZoom, Math.min(Math.floor(+t), this.options.maxZoom + 1));
  }
  _cluster(t, a) {
    const r = [], { radius: n, extent: i, reduce: o, minPoints: u } = this.options, s = n / (i * Math.pow(2, a));
    for (let d = 0; d < t.length; d++) {
      const l = t[d];
      if (l.zoom <= a)
        continue;
      l.zoom = a;
      const m = this.trees[a + 1], g = m.within(l.x, l.y, s), b = l.numPoints || 1;
      let p = b;
      for (const v of g) {
        const w = m.points[v];
        w.zoom > a && (p += w.numPoints || 1);
      }
      if (p > b && p >= u) {
        let v = l.x * b, w = l.y * b, D = o && b > 1 ? this._map(l, !0) : null;
        const C = (d << 5) + (a + 1) + this.points.length;
        for (const A of g) {
          const L = m.points[A];
          if (L.zoom <= a)
            continue;
          L.zoom = a;
          const R = L.numPoints || 1;
          v += L.x * R, w += L.y * R, L.parentId = C, o && (D || (D = this._map(l, !0)), o(D, this._map(L)));
        }
        l.parentId = C, r.push(yl(v / p, w / p, C, p, D));
      } else if (r.push(l), p > 1)
        for (const v of g) {
          const w = m.points[v];
          w.zoom <= a || (w.zoom = a, r.push(w));
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
function yl(e, t, a, r, n) {
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
function Ml(e, t) {
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
      coordinates: [Pl(e.x), Dl(e.y)]
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
function Pl(e) {
  return (e - 0.5) * 360;
}
function Dl(e) {
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
class $l {
  constructor({ maxZoom: t = 16 }) {
    this.maxZoom = t;
  }
  noop({ markers: t }) {
    return Cl(t);
  }
}
const Cl = (e) => e.map((a) => new Pe({
  position: a.getPosition(),
  markers: [a]
}));
class Sl extends $l {
  constructor(t) {
    var { maxZoom: a, radius: r = 60 } = t, n = kl(t, ["maxZoom", "radius"]);
    super({ maxZoom: a }), this.superCluster = new bl(Object.assign({ maxZoom: this.maxZoom, radius: r }, n)), this.state = { zoom: null };
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
class Tl {
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
function Ol(e, t) {
  for (let a in t.prototype)
    e.prototype[a] = t.prototype[a];
}
class Ce {
  constructor() {
    Ol(Ce, google.maps.OverlayView);
  }
}
var ae;
(function(e) {
  e.CLUSTERING_BEGIN = "clusteringbegin", e.CLUSTERING_END = "clusteringend", e.CLUSTER_CLICK = "click";
})(ae || (ae = {}));
const Nl = (e, t, a) => {
  a.fitBounds(t.bounds);
};
class xl extends Ce {
  constructor({ map: t, markers: a = [], algorithm: r = new Sl({}), renderer: n = new Tl(), onClusterClick: i = Nl }) {
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
var El = function e(t, a) {
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
var Q;
(function(e) {
  e[e.INITIALIZED = 0] = "INITIALIZED", e[e.LOADING = 1] = "LOADING", e[e.SUCCESS = 2] = "SUCCESS", e[e.FAILURE = 3] = "FAILURE";
})(Q || (Q = {}));
class X {
  constructor({ apiKey: t, channel: a, client: r, id: n = Ye, libraries: i = [], language: o, region: u, version: s, mapIds: d, nonce: l, retries: m = 3, url: g = "https://maps.googleapis.com/maps/api/js" }) {
    if (this.CALLBACK = "__googleMapsCallback", this.callbacks = [], this.done = !1, this.loading = !1, this.errors = [], this.version = s, this.apiKey = t, this.channel = a, this.client = r, this.id = n || Ye, this.libraries = i, this.language = o, this.region = u, this.mapIds = d, this.nonce = l, this.retries = m, this.url = g, X.instance) {
      if (!El(this.options, X.instance.options))
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
    return this.errors.length ? Q.FAILURE : this.done ? Q.SUCCESS : this.loading ? Q.LOADING : Q.INITIALIZED;
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
function nt() {
  const e = (a) => {
    if (!!a) {
      window.dataLayer || (window.dataLayer = []);
      try {
        const r = t(a);
        if (r)
          for (let n = 0; n < r.length; n++)
            window.dataLayer.push(r[n]);
      } catch (r) {
        console.warn("[useGtm.js] - ", r);
      }
    }
  }, t = (a) => {
    let r = a.replace(/\\n/g, "\\n").replace(/\\'/g, "\\'").replace(/\\"/g, '\\"').replace(/\\&/g, "\\&").replace(/\\r/g, "\\r").replace(/\\t/g, "\\t").replace(/\\b/g, "\\b").replace(/\\f/g, "\\f");
    return r = r.replace(/[\u0000-\u0019]+/g, ""), JSON.parse(r);
  };
  return {
    pushEvent: e
  };
}
const Ll = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAA1CAYAAADh5qNwAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMXSURBVHgB7ZnPbxJBFMcfajRBRTQYTdWKBw1JL403kh7w0niDgz+O/qLXCukfUHrzUtt4LUq96qF4q73YJo29UQ+ijcZASjWaElsw4u/gm2WHDhsg+2ZnGw7zSV52ZoHd+c6bX+8BoNFoNBqNRqNpgwdcoF6vB/ESRYugDaIFhY+Lpi2iLXk8nkXoZVBMBO1FnUYB7Qb0GswzEmLaiQuCAhwPP2xIDC8ZND+/V639hdfrNXi6XIaXa9+MerX2z/hsoN8LpwMH4PJFP9pR8Hn3WR85gUMyBQ5wJAoF3YSGoCYzC5/hfvZjU0Q3fN69EB8+CSPDJ6ziHAmTFmV6aI7XS+VfcOfBO8iv/wAqZwL74eHoBcOLAtLCpESZY38VzCGXx6F2GwVtlH+DE6bj5+Dq0HHx1iWZ1XEPyDEFpiDmIRWCGIl0AVZwDgpksAP9QIQsypxHMV6/cu+tEkGcZPqDsbCYBNHuAhEZTzX3lCfLm0oFMUr4vMnsJ/FWguotkihzLkV4fRJXOTdI4woqeIsJGqT8nuqpKC/M57aUe0lkZuGLWCWdOKiiIrzARLmJZcGIAAGqqCAvvMFl3E1W1qot76XMK6qo5tjOuyyKsYHbhcARsInsPtXTaFHQCO4M2EnbbSzvqIBNqKJe8UI4dBjcZKD/oFgt4hlwG2wiLcpyolZOOHSo7XvtQBW1xAvXhwJGPOQWIxhnCWSBAEmUGQYwM4K6OAZ3bnANO0yYT2zYPSP8XGr1e8wLrDdVLxiss8Zip8RbWcp8YpBF4QtmwRzjrAGPRs+DSsZifWJHFdEmgIjsPpXkBbZgTGHEqgLmoXjrXEphJxaBiJMcRQIaEbBBI6R/bz3a2KIx5PqsgqZRUBIkcJpNGsdLitdZaM9iLJYas0s45DNyE5a5OYuCboEkKvJ+LcIYTNx8bhue575aQwiDnbzfsXabuLSHlFJvpJsLnVKvpc2fTat8/9Ppa1to5HyE67BGdRPXRcy4TNZoV8EGRtEyaKsdhBTQ5sxOUC7Glb9yrGDDzwrVCnUz1Wg0Go1Go9l9/gNvkCMbp4Ut3AAAAABJRU5ErkJggg==";
function jl(e = {
  apiKey: null,
  mapId: null,
  markersData: O([]),
  center: O(null),
  defaultPinImg: null,
  defaultLocationImg: null,
  clusterOptions: null,
  markerSize: 50,
  hasCluster: !0,
  fitMarkers: !1,
  zoom: 15,
  mapOptions: null,
  dateLocale: O("en"),
  labelBuyButton: O("Buy Tickets"),
  labelDirectionButton: O("View on Google Maps"),
  ariaLocateButton: "Your Location"
}) {
  const { pushEvent: t } = nt();
  let a = null, r = null;
  const n = new X({
    apiKey: e.apiKey,
    version: "weekly"
  }), i = O([]), o = O(null), u = O(null), s = () => new Promise(async (c) => {
    if (!e.mapOptions)
      throw new Error("[useGoogleMap.js] no map options");
    await n.load(), a = new google.maps.Map(
      document.getElementById(e.mapId),
      e.mapOptions
    ), r = new google.maps.InfoWindow(), google.maps.event.addListenerOnce(a, "idle", () => {
      c(!0);
    });
  }), d = () => {
    i.value.forEach((c) => c.setMap(null)), i.value = [];
  }, l = () => {
    d();
    const c = [...e.markersData.value];
    if (!c)
      return;
    const x = [];
    c.forEach((S) => {
      if (!S || typeof S.visible < "u" && !S.visible)
        return;
      let k = { ...S }, V = null;
      k.pinImg ? V = {
        url: k.pinImg,
        scaledSize: new google.maps.Size(e.markerSize, e.markerSize),
        labelOrigin: new google.maps.Point(
          e.markerSize / 2,
          e.markerSize + 4
        )
      } : k.category && k.category.pinImg ? V = {
        url: k.category.pinImg,
        scaledSize: new google.maps.Size(e.markerSize, e.markerSize),
        labelOrigin: new google.maps.Point(
          e.markerSize / 2,
          e.markerSize + 4
        )
      } : e.defaultPinImg && (V = {
        url: e.defaultPinImg,
        scaledSize: new google.maps.Size(e.markerSize, e.markerSize),
        labelOrigin: new google.maps.Point(
          e.markerSize / 2,
          e.markerSize + 4
        )
      });
      const fe = k.pinLabel ? {
        text: k.pinLabel,
        color: "#000",
        fontSize: "14px",
        fontWeight: "bold"
      } : void 0;
      if (k.showName && k.latitude && k.longitude && parseFloat(k.latitude) != NaN && parseFloat(k.longitude) != NaN && parseFloat(k.latitude) >= -90 && parseFloat(k.latitude) <= 90 && parseFloat(k.longitude) >= -180 && parseFloat(k.longitude) <= 180) {
        const it = new google.maps.LatLng(
          parseFloat(k.latitude),
          parseFloat(k.longitude)
        ), Se = new google.maps.Marker({
          position: it,
          icon: V,
          title: `${k.showName}`,
          optimized: !1,
          map: a,
          label: fe
        });
        Se.info = k, x.push(Se);
      }
    }), u.value = new google.maps.LatLngBounds(), x.forEach((S) => {
      u.value.extend(S.getPosition()), S.addListener("click", (k) => {
        C(S), S && S.info && S.info.showName && t(
          `[{ "event": "userAction", "eventAction": "Click on Map", "eventCategory": "Interactive Map", "eventLabel": "${S.info.showName} - ${S.info.city}"}]`
        );
      });
    }), i.value = x;
  }, m = () => {
    o.value && o.value.clearMarkers(), o.value = null;
  }, g = () => {
    m();
    const c = {
      render: ({ count: x, position: S }) => new google.maps.Marker({
        label: { text: String(x), color: "white", fontSize: "14px" },
        position: S,
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
        zIndex: Number(google.maps.Marker.MAX_ZINDEX) + x
      })
    };
    o.value = new xl({
      map: a,
      markers: i.value,
      renderer: c
    });
  }, b = () => {
    if (!(!a || !u.value)) {
      a.fitBounds(u.value);
      var c = D();
      c > 12 && a.setZoom(12);
    }
  }, p = (c) => {
    !a || !c || a.panTo(c.getPosition());
  }, v = (c, x) => {
    !a || !c || !x || a.panTo({ lat: c, lng: x });
  }, w = (c) => {
    !a || !c || a.setZoom(parseFloat(c));
  }, D = () => {
    if (!!a)
      return a.getZoom();
  }, C = (c) => {
    if (!c || !c.info)
      return;
    const x = c.info.showName ? c.info.showName.split('"').join("") : "", S = c.info.showThumbnail ? c.info.showThumbnail : c.info.showImage, k = c.info.showPageUrl ? JSON.stringify(
      `[{ "event": "userAction", "eventAction": "Buy Tickets", "eventCategory": "Interactive Map", "eventLabel": "${x} - ${c.info.city}"}]`
    ) : null, V = JSON.stringify(
      `[{ "event": "userAction", "eventAction": "View on Google Maps", "eventCategory": "Interactive Map", "eventLabel": "${x} - ${c.info.city}"}]`
    ), fe = {
      pixelOffset: c ? null : new google.maps.Size(0, -50),
      content: `<div class="marker marker--${c.info.id}">
            <div class="marker__image-wrapper">
              ${S ? ` <img class="marker__image" width="590" height="590" src="${S}" />` : ""}
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
              <a class="marker__cta marker__cta--small cta-btn cta-btn--ghost cta-btn--full-width" href="https://www.google.com/maps/dir/?api=1&destination=${c.info.latitude},${c.info.longitude}&travelmode=driving" onclick='window.mapPushToDataLayer(${V})'>
      ${e.labelDirectionButton.value}
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.12498 1.875L10.1831 3.93313L5.80811 8.30812L6.69186 9.19187L11.0669 4.81687L13.125 6.875V1.875H8.12498Z" fill="white"/>
                  <path d="M11.875 11.875H3.125V3.125H7.5L6.25 1.875H3.125C2.43562 1.875 1.875 2.43562 1.875 3.125V11.875C1.875 12.5644 2.43562 13.125 3.125 13.125H11.875C12.5644 13.125 13.125 12.5644 13.125 11.875V8.75L11.875 7.5V11.875Z" fill="white"/>
                </svg>
              </a>
              ${c.info.showPageUrl ? `<a class="marker__cta cta-btn cta-btn--grey cta-btn--full-width" href="${c.info.showPageUrl}" onclick='window.mapPushToDataLayer(${k})'>
                      ${e.labelBuyButton.value}
                    </a>` : ""}

            </div>
            </div>`
    };
    A(c, fe);
  }, A = (c, x) => {
    r.setOptions(x), r.open({
      map: a,
      anchor: c
    });
  }, L = () => {
    r.close();
  }, R = () => {
    const c = document.createElement("button");
    c.ariaLabel = e.ariaLocateButton, c.innerHTML = `
    <svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.3873 0.939606C9.06938 0.171571 7.53429 -0.138686 6.0215 0.0572265C4.50872 0.253139 3.1033 0.944205 2.02447 2.02264C0.945634 3.10107 0.25404 4.50622 0.0575599 6.01893C-0.13892 7.53165 0.170761 9.06685 0.938302 10.3851L6.28307 19.6372C6.33025 19.7198 6.39334 19.7922 6.46869 19.8503C6.54404 19.9083 6.63016 19.9508 6.72205 19.9754C6.87609 20.0166 7.0394 20.0058 7.18669 19.9448C7.33398 19.8837 7.45702 19.7758 7.53673 19.6377L12.878 10.3881C13.7983 8.80437 14.053 6.92023 13.5861 5.14895C13.1192 3.37768 11.9688 1.86389 10.3873 0.939606ZM12.3681 6.90817C12.3685 7.87495 12.112 8.82447 11.6248 9.65954L6.90737 17.8296L2.18842 9.65701C1.70554 8.82753 1.44964 7.88551 1.44647 6.92573C1.44329 5.96594 1.69295 5.02225 2.17033 4.1896C2.6477 3.35695 3.33596 2.66471 4.16584 2.18253C4.99572 1.70036 5.93796 1.44526 6.89775 1.44289C7.37068 1.44313 7.84159 1.50457 8.29875 1.62568C9.46505 1.93308 10.4968 2.61793 11.2329 3.57336C11.9691 4.52878 12.3682 5.70103 12.3681 6.90715V6.90817Z" fill="black"/>
      <path d="M6.90737 3.43528C5.98644 3.43528 5.10322 3.80112 4.45203 4.45232C3.80083 5.10352 3.43499 5.98673 3.43499 6.90766C3.43499 7.82859 3.80083 8.71181 4.45203 9.363C5.10322 10.0142 5.98644 10.38 6.90737 10.38C7.8283 10.38 8.71151 10.0142 9.36271 9.363C10.0139 8.71181 10.3797 7.82859 10.3797 6.90766C10.3797 5.98673 10.0139 5.10352 9.36271 4.45232C8.71151 3.80112 7.8283 3.43528 6.90737 3.43528ZM6.90737 8.93347C6.5068 8.93347 6.11523 8.81469 5.78217 8.59214C5.44911 8.3696 5.18952 8.05329 5.03623 7.68322C4.88294 7.31314 4.84284 6.90592 4.92098 6.51305C4.99913 6.12018 5.19202 5.75931 5.47527 5.47606C5.75851 5.19282 6.11938 4.99993 6.51225 4.92178C6.90512 4.84364 7.31234 4.88374 7.68242 5.03703C8.05249 5.19032 8.3688 5.44991 8.59134 5.78297C8.81389 6.11603 8.93267 6.5076 8.93267 6.90817C8.93267 7.44531 8.71929 7.96045 8.33947 8.34027C7.95965 8.72009 7.44451 8.93347 6.90737 8.93347Z" fill="black"/>
    </svg>`, c.classList.add("location-button"), a.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(c), c.addEventListener("click", () => {
      navigator.geolocation ? navigator.geolocation.getCurrentPosition(
        (x) => {
          const S = {
            lat: x.coords.latitude,
            lng: x.coords.longitude
          }, k = {
            url: e.defaultLocationImg ? e.defaultLocationImg : Ll,
            scaledSize: new google.maps.Size(30, 30)
          };
          new google.maps.Marker({
            position: S,
            optimized: !1,
            map: a,
            icon: k
          }), a.setCenter(S), a.setZoom(8);
        },
        () => {
          console.warn("Error: The Geolocation service failed.");
        }
      ) : console.warn("Error: Your browser doesn't support geolocation.");
    });
  }, re = () => {
    e.fitMarkers ? i.value && i.value.length > 0 ? b() : (w(2), v(40.866667, 34.566667)) : e.center.value && e.zoom && (w(e.zoom), v(e.center.value.lat, e.center.value.lng));
  };
  return De(() => {
    window.mapPushToDataLayer = (c) => t(c), dt(async () => {
      try {
        await s(), R(), e.markersData.value.length > 0 && (l(), e.hasCluster && g(), re()), we(e.markersData, () => {
          l(), e.hasCluster && g(), re();
        }), we(e.center, () => {
          re();
        });
      } catch (c) {
        console.warn("[useGoogleMap.js] error loading the sdk", c);
      }
    });
  }), {
    loadMap: s,
    closeInfoWindow: L,
    openInfoWindow: A,
    openShowInfo: C,
    setZoom: w,
    getZoom: D,
    centerOnMarker: p,
    createMarkers: l,
    clearMarkers: d,
    createClusters: g,
    resetMapPosition: re
  };
}
function zl(e) {
  const { pushEvent: t } = nt(), a = O(null), r = O(null), n = Re({
    start: null,
    end: null
  }), i = _(() => {
    let l = [];
    return e.value.forEach((m) => {
      l.findIndex((g) => g.value === m.category.value) < 0 && l.push(m.category);
    }), l;
  }), o = _(
    () => [...new Set(e.value.map((l) => l.showName))].map(
      (l) => ({ label: l, value: l })
    )
  ), u = _(() => e.value.filter((l) => {
    let m = !0;
    if (typeof l.visible < "u" && !l.visible)
      return !1;
    if (a.value && (m = Math.min(
      l.showType === a.value,
      m
    )), r.value && r.value !== "all" && (m = Math.min(
      l.showName === r.value,
      m
    )), e.value && n.end) {
      const g = new Date(n.start), b = new Date(n.end), p = new Date(l.startDate), v = new Date(l.endDate);
      m = Math.min(
        St(
          { start: g, end: b },
          { start: p, end: v }
        ),
        m
      );
    }
    return m;
  }) || []);
  return {
    showTypes: i,
    showNames: o,
    markersDataResults: u,
    changeCurrentDates: (l) => {
      Object.assign(n, l), l.start && l.end ? t(
        '[{ "event": "userAction", "eventAction": "Click on Search", "eventCategory": "Interactive Map", "eventLabel": "Date Range Picker Search"}]'
      ) : t(
        '[{ "event": "userAction", "eventAction": "Click on Clear", "eventCategory": "Interactive Map", "eventLabel": "Date Range Picker Clear"}]'
      );
    },
    changeCurrentShowName: (l) => {
      r.value = l, t(
        `[{ "event": "userAction", "eventAction": "Select Show", "eventCategory": "Interactive Map", "eventLabel": "${l}"}]`
      );
    }
  };
}
const Al = ce({
  name: "InteractiveMap",
  components: {
    DropdownFilters: Pt,
    DateRangePicker: hl
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
    gtmDate: {
      type: String,
      required: !1,
      default: '[{ "event": "userAction", "eventAction": "Click on Dates", "eventCategory": "Interactive Map", "eventLabel": "Date Range Picker Toggle"}]'
    },
    gtmShow: {
      type: String,
      required: !1,
      default: '[{ "event": "userAction", "eventAction": "Click on All Shows", "eventCategory": "Interactive Map", "eventLabel": "Show Selector Toggle"}]'
    }
  },
  setup(e, { emit: t }) {
    const a = I(e, "markersData"), r = I(e, "dateLocale"), n = I(e, "labelBuyButton"), i = I(e, "labelDirectionButton"), o = I(e, "center"), {
      showNames: u,
      markersDataResults: s,
      changeCurrentDates: d,
      changeCurrentShowName: l
    } = zl(a), m = (b) => {
      l(b);
    }, g = (b) => {
      d(b);
    };
    return jl({
      apiKey: e.googleMapApiKey,
      mapId: e.mapId,
      markersData: s,
      center: o,
      zoom: e.zoom,
      defaultPinImg: e.defaultPinImg,
      hasCluster: e.hasCluster,
      markerSize: e.markerSize ? parseInt(e.markerSize) : 50,
      fitMarkers: e.fitMarkers,
      clusterOptions: e.clusterOptions,
      dateLocale: r,
      labelBuyButton: n,
      labelDirectionButton: i,
      ariaLocateButton: e.ariaLocateButton,
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
      showNames: u,
      onShowNameFilterChange: m,
      onDateChanged: g,
      locale: r
    };
  }
}), _l = { class: "interactive-map__container" }, Fl = { class: "interactive-map__split" }, Il = {
  key: 0,
  class: "filters-wrapper"
}, ql = {
  key: 0,
  class: "interactive-map__title"
}, Hl = {
  key: 1,
  class: "interactive-map__description"
}, Gl = { class: "interactive-map__slots" }, Yl = { class: "filters" }, Xl = { class: "interactive-map__wrapper" }, Rl = { class: "interactive-map" }, Vl = ["id"], Bl = {
  key: 0,
  class: "loading"
}, Ul = /* @__PURE__ */ y("div", { class: "spinner" }, null, -1), Jl = [
  Ul
];
function Ql(e, t, a, r, n, i) {
  const o = be("DateRangePicker"), u = be("DropdownFilters");
  return W(), N("div", _l, [
    y("div", Fl, [
      e.mapTitle || !e.hideFilters ? (W(), N("div", Il, [
        e.mapTitle ? (W(), N("h2", ql, z(e.mapTitle), 1)) : F("", !0),
        e.mapDescription ? (W(), N("p", Hl, z(e.mapDescription), 1)) : F("", !0),
        y("div", Gl, [
          Ve(e.$slots, "default")
        ]),
        y("div", Yl, [
          e.hideFilters ? F("", !0) : (W(), We(o, {
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
            gtm: e.gtmDate,
            "picker-id": e.mapId + "__picker"
          }, null, 8, ["onDatechanged", "date-locale", "label-clear-button", "label-save-button", "label-dates-filter", "aria-select-date", "aria-next-month", "aria-previous-month", "aria-toggle-calendar", "gtm", "picker-id"])),
          e.hideFilters ? F("", !0) : (W(), We(u, {
            key: 1,
            class: "filters__shownames",
            ref: "filterDropdownElement",
            filters: e.showNames,
            "label-default": e.labelShowNameFilterDefault,
            placeholder: e.placeholderShowNameFilter,
            onOnfilterchange: e.onShowNameFilterChange,
            gtm: e.gtmShow
          }, null, 8, ["filters", "label-default", "placeholder", "onOnfilterchange", "gtm"]))
        ])
      ])) : F("", !0),
      y("div", Xl, [
        y("div", Rl, [
          y("div", {
            id: e.mapId,
            class: "map"
          }, null, 8, Vl),
          Be(mt, { name: "spinner-fade" }, {
            default: Ue(() => [
              e.isLoading ? (W(), N("div", Bl, Jl)) : F("", !0)
            ]),
            _: 1
          })
        ])
      ])
    ])
  ]);
}
const Zl = /* @__PURE__ */ he(Al, [["render", Ql]]);
function Kl(e, t, a) {
  let r = O(!1);
  const n = O([]), i = _(() => {
    let u = [];
    return n.value.forEach((s, d) => {
      if (a && a.value) {
        const l = a.value.find(
          (m) => m.value == s.showName
        );
        l && (s = { ...s, ...l });
      }
      s && s.runs && s.runs.forEach((l) => {
        const m = { ...s, ...l };
        t && t.value && (m.category = t.value.find(
          (g) => g.value == m.showType
        )), delete m.runs, u.push(m);
      });
    }), u;
  }), o = async () => {
    if (!e.value)
      return;
    r.value = !0;
    const u = fetch(e.value).then((s) => s.json()).catch((s) => (console.warn("[InteractiveMapApi] Failed silently because of: ", s), []));
    return n.value = await u.then((s) => (r.value = !1, s && s.content && s.content.Result && s.content.Result.shows ? s.content.Result.shows : [])).catch(() => r.value = !1), Promise.resolve(!0);
  };
  return De(o), we(e, o), { shows: n, runs: i, isLoading: r, fetchShows: o };
}
const ed = ce({
  name: "InteractiveMapApi",
  components: {
    InteractiveMap: Zl
  },
  props: {
    apiUrl: { type: String, required: !0 },
    categoriesOverwrite: { type: Array, default: () => [] },
    showsOverwrite: { type: Array, default: () => [] }
  },
  setup(e) {
    const t = I(e, "apiUrl"), a = I(e, "categoriesOverwrite"), r = I(e, "showsOverwrite"), { runs: n, isLoading: i } = Kl(
      t,
      a,
      r
    );
    return {
      runs: n,
      isLoading: i
    };
  }
}), td = { class: "interactive-map-api" };
function ad(e, t, a, r, n, i) {
  const o = be("InteractiveMap");
  return W(), N("div", null, [
    y("div", td, [
      Be(o, ct({ ...e.$props, ...e.$attrs }, {
        "markers-data": e.runs,
        "is-loading": e.isLoading
      }), {
        default: Ue(() => [
          Ve(e.$slots, "default")
        ]),
        _: 3
      }, 16, ["markers-data", "is-loading"])
    ])
  ]);
}
const nd = /* @__PURE__ */ he(ed, [["render", ad]]);
export {
  hl as DateRangePicker,
  Pt as DropdownFilters,
  Zl as InteractiveMap,
  nd as InteractiveMapApi,
  Kl as useShowsApi
};
