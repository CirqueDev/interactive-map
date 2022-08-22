import { computed, ref, onMounted, watch } from "vue";

export default function useShowsApi(
  apiUrl,
  apiKey,
  categoriesOverwrite,
  showsOverwrite
) {
  let isLoading = ref(false);
  const shows = ref([]);

  const runs = computed(() => {
    let tmpRuns = [];

    shows.value.forEach((show, index) => {
      if (showsOverwrite && showsOverwrite.value) {
        const showOverwrite = showsOverwrite.value.find(
          (s) => s.value == show.showName
        );
        if (showOverwrite) {
          show = { ...show, ...showOverwrite };
        }
      }

      if (show && show.runs) {
        show.runs.forEach((run) => {
          const tmpRun = { ...show, ...run };

          if (categoriesOverwrite && categoriesOverwrite.value) {
            tmpRun.category = categoriesOverwrite.value.find(
              (c) => c.value == tmpRun.showType
            );
          }

          delete tmpRun.runs;

          tmpRuns.push(tmpRun);
        });
      }
    });
    return tmpRuns;
  });

  const fetchShows = async () => {
    if (!apiUrl.value) return;

    isLoading.value = true;

    const options =
      apiKey && apiKey.value
        ? {
            method: "GET",
            mode: "cors",
            headers: {
              Accept: "application/json",
              ApiKey: apiKey.value,
              "Referrer-Policy": "origin-when-cross-origin",
            },
          }
        : undefined;

    const response = fetch(apiUrl.value, options)
      .then((response) => response.json())
      .catch((error) => {
        console.warn("[InteractiveMapApi] Failed silently because of: ", error);
        return [];
      });

    shows.value = await response
      .then((data) => {
        isLoading.value = false;
        return data &&
          data.content &&
          data.content.Result &&
          data.content.Result.shows
          ? data.content.Result.shows
          : [];
      })
      .catch(() => (isLoading.value = false));

    return Promise.resolve(true);
  };

  onMounted(fetchShows);

  watch(apiUrl, fetchShows);

  return { shows, runs, isLoading, fetchShows };
}
