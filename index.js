const express = require("express");
const cors = require("cors");
const formidable = require("formidable");
const os = require("os");
const bodyParser = require("body-parser");
const dirHelper = require("./helpers/DirHelper");
const processImage = require("./helpers/ProcessImage");
const message = require("./helpers/Message");
const Db = require("./config/FirebaseConfig");

const app = express();
app.use(cors());

app.get("/", async (req, res) => {
  console.log("1");
  await wait();
  console.log("2");
  res.send("Looks like express server works");
});

app.post("/images", (req, res) => {
  var form = new formidable.IncomingForm();
  form.multiples = true;
  form.parse(req, async (err, fields, files) => {
    var brandName = (await Db.collection("brands")
      .doc(fields.brand)
      .get()).data().name;
    var typeName = (await Db.collection("types")
      .doc(fields.type)
      .get()).data().name;
    var imageName = message.AltTextImageName(typeName, brandName, fields.name);
    var images = files.images;
    Array.isArray(images) ? console.log("is Array") : (images = [images]);
    var inputDir = await dirHelper.makeInputDirPromise();
    var outputDir = await dirHelper.makeOutputDirPromise();
    var imageArray = processImage.GetImagesRenamed(images, inputDir, outputDir, imageName);
    await processImage.ProcessImageWithMojipeg(inputDir, outputDir, 65);
    var uploadResponses = await processImage.UploadImagesPromise(imageArray, `images`);
    var imageUrls = processImage.GetImageUrlResponses(uploadResponses);
    dirHelper.removeDir(inputDir, outputDir);
    res.send(imageUrls);
  });
});

app.post("/cars", (req, res) => {
  var form = new formidable.IncomingForm();
  form.multiples = true;
  form.parse(req, async (err, fields, files) => {
    try {
      var images = fields.images.split(",");
      var mainImage = fields.mainImage;
      var brandName = (await Db.collection("brands")
        .doc(fields.brand)
        .get()).data().name;
      var typeName = (await Db.collection("types")
        .doc(fields.type)
        .get()).data().name;
      var outputDir = await dirHelper.makeOutputDirPromise();
      var outputFile = dirHelper.makeOutputFilePath(outputDir, Date.now().toString());
      await processImage.ResizeImageUrlPromise(mainImage, 250, outputFile, 65);
      var imageArray = [{ outputFile: outputFile }];
      var uploadResponses = await processImage.Upload1ImagePromise(
        imageArray,
        `thumbnails/${message.AltTextImageName(typeName, brandName, fields.name)}-${Date.now()}.jpeg`
      );
      var imageUrls = processImage.GetImageUrlResponses(uploadResponses);
      dirHelper.removeDir(outputDir);
      var carDocId = fields.name + Date.now().toString();
      var carRef = Db.collection("cars").doc(carDocId);
      await carRef.set({
        id: carDocId,
        dateCreated: Date.now(),
        name: fields.name,
        brand: Db.collection("brands").doc(fields.brand),
        brandId: Db.collection("brands").doc(fields.brand).id,
        brandName: brandName,
        typeName: typeName,
        type: Db.collection("types").doc(fields.type),
        typeId: Db.collection("types").doc(fields.type).id,
        images: images,
        mainImage: mainImage,
        thumbnail: imageUrls[0].url,
        order: 1000,
        alt: message.AltTextImage(typeName, brandName, fields.name)
      });
      res.status(201).send("Tạo xe mới thành công");
    } catch (error) {
      res.status(500).send(error);
    }
  });
});

app.put("/cars/:id", (req, res) => {
  var form = new formidable.IncomingForm();
  form.multiples = true;
  form.parse(req, async (err, fields, files) => {
    try {
      var images = fields.images.split(",");
      var mainImage = fields.mainImage;
      var brandName = (await Db.collection("brands")
        .doc(fields.brand)
        .get()).data().name;
      var typeName = (await Db.collection("types")
        .doc(fields.type)
        .get()).data().name;
      var outputDir = await dirHelper.makeOutputDirPromise();
      var outputFile = dirHelper.makeOutputFilePath(outputDir, Date.now().toString());
      await processImage.ResizeImageUrlPromise(mainImage, 250, outputFile, 65);
      var imageArray = [{ outputFile: outputFile }];
      var uploadResponses = await processImage.Upload1ImagePromise(
        imageArray,
        `thumbnails/${message.AltTextImageName(typeName, brandName, fields.name)}-${Date.now()}.jpeg`
      );
      var imageUrls = processImage.GetImageUrlResponses(uploadResponses);
      dirHelper.removeDir(outputDir);
      var carRef = Db.collection("cars").doc(req.params.id);
      await carRef.update({
        dateModified: Date.now(),
        name: fields.name,
        brand: Db.collection("brands").doc(fields.brand),
        brandId: Db.collection("brands").doc(fields.brand).id,
        brandName: brandName,
        typeName: typeName,
        type: Db.collection("types").doc(fields.type),
        typeId: Db.collection("types").doc(fields.type).id,
        images: images,
        mainImage: mainImage,
        thumbnail: imageUrls[0].url,
        alt: message.AltTextImage(typeName, brandName, fields.name)
      });
      res.status(200).send("Chỉnh sửa xe mới thành công");
    } catch (error) {
      res.status(500).send(error);
    }
  });
});

app.listen(2610, "localhost", () => console.log("Server started"));
// app.listen(6666, "localhost", () => console.log("Server started"));
// app.listen(process.env.PORT || 6666, () => console.log("Server started"));
