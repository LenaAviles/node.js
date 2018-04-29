const { check } = require('express-validator/check');

exports.user = [
    check('email').isEmail(),
    check('name').exists()
];

exports.board = [
    check('name').exists(),
];

