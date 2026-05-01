import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const getScreenshots = (theme: string) => {
  return [
    {
      src: `/screenshots/${theme}/articles.PNG`,
      title: 'Collect your reading list',
      description: 'Keep every useful article, blog post, and website in one organized place.',
    },
    {
      src: `/screenshots/${theme}/favorites.PNG`,
      title: 'Find liked articles quickly',
      description: 'Mark articles you like.',
    },
    {
      src: `/screenshots/${theme}/stats.PNG`,
      title: 'Review your habits',
      description: 'Track what you read and understand how your library grows over time.',
    },
  ];
};

function HomePage() {
  const theme = useTheme().theme;
  const isDarkTheme = theme === 'dark';
  const screenshots = getScreenshots(theme);
  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0);
  const currentScreenshot = screenshots[currentScreenshotIndex];

  const carouselArrowBtnClass = isDarkTheme
    ? 'rounded-full border border-slate-500/90 bg-slate-700 p-2 shadow-md shadow-black/30 transition hover:-translate-y-0.5 hover:border-indigo-400 hover:bg-slate-600'
    : 'rounded-full border border-slate-200 bg-white p-2 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-slate-50';
  const carouselChevronColor = isDarkTheme ? '#f8fafc' : '#0f172a';

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentScreenshotIndex((currentIndex) => (currentIndex + 1) % screenshots.length);
    }, 7000);

    return () => window.clearInterval(intervalId);
  }, [screenshots.length]);

  const showPreviousScreenshot = () => {
    setCurrentScreenshotIndex((currentIndex) => (currentIndex - 1 + screenshots.length) % screenshots.length);
  };

  const showNextScreenshot = () => {
    setCurrentScreenshotIndex((currentIndex) => (currentIndex + 1) % screenshots.length);
  };

  return (
    <div className="space-y-10 py-4 sm:py-8">
      <section className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
              Never forget an article you've liked again.
            </h2>
            <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Article Manager helps you collect, organize, like, and review articles, blog posts, and useful websites, so you can easily rediscover
              what you have read.
            </p>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-3 shadow-2xl shadow-slate-300/40 backdrop-blur dark:border-slate-700/70 dark:bg-slate-800/80 dark:shadow-slate-950/30">
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-indigo-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-sky-400/20 blur-3xl" />

          <div className="relative h-[220px] w-full overflow-hidden rounded-[1.5rem] bg-slate-950/5 dark:bg-slate-950/40">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScreenshot.title}
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -32 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="absolute inset-0 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-900/10 dark:bg-slate-900 dark:ring-white/10"
              >
                <img src={currentScreenshot.src} alt={`${currentScreenshot.title} screenshot`} className="h-full w-full object-cover object-top" />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative mt-4 flex items-start justify-between gap-4 px-1">
            <div className="min-h-[7rem] flex-1 pr-2 sm:min-h-[6rem]">
              <p className="text-sm font-semibold text-slate-950 dark:text-white">{currentScreenshot.title}</p>
              <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{currentScreenshot.description}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button type="button" aria-label="Show previous screenshot" onClick={showPreviousScreenshot} className={carouselArrowBtnClass}>
                <ChevronLeft size={20} strokeWidth={2.5} color={carouselChevronColor} aria-hidden />
              </button>
              <button type="button" aria-label="Show next screenshot" onClick={showNextScreenshot} className={carouselArrowBtnClass}>
                <ChevronRight size={20} strokeWidth={2.5} color={carouselChevronColor} aria-hidden />
              </button>
            </div>
          </div>

          <div className="relative mt-4 flex justify-center gap-2">
            {screenshots.map((screenshot, index) => (
              <button
                key={screenshot.title}
                type="button"
                aria-label={`Show ${screenshot.title} screenshot`}
                onClick={() => setCurrentScreenshotIndex(index)}
                className={`h-2.5 rounded-full transition-all ${
                  index === currentScreenshotIndex
                    ? 'w-8 bg-indigo-500'
                    : isDarkTheme
                      ? 'w-2.5 bg-slate-500 hover:bg-slate-400'
                      : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
