import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import About from "./Components/About";
import Alert from "./Components/Alert";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import NoteState from "./context/notes/noteState";
import Register from "./Components/Register"; 

function App() {

  const [alert, setAlert] = useState(null);

  const showAlert=(msgType, msg)=>{
    setAlert({msgType, msg})

    setTimeout(() => {
        setAlert(null)
    }, 2000);
  }

  return (
    <>
        <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <Routes>
            <Route path="/" element={<Home showAlert={showAlert}/>}/>
            <Route path="/about" element={<About />}/>
            <Route path="/login" element={<Login showAlert={showAlert}/>}/>
            <Route path="/register"  element={<Register showAlert={showAlert}/>}/>
          </Routes>
        </Router>
        </NoteState>
    </>
  );
}

export default App;
