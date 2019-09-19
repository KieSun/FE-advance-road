import { mount } from "@vue/test-utils";
import Loading from "@/components/loading.vue";

describe("Loading.vue", () => {
  it("renders props.msg when passed", () => {
    const wrapper = mount(Loading, {
      propsData: {
        text: "Loading",
        indicatorColor: "red",
        size: 20
      }
    });
    const indicatorStyle = wrapper.find(".loading__indicator").element.style;
    expect(wrapper.find(".loading__text").text()).toBe("Loading");
    expect(indicatorStyle.borderColor).toContain("red");
    expect(indicatorStyle.width).toContain("20px");
  });
  it("snapshot", () => {
    const wrapper = mount(Loading, {
      propsData: {
        text: "Loading",
        indicatorColor: "red",
        size: 20
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
});
