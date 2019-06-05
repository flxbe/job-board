import FilterView from "./filter-view.js";
import JobView from "./job-view.js";

export function mount(node, filters, jobs) {
  const filterConfig = getFilterConfig(jobs, filters);

  function onUpdateFilters(newFilters) {}

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
  return ({ key, title }) => ({
    key,
    title,
    options: getUniqueCategories(jobs, key)
  });
}

function getUniqueCategories(jobs, key) {
  const categories = jobs.map(job => job[key]);
  return [...new Set(categories)];
}
