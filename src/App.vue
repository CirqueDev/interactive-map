<template>
  <div id="app" style="text-align: center">
    <img src="/logo.png" alt="" style="height: 85px; margin-top: 25px" />

    <!-- class="interactive-map--unsplit"-->
    <InteractiveMapApi
      class="map"
      map-id="map-api"
      map-title="When and Where"
      :google-map-api-key="mapApiKey"
      :google-map-style-id="mapStyleId"
      :fit-markers="false"
      :zoom="1"
      :api-url="apiUrl"
      :api-key="apiKey"
      :has-cluster="true"
      :date-locale="lang"
      :marker-size="53"
      :hide-filters="false"
      default-pin-img="/cds-pin-ticket.png"
      label-buy-button="Buy Tickets"
      label-direction-button="View on Google Maps"
      label-clear-button="Clear"
      label-save-button="Search"
      aria-locate-button="Your Location"
      aria-toggle-calendar="Toggle the calendar"
      aria-select-date="Select "
      aria-next-month="Next Month"
      aria-previous-month="Previous Month"
      label-dates-filter="Label For Date Filter"
      placeholder-show-name-filter="Placeholder for Show Name"
      label-show-name-filter-default="Default Label For 'All Shows'"
      :cluster-options="[
        {
          url: 'cds-map-cluster.png',
          width: 53,
          height: 53,
        },
      ]"
    >
    </InteractiveMapApi>
    <!-- 
      :center="{ lat: 0, lng: 0 }"
      :restriction="{
        strictBounds: false,
        latLngBounds: {
          north: 89,
          south: -89,
          west: -179,
          east: 179,
        },
      }"
      :categories-overwrite="[
        { value: 'BIG TOP', label: '', pinImg: '' },
        { value: 'ARENA', label: '', pinImg: '' },
        { value: 'OTHER', label: '', pinImg: '' },
        { value: 'THEATER', label: '', pinImg: '' },
        { value: 'RESIDENT', label: '', pinImg: '' },
      ]"
      :shows-overwrite="[
        {
          visible: false,
          value: 'Blue Man Group North American Tour',
          pinImg: 'other.png',
        },
        {
          visible: false,
          value: 'Blue Man Group Chicago',
          pinImg: 'other.png',
        },
        {
          visible: false,
          value: 'Blue Man Group Boston',
          pinImg: 'other.png',
        },
        {
          visible: false,
          value: 'Bue Man Group Las Vegas',
          pinImg: 'other.png',
        },
        {
          visible: false,
          value: 'Blue Man Group New York',
          pinImg: 'other.png',
        },
      ]"
    -->
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
    const apiKey = ref(import.meta.env.VITE_API_KEY);
    const lang = ref("en");

    return {
      apiUrl,
      apiKey,
      mapApiKey,
      mapStyleId,
      lang,
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
