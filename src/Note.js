import "./App.css";
import DeleteIcon from "@mui/icons-material/Delete";

function Note({ id, title, content, deleteItem }) {
  function handleDelete() {
    if (window.confirm("Do you really want to delete this note?")) {
      deleteItem(id);
    }
  }

  return (
    <div>
      <div className="itemNote">
        <div className="item">
          <h3>{title}</h3>
          <p>{content}</p>
        </div>
        <button className="deleteButton" onClick={handleDelete}>
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}

export default Note;
