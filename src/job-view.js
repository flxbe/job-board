import { renderDetailedJob } from "./templates.js";

export default class JobView {
  constructor({ job, filterConfig, onGoBack }) {
    this.job = job;
    this.filterConfig = filterConfig;
    this.onGoBack = onGoBack;

    console.log(filterConfig);

    this.render();
  }

  render() {
    this.node = renderDetailedJob(this.job, this.filterConfig, this.onGoBack);
  }
}
