const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vanSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  imageUrl: {
    type: String,
    required: true
  },
  type: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  users: {
    type: Array,
  } 
});


module.exports = mongoose.model('Van', vanSchema);