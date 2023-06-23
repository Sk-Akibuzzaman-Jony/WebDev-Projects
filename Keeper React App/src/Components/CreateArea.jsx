import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import AddIcon from "@mui/icons-material/Add";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });
  const [isExpanded, setIsExpanded] = useState(false);

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    setNote(function (preValue) {
      return {
        ...preValue,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  function handleExpansion() {
    setIsExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          onClick={handleExpansion}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
