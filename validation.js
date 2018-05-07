const { check } = require('express-validator/check');

exports.user = [
    check('email').isEmail().withMessage('must be an email'),
    check('name').exists().isString(),
    check('password').exists().withMessage('password is required')
];

exports.board = [
    check('name').exists().isString(),
    check('lists').isArray()
];

exports.list = [
    check('name').exists().isString(),
    check('boardId').exists(),
    check('tasks').isArray()
];

exports.task = [
    check('title').exists().isString(),
    check('listId').exists().isString(),
    check('description').isString(),
    check('category').isString(),
    check('order').isNumeric(),
    check('author').exists(),
    check('assignees').isArray()
];

