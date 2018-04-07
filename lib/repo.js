const fs = require('fs');
const readlineSync = require('readline-sync');
const { gs_folder_path, gs_config_file_path } = require('./const');
const env = require('./env');

const check = (verbose) => {
  if (fs.existsSync(gs_folder_path) && fs.existsSync(gs_config_file_path)) {
    return true;
  }
  else {
    if (verbose) {
      console.log("Application is not initialized. Please run greenseer-graphql init");
    }
    return false;
  }
}

const init = (force) => {
  if (!fs.existsSync(gs_folder_path)) {
    fs.mkdirSync(gs_folder_path);
  }

  if (!fs.existsSync(gs_config_file_path) || force ) {
    const new_env = env.add_display();
  
    const config = {
      environments: [ new_env ],
      default_environment: new_env.name,
    };

    write(config);
    console.log("Configuration completed");
  } else {
    console.log(`Application already initialized!`);
  }
}

const read = () => {
  if (check()) {
    return JSON.parse(fs.readFileSync(gs_config_file_path));
  }
  return false;
}

const write = (data) => {
  fs.writeFileSync(gs_config_file_path, JSON.stringify(data));
}

module.exports = {
  check,
  init,
  read,
  write,
}