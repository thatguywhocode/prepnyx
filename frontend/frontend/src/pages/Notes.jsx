import { useEffect, useState } from "react";
import {
  getNotes,
  createNote,
  deleteNote,
} from "../services/noteService";

import {
  FaBookOpen,
  FaSearch,
  FaTrash,
} from "react-icons/fa";

function Notes() {
  const [notes, setNotes] = useState([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    content: "",
  });

  const fetchNotes = async () => {
    try {
      const res = await getNotes();
      setNotes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();

    try {
      await createNote(formData);

      setFormData({
        title: "",
        subject: "",
        content: "",
      });

      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          📝 Study Notes
        </h1>

        <p className="text-gray-500 mt-2">
          Organize your learning and
          revision notes.
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">

        <div className="bg-white rounded-2xl shadow p-5">
          <h3 className="text-gray-500">
            Total Notes
          </h3>

          <p className="text-3xl font-bold">
            {notes.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <h3 className="text-gray-500">
            Subjects Covered
          </h3>

          <p className="text-3xl font-bold">
            {
              new Set(
                notes.map(
                  (note) =>
                    note.subject
                )
              ).size
            }
          </p>
        </div>

      </div>

      {/* Create Note */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

        <h2 className="text-2xl font-bold mb-4">
          Create Note
        </h2>

        <form
          onSubmit={
            handleCreateNote
          }
          className="space-y-4"
        >

          <input
            type="text"
            name="title"
            placeholder="Note Title"
            value={
              formData.title
            }
            onChange={
              handleChange
            }
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={
              formData.subject
            }
            onChange={
              handleChange
            }
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            name="content"
            placeholder="Write your note..."
            rows="5"
            value={
              formData.content
            }
            onChange={
              handleChange
            }
            className="w-full border p-3 rounded-lg"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
          >
            Save Note
          </button>

        </form>

      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow p-4 mb-6">

        <div className="relative">
          <FaSearch className="absolute left-3 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search notes..."
            value={
              searchTerm
            }
            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }
            className="w-full border p-3 pl-10 rounded-lg"
          />
        </div>

      </div>

      {/* Notes */}
      {notes.length === 0 ? (

        <div className="bg-white rounded-2xl shadow p-10 text-center">

          <FaBookOpen className="mx-auto text-5xl text-gray-300 mb-4" />

          <h3 className="text-2xl font-bold mb-2">
            No Notes Yet
          </h3>

          <p className="text-gray-500">
            Start creating notes
            for better revision.
          </p>

        </div>

      ) : (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {notes
            .filter((note) =>
              note.title
                .toLowerCase()
                .includes(
                  searchTerm.toLowerCase()
                )
            )
            .map((note) => (

              <div
                key={note._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-5"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h3 className="text-xl font-bold">
                      {note.title}
                    </h3>

                    <span className="inline-block mt-2 bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs">
                      {
                        note.subject
                      }
                    </span>

                  </div>

                  <button
                    onClick={() =>
                      handleDelete(
                        note._id
                      )
                    }
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                  >
                    <FaTrash />
                  </button>

                </div>

                <p className="mt-4 text-gray-600">
                  {note.content
                    .length >
                  150
                    ? `${note.content.substring(
                        0,
                        150
                      )}...`
                    : note.content}
                </p>

                <p className="text-xs text-gray-400 mt-4">
                  Created:{" "}
                  {new Date(
                    note.createdAt
                  ).toLocaleDateString()}
                </p>

              </div>

            ))}

        </div>

      )}

    </div>
  );
}

export default Notes;