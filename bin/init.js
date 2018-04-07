const repo = require('../lib/repo');

const init = () => {
  const force = process.argv.some((arg) => arg == '--force');
  repo.init(force);
}

init();