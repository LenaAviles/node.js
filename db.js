let db = {};

module.exports.connect = () => {    
    db = require('./db.json');    
}

module.exports.getUsers = () => {    
    if (!db.users) {
        throw new Error('No users');
    }

    return db.users;
}

module.exports.getBoards = () => {    
    if (!db.boards) {
        throw new Error('No boards');
    }

    return db.boards;
}

module.exports.getLists = () => {    
    if (!db.lists) {
        throw new Error('No lists');
    }

    return db.lists;
}

module.exports.getTasks = () => {    
    if (!db.tasks) {
        throw new Error('No tasks');
    }

    return db.tasks;
}