import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const notesInitial = []

const [notes, setNotes] = useState(notesInitial)

// Get All Notes
const getNotes = async () => {
  // TODO API call
  const response = await fetch(`${API_BASE_URL}/api/notes/fetchallnotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token")
    },
  });
  const json = await response.json()
  setNotes(json)
}


// Add a note
const addNote = async (title, description, tag) => {
    // TODO API call
    const response = await fetch(`${API_BASE_URL}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({title, description, tag})
    });

    const note = await response.json();
    setNotes(notes.concat(note))

}


// Delete a note
const deleteNote = async (id) => {
  const response = await fetch(`${API_BASE_URL}/api/notes/deletenote/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token")
    }
    // body: JSON.stringify({title, description, tag})
  });
  const json = response.json();
  const newNotes = notes.filter((note)=>{return note._id!==id})
  setNotes(newNotes)
}
// Edit a note
const editNote = async (id, title, description, tag) => {
// API call
const response = await fetch(`${API_BASE_URL}/api/notes/updatenote/${id}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    "auth-token": localStorage.getItem("token")
  },
  body: JSON.stringify({title, description, tag})
});
const json = await response.json();

let newNote = JSON.parse(JSON.stringify(notes))
for (let index = 0; index < newNote.length; index++) {
  const element = newNote[index];
  if (element._id===id){
    newNote[index].title=title;
    newNote[index].description=description;
    newNote[index].tag=tag;
    break;

  }
}
setNotes(newNote)
}

    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children};
        </NoteContext.Provider>
    )
}


export default NoteState;