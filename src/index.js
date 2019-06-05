import FilterView from "./filter-view.js";
import JobView from "./job-view.js";

export function mount(node, filters, jobs) {
  const filterConfig = getFilterConfig(jobs, filters);

  function onUpdateFilters(newFilters) {
    console.log(newFilters);
  }

  function mountFilterView() {
    const view = new FilterView(
      filterConfig,
      jobs,
      onUpdateFilters,
      mountJobView
    );
    mountView(view);
  }

  function mountJobView(id) {
    const job = jobs.find(job => job.id == id);
    const view = new JobView(job, mountFilterView);
    mountView(view);
  }

  function mountView(view) {
    node.innerHTML = "";
    node.appendChild(view.node);
  }

  mountFilterView();
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
