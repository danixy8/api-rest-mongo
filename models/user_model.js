const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true
  },
  name: { 
    type: String, 
    require: true
  }, 
  password: {
    type: String,
    require: true
  },
  status: { 
    type: Boolean,
    default: true
  },
  imagen: {
    type: String,
    require: false
  }
});

module.exports = mongoose.model('User', userSchema);