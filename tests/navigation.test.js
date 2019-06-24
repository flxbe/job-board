import * as Job from "./job-builder";

import { createJobBoard, selectJob, isOnFilterView, isOnJobView } from "./page";

describe("Navigating to a job", () => {
  test("should call the onNavigate callback function", () => {
    const jobs = [Job.create()];
    const { board, onNavigate } = createJobBoard({ jobs });

    selectJob(board, 0);

    expect(onNavigate).toHaveBeenCalled();
  });

  test("should return the correct location", () => {
    const jobs = [Job.create()];
    const { board, onNavigate } = createJobBoard({ jobs });

    selectJob(board, 0);

    const location = onNavigate.mock.calls[0][0];
    expect(location.isJobLocation()).toBeTruthy();
    expect(location.jobId).toEqual(jobs[0].id);
  });

  test("should render the detailed job view", () => {
    const jobs = [Job.create()];
    const { board } = createJobBoard({ jobs });

    expect(isOnFilterView(board)).toBeTruthy();

    selectJob(board, 0);

    expect(isOnJobView(board)).toBeTruthy();
  });
});
