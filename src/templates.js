export function renderJob(job) {
  const node = document.createElement("div");
  node.classList += "card mb-3";

  node.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">${job.name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">
        ${job.type} in 
        ${job.location}
      </h6>
      <p class="card-text">${job.description}</p>
    </div>
  `;

  return node;
}

export function renderCategoryFilter(name, options, onChange) {
  const node = document.createElement("div");
  node.classList += "card mb-3";

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

  node.querySelectorAll("input").forEach(input => (input.onchange = onChange));

  return node;
}
