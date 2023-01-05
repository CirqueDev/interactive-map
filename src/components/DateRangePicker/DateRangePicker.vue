<template>
  <div class="date-range-picker__wrapper" ref="dateRangePickerElement">
    <button
      class="date-range-picker__toggle"
      @click="toggleDatePicker()"
      :aria-label="ariaToggleCalendar"
      :aria-expanded="showDateRange + ''"
      :aria-controls="pickerId"
    >
      <template v-if="!readableStartDate && !readableEndDate">
        {{ labelDatesFilter }}
      </template>
      <template v-if="readableStartDate">
        {{ readableStartDate }}
      </template>
      <template v-if="readableEndDate && readableStartDate !== readableEndDate">
        - {{ readableEndDate }}
      </template>

      <svg
        class="dropdown-filters__arrow-down"
        width="14"
        height="9"
        viewBox="0 0 14 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1L7.10049 7.10049L13.201 1"
          stroke="black"
          stroke-width="2"
        />
      </svg>
    </button>

    <div v-show="showDateRange" :id="pickerId" class="date-range-picker">
      <div class="months">
        <div class="month">
          <div class="month__name">
            <button
              class="month-selector month-selector--previous"
              :aria-label="ariaPreviousMonth"
              @click="showPreviousMonth"
            >
              <svg
                width="9"
                height="14"
                viewBox="0 0 9 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.10049 1L2 7.10049L8.10049 13.201"
                  stroke="#1B1B1B"
                  stroke-width="2"
                />
              </svg>
            </button>
            <span>
              {{ shownMonthName }}
            </span>
            <button
              class="month-selector month-selector--next"
              :aria-label="ariaNextMonth"
              @click="showNextMonth"
            >
              <svg
                width="9"
                height="14"
                viewBox="0 0 9 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.899536 13L7.00003 6.89951L0.899537 0.799012"
                  stroke="#1B1B1B"
                  stroke-width="2"
                />
              </svg>
            </button>
          </div>

          <div class="days">
            <button
              v-for="(date, index) in daysInMonth"
              :key="index"
              @click="changeSelectedDate(date)"
              class="day"
              :aria-hidden="date ? false : true"
              :class="[
                date ? `day--${date.date}` : 'day--empty',
                date &&
                selectedDates &&
                selectedDates.start &&
                selectedDates.end &&
                date.formatted >= selectedDates.start.formatted &&
                date.formatted <= selectedDates.end.formatted
                  ? 'day--active'
                  : '',
                date &&
                selectedDates &&
                selectedDates.start &&
                date.formatted == selectedDates.start.formatted
                  ? 'day--active-first'
                  : '',
                date &&
                selectedDates &&
                selectedDates.end &&
                date.formatted == selectedDates.end.formatted
                  ? 'day--active-last'
                  : '',
              ]"
              :disabled="!date"
              :aria-label="
                date ? ariaSelectDate + date.date + ' ' + shownMonthName : ''
              "
            >
              <span class="day__number" v-if="date">{{ date.date }}</span>
            </button>
          </div>
          <div class="date-range-picker__buttons">
            <button class="date-range-picker__reset" @click="clear">
              {{ labelClearButton }}
            </button>
            <button
              class="date-range-picker__save"
              @click="save"
              :disabled="
                !selectedDates || (!selectedDates.start && !selectedDates.end)
              "
            >
              {{ labelSaveButton }}
            </button>
          </div>
        </div>
      </div>
      <table class="week">
        <tr>
          <td class="weekday" v-for="day in weekdays" :key="day">
            {{ day }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { toRef, defineComponent, onMounted, ref, onBeforeUnmount } from "vue";
import useDateRange from "../../usables/useDateRange";
import useTracking from "../../usables/useTracking";

export default defineComponent({
  name: "DateRangePicker",
  emits: ["datechanged", "close"],
  props: {
    pickerId: { type: String, required: true },
    dateLocale: { type: String, required: false, default: "en" },
    labelDatesFilter: { type: String, required: false, default: "Dates" },
    labelClearButton: { type: String, required: false, default: "Clear" },
    labelSaveButton: { type: String, required: false, default: "Save" },
    ariaSelectDate: { type: String, required: false, default: "Select " },
    ariaNextMonth: { type: String, required: false, default: "Next Month" },
    ariaPreviousMonth: {
      type: String,
      required: false,
      default: "Previous Month",
    },
    ariaToggleCalendar: {
      type: String,
      required: false,
      default: "Toggle the calendar",
    },
    defaultDate: { type: Date, required: false, default: () => new Date() },
    tracking: { type: Object, required: false, default: null },
  },
  setup(props, { emit }) {
    const locale = toRef(props, "dateLocale");
    const showDateRange = ref(false);
    const dateRangePickerElement = ref(null);
    const readableStartDate = ref(null);
    const readableEndDate = ref(null);
    const stopPropagation = (e) => e.stopPropagation();

    const closeDatePicker = () => {
      if (showDateRange.value) {
        showDateRange.value = false;
      }
    };

    const { pushTracking } = useTracking();
    const toggleDatePicker = () => {
      showDateRange.value = !showDateRange.value;
      pushTracking(props.tracking ? props.tracking.clickDateToggle : null);
    };

    onMounted(() => {
      document.addEventListener("click", closeDatePicker);
      if (dateRangePickerElement.value)
        dateRangePickerElement.value.addEventListener("click", stopPropagation);
    });

    onBeforeUnmount(() => {
      document.removeEventListener("click", closeDatePicker);
      if (dateRangePickerElement.value)
        dateRangePickerElement.value.removeEventListener(
          "click",
          stopPropagation
        );
    });

    const {
      isoSelectedDates,
      readableSelectedDates,
      clearSelectedDate,
      changeSelectedDate,
      weekdays,
      shownMonthName,
      showNextMonth,
      showPreviousMonth,
      daysInMonth,
      selectedDates,
    } = useDateRange(ref(props.defaultDate), locale);

    const clear = () => {
      clearSelectedDate();
      emit("datechanged", isoSelectedDates.value);
      readableStartDate.value = readableSelectedDates.value.start;
      readableEndDate.value = readableSelectedDates.value.end;
      closeDatePicker();
    };

    const save = () => {
      if (selectedDates && !isoSelectedDates.value.end) {
        changeSelectedDate(selectedDates.start);
      }
      emit("datechanged", isoSelectedDates.value);
      readableStartDate.value = readableSelectedDates.value.start;
      readableEndDate.value = readableSelectedDates.value.end;
      closeDatePicker();
    };

    return {
      locale,
      isoSelectedDates,
      readableSelectedDates,
      readableStartDate,
      readableEndDate,
      clearSelectedDate,
      changeSelectedDate,
      weekdays,
      shownMonthName,
      showNextMonth,
      showPreviousMonth,
      daysInMonth,
      selectedDates,
      clear,
      save,
      showDateRange,
      closeDatePicker,
      dateRangePickerElement,
      toggleDatePicker,
    };
  },
});
</script>

<style lang="scss">
.date-range-picker__wrapper {
  position: relative;
}

.date-range-picker__toggle {
  background: transparent;
  border: 2px solid #000;
  padding: 8px 50px 8px 30px;
  font-weight: bold;
  font-size: 12px;
  border-radius: 30px;
  transition: all 0.25s;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
  text-align: left;
  position: relative;

  @media (min-width: 375px) {
    font-size: 14px;
  }

  &:hover {
    cursor: pointer;
  }

  svg {
    pointer-events: none;
    position: absolute;
    right: 15px;
    top: calc(50% - 7px);
    width: 15px;
    height: 15px;
  }
}

.date-range-picker {
  position: relative;
  width: 300px;
  box-sizing: border-box;
  position: absolute;
  left: 0px;
  padding: 10px;
  z-index: 999;
  background-color: white;
  border-radius: 15px;
  box-shadow: 1px 1px 5px rgb(0 0 0 / 20%);

  * {
    box-sizing: border-box;
  }
}

.month {
  .month__name {
    font-size: 18px;
    margin: 0;
    padding: 10px 0 50px 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      font-family: Avenir, Helvetica, Arial, sans-serif;
    }
  }
}

