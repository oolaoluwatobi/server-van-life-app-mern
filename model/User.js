const mongoose = require('mongoose');
const hashPassword = require('../config/hashPassword')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    maxLength: 100
  },
  lastname: {
    type: String,
    maxLength: 100
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: function(value) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
      },
      message: "Invalid email format"
    }
  },
  roles: {
    User: {
      type: Number,
      default: 2001
    },
    Editor: Number,
    Admin: Number
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 128,
    // validate: {
    //   validator: function(value) {
    //     return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value);
    //   },
    //   message: "Password must be at least 8 characters long and contain at least one letter and one number"
    // },
  },
  refreshToken: String
});

// userSchema.pre('save', function (next) {
//   if (this.password) {
//       this.password = hashPassword(this.password)
//   }
//   next()
// })

module.exports = mongoose.model('User', userSchema);