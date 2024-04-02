import logo from "./logo.svg";
import KeyCalculator from "./components/key-calculator";
import Search from "./components/dropdown-search";
import SearchSelect from "./components/search-select-bar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Header from "./components/header";
import "./styles/styles.css";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/key-finder" element={<KeyCalculator />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/search-bar" element={<SearchSelect />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
