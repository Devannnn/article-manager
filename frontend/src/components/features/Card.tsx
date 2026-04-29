import { Star } from 'react-feather';

interface PropsType {
  title: string;
  author: string;
  year: number;
  url: string;
  isDarkMode: boolean;
  onUnfavorite?: () => void;
  isUnfavoritePending?: boolean;
}

function Card({ title, author, year, url, isDarkMode, onUnfavorite, isUnfavoritePending = false }: Readonly<PropsType>) {
  return (
    <div
      className={`group relative h-full rounded-2xl border p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg ${
        isDarkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'
      }`}
    >
      {onUnfavorite && (
        <button
          type="button"
          aria-label={`Remove ${title} from favorites`}
          title="Remove from favorites"
          onClick={onUnfavorite}
          disabled={isUnfavoritePending}
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center text-amber-500 transition hover:text-amber-600 disabled:cursor-not-allowed disabled:opacity-60 dark:text-amber-300"
        >
          <Star size={18} fill="currentColor" aria-hidden="true" />
        </button>
      )}
      <div className="flex h-full flex-col justify-between gap-4">
        <h1 className="pr-10 text-base font-semibold leading-snug text-slate-800 dark:text-slate-100">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-inherit no-underline transition-colors hover:text-indigo-600 dark:hover:text-indigo-300"
          >
            {title}
          </a>
        </h1>
        <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-700/60">
          <span className="max-w-[70%] truncate text-sm font-medium text-slate-600 dark:text-slate-200">{author}</span>
          <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
            {year}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
