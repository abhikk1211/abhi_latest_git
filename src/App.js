import React, { useState } from "react";

import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import Alert from "./components/Alert";
import About from "./components/About";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [mode, setMode] = useState("light");
  const [reverseMode, setReverseMode] = useState("dark");
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.classList.remove("bg-light");
      document.body.classList.add("bg-dark");
      setReverseMode("light");
      showAlert("Dark Mode Enabled", "success");
    } else if (mode === "dark") {
      setMode("light");
      document.body.classList.remove("bg-dark");
      document.body.classList.add("bg-light");
      setReverseMode("dark");
      showAlert("Light Mode Enabled", "warning");
    }
  };

  return (
    <>
      <Router>
        <Navbar
          title="PatentTextUtils"
          mode={mode}
          reverseMode={reverseMode}
          toggleMode={toggleMode}
        ></Navbar>
        <Alert alert={alert}></Alert>
        <Routes>
          <Route exact path="/About" element={<About mode={mode}></About>} />
          <Route
            exact
            path="/"
            element={
              <TextForm
                heading="Enter the text to analyzed"
                mode={mode}
                reverseMode={reverseMode}
                toggleMode={toggleMode}
                showAlert={showAlert}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
