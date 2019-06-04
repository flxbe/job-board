export default class JobList {
  constructor() {
    this.node = this.createNode();
  }

  setJobs(jobs) {
    const nodes = jobs.map(printJob);
    this.node.innerHTML = "";
    nodes.map(node => this.node.appendChild(node));
  }

  createNode() {
    const node = document.createElement("div");
    node.classList += "results-container";
    return node;
  }
}

function printJob(job) {
  const jobNode = document.createElement("div");
  jobNode.classList += "card mb-3";

  jobNode.innerHTML = `
  <div class="card-header">
    Job Result Fulltime: ${job.fulltime}
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Cras justo odio</li>
    <li class="list-group-item">Dapibus ac facilisis in</li>
    <li class="list-group-item">Vestibulum at eros</li>
  </ul> 
  `;

  return jobNode;
}
