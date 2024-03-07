import "./index.css";
import React from "react";
import { SidebarSection } from "./components/Sidesbar.jsx";

function App() {
  return (
    <div
      className="mx-5 mt-5 border rounded-lg border-gray-200"
      style={{ height: 800 }}
    >
      <SidebarSection />
    </div>
  );
}

export default App;
