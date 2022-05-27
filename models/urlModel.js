const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const URLSchma = new Schema({
  idURL: {
    type: String,
    required: true,
  },
  originalURL: {
    type: String,
    required: true,
  },
  shortURL: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("URL", URLSchma);
