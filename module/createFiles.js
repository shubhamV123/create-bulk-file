const fs = require("fs-extra");
const path = require("path");
const chalkPipe = require("chalk-pipe");

const templates = require("../templates");
const fileMethods = require("../utils/fileMethods");

const { checkFileExist } = fileMethods;

const createFiles = ({ data, input, flags }) => {
  const currentWorkingDirectory = path.resolve(process.cwd(), flags.path);
  const directoryToCreate = `${currentWorkingDirectory}/${input[0]}`;
  checkFileExist(directoryToCreate)
    .then((exist) => {
      if (exist) {
        throw "Path exist";
      } else {
        return fs.ensureDir(directoryToCreate);
      }
    })
    .then(() => {
      //   const totalFiles = listOfFiles.length;
      const filePromise = [];
      //create files
      for (let [question, answer] of Object.entries(data)) {
        // const answers = myComingData[question];
        filePromise.push(
          fs.outputFile(
            `${directoryToCreate}/index${answer}`,
            templates[`${answer.slice(1)}`](input[0])
          )
        );
      }
      return Promise.all(filePromise);
    })
    .catch((e) => {
      console.log(chalkPipe("red.underline")(e));
      if (e !== "Path exist") {
        fs.remove(directoryToCreate);
      }
    });
};
module.exports = createFiles;
