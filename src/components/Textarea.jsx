import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

export function NotesArea(props) {
  const [notes, setNotes] = React.useState("");
  const [currentNote, setCurrentNote] = React.useState(null);

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction
      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
      ["clean"], // remove formatting button
      ["link", "image", "video"], // link and image, video
    ],
  };

  React.useEffect(() => {
    const activeNote = props.activeNote;
    const createdNote = props.createdNote;
    const foundNote = createdNote.find((note) => note.id === activeNote);
    setCurrentNote(() => foundNote);

    if (foundNote) {
      setNotes(foundNote.task);
    }
  }, [props.activeNote, props.createdNote]);

  function handleOnChanges(content, delta, source, editor) {
    const newContent = editor.getHTML();
    setNotes(newContent);

    /// Find the index of the active note
    const index = props.createdNote.findIndex(
      (note) => note.id === props.activeNote
    );

    if (index !== -1) {
      // Update the task of the active note
      const updatedNote = { ...props.createdNote[index], task: newContent };

      // Remove the active note from its current position
      props.createdNote.splice(index, 1);

      // Add the updated note at the beginning of the array
      props.createdNote.unshift(updatedNote);

      // Update the note in Firestore
      const noteRef = doc(db, "notes", props.activeNote);
      updateDoc(noteRef, updatedNote);
    }

    // Update the state with the modified array
    props.setCreatedNotes([...props.createdNote]);
  }

  return (
    <div className="rounded-r-lg px-4 py-2 bg-white h-full text-black">
      <ReactQuill
        style={{ height: "94.5%", borderRadius: 10 }}
        value={notes}
        onChange={handleOnChanges}
        modules={modules}
      />
    </div>
  );
}

export default NotesArea;
