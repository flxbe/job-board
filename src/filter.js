export default function filterJobs(jobs, filters) {
  return jobs.filter(job => {
    return Object.entries(filters)
      .map(validateJob(job))
      .every(isTrue);
  });
}

function validateJob(job) {
  return ([name, values]) => values.length === 0 || values.includes(job[name]);
}

function isTrue(value) {
  return value === true;
}
