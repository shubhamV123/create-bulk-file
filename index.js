//Third party package

//Local package
const promptUser = require("./module/userPrompt");
const createFiles = require("./module/createFiles");
const fileMethods = require("./utils/fileMethods");
const helpers = require("./utils/helpers");
const startCli = require("./module/startCli");

//Local destructuring
const { modifyConfigData, errorLog } = helpers;
const { checkFileExist, readJsonFile, writeJsonFile } = fileMethods;

const cli = startCli();

const { functional, path, class: classFlag } = cli.flags;
if (cli.input.length === 0 && !(functional && classFlag && !!path)) {
  errorLog("Atleast one parameter is required");
}
try {
  if (cli.input.length > 1) {
    errorLog(`only one argument can be accepted`);
  } else {
    checkFileExist()
      .then((exist) => {
        if (exist) {
          // Read config file
          return readJsonFile();
        } else {
          return promptUser().then(async (data) => {
            //Modify data ask from user
            data = modifyConfigData(data);
            //Create json file in directory
            await writeJsonFile({ data });
            return data;
          });
        }
      })
      .then((data) => {
        createFiles({ data, input: cli.input, flags: cli.flags });
      });
  }
} catch (e) {
  console.log(e);
}
