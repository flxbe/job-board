export function renderDetailedJob(job, filterConfig, onGoBack) {
  const node = document.createElement("div");
  node.id = "job-board-job-view";

  const coreAttributes =
    createCoreAttribute("Firma", job.company) +
    "\n" +
    createCoreAttribute("Ort", job.location);

  const filterAttributes = filterConfig
    .map(filterItem => {
      if (job[filterItem.key]) {
        return `<h6 class="jb-text-dark job-board-filter-attribute">${
          filterItem.title
        } <span class="jb-font-weight-light">${
          job[filterItem.key]
        }</span></h6>\n`;
      } else return "";
    })
    .join("");

  let ctaButton = "";
  if (job.callToAction) {
    let href = "";
    if (job.callToAction.mail) {
      href = "mailto:" + job.callToAction.mail;
    } else if (job.callToAction.link) {
      href = job.callToAction.link;
    }

    ctaButton = `<a class="jb-btn jb-btn-secondary job-board-job-cta-button" href="${href}" target="blank_">${
      job.callToAction.name
    }</a>`;
  }

  node.innerHTML = `
      <div>
        <nav class="jb-mb-4">
          <a href="#"><h5 class="jb-font-weight-light">Zurück</h5></a>
        </nav>
        <div class="jb-bg-light jb-rounded jb-shadow-sm jb-p-3 jb-p-sm-4 jb-p-lg-5 job-board-job-detailed">
          <h2 class="jb-text-dark jb-font-weight-light jb-mb-4 job-board-job-title">${
            job.title
          }</h5>
          <div class="jb-mb-3">
            ${filterAttributes}
          </div>
          <div class="jb-mb-4">
            ${coreAttributes}
          </div>
          <p class="jb-text-dark jb-font-weight-light jb-mb-0">${
            job.description
          }</p>
          <div class="jb-mt-4">
            ${ctaButton}
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

function createCoreAttribute(name, value) {
  return `
    <div class="jb-d-inline-block jb-bg-white jb-rounded jb-shadow-sm jb-py-2 jb-px-3 jb-mt-2">
      <h6 class="jb-text-dark jb-mb-0 job-board-core-attribute">
        ${name}
        </br>
        <span class="jb-font-weight-light jb-text-primary">${value}</span>
      </h6>
    </div>`;
}

export function renderJob(job, filterConfig, onSelect) {
  const node = document.createElement("div");
  node.classList +=
    "jb-shadow-sm jb-shadow-hover jb-transition-base jb-rounded jb-mb-4 job-board-job";
  node.style.cursor = "pointer";
  node.onclick = onSelect;

  const badges = filterConfig
    .map(filterItem => {
      if (job[filterItem.key]) {
        return `<span class="jb-badge jb-badge-secondary job-board-job-filter-attribute">${
          job[filterItem.key]
        }</span>\n`;
      } else return "";
    })
    .join("");

  node.innerHTML = `
    <div class="jb-p-3 jb-p-sm-4 jb-p-lg-5">
      <h4 class="jb-text-primary jb-font-weight-light jb-mb-3">${job.title}</h4>
      <h5 class="jb-text-dark jb-font-weight-normal jb-mb-2">
        ${job.company} 
        <span class="jb-font-weight-light">${job.location}</span>
      </h5>
      <div class="jb-mb-2">
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
        <h5 class="jb-text-secondary jb-font-weight-light jb-mb-0 job-board-filter-title">${title}</h5>
      </div> 
      <div class="jb-p-3">
    `;

  for (let option of options) {
    innerHTML += `
      <div class="jb-custom-checkbox jb-mb-1">
        <input
          type="checkbox"
          class="jb-custom-checkbox-input"
          id="${option}"
        />
        <label class="jb-custom-checkbox-label jb-text-secondary jb-font-weight-light" for="${option}"
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
