// routes/notes.js
const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const authMiddleware = require('../middleware/auth');

// Get all notes
router.get('/', authMiddleware, async (req, res) => {
  const notes = await Note.find({ userId: req.user.id });
  res.json(notes);
});

// Create new note with optional image
router.post('/', authMiddleware, async (req, res) => {
  const { title, content, image } = req.body;
  const note = new Note({ title, content, image, userId: req.user.id });
  await note.save();
  res.status(201).json(note);
});

// Update existing note
router.put('/:id', authMiddleware, async (req, res) => {
  const { title, content, image } = req.body;
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    { title, content, image },
    { new: true }
  );
  if (!note) return res.status(404).send('Note not found');
  res.json(note);
});

// Delete a note
router.delete('/:id', authMiddleware, async (req, res) => {
  const result = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  if (!result) return res.status(404).send('Note not found');
  res.json({ message: 'Note deleted' });
});

module.exports = router;