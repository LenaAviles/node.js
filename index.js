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
const User = require('./models/user');
const gql = require('./graphql');
const WebSocket = require('ws');
const http = require('http');
const bus = require('./eventbus');
const URL = require('url');

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

const server = http.createServer(app);
const wss = new WebSocket.Server({server, path:'/ws', port : 3000});

CLIENTS=[];

wss.on('connection', (ws, req) => {  
  const url = URL.parse(req.url);
  if(url.search !== null) {
    const pattern = url.search.split('=')[1];
    // console.log('Connected!', pattern);

    bus.on(pattern, (data) => {
      ws.send(JSON.stringify(data));
    });
  }
  
  bus.on('task.created', (data) => {

    wss.clients.forEach(client => {      
      if (client.readyState === WebSocket.OPEN && String(client.id) === String(data.assignees[0])) {
        client.send(JSON.stringify(data))
      }
    });    
  });

  bus.on('user.logined', (data) => {
    ws.id = data.id;
  });

  ws.on('message', (data) => {
    ws.send(data);
  });

  ws.send('hello');
  
});

app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST',
    'Access-Control-Allow-Headers': 'x-requested-with,content-type'
  });
  next();
});

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
      bus.emit('user.logined', req.user);
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