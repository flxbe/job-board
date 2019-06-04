import filterJobs from "./src/filter.js";

describe("filtering jobs", () => {
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
});

function createJob() {
  return {
    name: "Job",
    location: "Magdeburg",
    type: "fulltime"
  };
}
