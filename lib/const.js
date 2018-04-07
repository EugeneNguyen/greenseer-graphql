const path = require('path');

const gs_folder = '.greenseer-graphql';
const gs_folder_path = path.resolve(process.cwd(), gs_folder)

const gs_config_file = 'config';
const gs_config_file_path = path.resolve(process.cwd(), gs_folder, gs_config_file);

module.exports = {
  gs_folder_path,
  gs_config_file_path,
}