.month-selector {
  border: none;
  font-weight: bold;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  transition: background 0.25s;

  &--previous {
    padding-right: 8px;
  }

  &--next {
    padding-left: 8px;
  }
}

.month-selector:hover {
  cursor: pointer;
}

.week {
  border-collapse: collapse;
  position: absolute;
  top: 65px;

  .weekday {
    width: 40px;
    height: 40px;
    text-align: center;
    vertical-align: middle;
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }
}

.days {
  display: flex;
  flex-wrap: wrap;
}

.day {
  // width: 14.28%;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  padding: 0;

  &:not(.day--empty):hover,
  &:not(.day--empty):focus {
    cursor: pointer;

    .day__number {
      border: 1px solid #000;
    }
  }

  .day__number {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
}

.day--active {
  background-color: rgb(235, 235, 235);
}

.day--active-first,
.day--active-last {
  .day__number {
    background: #000;
    color: #fff;
    border: 1px solid #000;
  }
}

.day--active-first {
  border-radius: 50% 0 0 50%;
}

.day--active-last {
  border-radius: 0 50% 50% 0;
}

.day--active-first.day--active-last {
  border-radius: 50%;
}

.date-range-picker__buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.date-range-picker__reset,
.date-range-picker__save {
  background: transparent;
  border: none;
  font-weight: bold;
  margin-top: 10px;
  padding: 8px 20px;

  &:disabled {
    opacity: 0.6;
  }
}

.date-range-picker__reset:hover,
.date-range-picker__save:hover {
  cursor: pointer;
}

.date-range-picker__reset {
  text-decoration: underline;
}

.date-range-picker__save {
  background: #000;
  border-radius: 30px;
  color: #fff;
}
</style>
