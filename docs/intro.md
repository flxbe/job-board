---
id: intro
title: Getting Started
---

JobBoard is a client side JavaScript library to generate a beautiful and feature-rich presentation of job offers with minimal manual effort.

It includes a powerful filter view and can be easily configured.

## Installation

JobBoard is available as a pre-build JavaScript and CSS package from a CDN.

### JS

```html
<script src="todo" integrity="todo" crossorigin="anonymous"></script>
```

### CSS

```html
<link rel="stylesheet" href="todo" integrity="todo" crossorigin="anonymous" />
```

## Starter Template

Use this HTML template to easily get started with a minimal JobBoard setup:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link
      rel="stylesheet"
      href="todo"
      integrity="todo"
      crossorigin="anonymous"
    />
    <title>Job Board Example</title>
  </head>
  <body>
    <div id="jobs-root"></div>

    <script src="todo" integrity="todo" crossorigin="anonymous"></script>
    <script>
      const filters = [
        {
          key: "type",
          title: "Type"
        }
      ];
      const jobs = [
        {
          id: 1,
          title: "Frontend Developer",
          company: "Your Company",
          location: "Magdeburg",
          description: "Lorem ipsum",
          type: "Fulltime"
        },
        {
          id: 2,
          title: "Backend Developer",
          company: "Your Company",
          location: "Magdeburg",
          description: "Lorem ipsum",
          type: "Parttime"
        }
      ];

      const root = document.getElementById("jobs-root");
      JobBoard.mount(root, { filters, jobs });
    </script>
  </body>
</html>
```
