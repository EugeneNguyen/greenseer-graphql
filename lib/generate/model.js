var Inflector = require('inflected');

const repo = require('../repo');
const env = require('../env');
const fs = require('fs');
const { connection } = require('../connection');
const { type_filter, type, table_description, write } = require('./helper');

const model = async (table) => {
  if (repo.check(true)) {
    if (table == '-a') {
      const config = repo.read();
      if (config.models) {
        for (var i = 0; i < config.models.length; i ++) {
          const model_config = config.models[i];
          const description = await table_description(model_config.table);
          const filename = `${model_name(model_config.table)}.js`;
          write(filename, structure(model_config.table, description));
          console.log(`Generated table ${model_config.table} to ${filename}`);
        }
      }
      process.exit(1);
    }

    const description = await table_description(table);
    if (isOutput()) {
      const filename = `${model_name(table)}.js`;
      write(filename, structure(table, description));
      console.log(`Generated table ${table} to ${filename}`);
    } else {
      console.log(description);
      console.log("\n");
      console.log(structure(table, description));
      console.log("\n");
    }
    process.exit(1);
  }
}

const model_name = (table) => {
  return Inflector.singularize(Inflector.camelize(table));
}

const structure = (table, description) => {
  const model_name_string = model_name(table);
  var result = `import Sequelize from 'sequelize';\n`;
  result += `import sequelize from '../connections/mysql';\n\n`;
  result += `const ${model_name_string} = sequelize.define('${table}', {\n`

  result += Object.keys(description).
    filter(key => exclude_keys.indexOf(key) == -1).
    map(key => `  ${key}: Sequelize.${type(description[key].type, 1)}`).
    join(",\n") + `\n`;

  if (description.created_at || description.updated_at) {
    result += `}, {\n`;
    if (description.created_at) {
      result += `  createdAt: 'created_at',\n`
    }
    if (description.updated_at) {
      result += `  updatedAt: 'updated_at',\n`
    }
  }

  result += `});\n\n`
  result += `export default ${model_name_string};`;
  return result;
}

const isOutput = () => {
  return process.argv.some(arg => arg == '-o');
}


const exclude_keys = [ "id", "created_at", "updated_at" ];

module.exports = {
  model
}