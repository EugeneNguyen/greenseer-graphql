const fs = require('fs');
const readlineSync = require('readline-sync');

const { gs_folder_path, gs_config_file_path } = require('./const');
const { connection } = require('./connection');
const repo = require('./repo');

const list = () => {
  if (repo.check(true)) {
    const config = repo.read();
    const { environments, default_environment } = config;
    if (!environments) {
      console.log("No environment defined. Please run greenseer-graphql env add");
      return false;
    } else {
      environments.map((env, index) => {
        console.log(`[${index}] ${env.name} ${env.name == default_environment ? '(default)' : ''}`)
      });
      return true;
    }
  }
}

const add = () => {
  if (repo.check(true)) {
    const config = repo.read();
    const { environments, default_environment } = config;
    const first_env = environments == undefined;

    if (first_env) {
      const new_env = add_display();
      config.environments = [ new_env ];
      config.default_environment = new_env.name;
    } else {
      const default_env = environments.find(env => env.name == default_environment);
      const new_env = add_display(default_env);
      config.environments.push(new_env);
    }
    repo.write(config);
    list();
  }
}

const remove = () => {
  if (list()) {
    const remove_index = readlineSync.question(`Index of env that you want to remove: `);
    if (!isNaN(parseInt(remove_index))) {
      const config = repo.read();
      config.environments = config.environments.filter((env, index) => index != remove_index);
      repo.write(config);
      list();
    }
  }
}

const set_default = () => {
  if (list()) {
    const default_index = readlineSync.question(`Index of env that you want to set to default: `);
    if (!isNaN(parseInt(default_index))) {
      const config = repo.read();
      config.default_environment = config.environments[default_index].name;
      repo.write(config);
      list();
    }
  }
}

const check = async (env_name) => {
  if (repo.check(true)) {
    const config = repo.read();
    const { environments, default_environment } = config;
    const env = env_name ? environments.find(env => env.name == env_name) : default_env(config);
    const sequelize = connection(env);
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      process.exit(1);
    }
    catch (error) {
      console.error('Unable to connect to the database: ', error.message);
      process.exit(1);
    }
  }
}

const default_env = (config) => {
  if (repo.check(false)) {
    const config = repo.read();
    const { environments, default_environment } = config;
    return environments.find(env => env.name == default_environment);
  }
}

const add_display = (default_env) => {
  console.log(`Start config new environment`);

  if (default_env) {
    var env_name = readlineSync.question(`Evn name: `);
    var db_host = readlineSync.question(`DB Host [${default_env.host}]: `, { defaultInput: default_env.host });
    var db_username = readlineSync.question(`DB Username: [${default_env.username}]: `, { defaultInput: default_env.username });
    var db_password = readlineSync.question(`DB Password: [${default_env.password}]: `, { defaultInput: default_env.password });
    var db_database = readlineSync.question(`DB Database: [${default_env.database}]: `, { defaultInput: default_env.database });
    return {
      name: env_name,
      host: db_host,
      username: db_username,
      password: db_password,
      database: db_database,
    }
  } else {
    var env_name = readlineSync.question(`Evn name: `);
    var db_host = readlineSync.question(`DB Host: `);
    var db_username = readlineSync.question(`DB Username: `);
    var db_password = readlineSync.question(`DB Password: `);
    var db_database = readlineSync.question(`DB Database: `);
    return {
      name: env_name,
      host: db_host,
      username: db_username,
      password: db_password,
      database: db_database,
    }
  }
}

module.exports = {
  list,
  add,
  add_display,
  remove,
  set_default,
  check,
  default_env,
}