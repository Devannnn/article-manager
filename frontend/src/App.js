// Bibliothèques
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Structure/NavBar";
import Articles from "./components/Pages/Articles";
import WebSites from "./components/Pages/WebSites";
import Favoris from "./components/Pages/Favoris";
import Footer from "./components/Structure/Footer";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <div className="h-96 flex-grow m-4">
        <Routes>
          <Route exact path="/" element={<Articles />} />
          <Route exact path="/websites" element={<WebSites />} />
          <Route exact path="/favoris" element={<Favoris />} />
          <Route path="*" element={<Articles />} />
        </Routes>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}

// Exportation
export default App;
