const inquirer = require("inquirer");
const chalkPipe = require("chalk-pipe");

const promptUser = async () => {
  return inquirer.prompt([
    {
      type: "list",
      name: "js",
      message: "What will be extension for javascript file?",
      choices: [".jsx", ".js", ".tsx", ".ts"],
    },
    {
      type: "list",
      name: "css",
      message: "What will be extension for css file?",
      choices: [".scss", ".css", ".less", ".module.css"],
    },
    {
      type: "list",
      name: "storybook",
      message: "Do you want to add storybook file?",
      choices: ["Yes", "No"],
      filter: function (val) {
        return val.toLowerCase();
      },
    },
    {
      type: "list",
      name: "test",
      message: "Do you want test files?",
      choices: ["Yes", "No"],
      filter: function (val) {
        return val.toLowerCase();
      },
    },
    //TODO: Will add later to add customize extension

    // {
    //   type: "list",
    //   name: "other",
    //   message: "Do you want to add any other extension?",
    //   choices: ["Yes", new inquirer.Separator(" Extra extension you want to add "), "No"],
    //   filter: function (val) {
    //     return val.toLowerCase();
    //   },
    // },
    // {
    //   type: "input",
    //   name: "other_extension",
    //   message: "Add file extension in comma separated(for ex: .env,.py)",
    //   transformer: function (extension, answers, flags) {
    //     const text = chalkPipe("green.underline")(extension);
    //     if (flags.isFinal) {
    //       return text + "!";
    //     }

    //     return text;
    //   },
    //   validate: function (input, answer) {
    //     if (input.length === 0) {
    //       return "Input can't be blank";
    //     }
    //     return true;
    //   },
    //   when: function (answers) {
    //     return answers.other !== "no";
    //   },
    // },
  ]);
};

module.exports = promptUser;
