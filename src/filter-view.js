import FilterContainer from "./filter-container.js";
import JobList from "./job-list.js";
import filterJobs from "./filter.js";

export default class FilterView {
  constructor({ filterConfig, jobs, onUpdateFilter, onSelectJob }) {
    this.filterConfig = filterConfig;
    this.jobs = jobs;
    this.onUpdateFilter = onUpdateFilter;
    this.onSelectJob = onSelectJob;

    this._handleFilterUpdate = () => this.updateResults();

    this.jobList = new JobList(filterConfig, onSelectJob);

    this.filterContainer = new FilterContainer(
      filterConfig,
      this._handleFilterUpdate
    );

    this.render();
  }

  updateResults() {
    const filters = this.filterContainer.getState();
    const filteredJobs = filterJobs(this.jobs, filters);
    this.jobList.setJobs(filteredJobs);

    this.onUpdateFilter(filters);
  }

  render() {
    this.node = document.createElement("div");
    this.node.id = "job-board-filter-view";
    this.node.classList.add("jb-container");

    const row = document.createElement("div");
    row.classList.add("jb-row");

    row.appendChild(this.filterContainer.node);
    row.appendChild(this.jobList.node);

    this.node.appendChild(row);

    this.updateResults();
  }
}
