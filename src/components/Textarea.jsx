import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles

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
    setNotes(editor.getHTML());

    const updatedNotes = props.createdNote.map((note) =>
      note.id === props.activeNote ? { ...note, task: editor.getHTML() } : note
    );
    props.setCreatedNotes(updatedNotes);
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
