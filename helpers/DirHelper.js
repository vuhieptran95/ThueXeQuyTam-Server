const os = require("os");
const path = require("path");
const rimraf = require("rimraf");
const mkdir = require("mkdirp-promise");

const temDir = os.tmpdir();

async function makeInputDirPromise() {
  var inputDir = path.join(temDir, "input" + Date.now());
  await mkdir(inputDir);
  return inputDir;
}

async function makeOutputDirPromise() {
  var outputDir = path.join(temDir, "output" + Date.now());
  await mkdir(outputDir);
  return outputDir;
}

function makeInputFilePath(inputDir, fileName) {
  var inputFile = path.join(inputDir, fileName);
  return inputFile;
}

function makeOutputFilePath(outputDir, fileName) {
  var outputFile = path.join(outputDir, fileName);
  return outputFile;
}

function removeDir(...args) {
  args.map(dir => rimraf("dir", err => console.log(err)));
}

module.exports = {
  makeInputDirPromise: makeInputDirPromise,
  makeOutputDirPromise: makeOutputDirPromise,
  makeInputFilePath: makeInputFilePath,
  makeOutputFilePath: makeOutputFilePath,
  removeDir: removeDir
};
