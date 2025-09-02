import React, { useState } from "react";
import "./ListOfNotes.css";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

function ListOfNotes(props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }
  function handleExpand() {
    setIsExpanded(true);
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({ title: "", content: "" });
    event.preventDefault();
  }

  return (
    <div>
      <form className="create-note">
        <div className="item-example">
          {isExpanded ? (
            <input
              name="title"
              onChange={handleChange}
              className="input"
              type="text"
              value={note.title}
              placeholder="Title"
            />
          ) : null}
          <textarea
            name="content"
            onClick={handleExpand}
            onChange={handleChange}
            className="input"
            type="text"
            value={note.content}
            placeholder="Take a note..."
            rows={isExpanded ? 3 : 1}
          />
          <Zoom in={isExpanded ? true : false}>
            <Fab onClick={submitNote} className="addButton">
              <AddIcon />
            </Fab>
          </Zoom>
        </div>
      </form>
    </div>
  );
}

export default ListOfNotes;
