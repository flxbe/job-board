import FilterContainer from "./filter-container.js";
import JobList from "./job-list.js";

const FILTER_CONFIG = {
  fulltime: ["fulltime", "parttime", "internship"]
};

const JOBS = [
  {
    fulltime: true
  },
  {
    fulltime: true
  },
  {
    fulltime: false
  }
];

let filter = {
  fulltime: false
};

function start(node) {
  const filterContainer = new FilterContainer(FILTER_CONFIG);
  const jobList = new JobList();
  const rootNode = initializeRootNode(node, filterContainer.node, jobList.node);

  function update() {
    const filteredJobs = filterJobs(JOBS, filter);
    jobList.setJobs(filteredJobs);
  }

  update();
}

function initializeRootNode(node, filterNode, jobsNode) {
  node.classList += "jobs-container";
  node.appendChild(filterNode);
  node.appendChild(jobsNode);
  return node;
}

function filterJobs(jobs, filter) {
  return jobs.filter(job => job.fulltime == filter.fulltime);
}

const rootNode = document.getElementById("jobs-root");
start(rootNode);
