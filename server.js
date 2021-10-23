const express = require("express");
const { resolve } = require("path");

const app = express();

const baseDir = `${__dirname}/`;

app.use("/", express.static(resolve(__dirname, `${baseDir}`)));

app.get("*", (req, res) => res.sendFile("./src/pages/Home/homepage.html", { root: baseDir }));

app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    return console.log(err);
  }
});