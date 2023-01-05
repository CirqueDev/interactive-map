<template>
  <div id="app" style="text-align: center">
    <img src="/logo.png" alt="" style="height: 85px; margin-top: 25px" />

    <!-- class="interactive-map--unsplit"-->
    <InteractiveMapApi
      class="map"
      map-id="map-api"
      :google-map-api-key="mapApiKey"
      :google-map-style-id="mapStyleId"
      :fit-markers="true"
      :run-id="runId"
      :zoom="2"
      :api-url="apiUrl"
      :has-cluster="true"
      :date-locale="lang"
      :label-buy-button="labelBuyButton"
      :label-direction-button="labelDirectionButton"
      :label-clear-button="labelClearButton"
      :label-save-button="labelSaveButton"
      :aria-toggle-calendar="ariaToggleCalendar"
      :aria-select-date="ariaSelectDate"
      :aria-next-month="ariaNextMonth"
      :aria-previous-month="ariaPreviousMonth"
      :categories-overwrite="categoriesOverwrite"
      :shows-overwrite="showsOverwrite"
      :marker-size="53"
      :hide-filters="false"
      default-pin-img="/cds-pin-ticket.png"
      aria-locate-button="Your Location"
      label-dates-filter="Label For Date Filter"
      placeholder-show-name-filter=""
      label-show-name-filter-default="Default Label For 'All Shows'"
      :cluster-options="[
        {
          url: 'cds-map-cluster.png',
          width: 53,
          height: 53,
        },
      ]"
      map-title="When and Where"
      :restriction="{
        strictBounds: false,
        latLngBounds: {
          north: 89,
          south: -89,
          west: -179,
          east: 179,
        },
      }"
      :tracking="{
        clickMarker: {
          gua: `[{ &quot;event&quot;: &quot;userAction&quot;, &quot;eventAction&quot;: &quot;Click on Map&quot;, &quot;eventCategory&quot;: &quot;Interactive Map&quot;, &quot;eventLabel&quot;: &quot;<show_name> - <city_name>&quot;}]`,
          ga4: ``,
        },
        clickBuy: {
          gua: `[{ &quot;event&quot;: &quot;userAction&quot;, &quot;eventAction&quot;: &quot;Buy Tickets&quot;, &quot;eventCategory&quot;: &quot;Interactive Map&quot;, &quot;eventLabel&quot;: &quot;<show_name> - <city_name>&quot;}]`,
          ga4: ``,
        },
        clickViewGmap: {
          gua: `[{ &quot;event&quot;: &quot;userAction&quot;, &quot;eventAction&quot;: &quot;View on Google Maps&quot;, &quot;eventCategory&quot;: &quot;Interactive Map&quot;, &quot;eventLabel&quot;: &quot;<show_name> - <city_name>&quot;}]`,
          ga4: ``,
        },
        clickDateToggle: {
          gua: `[{ &quot;event&quot;: &quot;userAction&quot;, &quot;eventAction&quot;: &quot;Click on Dates test&quot;, &quot;eventCategory&quot;: &quot;Interactive Map&quot;, &quot;eventLabel&quot;: &quot;Date Range Picker Toggle&quot;}]`,
          ga4: ``,
        },
        clickDateSearch: {
          gua: `[{ &quot;event&quot;: &quot;userAction&quot;, &quot;eventAction&quot;: &quot;Click on Search&quot;, &quot;eventCategory&quot;: &quot;Interactive Map&quot;, &quot;eventLabel&quot;: &quot;Date Range Picker Search&quot;}]`,
          ga4: ``,
        },
        clickDateClear: {
          gua: `[{ &quot;event&quot;: &quot;userAction&quot;, &quot;eventAction&quot;: &quot;Click on Clear&quot;, &quot;eventCategory&quot;: &quot;Interactive Map&quot;, &quot;eventLabel&quot;: &quot;Date Range Picker Clear&quot;}]`,
          ga4: ``,
        },
        clickShowToggle: {
          gua: `[{ &quot;event&quot;: &quot;userAction&quot;, &quot;eventAction&quot;: &quot;Click on All Shows&quot;, &quot;eventCategory&quot;: &quot;Interactive Map&quot;, &quot;eventLabel&quot;: &quot;Show Selector Toggle&quot;}]`,
          ga4: ``,
        },
        clickShow: {
          gua: `[{ &quot;event&quot;: &quot;userAction&quot;, &quot;eventAction&quot;: &quot;Select Show&quot;, &quot;eventCategory&quot;: &quot;Interactive Map&quot;, &quot;eventLabel&quot;: &quot;<show_name>&quot;}]`,
          ga4: ``,
        },
      }"
    >
    </InteractiveMapApi>
  </div>
