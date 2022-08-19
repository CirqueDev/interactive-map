import { jest } from "@jest/globals";
import { DateRangePicker } from "../src/index";
import { shallowMount } from "@vue/test-utils";

describe("Mounted DateRangePicker", () => {
  let wrapper;

  const createComponent = () => {
    wrapper = shallowMount(DateRangePicker, {
      propsData: {
        defaultDate: new Date(2022, 1, 1),
        pickerId: "picker__test",
      },
    });
  };

  afterEach(() => {
    if (wrapper && wrapper.destroy) wrapper.destroy();
  });

  const findMonthName = () => wrapper.find(".month__name span");
  const findNextMonthButton = () => wrapper.find(".month-selector--next");
  const findPreviousMonthButton = () =>
    wrapper.find(".month-selector--previous");
  const findFirstActiveDate = () => wrapper.find(".day--active-first");
  const findLastActiveDate = () => wrapper.find(".day--active-last");
  const findActiveDates = () => wrapper.findAll(".day--active");
  const findDate = (date) => wrapper.find(".day--" + date);
  const findSaveButton = () => wrapper.find(".date-range-picker__save");
  const findResetButton = () => wrapper.find(".date-range-picker__reset");
  const dayNumberClass = ".day__number";

  it("should generate February month on init", () => {
    createComponent();

    expect(findMonthName().text()).toBe("February 2022");
    expect(findDate("28").exists()).toBe(true);
    expect(findDate("29").exists()).toBe(false);
  });

  it("should change to next month on 'next month' button click", async () => {
    createComponent();

    await findNextMonthButton().trigger("click");

    expect(findMonthName().text()).toBe("March 2022");
  });

  it("should change to previous month on 'previous month' button click", async () => {
    createComponent();

    await findPreviousMonthButton().trigger("click");

    expect(findMonthName().text()).toBe("January 2022");
  });

  it("should create a range of date when clicking on 2 date", async () => {
    createComponent();

    await findDate("15").trigger("click");

    expect(findFirstActiveDate().find(dayNumberClass).text()).toBe("15");
    expect(findLastActiveDate().exists()).toBe(false);

    await findDate("18").trigger("click");

    expect(findFirstActiveDate().find(dayNumberClass).text()).toBe("15");
    expect(findActiveDates().at(1).find(dayNumberClass).text()).toBe("16");
    expect(findActiveDates().at(2).find(dayNumberClass).text()).toBe("17");
    expect(findLastActiveDate().find(dayNumberClass).text()).toBe("18");

    expect(findActiveDates().length).toBe(4);

    await findDate("22").trigger("click");
    expect(findFirstActiveDate().find(dayNumberClass).text()).toBe("22");
    expect(findLastActiveDate().exists()).toBe(false);

    await findDate("21").trigger("click");
    expect(findFirstActiveDate().find(dayNumberClass).text()).toBe("21");
    expect(findLastActiveDate().find(dayNumberClass).text()).toBe("22");

    expect(findActiveDates().length).toBe(2);
  });

  it("should disable save button when there's no end date and show it when there is", async () => {
    createComponent();
    expect(findSaveButton().element.disabled).toBe(true);
    await findDate("22").trigger("click");
    expect(findSaveButton().element.disabled).toBe(false);
    await findDate("22").trigger("click");
    expect(findSaveButton().element.disabled).toBe(false);
  });

  it("should on clear button click unselect the current range and emit empty dates", async () => {
    createComponent();
    await findDate("22").trigger("click");
    await findDate("23").trigger("click");
    expect(findFirstActiveDate().exists()).toBe(true);
    expect(findLastActiveDate().exists()).toBe(true);

    await findResetButton().trigger("click");
    expect(findFirstActiveDate().exists()).toBe(false);
    expect(findLastActiveDate().exists()).toBe(false);
    expect(findSaveButton().element.disabled).toBe(true);

    expect(wrapper.emitted().datechanged[0]).toEqual([
      { start: null, end: null },
    ]);
  });

  it("should on save button click emit the selected dates", async () => {
    createComponent();
    await findDate("22").trigger("click");
    await findDate("23").trigger("click");
    await findSaveButton().trigger("click");

    expect(wrapper.emitted().datechanged[0]).toEqual([
      { start: "2022-02-21T23:59:00", end: "2022-02-23T23:59:59" },
    ]);
  });
});
