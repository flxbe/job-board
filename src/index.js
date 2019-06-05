import mount from "./lib.js";

const loremIpsum =
  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.";

const filters = ["name", "type", "location"];

const jobs = [
  {
    id: 1,
    name: "Software Entwickler/in",
    type: "fulltime",
    location: "Magdeburg",
    description: loremIpsum
  },
  {
    id: 2,
    name: "Maschinenbauingenieur/in",
    type: "fulltime",
    location: "Braunschweig",
    description: loremIpsum
  },
  {
    id: 3,
    name: "Software Entwickler/in",
    type: "parttime",
    location: "Magdeburg",
    description: loremIpsum
  },
  {
    id: 4,
    name: "Designer/in",
    type: "internship",
    location: "Hannover",
    description: loremIpsum
  }
];

const root = document.getElementById("jobs-root");
mount(root, filters, jobs);
