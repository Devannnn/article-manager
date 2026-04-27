function HomePage() {
  return (
    <div className="space-y-10 py-4 sm:py-8">
      <section className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
              Never forgets an article you've liked again.
            </h2>
            <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Article Manager helps you collect, organize, favorite, and review articles, blog posts, and useful websites, so you can easily
              rediscover what you have read.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
