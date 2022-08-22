<template>
  <div>
    <div class="interactive-map-api">
      <InteractiveMap
        v-bind="{ ...$props, ...$attrs }"
        :markers-data="runs"
        :is-loading="isLoading"
      >
        <slot></slot>
      </InteractiveMap>
    </div>
  </div>
</template>

<script>
import InteractiveMap from "./InteractiveMap.vue";
import { toRef, defineComponent } from "vue";
import useShowsApi from "../usables/useShowsApi";

export default defineComponent({
  name: "InteractiveMapApi",
  components: {
    InteractiveMap,
  },
  props: {
    apiUrl: { type: String, required: true },
    apiKey: { type: String, required: false, default: null },
    categoriesOverwrite: { type: Array, default: () => [] },
    showsOverwrite: { type: Array, default: () => [] },
  },
  setup(props) {
    const apiUrl = toRef(props, "apiUrl");
    const apiKey = toRef(props, "apiKey");
    const categoriesOverwrite = toRef(props, "categoriesOverwrite");
    const showsOverwrite = toRef(props, "showsOverwrite");
    const { runs, isLoading } = useShowsApi(
      apiUrl,
      apiKey,
      categoriesOverwrite,
      showsOverwrite
    );

    return {
      runs,
      isLoading,
    };
  },
});
</script>

<style lang="scss">
.interactive-map-api {
  position: relative;
  margin-top: 25px;

  .map {
    border-radius: 15px;
  }
}

.filters + .interactive-map-api {
  margin-top: 0;
}
</style>
