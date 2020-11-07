const chalkPipe = require('chalk-pipe')

const modifyConfigData = (data) => {
  for (const key in data) {
    if (key === 'storybook') {
      if (data[key] === 'yes') {
        data[key] = '.storybook.js'
      } else {
        delete data[key]
      }
    }
    if (key === 'test') {
      if (data[key] === 'yes') {
        data[key] = '.test.js'
      } else {
        delete data[key]
      }
    }
  }
  return data
}
// used to log errors to the console in red color
const errorLog = (error) => {
  const eLog = chalkPipe('red.underline')(error)
  throw Error(eLog)
}
module.exports = {
  modifyConfigData,
  errorLog
}
