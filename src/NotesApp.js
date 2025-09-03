import { useState, useEffect } from "react";
import "./App.css";
import ListOfNotes from "./ListOfNotes";
import Note from "./Note";
import { auth } from "./Firebase";
import { query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "./Firebase";

export default function NotesApp() {
  const [notes, setNotes] = useState([]);
  const maxTitleLength = 50;
  const maxContentLength = 250;
  const navigate = useNavigate();

  async function addNote(newNote) {
    if (
      newNote.content.trim() &&
      newNote.title.length <= maxTitleLength &&
      newNote.content.length <= maxContentLength
    ) {
      try {
        const noteWithUser = {
          ...newNote,
          userId: auth.currentUser.uid,
          createdAt: new Date(),
        };
        const docRef = await addDoc(collection(db, "notes"), noteWithUser);
        setNotes((prevNotes) => [
          ...prevNotes,
          { ...noteWithUser, id: docRef.id },
        ]);
      } catch (error) {
        console.log("something is wrong", error);
      }
    } else {
      alert("Note exceeds maximum allowed characters!");
    }
  }

  useEffect(() => {
    async function fetchNotes() {
      try {
        const q = query(
          collection(db, "notes"),
          where("userId", "==", auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const notesArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotes(notesArray);
      } catch (error) {
        console.error("Error loading notes:", error);
      }
    }
    fetchNotes();
  }, []);

  async function addDelete(id) {
    const prevNotes = notes;
    setNotes((prev) => prev.filter((note) => note.id !== id));

    try {
      await deleteDoc(doc(db, "notes", id));
    } catch (error) {
      console.error("Delete error", error);
      setNotes(prevNotes);
      alert("Deleting in db failed. Changes are restored");
    }
  }

  return (
    <div className="App">
      <button
        type="button"
        className="logOutButton"
        onClick={async () => {
          try {
            await signOut(auth);
            navigate("/");
          } catch (error) {
            console.error("Log out error:", error);
          }
        }}
      >
        Log Out
      </button>
      <main>
        <ListOfNotes onAdd={addNote} />
        <div className="notes-container">
          {notes.length > 0
            ? notes.map((noteItem, index) => {
                return (
                  <Note
                    key={noteItem.id}
                    id={noteItem.id}
                    title={noteItem.title}
                    content={noteItem.content}
                    deleteItem={addDelete}
                  />
                );
              })
            : null}
        </div>
      </main>
    </div>
  );
}
