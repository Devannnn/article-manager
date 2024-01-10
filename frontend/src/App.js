// Bibliothèques
import { Routes, Route } from "react-router-dom";
import BarreNavigation from "./components/BarreNavigation";
import Articles from "./components/Articles";
import Tags from "./components/Tags";

function App() {
  return (
    <div className="App">
      <BarreNavigation />
      <Routes>
        <Route exact path="/" element={<Articles />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/tags" element={<Tags />} />
      </Routes>
    </div>
  );
}

export default App;
