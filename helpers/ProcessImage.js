const imagemin = require("imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const path = require("path");
const fs = require("fs");
const bucket = require("../config/GoogleCloudConfig");
const Jimp = require("jimp");
const Default = require("./Default");
const dirHelper = require("./DirHelper");

async function ProcessImageWithMojipeg(inputDir, outputDir, quality) {
  await imagemin([inputDir], outputDir, {
    use: [imageminMozjpeg({ quality: quality })]
  });
}

function GetImagesRenamed(images, inputDir, outputDir, name) {
  var imageArray = [];
  let counter = 0;
  images.forEach(i => {
    var fileName = name + "-" + Date.now().toString() + (++counter).toString() + ".jpeg";
    var inputFile = path.join(inputDir, fileName);
    var outputFile = path.join(outputDir, fileName);
    fs.renameSync(i.path, inputFile);
    imageArray.push({ inputFile: inputFile, outputFile: outputFile, name: fileName });
  });
  return imageArray;
}

function UploadImagesPromise(imageArray, dest) {
  var arrayPromise = [];
  imageArray.forEach(image => {
    arrayPromise.push(bucket.upload(image.outputFile, { destination: `${dest}/${image.name}`, public: true, contentType: "image/jpeg" }));
  });
  return Promise.all(arrayPromise);
}

function Upload1ImagePromise(imageArray, dest) {
  var arrayPromise = [];
  imageArray.forEach(image => {
    arrayPromise.push(bucket.upload(image.outputFile, { destination: `${dest}`, public: true, contentType: "image/jpeg" }));
  });
  return Promise.all(arrayPromise);
}

function GetImageUrlResponses(uploadResponses) {
  var imageUrls = [];
  var publicAddress = "https://storage.googleapis.com/thuexequytam/";
  uploadResponses.forEach(response => imageUrls.push({ name: response[0].name, url: publicAddress + response[0].name }));
  return imageUrls;
}

async function ResizeImageUrlPromise(url, width, outputFile, quality) {
  var image = await Jimp.read(url);
  image
    .resize(width, width / Default.ImageRatio)
    .quality(quality)
    .write(outputFile);
}

module.exports = {
  ProcessImageWithMojipeg: ProcessImageWithMojipeg,
  GetImagesRenamed: GetImagesRenamed,
  UploadImagesPromise: UploadImagesPromise,
  Upload1ImagePromise: Upload1ImagePromise,
  GetImageUrlResponses: GetImageUrlResponses,
  ResizeImageUrlPromise: ResizeImageUrlPromise
};
