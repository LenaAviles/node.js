"use strict";

const router = require('express').Router();
const { checkSchema, validationResult } = require('express-validator/check');
const validation = require('../validation');
const db = require('../db');

const data = db.getUsers();

router.param('id', (req, res, next, id) => {
  if (!data[parseInt(id, 10)]) {
    res.sendStatus(404);
    return
  }
  next();
});

router.use((req, res, next) => {
  console.log('UserController');
  next();
});

router.get('/', (req, res, next) => {
  res.send(data);
});

router.get('/:id', (req, res, next) => {
  console.log(req.params.id);
  res.send(data[req.params.id]);
});

router.post('/', validation.user, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  const length = data.push(req.body);
  res.send({ id: length - 1 });
});

router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  data[id] = Object.assign(data[id], req.body);
  res.send(data[id]);
});

router.delete('/:id', (req, res, next) => {
  const [deleted] = data.splice(req.params.id, 1);
  res.send(deleted);
});

module.exports = router;