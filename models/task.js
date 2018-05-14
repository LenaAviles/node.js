'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  TaskSchema = new Schema({
    title: {
      type: String,
      required: [true, 'Title is required']
    },
    listId: {type: Schema.Types.ObjectId, ref: 'list'},
    description: { type: String },
    category: { type: String },
    order: { type: Number },
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    assignees: [{ type : Schema.Types.ObjectId, ref: 'user' }],    
  });

TaskSchema.set('toObject', { versionKey: false });
TaskSchema.set('toJSON', { versionKey: false });

TaskSchema.methods.updateData = function () {    
    Task.find().populate('tasks').exec()
  };

const Task = mongoose.model('task', TaskSchema);
Task.find().populate('author').exec();
Task.find().populate('listId').exec();
Task.find().populate('assignees').exec();

module.exports = Task;