// Third party package
const path = require('path')

// Local package
const promptUser = require('./module/userPrompt')
const createFiles = require('./module/createFiles')
const fileMethods = require('./utils/fileMethods')
const helpers = require('./utils/helpers')
const startCli = require('./module/startCli')

// Local destructuring
const { modifyConfigData, errorLog } = helpers
const { checkFileExist, readJsonFile, writeJsonFile, copyFile: copyTemplateFile } = fileMethods

const cli = startCli

if (cli.input.length === 0) {
  errorLog('Folder name required')
}
try {
  if (cli.input.length > 1) {
    errorLog('only one argument can be accepted')
  } else {
    checkFileExist()
      .then((exist) => {
        if (exist) {
          // Read config file
          return readJsonFile()
        } else {
          return promptUser().then(async (data) => {
            // Modify data ask from user
            data = modifyConfigData(data) // Create json file in directory
            await writeJsonFile({ data })
            await copyTemplateFile(path.join(__dirname, 'templates'), './.crc/')
            return data
          })
        }
      })
      .then((data) => {
        createFiles({ data, input: cli.input, flags: cli.flags })
      })
  }
} catch (e) {
  console.log(e)
}
