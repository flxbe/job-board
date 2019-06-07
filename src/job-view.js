import { renderDetailedJob } from "./templates.js";

export default class JobView {
  constructor({ job, onGoBack }) {
    this.job = job;
    this.onGoBack = onGoBack;

    this.render();
  }

  render() {
    this.node = renderDetailedJob(this.job, this.onGoBack);
  }
}
