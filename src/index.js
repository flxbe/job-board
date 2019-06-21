import { getFilterConfig } from "./filter.js";
import JobBoard from "./job-board.js";

export async function mount(node, options = {}) {
  const { jobs, filters } = await loadData(options);
  const filterConfigs = getFilterConfig(jobs, filters);

  new JobBoard(node, jobs, filterConfigs);
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
