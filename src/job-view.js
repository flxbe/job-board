export default class JobView {
  constructor(job, onGoBack) {
    this.job = job;
    this.onGoBack = onGoBack;

    this.render();
  }

  render() {
    this.node = document.createElement("div");
    const job = this.job;

    this.node.innerHTML = `
      <div>
        <nav class="nav">
          <a class="nav-link" href="#">Zurück</a>
        </nav>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${job.name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">
              ${job.type} in 
              ${job.location}
            </h6>
            <p class="card-text">${job.description}</p>
          </div>
        </div>
      <div>
    `;

    this.node.querySelector("a").onclick = this.onGoBack;
  }
}
