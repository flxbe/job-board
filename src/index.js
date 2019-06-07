import { getFilterConfig } from "./filter.js";
import FilterView from "./filter-view.js";
import JobView from "./job-view.js";

const QUERY_PARAMETR = "job_id";

export function mount(node, filters, jobs) {
  const filterConfig = getFilterConfig(jobs, filters);

  window.addEventListener("popstate", event => {
    render(event.target.location);
  });

  function onUpdateFilters(newFilters) {}

  function selectJob(id) {
    history.pushState({}, "Job", `index.html?${QUERY_PARAMETR}=${id}`);
    render(window.location);
  }

  function goToFilterView() {
    history.pushState({}, "FilterView", "index.html");
    render(window.location);
  }

  function render(location) {
    const target = parseLocation(location);

    if (target.view === FILTER) {
      mountFilterView();
    } else {
      mountJobView(target.id);
    }
  }

  function mountFilterView() {
    const view = new FilterView(
      filterConfig,
      jobs,
      onUpdateFilters,
      selectJob
    );
    mountView(view);
  }

  function mountJobView(id) {
    const job = jobs.find(job => job.id == id);
    const view = new JobView(job, goToFilterView);
    mountView(view);
  }

  function mountView(view) {
    node.innerHTML = "";
    node.appendChild(view.node);
  }

  render(window.location);
}

const FILTER = 0;
const JOB = 1;

function parseLocation(location) {
  const params = parseQuery(location.search);

  if (params[QUERY_PARAMETR]) {
    const id = params[QUERY_PARAMETR];
    return GoToJobView(id);
  } else {
    return GoToFilterView();
  }
}

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
      var pair = pairs[i].split('=');
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }

  return query;
}
