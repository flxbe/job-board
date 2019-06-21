import { getFilterConfig } from "./filter.js";
import JobBoard from "./job-board.js";

export async function mount(node, options = {}) {
  const { jobs, filters } = await loadData(options);
  const filterConfigs = getFilterConfig(jobs, filters);

  function onNavigate(target) {
    history.pushState({}, "", target);
    jobBoard.updateLocation(window.location);
  }

  const jobBoard = new JobBoard(
    node,
    jobs,
    filterConfigs,
    onNavigate,
    window.location.pathname
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
