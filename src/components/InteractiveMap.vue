<template>
  <div class="interactive-map__container">
    <div class="interactive-map__split">
      <div class="filters-wrapper" v-if="mapTitle || !hideFilters">
        <h2 v-if="mapTitle" class="interactive-map__title">
          {{ mapTitle }}
        </h2>

        <p v-if="mapDescription" class="interactive-map__description">
          {{ mapDescription }}
        </p>

        <div class="interactive-map__slots">
          <slot></slot>
        </div>

        <div class="filters">
          <DateRangePicker
            v-if="!hideFilters"
            class="filters__daterange"
            @datechanged="onDateChanged"
            :date-locale="locale"
            :label-clear-button="labelClearButton"
            :label-save-button="labelSaveButton"
            :label-dates-filter="labelDatesFilter"
            :aria-select-date="ariaSelectDate"
            :aria-next-month="ariaNextMonth"
            :aria-previous-month="ariaPreviousMonth"
            :aria-toggle-calendar="ariaToggleCalendar"
            :picker-id="mapId + '__picker'"
            :tracking="tracking"
          />

          <DropdownFilters
            v-if="!hideFilters"
            class="filters__shownames"
            ref="filterDropdownElement"
            :filters="showNames"
            :label-default="labelShowNameFilterDefault"
            :placeholder="placeholderShowNameFilter"
            @onfilterchange="onShowNameFilterChange"
            :tracking="tracking"
          />
        </div>
      </div>
      <div class="interactive-map__wrapper">
        <div class="interactive-map">
          <div :id="mapId" class="map"></div>
          <transition name="spinner-fade">
            <div class="loading" v-if="isLoading">
              <div class="spinner"></div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toRef, defineComponent } from "vue";

import DropdownFilters from "./DropdownFilters.vue";
import DateRangePicker from "./DateRangePicker/DateRangePicker.vue";
import useGoogleMap from "../usables/useGoogleMap";
import useShowFilters from "../usables/useShowFilters";

export default defineComponent({
  name: "InteractiveMap",
  components: {
    DropdownFilters,
    DateRangePicker,
  },
  props: {
    mapTitle: { type: String, required: false, default: "" },
    mapDescription: { type: String, required: false, default: "" },
    mapId: { type: String, required: true },
    googleMapApiKey: { type: String, required: true },
    googleMapStyleId: { type: String, required: false, default: null },
    zoom: { type: Number, required: false, default: 15 },
    backgroundColor: { type: String, required: false, default: "#000000" },
    markersData: { type: Array, required: false, default: () => [] },
    center: {
      type: Object,
      required: false,
      default: () => ({ lat: 0, lng: 0 }),
    },
    hideFilters: { type: Boolean, required: false, default: false },
    fitMarkers: { type: Boolean, required: false, default: false },
    markerSize: { type: Number, required: false, default: 50 },
    restriction: { type: Object, required: false, default: () => null },
    hasCluster: { type: Boolean, required: false, default: true },
    clusterOptions: { type: Array, required: false, default: null },
    defaultPinImg: { type: String, required: false, default: null },
    dateLocale: { type: String, required: false, default: "en" },
    labelBuyButton: { type: String, required: false, default: "Buy Tickets" },
    labelDirectionButton: {
      type: String,
      required: false,
      default: "View on Google Maps",
    },
    labelClearButton: { type: String, required: false, default: "Clear" },
    labelSaveButton: { type: String, required: false, default: "Save" },
    labelShowNameFilterDefault: {
      type: String,
      required: false,
      default: "All Shows",
    },
    placeholderShowNameFilter: {
      type: String,
      required: false,
      default: "",
    },
    labelDatesFilter: {
      type: String,
      required: false,
      default: "Dates",
    },
    ariaToggleCalendar: {
      type: String,
      required: false,
      default: "Toggle the calendar",
    },
    ariaSelectDate: { type: String, required: false, default: "Select " },
    ariaNextMonth: { type: String, required: false, default: "Next Month" },
    ariaPreviousMonth: {
      type: String,
      required: false,
      default: "Previous Month",
    },
    ariaLocateButton: {
      type: String,
      required: false,
      default: "Your Location",
    },
    isLoading: { type: Boolean, required: false, default: false },
    tracking: {
      type: Object,
      required: false,
      default: null,
    },
  },
  setup(props) {
    const markersData = toRef(props, "markersData");
    const locale = toRef(props, "dateLocale");
    const labelBuyButton = toRef(props, "labelBuyButton");
    const labelDirectionButton = toRef(props, "labelDirectionButton");
    const center = toRef(props, "center");

    /* FILTERS / DATE RANGE */
    const {
      showNames,
      markersDataResults,
      changeCurrentDates,
      changeCurrentShowName,
    } = useShowFilters(markersData, props.tracking);

    const onShowNameFilterChange = (filter) => {
      changeCurrentShowName(filter);
    };

    const onDateChanged = (dates) => {
      changeCurrentDates(dates);
    };

    /* GOOGLE MAP */
    useGoogleMap({
      apiKey: props.googleMapApiKey,
      mapId: props.mapId,
      markersData: markersDataResults,
      center,
      zoom: props.zoom,
      defaultPinImg: props.defaultPinImg,
      hasCluster: props.hasCluster,
      markerSize: props.markerSize ? parseInt(props.markerSize) : 50,
      fitMarkers: props.fitMarkers,
      clusterOptions: props.clusterOptions,
      dateLocale: locale,
      labelBuyButton,
      labelDirectionButton,
      ariaLocateButton: props.ariaLocateButton,
      tracking: props.tracking,
      mapOptions: {
        streetViewControl: false,
        mapTypeControl: false,
        center: props.center,
        zoom: props.zoom,
        mapId: props.googleMapStyleId,
        restriction: props.restriction,
        backgroundColor: props.backgroundColor,
      },
    });

    return {
      showNames,
      onShowNameFilterChange,
      onDateChanged,
      locale,
    };
  },
});
</script>

