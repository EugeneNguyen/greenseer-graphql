const path = require('path');
const fs = require('fs');

const repo = require('../repo');
const { connection } = require('../connection');
const env = require('../env');

const write = (filename, data) => {
  const write_path = path.resolve(process.cwd(), filename);
  fs.writeFileSync(write_path, data);
}

const type_filter = {
  INT: ["Int", "INTEGER" ],
  VARCHAR: ["String", "STRING"],
  TEXT: ["String", "STRING"],
  DECIMAL: ["Float", "FLOAT"],
  TIMESTAMP: ["String", "DATE"],
  TINYINT: ['Boolean', "BOOLEAN"],
  DATE: ["String", "DATE"],
}

const type = (type_string, type) => {
  return Object.keys(type_filter).reduce((result, key) => {
    if (type_string.indexOf(key) !== -1) {
      return type_filter[key][type];
    } else {
      return result;
    }
  }, false);
}

const table_description = async (table) => {
  const config = repo.read();
  const default_env = env.default_env(config);
  const sequelize = connection(default_env);
  const query_interface = sequelize.getQueryInterface();
  return await query_interface.describeTable(table);
}

const all_schemas = async (table) => {
  const config = repo.read();
  const default_env = env.default_env(config);
  const sequelize = connection(default_env);
  const query_interface = sequelize.getQueryInterface();
  return await query_interface.showAllSchemas();
}

module.exports = {
  table_description,
  all_schemas,
  type_filter,
  type,
  write
}