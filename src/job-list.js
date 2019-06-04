import { renderJob } from "./templates.js";

export default class JobList {
  constructor() {
    this.node = this.createNode();
  }

  setJobs(jobs) {
    const nodes = jobs.map(renderJob);
    this.node.innerHTML = "";
    nodes.map(node => this.node.appendChild(node));
  }

  createNode() {
    const node = document.createElement("div");
    node.classList += "results-container";
    return node;
  }
}
