export default class FilterContainer {
  constructor(config) {
    this.filters = CategoryFilter.fromConfig(config);
    this.node = this.createNode();
  }

  createNode() {
    const node = document.createElement("div");
    node.classList += "filter-container";
    this.filters.forEach(filter => node.appendChild(filter.node));
    return node;
  }
}

class CategoryFilter {
  constructor(name, options) {
    this.name = name;
    this.options = options;

    this.node = createFilterNode(name, options);
  }
}

CategoryFilter.fromConfig = function(config) {
  return Object.entries(config).map(
    ([name, options]) => new CategoryFilter(name, options)
  );
};

function createFilterNode(name, options) {
  const node = document.createElement("div");
  node.classList += "card";

  let innerHTML = `
    <div class="card-header">
      ${name}
    </div> 
    <div class="card-body">
  `;

  for (let option of options) {
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

  node.innerHTML = innerHTML;

  return node;
}

function createFilterContainerNode() {
  const node = document.createElement("div");
  node.classList += "filter-container";
  return node;
}
