const repo = require('../repo');
const { connection } = require('../connection');
const env = require('../env');
const { type_filter, type, table_description } = require('./helper');

const schema = async (table) => {
  if (repo.check(true)) {
    const result = await table_description(table);
    console.log('-----------------------------------');
    console.log(Object.keys(result).map(key => `${key}: ${type(result[key].type, 0)}`).join("\n"));
    console.log('-----------------------------------');
    process.exit(1);
  }
}

module.exports = {
  schema
}