import { Routes, Route } from 'react-router-dom';
import Footer from './components/layout/Footer';
import NavBar from './components/layout/NavBar';
import FavoritesPage from './components/pages/FavoritesPage';
import ArticlesPage from './components/pages/ArticlesPage';
import StatsPage from './components/pages/StatsPage';
import HomePage from './components/pages/HomePage';
import { Toaster } from 'sonner';
import { useIsDarkMode } from './contexts/ThemeContext';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { isConnected } = useAuth();
  const isDarkMode = useIsDarkMode();

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200 text-slate-900 transition-colors dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 dark:text-slate-100">
      <NavBar />
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        {isConnected ? (
          <Routes>
            <Route path="/" element={<ArticlesPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/favoris" element={<FavoritesPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="*" element={<ArticlesPage />} />
          </Routes>
        ) : (
          <HomePage />
        )}
      </div>
      <Footer />
      <Toaster position="top-center" theme={isDarkMode ? 'dark' : 'light'} richColors closeButton />
    </div>
  );
}

export default App;
