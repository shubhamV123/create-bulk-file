const fs = require('fs-extra')

const readJsonFile = (path = './.crc/.crc.json') => {
  return fs.readJSON(path)
}
const checkFileExist = (path = './.crc/.crc.json') => {
  return fs.pathExists(path)
}
const makeDirectory = (path = '.crc/') => fs.ensureDir(path)

const writeJsonFile = ({ name = './.crc/.crc.json', data }) => {
  return makeDirectory().then(() => fs.writeJson(name, data, { spaces: '\t' }))
}
const copyFile = (from, to) => fs.copy(from, to)
module.exports = {
  readJsonFile,
  checkFileExist,
  writeJsonFile,
  makeDirectory,
  copyFile
}
