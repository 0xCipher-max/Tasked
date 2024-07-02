import React from "react";
import { TaskProvider } from "./context/TaskContext";
import HomePage from "./components/HomePage";
import "./tailwind.css"; // Import Tailwind CSS

const App = () => {
  return (
    <TaskProvider>
      <div className="App">
        <HomePage />
      </div>
    </TaskProvider>
  );
};

export default App;
