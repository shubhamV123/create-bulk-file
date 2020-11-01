const fs = require("fs-extra");

const readJsonFile = (path = "./.crc.json") => {
  return fs.readJSON(path);
};
const checkFileExist = (path = "./.crc.json") => {
  return fs.pathExists(path);
};
const writeJsonFile = ({ name = "./.crc.json", data }) =>
  fs.writeJson(name, data, { spaces: "\t" });

module.exports = {
  readJsonFile,
  checkFileExist,
  writeJsonFile,
};
