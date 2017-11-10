const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

//Schema Setup
var userSchema = new mongoose.Schema({
  username : String,
  passport : String
});
//Give all the predefined functions of passport Local mongoose to userSchema
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user",userSchema);
