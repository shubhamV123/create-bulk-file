#!/usr/bin/env node
const meow = require("meow");
const chalkPipe = require("chalk-pipe");

const promptUser = require("./utils/userPrompt");
const createFiles = require("./utils/createFiles");

const cli = meow(
  `
	Usage
	  $ crc <input>

	Options
	  -- functional, -f  Create a function component
      -- class, -c Create a class component
      -- path, -p path to create components

	Examples
	  $ crc -f
`,
  {
    flags: {
      functional: {
        type: "boolean",
        alias: "f",
      },
      class: {
        type: "boolean",
        alias: "c",
      },
      path: {
        type: "string",
        alias: "p",
        default: "",
      },
    },
  }
);
// used to log errors to the console in red color
const errorLog = (error) => {
  const eLog = chalkPipe("red.underline")(error);
  throw eLog;
};
// const validArguments = ["functional", "f", "class", "c"];
try {
  if (cli.input.length > 1) {
    errorLog(`only one argument can be accepted`);
  } else {
    promptUser().then((data) => createFiles({ data, input: cli.input, flags: cli.flags }));
  }
} catch (e) {
  console.log(e);
}
