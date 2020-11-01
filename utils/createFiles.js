const fs = require("fs-extra");
const chalkPipe = require("chalk-pipe");
const templates = require("../templates");

const createFiles = ({ data, input, flags }) => {
  const myComingData = new Proxy(data, {
    get: function (target, prop, receiver) {
      if (prop === "storybook") {
        return target["test"] === "yes" ? ".storybook.js" : "";
      }
      if (prop === "test") {
        return target["test"] === "yes" ? ".test.js" : "";
      }
      return Reflect.get(...arguments);
    },
  });
  const currentWorkingDirectory = process.cwd();
  const directoryToCreate = `${currentWorkingDirectory}/${input[0]}`;
  console.log(directoryToCreate);
  fs.pathExists(directoryToCreate)
    .then((exist) => {
      if (exist) {
        throw "Path Exist";
      } else {
        return fs.ensureDir(directoryToCreate);
      }
    })
    .then(() => {
      //   const totalFiles = listOfFiles.length;
      const filePromise = [];
      //create files
      for (let [question, answer] of Object.entries(data)) {
        const answers = myComingData[question];
        if (answers !== "") {
          filePromise.push(
            fs.outputFile(
              `${directoryToCreate}/index${answers}`,
              templates[`${answers.slice(1)}`](input[0])
            )
          );
        }
      }
      return Promise.all(filePromise);
    })
    .catch((e) => {
      console.log(chalkPipe("red.underline")(e));
      fs.remove(directoryToCreate);
    });
};
module.exports = createFiles;
