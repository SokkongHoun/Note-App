import "./index.css";
import React from "react";
import Sidebar from "./components/Sidesbar";

function App() {
  return (
    <div
      className="mx-5 mt-5 border rounded-lg border-gray-200"
      style={{ height: 800 }}
    >
      <Sidebar />
    </div>
  );
}

export default App;
