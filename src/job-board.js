import FilterView from "./filter-view.js";
import JobView from "./job-view.js";

const QUERY_PARAMETR = "job_id";

export default class JobBoard {
  constructor(node, jobs, filterConfigs) {
    this.node = node;
    this.jobs = jobs;
    this.filterConfigs = filterConfigs;

    this._goToJobView = id => this.goToJobView(id);
    this._goToFilterView = () => this.goToFilterView();

    window.addEventListener("popstate", event => {
      this.updateLocation(event.target.location);
    });

    this.updateLocation(window.location);
  }

  goToJobView(jobId) {
    history.pushState({}, "Job", `index.html?${QUERY_PARAMETR}=${jobId}`);
    this.updateLocation(window.location);
  }

  goToFilterView() {
    history.pushState({}, "FilterView", "index.html");
    this.updateLocation(window.location);
  }

  updateLocation(location) {
    const target = parseLocation(location);
    this.render(target);
  }

  render(target) {
    const view = this.renderView(target);
    this.mountView(view);
  }

  renderView(target) {
    if (target.view === FILTER) {
      return this.renderFilterView();
    } else {
      return this.renderJobView(target.id);
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

  renderJobView(jobId) {
    const job = this.jobs.find(job => job.id == jobId);
    return new JobView({
      job,
      filterConfig: this.filterConfigs,
      onGoBack: this._goToFilterView
    });
  }

  mountView(view) {
    this.node.innerHTML = "";
    this.node.classList.add("job-board");

    const container = document.createElement("div");
    container.classList.add("jb-container");
    container.appendChild(view.node);

    this.node.appendChild(container);

    /*
    if (this.view) {
      this.view.node.replaceWith(view.node);
    } else {
      this.node.appendChild(view.node);
    }
    */

    this.view = view;
  }
}

function parseLocation(location) {
  const params = parseQuery(location.search);

  if (params[QUERY_PARAMETR]) {
    const id = params[QUERY_PARAMETR];
    return GoToJobView(id);
  } else {
    return GoToFilterView();
  }
}

const FILTER = 0;
const JOB = 1;

function GoToFilterView() {
  return {
    view: FILTER
  };
}

function GoToJobView(id) {
  return {
    view: JOB,
    id
  };
}

function parseQuery(queryString) {
  queryString = queryString[0] === "?" ? queryString.substr(1) : queryString;
  const pairs = queryString.split("&").filter(item => item.length);

  const query = {};
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split("=");
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
  }

  return query;
}
