import { AuthorCard } from "../../types/AuthorType";
import authorSilhoette from "../../assets/silhouette.jpg";
import { Link } from "react-router-dom";
export default function AuthorComponent({ author }: { author: AuthorCard }) {
  return (
    <div className="book-holder">
      <div className="image-holder">
        <Link to={`/authors/${author.id}`}>
          <img
            src={author.coverUrl ? author.coverUrl : authorSilhoette}
            alt={author.firstName}
          />
        </Link>
      </div>
      <div className="book-details">
        <a href={`/authors/${author.id}`}>
          {author.firstName} {author.lastName}
        </a>
      </div>
    </div>
  );
}
