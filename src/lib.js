import FilterContainer from "./filter-container.js";
import JobList from "./job-list.js";
import filterJobs from "./filter.js";

export default function mount(node, filters, jobs) {
  function update() {
    const filteredJobs = filterJobs(jobs, filterContainer.getState());
    jobList.setJobs(filteredJobs);
  }

  const filterConfig = getFilterConfig(jobs, filters);
  const jobList = new JobList();
  const filterContainer = new FilterContainer(filterConfig, update);
  const rootNode = initializeRootNode(node, filterContainer, jobList);

  update();
}

function getFilterConfig(jobs, filters) {
  return filters.map(extractFilterConfig(jobs));
}

function extractFilterConfig(jobs) {
  return filterName => ({
    name: filterName,
    options: getUniqueCategories(jobs, filterName)
  });
}

function getUniqueCategories(jobs, filterName) {
  const categories = jobs.map(job => job[filterName]);
  return [...new Set(categories)];
}

function initializeRootNode(node, filterContainer, jobList) {
  node.classList += "jobs-container";
  node.appendChild(filterContainer.node);
  node.appendChild(jobList.node);
  return node;
}
