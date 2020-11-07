const inquirer = require('inquirer')

const promptUser = async () => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'js',
      message: 'What will be extension for javascript file?',
      choices: ['.jsx', '.js', '.tsx', '.ts']
    },
    {
      type: 'list',
      name: 'css',
      message: 'What will be extension for css file?',
      choices: ['.scss', '.css', '.less', '.module.css']
    },
    {
      type: 'list',
      name: 'storybook',
      message: 'Do you want to add storybook file?',
      choices: ['Yes', 'No'],
      filter: function (val) {
        return val.toLowerCase()
      }
    },
    {
      type: 'list',
      name: 'test',
      message: 'Do you want test files?',
      choices: ['Yes', 'No'],
      filter: function (val) {
        return val.toLowerCase()
      }
    }
  ])
}

module.exports = promptUser
