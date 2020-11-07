const meow = require('meow')

const cli = meow(
  `
      Usage
        $ cf <folder name> <options>
  
      Options
      -- path, -p path to create components
  
      Examples
        $ cf block -p=your path (if you want to specify path)
        $ cf test
  `,
  {
    flags: {
      path: {
        type: 'string',
        alias: 'p',
        default: './'
      }
    }
  }
)

module.exports = cli
