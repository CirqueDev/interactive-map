import { reactive, computed, ref } from "vue";
import {
  format,
  getDaysInMonth,
  getDay,
  startOfMonth,
  endOfMonth,
  addMonths,
  startOfWeek,
  addDays,
} from "date-fns";
import { locales } from "../date-fns-locales";

export default function useDateRange(
  shownMonth = ref(new Date()),
  dateLocale = ref("en")
) {
  const selectedDates = reactive({
    start: null,
    end: null,
  });

  const readableSelectedDates = computed(() => {
    return {
      start:
        selectedDates && selectedDates.start
          ? format(
              new Date(
                selectedDates.start.year,
                selectedDates.start.month,
                selectedDates.start.date
              ),
              "yyyy-MM-dd" // 'Z'
            )
          : null,
      end:
        selectedDates && selectedDates.end
          ? format(
              new Date(
                selectedDates.end.year,
                selectedDates.end.month,
                selectedDates.end.date
              ),
              "yyyy-MM-dd" // 'Z'
            )
          : null,
    };
  });

  const isoSelectedDates = computed(() => {
    return {
      start:
        selectedDates && selectedDates.start
          ? format(
              new Date(
                selectedDates.start.year,
                selectedDates.start.month,
                selectedDates.start.date,
                0,
                -1
              ),
              "yyyy-MM-dd'T'HH:mm:ss" // 'Z'
            )
          : null,
      end:
        selectedDates && selectedDates.end
          ? format(
              new Date(
                selectedDates.end.year,
                selectedDates.end.month,
                selectedDates.end.date,
                23,
                59,
                59
              ),
              "yyyy-MM-dd'T'HH:mm:ss" // 'Z'
            )
          : null,
    };
  });

  const daysInMonth = computed(() => {
    const tmpDates = new Array(firstDayOfMonth.value);
    const numberOfDays = getDaysInMonth(shownMonth.value);
    const month = shownMonth.value.getMonth();
    const year = shownMonth.value.getFullYear();

    for (let date = 1; date <= numberOfDays; date++) {
      tmpDates.push({
        year,
        month,
        date,
        formatted: format(new Date(year, month, date), "yyyy-MM-dd"),
      });
    }

    const endOfMonth = new Array(6 - lastDayOfMonth.value);

    return tmpDates.concat(endOfMonth);
  });

  const firstDayOfMonth = computed(() => {
    return getDay(startOfMonth(shownMonth.value));
  });

  const lastDayOfMonth = computed(() => {
    return getDay(endOfMonth(shownMonth.value));
  });

  const shownMonthName = computed(() => {
    return format(shownMonth.value, "MMMM yyyy", {
      locale: locales[dateLocale.value],
    });
  });

  const weekdays = computed(() => {
    // https://github.com/date-fns/date-fns/issues/644
    const firstDOW = startOfWeek(new Date());
    const weekdays = [...Array(7).keys()].map((i) =>
      format(addDays(firstDOW, i), "EEEEEE", {
        locale: locales[dateLocale.value],
      })
    );
    return weekdays;
  });

  const changeSelectedDate = (date) => {
    if (date) {
      if (selectedDates.start == null || selectedDates.end != null) {
        selectedDates.start = date;

        if (selectedDates.end != null) {
          selectedDates.end = null;
        }
      } else if (selectedDates.end == null) {
        selectedDates.end = date;
      }

      if (
        selectedDates &&
        selectedDates.end &&
        selectedDates.start &&
        selectedDates.end.formatted < selectedDates.start.formatted
      ) {
        const start = selectedDates.start;
        selectedDates.start = selectedDates.end;
        selectedDates.end = start;
      }
    }
  };

  const clearSelectedDate = () => {
    Object.assign(selectedDates, {
      start: null,
      end: null,
    });
  };

  const showNextMonth = () => {
    shownMonth.value = addMonths(shownMonth.value, 1);
  };

  const showPreviousMonth = () => {
    shownMonth.value = addMonths(shownMonth.value, -1);
  };

  const changeShownMonth = (date = new Date()) => {
    shownMonth.value = date;
  };

  return {
    selectedDates,
    isoSelectedDates,
    readableSelectedDates,
    daysInMonth,
    firstDayOfMonth,
    lastDayOfMonth,
    shownMonthName,
    weekdays,
    changeShownMonth,
    changeSelectedDate,
    clearSelectedDate,
    showNextMonth,
    showPreviousMonth,
  };
}
