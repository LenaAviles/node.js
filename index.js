require('./database/db-close');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const expressSessionParams = require('./fixtures/session');
const passport = require('passport');
require('./fixtures/passport');
const {
    userController,
    boardController,
    listController,
    taskController
} = require('./routes');
require('./models/user');

const express = require('express');
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(expressSession({
    resave: false,
    saveUninitialized: true,
    secret: 'secret',
    ...expressSessionParams
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/user', userController);
app.use('/board', boardController);
app.use('/list', listController);
app.use('/task', taskController);

app.listen(8080, function () {
    console.log('server starts on port 8080');
});