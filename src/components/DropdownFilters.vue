<template>
  <div class="dropdown-filters">
    <div class="dropdown-filters__input">
      <select
        name="dropdown-filters__select"
        class="dropdown-filters__select"
        @change="filter($event.target.value)"
        @click="trackClick()"
        v-model="currentFilter"
      >
        <option v-if="placeholder" value="" selected disabled>
          {{ placeholder }}
        </option>
        <option value="all">
          {{ labelDefault }}
        </option>
        <option
          v-for="(f, idx) in filtersWithoutEmptyValue"
          :key="idx"
          :value="f.value"
        >
          {{ f.label || f.value }}
        </option>
      </select>
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
    </div>
  </div>
</template>

<script>
import { ref, toRef, computed, defineComponent } from "vue";
import useTracking from "../usables/useTracking";

export default defineComponent({
  name: "DropdownFilters",
  emits: ["onfilterchange"],
  props: {
    placeholder: { type: String, required: false, default: "" },
    filters: { type: Array, required: false, default: () => [] },
    labelDefault: { type: String, required: false, default: "All shows" },
    tracking: { type: Object, required: false, default: null },
  },
  setup(props, { emit }) {
    const filters = toRef(props, "filters");
    const currentFilter = ref(props.placeholder ? "" : "all");
    const isOpenForTrackingPurpose = ref(false);

    const filter = (f) => {
      currentFilter.value = f;
      emit("onfilterchange", currentFilter.value);

      requestAnimationFrame(() => (isOpenForTrackingPurpose.value = false));
    };

    const resetFilter = () => {
      currentFilter.value = "";
      emit("onfilterchange", currentFilter.value);
    };

    const filtersWithoutEmptyValue = computed(() =>
      filters.value.filter((f) => !!f.value)
    );

    const { pushTracking } = useTracking();
    const trackClick = () => {
      if (!isOpenForTrackingPurpose.value) {
        pushTracking(props.tracking?.clickShowToggle);
      }
      isOpenForTrackingPurpose.value = true;
    };

    return {
      filtersWithoutEmptyValue,
      currentFilter,
      resetFilter,
      filter,
      trackClick,
    };
  },
});
</script>

<style lang="scss">
.dropdown-filters {
  display: inline-block;

  .dropdown-filters__arrow-down {
    pointer-events: none;
    position: absolute;
    right: 15px;
    top: calc(50% - 7px);
    width: 15px;
    height: 15px;
  }

  .dropdown-filters__input {
    display: inline-block;
    position: relative;
    transition: all 0.25s;
    overflow: hidden;
    border-radius: 30px;
    width: 100%;
  }

  .dropdown-filters__select {
    padding: 8px 50px 8px 30px;
    font-weight: bold;
    font-size: 12px;
    border-radius: 30px;
    border: 2px solid #000;
    -webkit-appearance: none;
    -moz-appearance: none;
    max-width: 100%;
    width: 100%;

    @media (min-width: 375px) {
      font-size: 14px;
    }

    &::-ms-expand {
      display: none;
    }

    &:hover {
      cursor: pointer;
    }

    &,
    &:hover,
    &:focus {
      background-color: transparent;
      color: #000;
    }
  }

  .dropdown-filters__reset {
    border: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background-color: #1b1b1b;
    margin-left: 1px;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