<style lang="scss">
.interactive-map__container {
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  }

  .loading {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 15px;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    border-radius: 15px;
  }

  .spinner {
    width: 75px;
    height: 75px;
    border-radius: 50%;
    border: 4px solid;
    border-color: #333 rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1);
    animation: spin 0.6s ease infinite;
  }

  .spinner-fade-enter-active,
  .spinner-fade-leave-active {
    transition: opacity 0.5s;
  }

  .spinner-fade-enter, .spinner-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .interactive-map__title {
    font-size: 31px;
    font-weight: 700;
    text-align: center;
    margin: 0 0 26px 0;

    @media (min-width: 1280px) {
      font-size: 49px;
    }
  }

  .interactive-map__split {
    @media (min-width: 1280px) {
      display: flex;
      align-items: center;
      justify-content: center;

      & > div {
        &:first-child {
          width: 40%;
        }
        &:last-child {
          width: 60%;
        }
      }
    }
  }

  .interactive-map__wrapper {
    background-color: #ddd;
    border-radius: 15px;
  }

  .interactive-map {
    --height: 450px;
    position: relative;

    .map {
      position: relative;
      overflow-anchor: none;
      height: var(--height);
      width: 100%;
      border-radius: 15px;
    }

    .marker,
    .marker * {
      box-sizing: border-box;
      overflow: hidden;
    }

    .marker__image {
      object-fit: contain;
      width: 150px;
      margin: 0 auto;
    }

    .marker__image-wrapper {
      width: 100%;
      margin: 16px auto 0 auto;
      overflow: hidden;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .marker {
      color: #fff;
      background: rgb(0, 0, 0);
    }

    .marker__content {
      text-align: left;
      padding: 16px 16px 0 16px;
      font-size: 0.875rem;
      font-family: var(--primary-font, sans-serif);
    }

    .marker__content p {
      margin: 0;
    }

    .marker__status {
      text-transform: uppercase;
      font-weight: 700;
      font-size: var(--text-2xs, 10px);
    }

    .marker__title {
      font-family: var(--primary-font, sans-serif);
      font-size: 1.25rem;
      font-weight: bold;
      padding-right: 25px;
      margin: 0;
      padding-bottom: var(--spacing-025, 2px);
    }

    .marker__venue {
      font-weight: 400;
      font-size: var(--text-sm, 14px);
      color: var(--color-grey-3, #989898);
    }

    .marker__city {
      font-weight: 400;
      font-size: var(--text-sm, 14px);
      color: var(--color-white, #ffffff);
      padding-bottom: var(--spacing-025, 2px);
    }

    .marker__date {
      padding-top: var(--spacing-025, 2px);
      font-weight: 400;
      font-size: var(--text-xs, 12px);
      color: var(--color-grey-3, #989898);
    }

    .marker__venue:has(+ .marker__city)::after {
      content: ", ";
    }

    .marker__buttons {
      padding: 16px;
      background-color: #000;
    }

    .marker__link {
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: 128%;
      padding: 0 10px;
      display: inline-flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      height: 32px;
      color: #fff;
      font-family: var(--primary-font, sans-serif);
      margin-top: 6px;
      opacity: 1;
      transition: opacity 0.2s ease;

      &:hover,
      &:focus,
      &:visited {
        opacity: 0.6;
      }
    }

    .marker__cta {
      width: 100%;
      padding: 0 10px;
      font-size: var(--text-base, 16px);
      font-family: var(--primary-font, sans-serif);
      font-stretch: normal;
      justify-content: center;
      appearance: none;
      box-sizing: border-box;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      height: 40px;
      margin: 0;
      overflow: hidden;
      position: relative;
      text-decoration: none;
      transition: all 0.2s ease;
      z-index: 1;
      line-height: 0;
      outline: 0;
      text-align: center;
      font-weight: bold;
      background: #313131;
      color: #fff;
      border: 1px solid #313131;
    }

    .marker__cta:before {
      background: 0 0;
      content: "";
      height: 100%;
      width: 0;
      left: 0;
      position: absolute;
      top: 0;
      transition: all 0.2s ease;
      z-index: -1;
    }

    .marker__cta.cta-btn--ghost {
      background: transparent;
      border: 1px solid #fff;
      color: #fff;
    }

    .marker__cta:hover:before,
    .marker__cta:focus:before {
      background: hsla(0, 0%, 100%, 0.1);
      width: 100%;
    }

    .marker__cta.cta-btn--ghost:hover:before,
    .marker__cta.cta-btn--ghost:focus:before {
      background: hsla(0, 0%, 100%, 0.1);
      width: 100%;
    }

    .marker__cta:not(:first-child) {
      margin-top: 16px;
    }

    .marker__cta svg,
    .marker__link svg {
      margin-left: 10px;
    }

    .marker__cta svg,
    .marker__link svg,
    .marker__cta path,
    .marker__link path {
      margin-bottom: 0;
      fill: #fff;
    }

    .cluster img {
      position: absolute;
      top: 0;
      left: 0;
      max-width: 100%;
      max-height: 100%;
    }

    .cluster span {
      color: #fff !important;
      line-height: 1;
      font-family: var(--primary-font, sans-serif);
      padding-bottom: 10px;
      font-size: var(--text-sm, 14px);
      font-weight: 700;
    }

    .cluster div {
      display: flex;
      align-items: center;
      height: 100%;
      justify-content: center;
    }

    .gm-style-iw-tc::after {
      background-color: #000;
    }

    .gm-style {
      border-radius: 15px;
      overflow: hidden;

      * {
        box-shadow: none !important;
      }

      .gm-style-iw-d,
      .gm-style-iw-d::-webkit-scrollbar-track,
      .gm-style-iw-d::-webkit-scrollbar-track-piece,
      .gm-style-iw-c,
      .gm-style-iw-t,
      .gm-style-iw-t::after {
        background: #000;
        padding: 0;
        border-radius: 0;
        margin: 0;
      }

      .gm-style-iw-c {
        border-radius: 15px !important;
        max-width: 275px !important;
      }

      .gm-style-iw-d {
        overflow: hidden !important;
      }

      .gm-style-iw-d,
      .gm-style-iw-c {
        min-width: 250px !important;
        max-height: none !important;
      }

      .gm-style-iw-t::after {
        z-index: -1;
      }

      .gm-style-iw-chr {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
      }

      .gm-ui-hover-effect {
        top: 4px !important;
        right: 4px !important;
        width: 40px !important;
        height: 40px !important;
        border-radius: 0 !important;
        background-color: transparent !important;
        display: flex !important;
        align-items: center;
        justify-content: center;
        z-index: 9;
      }

      .gm-ui-hover-effect img,
      .gm-ui-hover-effect span {
        width: 20px !important;
        height: 20px !important;
        margin: 0 !important;
        mask-image: url("data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M11.1767%209.99929L20%201.17598L18.8235%20-0.000488281L10.0002%208.82282L1.17716%20-0.000225918L0.000690977%201.17624L8.82372%209.99929L-2.85607e-05%2018.823L1.17644%2019.9995L10.0002%2011.1758L18.8242%2019.9998L20.0007%2018.8233L11.1767%209.99929Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E%0A") !important;
        background-color: #fff !important;
        mask-repeat: no-repeat;
        mask-position: center;
        mask-size: contain;
      }

      .poi-info-window {
        padding: 15px;
        background: #fff;
      }

      .poi-info-window .title {
        font-size: 16px;
        margin-bottom: 15px;
      }

      .poi-info-window .view-link {
        margin-top: 15px;
      }
    }
  }

  .filters-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    min-height: 44px;
    flex-wrap: wrap;
    padding: 0 15px;
  }

  .filters {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    align-self: flex-start;
    width: 300px;
    flex-direction: column;
    align-self: auto;
  }

  .filters__daterange,
  .filters__shownames {
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 10px;
  }

  .filters__shownames {
    display: flex;
    align-items: center;
    justify-content: left;
  }

  .location-button {
    background: none rgb(255, 255, 255);
    border: 0px;
    margin: 10px;
    padding: 0px;
    appearance: none;
    position: absolute;
    cursor: pointer;
    user-select: none;
    border-radius: 2px;
    height: 40px;
    width: 40px;
    text-align: center;

    &:hover {
      svg,
      path {
        fill: #000;
      }
    }

    svg,
    path {
      fill: #444;
    }
  }

  .pin__image-wrapper {
    position: relative;
  }

  .pin__text {
    color: #fff;
    position: absolute;
    left: 0;
    right: 0;
    top: 12px;
    font-size: 14px;
    text-align: center;
  }
}

.interactive-map--unsplit {
  .filters {
    @media (min-width: 1280px) {
      width: 100%;
      flex-direction: row;
      justify-content: center;

      .filters__daterange {
        margin-bottom: 0;
        margin-right: 15px;
      }
    }
  }
  .interactive-map__split {
    @media (min-width: 1280px) {
      display: block;

      & > div {
        &:first-child {
          width: 100%;
        }
        &:last-child {
          width: 100%;
        }
      }
    }
  }
}
</style>
