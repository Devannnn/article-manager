interface PropsType {
  title: string;
  author: string;
  year: number;
  url: string;
}

function Card({ title, author, year, url }: Readonly<PropsType>) {
  return (
    <div className="rounded-lg shadow-2xl bg-gradient-to-br from-blue-400 to-red-600">
      <div className="h-full flex flex-col justify-between p-3">
        <h1 className="text-md text-white font-bold">
          <a href={url} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h1>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{author}</span>
          <span className="text-sm font-semibold">{year}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
