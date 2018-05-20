'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ListSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Name is required']
    },
    boardId: {type: Schema.Types.ObjectId, ref: 'board'},
    tasks: [{ type : Schema.Types.ObjectId, ref: 'task' }],    
  });

ListSchema.set('toObject', { versionKey: false });
ListSchema.set('toJSON', { versionKey: false });

ListSchema.methods.updateData = function (cb) {    
    List.find().populate('tasks').populate('boardId').exec(cb)
};

const List = mongoose.model('list', ListSchema);
List.find().populate('tasks').exec();
List.find().populate('boardId').exec();

module.exports = List;