const repo = require('./repo');
const { connection } = require('./connection');
const env = require('./env');

const schema = async (table) => {
  if (repo.check(true)) {
    const config = repo.read();
    const default_env = config.environments.find(env => config.default_environment == env.name);
    const sequelize = connection(default_env);
    const query_interface = sequelize.getQueryInterface();
    const result = await query_interface.describeTable(table);

    console.log("----------------------------")
    console.log(Object.keys(result).map(key => `${key}: ${type(result[key].type, 0)}`).join("\n"));
    console.log("----------------------------")
    console.log(Object.keys(result).map(key => `${key}: Sequelize.${type(result[key].type, 1)}`).join(",\n"));
    process.exit(1);
    // return [
    //   Object.keys(result).map(key => `${key}: ${type(result[key].type, 0)}`).join("\n"),
    //   Object.keys(result).map(key => `${key}: Sequelize.${type(result[key].type, 1)}`).join(",\n"),
    // ];
  }
}

const type_filter = {
  INT: ["Int", "INTEGER" ],
  VARCHAR: ["String", "STRING"],
  TEXT: ["String", "STRING"],
  DECIMAL: ["Float", "FLOAT"],
  TIMESTAMP: ["String", "DATE"],
  TINYINT: ['Boolean', "BOOLEAN"],
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



module.exports = {
  schema,
}