import { Book } from "../types/Book";
import blankBookImage from "../assets/blank-book.avif";
import "./Book.css";
import { useAuth } from "../services/AuthContext";
import { useTranslation } from "react-i18next";
export default function BookComponent({ book }: { book: Book }) {
  const { user } = useAuth();
  const { t } = useTranslation();
  return (
    <div className="book-holder">
      <div className="image-holder">
        <a href={`/books/${book.id}`}>
          <img
            src={book.coverUrl ? book.coverUrl : blankBookImage}
            alt={book.title}
          />
        </a>
      </div>
      <div className="book-details">
        <a href={`/books/${book.id}`}>{book.title}</a>
        <div className="book-details-author">
          <a href={`/authors/${book.author.id}`}>
            {book.author.firstName} {book.author.lastName}
          </a>
        </div>
        <div></div>
      </div>
      {user && (
        <div className="book-to-collection">
          <button className="btn-collection">
            {t("Books.AddToCollection")}
          </button>
        </div>
      )}
    </div>
  );
}
