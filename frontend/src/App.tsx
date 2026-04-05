import { Routes, Route } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import FavoritesPage from "./components/features/FavoritesPage";
import ArticlesPage from "./components/features/ArticlesPage";
import useLoadConfig from "./hooks/useLoadConfig";
import NotificationBox from "./components/layout/NotificationBox";

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
