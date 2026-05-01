import { Routes, Route } from 'react-router-dom';
import Footer from './components/layout/Footer';
import NavBar from './components/layout/NavBar';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import GridPage from './components/pages/GridPage';
import ArticlesPage from './components/pages/ArticlesPage';
import StatsPage from './components/pages/StatsPage';
import HomePage from './components/pages/HomePage';
import { Toaster } from 'sonner';
import { Article } from './constants/types';
import { useAuth } from './contexts/AuthContext';
import { useIsDarkMode } from './contexts/ThemeContext';
import { useHealth } from './hooks/queries';

function App() {
  const { isConnected } = useAuth();
  const isDarkMode = useIsDarkMode();
  useHealth();

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200 text-slate-900 transition-colors dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 dark:text-slate-100">
      <NavBar />
      <div className={`mx-auto w-full flex-1 px-4 py-6 sm:px-6 sm:py-8 ${isConnected ? 'max-w-6xl' : 'max-w-7xl xl:max-w-[80rem]'}`}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="articles" element={<ArticlesPage />} />
            <Route
              path="favorites"
              element={
                <GridPage
                  title="Favorites"
                  description="Quickly find the articles you want to revisit."
                  emptyMessage="No favorites yet. Add favorites from the Articles page."
                  filter={(article: Article) => article.favorite}
                  badge={(count) => (
                    <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                      {count} favorite{count !== 1 ? 's' : ''}
                    </span>
                  )}
                  clearPatch={(article) => ({ ...article, favorite: false })}
                  cardAction="favorite"
                />
              }
            />
            <Route
              path="read-again"
              element={
                <GridPage
                  title="Read again"
                  description="Articles you plan to revisit—clear the flag when you are done."
                  emptyMessage="No articles marked read again yet. Enable it when editing an article from the Articles page."
                  filter={(article: Article) => article.read_again}
                  badge={(count) => (
                    <span className="inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-800 dark:bg-violet-900/40 dark:text-violet-200">
                      {count} marked
                    </span>
                  )}
                  clearPatch={(article) => ({ ...article, read_again: false })}
                  cardAction="readAgain"
                />
              }
            />
            <Route path="stats" element={<StatsPage />} />
          </Route>
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
      <Footer />
      <Toaster position="top-center" theme={isDarkMode ? 'dark' : 'light'} richColors closeButton />
    </div>
  );
}

export default App;
