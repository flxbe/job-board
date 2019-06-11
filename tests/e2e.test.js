import { mountJobBoard, getFilterContainer, getJobList } from "./page";

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
