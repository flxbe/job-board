const QUERY_PARAMETR = "job_id";
const FILTER = 0;
const JOB = 1;

export default class Location {
  constructor(type, jobId) {
    this.type = type;
    this.jobId = jobId;
  }

  isFilterLocation() {
    return this.type === FILTER;
  }

  isJobLocation() {
    return this.type === JOB;
  }

  toURL(pathname) {
    if (this.isFilterLocation()) {
      return pathname;
    } else {
      return `${pathname}?${QUERY_PARAMETR}=${this.jobId}`;
    }
  }
}

Location.fromBrowserLocation = function(browserLocation) {
  const params = parseQuery(browserLocation.search);

  if (params[QUERY_PARAMETR]) {
    const id = params[QUERY_PARAMETR];
    return Location.toJobView(id);
  } else {
    return Location.toFilterView();
  }
};

function parseQuery(queryString) {
  queryString = queryString[0] === "?" ? queryString.substr(1) : queryString;
  const pairs = queryString.split("&").filter(item => item.length);

  const query = {};
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split("=");
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
  }

  return query;
}

Location.toFilterView = function() {
  return new Location(FILTER);
};

Location.toJobView = function(jobId) {
  return new Location(JOB, jobId);
};
