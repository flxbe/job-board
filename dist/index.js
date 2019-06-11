const JSON_SOURCE = "./jobs.json";

const root = document.getElementById("jobs-root");
JobBoard.mount(root, { source: JSON_SOURCE });
