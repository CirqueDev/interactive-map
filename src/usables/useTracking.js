export default function useTracking() {
  function pushGua(guaEvents, replaceObj = null) {
    if (!guaEvents) return;
    try {
      const replacedEvents = replacePlaceholder(guaEvents, replaceObj);
      const parsedEvents = cleanJSON(replacedEvents);
      pushDatalayer(parsedEvents);
    } catch (e) {
      console.warn("[useTracking] - ", e);
    }
  }

  function pushGa4(ga4Events, replaceObj = null) {
    if (!ga4Events) return;
    try {
      const replacedEvents = replacePlaceholder(ga4Events, replaceObj);
      const parsedEvents = cleanJSON(replacedEvents);
      pushDatalayer(parsedEvents);
    } catch (e) {
      console.warn("[useTracking] - ", e);
    }
  }

  function pushDatalayer(datalayerEvent) {
    if (!datalayerEvent) return;
    if (!window.dataLayer) window.dataLayer = [];
    if (Array.isArray(datalayerEvent)) {
      for (let i = 0; i < datalayerEvent.length; i++) {
        window.dataLayer.push(datalayerEvent[i]);
      }
    } else {
      window.dataLayer.push(datalayerEvent);
    }
  }

  function pushTracking(events, replaceObj = null) {
    if (!events) return;
    const keys = Object.keys(events);

    for (let i = 0; i < keys.length; ++i) {
      const key = keys[i];
      const event = events[key];

      switch (key) {
        case "ga4":
          pushGa4(event, replaceObj);
          break;
        case "gua":
          pushGua(event, replaceObj);
          break;
        default:
          break;
      }
    }
  }

  function cleanJSON(strJSON) {
    if (typeof strJSON !== "string") return strJSON;

    let s = strJSON
      .replace(/\\n/g, "\\n")
      .replace(/\\'/g, "\\'")
      .replace(/\\"/g, '\\"')
      .replace(/\\&/g, "\\&")
      .replace(/\\r/g, "\\r")
      .replace(/\\t/g, "\\t")
      .replace(/\\b/g, "\\b")
      .replace(/\\f/g, "\\f");

    // remove non-printable and other non-valid JSON chars
    s = s.replace(/[\u0000-\u0019]+/g, "");
    return JSON.parse(s);
  }

  function replacePlaceholder(str, obj = null) {
    if (!obj) return str;
    const keys = Object.keys(obj);
    return keys.reduce((acc, key) => acc.replaceAll(key, obj[key]), str);
  }

  return {
    pushDatalayer,
    pushTracking,
    pushGua,
    pushGa4,
  };
}
