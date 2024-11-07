require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

const urlDatabase = {};
let counter = 0;

function validateUrl(inputUrl, callback) {
  try {
    const parsedUrl = new URL(inputUrl);
    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      return callback(false);
    }
    dns.lookup(parsedUrl.hostname, (err) => {
      if (err) {
        callback(false);
      } else {
        callback(true);
      }
    });
  } catch (error) {
    callback(false);
  }
}

function validateUrl(inputUrl, callback) {
  try {
    const parsedUrl = new URL(inputUrl);
    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      return callback(false);
    }
    callback(true);
  } catch (error) {
    callback(false);
  }
}

app.post("/api/shorturl", (req, res) => {
  const { url: originalUrl } = req.body;
  validateUrl(originalUrl, (isValid) => {
    if (!isValid) {
      return res.json({ error: "invalid url" });
    }

    const shortUrlId = counter++;
    urlDatabase[shortUrlId] = originalUrl;
    res.json({ original_url: originalUrl, short_url: shortUrlId });
  });
});

app.get("/api/shorturl/:shorturl", (req, res) => {
  const shortUrlId = req.params.shorturl;
  const originalUrl = urlDatabase[shortUrlId];
  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.json({ error: "invalid url" });
  }
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
