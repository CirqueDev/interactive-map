export default function useGtm() {
  const pushEvent = (gtmEvent) => {
    if (!gtmEvent) return;
    if (!window.dataLayer) window.dataLayer = [];

    try {
      const eventAttributes = cleanJson(gtmEvent);

      if (eventAttributes) {
        for (let i = 0; i < eventAttributes.length; i++) {
          window.dataLayer.push(eventAttributes[i]);
        }
      }
    } catch (e) {
      console.warn("[useGtm.js] - ", e);
    }
  };

  const cleanJson = (strJson) => {
    let s = strJson
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
  };

  return {
    pushEvent,
  };
}
