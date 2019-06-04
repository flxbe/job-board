import start from "./src/lib.js";

const filters = ["type", "location"];

const jobs = [
  {
    type: "fulltime",
    location: "Magdeburg"
  },
  {
    type: "fulltime",
    location: "Braunschweig"
  },
  {
    type: "parttime",
    location: "Magdeburg"
  },
  {
    type: "internship",
    location: "Hannover"
  }
];

const root = document.getElementById("jobs-root");
mount(root, filters, jobs);
