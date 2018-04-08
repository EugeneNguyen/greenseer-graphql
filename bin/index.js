#!/usr/bin/env node
var { helper } = require('./help');

if (process.argv.length > 2) {
  switch (process.argv[2]) {
    case 'init':
      require('./init');
      break;
    case 'env':
      require('./env');
      break;
    case 'generate':
      require('./generate');
      break;
    case 'model': 
      require('./model');
      break;
  }
} else {
  helper('all');
}