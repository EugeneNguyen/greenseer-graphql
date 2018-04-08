const fs = require('fs');
const readlineSync = require('readline-sync');
const repo = require('./repo');

const { all_schemas } = require('./generate/helper');

const add = async () => {
  const config = repo.read();
  const models = config.models || [];
  if (process.argv[4]) {
    models.push({
      table: process.argv[4]
    });
  } else {
    const model = await add_display({ exclude_tables: models.map(models => models.table) });
    model.map(m => models.push(m));
  }
  
  repo.write({ ...config, models });
  process.exit(1);
}

const list = () => {
  const config = repo.read();
  if (config.models) {
    config.models.map((model, index) => {
      console.log(`[${index}] ${model.table}`);
    });
  } else {
    console.log("No model added. Please run gsg model add")
  }
}

const add_display = async ({ exclude_tables }) => {
  console.log(`All schema which not added: `);

  const schemas = (await all_schemas()).map(schema => table_name(schema)).filter(schema => exclude_tables.every(exclude_table => exclude_table != schema));
  schemas.map((schema, index) => {
    console.log(`[${index}] ${schema}`);
  });

  const indexes_string = readlineSync.question(`Which index that you want to add: `);
  const indexes = indexes_string.split(',').map(index_string => index_string.trim());

  return indexes.map(index => ({
    table: schemas[index]
  }));
}

const table_name = (schema) => {
  const keys = Object.keys(schema);
  const key = keys[0];
  return schema[key];
}

module.exports = {
  add,
  list
}