import { computed, ref, reactive } from "vue";
import { areIntervalsOverlapping } from "date-fns";
import useGtm from "./useGtm";

export default function useShowFilters(markersData) {
  const { pushEvent } = useGtm();
  const currentShowTypeFilter = ref(null);
  const currentShowNameFilter = ref(null);
  const currentDates = reactive({
    start: null,
    end: null,
  });

  // Return only the existing showTypes in the data received by the API. + remove duplicates
  const showTypes = computed(() => {
    let categories = [];

    markersData.value.forEach((marker) => {
      if (categories.findIndex((c) => c.value === marker.category.value) < 0) {
        categories.push(marker.category);
      }
    });

    return categories;
  });

  const showNames = computed(() =>
    [...new Set(markersData.value.map((marker) => marker.showName))].map(
      (name) => {
        return { label: name, value: name };
      }
    )
  );

  const markersDataResults = computed(() => {
    return (
      markersData.value.filter((m) => {
        let filterFound = true;

        if (typeof m.visible !== "undefined" && !m.visible) {
          return false;
        }

        if (currentShowTypeFilter.value) {
          filterFound = Math.min(
            m.showType === currentShowTypeFilter.value,
            filterFound
          );
        }

        if (
          currentShowNameFilter.value &&
          currentShowNameFilter.value !== "all"
        ) {
          filterFound = Math.min(
            m.showName === currentShowNameFilter.value,
            filterFound
          );
        }

        if (markersData.value && currentDates.end) {
          const selectedStartDate = new Date(currentDates.start);
          const selectedEndDate = new Date(currentDates.end);
          const startDate = new Date(m.startDate);
          const endDate = new Date(m.endDate);

          filterFound = Math.min(
            areIntervalsOverlapping(
              { start: selectedStartDate, end: selectedEndDate },
              { start: startDate, end: endDate }
            ),
            filterFound
          );
        }

        return filterFound;
      }) || []
    );
  });

  const changeCurrentDates = (dates) => {
    Object.assign(currentDates, dates);
    if (dates.start && dates.end) {
      pushEvent(
        `[{ "event": "userAction", "eventAction": "Click on Search", "eventCategory": "Interactive Map", "eventLabel": "Date Range Picker Search"}]` // ${currentDates.start} - ${currentDates.end}
      );
    } else {
      pushEvent(
        `[{ "event": "userAction", "eventAction": "Click on Clear", "eventCategory": "Interactive Map", "eventLabel": "Date Range Picker Clear"}]`
      );
    }
  };

  const changeCurrentShowName = (showName) => {
    currentShowNameFilter.value = showName;
    pushEvent(
      `[{ "event": "userAction", "eventAction": "Select Show", "eventCategory": "Interactive Map", "eventLabel": "${showName}"}]`
    );
  };

  return {
    showTypes,
    showNames,
    markersDataResults,
    changeCurrentDates,
    changeCurrentShowName,
  };
}
