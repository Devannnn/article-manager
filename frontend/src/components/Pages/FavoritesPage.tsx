// Libraries
// Configuration Files
import { Article } from "../Tools/Types";
import { useArticles } from "../../redux/selectors";
// Components
import Card from "../Cards/Card";

/**
 * This component generates the Tag page.
 */
function FavoritesPage() {
  const articles = useArticles();
  const favoris = articles.filter(
    (article: Article) => article.favorite === true
  );

  return (
    <div className="mx-32 my-16 grid grid-cols-4 gap-3">
      {favoris.map((article: Article) => (
        <Card
          key={article.id}
          title={article.title}
          author={article.author}
          year={article.year}
          url={article.url}
        />
      ))}
    </div>
  );
}

// Exportation
export default FavoritesPage;
