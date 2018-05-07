"use strict";

const router = require('express').Router();
const Board = require('../models/board');
const { validationResult } = require('express-validator/check');
const validation = require('../validation');

router.get('/', (req, res, next) => {
  Board.find()
    .then(data => {
      res.send(data)
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Board.findById(req.params.id)
    .then(data => {
      res.send(data)
    })
    .catch(next);
});

router.post('/', validation.board, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }  

  const board = new Board(req.body);
  board.save()
    .then((data) => {
      res.send(data);
    })
    .catch(next)
});

router.put('/:id', (req, res, next) => {
  Board.findById(req.params.id)
    .then(board => {
      board = Object.assign(board, req.body);
      return board.save()
    })
    .then((data) => {
      res.send(data);
    })
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Board.findByIdAndRemove(req.params.id, req.body)
    .then((data) => {
      res.send(data);
    })
    .catch(next);
});

module.exports = router;