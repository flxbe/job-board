import { renderCategoryFilter } from "./templates.js";

export default class FilterContainer {
  constructor(config, onChange) {
    this.config = config;
    this.onChange = onChange;
    this.filters = CategoryFilter.fromConfig(config, this.onChange);
    this.node = this.createNode();
  }

  createNode() {
    const node = document.createElement("div");
    node.classList += "col-md-3";
    node.id = "job-board-filter-container";

    this.filters.forEach(filter => node.appendChild(filter.node));

    return node;
  }

  getState() {
    const state = {};
    this.filters.forEach(
      filter => (state[filter.config.key] = filter.getState())
    );
    return state;
  }
}

class CategoryFilter {
  constructor(config, onChange) {
    this.config = config;
    this.onChange = onChange;

    this.node = renderCategoryFilter(config.title, config.options, onChange);
  }

  getState() {
    const state = Array.from(this.node.querySelectorAll("input"))
      .filter(node => node.checked)
      .map(node => node.id);

    return state;
  }
}

CategoryFilter.fromConfig = function(config, onChange) {
  return config.map(filterConfig => new CategoryFilter(filterConfig, onChange));
};
