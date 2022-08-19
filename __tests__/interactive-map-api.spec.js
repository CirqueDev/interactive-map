import { jest } from "@jest/globals";
import { InteractiveMapApi, InteractiveMap } from "../src/index";
import { shallowMount } from "@vue/test-utils";
import flushPromises from "flush-promises";

describe("Mounted InteractiveMapApi", () => {
  const mapApiKey = process.env.VITE_MAP_API_KEY;
  let wrapper;

  const createComponent = (props) => {
    wrapper = shallowMount(InteractiveMapApi, {
      stubs: ["interactive-map"],
      propsData: props,
    });
  };

  beforeEach(() => {
    fetch.mockClear();
  });

  afterEach(() => {
    if (wrapper && wrapper.destroy) wrapper.destroy();
  });

  const findChildInteractiveMap = () => wrapper.findComponent(InteractiveMap);

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          content: {
            Result: {
              shows: [
                {
                  showId: 270,
                  showName: "Messi 10",
                  showPageUrl: null,
                  showLogo: null,
                  showThumbnail: null,
                  showImage: null,
                  showType: "OTHER",
                  runs: [
                    {
                      id: 13479,
                      city: "Buenos Aires",
                      country: "Argentina",
                      countryCode: "AR",
                      facility: "Costanera Sur",
                      latitude: "-34.62108300000000000000",
                      longitude: "-58.35352000000000000000",
                      startDate: "2023-03-09T00:00:00",
                      endDate: "2023-03-26T00:00:00",
                      offers: [],
                      tickets: [
                        {
                          ticketTypeCode: "RegularTicketsTicketType",
                          title: "Regular Tickets",
                          descriptions: "All tickets categories",
                          startingPrice: null,
                          endingPrice: null,
                          ticketPriceCurrencyCode: null,
                          links: [
                            {
                              code: "Select",
                              value:
                                "https://ventas.areaticket.com.ar/event?p=E3E90992638259FC7529DDFDDAD726A767B86BDFD1504539",
                            },
                          ],
                        },
                      ],
                    },
                    {
                      id: 13480,
                      city: "Buenos Aires #2",
                      country: "Argentina #2",
                      countryCode: "AR",
                      facility: "Costanera Sur",
                      latitude: "-34.62108300000000000000",
                      longitude: "-58.35352000000000000000",
                      startDate: "2023-03-09T00:00:00",
                      endDate: "2023-03-26T00:00:00",
                      offers: [],
                      tickets: [
                        {
                          ticketTypeCode: "RegularTicketsTicketType",
                          title: "Regular Tickets",
                          descriptions: "All tickets categories",
                          startingPrice: null,
                          endingPrice: null,
                          ticketPriceCurrencyCode: null,
                          links: [
                            {
                              code: "Select",
                              value:
                                "https://ventas.areaticket.com.ar/event?p=E3E90992638259FC7529DDFDDAD726A767B86BDFD1504539",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        }),
    })
  );

  it("should fail silently when the API call fail", async () => {
    fetch.mockImplementationOnce(() => Promise.reject("API is down"));

    createComponent({
      googleMapApiKey: mapApiKey,
      mapId: "test-id",
      apiUrl: "fail-url",
    });

    expect(findChildInteractiveMap().props("markersData").length).toBe(0);
  });

  it("should fail silently when there's no apiUrl props", async () => {
    createComponent({
      googleMapApiKey: mapApiKey,
      mapId: "test-id",
      apiUrl: "",
    });

    await flushPromises();

    expect(findChildInteractiveMap().props("markersData").length).toBe(0);
  });

  it("should populate show data when api call is successfull", async () => {
    createComponent({
      googleMapApiKey: mapApiKey,
      mapId: "test-id",
      apiUrl: "pass-url",
    });

    await flushPromises();

    expect(findChildInteractiveMap().props("markersData").length).toBe(2);
  });
});
