import filterJobs from "../src/filter.js";

describe("Filtering jobs", () => {
  describe("when every filter is empty", () => {
    test("should return all jobs", () => {
      const jobs = [createJob(), createJob()];
      const filters = {
        name: [],
        location: []
      };

      const filteredJobs = filterJobs(jobs, filters);

      expect(filteredJobs).toEqual(jobs);
    });
  });

  describe("when the job array is empty", () => {
    test("should return no job", () => {
      const jobs = [];
      const filters = {
        name: [],
        location: []
      };

      const filteredJobs = filterJobs(jobs, filters);

      expect(filteredJobs).toHaveLength(0);
    });
  });
});

function createJob() {
  return {
    name: "Job",
    location: "Magdeburg",
    type: "fulltime"
  };
}
