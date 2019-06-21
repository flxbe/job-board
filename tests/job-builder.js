export function create(options = {}) {
  options.id = options.id || id();

  return options;
}

function id() {
  return Date.now();
}
