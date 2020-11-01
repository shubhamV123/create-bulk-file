const meow = require("meow");

const cli = meow(
  `
      Usage
        $ crc <componentName> <options>
  
      Options
        -- functional, -f  Create a function component
      -- class, -c Create a class component
      -- path, -p path to create components
  
      Examples
        $ crc block -f
  `,
  {
    flags: {
      functional: {
        type: "boolean",
        alias: "f",
        default: true,
      },
      class: {
        type: "boolean",
        alias: "c",
      },
      path: {
        type: "string",
        alias: "p",
        default: "./",
      },
    },
  }
);

module.exports = cli;
