'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  BoardSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Name is required']
    },
    lists: [{ type : Schema.Types.ObjectId, ref: 'list' }],    
  });

BoardSchema.set('toObject', { versionKey: false });
BoardSchema.set('toJSON', { versionKey: false });

BoardSchema.methods.updateData = function () {       
    return Board.find().populate('lists').exec();
  };

const Board = mongoose.model('board', BoardSchema);
// Board.find().populate('lists').exec();

module.exports = Board;