import Location from "../src/location.js";
import JobBoard from "../src/job-board.js";

export function createJobBoard({ filters, jobs, onNavigate, location } = {}) {
  filters = filters || [];
  jobs = jobs || [];
  onNavigate = onNavigate || jest.fn();
  location = location || Location.toFilterView();

  const rootNode = document.createElement("div");
  const board = new JobBoard(rootNode, jobs, filters, onNavigate, location);

  return {
    filters,
    jobs,
    onNavigate,
    location,

    rootNode,
    board
  };
}

export function selectJob(board, index) {
  const nodes = board.node.querySelectorAll(".job-board-job");
  const jobNode = nodes[index];
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

export function getDetailedJobTitle(node) {
  return node.querySelector(".job-board-job-detailed .job-board-job-title")
    .textContent;
}

export function getDetailedJobFilterAttributes(node) {
  return node.querySelectorAll(
    ".job-board-job-detailed .job-board-filter-attribute"
  );
}

export function getDetailedJobCoreAttributes(node) {
  return node.querySelectorAll(
    ".job-board-job-detailed .job-board-core-attribute"
  );
}

export function getDetailedJobCtaButton(node) {
  return node.querySelector(".job-board-job-cta-button");
}
