export function renderDetailedJob(job, filterConfig, onGoBack) {
  const node = document.createElement("div");

  const coreAttributes =
    createCoreAttribute("Firma", job.company) +
    "\n" +
    createCoreAttribute("Ort", job.location);

  const filterAttributes = filterConfig
    .map(filterItem => {
      if (job[filterItem.key]) {
        return `<h5 class="jb-text-secondary">${
          filterItem.title
        } <span class="jb-font-weight-light">${
          job[filterItem.key]
        }</span></h5>\n`;
      } else return "";
    })
    .join("");

  node.innerHTML = `
      <div>
        <nav class="jb-mb-4">
          <a href="#"><h5 class="jb-font-weight-normal">Zurück</h5></a>
        </nav>
        <div class="jb-bg-light jb-rounded jb-shadow-sm jb-p-3 jb-p-sm-4 jb-p-lg-5">
          <h2 class="jb-text-secondary jb-font-weight-light jb-mb-2">${
            job.title
          }</h5>
          <div class="jb-mb-4">
            ${coreAttributes}
          </div>
          <div class="jb-mb-4">
            ${filterAttributes}
          </div>
          <p class="jb-text-secondary jb-font-weight-light jb-mb-0">${
            job.description
          }</p>
        </div>
      <div>
    `;

  node.querySelector("a").onclick = () => {
    onGoBack();
    return false;
  };

  return node;
}

function createCoreAttribute(name, value) {
  return `
    <div class="jb-d-inline-block jb-bg-white jb-rounded jb-shadow-sm jb-py-2 jb-px-3 jb-mt-2">
      <h5 class="jb-text-dark jb-mb-0">
        ${name}
        </br>
        <span class="jb-font-weight-light jb-text-primary">${value}</span>
      </h5>
    </div>`;
}

export function renderJob(job, filterConfig, onSelect) {
  const node = document.createElement("div");
  node.classList +=
    "jb-shadow-sm jb-shadow-hover jb-transition-base jb-rounded jb-mb-4";
  node.style.cursor = "pointer";
  node.onclick = onSelect;

  const badges = filterConfig
    .map(filterItem => {
      if (job[filterItem.key]) {
        return `<span class="jb-badge jb-badge-secondary">${
          job[filterItem.key]
        }</span>\n`;
      } else return "";
    })
    .join("");

  node.innerHTML = `
    <div class="jb-p-4">
      <h4 class="jb-text-primary jb-font-weight-light">${job.title}</h4>
      <h5 class="jb-text-dark jb-font-weight-normal jb-mb-2">
        ${job.company},
        <span class="jb-font-weight-light">${job.location}</span>
      </h5>
      <div class="jb-mt-2">
        ${badges}
      </div>
      <p class="jb-text-secondary jb-font-weight-light jb-mt-4 jb-mb-0">${
        job.description
      }</p>
    </div>
  `;

  return node;
}

export function renderCategoryFilter(title, options, onChange) {
  const node = document.createElement("div");
  node.classList += "jb-shadow-sm jb-rounded jb-mb-4";

  let innerHTML = `
      <div class="jb-p-3 jb-bg-light jb-rounded-top">
        <h5 class="jb-text-secondary jb-font-weight-light jb-mb-0">${title}</h5>
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
