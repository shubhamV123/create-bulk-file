const fs = require('fs-extra')
const path = require('path')
const chalkPipe = require('chalk-pipe')
const logSymbols = require('log-symbols')

const templates = require('../templates/template')
const fileMethods = require('../utils/fileMethods')

const { checkFileExist } = fileMethods

const createFiles = ({ data, input, flags }) => {
  const currentWorkingDirectory = path.resolve(process.cwd(), flags.path)
  const directoryToCreate = `${currentWorkingDirectory}/${input[0]}`
  checkFileExist(directoryToCreate)
    .then((exist) => {
      if (exist) {
        throw Error('Path exist')
      } else {
        return fs.ensureDir(directoryToCreate)
      }
    })
    .then(async () => {
      const filePromiseList = []
      const isTemplateFileExist = await checkFileExist(
        `${currentWorkingDirectory}/.crc/template.js`
      )
      let finalTemplate = templates
      if (isTemplateFileExist) {
        finalTemplate = require(`${currentWorkingDirectory}/.crc/template.js`)
      }
      // create files
      for (const extension of Object.values(data)) {
        filePromiseList.push(
          fs.outputFile(
            path.join(directoryToCreate, `index${extension}`),
            finalTemplate[`${extension.slice(1)}`] ? finalTemplate[`${extension.slice(1)}`](input[0]) : ''
          )
        )
      }

      return Promise.all(filePromiseList)
    })
    .then(() => console.log(logSymbols.success, 'Files created successfully'))
    .catch((e) => {
      console.log(logSymbols.error, chalkPipe('red.underline')(e))
      if (e.message !== 'Path exist') {
        fs.remove(directoryToCreate)
      }
    })
}
module.exports = createFiles
