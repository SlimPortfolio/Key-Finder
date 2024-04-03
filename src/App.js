import logo from "./logo.svg";
import KeyCalculator from "./components/key-calculator";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Header from "./components/header";
import "./styles/styles.css";
import About from "./components/about";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/Key-Finder/" element={<Home />}></Route>
          <Route path="/Key-Finder/app" element={<KeyCalculator />}></Route>
          <Route path="/Key-Finder/about" element={<About />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
