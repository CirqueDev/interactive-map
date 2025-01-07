import { defineComponent as ce, toRef as H, ref as N, computed as F, openBlock as C, createElementBlock as T, createElementVNode as b, withDirectives as Ze, toDisplayString as L, createCommentVNode as I, Fragment as te, renderList as ye, vModelSelect as ft, reactive as Ue, onMounted as $e, onBeforeUnmount as gt, createTextVNode as ge, normalizeClass as pt, vShow as wt, nextTick as vt, watch as be, resolveComponent as Me, renderSlot as Ke, createBlock as Te, createVNode as et, Transition as yt, withCtx as tt, mergeProps as bt } from "vue";
function me() {
  function e(o, d = null) {
    if (o)
      try {
        const s = i(o, d), c = r(s);
        n(c);
      } catch (s) {
        console.warn("[useTracking] - ", s);
      }
  }
  function t(o, d = null) {
    if (o)
      try {
        const s = i(o, d), c = r(s);
        n(c);
      } catch (s) {
        console.warn("[useTracking] - ", s);
      }
  }
  function n(o) {
    if (o)
      if (window.dataLayer || (window.dataLayer = []), Array.isArray(o))
        for (let d = 0; d < o.length; d++)
          window.dataLayer.push(o[d]);
      else
        window.dataLayer.push(o);
  }
  function a(o, d = null) {
    if (!o) return;
    const s = Object.keys(o);
    for (let c = 0; c < s.length; ++c) {
      const l = s[c], u = o[l];
      switch (l) {
        case "ga4":
          t(u, d);
          break;
        case "gua":
          e(u, d);
          break;
      }
    }
  }
  function r(o) {
    if (typeof o != "string") return o;
    let d = o.replace(/\\n/g, "\\n").replace(/\\'/g, "\\'").replace(/\\"/g, '\\"').replace(/\\&/g, "\\&").replace(/\\r/g, "\\r").replace(/\\t/g, "\\t").replace(/\\b/g, "\\b").replace(/\\f/g, "\\f");
    return d = d.replace(/[\u0000-\u0019]+/g, ""), JSON.parse(d);
  }
  function i(o, d = null) {
    return d ? Object.keys(d).reduce((c, l) => c.replaceAll(l, d[l]), o) : o;
  }
  return {
    pushDatalayer: n,
    pushTracking: a,
    pushGua: e,
    pushGa4: t
  };
}
const he = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, r] of t)
    n[a] = r;
  return n;
}, Mt = ce({
  name: "DropdownFilters",
  emits: ["onfilterchange"],
  props: {
    placeholder: { type: String, required: !1, default: "" },
    filters: { type: Array, required: !1, default: () => [] },
    labelDefault: { type: String, required: !1, default: "All shows" },
    tracking: { type: Object, required: !1, default: null }
  },
  setup(e, { emit: t }) {
    const n = H(e, "filters"), a = N(e.placeholder ? "" : "all"), r = N(!1), i = (l) => {
      a.value = l, t("onfilterchange", a.value), requestAnimationFrame(() => r.value = !1);
    }, o = () => {
      a.value = "", t("onfilterchange", a.value);
    }, d = F(
      () => n.value.filter((l) => !!l.value)
    ), { pushTracking: s } = me();
    return {
      filtersWithoutEmptyValue: d,
      currentFilter: a,
      resetFilter: o,
      filter: i,
      trackClick: () => {
        r.value || s(e.tracking?.clickShowToggle), r.value = !0;
      }
    };
  }
}), Pt = { class: "dropdown-filters" }, kt = { class: "dropdown-filters__input" }, Dt = {
  key: 0,
  value: "",
  selected: "",
  disabled: ""
}, $t = { value: "all" }, St = ["value"];
function Wt(e, t, n, a, r, i) {
  return C(), T("div", Pt, [
    b("div", kt, [
      Ze(b("select", {
        name: "dropdown-filters__select",
        class: "dropdown-filters__select",
        onChange: t[0] || (t[0] = (o) => e.filter(o.target.value)),
        onClick: t[1] || (t[1] = (o) => e.trackClick()),
        "onUpdate:modelValue": t[2] || (t[2] = (o) => e.currentFilter = o)
      }, [
        e.placeholder ? (C(), T("option", Dt, L(e.placeholder), 1)) : I("", !0),
        b("option", $t, L(e.labelDefault), 1),
        (C(!0), T(te, null, ye(e.filtersWithoutEmptyValue, (o, d) => (C(), T("option", {
          key: d,
          value: o.value
        }, L(o.label || o.value), 9, St))), 128))
      ], 544), [
        [ft, e.currentFilter]
      ]),
      t[3] || (t[3] = b("svg", {
        class: "dropdown-filters__arrow-down",
        width: "14",
        height: "9",
        viewBox: "0 0 14 9",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
      }, [
        b("path", {
          d: "M1 1L7.10049 7.10049L13.201 1",
          stroke: "black",
          "stroke-width": "2"
        })
      ], -1))
    ])
  ]);
}
const Ct = /* @__PURE__ */ he(Mt, [["render", Wt]]), nt = 6048e5, Ot = 864e5, Ne = Symbol.for("constructDateFrom");
function z(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && Ne in e ? e[Ne](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function O(e, t) {
  return z(t || e, e);
}
function Et(e, t, n) {
  const a = O(e, n?.in);
  return isNaN(t) ? z(e, NaN) : (t && a.setDate(a.getDate() + t), a);
}
function Ae(e, t, n) {
  const a = O(e, n?.in);
  if (isNaN(t)) return z(e, NaN);
  if (!t)
    return a;
  const r = a.getDate(), i = z(e, a.getTime());
  i.setMonth(a.getMonth() + t + 1, 0);
  const o = i.getDate();
  return r >= o ? i : (a.setFullYear(
    i.getFullYear(),
    i.getMonth(),
    r
  ), a);
}
let Tt = {};
function fe() {
  return Tt;
}
function J(e, t) {
  const n = fe(), a = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, r = O(e, t?.in), i = r.getDay(), o = (i < a ? 7 : 0) + i - a;
  return r.setDate(r.getDate() - o), r.setHours(0, 0, 0, 0), r;
}
function ue(e, t) {
  return J(e, { ...t, weekStartsOn: 1 });
}
function at(e, t) {
  const n = O(e, t?.in), a = n.getFullYear(), r = z(n, 0);
  r.setFullYear(a + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const i = ue(r), o = z(n, 0);
  o.setFullYear(a, 0, 4), o.setHours(0, 0, 0, 0);
  const d = ue(o);
  return n.getTime() >= i.getTime() ? a + 1 : n.getTime() >= d.getTime() ? a : a - 1;
}
function xe(e) {
  const t = O(e), n = new Date(
    Date.UTC(
      t.getFullYear(),
      t.getMonth(),
      t.getDate(),
      t.getHours(),
      t.getMinutes(),
      t.getSeconds(),
      t.getMilliseconds()
    )
  );
  return n.setUTCFullYear(t.getFullYear()), +e - +n;
}
function rt(e, ...t) {
  const n = z.bind(
    null,
    e || t.find((a) => typeof a == "object")
  );
  return t.map(n);
}
function je(e, t) {
  const n = O(e, t?.in);
  return n.setHours(0, 0, 0, 0), n;
}
function Nt(e, t, n) {
  const [a, r] = rt(
    n?.in,
    e,
    t
  ), i = je(a), o = je(r), d = +i - xe(i), s = +o - xe(o);
  return Math.round((d - s) / Ot);
}
function At(e, t) {
  const n = at(e, t), a = z(e, 0);
  return a.setFullYear(n, 0, 4), a.setHours(0, 0, 0, 0), ue(a);
}
function xt(e, t, n) {
  const [a, r] = [
    +O(e.start, n?.in),
    +O(e.end, n?.in)
  ].sort((d, s) => d - s), [i, o] = [
    +O(t.start, n?.in),
    +O(t.end, n?.in)
  ].sort((d, s) => d - s);
  return a < o && i < r;
}
function jt(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function Lt(e) {
  return !(!jt(e) && typeof e != "number" || isNaN(+O(e)));
}
function _t(e, t) {
  const n = O(e, t?.in), a = n.getMonth();
  return n.setFullYear(n.getFullYear(), a + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function Ft(e, t) {
  const n = O(e, t?.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function zt(e, t) {
  const n = O(e, t?.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
const qt = {
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
}, It = (e, t, n) => {
  let a;
  const r = qt[e];
  return typeof r == "string" ? a = r : t === 1 ? a = r.one : a = r.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + a : a + " ago" : a;
};
function M(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const Ht = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, Bt = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, Gt = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Vt = {
  date: M({
    formats: Ht,
    defaultWidth: "full"
  }),
  time: M({
    formats: Bt,
    defaultWidth: "full"
  }),
  dateTime: M({
    formats: Gt,
    defaultWidth: "full"
  })
}, Yt = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, it = (e, t, n, a) => Yt[e];
function f(e) {
  return (t, n) => {
    const a = n?.context ? String(n.context) : "standalone";
    let r;
    if (a === "formatting" && e.formattingValues) {
      const o = e.defaultFormattingWidth || e.defaultWidth, d = n?.width ? String(n.width) : o;
      r = e.formattingValues[d] || e.formattingValues[o];
    } else {
      const o = e.defaultWidth, d = n?.width ? String(n.width) : e.defaultWidth;
      r = e.values[d] || e.values[o];
    }
    const i = e.argumentCallback ? e.argumentCallback(t) : t;
    return r[i];
  };
}
const Xt = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, Rt = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, Jt = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
}, Qt = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
}, Zt = {
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
}, Ut = {
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
}, Kt = (e, t) => {
  const n = Number(e), a = n % 100;
  if (a > 20 || a < 10)
    switch (a % 10) {
      case 1:
        return n + "st";
      case 2:
        return n + "nd";
      case 3:
        return n + "rd";
    }
  return n + "th";
}, ot = {
  ordinalNumber: Kt,
  era: f({
    values: Xt,
    defaultWidth: "wide"
  }),
  quarter: f({
    values: Rt,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: f({
    values: Jt,
    defaultWidth: "wide"
  }),
  day: f({
    values: Qt,
    defaultWidth: "wide"
  }),
  dayPeriod: f({
    values: Zt,
    defaultWidth: "wide",
    formattingValues: Ut,
    defaultFormattingWidth: "wide"
  })
};
function g(e) {
  return (t, n = {}) => {
    const a = n.width, r = a && e.matchPatterns[a] || e.matchPatterns[e.defaultMatchWidth], i = t.match(r);
    if (!i)
      return null;
    const o = i[0], d = a && e.parsePatterns[a] || e.parsePatterns[e.defaultParseWidth], s = Array.isArray(d) ? tn(d, (u) => u.test(o)) : (
      // [TODO] -- I challenge you to fix the type
      en(d, (u) => u.test(o))
    );
    let c;
    c = e.valueCallback ? e.valueCallback(s) : s, c = n.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      n.valueCallback(c)
    ) : c;
    const l = t.slice(o.length);
    return { value: c, rest: l };
  };
}
function en(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function tn(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function B(e) {
  return (t, n = {}) => {
    const a = t.match(e.matchPattern);
    if (!a) return null;
    const r = a[0], i = t.match(e.parsePattern);
    if (!i) return null;
    let o = e.valueCallback ? e.valueCallback(i[0]) : i[0];
    o = n.valueCallback ? n.valueCallback(o) : o;
    const d = t.slice(r.length);
    return { value: o, rest: d };
  };
}
const nn = /^(\d+)(th|st|nd|rd)?/i, an = /\d+/i, rn = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, on = {
  any: [/^b/i, /^(a|c)/i]
}, sn = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, dn = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, un = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, ln = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
}, cn = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, mn = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, hn = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, fn = {
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
}, st = {
  ordinalNumber: B({
    matchPattern: nn,
    parsePattern: an,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: g({
    matchPatterns: rn,
    defaultMatchWidth: "wide",
    parsePatterns: on,
    defaultParseWidth: "any"
  }),
  quarter: g({
    matchPatterns: sn,
    defaultMatchWidth: "wide",
    parsePatterns: dn,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: g({
    matchPatterns: un,
    defaultMatchWidth: "wide",
    parsePatterns: ln,
    defaultParseWidth: "any"
  }),
  day: g({
    matchPatterns: cn,
    defaultMatchWidth: "wide",
    parsePatterns: mn,
    defaultParseWidth: "any"
  }),
  dayPeriod: g({
    matchPatterns: hn,
    defaultMatchWidth: "any",
    parsePatterns: fn,
    defaultParseWidth: "any"
  })
}, gn = {
  code: "en-US",
  formatDistance: It,
  formatLong: Vt,
  formatRelative: it,
  localize: ot,
  match: st,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function pn(e, t) {
  const n = O(e, t?.in);
  return Nt(n, zt(n)) + 1;
}
function wn(e, t) {
  const n = O(e, t?.in), a = +ue(n) - +At(n);
  return Math.round(a / nt) + 1;
}
function dt(e, t) {
  const n = O(e, t?.in), a = n.getFullYear(), r = fe(), i = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, o = z(t?.in || e, 0);
  o.setFullYear(a + 1, 0, i), o.setHours(0, 0, 0, 0);
  const d = J(o, t), s = z(t?.in || e, 0);
  s.setFullYear(a, 0, i), s.setHours(0, 0, 0, 0);
  const c = J(s, t);
  return +n >= +d ? a + 1 : +n >= +c ? a : a - 1;
}
function vn(e, t) {
  const n = fe(), a = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, r = dt(e, t), i = z(t?.in || e, 0);
  return i.setFullYear(r, 0, a), i.setHours(0, 0, 0, 0), J(i, t);
}
function yn(e, t) {
  const n = O(e, t?.in), a = +J(n, t) - +vn(n, t);
  return Math.round(a / nt) + 1;
}
function k(e, t) {
  const n = e < 0 ? "-" : "", a = Math.abs(e).toString().padStart(t, "0");
  return n + a;
}
const Y = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), a = n > 0 ? n : 1 - n;
    return k(t === "yy" ? a % 100 : a, t.length);
  },
  // Month
  M(e, t) {
    const n = e.getMonth();
    return t === "M" ? String(n + 1) : k(n + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return k(e.getDate(), t.length);
  },
  // AM or PM
  a(e, t) {
    const n = e.getHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return n.toUpperCase();
      case "aaa":
        return n;
      case "aaaaa":
        return n[0];
      case "aaaa":
      default:
        return n === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h(e, t) {
    return k(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return k(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return k(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return k(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const n = t.length, a = e.getMilliseconds(), r = Math.trunc(
      a * Math.pow(10, n - 3)
    );
    return k(r, t.length);
  }
}, ee = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, Le = {
  // Era
  G: function(e, t, n) {
    const a = e.getFullYear() > 0 ? 1 : 0;
    switch (t) {
      case "G":
      case "GG":
      case "GGG":
        return n.era(a, { width: "abbreviated" });
      case "GGGGG":
        return n.era(a, { width: "narrow" });
      case "GGGG":
      default:
        return n.era(a, { width: "wide" });
    }
  },
  // Year
  y: function(e, t, n) {
    if (t === "yo") {
      const a = e.getFullYear(), r = a > 0 ? a : 1 - a;
      return n.ordinalNumber(r, { unit: "year" });
    }
    return Y.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, a) {
    const r = dt(e, a), i = r > 0 ? r : 1 - r;
    if (t === "YY") {
      const o = i % 100;
      return k(o, 2);
    }
    return t === "Yo" ? n.ordinalNumber(i, { unit: "year" }) : k(i, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = at(e);
    return k(n, t.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(e, t) {
    const n = e.getFullYear();
    return k(n, t.length);
  },
  // Quarter
  Q: function(e, t, n) {
    const a = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      case "Q":
        return String(a);
      case "QQ":
        return k(a, 2);
      case "Qo":
        return n.ordinalNumber(a, { unit: "quarter" });
      case "QQQ":
        return n.quarter(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "QQQQQ":
        return n.quarter(a, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return n.quarter(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(e, t, n) {
    const a = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      case "q":
        return String(a);
      case "qq":
        return k(a, 2);
      case "qo":
        return n.ordinalNumber(a, { unit: "quarter" });
      case "qqq":
        return n.quarter(a, {
          width: "abbreviated",
          context: "standalone"
        });
      case "qqqqq":
        return n.quarter(a, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return n.quarter(a, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(e, t, n) {
    const a = e.getMonth();
    switch (t) {
      case "M":
      case "MM":
        return Y.M(e, t);
      case "Mo":
        return n.ordinalNumber(a + 1, { unit: "month" });
      case "MMM":
        return n.month(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "MMMMM":
        return n.month(a, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return n.month(a, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(e, t, n) {
    const a = e.getMonth();
    switch (t) {
      case "L":
        return String(a + 1);
      case "LL":
        return k(a + 1, 2);
      case "Lo":
        return n.ordinalNumber(a + 1, { unit: "month" });
      case "LLL":
        return n.month(a, {
          width: "abbreviated",
          context: "standalone"
        });
      case "LLLLL":
        return n.month(a, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return n.month(a, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(e, t, n, a) {
    const r = yn(e, a);
    return t === "wo" ? n.ordinalNumber(r, { unit: "week" }) : k(r, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const a = wn(e);
    return t === "Io" ? n.ordinalNumber(a, { unit: "week" }) : k(a, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : Y.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const a = pn(e);
    return t === "Do" ? n.ordinalNumber(a, { unit: "dayOfYear" }) : k(a, t.length);
  },
  // Day of week
  E: function(e, t, n) {
    const a = e.getDay();
    switch (t) {
      case "E":
      case "EE":
      case "EEE":
        return n.day(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "EEEEE":
        return n.day(a, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return n.day(a, {
          width: "short",
          context: "formatting"
        });
      case "EEEE":
      default:
        return n.day(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(e, t, n, a) {
    const r = e.getDay(), i = (r - a.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      case "e":
        return String(i);
      case "ee":
        return k(i, 2);
      case "eo":
        return n.ordinalNumber(i, { unit: "day" });
      case "eee":
        return n.day(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "eeeee":
        return n.day(r, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return n.day(r, {
          width: "short",
          context: "formatting"
        });
      case "eeee":
      default:
        return n.day(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(e, t, n, a) {
    const r = e.getDay(), i = (r - a.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      case "c":
        return String(i);
      case "cc":
        return k(i, t.length);
      case "co":
        return n.ordinalNumber(i, { unit: "day" });
      case "ccc":
        return n.day(r, {
          width: "abbreviated",
          context: "standalone"
        });
      case "ccccc":
        return n.day(r, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return n.day(r, {
          width: "short",
          context: "standalone"
        });
      case "cccc":
      default:
        return n.day(r, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(e, t, n) {
    const a = e.getDay(), r = a === 0 ? 7 : a;
    switch (t) {
      case "i":
        return String(r);
      case "ii":
        return k(r, t.length);
      case "io":
        return n.ordinalNumber(r, { unit: "day" });
      case "iii":
        return n.day(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "iiiii":
        return n.day(a, {
          width: "narrow",
          context: "formatting"
        });
      case "iiiiii":
        return n.day(a, {
          width: "short",
          context: "formatting"
        });
      case "iiii":
      default:
        return n.day(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(e, t, n) {
    const r = e.getHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return n.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return n.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return n.dayPeriod(r, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return n.dayPeriod(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(e, t, n) {
    const a = e.getHours();
    let r;
    switch (a === 12 ? r = ee.noon : a === 0 ? r = ee.midnight : r = a / 12 >= 1 ? "pm" : "am", t) {
      case "b":
      case "bb":
        return n.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return n.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return n.dayPeriod(r, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return n.dayPeriod(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(e, t, n) {
    const a = e.getHours();
    let r;
    switch (a >= 17 ? r = ee.evening : a >= 12 ? r = ee.afternoon : a >= 4 ? r = ee.morning : r = ee.night, t) {
      case "B":
      case "BB":
      case "BBB":
        return n.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return n.dayPeriod(r, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return n.dayPeriod(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(e, t, n) {
    if (t === "ho") {
      let a = e.getHours() % 12;
      return a === 0 && (a = 12), n.ordinalNumber(a, { unit: "hour" });
    }
    return Y.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : Y.H(e, t);
  },
  // Hour [0-11]
  K: function(e, t, n) {
    const a = e.getHours() % 12;
    return t === "Ko" ? n.ordinalNumber(a, { unit: "hour" }) : k(a, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let a = e.getHours();
    return a === 0 && (a = 24), t === "ko" ? n.ordinalNumber(a, { unit: "hour" }) : k(a, t.length);
  },
  // Minute
  m: function(e, t, n) {
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : Y.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : Y.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return Y.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, n) {
    const a = e.getTimezoneOffset();
    if (a === 0)
      return "Z";
    switch (t) {
      case "X":
        return Fe(a);
      case "XXXX":
      case "XX":
        return U(a);
      case "XXXXX":
      case "XXX":
      default:
        return U(a, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, n) {
    const a = e.getTimezoneOffset();
    switch (t) {
      case "x":
        return Fe(a);
      case "xxxx":
      case "xx":
        return U(a);
      case "xxxxx":
      case "xxx":
      default:
        return U(a, ":");
    }
  },
  // Timezone (GMT)
  O: function(e, t, n) {
    const a = e.getTimezoneOffset();
    switch (t) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + _e(a, ":");
      case "OOOO":
      default:
        return "GMT" + U(a, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(e, t, n) {
    const a = e.getTimezoneOffset();
    switch (t) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + _e(a, ":");
      case "zzzz":
      default:
        return "GMT" + U(a, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const a = Math.trunc(+e / 1e3);
    return k(a, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    return k(+e, t.length);
  }
};
function _e(e, t = "") {
  const n = e > 0 ? "-" : "+", a = Math.abs(e), r = Math.trunc(a / 60), i = a % 60;
  return i === 0 ? n + String(r) : n + String(r) + t + k(i, 2);
}
function Fe(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + k(Math.abs(e) / 60, 2) : U(e, t);
}
function U(e, t = "") {
  const n = e > 0 ? "-" : "+", a = Math.abs(e), r = k(Math.trunc(a / 60), 2), i = k(a % 60, 2);
  return n + r + t + i;
}
const ze = (e, t) => {
  switch (e) {
    case "P":
      return t.date({ width: "short" });
    case "PP":
      return t.date({ width: "medium" });
    case "PPP":
      return t.date({ width: "long" });
    case "PPPP":
    default:
      return t.date({ width: "full" });
  }
}, ut = (e, t) => {
  switch (e) {
    case "p":
      return t.time({ width: "short" });
    case "pp":
      return t.time({ width: "medium" });
    case "ppp":
      return t.time({ width: "long" });
    case "pppp":
    default:
      return t.time({ width: "full" });
  }
}, bn = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], a = n[1], r = n[2];
  if (!r)
    return ze(e, t);
  let i;
  switch (a) {
    case "P":
      i = t.dateTime({ width: "short" });
      break;
    case "PP":
      i = t.dateTime({ width: "medium" });
      break;
    case "PPP":
      i = t.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      i = t.dateTime({ width: "full" });
      break;
  }
  return i.replace("{{date}}", ze(a, t)).replace("{{time}}", ut(r, t));
}, Mn = {
  p: ut,
  P: bn
}, Pn = /^D+$/, kn = /^Y+$/, Dn = ["D", "DD", "YY", "YYYY"];
function $n(e) {
  return Pn.test(e);
}
function Sn(e) {
  return kn.test(e);
}
function Wn(e, t, n) {
  const a = Cn(e, t, n);
  if (console.warn(a), Dn.includes(e)) throw new RangeError(a);
}
function Cn(e, t, n) {
  const a = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${a} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const On = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, En = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Tn = /^'([^]*?)'?$/, Nn = /''/g, An = /[a-zA-Z]/;
function Q(e, t, n) {
  const a = fe(), r = n?.locale ?? a.locale ?? gn, i = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? a.firstWeekContainsDate ?? a.locale?.options?.firstWeekContainsDate ?? 1, o = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? a.weekStartsOn ?? a.locale?.options?.weekStartsOn ?? 0, d = O(e, n?.in);
  if (!Lt(d))
    throw new RangeError("Invalid time value");
  let s = t.match(En).map((l) => {
    const u = l[0];
    if (u === "p" || u === "P") {
      const h = Mn[u];
      return h(l, r.formatLong);
    }
    return l;
  }).join("").match(On).map((l) => {
    if (l === "''")
      return { isToken: !1, value: "'" };
    const u = l[0];
    if (u === "'")
      return { isToken: !1, value: xn(l) };
    if (Le[u])
      return { isToken: !0, value: l };
    if (u.match(An))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + u + "`"
      );
    return { isToken: !1, value: l };
  });
  r.localize.preprocessor && (s = r.localize.preprocessor(d, s));
  const c = {
    firstWeekContainsDate: i,
    weekStartsOn: o,
    locale: r
  };
  return s.map((l) => {
    if (!l.isToken) return l.value;
    const u = l.value;
    (!n?.useAdditionalWeekYearTokens && Sn(u) || !n?.useAdditionalDayOfYearTokens && $n(u)) && Wn(u, t, String(e));
    const h = Le[u[0]];
    return h(d, u, r.localize, c);
  }).join("");
}
function xn(e) {
  const t = e.match(Tn);
  return t ? t[1].replace(Nn, "'") : e;
}
function qe(e, t) {
  return O(e, t?.in).getDay();
}
function jn(e, t) {
  const n = O(e, t?.in), a = n.getFullYear(), r = n.getMonth(), i = z(n, 0);
  return i.setFullYear(a, r + 1, 0), i.setHours(0, 0, 0, 0), i.getDate();
}
function le(e, t, n) {
  const [a, r] = rt(
    n?.in,
    e,
    t
  );
  return +J(a, n) == +J(r, n);
}
const Ln = {
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
    one: "més d'un any",
    eleven: "més d'onze anys",
    other: "més de {{count}} anys"
  },
  almostXYears: {
    one: "gairebé un any",
    other: "gairebé {{count}} anys"
  }
}, _n = (e, t, n) => {
  let a;
  const r = Ln[e];
  return typeof r == "string" ? a = r : t === 1 ? a = r.one : t === 11 && r.eleven ? a = r.eleven : a = r.other.replace("{{count}}", String(t)), n?.addSuffix ? n.comparison && n.comparison > 0 ? "en " + a : "fa " + a : a;
}, Fn = {
  full: "EEEE, d 'de' MMMM y",
  long: "d 'de' MMMM y",
  medium: "d MMM y",
  short: "dd/MM/y"
}, zn = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
}, qn = {
  full: "{{date}} 'a les' {{time}}",
  long: "{{date}} 'a les' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, In = {
  date: M({
    formats: Fn,
    defaultWidth: "full"
  }),
  time: M({
    formats: zn,
    defaultWidth: "full"
  }),
  dateTime: M({
    formats: qn,
    defaultWidth: "full"
  })
}, Hn = {
  lastWeek: "'el' eeee 'passat a la' LT",
  yesterday: "'ahir a la' p",
  today: "'avui a la' p",
  tomorrow: "'demà a la' p",
  nextWeek: "eeee 'a la' p",
  other: "P"
}, Bn = {
  lastWeek: "'el' eeee 'passat a les' p",
  yesterday: "'ahir a les' p",
  today: "'avui a les' p",
  tomorrow: "'demà a les' p",
  nextWeek: "eeee 'a les' p",
  other: "P"
}, Gn = (e, t, n, a) => t.getHours() !== 1 ? Bn[e] : Hn[e], Vn = {
  narrow: ["aC", "dC"],
  abbreviated: ["a. de C.", "d. de C."],
  wide: ["abans de Crist", "després de Crist"]
}, Yn = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["T1", "T2", "T3", "T4"],
  wide: ["1r trimestre", "2n trimestre", "3r trimestre", "4t trimestre"]
}, Xn = {
  narrow: [
    "GN",
    "FB",
    "MÇ",
    "AB",
    "MG",
    "JN",
    "JL",
    "AG",
    "ST",
    "OC",
    "NV",
    "DS"
  ],
  /**
   * Les abreviatures dels mesos de l'any es formen seguint una de les normes generals de formació d'abreviatures.
   * S'escriu la primera síl·laba i les consonants de la síl·laba següent anteriors a la primera vocal.
   * Els mesos de març, maig i juny no s'abreugen perquè són paraules d'una sola síl·laba.
   */
  abbreviated: [
    "gen.",
    "febr.",
    "març",
    "abr.",
    "maig",
    "juny",
    "jul.",
    "ag.",
    "set.",
    "oct.",
    "nov.",
    "des."
  ],
  wide: [
    "gener",
    "febrer",
    "març",
    "abril",
    "maig",
    "juny",
    "juliol",
    "agost",
    "setembre",
    "octubre",
    "novembre",
    "desembre"
  ]
}, Rn = {
  narrow: ["dg.", "dl.", "dt.", "dm.", "dj.", "dv.", "ds."],
  short: ["dg.", "dl.", "dt.", "dm.", "dj.", "dv.", "ds."],
  abbreviated: ["dg.", "dl.", "dt.", "dm.", "dj.", "dv.", "ds."],
  wide: [
    "diumenge",
    "dilluns",
    "dimarts",
    "dimecres",
    "dijous",
    "divendres",
    "dissabte"
  ]
}, Jn = {
  narrow: {
    am: "am",
    pm: "pm",
    midnight: "mitjanit",
    noon: "migdia",
    morning: "matí",
    afternoon: "tarda",
    evening: "vespre",
    night: "nit"
  },
  abbreviated: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "mitjanit",
    noon: "migdia",
    morning: "matí",
    afternoon: "tarda",
    evening: "vespre",
    night: "nit"
  },
  wide: {
    am: "ante meridiem",
    pm: "post meridiem",
    midnight: "mitjanit",
    noon: "migdia",
    morning: "matí",
    afternoon: "tarda",
    evening: "vespre",
    night: "nit"
  }
}, Qn = {
  narrow: {
    am: "am",
    pm: "pm",
    midnight: "de la mitjanit",
    noon: "del migdia",
    morning: "del matí",
    afternoon: "de la tarda",
    evening: "del vespre",
    night: "de la nit"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "de la mitjanit",
    noon: "del migdia",
    morning: "del matí",
    afternoon: "de la tarda",
    evening: "del vespre",
    night: "de la nit"
  },
  wide: {
    am: "ante meridiem",
    pm: "post meridiem",
    midnight: "de la mitjanit",
    noon: "del migdia",
    morning: "del matí",
    afternoon: "de la tarda",
    evening: "del vespre",
    night: "de la nit"
  }
}, Zn = (e, t) => {
  const n = Number(e), a = n % 100;
  if (a > 20 || a < 10)
    switch (a % 10) {
      case 1:
        return n + "r";
      case 2:
        return n + "n";
      case 3:
        return n + "r";
      case 4:
        return n + "t";
    }
  return n + "è";
}, Un = {
  ordinalNumber: Zn,
  era: f({
    values: Vn,
    defaultWidth: "wide"
  }),
  quarter: f({
    values: Yn,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: f({
    values: Xn,
    defaultWidth: "wide"
  }),
  day: f({
    values: Rn,
    defaultWidth: "wide"
  }),
  dayPeriod: f({
    values: Jn,
    defaultWidth: "wide",
    formattingValues: Qn,
    defaultFormattingWidth: "wide"
  })
}, Kn = /^(\d+)(è|r|n|r|t)?/i, ea = /\d+/i, ta = {
  narrow: /^(aC|dC)/i,
  abbreviated: /^(a. de C.|d. de C.)/i,
  wide: /^(abans de Crist|despr[eé]s de Crist)/i
}, na = {
  narrow: [/^aC/i, /^dC/i],
  abbreviated: [/^(a. de C.)/i, /^(d. de C.)/i],
  wide: [/^(abans de Crist)/i, /^(despr[eé]s de Crist)/i]
}, aa = {
  narrow: /^[1234]/i,
  abbreviated: /^T[1234]/i,
  wide: /^[1234](è|r|n|r|t)? trimestre/i
}, ra = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, ia = {
  narrow: /^(GN|FB|MÇ|AB|MG|JN|JL|AG|ST|OC|NV|DS)/i,
  abbreviated: /^(gen.|febr.|març|abr.|maig|juny|jul.|ag.|set.|oct.|nov.|des.)/i,
  wide: /^(gener|febrer|març|abril|maig|juny|juliol|agost|setembre|octubre|novembre|desembre)/i
}, oa = {
  narrow: [
    /^GN/i,
    /^FB/i,
    /^MÇ/i,
    /^AB/i,
    /^MG/i,
    /^JN/i,
    /^JL/i,
    /^AG/i,
    /^ST/i,
    /^OC/i,
    /^NV/i,
    /^DS/i
  ],
  abbreviated: [
    /^gen./i,
    /^febr./i,
    /^març/i,
    /^abr./i,
    /^maig/i,
    /^juny/i,
    /^jul./i,
    /^ag./i,
    /^set./i,
    /^oct./i,
    /^nov./i,
    /^des./i
  ],
  wide: [
    /^gener/i,
    /^febrer/i,
    /^març/i,
    /^abril/i,
    /^maig/i,
    /^juny/i,
    /^juliol/i,
    /^agost/i,
    /^setembre/i,
    /^octubre/i,
    /^novembre/i,
    /^desembre/i
  ]
}, sa = {
  narrow: /^(dg\.|dl\.|dt\.|dm\.|dj\.|dv\.|ds\.)/i,
  short: /^(dg\.|dl\.|dt\.|dm\.|dj\.|dv\.|ds\.)/i,
  abbreviated: /^(dg\.|dl\.|dt\.|dm\.|dj\.|dv\.|ds\.)/i,
  wide: /^(diumenge|dilluns|dimarts|dimecres|dijous|divendres|dissabte)/i
}, da = {
  narrow: [/^dg./i, /^dl./i, /^dt./i, /^dm./i, /^dj./i, /^dv./i, /^ds./i],
  abbreviated: [/^dg./i, /^dl./i, /^dt./i, /^dm./i, /^dj./i, /^dv./i, /^ds./i],
  wide: [
    /^diumenge/i,
    /^dilluns/i,
    /^dimarts/i,
    /^dimecres/i,
    /^dijous/i,
    /^divendres/i,
    /^disssabte/i
  ]
}, ua = {
  narrow: /^(a|p|mn|md|(del|de la) (matí|tarda|vespre|nit))/i,
  abbreviated: /^([ap]\.?\s?m\.?|mitjanit|migdia|(del|de la) (matí|tarda|vespre|nit))/i,
  wide: /^(ante meridiem|post meridiem|mitjanit|migdia|(del|de la) (matí|tarda|vespre|nit))/i
}, la = {
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
}, ca = {
  ordinalNumber: B({
    matchPattern: Kn,
    parsePattern: ea,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: g({
    matchPatterns: ta,
    defaultMatchWidth: "wide",
    parsePatterns: na,
    defaultParseWidth: "wide"
  }),
  quarter: g({
    matchPatterns: aa,
    defaultMatchWidth: "wide",
    parsePatterns: ra,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: g({
    matchPatterns: ia,
    defaultMatchWidth: "wide",
    parsePatterns: oa,
    defaultParseWidth: "wide"
  }),
  day: g({
    matchPatterns: sa,
    defaultMatchWidth: "wide",
    parsePatterns: da,
    defaultParseWidth: "wide"
  }),
  dayPeriod: g({
    matchPatterns: ua,
    defaultMatchWidth: "wide",
    parsePatterns: la,
    defaultParseWidth: "any"
  })
}, ma = {
  code: "ca",
  formatDistance: _n,
  formatLong: In,
  formatRelative: Gn,
  localize: Un,
  match: ca,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
}, ha = {
  lessThanXSeconds: {
    one: "mindre end ét sekund",
    other: "mindre end {{count}} sekunder"
  },
  xSeconds: {
    one: "1 sekund",
    other: "{{count}} sekunder"
  },
  halfAMinute: "ét halvt minut",
  lessThanXMinutes: {
    one: "mindre end ét minut",
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
    one: "cirka 1 måned",
    other: "cirka {{count}} måneder"
  },
  xMonths: {
    one: "1 måned",
    other: "{{count}} måneder"
  },
  aboutXYears: {
    one: "cirka 1 år",
    other: "cirka {{count}} år"
  },
  xYears: {
    one: "1 år",
    other: "{{count}} år"
  },
  overXYears: {
    one: "over 1 år",
    other: "over {{count}} år"
  },
  almostXYears: {
    one: "næsten 1 år",
    other: "næsten {{count}} år"
  }
}, fa = (e, t, n) => {
  let a;
  const r = ha[e];
  return typeof r == "string" ? a = r : t === 1 ? a = r.one : a = r.other.replace("{{count}}", String(t)), n?.addSuffix ? n.comparison && n.comparison > 0 ? "om " + a : a + " siden" : a;
}, ga = {
  full: "EEEE 'den' d. MMMM y",
  long: "d. MMMM y",
  medium: "d. MMM y",
  short: "dd/MM/y"
}, pa = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
}, wa = {
  full: "{{date}} 'kl'. {{time}}",
  long: "{{date}} 'kl'. {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
}, va = {
  date: M({
    formats: ga,
    defaultWidth: "full"
  }),
  time: M({
    formats: pa,
    defaultWidth: "full"
  }),
  dateTime: M({
    formats: wa,
    defaultWidth: "full"
  })
}, ya = {
  lastWeek: "'sidste' eeee 'kl.' p",
  yesterday: "'i går kl.' p",
  today: "'i dag kl.' p",
  tomorrow: "'i morgen kl.' p",
  nextWeek: "'på' eeee 'kl.' p",
  other: "P"
}, ba = (e, t, n, a) => ya[e], Ma = {
  narrow: ["fvt", "vt"],
  abbreviated: ["f.v.t.", "v.t."],
  wide: ["før vesterlandsk tidsregning", "vesterlandsk tidsregning"]
}, Pa = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["1. kvt.", "2. kvt.", "3. kvt.", "4. kvt."],
  wide: ["1. kvartal", "2. kvartal", "3. kvartal", "4. kvartal"]
}, ka = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "jan.",
    "feb.",
    "mar.",
    "apr.",
    "maj",
    "jun.",
    "jul.",
    "aug.",
    "sep.",
    "okt.",
    "nov.",
    "dec."
  ],
  wide: [
    "januar",
    "februar",
    "marts",
    "april",
    "maj",
    "juni",
    "juli",
    "august",
    "september",
    "oktober",
    "november",
    "december"
  ]
}, Da = {
  narrow: ["S", "M", "T", "O", "T", "F", "L"],
  short: ["sø", "ma", "ti", "on", "to", "fr", "lø"],
  abbreviated: ["søn.", "man.", "tir.", "ons.", "tor.", "fre.", "lør."],
  wide: [
    "søndag",
    "mandag",
    "tirsdag",
    "onsdag",
    "torsdag",
    "fredag",
    "lørdag"
  ]
}, $a = {
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
}, Sa = {
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
}, Wa = (e, t) => Number(e) + ".", Ca = {
  ordinalNumber: Wa,
  era: f({
    values: Ma,
    defaultWidth: "wide"
  }),
  quarter: f({
    values: Pa,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: f({
    values: ka,
    defaultWidth: "wide"
  }),
  day: f({
    values: Da,
    defaultWidth: "wide"
  }),
  dayPeriod: f({
    values: $a,
    defaultWidth: "wide",
    formattingValues: Sa,
    defaultFormattingWidth: "wide"
  })
}, Oa = /^(\d+)(\.)?/i, Ea = /\d+/i, Ta = {
  narrow: /^(fKr|fvt|eKr|vt)/i,
  abbreviated: /^(f\.Kr\.?|f\.v\.t\.?|e\.Kr\.?|v\.t\.)/i,
  wide: /^(f.Kr.|før vesterlandsk tidsregning|e.Kr.|vesterlandsk tidsregning)/i
}, Na = {
  any: [/^f/i, /^(v|e)/i]
}, Aa = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234]. kvt\./i,
  wide: /^[1234]\.? kvartal/i
}, xa = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, ja = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan.|feb.|mar.|apr.|maj|jun.|jul.|aug.|sep.|okt.|nov.|dec.)/i,
  wide: /^(januar|februar|marts|april|maj|juni|juli|august|september|oktober|november|december)/i
}, La = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^maj/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
}, _a = {
  narrow: /^[smtofl]/i,
  short: /^(søn.|man.|tir.|ons.|tor.|fre.|lør.)/i,
  abbreviated: /^(søn|man|tir|ons|tor|fre|lør)/i,
  wide: /^(søndag|mandag|tirsdag|onsdag|torsdag|fredag|lørdag)/i
}, Fa = {
  narrow: [/^s/i, /^m/i, /^t/i, /^o/i, /^t/i, /^f/i, /^l/i],
  any: [/^s/i, /^m/i, /^ti/i, /^o/i, /^to/i, /^f/i, /^l/i]
}, za = {
  narrow: /^(a|p|midnat|middag|(om) (morgenen|eftermiddagen|aftenen|natten))/i,
  any: /^([ap]\.?\s?m\.?|midnat|middag|(om) (morgenen|eftermiddagen|aftenen|natten))/i
}, qa = {
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
}, Ia = {
  ordinalNumber: B({
    matchPattern: Oa,
    parsePattern: Ea,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: g({
    matchPatterns: Ta,
    defaultMatchWidth: "wide",
    parsePatterns: Na,
    defaultParseWidth: "any"
  }),
  quarter: g({
    matchPatterns: Aa,
    defaultMatchWidth: "wide",
    parsePatterns: xa,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: g({
    matchPatterns: ja,
    defaultMatchWidth: "wide",
    parsePatterns: La,
    defaultParseWidth: "any"
  }),
  day: g({
    matchPatterns: _a,
    defaultMatchWidth: "wide",
    parsePatterns: Fa,
    defaultParseWidth: "any"
  }),
  dayPeriod: g({
    matchPatterns: za,
    defaultMatchWidth: "any",
    parsePatterns: qa,
    defaultParseWidth: "any"
  })
}, Ha = {
  code: "da",
  formatDistance: fa,
  formatLong: va,
  formatRelative: ba,
  localize: Ca,
  match: Ia,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
}, Ie = {
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
    standalone: "eine halbe Minute",
    withPreposition: "einer halben Minute"
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
}, Ba = (e, t, n) => {
  let a;
  const r = n?.addSuffix ? Ie[e].withPreposition : Ie[e].standalone;
  return typeof r == "string" ? a = r : t === 1 ? a = r.one : a = r.other.replace("{{count}}", String(t)), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + a : "vor " + a : a;
}, Ga = {
  full: "EEEE, do MMMM y",
  // Montag, 7. Januar 2018
  long: "do MMMM y",
  // 7. Januar 2018
  medium: "do MMM y",
  // 7. Jan. 2018
  short: "dd.MM.y"
  // 07.01.2018
}, Va = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
}, Ya = {
  full: "{{date}} 'um' {{time}}",
  long: "{{date}} 'um' {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
}, Xa = {
  date: M({
    formats: Ga,
    defaultWidth: "full"
  }),
  time: M({
    formats: Va,
    defaultWidth: "full"
  }),
  dateTime: M({
    formats: Ya,
    defaultWidth: "full"
  })
}, Ra = {
  lastWeek: "'letzten' eeee 'um' p",
  yesterday: "'gestern um' p",
  today: "'heute um' p",
  tomorrow: "'morgen um' p",
  nextWeek: "eeee 'um' p",
  other: "P"
}, Ja = (e, t, n, a) => Ra[e], Qa = {
  narrow: ["v.Chr.", "n.Chr."],
  abbreviated: ["v.Chr.", "n.Chr."],
  wide: ["vor Christus", "nach Christus"]
}, Za = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1. Quartal", "2. Quartal", "3. Quartal", "4. Quartal"]
}, Pe = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mär",
    "Apr",
    "Mai",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dez"
  ],
  wide: [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember"
  ]
}, Ua = {
  narrow: Pe.narrow,
  abbreviated: [
    "Jan.",
    "Feb.",
    "März",
    "Apr.",
    "Mai",
    "Juni",
    "Juli",
    "Aug.",
    "Sep.",
    "Okt.",
    "Nov.",
    "Dez."
  ],
  wide: Pe.wide
}, Ka = {
  narrow: ["S", "M", "D", "M", "D", "F", "S"],
  short: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
  abbreviated: ["So.", "Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."],
  wide: [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag"
  ]
}, er = {
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
}, tr = {
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
}, nr = (e) => Number(e) + ".", ar = {
  ordinalNumber: nr,
  era: f({
    values: Qa,
    defaultWidth: "wide"
  }),
  quarter: f({
    values: Za,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: f({
    values: Pe,
    formattingValues: Ua,
    defaultWidth: "wide"
  }),
  day: f({
    values: Ka,
    defaultWidth: "wide"
  }),
  dayPeriod: f({
    values: er,
    defaultWidth: "wide",
    formattingValues: tr,
    defaultFormattingWidth: "wide"
  })
}, rr = /^(\d+)(\.)?/i, ir = /\d+/i, or = {
  narrow: /^(v\.? ?Chr\.?|n\.? ?Chr\.?)/i,
  abbreviated: /^(v\.? ?Chr\.?|n\.? ?Chr\.?)/i,
  wide: /^(vor Christus|vor unserer Zeitrechnung|nach Christus|unserer Zeitrechnung)/i
}, sr = {
  any: [/^v/i, /^n/i]
}, dr = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](\.)? Quartal/i
}, ur = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, lr = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(j[aä]n|feb|mär[z]?|apr|mai|jun[i]?|jul[i]?|aug|sep|okt|nov|dez)\.?/i,
  wide: /^(januar|februar|märz|april|mai|juni|juli|august|september|oktober|november|dezember)/i
}, cr = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^j[aä]/i,
    /^f/i,
    /^mär/i,
    /^ap/i,
    /^mai/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
}, mr = {
  narrow: /^[smdmf]/i,
  short: /^(so|mo|di|mi|do|fr|sa)/i,
  abbreviated: /^(son?|mon?|die?|mit?|don?|fre?|sam?)\.?/i,
  wide: /^(sonntag|montag|dienstag|mittwoch|donnerstag|freitag|samstag)/i
}, hr = {
  any: [/^so/i, /^mo/i, /^di/i, /^mi/i, /^do/i, /^f/i, /^sa/i]
}, fr = {
  narrow: /^(vm\.?|nm\.?|Mitternacht|Mittag|morgens|nachm\.?|abends|nachts)/i,
  abbreviated: /^(vorm\.?|nachm\.?|Mitternacht|Mittag|morgens|nachm\.?|abends|nachts)/i,
  wide: /^(vormittags|nachmittags|Mitternacht|Mittag|morgens|nachmittags|abends|nachts)/i
}, gr = {
  any: {
    am: /^v/i,
    pm: /^n/i,
    midnight: /^Mitte/i,
    noon: /^Mitta/i,
    morning: /morgens/i,
    afternoon: /nachmittags/i,
    // will never be matched. Afternoon is matched by `pm`
    evening: /abends/i,
    night: /nachts/i
    // will never be matched. Night is matched by `pm`
  }
}, pr = {
  ordinalNumber: B({
    matchPattern: rr,
    parsePattern: ir,
    valueCallback: (e) => parseInt(e)
  }),
  era: g({
    matchPatterns: or,
    defaultMatchWidth: "wide",
    parsePatterns: sr,
    defaultParseWidth: "any"
  }),
  quarter: g({
    matchPatterns: dr,
    defaultMatchWidth: "wide",
    parsePatterns: ur,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: g({
    matchPatterns: lr,
    defaultMatchWidth: "wide",
    parsePatterns: cr,
    defaultParseWidth: "any"
  }),
  day: g({
    matchPatterns: mr,
    defaultMatchWidth: "wide",
    parsePatterns: hr,
    defaultParseWidth: "any"
  }),
  dayPeriod: g({
    matchPatterns: fr,
    defaultMatchWidth: "wide",
    parsePatterns: gr,
    defaultParseWidth: "any"
  })
}, wr = {
  code: "de",
  formatDistance: Ba,
  formatLong: Xa,
  formatRelative: Ja,
  localize: ar,
  match: pr,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
}, vr = {
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
}, yr = (e, t, n) => {
  let a;
  const r = vr[e];
  return typeof r == "string" ? a = r : t === 1 ? a = r.one : a = r.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + a : a + " ago" : a;
}, br = {
  full: "EEEE, MMMM do, yyyy",
  long: "MMMM do, yyyy",
  medium: "MMM d, yyyy",
  short: "yyyy-MM-dd"
}, Mr = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, Pr = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, kr = {
  date: M({
    formats: br,
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
}, Dr = {
  code: "en-CA",
  formatDistance: yr,
  formatLong: kr,
  formatRelative: it,
  localize: ot,
  match: st,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
}, $r = {
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
    one: "1 día",
    other: "{{count}} días"
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
    one: "alrededor de 1 año",
    other: "alrededor de {{count}} años"
  },
  xYears: {
    one: "1 año",
    other: "{{count}} años"
  },
  overXYears: {
    one: "más de 1 año",
    other: "más de {{count}} años"
  },
  almostXYears: {
    one: "casi 1 año",
    other: "casi {{count}} años"
  }
}, Sr = (e, t, n) => {
  let a;
  const r = $r[e];
  return typeof r == "string" ? a = r : t === 1 ? a = r.one : a = r.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "en " + a : "hace " + a : a;
}, Wr = {
  full: "EEEE, d 'de' MMMM 'de' y",
  long: "d 'de' MMMM 'de' y",
  medium: "d MMM y",
  short: "dd/MM/y"
}, Cr = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
}, Or = {
  full: "{{date}} 'a las' {{time}}",
  long: "{{date}} 'a las' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Er = {
  date: M({
    formats: Wr,
    defaultWidth: "full"
  }),
  time: M({
    formats: Cr,
    defaultWidth: "full"
  }),
  dateTime: M({
    formats: Or,
    defaultWidth: "full"
  })
}, Tr = {
  lastWeek: "'el' eeee 'pasado a la' p",
  yesterday: "'ayer a la' p",
  today: "'hoy a la' p",
  tomorrow: "'mañana a la' p",
  nextWeek: "eeee 'a la' p",
  other: "P"
}, Nr = {
  lastWeek: "'el' eeee 'pasado a las' p",
  yesterday: "'ayer a las' p",
  today: "'hoy a las' p",
  tomorrow: "'mañana a las' p",
  nextWeek: "eeee 'a las' p",
  other: "P"
}, Ar = (e, t, n, a) => t.getHours() !== 1 ? Nr[e] : Tr[e], xr = {
  narrow: ["AC", "DC"],
  abbreviated: ["AC", "DC"],
  wide: ["antes de cristo", "después de cristo"]
}, jr = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["T1", "T2", "T3", "T4"],
  wide: ["1º trimestre", "2º trimestre", "3º trimestre", "4º trimestre"]
}, Lr = {
  narrow: ["e", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"],
  abbreviated: [
    "ene",
    "feb",
    "mar",
    "abr",
    "may",
    "jun",
    "jul",
    "ago",
    "sep",
    "oct",
    "nov",
    "dic"
  ],
  wide: [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre"
  ]
}, _r = {
  narrow: ["d", "l", "m", "m", "j", "v", "s"],
  short: ["do", "lu", "ma", "mi", "ju", "vi", "sá"],
  abbreviated: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
  wide: [
    "domingo",
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado"
  ]
}, Fr = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mn",
    noon: "md",
    morning: "mañana",
    afternoon: "tarde",
    evening: "tarde",
    night: "noche"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "medianoche",
    noon: "mediodia",
    morning: "mañana",
    afternoon: "tarde",
    evening: "tarde",
    night: "noche"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "medianoche",
    noon: "mediodia",
    morning: "mañana",
    afternoon: "tarde",
    evening: "tarde",
    night: "noche"
  }
}, zr = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mn",
    noon: "md",
    morning: "de la mañana",
    afternoon: "de la tarde",
    evening: "de la tarde",
    night: "de la noche"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "medianoche",
    noon: "mediodia",
    morning: "de la mañana",
    afternoon: "de la tarde",
    evening: "de la tarde",
    night: "de la noche"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "medianoche",
    noon: "mediodia",
    morning: "de la mañana",
    afternoon: "de la tarde",
    evening: "de la tarde",
    night: "de la noche"
  }
}, qr = (e, t) => Number(e) + "º", Ir = {
  ordinalNumber: qr,
  era: f({
    values: xr,
    defaultWidth: "wide"
  }),
  quarter: f({
    values: jr,
    defaultWidth: "wide",
    argumentCallback: (e) => Number(e) - 1
  }),
  month: f({
    values: Lr,
    defaultWidth: "wide"
  }),
  day: f({
    values: _r,
    defaultWidth: "wide"
  }),
  dayPeriod: f({
    values: Fr,
    defaultWidth: "wide",
    formattingValues: zr,
    defaultFormattingWidth: "wide"
  })
}, Hr = /^(\d+)(º)?/i, Br = /\d+/i, Gr = {
  narrow: /^(ac|dc|a|d)/i,
  abbreviated: /^(a\.?\s?c\.?|a\.?\s?e\.?\s?c\.?|d\.?\s?c\.?|e\.?\s?c\.?)/i,
  wide: /^(antes de cristo|antes de la era com[uú]n|despu[eé]s de cristo|era com[uú]n)/i
}, Vr = {
  any: [/^ac/i, /^dc/i],
  wide: [
    /^(antes de cristo|antes de la era com[uú]n)/i,
    /^(despu[eé]s de cristo|era com[uú]n)/i
  ]
}, Yr = {
  narrow: /^[1234]/i,
  abbreviated: /^T[1234]/i,
  wide: /^[1234](º)? trimestre/i
}, Xr = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Rr = {
  narrow: /^[efmajsond]/i,
  abbreviated: /^(ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)/i,
  wide: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i
}, Jr = {
  narrow: [
    /^e/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^en/i,
    /^feb/i,
    /^mar/i,
    /^abr/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^ago/i,
    /^sep/i,
    /^oct/i,
    /^nov/i,
    /^dic/i
  ]
}, Qr = {
  narrow: /^[dlmjvs]/i,
  short: /^(do|lu|ma|mi|ju|vi|s[áa])/i,
  abbreviated: /^(dom|lun|mar|mi[ée]|jue|vie|s[áa]b)/i,
  wide: /^(domingo|lunes|martes|mi[ée]rcoles|jueves|viernes|s[áa]bado)/i
}, Zr = {
  narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^j/i, /^v/i, /^s/i],
  any: [/^do/i, /^lu/i, /^ma/i, /^mi/i, /^ju/i, /^vi/i, /^sa/i]
}, Ur = {
  narrow: /^(a|p|mn|md|(de la|a las) (mañana|tarde|noche))/i,
  any: /^([ap]\.?\s?m\.?|medianoche|mediodia|(de la|a las) (mañana|tarde|noche))/i
}, Kr = {
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
}, ei = {
  ordinalNumber: B({
    matchPattern: Hr,
    parsePattern: Br,
    valueCallback: function(e) {
      return parseInt(e, 10);
    }
  }),
  era: g({
    matchPatterns: Gr,
    defaultMatchWidth: "wide",
    parsePatterns: Vr,
    defaultParseWidth: "any"
  }),
  quarter: g({
    matchPatterns: Yr,
    defaultMatchWidth: "wide",
    parsePatterns: Xr,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: g({
    matchPatterns: Rr,
    defaultMatchWidth: "wide",
    parsePatterns: Jr,
    defaultParseWidth: "any"
  }),
  day: g({
    matchPatterns: Qr,
    defaultMatchWidth: "wide",
    parsePatterns: Zr,
    defaultParseWidth: "any"
  }),
  dayPeriod: g({
    matchPatterns: Ur,
    defaultMatchWidth: "any",
    parsePatterns: Kr,
    defaultParseWidth: "any"
  })
}, ti = {
  code: "es",
  formatDistance: Sr,
  formatLong: Er,
  formatRelative: Ar,
  localize: Ir,
  match: ei,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
}, ni = {
  lessThanXSeconds: {
    one: "moins d’une seconde",
    other: "moins de {{count}} secondes"
  },
  xSeconds: {
    one: "1 seconde",
    other: "{{count}} secondes"
  },
  halfAMinute: "30 secondes",
  lessThanXMinutes: {
    one: "moins d’une minute",
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
    one: "plus d’un an",
    other: "plus de {{count}} ans"
  },
  almostXYears: {
    one: "presqu’un an",
    other: "presque {{count}} ans"
  }
}, ai = (e, t, n) => {
  let a;
  const r = ni[e];
  return typeof r == "string" ? a = r : t === 1 ? a = r.one : a = r.other.replace("{{count}}", String(t)), n?.addSuffix ? n.comparison && n.comparison > 0 ? "dans " + a : "il y a " + a : a;
}, ri = {
  lastWeek: "eeee 'dernier à' p",
  yesterday: "'hier à' p",
  today: "'aujourd’hui à' p",
  tomorrow: "'demain à' p'",
  nextWeek: "eeee 'prochain à' p",
  other: "P"
}, ii = (e, t, n, a) => ri[e], oi = {
  narrow: ["av. J.-C", "ap. J.-C"],
  abbreviated: ["av. J.-C", "ap. J.-C"],
  wide: ["avant Jésus-Christ", "après Jésus-Christ"]
}, si = {
  narrow: ["T1", "T2", "T3", "T4"],
  abbreviated: ["1er trim.", "2ème trim.", "3ème trim.", "4ème trim."],
  wide: ["1er trimestre", "2ème trimestre", "3ème trimestre", "4ème trimestre"]
}, di = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "janv.",
    "févr.",
    "mars",
    "avr.",
    "mai",
    "juin",
    "juil.",
    "août",
    "sept.",
    "oct.",
    "nov.",
    "déc."
  ],
  wide: [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre"
  ]
}, ui = {
  narrow: ["D", "L", "M", "M", "J", "V", "S"],
  short: ["di", "lu", "ma", "me", "je", "ve", "sa"],
  abbreviated: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
  wide: [
    "dimanche",
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi"
  ]
}, li = {
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
    afternoon: "après-midi",
    evening: "soir",
    night: "matin"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "minuit",
    noon: "midi",
    morning: "du matin",
    afternoon: "de l’après-midi",
    evening: "du soir",
    night: "du matin"
  }
}, ci = (e, t) => {
  const n = Number(e), a = t?.unit;
  if (n === 0) return "0";
  const r = ["year", "week", "hour", "minute", "second"];
  let i;
  return n === 1 ? i = a && r.includes(a) ? "ère" : "er" : i = "ème", n + i;
}, mi = ["MMM", "MMMM"], hi = {
  preprocessor: (e, t) => e.getDate() === 1 || !t.some(
    (a) => a.isToken && mi.includes(a.value)
  ) ? t : t.map(
    (a) => a.isToken && a.value === "do" ? { isToken: !0, value: "d" } : a
  ),
  ordinalNumber: ci,
  era: f({
    values: oi,
    defaultWidth: "wide"
  }),
  quarter: f({
    values: si,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: f({
    values: di,
    defaultWidth: "wide"
  }),
  day: f({
    values: ui,
    defaultWidth: "wide"
  }),
  dayPeriod: f({
    values: li,
    defaultWidth: "wide"
  })
}, fi = /^(\d+)(ième|ère|ème|er|e)?/i, gi = /\d+/i, pi = {
  narrow: /^(av\.J\.C|ap\.J\.C|ap\.J\.-C)/i,
  abbreviated: /^(av\.J\.-C|av\.J-C|apr\.J\.-C|apr\.J-C|ap\.J-C)/i,
  wide: /^(avant Jésus-Christ|après Jésus-Christ)/i
}, wi = {
  any: [/^av/i, /^ap/i]
}, vi = {
  narrow: /^T?[1234]/i,
  abbreviated: /^[1234](er|ème|e)? trim\.?/i,
  wide: /^[1234](er|ème|e)? trimestre/i
}, yi = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, bi = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(janv|févr|mars|avr|mai|juin|juill|juil|août|sept|oct|nov|déc)\.?/i,
  wide: /^(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)/i
}, Mi = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^av/i,
    /^ma/i,
    /^juin/i,
    /^juil/i,
    /^ao/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
}, Pi = {
  narrow: /^[lmjvsd]/i,
  short: /^(di|lu|ma|me|je|ve|sa)/i,
  abbreviated: /^(dim|lun|mar|mer|jeu|ven|sam)\.?/i,
  wide: /^(dimanche|lundi|mardi|mercredi|jeudi|vendredi|samedi)/i
}, ki = {
  narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^j/i, /^v/i, /^s/i],
  any: [/^di/i, /^lu/i, /^ma/i, /^me/i, /^je/i, /^ve/i, /^sa/i]
}, Di = {
  narrow: /^(a|p|minuit|midi|mat\.?|ap\.?m\.?|soir|nuit)/i,
  any: /^([ap]\.?\s?m\.?|du matin|de l'après[-\s]midi|du soir|de la nuit)/i
}, $i = {
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
}, Si = {
  ordinalNumber: B({
    matchPattern: fi,
    parsePattern: gi,
    valueCallback: (e) => parseInt(e)
  }),
  era: g({
    matchPatterns: pi,
    defaultMatchWidth: "wide",
    parsePatterns: wi,
    defaultParseWidth: "any"
  }),
  quarter: g({
    matchPatterns: vi,
    defaultMatchWidth: "wide",
    parsePatterns: yi,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: g({
    matchPatterns: bi,
    defaultMatchWidth: "wide",
    parsePatterns: Mi,
    defaultParseWidth: "any"
  }),
  day: g({
    matchPatterns: Pi,
    defaultMatchWidth: "wide",
    parsePatterns: ki,
    defaultParseWidth: "any"
  }),
  dayPeriod: g({
    matchPatterns: Di,
    defaultMatchWidth: "any",
    parsePatterns: $i,
    defaultParseWidth: "any"
  })
}, Wi = {
  full: "EEEE d MMMM y",
  long: "d MMMM y",
  medium: "d MMM y",
  short: "yy-MM-dd"
}, Ci = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
}, Oi = {
  full: "{{date}} 'à' {{time}}",
  long: "{{date}} 'à' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Ei = {
  date: M({
    formats: Wi,
    defaultWidth: "full"
  }),
  time: M({
    formats: Ci,
    defaultWidth: "full"
  }),
  dateTime: M({
    formats: Oi,
    defaultWidth: "full"
  })
}, Ti = {
  code: "fr-CA",
  formatDistance: ai,
  formatLong: Ei,
  formatRelative: ii,
  localize: hi,
  match: Si,
  // Unique for fr-CA
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
}, Ni = {
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
    one: "più di un anno",
    other: "più di {{count}} anni"
  },
  almostXYears: {
    one: "quasi un anno",
    other: "quasi {{count}} anni"
  }
}, Ai = (e, t, n) => {
  let a;
  const r = Ni[e];
  return typeof r == "string" ? a = r : t === 1 ? a = r.one : a = r.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "tra " + a : a + " fa" : a;
}, xi = {
  full: "EEEE d MMMM y",
  long: "d MMMM y",
  medium: "d MMM y",
  short: "dd/MM/y"
}, ji = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
}, Li = {
  full: "{{date}} {{time}}",
  long: "{{date}} {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
}, _i = {
  date: M({
    formats: xi,
    defaultWidth: "full"
  }),
  time: M({
    formats: ji,
    defaultWidth: "full"
  }),
  dateTime: M({
    formats: Li,
    defaultWidth: "full"
  })
}, Se = [
  "domenica",
  "lunedì",
  "martedì",
  "mercoledì",
  "giovedì",
  "venerdì",
  "sabato"
];
function Fi(e) {
  switch (e) {
    case 0:
      return "'domenica scorsa alle' p";
    default:
      return "'" + Se[e] + " scorso alle' p";
  }
}
function He(e) {
  return "'" + Se[e] + " alle' p";
}
function zi(e) {
  switch (e) {
    case 0:
      return "'domenica prossima alle' p";
    default:
      return "'" + Se[e] + " prossimo alle' p";
  }
}
const qi = {
  lastWeek: (e, t, n) => {
    const a = e.getDay();
    return le(e, t, n) ? He(a) : Fi(a);
  },
  yesterday: "'ieri alle' p",
  today: "'oggi alle' p",
  tomorrow: "'domani alle' p",
  nextWeek: (e, t, n) => {
    const a = e.getDay();
    return le(e, t, n) ? He(a) : zi(a);
  },
  other: "P"
}, Ii = (e, t, n, a) => {
  const r = qi[e];
  return typeof r == "function" ? r(t, n, a) : r;
}, Hi = {
  narrow: ["aC", "dC"],
  abbreviated: ["a.C.", "d.C."],
  wide: ["avanti Cristo", "dopo Cristo"]
}, Bi = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["T1", "T2", "T3", "T4"],
  wide: ["1º trimestre", "2º trimestre", "3º trimestre", "4º trimestre"]
}, Gi = {
  narrow: ["G", "F", "M", "A", "M", "G", "L", "A", "S", "O", "N", "D"],
  abbreviated: [
    "gen",
    "feb",
    "mar",
    "apr",
    "mag",
    "giu",
    "lug",
    "ago",
    "set",
    "ott",
    "nov",
    "dic"
  ],
  wide: [
    "gennaio",
    "febbraio",
    "marzo",
    "aprile",
    "maggio",
    "giugno",
    "luglio",
    "agosto",
    "settembre",
    "ottobre",
    "novembre",
    "dicembre"
  ]
}, Vi = {
  narrow: ["D", "L", "M", "M", "G", "V", "S"],
  short: ["dom", "lun", "mar", "mer", "gio", "ven", "sab"],
  abbreviated: ["dom", "lun", "mar", "mer", "gio", "ven", "sab"],
  wide: [
    "domenica",
    "lunedì",
    "martedì",
    "mercoledì",
    "giovedì",
    "venerdì",
    "sabato"
  ]
}, Yi = {
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
}, Xi = {
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
}, Ri = (e, t) => {
  const n = Number(e);
  return String(n);
}, Ji = {
  ordinalNumber: Ri,
  era: f({
    values: Hi,
    defaultWidth: "wide"
  }),
  quarter: f({
    values: Bi,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: f({
    values: Gi,
    defaultWidth: "wide"
  }),
  day: f({
    values: Vi,
    defaultWidth: "wide"
  }),
  dayPeriod: f({
    values: Yi,
    defaultWidth: "wide",
    formattingValues: Xi,
    defaultFormattingWidth: "wide"
  })
}, Qi = /^(\d+)(º)?/i, Zi = /\d+/i, Ui = {
  narrow: /^(aC|dC)/i,
  abbreviated: /^(a\.?\s?C\.?|a\.?\s?e\.?\s?v\.?|d\.?\s?C\.?|e\.?\s?v\.?)/i,
  wide: /^(avanti Cristo|avanti Era Volgare|dopo Cristo|Era Volgare)/i
}, Ki = {
  any: [/^a/i, /^(d|e)/i]
}, eo = {
  narrow: /^[1234]/i,
  abbreviated: /^t[1234]/i,
  wide: /^[1234](º)? trimestre/i
}, to = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, no = {
  narrow: /^[gfmalsond]/i,
  abbreviated: /^(gen|feb|mar|apr|mag|giu|lug|ago|set|ott|nov|dic)/i,
  wide: /^(gennaio|febbraio|marzo|aprile|maggio|giugno|luglio|agosto|settembre|ottobre|novembre|dicembre)/i
}, ao = {
  narrow: [
    /^g/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^g/i,
    /^l/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ge/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^mag/i,
    /^gi/i,
    /^l/i,
    /^ag/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
}, ro = {
  narrow: /^[dlmgvs]/i,
  short: /^(do|lu|ma|me|gi|ve|sa)/i,
  abbreviated: /^(dom|lun|mar|mer|gio|ven|sab)/i,
  wide: /^(domenica|luned[i|ì]|marted[i|ì]|mercoled[i|ì]|gioved[i|ì]|venerd[i|ì]|sabato)/i
}, io = {
  narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^g/i, /^v/i, /^s/i],
  any: [/^d/i, /^l/i, /^ma/i, /^me/i, /^g/i, /^v/i, /^s/i]
}, oo = {
  narrow: /^(a|m\.|p|mezzanotte|mezzogiorno|(di|del) (mattina|pomeriggio|sera|notte))/i,
  any: /^([ap]\.?\s?m\.?|mezzanotte|mezzogiorno|(di|del) (mattina|pomeriggio|sera|notte))/i
}, so = {
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
}, uo = {
  ordinalNumber: B({
    matchPattern: Qi,
    parsePattern: Zi,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: g({
    matchPatterns: Ui,
    defaultMatchWidth: "wide",
    parsePatterns: Ki,
    defaultParseWidth: "any"
  }),
  quarter: g({
    matchPatterns: eo,
    defaultMatchWidth: "wide",
    parsePatterns: to,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: g({
    matchPatterns: no,
    defaultMatchWidth: "wide",
    parsePatterns: ao,
    defaultParseWidth: "any"
  }),
  day: g({
    matchPatterns: ro,
    defaultMatchWidth: "wide",
    parsePatterns: io,
    defaultParseWidth: "any"
  }),
  dayPeriod: g({
    matchPatterns: oo,
    defaultMatchWidth: "any",
    parsePatterns: so,
    defaultParseWidth: "any"
  })
}, lo = {
  code: "it",
  formatDistance: Ai,
  formatLong: _i,
  formatRelative: Ii,
  localize: Ji,
  match: uo,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
}, co = {
  lessThanXSeconds: {
    one: "1초 미만",
    other: "{{count}}초 미만"
  },
  xSeconds: {
    one: "1초",
    other: "{{count}}초"
  },
  halfAMinute: "30초",
  lessThanXMinutes: {
    one: "1분 미만",
    other: "{{count}}분 미만"
  },
  xMinutes: {
    one: "1분",
    other: "{{count}}분"
  },
  aboutXHours: {
    one: "약 1시간",
    other: "약 {{count}}시간"
  },
  xHours: {
    one: "1시간",
    other: "{{count}}시간"
  },
  xDays: {
    one: "1일",
    other: "{{count}}일"
  },
  aboutXWeeks: {
    one: "약 1주",
    other: "약 {{count}}주"
  },
  xWeeks: {
    one: "1주",
    other: "{{count}}주"
  },
  aboutXMonths: {
    one: "약 1개월",
    other: "약 {{count}}개월"
  },
  xMonths: {
    one: "1개월",
    other: "{{count}}개월"
  },
  aboutXYears: {
    one: "약 1년",
    other: "약 {{count}}년"
  },
  xYears: {
    one: "1년",
    other: "{{count}}년"
  },
  overXYears: {
    one: "1년 이상",
    other: "{{count}}년 이상"
  },
  almostXYears: {
    one: "거의 1년",
    other: "거의 {{count}}년"
  }
}, mo = (e, t, n) => {
  let a;
  const r = co[e];
  return typeof r == "string" ? a = r : t === 1 ? a = r.one : a = r.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? a + " 후" : a + " 전" : a;
}, ho = {
  full: "y년 M월 d일 EEEE",
  long: "y년 M월 d일",
  medium: "y.MM.dd",
  short: "y.MM.dd"
}, fo = {
  full: "a H시 mm분 ss초 zzzz",
  long: "a H:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
}, go = {
  full: "{{date}} {{time}}",
  long: "{{date}} {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
}, po = {
  date: M({
    formats: ho,
    defaultWidth: "full"
  }),
  time: M({
    formats: fo,
    defaultWidth: "full"
  }),
  dateTime: M({
    formats: go,
    defaultWidth: "full"
  })
}, wo = {
  lastWeek: "'지난' eeee p",
  yesterday: "'어제' p",
  today: "'오늘' p",
  tomorrow: "'내일' p",
  nextWeek: "'다음' eeee p",
  other: "P"
}, vo = (e, t, n, a) => wo[e], yo = {
  narrow: ["BC", "AD"],
  abbreviated: ["BC", "AD"],
  wide: ["기원전", "서기"]
}, bo = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1분기", "2분기", "3분기", "4분기"]
}, Mo = {
  narrow: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
  abbreviated: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월"
  ],
  wide: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월"
  ]
}, Po = {
  narrow: ["일", "월", "화", "수", "목", "금", "토"],
  short: ["일", "월", "화", "수", "목", "금", "토"],
  abbreviated: ["일", "월", "화", "수", "목", "금", "토"],
  wide: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]
}, ko = {
  narrow: {
    am: "오전",
    pm: "오후",
    midnight: "자정",
    noon: "정오",
    morning: "아침",
    afternoon: "오후",
    evening: "저녁",
    night: "밤"
  },
  abbreviated: {
    am: "오전",
    pm: "오후",
    midnight: "자정",
    noon: "정오",
    morning: "아침",
    afternoon: "오후",
    evening: "저녁",
    night: "밤"
  },
  wide: {
    am: "오전",
    pm: "오후",
    midnight: "자정",
    noon: "정오",
    morning: "아침",
    afternoon: "오후",
    evening: "저녁",
    night: "밤"
  }
}, Do = {
  narrow: {
    am: "오전",
    pm: "오후",
    midnight: "자정",
    noon: "정오",
    morning: "아침",
    afternoon: "오후",
    evening: "저녁",
    night: "밤"
  },
  abbreviated: {
    am: "오전",
    pm: "오후",
    midnight: "자정",
    noon: "정오",
    morning: "아침",
    afternoon: "오후",
    evening: "저녁",
    night: "밤"
  },
  wide: {
    am: "오전",
    pm: "오후",
    midnight: "자정",
    noon: "정오",
    morning: "아침",
    afternoon: "오후",
    evening: "저녁",
    night: "밤"
  }
}, $o = (e, t) => {
  const n = Number(e);
  switch (String(t?.unit)) {
    case "minute":
    case "second":
      return String(n);
    case "date":
      return n + "일";
    default:
      return n + "번째";
  }
}, So = {
  ordinalNumber: $o,
  era: f({
    values: yo,
    defaultWidth: "wide"
  }),
  quarter: f({
    values: bo,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: f({
    values: Mo,
    defaultWidth: "wide"
  }),
  day: f({
    values: Po,
    defaultWidth: "wide"
  }),
  dayPeriod: f({
    values: ko,
    defaultWidth: "wide",
    formattingValues: Do,
    defaultFormattingWidth: "wide"
  })
}, Wo = /^(\d+)(일|번째)?/i, Co = /\d+/i, Oo = {
  narrow: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(기원전|서기)/i
}, Eo = {
  any: [/^(bc|기원전)/i, /^(ad|서기)/i]
}, To = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234]사?분기/i
}, No = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Ao = {
  narrow: /^(1[012]|[123456789])/,
  abbreviated: /^(1[012]|[123456789])월/i,
  wide: /^(1[012]|[123456789])월/i
}, xo = {
  any: [
    /^1월?$/,
    /^2/,
    /^3/,
    /^4/,
    /^5/,
    /^6/,
    /^7/,
    /^8/,
    /^9/,
    /^10/,
    /^11/,
    /^12/
  ]
}, jo = {
  narrow: /^[일월화수목금토]/,
  short: /^[일월화수목금토]/,
  abbreviated: /^[일월화수목금토]/,
  wide: /^[일월화수목금토]요일/
}, Lo = {
  any: [/^일/, /^월/, /^화/, /^수/, /^목/, /^금/, /^토/]
}, _o = {
  any: /^(am|pm|오전|오후|자정|정오|아침|저녁|밤)/i
}, Fo = {
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
}, zo = {
  ordinalNumber: B({
    matchPattern: Wo,
    parsePattern: Co,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: g({
    matchPatterns: Oo,
    defaultMatchWidth: "wide",
    parsePatterns: Eo,
    defaultParseWidth: "any"
  }),
  quarter: g({
    matchPatterns: To,
    defaultMatchWidth: "wide",
    parsePatterns: No,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: g({
    matchPatterns: Ao,
    defaultMatchWidth: "wide",
    parsePatterns: xo,
    defaultParseWidth: "any"
  }),
  day: g({
    matchPatterns: jo,
    defaultMatchWidth: "wide",
    parsePatterns: Lo,
    defaultParseWidth: "any"
  }),
  dayPeriod: g({
    matchPatterns: _o,
    defaultMatchWidth: "any",
    parsePatterns: Fo,
    defaultParseWidth: "any"
  })
}, qo = {
  code: "ko",
  formatDistance: mo,
  formatLong: po,
  formatRelative: vo,
  localize: So,
  match: zo,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
}, Io = {
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
    one: "aproximadamente 1 mês",
    other: "aproximadamente {{count}} meses"
  },
  xMonths: {
    one: "1 mês",
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
}, Ho = (e, t, n) => {
  let a;
  const r = Io[e];
  return typeof r == "string" ? a = r : t === 1 ? a = r.one : a = r.other.replace("{{count}}", String(t)), n?.addSuffix ? n.comparison && n.comparison > 0 ? "daqui a " + a : "há " + a : a;
}, Bo = {
  full: "EEEE, d 'de' MMMM 'de' y",
  long: "d 'de' MMMM 'de' y",
  medium: "d 'de' MMM 'de' y",
  short: "dd/MM/y"
}, Go = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
}, Vo = {
  full: "{{date}} 'às' {{time}}",
  long: "{{date}} 'às' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Yo = {
  date: M({
    formats: Bo,
    defaultWidth: "full"
  }),
  time: M({
    formats: Go,
    defaultWidth: "full"
  }),
  dateTime: M({
    formats: Vo,
    defaultWidth: "full"
  })
}, Xo = {
  lastWeek: (e) => {
    const t = e.getDay();
    return "'" + (t === 0 || t === 6 ? "último" : "última") + "' eeee 'às' p";
  },
  yesterday: "'ontem às' p",
  today: "'hoje às' p",
  tomorrow: "'amanhã às' p",
  nextWeek: "eeee 'às' p",
  other: "P"
}, Ro = (e, t, n, a) => {
  const r = Xo[e];
  return typeof r == "function" ? r(t) : r;
}, Jo = {
  narrow: ["aC", "dC"],
  abbreviated: ["a.C.", "d.C."],
  wide: ["antes de Cristo", "depois de Cristo"]
}, Qo = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["T1", "T2", "T3", "T4"],
  wide: ["1º trimestre", "2º trimestre", "3º trimestre", "4º trimestre"]
}, Zo = {
  narrow: ["j", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"],
  abbreviated: [
    "jan",
    "fev",
    "mar",
    "abr",
    "mai",
    "jun",
    "jul",
    "ago",
    "set",
    "out",
    "nov",
    "dez"
  ],
  wide: [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro"
  ]
}, Uo = {
  narrow: ["d", "s", "t", "q", "q", "s", "s"],
  short: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
  abbreviated: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
  wide: [
    "domingo",
    "segunda-feira",
    "terça-feira",
    "quarta-feira",
    "quinta-feira",
    "sexta-feira",
    "sábado"
  ]
}, Ko = {
  narrow: {
    am: "AM",
    pm: "PM",
    midnight: "meia-noite",
    noon: "meio-dia",
    morning: "manhã",
    afternoon: "tarde",
    evening: "noite",
    night: "madrugada"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "meia-noite",
    noon: "meio-dia",
    morning: "manhã",
    afternoon: "tarde",
    evening: "noite",
    night: "madrugada"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "meia-noite",
    noon: "meio-dia",
    morning: "manhã",
    afternoon: "tarde",
    evening: "noite",
    night: "madrugada"
  }
}, es = {
  narrow: {
    am: "AM",
    pm: "PM",
    midnight: "meia-noite",
    noon: "meio-dia",
    morning: "da manhã",
    afternoon: "da tarde",
    evening: "da noite",
    night: "da madrugada"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "meia-noite",
    noon: "meio-dia",
    morning: "da manhã",
    afternoon: "da tarde",
    evening: "da noite",
    night: "da madrugada"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "meia-noite",
    noon: "meio-dia",
    morning: "da manhã",
    afternoon: "da tarde",
    evening: "da noite",
    night: "da madrugada"
  }
}, ts = (e, t) => Number(e) + "º", ns = {
  ordinalNumber: ts,
  era: f({
    values: Jo,
    defaultWidth: "wide"
  }),
  quarter: f({
    values: Qo,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: f({
    values: Zo,
    defaultWidth: "wide"
  }),
  day: f({
    values: Uo,
    defaultWidth: "wide"
  }),
  dayPeriod: f({
    values: Ko,
    defaultWidth: "wide",
    formattingValues: es,
    defaultFormattingWidth: "wide"
  })
}, as = /^(\d+)(º|ª)?/i, rs = /\d+/i, is = {
  narrow: /^(ac|dc|a|d)/i,
  abbreviated: /^(a\.?\s?c\.?|a\.?\s?e\.?\s?c\.?|d\.?\s?c\.?|e\.?\s?c\.?)/i,
  wide: /^(antes de cristo|antes da era comum|depois de cristo|era comum)/i
}, os = {
  any: [/^ac/i, /^dc/i],
  wide: [
    /^(antes de cristo|antes da era comum)/i,
    /^(depois de cristo|era comum)/i
  ]
}, ss = {
  narrow: /^[1234]/i,
  abbreviated: /^T[1234]/i,
  wide: /^[1234](º|ª)? trimestre/i
}, ds = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, us = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez)/i,
  wide: /^(janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)/i
}, ls = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ab/i,
    /^mai/i,
    /^jun/i,
    /^jul/i,
    /^ag/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
}, cs = {
  narrow: /^[dstq]/i,
  short: /^(dom|seg|ter|qua|qui|sex|s[áa]b)/i,
  abbreviated: /^(dom|seg|ter|qua|qui|sex|s[áa]b)/i,
  wide: /^(domingo|segunda-?\s?feira|terça-?\s?feira|quarta-?\s?feira|quinta-?\s?feira|sexta-?\s?feira|s[áa]bado)/i
}, ms = {
  narrow: [/^d/i, /^s/i, /^t/i, /^q/i, /^q/i, /^s/i, /^s/i],
  any: [/^d/i, /^seg/i, /^t/i, /^qua/i, /^qui/i, /^sex/i, /^s[áa]/i]
}, hs = {
  narrow: /^(a|p|meia-?\s?noite|meio-?\s?dia|(da) (manh[ãa]|tarde|noite|madrugada))/i,
  any: /^([ap]\.?\s?m\.?|meia-?\s?noite|meio-?\s?dia|(da) (manh[ãa]|tarde|noite|madrugada))/i
}, fs = {
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
}, gs = {
  ordinalNumber: B({
    matchPattern: as,
    parsePattern: rs,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: g({
    matchPatterns: is,
    defaultMatchWidth: "wide",
    parsePatterns: os,
    defaultParseWidth: "any"
  }),
  quarter: g({
    matchPatterns: ss,
    defaultMatchWidth: "wide",
    parsePatterns: ds,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: g({
    matchPatterns: us,
    defaultMatchWidth: "wide",
    parsePatterns: ls,
    defaultParseWidth: "any"
  }),
  day: g({
    matchPatterns: cs,
    defaultMatchWidth: "wide",
    parsePatterns: ms,
    defaultParseWidth: "any"
  }),
  dayPeriod: g({
    matchPatterns: hs,
    defaultMatchWidth: "any",
    parsePatterns: fs,
    defaultParseWidth: "any"
  })
}, ps = {
  code: "pt",
  formatDistance: Ho,
  formatLong: Yo,
  formatRelative: Ro,
  localize: ns,
  match: gs,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
function ae(e, t) {
  if (e.one !== void 0 && t === 1)
    return e.one;
  const n = t % 10, a = t % 100;
  return n === 1 && a !== 11 ? e.singularNominative.replace("{{count}}", String(t)) : n >= 2 && n <= 4 && (a < 10 || a > 20) ? e.singularGenitive.replace("{{count}}", String(t)) : e.pluralGenitive.replace("{{count}}", String(t));
}
function x(e) {
  return (t, n) => n?.addSuffix ? n.comparison && n.comparison > 0 ? e.future ? ae(e.future, t) : "через " + ae(e.regular, t) : e.past ? ae(e.past, t) : ae(e.regular, t) + " назад" : ae(e.regular, t);
}
const ws = {
  lessThanXSeconds: x({
    regular: {
      one: "меньше секунды",
      singularNominative: "меньше {{count}} секунды",
      singularGenitive: "меньше {{count}} секунд",
      pluralGenitive: "меньше {{count}} секунд"
    },
    future: {
      one: "меньше, чем через секунду",
      singularNominative: "меньше, чем через {{count}} секунду",
      singularGenitive: "меньше, чем через {{count}} секунды",
      pluralGenitive: "меньше, чем через {{count}} секунд"
    }
  }),
  xSeconds: x({
    regular: {
      singularNominative: "{{count}} секунда",
      singularGenitive: "{{count}} секунды",
      pluralGenitive: "{{count}} секунд"
    },
    past: {
      singularNominative: "{{count}} секунду назад",
      singularGenitive: "{{count}} секунды назад",
      pluralGenitive: "{{count}} секунд назад"
    },
    future: {
      singularNominative: "через {{count}} секунду",
      singularGenitive: "через {{count}} секунды",
      pluralGenitive: "через {{count}} секунд"
    }
  }),
  halfAMinute: (e, t) => t?.addSuffix ? t.comparison && t.comparison > 0 ? "через полминуты" : "полминуты назад" : "полминуты",
  lessThanXMinutes: x({
    regular: {
      one: "меньше минуты",
      singularNominative: "меньше {{count}} минуты",
      singularGenitive: "меньше {{count}} минут",
      pluralGenitive: "меньше {{count}} минут"
    },
    future: {
      one: "меньше, чем через минуту",
      singularNominative: "меньше, чем через {{count}} минуту",
      singularGenitive: "меньше, чем через {{count}} минуты",
      pluralGenitive: "меньше, чем через {{count}} минут"
    }
  }),
  xMinutes: x({
    regular: {
      singularNominative: "{{count}} минута",
      singularGenitive: "{{count}} минуты",
      pluralGenitive: "{{count}} минут"
    },
    past: {
      singularNominative: "{{count}} минуту назад",
      singularGenitive: "{{count}} минуты назад",
      pluralGenitive: "{{count}} минут назад"
    },
    future: {
      singularNominative: "через {{count}} минуту",
      singularGenitive: "через {{count}} минуты",
      pluralGenitive: "через {{count}} минут"
    }
  }),
  aboutXHours: x({
    regular: {
      singularNominative: "около {{count}} часа",
      singularGenitive: "около {{count}} часов",
      pluralGenitive: "около {{count}} часов"
    },
    future: {
      singularNominative: "приблизительно через {{count}} час",
      singularGenitive: "приблизительно через {{count}} часа",
      pluralGenitive: "приблизительно через {{count}} часов"
    }
  }),
  xHours: x({
    regular: {
      singularNominative: "{{count}} час",
      singularGenitive: "{{count}} часа",
      pluralGenitive: "{{count}} часов"
    }
  }),
  xDays: x({
    regular: {
      singularNominative: "{{count}} день",
      singularGenitive: "{{count}} дня",
      pluralGenitive: "{{count}} дней"
    }
  }),
  aboutXWeeks: x({
    regular: {
      singularNominative: "около {{count}} недели",
      singularGenitive: "около {{count}} недель",
      pluralGenitive: "около {{count}} недель"
    },
    future: {
      singularNominative: "приблизительно через {{count}} неделю",
      singularGenitive: "приблизительно через {{count}} недели",
      pluralGenitive: "приблизительно через {{count}} недель"
    }
  }),
  xWeeks: x({
    regular: {
      singularNominative: "{{count}} неделя",
      singularGenitive: "{{count}} недели",
      pluralGenitive: "{{count}} недель"
    }
  }),
  aboutXMonths: x({
    regular: {
      singularNominative: "около {{count}} месяца",
      singularGenitive: "около {{count}} месяцев",
      pluralGenitive: "около {{count}} месяцев"
    },
    future: {
      singularNominative: "приблизительно через {{count}} месяц",
      singularGenitive: "приблизительно через {{count}} месяца",
      pluralGenitive: "приблизительно через {{count}} месяцев"
    }
  }),
  xMonths: x({
    regular: {
      singularNominative: "{{count}} месяц",
      singularGenitive: "{{count}} месяца",
      pluralGenitive: "{{count}} месяцев"
    }
  }),
  aboutXYears: x({
    regular: {
      singularNominative: "около {{count}} года",
      singularGenitive: "около {{count}} лет",
      pluralGenitive: "около {{count}} лет"
    },
    future: {
      singularNominative: "приблизительно через {{count}} год",
      singularGenitive: "приблизительно через {{count}} года",
      pluralGenitive: "приблизительно через {{count}} лет"
    }
  }),
  xYears: x({
    regular: {
      singularNominative: "{{count}} год",
      singularGenitive: "{{count}} года",
      pluralGenitive: "{{count}} лет"
    }
  }),
  overXYears: x({
    regular: {
      singularNominative: "больше {{count}} года",
      singularGenitive: "больше {{count}} лет",
      pluralGenitive: "больше {{count}} лет"
    },
    future: {
      singularNominative: "больше, чем через {{count}} год",
      singularGenitive: "больше, чем через {{count}} года",
      pluralGenitive: "больше, чем через {{count}} лет"
    }
  }),
  almostXYears: x({
    regular: {
      singularNominative: "почти {{count}} год",
      singularGenitive: "почти {{count}} года",
      pluralGenitive: "почти {{count}} лет"
    },
    future: {
      singularNominative: "почти через {{count}} год",
      singularGenitive: "почти через {{count}} года",
      pluralGenitive: "почти через {{count}} лет"
    }
  })
}, vs = (e, t, n) => ws[e](t, n), ys = {
  full: "EEEE, d MMMM y 'г.'",
  long: "d MMMM y 'г.'",
  medium: "d MMM y 'г.'",
  short: "dd.MM.y"
}, bs = {
  full: "H:mm:ss zzzz",
  long: "H:mm:ss z",
  medium: "H:mm:ss",
  short: "H:mm"
}, Ms = {
  any: "{{date}}, {{time}}"
}, Ps = {
  date: M({
    formats: ys,
    defaultWidth: "full"
  }),
  time: M({
    formats: bs,
    defaultWidth: "full"
  }),
  dateTime: M({
    formats: Ms,
    defaultWidth: "any"
  })
}, We = [
  "воскресенье",
  "понедельник",
  "вторник",
  "среду",
  "четверг",
  "пятницу",
  "субботу"
];
function ks(e) {
  const t = We[e];
  switch (e) {
    case 0:
      return "'в прошлое " + t + " в' p";
    case 1:
    case 2:
    case 4:
      return "'в прошлый " + t + " в' p";
    case 3:
    case 5:
    case 6:
      return "'в прошлую " + t + " в' p";
  }
}
function Be(e) {
  const t = We[e];
  return e === 2 ? "'во " + t + " в' p" : "'в " + t + " в' p";
}
function Ds(e) {
  const t = We[e];
  switch (e) {
    case 0:
      return "'в следующее " + t + " в' p";
    case 1:
    case 2:
    case 4:
      return "'в следующий " + t + " в' p";
    case 3:
    case 5:
    case 6:
      return "'в следующую " + t + " в' p";
  }
}
const $s = {
  lastWeek: (e, t, n) => {
    const a = e.getDay();
    return le(e, t, n) ? Be(a) : ks(a);
  },
  yesterday: "'вчера в' p",
  today: "'сегодня в' p",
  tomorrow: "'завтра в' p",
  nextWeek: (e, t, n) => {
    const a = e.getDay();
    return le(e, t, n) ? Be(a) : Ds(a);
  },
  other: "P"
}, Ss = (e, t, n, a) => {
  const r = $s[e];
  return typeof r == "function" ? r(t, n, a) : r;
}, Ws = {
  narrow: ["до н.э.", "н.э."],
  abbreviated: ["до н. э.", "н. э."],
  wide: ["до нашей эры", "нашей эры"]
}, Cs = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["1-й кв.", "2-й кв.", "3-й кв.", "4-й кв."],
  wide: ["1-й квартал", "2-й квартал", "3-й квартал", "4-й квартал"]
}, Os = {
  narrow: ["Я", "Ф", "М", "А", "М", "И", "И", "А", "С", "О", "Н", "Д"],
  abbreviated: [
    "янв.",
    "фев.",
    "март",
    "апр.",
    "май",
    "июнь",
    "июль",
    "авг.",
    "сент.",
    "окт.",
    "нояб.",
    "дек."
  ],
  wide: [
    "январь",
    "февраль",
    "март",
    "апрель",
    "май",
    "июнь",
    "июль",
    "август",
    "сентябрь",
    "октябрь",
    "ноябрь",
    "декабрь"
  ]
}, Es = {
  narrow: ["Я", "Ф", "М", "А", "М", "И", "И", "А", "С", "О", "Н", "Д"],
  abbreviated: [
    "янв.",
    "фев.",
    "мар.",
    "апр.",
    "мая",
    "июн.",
    "июл.",
    "авг.",
    "сент.",
    "окт.",
    "нояб.",
    "дек."
  ],
  wide: [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря"
  ]
}, Ts = {
  narrow: ["В", "П", "В", "С", "Ч", "П", "С"],
  short: ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
  abbreviated: ["вск", "пнд", "втр", "срд", "чтв", "птн", "суб"],
  wide: [
    "воскресенье",
    "понедельник",
    "вторник",
    "среда",
    "четверг",
    "пятница",
    "суббота"
  ]
}, Ns = {
  narrow: {
    am: "ДП",
    pm: "ПП",
    midnight: "полн.",
    noon: "полд.",
    morning: "утро",
    afternoon: "день",
    evening: "веч.",
    night: "ночь"
  },
  abbreviated: {
    am: "ДП",
    pm: "ПП",
    midnight: "полн.",
    noon: "полд.",
    morning: "утро",
    afternoon: "день",
    evening: "веч.",
    night: "ночь"
  },
  wide: {
    am: "ДП",
    pm: "ПП",
    midnight: "полночь",
    noon: "полдень",
    morning: "утро",
    afternoon: "день",
    evening: "вечер",
    night: "ночь"
  }
}, As = {
  narrow: {
    am: "ДП",
    pm: "ПП",
    midnight: "полн.",
    noon: "полд.",
    morning: "утра",
    afternoon: "дня",
    evening: "веч.",
    night: "ночи"
  },
  abbreviated: {
    am: "ДП",
    pm: "ПП",
    midnight: "полн.",
    noon: "полд.",
    morning: "утра",
    afternoon: "дня",
    evening: "веч.",
    night: "ночи"
  },
  wide: {
    am: "ДП",
    pm: "ПП",
    midnight: "полночь",
    noon: "полдень",
    morning: "утра",
    afternoon: "дня",
    evening: "вечера",
    night: "ночи"
  }
}, xs = (e, t) => {
  const n = Number(e), a = t?.unit;
  let r;
  return a === "date" ? r = "-е" : a === "week" || a === "minute" || a === "second" ? r = "-я" : r = "-й", n + r;
}, js = {
  ordinalNumber: xs,
  era: f({
    values: Ws,
    defaultWidth: "wide"
  }),
  quarter: f({
    values: Cs,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: f({
    values: Os,
    defaultWidth: "wide",
    formattingValues: Es,
    defaultFormattingWidth: "wide"
  }),
  day: f({
    values: Ts,
    defaultWidth: "wide"
  }),
  dayPeriod: f({
    values: Ns,
    defaultWidth: "any",
    formattingValues: As,
    defaultFormattingWidth: "wide"
  })
}, Ls = /^(\d+)(-?(е|я|й|ое|ье|ая|ья|ый|ой|ий|ый))?/i, _s = /\d+/i, Fs = {
  narrow: /^((до )?н\.?\s?э\.?)/i,
  abbreviated: /^((до )?н\.?\s?э\.?)/i,
  wide: /^(до нашей эры|нашей эры|наша эра)/i
}, zs = {
  any: [/^д/i, /^н/i]
}, qs = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234](-?[ыои]?й?)? кв.?/i,
  wide: /^[1234](-?[ыои]?й?)? квартал/i
}, Is = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Hs = {
  narrow: /^[яфмаисонд]/i,
  abbreviated: /^(янв|фев|март?|апр|ма[йя]|июн[ья]?|июл[ья]?|авг|сент?|окт|нояб?|дек)\.?/i,
  wide: /^(январ[ья]|феврал[ья]|марта?|апрел[ья]|ма[йя]|июн[ья]|июл[ья]|августа?|сентябр[ья]|октябр[ья]|октябр[ья]|ноябр[ья]|декабр[ья])/i
}, Bs = {
  narrow: [
    /^я/i,
    /^ф/i,
    /^м/i,
    /^а/i,
    /^м/i,
    /^и/i,
    /^и/i,
    /^а/i,
    /^с/i,
    /^о/i,
    /^н/i,
    /^я/i
  ],
  any: [
    /^я/i,
    /^ф/i,
    /^мар/i,
    /^ап/i,
    /^ма[йя]/i,
    /^июн/i,
    /^июл/i,
    /^ав/i,
    /^с/i,
    /^о/i,
    /^н/i,
    /^д/i
  ]
}, Gs = {
  narrow: /^[впсч]/i,
  short: /^(вс|во|пн|по|вт|ср|чт|че|пт|пя|сб|су)\.?/i,
  abbreviated: /^(вск|вос|пнд|пон|втр|вто|срд|сре|чтв|чет|птн|пят|суб).?/i,
  wide: /^(воскресень[ея]|понедельника?|вторника?|сред[аы]|четверга?|пятниц[аы]|суббот[аы])/i
}, Vs = {
  narrow: [/^в/i, /^п/i, /^в/i, /^с/i, /^ч/i, /^п/i, /^с/i],
  any: [/^в[ос]/i, /^п[он]/i, /^в/i, /^ср/i, /^ч/i, /^п[ят]/i, /^с[уб]/i]
}, Ys = {
  narrow: /^([дп]п|полн\.?|полд\.?|утр[оа]|день|дня|веч\.?|ноч[ьи])/i,
  abbreviated: /^([дп]п|полн\.?|полд\.?|утр[оа]|день|дня|веч\.?|ноч[ьи])/i,
  wide: /^([дп]п|полночь|полдень|утр[оа]|день|дня|вечера?|ноч[ьи])/i
}, Xs = {
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
}, Rs = {
  ordinalNumber: B({
    matchPattern: Ls,
    parsePattern: _s,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: g({
    matchPatterns: Fs,
    defaultMatchWidth: "wide",
    parsePatterns: zs,
    defaultParseWidth: "any"
  }),
  quarter: g({
    matchPatterns: qs,
    defaultMatchWidth: "wide",
    parsePatterns: Is,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: g({
    matchPatterns: Hs,
    defaultMatchWidth: "wide",
    parsePatterns: Bs,
    defaultParseWidth: "any"
  }),
  day: g({
    matchPatterns: Gs,
    defaultMatchWidth: "wide",
    parsePatterns: Vs,
    defaultParseWidth: "any"
  }),
  dayPeriod: g({
    matchPatterns: Ys,
    defaultMatchWidth: "wide",
    parsePatterns: Xs,
    defaultParseWidth: "any"
  })
}, Js = {
  code: "ru",
  formatDistance: vs,
  formatLong: Ps,
  formatRelative: Ss,
  localize: js,
  match: Rs,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
}, Ge = { en: Dr, fr: Ti, es: ti, de: wr, ca: ma, it: lo, ru: Js, pt: ps, da: Ha, ko: qo };
function Qs(e = N(/* @__PURE__ */ new Date()), t = N("en")) {
  const n = Ue({
    start: null,
    end: null
  }), a = F(() => ({
    start: n && n.start ? Q(
      new Date(
        n.start.year,
        n.start.month,
        n.start.date
      ),
      "yyyy-MM-dd"
      // 'Z'
    ) : null,
    end: n && n.end ? Q(
      new Date(
        n.end.year,
        n.end.month,
        n.end.date
      ),
      "yyyy-MM-dd"
      // 'Z'
    ) : null
  })), r = F(() => ({
    start: n && n.start ? Q(
      new Date(
        n.start.year,
        n.start.month,
        n.start.date,
        0,
        -1
      ),
      "yyyy-MM-dd'T'HH:mm:ss"
      // 'Z'
    ) : null,
    end: n && n.end ? Q(
      new Date(
        n.end.year,
        n.end.month,
        n.end.date,
        23,
        59,
        59
      ),
      "yyyy-MM-dd'T'HH:mm:ss"
      // 'Z'
    ) : null
  })), i = F(() => {
    const w = new Array(o.value), v = jn(e.value), P = e.value.getMonth(), W = e.value.getFullYear();
    for (let A = 1; A <= v; A++)
      w.push({
        year: W,
        month: P,
        date: A,
        formatted: Q(new Date(W, P, A), "yyyy-MM-dd")
      });
    const E = new Array(6 - d.value);
    return w.concat(E);
  }), o = F(() => qe(Ft(e.value))), d = F(() => qe(_t(e.value))), s = F(() => Q(e.value, "MMMM yyyy", {
    locale: Ge[t.value]
  })), c = F(() => {
    const w = J(/* @__PURE__ */ new Date());
    return [...Array(7).keys()].map(
      (P) => Q(Et(w, P), "EEEEEE", {
        locale: Ge[t.value]
      })
    );
  });
  return {
    selectedDates: n,
    isoSelectedDates: r,
    readableSelectedDates: a,
    daysInMonth: i,
    firstDayOfMonth: o,
    lastDayOfMonth: d,
    shownMonthName: s,
    weekdays: c,
    changeShownMonth: (w = /* @__PURE__ */ new Date()) => {
      e.value = w;
    },
    changeSelectedDate: (w) => {
      if (w && (n.start == null || n.end != null ? (n.start = w, n.end != null && (n.end = null)) : n.end == null && (n.end = w), n && n.end && n.start && n.end.formatted < n.start.formatted)) {
        const v = n.start;
        n.start = n.end, n.end = v;
      }
    },
    clearSelectedDate: () => {
      Object.assign(n, {
        start: null,
        end: null
      });
    },
    showNextMonth: () => {
      e.value = Ae(e.value, 1);
    },
    showPreviousMonth: () => {
      e.value = Ae(e.value, -1);
    }
  };
}
const Zs = ce({
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
    defaultDate: { type: Date, required: !1, default: () => /* @__PURE__ */ new Date() },
    tracking: { type: Object, required: !1, default: null }
  },
  setup(e, { emit: t }) {
    const n = H(e, "dateLocale"), a = N(!1), r = N(null), i = N(null), o = N(null), d = (j) => j.stopPropagation(), s = () => {
      a.value && (a.value = !1);
    };
    $e(() => {
      document.addEventListener("click", s), r.value && r.value.addEventListener("click", d);
    }), gt(() => {
      document.removeEventListener("click", s), r.value && r.value.removeEventListener(
        "click",
        d
      );
    });
    const {
      isoSelectedDates: c,
      readableSelectedDates: l,
      clearSelectedDate: u,
      changeSelectedDate: h,
      weekdays: p,
      shownMonthName: y,
      showNextMonth: w,
      showPreviousMonth: v,
      daysInMonth: P,
      selectedDates: W
    } = Qs(N(e.defaultDate), n), E = () => {
      u(), t("datechanged", c.value), i.value = l.value.start, o.value = l.value.end, s();
    }, A = () => {
      W && !c.value.end && h(W.start), t("datechanged", c.value), i.value = l.value.start, o.value = l.value.end, s();
    }, { pushTracking: q } = me();
    return {
      locale: n,
      isoSelectedDates: c,
      readableSelectedDates: l,
      readableStartDate: i,
      readableEndDate: o,
      clearSelectedDate: u,
      changeSelectedDate: h,
      weekdays: p,
      shownMonthName: y,
      showNextMonth: w,
      showPreviousMonth: v,
      daysInMonth: P,
      selectedDates: W,
      clear: E,
      save: A,
      showDateRange: a,
      closeDatePicker: s,
      dateRangePickerElement: r,
      toggleDatePicker: () => {
        a.value = !a.value, q(e.tracking?.clickDateToggle);
      }
    };
  }
}), Us = {
  class: "date-range-picker__wrapper",
  ref: "dateRangePickerElement"
}, Ks = ["aria-label", "aria-expanded", "aria-controls"], ed = ["id"], td = { class: "months" }, nd = { class: "month" }, ad = { class: "month__name" }, rd = ["aria-label"], id = ["aria-label"], od = { class: "days" }, sd = ["onClick", "aria-hidden", "disabled", "aria-label"], dd = {
  key: 0,
  class: "day__number"
}, ud = { class: "date-range-picker__buttons" }, ld = ["disabled"], cd = { class: "week" };
function md(e, t, n, a, r, i) {
  return C(), T("div", Us, [
    b("button", {
      class: "date-range-picker__toggle",
      onClick: t[0] || (t[0] = (o) => e.toggleDatePicker()),
      "aria-label": e.ariaToggleCalendar,
      "aria-expanded": e.showDateRange + "",
      "aria-controls": e.pickerId
    }, [
      !e.readableStartDate && !e.readableEndDate ? (C(), T(te, { key: 0 }, [
        ge(L(e.labelDatesFilter), 1)
      ], 64)) : I("", !0),
      e.readableStartDate ? (C(), T(te, { key: 1 }, [
        ge(L(e.readableStartDate), 1)
      ], 64)) : I("", !0),
      e.readableEndDate && e.readableStartDate !== e.readableEndDate ? (C(), T(te, { key: 2 }, [
        ge(" - " + L(e.readableEndDate), 1)
      ], 64)) : I("", !0),
      t[5] || (t[5] = b("svg", {
        class: "dropdown-filters__arrow-down",
        width: "14",
        height: "9",
        viewBox: "0 0 14 9",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
      }, [
        b("path", {
          d: "M1 1L7.10049 7.10049L13.201 1",
          stroke: "black",
          "stroke-width": "2"
        })
      ], -1))
    ], 8, Ks),
    Ze(b("div", {
      id: e.pickerId,
      class: "date-range-picker"
    }, [
      b("div", td, [
        b("div", nd, [
          b("div", ad, [
            b("button", {
              class: "month-selector month-selector--previous",
              "aria-label": e.ariaPreviousMonth,
              onClick: t[1] || (t[1] = (...o) => e.showPreviousMonth && e.showPreviousMonth(...o))
            }, t[6] || (t[6] = [
              b("svg", {
                width: "9",
                height: "14",
                viewBox: "0 0 9 14",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg"
              }, [
                b("path", {
                  d: "M8.10049 1L2 7.10049L8.10049 13.201",
                  stroke: "#1B1B1B",
                  "stroke-width": "2"
                })
              ], -1)
            ]), 8, rd),
            b("span", null, L(e.shownMonthName), 1),
            b("button", {
              class: "month-selector month-selector--next",
              "aria-label": e.ariaNextMonth,
              onClick: t[2] || (t[2] = (...o) => e.showNextMonth && e.showNextMonth(...o))
            }, t[7] || (t[7] = [
              b("svg", {
                width: "9",
                height: "14",
                viewBox: "0 0 9 14",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg"
              }, [
                b("path", {
                  d: "M0.899536 13L7.00003 6.89951L0.899537 0.799012",
                  stroke: "#1B1B1B",
                  "stroke-width": "2"
                })
              ], -1)
            ]), 8, id)
          ]),
          b("div", od, [
            (C(!0), T(te, null, ye(e.daysInMonth, (o, d) => (C(), T("button", {
              key: d,
              onClick: (s) => e.changeSelectedDate(o),
              class: pt(["day", [
                o ? `day--${o.date}` : "day--empty",
                o && e.selectedDates && e.selectedDates.start && e.selectedDates.end && o.formatted >= e.selectedDates.start.formatted && o.formatted <= e.selectedDates.end.formatted ? "day--active" : "",
                o && e.selectedDates && e.selectedDates.start && o.formatted == e.selectedDates.start.formatted ? "day--active-first" : "",
                o && e.selectedDates && e.selectedDates.end && o.formatted == e.selectedDates.end.formatted ? "day--active-last" : ""
              ]]),
              "aria-hidden": !o,
              disabled: !o,
              "aria-label": o ? e.ariaSelectDate + o.date + " " + e.shownMonthName : ""
            }, [
              o ? (C(), T("span", dd, L(o.date), 1)) : I("", !0)
            ], 10, sd))), 128))
          ]),
          b("div", ud, [
            b("button", {
              class: "date-range-picker__reset",
              onClick: t[3] || (t[3] = (...o) => e.clear && e.clear(...o))
            }, L(e.labelClearButton), 1),
            b("button", {
              class: "date-range-picker__save",
              onClick: t[4] || (t[4] = (...o) => e.save && e.save(...o)),
              disabled: !e.selectedDates || !e.selectedDates.start && !e.selectedDates.end
            }, L(e.labelSaveButton), 9, ld)
          ])
        ])
      ]),
      b("table", cd, [
        b("tbody", null, [
          b("tr", null, [
            (C(!0), T(te, null, ye(e.weekdays, (o) => (C(), T("td", {
              class: "weekday",
              key: o
            }, L(o), 1))), 128))
          ])
        ])
      ])
    ], 8, ed), [
      [wt, e.showDateRange]
    ])
  ], 512);
}
const hd = /* @__PURE__ */ he(Zs, [["render", md]]);
function fd(e) {
  return e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var gd = function e(t, n) {
  if (t === n) return !0;
  if (t && n && typeof t == "object" && typeof n == "object") {
    if (t.constructor !== n.constructor) return !1;
    var a, r, i;
    if (Array.isArray(t)) {
      if (a = t.length, a != n.length) return !1;
      for (r = a; r-- !== 0; )
        if (!e(t[r], n[r])) return !1;
      return !0;
    }
    if (t.constructor === RegExp) return t.source === n.source && t.flags === n.flags;
    if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === n.valueOf();
    if (t.toString !== Object.prototype.toString) return t.toString() === n.toString();
    if (i = Object.keys(t), a = i.length, a !== Object.keys(n).length) return !1;
    for (r = a; r-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(n, i[r])) return !1;
    for (r = a; r-- !== 0; ) {
      var o = i[r];
      if (!e(t[o], n[o])) return !1;
    }
    return !0;
  }
  return t !== t && n !== n;
};
const Ve = /* @__PURE__ */ fd(gd), Ye = [
  Int8Array,
  Uint8Array,
  Uint8ClampedArray,
  Int16Array,
  Uint16Array,
  Int32Array,
  Uint32Array,
  Float32Array,
  Float64Array
], pe = 1, re = 8;
class Ce {
  /**
   * Creates an index from raw `ArrayBuffer` data.
   * @param {ArrayBuffer} data
   */
  static from(t) {
    if (!(t instanceof ArrayBuffer))
      throw new Error("Data must be an instance of ArrayBuffer.");
    const [n, a] = new Uint8Array(t, 0, 2);
    if (n !== 219)
      throw new Error("Data does not appear to be in a KDBush format.");
    const r = a >> 4;
    if (r !== pe)
      throw new Error(`Got v${r} data when expected v${pe}.`);
    const i = Ye[a & 15];
    if (!i)
      throw new Error("Unrecognized array type.");
    const [o] = new Uint16Array(t, 2, 1), [d] = new Uint32Array(t, 4, 1);
    return new Ce(d, o, i, t);
  }
  /**
   * Creates an index that will hold a given number of items.
   * @param {number} numItems
   * @param {number} [nodeSize=64] Size of the KD-tree node (64 by default).
   * @param {TypedArrayConstructor} [ArrayType=Float64Array] The array type used for coordinates storage (`Float64Array` by default).
   * @param {ArrayBuffer} [data] (For internal use only)
   */
  constructor(t, n = 64, a = Float64Array, r) {
    if (isNaN(t) || t < 0) throw new Error(`Unpexpected numItems value: ${t}.`);
    this.numItems = +t, this.nodeSize = Math.min(Math.max(+n, 2), 65535), this.ArrayType = a, this.IndexArrayType = t < 65536 ? Uint16Array : Uint32Array;
    const i = Ye.indexOf(this.ArrayType), o = t * 2 * this.ArrayType.BYTES_PER_ELEMENT, d = t * this.IndexArrayType.BYTES_PER_ELEMENT, s = (8 - d % 8) % 8;
    if (i < 0)
      throw new Error(`Unexpected typed array class: ${a}.`);
    r && r instanceof ArrayBuffer ? (this.data = r, this.ids = new this.IndexArrayType(this.data, re, t), this.coords = new this.ArrayType(this.data, re + d + s, t * 2), this._pos = t * 2, this._finished = !0) : (this.data = new ArrayBuffer(re + o + d + s), this.ids = new this.IndexArrayType(this.data, re, t), this.coords = new this.ArrayType(this.data, re + d + s, t * 2), this._pos = 0, this._finished = !1, new Uint8Array(this.data, 0, 2).set([219, (pe << 4) + i]), new Uint16Array(this.data, 2, 1)[0] = n, new Uint32Array(this.data, 4, 1)[0] = t);
  }
  /**
   * Add a point to the index.
   * @param {number} x
   * @param {number} y
   * @returns {number} An incremental index associated with the added item (starting from `0`).
   */
  add(t, n) {
    const a = this._pos >> 1;
    return this.ids[a] = a, this.coords[this._pos++] = t, this.coords[this._pos++] = n, a;
  }
  /**
   * Perform indexing of the added points.
   */
  finish() {
    const t = this._pos >> 1;
    if (t !== this.numItems)
      throw new Error(`Added ${t} items when expected ${this.numItems}.`);
    return ke(this.ids, this.coords, this.nodeSize, 0, this.numItems - 1, 0), this._finished = !0, this;
  }
  /**
   * Search the index for items within a given bounding box.
   * @param {number} minX
   * @param {number} minY
   * @param {number} maxX
   * @param {number} maxY
   * @returns {number[]} An array of indices correponding to the found items.
   */
  range(t, n, a, r) {
    if (!this._finished) throw new Error("Data not yet indexed - call index.finish().");
    const { ids: i, coords: o, nodeSize: d } = this, s = [0, i.length - 1, 0], c = [];
    for (; s.length; ) {
      const l = s.pop() || 0, u = s.pop() || 0, h = s.pop() || 0;
      if (u - h <= d) {
        for (let v = h; v <= u; v++) {
          const P = o[2 * v], W = o[2 * v + 1];
          P >= t && P <= a && W >= n && W <= r && c.push(i[v]);
        }
        continue;
      }
      const p = h + u >> 1, y = o[2 * p], w = o[2 * p + 1];
      y >= t && y <= a && w >= n && w <= r && c.push(i[p]), (l === 0 ? t <= y : n <= w) && (s.push(h), s.push(p - 1), s.push(1 - l)), (l === 0 ? a >= y : r >= w) && (s.push(p + 1), s.push(u), s.push(1 - l));
    }
    return c;
  }
  /**
   * Search the index for items within a given radius.
   * @param {number} qx
   * @param {number} qy
   * @param {number} r Query radius.
   * @returns {number[]} An array of indices correponding to the found items.
   */
  within(t, n, a) {
    if (!this._finished) throw new Error("Data not yet indexed - call index.finish().");
    const { ids: r, coords: i, nodeSize: o } = this, d = [0, r.length - 1, 0], s = [], c = a * a;
    for (; d.length; ) {
      const l = d.pop() || 0, u = d.pop() || 0, h = d.pop() || 0;
      if (u - h <= o) {
        for (let v = h; v <= u; v++)
          Xe(i[2 * v], i[2 * v + 1], t, n) <= c && s.push(r[v]);
        continue;
      }
      const p = h + u >> 1, y = i[2 * p], w = i[2 * p + 1];
      Xe(y, w, t, n) <= c && s.push(r[p]), (l === 0 ? t - a <= y : n - a <= w) && (d.push(h), d.push(p - 1), d.push(1 - l)), (l === 0 ? t + a >= y : n + a >= w) && (d.push(p + 1), d.push(u), d.push(1 - l));
    }
    return s;
  }
}
function ke(e, t, n, a, r, i) {
  if (r - a <= n) return;
  const o = a + r >> 1;
  lt(e, t, o, a, r, i), ke(e, t, n, a, o - 1, 1 - i), ke(e, t, n, o + 1, r, 1 - i);
}
function lt(e, t, n, a, r, i) {
  for (; r > a; ) {
    if (r - a > 600) {
      const c = r - a + 1, l = n - a + 1, u = Math.log(c), h = 0.5 * Math.exp(2 * u / 3), p = 0.5 * Math.sqrt(u * h * (c - h) / c) * (l - c / 2 < 0 ? -1 : 1), y = Math.max(a, Math.floor(n - l * h / c + p)), w = Math.min(r, Math.floor(n + (c - l) * h / c + p));
      lt(e, t, n, y, w, i);
    }
    const o = t[2 * n + i];
    let d = a, s = r;
    for (ie(e, t, a, n), t[2 * r + i] > o && ie(e, t, a, r); d < s; ) {
      for (ie(e, t, d, s), d++, s--; t[2 * d + i] < o; ) d++;
      for (; t[2 * s + i] > o; ) s--;
    }
    t[2 * a + i] === o ? ie(e, t, a, s) : (s++, ie(e, t, s, r)), s <= n && (a = s + 1), n <= s && (r = s - 1);
  }
}
function ie(e, t, n, a) {
  we(e, n, a), we(t, 2 * n, 2 * a), we(t, 2 * n + 1, 2 * a + 1);
}
function we(e, t, n) {
  const a = e[t];
  e[t] = e[n], e[n] = a;
}
function Xe(e, t, n, a) {
  const r = e - n, i = t - a;
  return r * r + i * i;
}
const pd = {
  minZoom: 0,
  // min zoom to generate clusters on
  maxZoom: 16,
  // max zoom level to cluster the points on
  minPoints: 2,
  // minimum points to form a cluster
  radius: 40,
  // cluster radius in pixels
  extent: 512,
  // tile extent (radius is calculated relative to it)
  nodeSize: 64,
  // size of the KD-tree leaf node, affects performance
  log: !1,
  // whether to log timing info
  // whether to generate numeric ids for input features (in vector tiles)
  generateId: !1,
  // a reduce function for calculating custom cluster properties
  reduce: null,
  // (accumulated, props) => { accumulated.sum += props.sum; }
  // properties to use for individual points when running the reducer
  map: (e) => e
  // props => ({sum: props.my_value})
}, Re = Math.fround || /* @__PURE__ */ ((e) => (t) => (e[0] = +t, e[0]))(new Float32Array(1)), Z = 2, R = 3, ve = 4, X = 5, ct = 6;
class wd {
  constructor(t) {
    this.options = Object.assign(Object.create(pd), t), this.trees = new Array(this.options.maxZoom + 1), this.stride = this.options.reduce ? 7 : 6, this.clusterProps = [];
  }
  load(t) {
    const { log: n, minZoom: a, maxZoom: r } = this.options;
    n && console.time("total time");
    const i = `prepare ${t.length} points`;
    n && console.time(i), this.points = t;
    const o = [];
    for (let s = 0; s < t.length; s++) {
      const c = t[s];
      if (!c.geometry) continue;
      const [l, u] = c.geometry.coordinates, h = Re(se(l)), p = Re(de(u));
      o.push(
        h,
        p,
        // projected point coordinates
        1 / 0,
        // the last zoom the point was processed at
        s,
        // index of the source feature in the original input array
        -1,
        // parent cluster id
        1
        // number of points in a cluster
      ), this.options.reduce && o.push(0);
    }
    let d = this.trees[r + 1] = this._createTree(o);
    n && console.timeEnd(i);
    for (let s = r; s >= a; s--) {
      const c = +Date.now();
      d = this.trees[s] = this._createTree(this._cluster(d, s)), n && console.log("z%d: %d clusters in %dms", s, d.numItems, +Date.now() - c);
    }
    return n && console.timeEnd("total time"), this;
  }
  getClusters(t, n) {
    let a = ((t[0] + 180) % 360 + 360) % 360 - 180;
    const r = Math.max(-90, Math.min(90, t[1]));
    let i = t[2] === 180 ? 180 : ((t[2] + 180) % 360 + 360) % 360 - 180;
    const o = Math.max(-90, Math.min(90, t[3]));
    if (t[2] - t[0] >= 360)
      a = -180, i = 180;
    else if (a > i) {
      const u = this.getClusters([a, r, 180, o], n), h = this.getClusters([-180, r, i, o], n);
      return u.concat(h);
    }
    const d = this.trees[this._limitZoom(n)], s = d.range(se(a), de(o), se(i), de(r)), c = d.data, l = [];
    for (const u of s) {
      const h = this.stride * u;
      l.push(c[h + X] > 1 ? Je(c, h, this.clusterProps) : this.points[c[h + R]]);
    }
    return l;
  }
  getChildren(t) {
    const n = this._getOriginId(t), a = this._getOriginZoom(t), r = "No cluster with the specified id.", i = this.trees[a];
    if (!i) throw new Error(r);
    const o = i.data;
    if (n * this.stride >= o.length) throw new Error(r);
    const d = this.options.radius / (this.options.extent * Math.pow(2, a - 1)), s = o[n * this.stride], c = o[n * this.stride + 1], l = i.within(s, c, d), u = [];
    for (const h of l) {
      const p = h * this.stride;
      o[p + ve] === t && u.push(o[p + X] > 1 ? Je(o, p, this.clusterProps) : this.points[o[p + R]]);
    }
    if (u.length === 0) throw new Error(r);
    return u;
  }
  getLeaves(t, n, a) {
    n = n || 10, a = a || 0;
    const r = [];
    return this._appendLeaves(r, t, n, a, 0), r;
  }
  getTile(t, n, a) {
    const r = this.trees[this._limitZoom(t)], i = Math.pow(2, t), { extent: o, radius: d } = this.options, s = d / o, c = (a - s) / i, l = (a + 1 + s) / i, u = {
      features: []
    };
    return this._addTileFeatures(
      r.range((n - s) / i, c, (n + 1 + s) / i, l),
      r.data,
      n,
      a,
      i,
      u
    ), n === 0 && this._addTileFeatures(
      r.range(1 - s / i, c, 1, l),
      r.data,
      i,
      a,
      i,
      u
    ), n === i - 1 && this._addTileFeatures(
      r.range(0, c, s / i, l),
      r.data,
      -1,
      a,
      i,
      u
    ), u.features.length ? u : null;
  }
  getClusterExpansionZoom(t) {
    let n = this._getOriginZoom(t) - 1;
    for (; n <= this.options.maxZoom; ) {
      const a = this.getChildren(t);
      if (n++, a.length !== 1) break;
      t = a[0].properties.cluster_id;
    }
    return n;
  }
  _appendLeaves(t, n, a, r, i) {
    const o = this.getChildren(n);
    for (const d of o) {
      const s = d.properties;
      if (s && s.cluster ? i + s.point_count <= r ? i += s.point_count : i = this._appendLeaves(t, s.cluster_id, a, r, i) : i < r ? i++ : t.push(d), t.length === a) break;
    }
    return i;
  }
  _createTree(t) {
    const n = new Ce(t.length / this.stride | 0, this.options.nodeSize, Float32Array);
    for (let a = 0; a < t.length; a += this.stride) n.add(t[a], t[a + 1]);
    return n.finish(), n.data = t, n;
  }
  _addTileFeatures(t, n, a, r, i, o) {
    for (const d of t) {
      const s = d * this.stride, c = n[s + X] > 1;
      let l, u, h;
      if (c)
        l = mt(n, s, this.clusterProps), u = n[s], h = n[s + 1];
      else {
        const w = this.points[n[s + R]];
        l = w.properties;
        const [v, P] = w.geometry.coordinates;
        u = se(v), h = de(P);
      }
      const p = {
        type: 1,
        geometry: [[
          Math.round(this.options.extent * (u * i - a)),
          Math.round(this.options.extent * (h * i - r))
        ]],
        tags: l
      };
      let y;
      c || this.options.generateId ? y = n[s + R] : y = this.points[n[s + R]].id, y !== void 0 && (p.id = y), o.features.push(p);
    }
  }
  _limitZoom(t) {
    return Math.max(this.options.minZoom, Math.min(Math.floor(+t), this.options.maxZoom + 1));
  }
  _cluster(t, n) {
    const { radius: a, extent: r, reduce: i, minPoints: o } = this.options, d = a / (r * Math.pow(2, n)), s = t.data, c = [], l = this.stride;
    for (let u = 0; u < s.length; u += l) {
      if (s[u + Z] <= n) continue;
      s[u + Z] = n;
      const h = s[u], p = s[u + 1], y = t.within(s[u], s[u + 1], d), w = s[u + X];
      let v = w;
      for (const P of y) {
        const W = P * l;
        s[W + Z] > n && (v += s[W + X]);
      }
      if (v > w && v >= o) {
        let P = h * w, W = p * w, E, A = -1;
        const q = ((u / l | 0) << 5) + (n + 1) + this.points.length;
        for (const G of y) {
          const j = G * l;
          if (s[j + Z] <= n) continue;
          s[j + Z] = n;
          const m = s[j + X];
          P += s[j] * m, W += s[j + 1] * m, s[j + ve] = q, i && (E || (E = this._map(s, u, !0), A = this.clusterProps.length, this.clusterProps.push(E)), i(E, this._map(s, j)));
        }
        s[u + ve] = q, c.push(P / v, W / v, 1 / 0, q, -1, v), i && c.push(A);
      } else {
        for (let P = 0; P < l; P++) c.push(s[u + P]);
        if (v > 1)
          for (const P of y) {
            const W = P * l;
            if (!(s[W + Z] <= n)) {
              s[W + Z] = n;
              for (let E = 0; E < l; E++) c.push(s[W + E]);
            }
          }
      }
    }
    return c;
  }
  // get index of the point from which the cluster originated
  _getOriginId(t) {
    return t - this.points.length >> 5;
  }
  // get zoom of the point from which the cluster originated
  _getOriginZoom(t) {
    return (t - this.points.length) % 32;
  }
  _map(t, n, a) {
    if (t[n + X] > 1) {
      const o = this.clusterProps[t[n + ct]];
      return a ? Object.assign({}, o) : o;
    }
    const r = this.points[t[n + R]].properties, i = this.options.map(r);
    return a && i === r ? Object.assign({}, i) : i;
  }
}
function Je(e, t, n) {
  return {
    type: "Feature",
    id: e[t + R],
    properties: mt(e, t, n),
    geometry: {
      type: "Point",
      coordinates: [vd(e[t]), yd(e[t + 1])]
    }
  };
}
function mt(e, t, n) {
  const a = e[t + X], r = a >= 1e4 ? `${Math.round(a / 1e3)}k` : a >= 1e3 ? `${Math.round(a / 100) / 10}k` : a, i = e[t + ct], o = i === -1 ? {} : Object.assign({}, n[i]);
  return Object.assign(o, {
    cluster: !0,
    cluster_id: e[t + R],
    point_count: a,
    point_count_abbreviated: r
  });
}
function se(e) {
  return e / 360 + 0.5;
}
function de(e) {
  const t = Math.sin(e * Math.PI / 180), n = 0.5 - 0.25 * Math.log((1 + t) / (1 - t)) / Math.PI;
  return n < 0 ? 0 : n > 1 ? 1 : n;
}
function vd(e) {
  return (e - 0.5) * 360;
}
function yd(e) {
  const t = (180 - e * 360) * Math.PI / 180;
  return 360 * Math.atan(Math.exp(t)) / Math.PI - 90;
}
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
function bd(e, t) {
  var n = {};
  for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && t.indexOf(a) < 0 && (n[a] = e[a]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var r = 0, a = Object.getOwnPropertySymbols(e); r < a.length; r++)
      t.indexOf(a[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, a[r]) && (n[a[r]] = e[a[r]]);
  return n;
}
class _ {
  static isAdvancedMarkerAvailable(t) {
    return google.maps.marker && t.getMapCapabilities().isAdvancedMarkersAvailable === !0;
  }
  static isAdvancedMarker(t) {
    return google.maps.marker && t instanceof google.maps.marker.AdvancedMarkerElement;
  }
  static setMap(t, n) {
    this.isAdvancedMarker(t) ? t.map = n : t.setMap(n);
  }
  static getPosition(t) {
    if (this.isAdvancedMarker(t)) {
      if (t.position) {
        if (t.position instanceof google.maps.LatLng)
          return t.position;
        if (t.position.lat && t.position.lng)
          return new google.maps.LatLng(t.position.lat, t.position.lng);
      }
      return new google.maps.LatLng(null);
    }
    return t.getPosition();
  }
  static getVisible(t) {
    return this.isAdvancedMarker(t) ? !0 : t.getVisible();
  }
}
class De {
  constructor({ markers: t, position: n }) {
    this.markers = t, n && (n instanceof google.maps.LatLng ? this._position = n : this._position = new google.maps.LatLng(n));
  }
  get bounds() {
    if (this.markers.length === 0 && !this._position)
      return;
    const t = new google.maps.LatLngBounds(this._position, this._position);
    for (const n of this.markers)
      t.extend(_.getPosition(n));
    return t;
  }
  get position() {
    return this._position || this.bounds.getCenter();
  }
  /**
   * Get the count of **visible** markers.
   */
  get count() {
    return this.markers.filter((t) => _.getVisible(t)).length;
  }
  /**
   * Add a marker to the cluster.
   */
  push(t) {
    this.markers.push(t);
  }
  /**
   * Cleanup references and remove marker from map.
   */
  delete() {
    this.marker && (_.setMap(this.marker, null), this.marker = void 0), this.markers.length = 0;
  }
}
class Md {
  constructor({ maxZoom: t = 16 }) {
    this.maxZoom = t;
  }
  /**
   * Helper function to bypass clustering based upon some map state such as
   * zoom, number of markers, etc.
   *
   * ```typescript
   *  cluster({markers, map}: AlgorithmInput): Cluster[] {
   *    if (shouldBypassClustering(map)) {
   *      return this.noop({markers})
   *    }
   * }
   * ```
   */
  noop({ markers: t }) {
    return Pd(t);
  }
}
const Pd = (e) => e.map((n) => new De({
  position: _.getPosition(n),
  markers: [n]
}));
class kd extends Md {
  constructor(t) {
    var { maxZoom: n, radius: a = 60 } = t, r = bd(t, ["maxZoom", "radius"]);
    super({ maxZoom: n }), this.state = { zoom: -1 }, this.superCluster = new wd(Object.assign({ maxZoom: this.maxZoom, radius: a }, r));
  }
  calculate(t) {
    let n = !1;
    const a = { zoom: t.map.getZoom() };
    if (!Ve(t.markers, this.markers)) {
      n = !0, this.markers = [...t.markers];
      const r = this.markers.map((i) => {
        const o = _.getPosition(i);
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [o.lng(), o.lat()]
          },
          properties: { marker: i }
        };
      });
      this.superCluster.load(r);
    }
    return n || (this.state.zoom <= this.maxZoom || a.zoom <= this.maxZoom) && (n = !Ve(this.state, a)), this.state = a, n && (this.clusters = this.cluster(t)), { clusters: this.clusters, changed: n };
  }
  cluster({ map: t }) {
    return this.superCluster.getClusters([-180, -90, 180, 90], Math.round(t.getZoom())).map((n) => this.transformCluster(n));
  }
  transformCluster({ geometry: { coordinates: [t, n] }, properties: a }) {
    if (a.cluster)
      return new De({
        markers: this.superCluster.getLeaves(a.cluster_id, 1 / 0).map((i) => i.properties.marker),
        position: { lat: n, lng: t }
      });
    const r = a.marker;
    return new De({
      markers: [r],
      position: _.getPosition(r)
    });
  }
}
class Dd {
  constructor(t, n) {
    this.markers = { sum: t.length };
    const a = n.map((i) => i.count), r = a.reduce((i, o) => i + o, 0);
    this.clusters = {
      count: n.length,
      markers: {
        mean: r / n.length,
        sum: r,
        min: Math.min(...a),
        max: Math.max(...a)
      }
    };
  }
}
class $d {
  /**
   * The default render function for the library used by {@link MarkerClusterer}.
   *
   * Currently set to use the following:
   *
   * ```typescript
   * // change color if this cluster has more markers than the mean cluster
   * const color =
   *   count > Math.max(10, stats.clusters.markers.mean)
   *     ? "#ff0000"
   *     : "#0000ff";
   *
   * // create svg url with fill color
   * const svg = window.btoa(`
   * <svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
   *   <circle cx="120" cy="120" opacity=".6" r="70" />
   *   <circle cx="120" cy="120" opacity=".3" r="90" />
   *   <circle cx="120" cy="120" opacity=".2" r="110" />
   *   <circle cx="120" cy="120" opacity=".1" r="130" />
   * </svg>`);
   *
   * // create marker using svg icon
   * return new google.maps.Marker({
   *   position,
   *   icon: {
   *     url: `data:image/svg+xml;base64,${svg}`,
   *     scaledSize: new google.maps.Size(45, 45),
   *   },
   *   label: {
   *     text: String(count),
   *     color: "rgba(255,255,255,0.9)",
   *     fontSize: "12px",
   *   },
   *   // adjust zIndex to be above other markers
   *   zIndex: 1000 + count,
   * });
   * ```
   */
  render({ count: t, position: n }, a, r) {
    const o = `<svg fill="${t > Math.max(10, a.clusters.markers.mean) ? "#ff0000" : "#0000ff"}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="50" height="50">
<circle cx="120" cy="120" opacity=".6" r="70" />
<circle cx="120" cy="120" opacity=".3" r="90" />
<circle cx="120" cy="120" opacity=".2" r="110" />
<text x="50%" y="50%" style="fill:#fff" text-anchor="middle" font-size="50" dominant-baseline="middle" font-family="roboto,arial,sans-serif">${t}</text>
</svg>`, d = `Cluster of ${t} markers`, s = Number(google.maps.Marker.MAX_ZINDEX) + t;
    if (_.isAdvancedMarkerAvailable(r)) {
      const u = new DOMParser().parseFromString(o, "image/svg+xml").documentElement;
      u.setAttribute("transform", "translate(0 25)");
      const h = {
        map: r,
        position: n,
        zIndex: s,
        title: d,
        content: u
      };
      return new google.maps.marker.AdvancedMarkerElement(h);
    }
    const c = {
      position: n,
      zIndex: s,
      title: d,
      icon: {
        url: `data:image/svg+xml;base64,${btoa(o)}`,
        anchor: new google.maps.Point(25, 25)
      }
    };
    return new google.maps.Marker(c);
  }
}
function Sd(e, t) {
  for (let n in t.prototype)
    e.prototype[n] = t.prototype[n];
}
class Oe {
  constructor() {
    Sd(Oe, google.maps.OverlayView);
  }
}
var oe;
(function(e) {
  e.CLUSTERING_BEGIN = "clusteringbegin", e.CLUSTERING_END = "clusteringend", e.CLUSTER_CLICK = "click";
})(oe || (oe = {}));
const Wd = (e, t, n) => {
  n.fitBounds(t.bounds);
};
class Cd extends Oe {
  constructor({ map: t, markers: n = [], algorithmOptions: a = {}, algorithm: r = new kd(a), renderer: i = new $d(), onClusterClick: o = Wd }) {
    super(), this.markers = [...n], this.clusters = [], this.algorithm = r, this.renderer = i, this.onClusterClick = o, t && this.setMap(t);
  }
  addMarker(t, n) {
    this.markers.includes(t) || (this.markers.push(t), n || this.render());
  }
  addMarkers(t, n) {
    t.forEach((a) => {
      this.addMarker(a, !0);
    }), n || this.render();
  }
  removeMarker(t, n) {
    const a = this.markers.indexOf(t);
    return a === -1 ? !1 : (_.setMap(t, null), this.markers.splice(a, 1), n || this.render(), !0);
  }
  removeMarkers(t, n) {
    let a = !1;
    return t.forEach((r) => {
      a = this.removeMarker(r, !0) || a;
    }), a && !n && this.render(), a;
  }
  clearMarkers(t) {
    this.markers.length = 0, t || this.render();
  }
  /**
   * Recalculates and draws all the marker clusters.
   */
  render() {
    const t = this.getMap();
    if (t instanceof google.maps.Map && t.getProjection()) {
      google.maps.event.trigger(this, oe.CLUSTERING_BEGIN, this);
      const { clusters: n, changed: a } = this.algorithm.calculate({
        markers: this.markers,
        map: t,
        mapCanvasProjection: this.getProjection()
      });
      if (a || a == null) {
        const r = /* @__PURE__ */ new Set();
        for (const o of n)
          o.markers.length == 1 && r.add(o.markers[0]);
        const i = [];
        for (const o of this.clusters)
          o.marker != null && (o.markers.length == 1 ? r.has(o.marker) || _.setMap(o.marker, null) : i.push(o.marker));
        this.clusters = n, this.renderClusters(), requestAnimationFrame(() => i.forEach((o) => _.setMap(o, null)));
      }
      google.maps.event.trigger(this, oe.CLUSTERING_END, this);
    }
  }
  onAdd() {
    this.idleListener = this.getMap().addListener("idle", this.render.bind(this)), this.render();
  }
  onRemove() {
    google.maps.event.removeListener(this.idleListener), this.reset();
  }
  reset() {
    this.markers.forEach((t) => _.setMap(t, null)), this.clusters.forEach((t) => t.delete()), this.clusters = [];
  }
  renderClusters() {
    const t = new Dd(this.markers, this.clusters), n = this.getMap();
    this.clusters.forEach((a) => {
      a.markers.length === 1 ? a.marker = a.markers[0] : (a.marker = this.renderer.render(a, t, n), a.markers.forEach((r) => _.setMap(r, null)), this.onClusterClick && a.marker.addListener(
        "click",
        /* istanbul ignore next */
        (r) => {
          google.maps.event.trigger(this, oe.CLUSTER_CLICK, a), this.onClusterClick(r, a, n);
        }
      )), _.setMap(a.marker, n);
    });
  }
}
function Od(e, t, n, a) {
  function r(i) {
    return i instanceof n ? i : new n(function(o) {
      o(i);
    });
  }
  return new (n || (n = Promise))(function(i, o) {
    function d(l) {
      try {
        c(a.next(l));
      } catch (u) {
        o(u);
      }
    }
    function s(l) {
      try {
        c(a.throw(l));
      } catch (u) {
        o(u);
      }
    }
    function c(l) {
      l.done ? i(l.value) : r(l.value).then(d, s);
    }
    c((a = a.apply(e, [])).next());
  });
}
function Ed(e) {
  return e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Td = function e(t, n) {
  if (t === n) return !0;
  if (t && n && typeof t == "object" && typeof n == "object") {
    if (t.constructor !== n.constructor) return !1;
    var a, r, i;
    if (Array.isArray(t)) {
      if (a = t.length, a != n.length) return !1;
      for (r = a; r-- !== 0; )
        if (!e(t[r], n[r])) return !1;
      return !0;
    }
    if (t.constructor === RegExp) return t.source === n.source && t.flags === n.flags;
    if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === n.valueOf();
    if (t.toString !== Object.prototype.toString) return t.toString() === n.toString();
    if (i = Object.keys(t), a = i.length, a !== Object.keys(n).length) return !1;
    for (r = a; r-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(n, i[r])) return !1;
    for (r = a; r-- !== 0; ) {
      var o = i[r];
      if (!e(t[o], n[o])) return !1;
    }
    return !0;
  }
  return t !== t && n !== n;
}, Nd = /* @__PURE__ */ Ed(Td);
const Qe = "__googleMapsScriptId";
var ne;
(function(e) {
  e[e.INITIALIZED = 0] = "INITIALIZED", e[e.LOADING = 1] = "LOADING", e[e.SUCCESS = 2] = "SUCCESS", e[e.FAILURE = 3] = "FAILURE";
})(ne || (ne = {}));
class K {
  /**
   * Creates an instance of Loader using [[LoaderOptions]]. No defaults are set
   * using this library, instead the defaults are set by the Google Maps
   * JavaScript API server.
   *
   * ```
   * const loader = Loader({apiKey, version: 'weekly', libraries: ['places']});
   * ```
   */
  constructor({ apiKey: t, authReferrerPolicy: n, channel: a, client: r, id: i = Qe, language: o, libraries: d = [], mapIds: s, nonce: c, region: l, retries: u = 3, url: h = "https://maps.googleapis.com/maps/api/js", version: p }) {
    if (this.callbacks = [], this.done = !1, this.loading = !1, this.errors = [], this.apiKey = t, this.authReferrerPolicy = n, this.channel = a, this.client = r, this.id = i || Qe, this.language = o, this.libraries = d, this.mapIds = s, this.nonce = c, this.region = l, this.retries = u, this.url = h, this.version = p, K.instance) {
      if (!Nd(this.options, K.instance.options))
        throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(K.instance.options)}`);
      return K.instance;
    }
    K.instance = this;
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
      url: this.url,
      authReferrerPolicy: this.authReferrerPolicy
    };
  }
  get status() {
    return this.errors.length ? ne.FAILURE : this.done ? ne.SUCCESS : this.loading ? ne.LOADING : ne.INITIALIZED;
  }
  get failed() {
    return this.done && !this.loading && this.errors.length >= this.retries + 1;
  }
  /**
   * CreateUrl returns the Google Maps JavaScript API script url given the [[LoaderOptions]].
   *
   * @ignore
   * @deprecated
   */
  createUrl() {
    let t = this.url;
    return t += "?callback=__googleMapsCallback&loading=async", this.apiKey && (t += `&key=${this.apiKey}`), this.channel && (t += `&channel=${this.channel}`), this.client && (t += `&client=${this.client}`), this.libraries.length > 0 && (t += `&libraries=${this.libraries.join(",")}`), this.language && (t += `&language=${this.language}`), this.region && (t += `&region=${this.region}`), this.version && (t += `&v=${this.version}`), this.mapIds && (t += `&map_ids=${this.mapIds.join(",")}`), this.authReferrerPolicy && (t += `&auth_referrer_policy=${this.authReferrerPolicy}`), t;
  }
  deleteScript() {
    const t = document.getElementById(this.id);
    t && t.remove();
  }
  /**
   * Load the Google Maps JavaScript API script and return a Promise.
   * @deprecated, use importLibrary() instead.
   */
  load() {
    return this.loadPromise();
  }
  /**
   * Load the Google Maps JavaScript API script and return a Promise.
   *
   * @ignore
   * @deprecated, use importLibrary() instead.
   */
  loadPromise() {
    return new Promise((t, n) => {
      this.loadCallback((a) => {
        a ? n(a.error) : t(window.google);
      });
    });
  }
  importLibrary(t) {
    return this.execute(), google.maps.importLibrary(t);
  }
  /**
   * Load the Google Maps JavaScript API script with a callback.
   * @deprecated, use importLibrary() instead.
   */
  loadCallback(t) {
    this.callbacks.push(t), this.execute();
  }
  /**
   * Set the script on document.
   */
  setScript() {
    var t, n;
    if (document.getElementById(this.id)) {
      this.callback();
      return;
    }
    const a = {
      key: this.apiKey,
      channel: this.channel,
      client: this.client,
      libraries: this.libraries.length && this.libraries,
      v: this.version,
      mapIds: this.mapIds,
      language: this.language,
      region: this.region,
      authReferrerPolicy: this.authReferrerPolicy
    };
    Object.keys(a).forEach(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (i) => !a[i] && delete a[i]
    ), !((n = (t = window?.google) === null || t === void 0 ? void 0 : t.maps) === null || n === void 0) && n.importLibrary || ((i) => {
      let o, d, s, c = "The Google Maps JavaScript API", l = "google", u = "importLibrary", h = "__ib__", p = document, y = window;
      y = y[l] || (y[l] = {});
      const w = y.maps || (y.maps = {}), v = /* @__PURE__ */ new Set(), P = new URLSearchParams(), W = () => (
        // @ts-ignore
        o || (o = new Promise((E, A) => Od(this, void 0, void 0, function* () {
          var q;
          yield d = p.createElement("script"), d.id = this.id, P.set("libraries", [...v] + "");
          for (s in i)
            P.set(s.replace(/[A-Z]/g, (G) => "_" + G[0].toLowerCase()), i[s]);
          P.set("callback", l + ".maps." + h), d.src = this.url + "?" + P, w[h] = E, d.onerror = () => o = A(Error(c + " could not load.")), d.nonce = this.nonce || ((q = p.querySelector("script[nonce]")) === null || q === void 0 ? void 0 : q.nonce) || "", p.head.append(d);
        })))
      );
      w[u] ? console.warn(c + " only loads once. Ignoring:", i) : w[u] = (E, ...A) => v.add(E) && W().then(() => w[u](E, ...A));
    })(a);
    const r = this.libraries.map((i) => this.importLibrary(i));
    r.length || r.push(this.importLibrary("core")), Promise.all(r).then(() => this.callback(), (i) => {
      const o = new ErrorEvent("error", { error: i });
      this.loadErrorCallback(o);
    });
  }
  /**
   * Reset the loader state.
   */
  reset() {
    this.deleteScript(), this.done = !1, this.loading = !1, this.errors = [], this.onerrorEvent = null;
  }
  resetIfRetryingFailed() {
    this.failed && this.reset();
  }
  loadErrorCallback(t) {
    if (this.errors.push(t), this.errors.length <= this.retries) {
      const n = this.errors.length * Math.pow(2, this.errors.length);
      console.error(`Failed to load Google Maps script, retrying in ${n} ms.`), setTimeout(() => {
        this.deleteScript(), this.setScript();
      }, n);
    } else
      this.onerrorEvent = t, this.callback();
  }
  callback() {
    this.done = !0, this.loading = !1, this.callbacks.forEach((t) => {
      t(this.onerrorEvent);
    }), this.callbacks = [];
  }
  execute() {
    if (this.resetIfRetryingFailed(), !this.loading)
      if (this.done)
        this.callback();
      else {
        if (window.google && window.google.maps && window.google.maps.version) {
          console.warn("Google Maps already loaded outside @googlemaps/js-api-loader. This may result in undesirable behavior as options and script parameters may not match."), this.callback();
          return;
        }
        this.loading = !0, this.setScript();
      }
  }
}
const Ad = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAA1CAYAAADh5qNwAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMXSURBVHgB7ZnPbxJBFMcfajRBRTQYTdWKBw1JL403kh7w0niDgz+O/qLXCukfUHrzUtt4LUq96qF4q73YJo29UQ+ijcZASjWaElsw4u/gm2WHDhsg+2ZnGw7zSV52ZoHd+c6bX+8BoNFoNBqNRqNpgwdcoF6vB/ESRYugDaIFhY+Lpi2iLXk8nkXoZVBMBO1FnUYB7Qb0GswzEmLaiQuCAhwPP2xIDC8ZND+/V639hdfrNXi6XIaXa9+MerX2z/hsoN8LpwMH4PJFP9pR8Hn3WR85gUMyBQ5wJAoF3YSGoCYzC5/hfvZjU0Q3fN69EB8+CSPDJ6ziHAmTFmV6aI7XS+VfcOfBO8iv/wAqZwL74eHoBcOLAtLCpESZY38VzCGXx6F2GwVtlH+DE6bj5+Dq0HHx1iWZ1XEPyDEFpiDmIRWCGIl0AVZwDgpksAP9QIQsypxHMV6/cu+tEkGcZPqDsbCYBNHuAhEZTzX3lCfLm0oFMUr4vMnsJ/FWguotkihzLkV4fRJXOTdI4woqeIsJGqT8nuqpKC/M57aUe0lkZuGLWCWdOKiiIrzARLmJZcGIAAGqqCAvvMFl3E1W1qot76XMK6qo5tjOuyyKsYHbhcARsInsPtXTaFHQCO4M2EnbbSzvqIBNqKJe8UI4dBjcZKD/oFgt4hlwG2wiLcpyolZOOHSo7XvtQBW1xAvXhwJGPOQWIxhnCWSBAEmUGQYwM4K6OAZ3bnANO0yYT2zYPSP8XGr1e8wLrDdVLxiss8Zip8RbWcp8YpBF4QtmwRzjrAGPRs+DSsZifWJHFdEmgIjsPpXkBbZgTGHEqgLmoXjrXEphJxaBiJMcRQIaEbBBI6R/bz3a2KIx5PqsgqZRUBIkcJpNGsdLitdZaM9iLJYas0s45DNyE5a5OYuCboEkKvJ+LcIYTNx8bhue575aQwiDnbzfsXabuLSHlFJvpJsLnVKvpc2fTat8/9Ppa1to5HyE67BGdRPXRcy4TNZoV8EGRtEyaKsdhBTQ5sxOUC7Glb9yrGDDzwrVCnUz1Wg0Go1Go9l9/gNvkCMbp4Ut3AAAAABJRU5ErkJggg==";
function xd(e = {
  apiKey: null,
  mapId: null,
  markersData: N([]),
  center: N(null),
  defaultPinImg: null,
  defaultLocationImg: null,
  clusterOptions: null,
  markerSize: 50,
  hasCluster: !0,
  fitMarkers: !1,
  tracking: null,
  zoom: 15,
  mapOptions: null,
  dateLocale: N("en"),
  labelBuyButton: N("Buy Tickets"),
  labelDirectionButton: N("View on Google Maps"),
  ariaLocateButton: "Your Location"
}) {
  const { pushTracking: t } = me();
  let n = null, a = null, r = [], i = null, o = null;
  const d = new K({
    apiKey: e.apiKey,
    version: "weekly"
  }), s = () => new Promise(async (m) => {
    if (!e.mapOptions) throw new Error("[useGoogleMap.js] no map options");
    await d.importLibrary("core"), await d.importLibrary("marker"), n = new google.maps.Map(
      document.getElementById(e.mapId),
      e.mapOptions
    ), a = new google.maps.InfoWindow(), google.maps.event.addListenerOnce(n, "idle", () => {
      m(!0);
    });
  }), c = () => {
    r.forEach((m) => m.setMap(null)), r = [];
  }, l = () => {
    c();
    const m = [...e.markersData.value];
    if (!m) return;
    const S = [];
    m.forEach((D) => {
      if (!D || typeof D.visible < "u" && !D.visible)
        return;
      let $ = { ...D }, V = null;
      if ($.pinImg ? V = {
        url: $.pinImg,
        scaledSize: new google.maps.Size(e.markerSize, e.markerSize),
        labelOrigin: new google.maps.Point(
          e.markerSize / 2,
          e.markerSize + 4
        )
      } : $.category && $.category.pinImg ? V = {
        url: $.category.pinImg,
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
      }), $.showName && $.latitude && $.longitude && parseFloat($.latitude) != NaN && parseFloat($.longitude) != NaN && parseFloat($.latitude) >= -90 && parseFloat($.latitude) <= 90 && parseFloat($.longitude) >= -180 && parseFloat($.longitude) <= 180) {
        const ht = new google.maps.LatLng(
          parseFloat($.latitude),
          parseFloat($.longitude)
        ), Ee = new google.maps.marker.AdvancedMarkerElement({
          position: ht,
          content: j(V.url),
          title: `${$.showName}`,
          map: n
        });
        Ee.info = $, S.push(Ee);
      }
    }), o = new google.maps.LatLngBounds(), S.forEach((D) => {
      o.extend(D.position), D.addListener("click", ($) => {
        W(D), D && D.info && D.info.showName && t(e.tracking?.clickMarker, {
          "<show_name>": D.info.showName,
          "<city_name>": D.info.city
        });
      });
    }), r = S;
  }, u = () => {
    i && i.clearMarkers(), i = null;
  }, h = () => {
    u();
    const m = {
      render: ({ count: S, position: D }) => new google.maps.marker.AdvancedMarkerElement({
        content: j(
          e.clusterOptions && e.clusterOptions[0] ? e.clusterOptions[0].url : "https://raw.githubusercontent.com/googlemaps/js-marker-clusterer/gh-pages/images/m1.png",
          S
        ),
        position: D
      })
    };
    i = new Cd({
      map: n,
      markers: r,
      renderer: m
    });
  }, p = () => {
    if (!(!n || !o)) {
      n.fitBounds(o);
      var m = P();
      m > 12 && n.setZoom(12);
    }
  }, y = (m) => {
    !n || !m || n.panTo(m.position);
  }, w = (m, S) => {
    !n || !m || !S || n.panTo({ lat: m, lng: S });
  }, v = (m) => {
    !n || !m || n.setZoom(parseFloat(m));
  }, P = () => {
    if (n)
      return n.getZoom();
  }, W = (m) => {
    if (!m || !m.info) return;
    const S = m.info.showName ? m.info.showName.split('"').join("") : "", D = m.info.showLogo ? m.info.showLogo : null, $ = {
      pixelOffset: m ? null : new google.maps.Size(0, -50),
      content: `<div class="marker marker--${m.info.id}">
              ${D ? ` <div class="marker__image-wrapper"><img class="marker__image" width="242" height="96" src="${D}" /></div>` : ""}
              <div class="marker__content">
                ${m.info.showStatus ? `<p class="marker__status">${m.info.showStatus}</p>` : ""}
                <h2 class="marker__title">${m.info.showName}</h2>
                <div class="marker__location">
                ${m.info.city ? `<p class="marker__city">${m.info.city}</p>` : ""}
                  ${m.info.facility ? `<p class="marker__venue">${m.info.facility}</p>` : ""}
                  
                </div>
                ${m.info.dateString ? `<p class="marker__date">${m.info.dateString}</p>` : ""}
              </div>
            </div>
            <div class="marker__buttons">
              ${m.info.ticketPageUrl || m.info.showPageUrl ? `<a class="marker__cta cta-btn cta-btn--grey cta-btn--full-width" href="${m.info.ticketPageUrl || m.info.showPageUrl}" onclick='window.mapTrackingBuyTicket("${S}", "${m.info.city}", "${e.labelBuyButton.value}", "${m.info.ticketPageUrl || m.info.showPageUrl}")' onauxclick='window.mapTrackingBuyTicket("${S}", "${m.info.city}", "${e.labelBuyButton.value}", "${m.info.ticketPageUrl || m.info.showPageUrl}")'>
                      ${m.info.primaryCtaLabel || e.labelBuyButton.value}
                    </a>` : ""}
              <a class="marker__link" href="https://www.google.com/maps/search/?api=1&query=${m.info.latitude},${m.info.longitude}" onclick='window.mapTrackingViewGmap("${S}", "${m.info.city}")' onauxclick='window.mapTrackingViewGmap("${S}", "${m.info.city}")'>
      ${e.labelDirectionButton.value}
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.12498 1.875L10.1831 3.93313L5.80811 8.30812L6.69186 9.19187L11.0669 4.81687L13.125 6.875V1.875H8.12498Z" fill="white"/>
                  <path d="M11.875 11.875H3.125V3.125H7.5L6.25 1.875H3.125C2.43562 1.875 1.875 2.43562 1.875 3.125V11.875C1.875 12.5644 2.43562 13.125 3.125 13.125H11.875C12.5644 13.125 13.125 12.5644 13.125 11.875V8.75L11.875 7.5V11.875Z" fill="white"/>
                </svg>
              </a>
            </div>`
      /*
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.12498 1.875L10.1831 3.93313L5.80811 8.30812L6.69186 9.19187L11.0669 4.81687L13.125 6.875V1.875H8.12498Z" fill="white"/>
          <path d="M11.875 11.875H3.125V3.125H7.5L6.25 1.875H3.125C2.43562 1.875 1.875 2.43562 1.875 3.125V11.875C1.875 12.5644 2.43562 13.125 3.125 13.125H11.875C12.5644 13.125 13.125 12.5644 13.125 11.875V8.75L11.875 7.5V11.875Z" fill="white"/>
        </svg>
      */
    };
    E(m, $);
  }, E = (m, S) => {
    a.setOptions(S), a.open({
      map: n,
      anchor: m
    });
  }, A = () => {
    a.close();
  }, q = () => {
    const m = document.createElement("button");
    m.ariaLabel = e.ariaLocateButton, m.innerHTML = `
    <svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.3873 0.939606C9.06938 0.171571 7.53429 -0.138686 6.0215 0.0572265C4.50872 0.253139 3.1033 0.944205 2.02447 2.02264C0.945634 3.10107 0.25404 4.50622 0.0575599 6.01893C-0.13892 7.53165 0.170761 9.06685 0.938302 10.3851L6.28307 19.6372C6.33025 19.7198 6.39334 19.7922 6.46869 19.8503C6.54404 19.9083 6.63016 19.9508 6.72205 19.9754C6.87609 20.0166 7.0394 20.0058 7.18669 19.9448C7.33398 19.8837 7.45702 19.7758 7.53673 19.6377L12.878 10.3881C13.7983 8.80437 14.053 6.92023 13.5861 5.14895C13.1192 3.37768 11.9688 1.86389 10.3873 0.939606ZM12.3681 6.90817C12.3685 7.87495 12.112 8.82447 11.6248 9.65954L6.90737 17.8296L2.18842 9.65701C1.70554 8.82753 1.44964 7.88551 1.44647 6.92573C1.44329 5.96594 1.69295 5.02225 2.17033 4.1896C2.6477 3.35695 3.33596 2.66471 4.16584 2.18253C4.99572 1.70036 5.93796 1.44526 6.89775 1.44289C7.37068 1.44313 7.84159 1.50457 8.29875 1.62568C9.46505 1.93308 10.4968 2.61793 11.2329 3.57336C11.9691 4.52878 12.3682 5.70103 12.3681 6.90715V6.90817Z" fill="black"/>
      <path d="M6.90737 3.43528C5.98644 3.43528 5.10322 3.80112 4.45203 4.45232C3.80083 5.10352 3.43499 5.98673 3.43499 6.90766C3.43499 7.82859 3.80083 8.71181 4.45203 9.363C5.10322 10.0142 5.98644 10.38 6.90737 10.38C7.8283 10.38 8.71151 10.0142 9.36271 9.363C10.0139 8.71181 10.3797 7.82859 10.3797 6.90766C10.3797 5.98673 10.0139 5.10352 9.36271 4.45232C8.71151 3.80112 7.8283 3.43528 6.90737 3.43528ZM6.90737 8.93347C6.5068 8.93347 6.11523 8.81469 5.78217 8.59214C5.44911 8.3696 5.18952 8.05329 5.03623 7.68322C4.88294 7.31314 4.84284 6.90592 4.92098 6.51305C4.99913 6.12018 5.19202 5.75931 5.47527 5.47606C5.75851 5.19282 6.11938 4.99993 6.51225 4.92178C6.90512 4.84364 7.31234 4.88374 7.68242 5.03703C8.05249 5.19032 8.3688 5.44991 8.59134 5.78297C8.81389 6.11603 8.93267 6.5076 8.93267 6.90817C8.93267 7.44531 8.71929 7.96045 8.33947 8.34027C7.95965 8.72009 7.44451 8.93347 6.90737 8.93347Z" fill="black"/>
    </svg>`, m.classList.add("location-button"), n.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(m), m.addEventListener("click", () => {
      navigator.geolocation ? navigator.geolocation.getCurrentPosition(
        (S) => {
          const D = {
            lat: S.coords.latitude,
            lng: S.coords.longitude
          };
          new google.maps.marker.AdvancedMarkerElement({
            position: D,
            content: j(
              e.defaultLocationImg ? e.defaultLocationImg : Ad
            )
          }), n.setCenter(D), n.setZoom(8);
        },
        () => {
          console.warn("Error: The Geolocation service failed.");
        }
      ) : console.warn("Error: Your browser doesn't support geolocation.");
    });
  }, G = () => {
    e.fitMarkers ? r && r.length > 0 ? p() : (v(2), w(40.866667, 34.566667)) : e.center.value && e.zoom && (v(e.zoom), w(e.center.value.lat, e.center.value.lng));
  }, j = (m, S = void 0) => {
    const D = document.createElement("div");
    D.classList.add("pin__image-wrapper");
    const $ = document.createElement("img");
    if ($.width = 53, $.height = 53, $.src = m, D.appendChild($), S) {
      const V = document.createElement("div");
      V.classList.add("pin__text"), V.innerHTML = S, D.appendChild(V);
    }
    return D;
  };
  return $e(() => {
    window.mapTrackingBuyTicket = (m, S, D, $) => {
      t(e.tracking?.clickBuy, {
        "<show_name>": m,
        "<city_name>": S,
        "<link_text>": D,
        "<link_url>": $
      });
    }, window.mapTrackingViewGmap = (m, S) => {
      t(e.tracking?.clickViewGmap, {
        "<show_name>": m,
        "<city_name>": S
      });
    }, vt(async () => {
      try {
        await s(), q(), e.markersData.value.length > 0 && (l(), e.hasCluster && h(), G()), be(e.markersData, () => {
          l(), e.hasCluster && h(), G();
        }), be(e.center, () => {
          G();
        });
      } catch (m) {
        console.warn("[useGoogleMap.js] error loading the sdk", m);
      }
    });
  }), {
    loadMap: s,
    closeInfoWindow: A,
    openInfoWindow: E,
    openShowInfo: W,
    setZoom: v,
    getZoom: P,
    centerOnMarker: y,
    createMarkers: l,
    clearMarkers: c,
    createClusters: h,
    resetMapPosition: G
  };
}
function jd(e, t = null) {
  const { pushTracking: n } = me(), a = N(null), r = N(null), i = Ue({
    start: null,
    end: null
  }), o = F(() => {
    let u = [];
    return e.value.forEach((h) => {
      u.findIndex((p) => p.value === h.category.value) < 0 && u.push(h.category);
    }), u;
  }), d = F(
    () => [...new Set(e.value.map((u) => u.showName))].map(
      (u) => ({ label: u, value: u })
    )
  ), s = F(() => e.value.filter((u) => {
    let h = !0;
    if (typeof u.visible < "u" && !u.visible || e.value && i.end && (!u.startDate || !u.endDate))
      return !1;
    if (a.value && (h = Math.min(
      u.showType === a.value,
      h
    )), r.value && r.value !== "all" && (h = Math.min(
      u.showName === r.value,
      h
    )), e.value && i.end && u.startDate && u.endDate) {
      const p = new Date(i.start), y = new Date(i.end), w = new Date(u.startDate), v = new Date(u.endDate);
      h = Math.min(
        xt(
          { start: p, end: y },
          { start: w, end: v }
        ),
        h
      );
    }
    if (e.value && !i.end) {
      const p = e.value.filter((y) => y.latitude === u.latitude && y.longitude === u.longitude);
      if (p.length > 1) {
        const y = p.sort((w, v) => new Date(w.startDate) - new Date(v.startDate))[0];
        h = Math.min(y.id === u.id, h);
      }
    }
    return h;
  }) || []);
  return {
    showTypes: o,
    showNames: d,
    markersDataResults: s,
    changeCurrentDates: (u) => {
      Object.assign(i, u), u.start && u.end ? n(t?.clickDateSearch) : n(t?.clickDateClear);
    },
    changeCurrentShowName: (u) => {
      r.value = u, n(t?.clickShow, {
        "<show_name>": u
      });
    }
  };
}
const Ld = ce({
  name: "InteractiveMap",
  components: {
    DropdownFilters: Ct,
    DateRangePicker: hd
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
    const t = H(e, "markersData"), n = H(e, "dateLocale"), a = H(e, "labelBuyButton"), r = H(e, "labelDirectionButton"), i = H(e, "center"), {
      showNames: o,
      markersDataResults: d,
      changeCurrentDates: s,
      changeCurrentShowName: c
    } = jd(t, e.tracking), l = (h) => {
      c(h);
    }, u = (h) => {
      s(h);
    };
    return xd({
      apiKey: e.googleMapApiKey,
      mapId: e.mapId,
      markersData: d,
      center: i,
      zoom: e.zoom,
      defaultPinImg: e.defaultPinImg,
      hasCluster: e.hasCluster,
      markerSize: e.markerSize ? parseInt(e.markerSize) : 50,
      fitMarkers: e.fitMarkers,
      clusterOptions: e.clusterOptions,
      dateLocale: n,
      labelBuyButton: a,
      labelDirectionButton: r,
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
      onShowNameFilterChange: l,
      onDateChanged: u,
      locale: n
    };
  }
}), _d = { class: "interactive-map__container" }, Fd = { class: "interactive-map__split" }, zd = {
  key: 0,
  class: "filters-wrapper"
}, qd = {
  key: 0,
  class: "interactive-map__title"
}, Id = {
  key: 1,
  class: "interactive-map__description"
}, Hd = { class: "interactive-map__slots" }, Bd = { class: "filters" }, Gd = { class: "interactive-map__wrapper" }, Vd = { class: "interactive-map" }, Yd = ["id"], Xd = {
  key: 0,
  class: "loading"
};
function Rd(e, t, n, a, r, i) {
  const o = Me("DateRangePicker"), d = Me("DropdownFilters");
  return C(), T("div", _d, [
    b("div", Fd, [
      e.mapTitle || !e.hideFilters ? (C(), T("div", zd, [
        e.mapTitle ? (C(), T("h2", qd, L(e.mapTitle), 1)) : I("", !0),
        e.mapDescription ? (C(), T("p", Id, L(e.mapDescription), 1)) : I("", !0),
        b("div", Hd, [
          Ke(e.$slots, "default")
        ]),
        b("div", Bd, [
          e.hideFilters ? I("", !0) : (C(), Te(o, {
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
          e.hideFilters ? I("", !0) : (C(), Te(d, {
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
      ])) : I("", !0),
      b("div", Gd, [
        b("div", Vd, [
          b("div", {
            id: e.mapId,
            class: "map"
          }, null, 8, Yd),
          et(yt, { name: "spinner-fade" }, {
            default: tt(() => [
              e.isLoading ? (C(), T("div", Xd, t[0] || (t[0] = [
                b("div", { class: "spinner" }, null, -1)
              ]))) : I("", !0)
            ]),
            _: 1
          })
        ])
      ])
    ])
  ]);
}
const Jd = /* @__PURE__ */ he(Ld, [["render", Rd]]);
function Qd(e, t, n) {
  let a = N(!1);
  const r = N([]), i = F(() => {
    let d = [];
    return r.value.forEach((s, c) => {
      if (n && n.value) {
        const l = n.value.find(
          (u) => u.value == s.showName
        );
        l && (s = { ...s, ...l });
      }
      s && s.runs && s.runs.filter((l) => l !== null).forEach((l) => {
        const u = { ...s, ...l };
        t && t.value && (u.category = t.value.find(
          (h) => h.value == u.showType
        )), delete u.runs, d.push(u);
      });
    }), d;
  }), o = async () => {
    if (!e.value) return;
    a.value = !0;
    const d = fetch(e.value).then((s) => s.json()).catch((s) => (console.warn("[InteractiveMapApi] Failed silently because of: ", s), []));
    return r.value = await d.then((s) => (a.value = !1, s && s.content && s.content.Result && s.content.Result.shows ? s.content.Result.shows : [])).catch(() => a.value = !1), Promise.resolve(!0);
  };
  return $e(o), be(e, o), { shows: r, runs: i, isLoading: a, fetchShows: o };
}
const Zd = ce({
  name: "InteractiveMapApi",
  components: {
    InteractiveMap: Jd
  },
  props: {
    apiUrl: { type: String, required: !0 },
    categoriesOverwrite: { type: Array, default: () => [] },
    showsOverwrite: { type: Array, default: () => [] }
  },
  setup(e) {
    const t = H(e, "apiUrl"), n = H(e, "categoriesOverwrite"), a = H(e, "showsOverwrite"), { runs: r, isLoading: i } = Qd(
      t,
      n,
      a
    );
    return {
      runs: r,
      isLoading: i
    };
  }
}), Ud = { class: "interactive-map-api" };
function Kd(e, t, n, a, r, i) {
  const o = Me("InteractiveMap");
  return C(), T("div", null, [
    b("div", Ud, [
      et(o, bt({ ...e.$props, ...e.$attrs }, {
        "markers-data": e.runs,
        "is-loading": e.isLoading
      }), {
        default: tt(() => [
          Ke(e.$slots, "default")
        ]),
        _: 3
      }, 16, ["markers-data", "is-loading"])
    ])
  ]);
}
const tu = /* @__PURE__ */ he(Zd, [["render", Kd]]);
export {
  hd as DateRangePicker,
  Ct as DropdownFilters,
  Jd as InteractiveMap,
  tu as InteractiveMapApi,
  Qd as useShowsApi
};
