// Bibliothèques
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Structure/NavBar";
import FavoritesPage from "./components/Pages/FavoritesPage";
import ArticlesPage from "./components/Pages/ArticlesPage";
import useDataLoader from "./components/Hooks/useDataLoader";
import NotificationBox from "./components/Structure/NotificationBox";

function App() {
  useDataLoader();

  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <div className="h-96 flex-grow m-4">
        <Routes>
          <Route exact path="/" element={<ArticlesPage />} />
          <Route exact path="/favoris" element={<FavoritesPage />} />
          <Route path="*" element={<ArticlesPage />} />
        </Routes>
      </div>
      <NotificationBox />
    </div>
  );
}

// Exportation
export default App;
