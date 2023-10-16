const express = require('express');
const router = express.Router(); 
const noteModel = require('../models/NotesModel');

// Create a new Note
router.post('/notes', (req, res) => {
  // Validate request
  if (!req.body.noteTitle || !req.body.noteDescription || !req.body.priority) {
    return res.status(400).send({
      message: "Note content can not be empty"
    });
  }

  // Create a new note document using the Note model
  const note = new noteModel({
    noteTitle: req.body.noteTitle,
    noteDescription: req.body.noteDescription,
    priority: req.body.priority,
  });

  // Save the note to the database
  note.save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the note."
      });
    });
});

// Retrieve all Notes
router.get('/notes', (req, res) => {
  noteModel.find()
    .then(notes => {
      res.send(notes);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes."
      });
    });
});

// Retrieve a single Note with noteId
router.get('/notes/:noteId', (req, res) => {
  noteModel.findById(req.params.noteId)
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId
        });
      }
      res.send(note);
    })
    .catch(err => {
      return res.status(500).send({
        message: "Error retrieving note with id " + req.params.noteId
      });
    });
});

// Update a Note with noteId
router.put('/notes/:noteId', (req, res) => {
  // Validate request
  if (!req.body.noteTitle || !req.body.noteDescription || !req.body.priority) {
    return res.status(400).send({
      message: "Note content can not be empty"
    });
  }

  noteModel.findByIdAndUpdate(req.params.noteId, {
    noteTitle: req.body.noteTitle,
    noteDescription: req.body.noteDescription,
    priority: req.body.priority,
  }, { new: true })
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId
        });
      }
      res.send(note);
    })
    .catch(err => {
      return res.status(500).send({
        message: "Error updating note with id " + req.params.noteId
      });
    });
});

// Delete a Note with noteId
router.delete('/notes/:noteId', (req, res) => {
  noteModel.findByIdAndRemove(req.params.noteId)
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId
        });
      }
      res.send({ message: "Note deleted successfully!" });
    })
    .catch(err => {
      return res.status(500).send({
        message: "Could not delete note with id " + req.params.noteId
      });
    });
});

