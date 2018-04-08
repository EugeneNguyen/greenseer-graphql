const generate = require('../lib/generate');

if (process.argv.length < 4) {

} else {
  switch (process.argv[3]) {
    case 'schema': generate.schema(process.argv[4]); break;
    case 'model': generate.model(process.argv[4]); break;
  }
}