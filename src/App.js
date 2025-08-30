import { useState, useEffect } from "react";
import "./App.css";
import ListOfNotes from "./ListOfNotes";
import Note from "./Note";
import Header from "./Header";
import Footer from "./Footer";

import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "./Firebase";
import SignUp from "./SignUp";

function App() {
  const [notes, setNotes] = useState([]);
  const maxTitleLength = 50;
  const maxContentLength = 250;

  async function addNote(newNote) {
    if (
      newNote.content.trim() &&
      newNote.title.length <= maxTitleLength &&
      newNote.content.length <= maxContentLength
    ) {
      try {
        const docRef = await addDoc(collection(db, "notes"), newNote);
        setNotes((prevNotes) => [...prevNotes, { ...newNote, id: docRef.id }]);
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
        const querySnapshot = await getDocs(collection(db, "notes"));
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
      <Header />
      <SignUp />
      <main>
        <ListOfNotes onAdd={addNote} />
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
      </main>
      <Footer />
    </div>
  );
}

export default App;
