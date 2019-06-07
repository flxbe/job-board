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


export function getFilterConfig(jobs, filters) {
  return filters.map(extractFilterConfig(jobs));
}

function extractFilterConfig(jobs) {
  return ({ key, title }) => ({
    key,
    title,
    options: getUniqueCategories(jobs, key)
  });
}

function getUniqueCategories(jobs, key) {
  const categories = jobs.map(job => job[key]);
  return [...new Set(categories)];
}