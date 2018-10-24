const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Looks like express server works");
});

app.listen(process.env.PORT || 6666, () => console.log("Server started"));
