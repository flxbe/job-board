import Location from "../src/location.js";
import JobBoard from "../src/job-board.js";
import { getFilterConfig } from "../src/filter.js";

export function createJobBoard({ filters, jobs, onNavigate } = {}) {
  filters = filters || [];
  jobs = jobs || [];
  onNavigate = onNavigate || jest.fn();
  const location = Location.toFilterView();

  const node = document.createElement("div");
  const filterConfigs = getFilterConfig(jobs, filters);
  const board = new JobBoard(node, jobs, filterConfigs, onNavigate, location);

  return {
    filters,
    jobs,
    onNavigate,

    node,
    board
  };
}

export function selectJob(board, index) {
  const jobNode = getFirstJob(board);
  jobNode.click();
}

export function isOnFilterView(board) {
  const node = board.node.querySelector("#job-board-filter-view");
  return node !== null;
}

export function isOnJobView(board) {
  const node = board.node.querySelector("#job-board-job-view");
  return node !== null;
}

export function getFilterNodes(board) {
  const filterContainer = getFilterContainer(board.node);
  return filterContainer.children;
}

export function getFilterContainer(node) {
  return node.querySelector("#job-board-filter-container");
}

export function getFilterTitle(filter) {
  return filter.querySelector(".job-board-filter-title").textContent;
}

export function getJobList(node) {
  return node.querySelector("#job-board-job-list");
}

export function getFirstJob(board) {
  return board.node.querySelector(".job-board-job");
}

export function getJobFilterAttributes(jobNode) {
  return jobNode.querySelectorAll(".job-board-job-filter-attribute");
}
