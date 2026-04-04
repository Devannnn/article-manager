import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Structure/NavBar";
import FavoritesPage from "./components/Pages/FavoritesPage";
import ArticlesPage from "./components/Pages/ArticlesPage";
import useLoadConfig from "./hooks/useLoadConfig";
import NotificationBox from "./components/Structure/NotificationBox";

function App() {
  useLoadConfig();

  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <div className="h-96 flex-grow m-4">
        <Routes>
          <Route path="/" element={<ArticlesPage />} />
          <Route path="/favoris" element={<FavoritesPage />} />
          <Route path="*" element={<ArticlesPage />} />
        </Routes>
      </div>
      <NotificationBox />
    </div>
  );
}

export default App;
