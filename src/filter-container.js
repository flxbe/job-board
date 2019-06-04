export default class FilterContainer {
  constructor(config, onChange) {
    this.config = config;
    this.onChange = onChange;
    this.filters = CategoryFilter.fromConfig(config, this.onChange);
    this.node = this.createNode();
  }

  createNode() {
    const node = document.createElement("div");
    node.classList += "filter-container";
    this.filters.forEach(filter => node.appendChild(filter.node));
    return node;
  }

  getState() {
    const state = {};
    this.filters.forEach(filter => (state[filter.name] = filter.getState()));
    return state;
  }
}

class CategoryFilter {
  constructor(name, options, onChange) {
    this.name = name;
    this.options = options;
    this.onChange = onChange;

    this.createNode();
  }

  createNode() {
    this.node = document.createElement("div");
    this.node.classList += "card";

    let innerHTML = `
      <div class="card-header">
        ${this.name}
      </div> 
      <div class="card-body">
    `;

    for (let option of this.options) {
      innerHTML += `
      <div class="custom-control custom-checkbox">
        <input
          type="checkbox"
          class="custom-control-input"
          id="${option}"
        />
        <label class="custom-control-label" for="${option}"
          >${option}</label
        >
      </div>
    `;
    }

    innerHTML += "</div>";

    this.node.innerHTML = innerHTML;

    this.node
      .querySelectorAll("input")
      .forEach(input => (input.onchange = this.onChange));
  }

  getState() {
    const state = Array.from(this.node.querySelectorAll("input"))
      .filter(node => node.checked)
      .map(node => node.id);

    return state;
  }
}

CategoryFilter.fromConfig = function(config, onChange) {
  return config.map(
    ({ name, options }) => new CategoryFilter(name, options, onChange)
  );
};

function createFilterContainerNode() {
  const node = document.createElement("div");
  node.classList += "filter-container";
  return node;
}
