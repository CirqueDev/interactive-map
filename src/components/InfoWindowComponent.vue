<template>
  <div class="marker" v-if="markerData" :class="`marker--${markerData.id}`">
    <div class="marker__image-wrapper">
      <img
        v-if="img"
        class="marker__image"
        width="590"
        height="590"
        :src="img"
      />
      <div class="marker__content">
        <h2 v-if="markerData.showName" class="marker__title">
          {{ markerData.showName }}
        </h2>
        <p v-if="markerData.city" class="marker__city">{{ markerData.city }}</p>
        <p v-if="markerData.facility" class="marker__venue">
          {{ markerData.facility }}
        </p>
        <p
          class="marker__date"
          v-if="dateLocale && markerData.startDate && markerData.endDate"
        >
          {{
            format(new Date(markerData.startDate), "PPP", {
              locale: locales[dateLocale],
            })
          }}
          -
          {{
            format(new Date(markerData.endDate), "PPP", {
              locale: locales[dateLocale],
            })
          }}
        </p>
      </div>
    </div>
    <div class="marker__buttons">
      <a
        class="marker__cta marker__cta--small cta-btn cta-btn--ghost cta-btn--full-width"
        :href="`https://www.google.com/maps/dir/?api=1&destination=${markerData.latitude},${markerData.longitude}&travelmode=driving`"
        onclick="window.mapPushToDataLayer(directionGtm)"
      >
        {{ labelDirectionButton }}
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.12498 1.875L10.1831 3.93313L5.80811 8.30812L6.69186 9.19187L11.0669 4.81687L13.125 6.875V1.875H8.12498Z"
            fill="white"
          />
          <path
            d="M11.875 11.875H3.125V3.125H7.5L6.25 1.875H3.125C2.43562 1.875 1.875 2.43562 1.875 3.125V11.875C1.875 12.5644 2.43562 13.125 3.125 13.125H11.875C12.5644 13.125 13.125 12.5644 13.125 11.875V8.75L11.875 7.5V11.875Z"
            fill="white"
          />
        </svg>
      </a>
      <a
        class="marker__cta cta-btn cta-btn--grey cta-btn--full-width"
        :href="markerData.showPageUrl"
        v-if="markerData.showPageUrl"
        onclick="window.mapPushToDataLayer(pageUrlGtm)"
      >
        {{ labelBuyButton }}
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.12498 1.875L10.1831 3.93313L5.80811 8.30812L6.69186 9.19187L11.0669 4.81687L13.125 6.875V1.875H8.12498Z"
            fill="white"
          />
          <path
            d="M11.875 11.875H3.125V3.125H7.5L6.25 1.875H3.125C2.43562 1.875 1.875 2.43562 1.875 3.125V11.875C1.875 12.5644 2.43562 13.125 3.125 13.125H11.875C12.5644 13.125 13.125 12.5644 13.125 11.875V8.75L11.875 7.5V11.875Z"
            fill="white"
          />
        </svg>
      </a>
    </div>
  </div>
</template>

<script>
import { toRef, defineComponent, computed } from "vue";
import { format } from "date-fns";
import { locales } from "../date-fns-locales";

export default defineComponent({
  name: "InfoWindowComponent",
  props: {
    markerData: { type: Object, required: false, default: null },
    labelBuyButton: { type: String, required: false, default: null },
    labelDirectionButton: { type: String, required: false, default: null },
    dateLocale: { type: String, required: false, default: null },
  },
  setup(props) {
    const markerData = toRef(props, "markerData");
    const labelBuyButton = toRef(props, "labelBuyButton");
    const labelDirectionButton = toRef(props, "labelDirectionButton");
    const dateLocale = toRef(props, "dateLocale");

    // Parse quote for the like of "O"
    const nameNoQuote = computed(() => {
      if (!markerData.value && !markerData.value.showName) return null;
      return markerData.value.showName.split('"').join("");
    });

    // Find an image to put in the InfoWindow
    const img = computed(() => {
      return markerData.value.showThumbnail
        ? markerData.value.showThumbnail
        : markerData.value.showImage;
    });

    const pageUrlGtm = computed(() => {
      // if(!markerData.value && !markerData.value.showPageUrl) return null;
      return JSON.stringify(
        `[{ "event": "userAction", "eventAction": "Buy Tickets", "eventCategory": "Interactive Map", "eventLabel": "${nameNoQuote} - ${markerData.value.city}"}]`
      );
    });

    const directionGtm = computed(() => {
      return JSON.stringify(
        `[{ "event": "userAction", "eventAction": "View on Google Maps", "eventCategory": "Interactive Map", "eventLabel": "${nameNoQuote} - ${markerData.value.city}"}]`
      );
    });

    return {
      markerData,
      labelBuyButton,
      labelDirectionButton,
      format,
      locales,
      dateLocale,
      img,
      pageUrlGtm,
      directionGtm,
    };
  },
});
</script>
