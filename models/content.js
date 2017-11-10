const mongoose = require('mongoose'),
      Comment  = require('./comments');

//Schema Setup
var contentSchema = new mongoose.Schema({
  name : String,
  imageUrl : String,
  description: String,
  comments :[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"comment"
    }
  ]
});

module.exports = mongoose.model("content",contentSchema);
