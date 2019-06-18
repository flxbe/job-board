import * as Job from "./job-builder";

import { getFilterConfig } from "../src/filter";

describe("Deriving the filter configs", () => {
  describe("when a job does not have a certain attribute", () => {
    test("should not include an `undefined` option", () => {
      const jobs = [
        Job.create({ department: "some department" }),
        Job.create()
      ];
      const filters = [{ key: "department", title: "Department" }];

      const configs = getFilterConfig(jobs, filters);

      const expectedConfigs = [
        {
          key: "department",
          title: "Department",
          options: ["some department"]
        }
      ];

      expect(configs).toEqual(expectedConfigs);
    });
  });
});
