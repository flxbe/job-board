import { renderJob } from "./templates.js";

export default class JobList {
  constructor(filterConfigs, onSelectJob) {
    this.filterConfigs = filterConfigs;
    this.onSelectJob = onSelectJob;
    this.node = this.createNode();
  }

  setJobs(jobs) {
    const nodes = jobs.map(job => this.renderJob(job));
    this.node.innerHTML = "";
    nodes.map(node => this.node.appendChild(node));
  }

  createNode() {
    const node = document.createElement("div");
    node.classList += "jb-col-lg-9";
    node.id = "job-board-job-list";
    return node;
  }

  renderJob(job) {
    return renderJob(job, this.filterConfigs, this.selectJob(job));
  }

  selectJob(job) {
    return () => {
      this.onSelectJob(job.id);
    };
  }
}
