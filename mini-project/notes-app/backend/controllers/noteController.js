// backend/controllers/noteController.js
const Note = require("../models/Note");

exports.createNote = async (req, res) => {
  const { title, content } = req.body;
  const note = await Note.create({ userId: req.user.id, title, content });
  res.json(note);
};

exports.getNotes = async (req, res) => {
  const notes = await Note.find({ userId: req.user.id });
  res.json(notes);
};

exports.updateNote = async (req, res) => {
  const { title, content } = req.body;
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    { title, content },
    { new: true }
  );
  res.json(note);
};

exports.deleteNote = async (req, res) => {
  await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.json({ message: "Note deleted" });
};
