import React from "react";
import SplitPane, { Pane } from "split-pane-react";
import NotesArea from "./Textarea";
import "split-pane-react/esm/themes/default.css";
import { EditIcon } from "../assets/icon";

export function Sidebar() {
  const [sizes, setSizes] = React.useState([100, "30%", "auto"]);
  const [addNotes, setAddNotes] = React.useState([]);

  function NotesSidebar({ noteNumber }) {
    return (
      <div className="cursor-pointer hover:bg-gray-600">
        <div className="flex justify-between px-4">
          <h1 className="flex items-center h-10">Note {noteNumber}</h1>
          <button>{EditIcon()}</button>
        </div>
      </div>
    );
  }

  function handleAddNotes() {
    const id = Date.now();
    setAddNotes((prevNotes) => [
      ...prevNotes,
      {
        id: id,
        title: "",
        task: "",
      },
    ]);
    console.log(addNotes);
  }

  return (
    <SplitPane split="vertical" sizes={sizes} onChange={setSizes}>
      <Pane minSize={200} maxSize="30%">
        <nav className="h-full rounded-l-lg  border border-gray-200 g bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-white">
          <div className="mt-5 flex flex-row  justify-between px-4">
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
          {addNotes.map((note, index) => (
            <NotesSidebar key={note.id} noteNumber={index + 1} />
          ))}
        </nav>
      </Pane>
      <NotesArea createdNote={addNotes} />
    </SplitPane>
  );
}
