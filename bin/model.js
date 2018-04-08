const model = require('../lib/model');

if (process.argv.length < 4) {

} else {
  switch (process.argv[3]) {
    case 'add': model.add(); break;
    case 'list': model.list(); break;
  }
}