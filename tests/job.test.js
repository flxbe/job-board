import * as Job from "./job-builder";

import { mountJobBoard, getFirstJob, getJobFilterAttributes } from "./page";

const jobTypeFilter = {
  key: "type",
  title: "Jobtyp"
};

const departmentFilter = {
  key: "department",
  title: "Abteilung"
};

const job1 = Job.create({
  title: "Job 1",
  company: "Company 1",
  location: "Magdeburg",
  description: "Lorem ipsum",

  type: "Vollzeit",
  department: "Fertigung"
});

const job2 = Job.create({
  title: "Job 2",
  company: "Company 1",
  location: "Magdeburg",
  description: "Lorem ipsum",

  type: "Teilzeit"
});

describe("Rendering a job", () => {
  test("should render all filter attributes of the job", async () => {
    const filters = [jobTypeFilter, departmentFilter];
    const jobs = [job1];
    const board = await mountJobBoard({ filters, jobs });

    const jobRendered = getFirstJob(board);
    const filteredAttributes = getJobFilterAttributes(jobRendered);

    expect(filteredAttributes.length).toBe(2);
    expect(filteredAttributes[0].textContent).toBe(job1[jobTypeFilter.key]);
    expect(filteredAttributes[1].textContent).toBe(job1[departmentFilter.key]);
  });

  describe("when job has not all filter attributes", () => {
    test("should only render existing filter attributes", async () => {
      const filters = [jobTypeFilter, departmentFilter];
      const jobs = [job2];
      const board = await mountJobBoard({ filters, jobs });

      const jobRendered = getFirstJob(board);
      const filteredAttributes = getJobFilterAttributes(jobRendered);

      expect(filteredAttributes.length).toBe(1);
      expect(filteredAttributes[0].textContent).toBe(job2[jobTypeFilter.key]);
    });
  });
});
