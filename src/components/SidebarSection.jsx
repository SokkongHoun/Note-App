import React from "react";
import SplitPane, { Pane } from "split-pane-react";
import { NotesArea } from "./Textarea";
import "split-pane-react/esm/themes/default.css";
import { EditIcon } from "../assets/icon";

export function SidebarSection() {
  const [sizes, setSizes] = React.useState([100, "30%", "auto"]);
  const [Notes, setNotes] = React.useState(() => {
    return (
      JSON.parse(localStorage.getItem("key")) || [
        { id: 1, title: "Notes 1", task: "" },
      ]
    );
  });

  React.useEffect(() => {
    localStorage.setItem("key", JSON.stringify(Notes));
  }, [Notes]);

  const [activeNote, setActiveNote] = React.useState(Notes[0].id);

  function NotesSidebar(props) {
    function activateNote() {
      setActiveNote(props.note.id);
    }

    const noteClass = props.note.id === activeNote ? "bg-gray-600" : "";
    return (
      <div
        onClick={() => activateNote()}
        className={`active-note-jsx cursor-pointer hover:bg-gray-600 ${noteClass}`}
      >
        <div className="flex justify-between items-center px-2">
          <h1 className="flex items-center h-10 w-64 text-nowrap overflow-hidden mr-3">
            {props.noteText}
          </h1>
          <div className="flex justify-center items-center">
            <button>{EditIcon()}</button>
            <button onClick={(event) => handleDeleteNote(event, props.note.id)}>
              <span className="material-symbols-outlined mt-1 ml-1">
                delete
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }
  function handleAddNotes() {
    const id = Date.now();
    setNotes((prevNotes) => [
      ...prevNotes,
      {
        id: id,
        title: "",
        task: "",
      },
    ]);
  }
  function handleDeleteNote(event, noteId) {
    event.stopPropagation();
    let updateNotes = Notes.filter((note) => note.id !== noteId);
    setNotes(updateNotes);
  }

  return (
    <SplitPane split="vertical" sizes={sizes} onChange={setSizes}>
      <Pane minSize={200} maxSize="30%">
        <nav className="h-full rounded-l-lg  border border-gray-200 g bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-white">
          <div className="mt-5 flex flex-row  justify-between px-2">
            <div>
              <h1 className="text-gray-50 font-medium text-xl">Notes</h1>
            </div>
            <div>
              <button
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                onClick={handleAddNotes}
              >
                Add Notes
              </button>
            </div>
          </div>
          <br />
          <br />
          {Notes.map((note, index) => {
            // Remove HTML tags from the note body

            let noteBodyFirstLine = note.task.replace(/<(.*?)>/g, "");

            return (
              <NotesSidebar
                key={note.id}
                note={note}
                noteText={noteBodyFirstLine}
              />
            );
          })}
        </nav>
      </Pane>
      <NotesArea
        createdNote={Notes}
        activeNote={activeNote}
        setCreatedNotes={setNotes}
        deleteNote={handleDeleteNote}
      />
    </SplitPane>
  );
}
