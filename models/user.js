// adding packages
var mongoose = require("mongoose") // database
  , passportLocalMongoose = require("passport-local-mongoose") // authentication

// model Schema
var userSchema = new mongoose.Schema({
  username: String,
  password: String,
})

userSchema.plugin(passportLocalMongoose)

// exporting model
module.exports = mongoose.model("User", userSchema)
