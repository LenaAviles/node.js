const express = require('express');
const app = express();

const db = require('./db');
db.connect();

const {
    userController,
    boardController,
    listController,
    taskController
} = require('./routes');

app.listen(8080, function () {
    console.log('server starts on port 8080');
});

app.use(express.json());

app.use('/user', userController);
app.use('/board', boardController);
app.use('/list', listController);
app.use('/task', taskController);