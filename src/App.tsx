import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SurahDetails from "./components/SurahDetail";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app bg-green-50 min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/surah/:id" element={<SurahDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
