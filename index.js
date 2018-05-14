require('./database/db-close');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const expressSessionParams = require('./fixtures/session');
const passport = require('passport');

const {
    userController,
    boardController,
    listController,
    taskController
} = require('./routes');
// require('./models/user');
const gql = require('./graphql');

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
require('./fixtures/passport');

gql(app);

app.use('/user', userController);
app.use('/board', boardController);
app.use('/list', listController);
app.use('/task', taskController);

app.post('/auth/login',
  passport.authenticate('login'),
  (req, res, next) => {    
    if (req.isAuthenticated()) {
      res.send(req.user);
    } else {
      res.sendStatus(401);
    }
  }
);

app.get('/auth/user', (req, res, next) => {    
  res.json(req.user.greeting());
});

app.use((err, req, res, next) => {
    res.status(500).send(err.message);
});

app.listen(8080, function () {
    console.log('server starts on port http://localhost:8080/');
});