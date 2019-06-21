import Location from "./location.js";
import { getFilterConfig } from "./filter.js";
import JobBoard from "./job-board.js";

export async function mount(node, options = {}) {
  const { jobs, filters } = await loadData(options);
  const filterConfigs = getFilterConfig(jobs, filters);
  const pathname = window.location.pathname;

  window.addEventListener("popstate", event => {
    const location = Location.fromBrowserLocation(event.target.location);
    jobBoard.updateLocation(location);
  });

  function onNavigate(location) {
    history.pushState({}, "", location.toURL(pathname));
  }

  const location = Location.fromBrowserLocation(window.location);

  const jobBoard = new JobBoard(
    node,
    jobs,
    filterConfigs,
    onNavigate,
    location
  );
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
