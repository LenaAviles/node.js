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

UserSchema.set('toObject', { versionKey: false });
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

const User = mongoose.model('user', UserSchema);
module.exports = User;