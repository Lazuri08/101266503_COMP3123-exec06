const mongoose = require('mongoose');

// Create a Mongoose schema for the "Note" model
const noteSchema = new mongoose.Schema({
  noteTitle: {
    type: String,
    required: true,
  },
  noteDescription: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ['HIGH', 'LOW', 'MEDIUM'],
    required: true,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  dateUpdated: {
    type: Date,
    default: Date.now,
  },
});

// Create a model from the schema
const Note = mongoose.model('Note', noteSchema);

// Export the Note model
module.exports = Note;
