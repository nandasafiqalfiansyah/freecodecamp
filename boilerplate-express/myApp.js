let express = require("express");
let app = express();
require("dotenv").config();
var bodyParser = require("body-parser");
// const logger = (req, res, next) => {
//   console.log(`${req.method} ${req.path} - ${req.ip}`);
//   next();
// };
// app.use(logger);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/public", express.static(__dirname + "/public"));

// app.get("/json", (req, res) => {
//   if (process.env.MESSAGE_STYLE === "uppercase") {
//     res.json({ message: "HELLO JSON" });
//   } else {
//     res.json({ message: "Hello json" });
//   }
// });

// app.get(
//   "/now",
//   function (req, res, next) {
//     req.time = new Date().toString();
//     next();
//   },
//   (req, res) => {
//     res.json({ time: req.time });
//   }
// );
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/:word/echo", (req, res) => {
  let word = req.params.word;
  console.log(word);
  res.json({ echo: word });
});

app.get("/name", (req, res) => {
  let { first, last } = req.query;
  res.json({ name: `${first} ${last}` });
});

app.post("/name", function (req, res) {
  // Handle the data in the request
  var { first, last } = req.body;
  res.json({ name: `${first} ${last}` });
});

module.exports = app;
