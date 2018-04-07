const env = require('../lib/env');

if (process.argv.length < 4) {

} else {
  switch (process.argv[3]) {
    case 'list': env.list(); break;
    case 'add': env.add(); break;
    case 'remove': env.remove(); break;
    case 'set-default': env.set_default(); break;
    case 'check': env.check(); break;
  }
}