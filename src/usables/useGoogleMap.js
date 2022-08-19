import { MarkerClusterer } from "@googlemaps/markerclusterer";
import Vue, { ref, onMounted, watch, nextTick } from "vue";
import { Loader } from "@googlemaps/js-api-loader";
import useGtm from "./useGtm";
import locationImg from "../assets/location.png";
import InfoWindowComponent from "../components/InfoWindowComponent.vue";

const InfoWindow = Vue.extend(InfoWindowComponent);
const instance = new InfoWindow();

export default function useGoogleMap(
  data = {
    apiKey: null,
    mapId: null,
    markersData: ref([]),
    center: ref(null),
    defaultPinImg: null,
    defaultLocationImg: null,
    clusterOptions: null,
    markerSize: 50,
    hasCluster: true,
    fitMarkers: false,
    zoom: 15,
    mapOptions: null,
    dateLocale: ref("en"),
    labelBuyButton: ref("Buy Tickets"),
    labelDirectionButton: ref("View on Google Maps"),
    ariaLocateButton: "Your Location",
  }
) {
  const { pushEvent } = useGtm();

  let map = null;
  let infoWindow = null;
  const loader = new Loader({
    apiKey: data.apiKey,
    version: "weekly",
  });

  const markers = ref([]);
  const clusters = ref(null);
  const bounds = ref(null);

  const loadMap = () => {
    return new Promise(async (resolve) => {
      if (!data.mapOptions) throw new Error("[useGoogleMap.js] no map options");
      await loader.load();
      map = new google.maps.Map(
        document.getElementById(data.mapId),
        data.mapOptions
      );
      infoWindow = new google.maps.InfoWindow();
      google.maps.event.addListenerOnce(map, "idle", () => {
        resolve(true);
      });
    });
  };

  const clearMarkers = () => {
    markers.value.forEach((marker) => marker.setMap(null));
    markers.value = [];
  };

  const createMarkers = () => {
    clearMarkers();
    const markersData = [...data.markersData.value];
    if (!markersData) return;
    const tmpMarkers = [];

    markersData.forEach((m) => {
      if (!m || (typeof m.visible !== "undefined" && !m.visible)) {
        return;
      }

      let markerData = { ...m };
      let icon = null;

      if (markerData.pinImg) {
        icon = {
          url: markerData.pinImg,
          scaledSize: new google.maps.Size(data.markerSize, data.markerSize),
          labelOrigin: new google.maps.Point(
            data.markerSize / 2,
            data.markerSize + 4
          ),
        };
      } else if (markerData.category && markerData.category.pinImg) {
        icon = {
          url: markerData.category.pinImg,
          scaledSize: new google.maps.Size(data.markerSize, data.markerSize),
          labelOrigin: new google.maps.Point(
            data.markerSize / 2,
            data.markerSize + 4
          ),
        };
      } else if (data.defaultPinImg) {
        icon = {
          url: data.defaultPinImg,
          scaledSize: new google.maps.Size(data.markerSize, data.markerSize),
          labelOrigin: new google.maps.Point(
            data.markerSize / 2,
            data.markerSize + 4
          ),
        };
      }

      const label = markerData.pinLabel
        ? {
            text: markerData.pinLabel,
            color: "#000",
            fontSize: "14px",
            fontWeight: "bold",
          }
        : undefined;

      if (isMarkerPositionLegal(markerData)) {
        const position = new google.maps.LatLng(
          parseFloat(markerData.latitude),
          parseFloat(markerData.longitude)
        );

        const marker = new google.maps.Marker({
          position,
          icon,
          title: `${markerData.showName}`,
          optimized: false,
          map,
          label,
        });

        marker.info = markerData;
        tmpMarkers.push(marker);
      }
    });

    bounds.value = new google.maps.LatLngBounds();
    tmpMarkers.forEach((marker) => {
      bounds.value.extend(marker.getPosition());
      marker.addListener("click", (evt) => {
        openShowInfo(marker);

        if (marker && marker.info && marker.info.showName) {
          pushEvent(
            `[{ "event": "userAction", "eventAction": "Click on Map", "eventCategory": "Interactive Map", "eventLabel": "${marker.info.showName} - ${marker.info.city}"}]`
          );
        }
      });
    });

    markers.value = tmpMarkers;
  };

  const isMarkerPositionLegal = (marker) => {
    return (
      marker.showName &&
      marker.latitude &&
      marker.longitude &&
      parseFloat(marker.latitude) != NaN &&
      parseFloat(marker.longitude) != NaN &&
      parseFloat(marker.latitude) >= -90 &&
      parseFloat(marker.latitude) <= 90 &&
      parseFloat(marker.longitude) >= -180 &&
      parseFloat(marker.longitude) <= 180
    );
  };

  const clearClusters = () => {
    if (clusters.value) {
      clusters.value.clearMarkers();
    }
    clusters.value = null;
  };

  const createClusters = () => {
    clearClusters();

    const renderer = {
      render: ({ count, position }) =>
        new google.maps.Marker({
          label: { text: String(count), color: "white", fontSize: "14px" },
          position,
          icon: {
            url:
              data.clusterOptions && data.clusterOptions[0]
                ? data.clusterOptions[0].url
                : "https://raw.githubusercontent.com/googlemaps/js-marker-clusterer/gh-pages/images/m1.png",
            scaledSize:
              data.clusterOptions && data.clusterOptions[0]
                ? new google.maps.Size(
                    data.clusterOptions[0].width,
                    data.clusterOptions[0].height
                  )
                : new google.maps.Size(53, 53),
            labelOrigin:
              data.clusterOptions && data.clusterOptions[0]
                ? new google.maps.Point(
                    data.clusterOptions[0].width / 2,
                    data.clusterOptions[0].height / 2.5
                  )
                : new google.maps.Point(26, 21),
          },
          zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
        }),
    };

    clusters.value = new MarkerClusterer({
      map,
      markers: markers.value,
      renderer,
    });
  };

  const fitBounds = () => {
    if (!map || !bounds.value) return;

    map.fitBounds(bounds.value);
    var zoom = getZoom();
    if (zoom > 12) {
      map.setZoom(12);
    }
  };

  const centerOnMarker = (marker) => {
    if (!map || !marker) return;
    map.panTo(marker.getPosition());
  };

  const panTo = (lat, lng) => {
    if (!map || !lat || !lng) return;
    map.panTo({ lat, lng });
  };

  const setZoom = (zoom) => {
    if (!map || !zoom) return;
    map.setZoom(parseFloat(zoom));
  };

  const getZoom = () => {
    if (!map) return;
    return map.getZoom();
  };

  const openShowInfo = (marker) => {
    if (!marker || !marker.info) return;

    // Create InfoWindow Content
    instance.$props.markerData = marker.info;
    instance.$props.dateLocale = data.dateLocale.value;
    instance.$props.labelDirectionButton = data.labelDirectionButton.value;
    instance.$props.labelBuyButton = data.labelBuyButton.value;

    nextTick(() => {
      const options = {
        pixelOffset: marker ? null : new google.maps.Size(0, -50),
        content: instance.$el,
      };

      openInfoWindow(marker, options);
    });
  };

  const openInfoWindow = (anchor, options) => {
    infoWindow.setOptions(options);
    infoWindow.open({
      map,
      anchor,
    });
  };

  const closeInfoWindow = () => {
    infoWindow.close();
  };

  // https://developers.google.com/maps/documentation/javascript/geolocation
  const createLocationButton = () => {
    const locationButton = document.createElement("button");
    locationButton.ariaLabel = data.ariaLocateButton;
    locationButton.innerHTML = `
    <svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.3873 0.939606C9.06938 0.171571 7.53429 -0.138686 6.0215 0.0572265C4.50872 0.253139 3.1033 0.944205 2.02447 2.02264C0.945634 3.10107 0.25404 4.50622 0.0575599 6.01893C-0.13892 7.53165 0.170761 9.06685 0.938302 10.3851L6.28307 19.6372C6.33025 19.7198 6.39334 19.7922 6.46869 19.8503C6.54404 19.9083 6.63016 19.9508 6.72205 19.9754C6.87609 20.0166 7.0394 20.0058 7.18669 19.9448C7.33398 19.8837 7.45702 19.7758 7.53673 19.6377L12.878 10.3881C13.7983 8.80437 14.053 6.92023 13.5861 5.14895C13.1192 3.37768 11.9688 1.86389 10.3873 0.939606ZM12.3681 6.90817C12.3685 7.87495 12.112 8.82447 11.6248 9.65954L6.90737 17.8296L2.18842 9.65701C1.70554 8.82753 1.44964 7.88551 1.44647 6.92573C1.44329 5.96594 1.69295 5.02225 2.17033 4.1896C2.6477 3.35695 3.33596 2.66471 4.16584 2.18253C4.99572 1.70036 5.93796 1.44526 6.89775 1.44289C7.37068 1.44313 7.84159 1.50457 8.29875 1.62568C9.46505 1.93308 10.4968 2.61793 11.2329 3.57336C11.9691 4.52878 12.3682 5.70103 12.3681 6.90715V6.90817Z" fill="black"/>
      <path d="M6.90737 3.43528C5.98644 3.43528 5.10322 3.80112 4.45203 4.45232C3.80083 5.10352 3.43499 5.98673 3.43499 6.90766C3.43499 7.82859 3.80083 8.71181 4.45203 9.363C5.10322 10.0142 5.98644 10.38 6.90737 10.38C7.8283 10.38 8.71151 10.0142 9.36271 9.363C10.0139 8.71181 10.3797 7.82859 10.3797 6.90766C10.3797 5.98673 10.0139 5.10352 9.36271 4.45232C8.71151 3.80112 7.8283 3.43528 6.90737 3.43528ZM6.90737 8.93347C6.5068 8.93347 6.11523 8.81469 5.78217 8.59214C5.44911 8.3696 5.18952 8.05329 5.03623 7.68322C4.88294 7.31314 4.84284 6.90592 4.92098 6.51305C4.99913 6.12018 5.19202 5.75931 5.47527 5.47606C5.75851 5.19282 6.11938 4.99993 6.51225 4.92178C6.90512 4.84364 7.31234 4.88374 7.68242 5.03703C8.05249 5.19032 8.3688 5.44991 8.59134 5.78297C8.81389 6.11603 8.93267 6.5076 8.93267 6.90817C8.93267 7.44531 8.71929 7.96045 8.33947 8.34027C7.95965 8.72009 7.44451 8.93347 6.90737 8.93347Z" fill="black"/>
    </svg>`;
    locationButton.classList.add("location-button");
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(locationButton);

    locationButton.addEventListener("click", () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            const icon = {
              url: data.defaultLocationImg
                ? data.defaultLocationImg
                : locationImg,
              scaledSize: new google.maps.Size(30, 30),
            };
            const marker = new google.maps.Marker({
              position: pos,
              optimized: false,
              map,
              icon,
            });
            map.setCenter(pos);
            map.setZoom(8);
          },
          () => {
            console.warn("Error: The Geolocation service failed.");
          }
        );
      } else {
        console.warn("Error: Your browser doesn't support geolocation.");
      }
    });
  };

  const resetMapPosition = () => {
    if (data.fitMarkers) {
      // TODO: Find a better way to make fitBounds consistent
      if (markers.value && markers.value.length > 0) {
        fitBounds();
      } else {
        setZoom(2);
        panTo(40.866667, 34.566667);
      }
    } else if (data.center.value && data.zoom) {
      setZoom(data.zoom);
      panTo(data.center.value.lat, data.center.value.lng);
    }
  };

  onMounted(() => {
    instance.$mount();
    window.mapPushToDataLayer = (gtmEvent) => pushEvent(gtmEvent);

    nextTick(async () => {
      try {
        await loadMap();
        createLocationButton();

        if (data.markersData.value.length > 0) {
          createMarkers();
          if (data.hasCluster) {
            createClusters();
          }
          resetMapPosition();
        }

        watch(data.markersData, () => {
          createMarkers();
          if (data.hasCluster) {
            createClusters();
          }

          resetMapPosition();
        });

        watch(data.center, () => {
          resetMapPosition();
        });
      } catch (e) {
        console.warn("[useGoogleMap.js] error loading the sdk", e);
      }
    });
  });

  return {
    loadMap,
    closeInfoWindow,
    openInfoWindow,
    openShowInfo,
    setZoom,
    getZoom,
    centerOnMarker,
    createMarkers,
    clearMarkers,
    createClusters,
    resetMapPosition,
  };
}
