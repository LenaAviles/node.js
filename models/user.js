'use strict';
const { validateEmail } = require('../fixtures');
const bcrypt = require('bcrypt');

const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  UserSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Name is required']
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: 'Email address is required',
      validate: [validateEmail, 'Please fill a valid email address']
    },
    password: {
      type: String,
      required: [
        true, 'Password is required'
      ],
      select: false,
    }
  });

UserSchema.set('toObject', {
  transform: function (doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
  }
  });
UserSchema.set('toJSON', { versionKey: false });

UserSchema.pre('save', function (next) {
  let model = this;
  if (this.isModified('password')) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(model.password, salt, function (err, hash) {
        model.password = hash;
        next();
      });
    });
  }
});

UserSchema.methods.greeting = function () {
  return {"Hello":this.name}
};

const User = mongoose.model('user', UserSchema);
module.exports = User;