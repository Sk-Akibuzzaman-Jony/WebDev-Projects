import React, { useState } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Note from "./Components/Note";
import CreateArea from "./Components/CreateArea";
import "./styles.css";

function App() {
  const [notes, setNote] = useState([]);

  function addNote(newNote) {
    setNote(function (preValue) {
      return [...preValue, newNote];
    });
  }

  function deleteNote(id) {
    setNote((preValue) => {
      preValue.filter((note, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes?.map((note, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={note.title}
            content={note.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
