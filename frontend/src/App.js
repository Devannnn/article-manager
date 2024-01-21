// Bibliothèques
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Structure/NavBar";
import Dashboard from "./components/Pages/Dashboard";
import ArticleManager from "./components/Pages/ArticleManager";
import Footer from "./components/Structure/Footer";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/articles" element={<ArticleManager />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
      <Footer />
    </div>
  );
}

// Exportation
export default App;
