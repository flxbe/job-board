import { mount } from "../src/index.js";
import JobBoard from "../src/job-board.js";
import { getFilterConfig } from "../src/filter.js";

export async function mountJobBoard({ filters, jobs } = {}) {
  filters = filters || [];
  jobs = jobs || [];

  const node = document.createElement("div");
  await mount(node, { filters, jobs });
  return node;
}

export function createJobBoard({ filters, jobs, onNavigate, rootUrl } = {}) {
  filters = filters || [];
  jobs = jobs || [];
  onNavigate = onNavigate || jest.fn();
  rootUrl = rootUrl || "test.html";

  const node = document.createElement("div");
  const filterConfigs = getFilterConfig(jobs, filters);
  const board = new JobBoard(node, jobs, filterConfigs, onNavigate, rootUrl);

  return {
    filters,
    jobs,
    onNavigate,

    node,
    board
  };
}

export function getFilterContainer(node) {
  return node.querySelector("#job-board-filter-container");
}

export function getFilterNodes(board) {
  const filterContainer = getFilterContainer(board);
  return filterContainer.children;
}

export function getFilterTitle(filter) {
  return filter.querySelector(".job-board-filter-title").textContent;
}

export function getJobList(node) {
  return node.querySelector("#job-board-job-list");
}

export function getFirstJob(node) {
  return node.querySelector(".job-board-job");
}

export function getJobFilterAttributes(jobNode) {
  return jobNode.querySelectorAll(".job-board-job-filter-attribute");
}
