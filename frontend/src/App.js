import { Route, BrowserRouter, Routes } from "react-router-dom";
import LogSign from './Components/LogSign';
import Home from "./Components/Home"
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<LogSign />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
