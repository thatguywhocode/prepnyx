import Note from "../models/note.model.js";

// 🔹 Create Note
export const createNote = async (req, reply) => {
  try {
    const note = await Note.create({
      ...req.body,
      userId: req.user.id
    });

    return reply.code(201).send(note);
  } catch (error) {
    return reply.code(500).send({ message: error.message });
  }
};

// 🔹 Get Notes
export const getNotes = async (req, reply) => {
  try {
    const notes = await Note.find({ userId: req.user.id });

    return reply.send(notes);
  } catch (error) {
    return reply.code(500).send({ message: error.message });
  }
};

// 🔹 Update Note
export const updateNote = async (req, reply) => {
  try {
    const note = await Note.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id
      },
      req.body,
      { new: true }
    );

    return reply.send(note);
  } catch (error) {
    return reply.code(500).send({ message: error.message });
  }
};

// 🔹 Delete Note
export const deleteNote = async (req, reply) => {
  try {
    await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    return reply.send({ message: "Note deleted" });
  } catch (error) {
    return reply.code(500).send({ message: error.message });
  }
};