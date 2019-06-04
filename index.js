import FilterContainer from "./filter-container.js";
import JobList from "./job-list.js";
import filterJobs from "./filter.js";

const FILTER_CONFIG = {
  type: ["fulltime", "parttime", "internship"]
};

const JOBS = [
  {
    type: "fulltime"
  },
  {
    type: "fulltime"
  },
  {
    type: "parttime"
  },
  {
    type: "internship"
  }
];

function start(node) {
  function update() {
    const filteredJobs = filterJobs(JOBS, filterContainer.getState());
    jobList.setJobs(filteredJobs);
  }

  const jobList = new JobList();
  const filterContainer = new FilterContainer(FILTER_CONFIG, update);
  const rootNode = initializeRootNode(node, filterContainer, jobList);

  update();
}

function initializeRootNode(node, filterContainer, jobList) {
  node.classList += "jobs-container";
  node.appendChild(filterContainer.node);
  node.appendChild(jobList.node);
  return node;
}

const rootNode = document.getElementById("jobs-root");
start(rootNode);
