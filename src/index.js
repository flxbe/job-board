import { getFilterConfig } from "./filter.js";
import FilterView from "./filter-view.js";
import JobView from "./job-view.js";

const QUERY_PARAMETR = "job_id";

export async function mount(node, options = {}) {
  const { jobs, filters } = await loadData(options);
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
    const view = new FilterView({
      filterConfig,
      jobs,
      onUpdateFilter: onUpdateFilters,
      onSelectJob: selectJob
    });
    mountView(view);
  }

  function mountJobView(id) {
    const job = jobs.find(job => job.id == id);
    const view = new JobView({
      job,
      onGoBack: goToFilterView
    });
    mountView(view);
  }

  function mountView(view) {
    node.innerHTML = "";
    node.classList.add("job-board");
    node.appendChild(view.node);
  }

  render(window.location);
}

async function loadData({ source, jobs, filters }) {
  if (source) {
    return loadJSON(source);
  } else {
    return { jobs, filters };
  }
}

async function loadJSON(source) {
  const response = await fetch(source);

  if (!response.ok) {
    throw new Error("HTTP error " + response.status);
  }

  return response.json();
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
    var pair = pairs[i].split("=");
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
  }

  return query;
}
