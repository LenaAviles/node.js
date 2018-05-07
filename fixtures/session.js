const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);
const config = require('../config');

exports.expressSessionParams = {   
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
    },
    store: new MongoStore({
        url: `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`,
        user: config.db.user,
        pass: config.db.password,
        autoRemove: 'native'
    }),
};