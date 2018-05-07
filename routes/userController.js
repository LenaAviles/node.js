"use strict";

const router = require('express').Router();
const User = require('../models/user');
const { validationResult } = require('express-validator/check');
const validation = require('../validation');

router.get('/', (req, res, next) => {
  User.find()
    .then(data => {
      res.send(data)
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(data => {
      res.send(data)
    })
    .catch(next);
});

router.post('/', validation.user, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }  

  const user = new User(req.body);
  user.save()
    .then((data) => {
      res.send(data);
    })
    .catch(next)
});

router.put('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      user = Object.assign(user, req.body);
      return user.save()
    })
    .then((data) => {
      res.send(data);
    })
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  User.findByIdAndRemove(req.params.id, req.body)
    .then((data) => {
      res.send(data);
    })
    .catch(next);
});

module.exports = router;