const path = require('path');
const fs = require('fs');

const gs_folder = '.greenseer-graphql';
const gs_folder_path = path.resolve(process.cwd(), gs_folder);

const gs_config_file = 'config';
const gs_config_file_path = path.resolve(process.cwd(), gs_folder, gs_config_file);

const gs_available_at = (cwd) => {
  const gs_available_at_folder = path.resolve(cwd, gs_folder);
  const gs_available_at_config_file = path.resolve(cwd, gs_folder, gs_config_file);

  return fs.existsSync(gs_available_at_folder) && fs.existsSync(gs_available_at_config_file);
}

const find_nearest_gs = (cwd) => {
  var add_path = '';
  for (var i = 0; i < 4; i ++ ) {
    const new_path = path.resolve(cwd, add_path);
    if (gs_available_at(new_path)) {
      return new_path;
    }
    else {
      add_path += '../';
    }
  }
  return false;
}

const nearest_gs_path = find_nearest_gs(process.cwd());
const nearest_gs_folder_path = path.resolve(nearest_gs_path, gs_folder);
const nearest_gs_config_file_path = path.resolve(nearest_gs_path, gs_folder, gs_config_file);

module.exports = {
  gs_folder_path,
  gs_config_file_path,
  nearest_gs_path,
  nearest_gs_folder_path,
  nearest_gs_config_file_path,
}