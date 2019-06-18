import { mountJobBoard, getFirstJob, getJobFilterAttributes } from "./page";

const filterCategory1 = {
  key: "type",
  title: "Jobtyp"
};
const filterCategory2 = {
  key: "department",
  title: "Abteilung"
};
const job1 = {
  id: 1,
  title: "Job 1",
  company: "Company 1",
  location: "Magdeburg",
  description: "Lorem ipsum",

  type: "Vollzeit",
  department: "Fertigung"
};
const job2 = {
  id: 2,
  title: "Job 2",
  company: "Company 1",
  location: "Magdeburg",
  description: "Lorem ipsum",

  type: "Teilzeit"
};

describe("Rendering a job", () => {
  test("should render all filter attributes of the job", async () => {
    const board = await mountJobBoard({
      filters: [filterCategory1, filterCategory2],
      jobs: [job1]
    });
    const jobRendered = getFirstJob(board);
    const filteredAttributes = getJobFilterAttributes(jobRendered);

    expect(filteredAttributes.length).toBe(2);
    expect(filteredAttributes[0].textContent).toBe(job1[filterCategory1.key]);
    expect(filteredAttributes[1].textContent).toBe(job1[filterCategory2.key]);
  });

  describe("when job has not all filter attributes", () => {
    test("should only render filter attribute the job has", async () => {
      const board = await mountJobBoard({
        filters: [filterCategory1, filterCategory2],
        jobs: [job2]
      });
      const jobRendered = getFirstJob(board);
      const filteredAttributes = getJobFilterAttributes(jobRendered);

      expect(filteredAttributes.length).toBe(1);
      expect(filteredAttributes[0].textContent).toBe(job2[filterCategory1.key]);
    });
  });
});
