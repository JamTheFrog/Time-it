//framework requirements

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
const keys = require("./keys/keys")

//middleware require statements

//middleware setup
app.set("trust proxy", true)
app.use(express.json())
app.use(cors())

//Schema require statements

//Auth routes require statements

//Session route require statements

//Auth router middleware setup

//Session router middleware setup

//Start script

const start = async () => {
    try {
      await mongoose.connect(
          keys.MONGO_URI
      );
      console.log("Connected to MongoDB");
    } catch (error) {
      console.log(error);
    }
    app.listen(keys.PORT, () => {
      console.log("server is listening on " + keys.PORT);
    });
  };
  start();