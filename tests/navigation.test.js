import * as Job from "./job-builder";
import * as page from "./page";

import { createJobBoard, getFirstJob, getJobFilterAttributes } from "./page";

describe("Navigating to a detailed job", () => {
  test("should update the url", () => {
    const rootUrl = "/dir/test.html";
    const jobs = [Job.create()];
    const { board, onNavigate } = createJobBoard({ jobs, rootUrl });

    selectJob(board, 0);
    const expectedLocation = `/dir/test.html?job_id=${jobs[0].id}`;
    expect(onNavigate).toHaveBeenCalledWith(expectedLocation);
  });
});

function selectJob(board, index) {
  const jobNode = page.getFirstJob(board.node);
  jobNode.click();
}
