const express = require("express");
const mongoose = require("mongoose");
const mainRoutes = require("./routes/home");
const path = require("path");

//Body parser is required to handle the incoming requests mainly post.
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

//Initializing ejs for views
app.set("view engine", "ejs");
app.set("views", "views");

//Path for static files
app.use(express.static(path.join(__dirname, "public")));

//Using the routes for sites.
app.use(mainRoutes);

//connecting with mongodb with mongoose
mongoose
  .connect(
    "mongodb+srv://pesen:XGBoosted77@cluster0.yae7o.mongodb.net/Shortner?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((result) => {
    console.log("connected");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
