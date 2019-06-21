import { getFilterConfig } from "./filter.js";
import Location from "./location.js";
import FilterView from "./filter-view.js";
import JobView from "./job-view.js";

export default class JobBoard {
  constructor(node, jobs, filters, onNavigate, location) {
    this.node = node;
    this.jobs = jobs;
    this.filters = filters;
    this.filterConfigs = getFilterConfig(jobs, filters);
    this.onNavigate = onNavigate;
    this.location = location;

    this._goToJobView = id => this.goToJobView(id);
    this._goToFilterView = () => this.goToFilterView();

    this.resetRootNode();
    this.render();
  }

  resetRootNode() {
    this.node.innerHTML = "";
    this.node.classList.add("job-board");
  }

  goToJobView(jobId) {
    this.navigate(Location.toJobView(jobId));
  }

  goToFilterView() {
    this.navigate(Location.toFilterView());
  }

  navigate(location) {
    this.updateLocation(location);
    this.onNavigate(location);
  }

  updateLocation(location) {
    this.location = location;
    this.render();
  }

  render() {
    const view = this.renderView();
    const viewContainer = wrapView(view);
    this.mountView(viewContainer);
  }

  renderView() {
    if (this.location.isFilterLocation()) {
      return this.renderFilterView();
    } else {
      return this.renderJobView();
    }
  }

  renderFilterView() {
    return new FilterView({
      filterConfigs: this.filterConfigs,
      jobs: this.jobs,
      onUpdateFilter: () => {},
      onSelectJob: this._goToJobView
    });
  }

  renderJobView() {
    const job = this.jobs.find(job => job.id == this.location.jobId);
    return new JobView({
      job,
      filterConfig: this.filterConfigs,
      onGoBack: this._goToFilterView
    });
  }

  mountView(view) {
    if (this.view) {
      this.view.replaceWith(view);
    } else {
      this.node.appendChild(view);
    }

    this.view = view;
  }
}

function wrapView(view) {
  const container = document.createElement("div");
  container.classList.add("jb-container");
  container.appendChild(view.node);

  return container;
}
