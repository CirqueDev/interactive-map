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
            :gtm="gtmDate"
            :picker-id="mapId + '__picker'"
          />

          <DropdownFilters
            v-if="!hideFilters"
            class="filters__shownames"
            ref="filterDropdownElement"
            :filters="showNames"
            :label-default="labelShowNameFilterDefault"
            :placeholder="placeholderShowNameFilter"
            @onfilterchange="onShowNameFilterChange"
            :gtm="gtmShow"
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
      default: "Select a show",
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
    gtmDate: {
      type: String,
      required: false,
      default:
        '[{ "event": "userAction", "eventAction": "Click on Dates", "eventCategory": "Interactive Map", "eventLabel": "Date Range Picker Toggle"}]',
    },
    gtmShow: {
      type: String,
      required: false,
      default:
        '[{ "event": "userAction", "eventAction": "Click on All Shows", "eventCategory": "Interactive Map", "eventLabel": "Show Selector Toggle"}]',
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
    } = useShowFilters(markersData);

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
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
    }

    .marker__image + .marker__content {
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
    }

    .marker__image-wrapper {
      width: 100%;
      max-width: 100%;
      max-height: 250px;
      overflow: hidden;
      position: relative;
    }

    .marker {
      background-color: rgb(95, 95, 95);
      color: #fff;
    }

    .marker__content {
      text-align: left;
      padding: 16px;
      font-size: 0.875rem;
      font-family: Avenir, Helvetica, Arial, sans-serif;
      background: rgb(0, 0, 0);
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.6) 30%,
        rgba(0, 0, 0, 1) 100%
      );
    }

    .marker__content p {
      margin: 0;
    }

    .marker__title {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      font-size: 1.25rem;
      font-weight: bold;
      padding-bottom: 8px;
      padding-right: 25px;
      margin: 0;
    }

    .marker__buttons {
      padding: 16px;
      background-color: #000;
    }

    .marker__cta {
      width: 100%;
      padding: 0 10px;
      font-size: 0.875rem;
      font-family: Avenir, Helvetica, Arial, sans-serif;
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
      text-transform: uppercase;
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

    .marker__cta svg {
      margin-left: 10px;
    }

    .marker__cta svg,
    .marker__cta path {
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
      font-size: 1rem;
      line-height: 1;
      font-family: Avenir, Helvetica, Arial, sans-serif;
      padding-bottom: 10px;
    }

    .cluster div {
      display: flex;
      align-items: center;
      height: 100%;
      justify-content: center;
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

      .gm-ui-hover-effect {
        top: 0px !important;
        right: 0px !important;
        width: 40px !important;
        height: 40px !important;
        border-radius: 0 !important;
        background-color: #fff !important;
        display: flex !important;
        align-items: center;
        justify-content: center;
      }

      .gm-ui-hover-effect img,
      .gm-ui-hover-effect span {
        width: 30px !important;
        height: 30px !important;
        margin: 0 !important;
      }

      .marker__image {
        max-width: 400px;
        min-height: 275px;
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
    text-transform: none;
    appearance: none;
    position: absolute;
    cursor: pointer;
    user-select: none;
    border-radius: 2px;
    height: 40px;
    width: 40px;

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
