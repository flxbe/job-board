export function renderDetailedJob(job, onGoBack) {
  const node = document.createElement("div");

  node.innerHTML = `
      <div>
        <nav class="nav">
          <a class="nav-link" href="#">Zurück</a>
        </nav>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${job.title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">
              ${job.location}
            </h6>
            <p class="card-text">${job.description}</p>
          </div>
        </div>
      <div>
    `;

  node.querySelector("a").onclick = () => {
    onGoBack();
    return false;
  };

  return node;
}

export function renderJob(job, onSelect) {
  const node = document.createElement("div");
  node.classList +=
    "jb-shadow-sm jb-shadow-hover jb-transition-base jb-rounded jb-mb-4";
  node.style.cursor = "pointer";
  node.onclick = onSelect;

  node.innerHTML = `
    <div class="jb-p-3">
      <h4 class="jb-text-primary jb-font-weight-light">${job.title}</h4>
      <h5 class="jb-text-dark jb-font-weight-normal jb-mb-2">
        ${job.company},
        <span class="jb-font-weight-light">${job.location}</span>
      </h5>
      <div class="jb-mt-2">
        <span class="jb-badge jb-badge-secondary">${job.type}</span>
        <span class="jb-badge jb-badge-secondary">${job.department}</span>
      </div>
      <hr class=""></hr>
      <p class="jb-text-dark jb-font-weight-light">${job.description}</p>
    </div>
  `;

  return node;
}

export function renderCategoryFilter(title, options, onChange) {
  const node = document.createElement("div");
  node.classList += "jb-shadow-sm jb-rounded jb-mb-4";

  let innerHTML = `
      <div class="jb-p-3 jb-bg-light jb-rounded-top">
        <h5 class="jb-text-dark jb-font-weight-light jb-mb-0">${title}</h5>
      </div> 
      <div class="jb-p-3">
    `;

  for (let option of options) {
    innerHTML += `
      <div class="custom-control custom-checkbox">
        <input
          type="checkbox"
          class="custom-control-input"
          id="${option}"
        />
        <label class="custom-control-label jb-text-dark jb-font-weight-light" for="${option}"
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
