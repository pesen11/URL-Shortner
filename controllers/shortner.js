const express = require("express");
const validURL = require("valid-url");
const shortid = require("shortid");
const URLModel = require("../models/urlModel");

//Homepage
exports.getIndex = (req, res, next) => {
  res.render("home/index");
};

//Conversion of Original URL to shortend one and saving in db.

exports.postURL = async (req, res, send) => {
  //Check if localhost URL is legit
  const hostURL = "localhost:3000";
  if (!validURL.isUri(hostURL)) {
    return res.status(401).json("Invalid host URL");
  }

  //if hostURL is legit then

  //Given long URL which is input.
  const originalURL = req.body.inputURL;
  //console.log(originalURL);

  //check if input long url is valid
  if (validURL.isUri(originalURL)) {
    // console.log("Looks legit to me! ");

    //if valid then generate a unique shortid.
    const idURL = shortid.generate();
    try {
      //check if entered URL is in DB. If it is then, it should have shortened version.Return the
      //shortened version.
      let URL = await URLModel.findOne({ originalURL: `${originalURL}` });
      if (URL) {
        res.render("home/shorten", {
          shortenedURL: URL.shortURL,
        });
      }
      //if not then create a new entry for the given long URL and then return the shortened version
      else {
        const shortURL = hostURL + "/" + idURL;
        URL = new URLModel({ idURL, originalURL, shortURL });
        await URL.save();
        res.render("home/shorten", {
          shortenedURL: URL.shortURL,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Server Error");
    }
  } else {
    return res
      .status(401)
      .json("Original URL provided does not seem so original.");
  }
};

//redirecting to the originalURL with the use of shortened URL
exports.originalRedirect = async (req, res, next) => {
  try {
    //check if the shortened URL is in db. IF it is redirect to the original.If not return error.
    const url = await URLModel.findOne({ idURL: req.params.idURL });
    if (url) {
      return res.redirect(url.originalURL);
    } else {
      return res.status(404).json("No URL Found");
    }
  } catch (err) {
    console.log(err);
  }
};
