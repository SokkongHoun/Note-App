import React from "react";
import EditorNavbar from "./EditorNav";

export function NotesArea(props) {
  const [notes, setNotes] = React.useState("");
  const [currentNote, setCurrentNote] = React.useState(null);

  React.useEffect(() => {
    const activeNote = props.activeNote;
    const createdNote = props.createdNote;
    const foundNote = createdNote.find((note) => note.id === activeNote);
    setCurrentNote(() => foundNote);
    if (foundNote) {
      setNotes(foundNote.task);
    }
  }, [props.activeNote, props.createdNote]);

  React.useEffect(() => {
    if (currentNote) {
      console.log(currentNote.task);
    }
  }, [currentNote]);

  function handleOnChanges(event) {
    setNotes(event.target.value);

    const updatedNotes = props.createdNote.map((note) =>
      note.id === props.activeNote
        ? { ...note, task: event.target.value }
        : note
    );
    props.setCreatedNotes(updatedNotes);
  }

  return (
    <div className="h-full flex flex-col rounded-r-lg">
      <EditorNavbar />
      <div className="rounded-r-lg flex-1 overflow-auto  bg-gray-50 dark:bg-gray-700 ">
        <div className="px-4 py-2 bg-white dark:bg-gray-800 h-full">
          <textarea
            id="comment"
            className="w-full h-full px-3 py-3 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
            placeholder="Add your notes..."
            value={notes}
            onChange={handleOnChanges}
          />
        </div>
      </div>
    </div>
  );
}
