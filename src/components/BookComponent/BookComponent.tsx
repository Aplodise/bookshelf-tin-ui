import { Book } from "../../types/Book";
import blankBookImage from "../../assets/blank-book.avif";
import "./Book.css";
import { useAuth } from "../../services/AuthContext";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios, { AxiosError } from "axios";
export default function BookComponent({
  book,
  onDelete,
}: {
  book: Book;
  onDelete: (id: number) => void;
}) {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [showCollectionOptions, setShowCollectionOptions] =
    useState<boolean>(false);
  const handleDelete = async () => {
    const isConfirmed = window.confirm(t("Books.ConfirmDelete"));
    if (!isConfirmed) {
      return;
    }
    try {
      await axios.delete(`http://localhost:8080/books/${book.id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      onDelete(book.id);
      alert(t("Books.DeleteSuccessful"));
    } catch (error) {
      console.error("Failed to delete the book:", error);
      alert(t("Books.DeleteFailed"));
    }
  };

  const handleAddToCollection = async (status: string) => {
    try {
      const collectionRequest = {
        login: user?.login,
        bookId: book.id,
        status: status,
      };

      await axios.post("http://localhost:8080/collections", collectionRequest, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      alert(t("Books.AddToCollectionSuccess"));
    } catch (error: unknown) {
          if (error instanceof AxiosError) {
            if (error.response && error.response.status === 409) {
              alert(t("Books.BookAlreadyInCollection"));
            } else {
              console.error("Failed to add the book to collection:", error);
              alert(t("Books.AddToCollectionFailed"));
            }
          } else {
            console.error("An unknown error occurred:", error);
            alert(t("Books.AddToCollectionFailed"));
          }
        } finally {
          setShowCollectionOptions(false);
        }
      };

  return (
    <div className="book-holder">
      <div className="image-holder">
        <Link to={`/books/${book.id}`}>
          <img
            src={book.coverUrl ? book.coverUrl : blankBookImage}
            alt={book.title}
          />
        </Link>
      </div>
      <div className="book-details">
        <Link to={`/books/${book.id}`}>{book.title}</Link>
        <div className="book-details-author">
          <Link to={`/authors/${book.author.id}`}>
            {book.author.firstName} {book.author.lastName}
          </Link>
        </div>
        <div></div>
      </div>
      {user && (
        <div className="book-to-collection">
          <button
            className="btn-collection"
            onClick={() => setShowCollectionOptions(!showCollectionOptions)}
          >
            {t("Books.AddToCollection")}
          </button>
          {showCollectionOptions && (
            <div className="collection-options">
              <button
                className="btn-collection-option"
                onClick={() => handleAddToCollection("IN_PROGRESS")}
              >
                {t("Books.Collection.InProgress")}
              </button>
              <button
                className="btn-collection-option"
                onClick={() => handleAddToCollection("PLANNED")}
              >
                {t("Books.Collection.Planned")}
              </button>
              <button
                className="btn-collection-option"
                onClick={() => handleAddToCollection("READ")}
              >
                {t("Books.Collection.Read")}
              </button>
            </div>
          )}
        </div>
      )}
      {user && user.role === "ADMIN" && (
        <div className="book-to-collection">
          <button className="btn-delete" onClick={handleDelete}>
            {t("Books.DeleteButton")}
          </button>
        </div>
      )}
    </div>
  );
}