</template>

<script>
import { ref, onMounted, computed, defineComponent } from "vue";
import { InteractiveMapApi } from "./index";

export default defineComponent({
  name: "App",
  components: {
    InteractiveMapApi,
  },
  setup() {
    const mapApiKey = import.meta.env.VITE_MAP_API_KEY;
    const mapStyleId = import.meta.env.VITE_MAP_STYLE_ID;
    const apiUrl = ref(import.meta.env.VITE_API_URL);
    const lang = ref("en");
    const runId = ref(null);

    onMounted(() => {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("run_id")) {
        runId.value = parseInt(urlParams.get("run_id"));
      }
    });

    // Fake the translation service of the application
    const labelBuyButton = computed(() =>
      lang.value == "fr" ? "Acheter des billets" : "Buy Tickets"
    );
    const labelDirectionButton = computed(() =>
      lang.value == "fr" ? "Directions sur Google" : "View on Google Maps"
    );
    const labelClearButton = computed(() =>
      lang.value == "fr" ? "Réinitialiser" : "Clear"
    );
    const labelSaveButton = computed(() =>
      lang.value == "fr" ? "Rechercher" : "Search"
    );
    const ariaToggleCalendar = computed(() =>
      lang.value == "fr" ? "Ouvrir/Fermer le calendrier" : "Toggle the calendar"
    );
    const ariaSelectDate = computed(() =>
      lang.value == "fr" ? "Sélectionner " : "Select "
    );
    const ariaNextMonth = computed(() =>
      lang.value == "fr" ? "Mois suivant" : "Next Month"
    );
    const ariaPreviousMonth = computed(() =>
      lang.value == "fr" ? "Mois précédent" : "Previous Month"
    );

    const categoriesOverwrite = computed(() =>
      lang.value == "fr"
        ? [
            { value: "BIG TOP", label: "CHAPITEAU", pinImg: "" },
            { value: "ARENA", label: "ARENA", pinImg: "" },
            { value: "OTHER", label: "AUTRES", pinImg: "" },
            { value: "THEATER", label: "THEÂTRE", pinImg: "" },
            {
              value: "RESIDENT",
              label: "RÉSIDENT",
              pinImg: "",
            },
          ]
        : [
            { value: "BIG TOP", label: "", pinImg: "" },
            { value: "ARENA", label: "", pinImg: "" },
            { value: "OTHER", label: "", pinImg: "" },
            { value: "THEATER", label: "", pinImg: "" },
            { value: "RESIDENT", label: "", pinImg: "" },
          ]
    );
    const showsOverwrite = computed(() => [
      {
        visible: false,
        value: "Blue Man Group North American Tour",
        pinImg: "other.png",
      },
      {
        visible: false,
        value: "Blue Man Group Chicago",
        pinImg: "other.png",
      },
      {
        visible: false,
        value: "Blue Man Group Boston",
        pinImg: "other.png",
      },
      {
        visible: false,
        value: "Bue Man Group Las Vegas",
        pinImg: "other.png",
      },
      {
        visible: false,
        value: "Blue Man Group New York",
        pinImg: "other.png",
      },
    ]);

    return {
      apiUrl,
      mapApiKey,
      mapStyleId,
      lang,
      runId,
      labelBuyButton,
      labelDirectionButton,
      labelClearButton,
      labelSaveButton,
      ariaToggleCalendar,
      ariaSelectDate,
      ariaNextMonth,
      ariaPreviousMonth,
      categoriesOverwrite,
      showsOverwrite,
    };
  },
});
</script>
<style lang="scss">
.map {
  width: 1200px;
  margin: 0 auto;
  max-width: 100%;
}

.interactive-map {
  --height: 450px !important;
}
</style>
