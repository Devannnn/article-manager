import { ReactNode } from 'react';
import { Article } from '../../constants/types';
import { useArticles } from '../../hooks/queries';
import { useIsDarkMode } from '../../contexts/ThemeContext';
import { useEditArticle } from '../../hooks/mutations';
import Card from '../features/Card';
import PageHeader from '../layout/PageHeader';

export type GridPageCardAction = 'liked' | 'readLater';

interface GridPageProps {
  title: string;
  description: string;
  emptyMessage: string;
  filter: (article: Article) => boolean;
  badge: (count: number) => ReactNode;
  clearPatch: (article: Article) => Article;
  cardAction: GridPageCardAction;
}

function GridPage({ title, description, emptyMessage, filter, badge, clearPatch, cardAction }: Readonly<GridPageProps>) {
  const { data: articles = [] } = useArticles();
  const isDarkMode = useIsDarkMode();
  const { mutate: editArticle, isPending: isEditPending } = useEditArticle();
  const filtered = articles.filter(filter);

  function handleClear(article: Article): void {
    editArticle(clearPatch(article));
  }

  return (
    <div className="space-y-5">
      <PageHeader title={title} description={description}>
        {badge(filtered.length)}
      </PageHeader>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500 dark:border-slate-600 dark:bg-slate-800/50 dark:text-slate-300">
          {emptyMessage}
        </div>
      ) : (
        <div className="rounded-2xl p-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((article) => (
              <Card
                key={article.id}
                title={article.title}
                author={article.author}
                year={article.year}
                url={article.url}
                isDarkMode={isDarkMode}
                {...(cardAction === 'liked'
                  ? { onUnlike: () => handleClear(article), isUnlikePending: isEditPending }
                  : { onClearReadLater: () => handleClear(article), isClearReadLaterPending: isEditPending })}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default GridPage;
