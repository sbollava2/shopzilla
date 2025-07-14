import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Notes.css"; // 👈 Make sure this import is present

export default function Notes() {
  const { token, logout } = useAuth();
  const [form, setForm] = useState({ title: "", content: "", image: "" });
  const [notes, setNotes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/notes", {
        headers: { Authorization: token },
      });
      setNotes(res.data);
    } catch (err) {
      toast.error("Failed to load notes");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/notes/${editId}`, form, {
          headers: { Authorization: token },
        });
        toast.success("Note updated!");
      } else {
        await axios.post("http://localhost:5000/api/notes", form, {
          headers: { Authorization: token },
        });
        toast.success("Note added!");
      }
      setForm({ title: "", content: "", image: "" });
      setEditId(null);
      fetchNotes();
    } catch (err) {
      toast.error("Error saving note");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`, {
        headers: { Authorization: token },
      });
      toast.info("Note deleted");
      fetchNotes();
    } catch (err) {
      toast.error("Error deleting note");
    }
  };

  const handleEdit = (note) => {
    setEditId(note._id);
    setForm({ title: note.title, content: note.content, image: note.image || "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="notes-page">
      <h2>{editId ? "Edit Note" : "Add Note"}</h2>
      <form onSubmit={handleAddOrUpdate} className="note-form">
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {form.image && <img src={form.image} alt="preview" className="preview-image" />}
        <div className="form-buttons">
          <button type="submit">{editId ? "Update Note" : "Add Note"}</button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setForm({ title: "", content: "", image: "" });
              }}
              className="cancel-btn"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <button className="logout-btn" onClick={() => { logout(); navigate("/login"); }}>
        Logout
      </button>

      <input
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <div className="note-list">
        {notes
          .filter((n) =>
            n.title.toLowerCase().includes(search.toLowerCase()) ||
            n.content.toLowerCase().includes(search.toLowerCase())
          )
          .map((note) => (
            <div className="note-card" key={note._id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              {note.image && <img src={note.image} alt="note" className="note-image" />}
              <div className="card-actions">
                <button onClick={() => handleEdit(note)}>Edit</button>
                <button onClick={() => handleDelete(note._id)}>Delete</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
