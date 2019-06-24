import { mount } from "../src/index.js";
import { getFilterContainer, getJobList } from "./page";

describe("Mounting the job filter", () => {
  test("should add the filter to the DOM", async () => {
    const node = await mountJobBoard();

    const filterContainerNode = getFilterContainer(node);

    expect(filterContainerNode).not.toBeNull();
  });

  test("should add the job list to the DOM", async () => {
    const node = await mountJobBoard();

    const jobListNode = getJobList(node);

    expect(jobListNode).not.toBeNull();
  });
});

export async function mountJobBoard({ filters, jobs } = {}) {
  filters = filters || [];
  jobs = jobs || [];

  const node = document.createElement("div");
  await mount(node, { filters, jobs });
  return node;
}
