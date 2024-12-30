import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BookDetails } from "../../types/BookDetails";
import axios, { AxiosError } from "axios";
import ErrorComponent from "../ErrorComponent";
import "./BookDetails.css";
import blankbook from "../../assets/blank-book.avif";
import { useAuth } from "../../services/AuthContext";
import { useTranslation } from "react-i18next";
import BookComment from "../BookComment/BookComment";
import { Link } from "react-router-dom";
const GET_BOOK_URL = "http://localhost:8080/books/";

interface CommentDto {
  login: string | undefined;
  bookId: number;
  comment: string;
}

export default function BookDetailsComponent() {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [book, setBook] = useState<BookDetails | null>(null);
  const { user } = useAuth();
  const { t } = useTranslation();
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [showCollectionOptions, setShowCollectionOptions] =
    useState<boolean>(false);
  const [comment, setComment] = useState<CommentDto>({
    login: user?.login,
    bookId: Number(id),
    comment: "",
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newSummary, setNewSummary] = useState<string>("");
  useEffect(() => {
    if (!id) {
      setError(t("Books.BookIdError"));
      return;
    }
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`${GET_BOOK_URL}${id}`);
        setBook(response.data);
        setNewSummary(response.data.summary || "");
      } catch (err) {
        setError(t("Books.FetchError") + err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookDetails();
  }, [id]);

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment((prev) => ({ ...prev, comment: e.target.value }));
  };
  const handlePublishReview = async () => {
    if (!user) return;

    try {
      setIsPublishing(true);
      const response = await axios.post(
        "http://localhost:8080/comments",
        comment,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setBook((prevBook) => {
        if (!prevBook) return prevBook;
        return {
          ...prevBook,
          comments: [...prevBook.comments, response.data],
        };
      });
      setComment((prev) => ({ ...prev, comment: "" }));
    } catch (err) {
      console.log(err);
      alert(t("Books.CommentError"));
    } finally {
      setIsPublishing(false);
    }
  };
  const handleAddToCollection = async (status: string) => {
    try {
      const collectionRequest = {
        login: user?.login,
        bookId: book?.id,
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

  const handleEditClick = () => {
    setIsEditing(true);
    setNewSummary(book?.summary || "");
  };

  const handleSaveClick = async () => {
    if (newSummary.length < 2 || newSummary.length > 2000) {
      alert(t("Books.SummaryValidationError"));
      return;
    }

    try {
      const response = await axios.put(
        `${GET_BOOK_URL}${id}`,
        {summary: newSummary},
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      console.log(response.data.summary);
      console.log(response.data);
      setBook((prevBook) => {
        if (prevBook) {
          return {
            ...prevBook,
            summary: response.data.summary,
          };
        }
        return prevBook;
      });
      setIsEditing(false);
    } catch (err) {
      console.log(err);
      alert(t("Books.EditError"));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorComponent message={error} />;
  if (!book) return <Navigate to="/books" />;

  return (
    <div className="book-details-pane">
      <div className="book-details-con">
        <div className="book-cover">
          <img
            src={book.coverUrl ? book.coverUrl : blankbook}
            alt={book.title}
          />
        </div>
        <div className="book-details-summary">
          <h1>{book.title}</h1>
          <div className="book-details-author">
            <Link to={`/authors/${book.author.id}`}>
              {book.author.firstName} {book.author.lastName}
            </Link>
          </div>
          {isEditing ? (
            <textarea
              value={newSummary}
              onChange={(e) => setNewSummary(e.target.value)}
              rows={4}
            />
          ) : (
            <p>{book.summary}</p>
          )}
          {user?.role === "ADMIN" && !isEditing && (
            <button onClick={handleEditClick} className="btn-edit-summary">
              {t("Books.EditSummary")}
            </button>
          )}
          {isEditing && (
            <button onClick={handleSaveClick} className="btn-save-summary">
              {t("Books.SaveSummary")}
            </button>
          )}

          {user && (
            <div className="book-details-to-collection">
              <button
                className="btn-collection"
                onClick={() => setShowCollectionOptions(!showCollectionOptions)}
              >
                {t("Books.AddToCollection")}
              </button>
              {showCollectionOptions && (
                <div className="book-details-collection-options">
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
        </div>
      </div>
      {user && (
        <div className="book-review-section">
          <h2>{t("Books.EnterYourReview")}</h2>
          <textarea
            value={comment.comment}
            onChange={handleReviewChange}
            placeholder={t("Books.WriteYourReview")}
            rows={4}
          />
          <div className="review-actions">
            <button
              className="btn-publish-review"
              onClick={handlePublishReview}
              disabled={isPublishing}
            >
              {isPublishing ? t("Books.Publishing") : t("Books.Publish")}
            </button>
          </div>
        </div>
      )}
      <div className="book-comments-section">
        <h2>{t("Books.Reviews")}</h2>
        {book.comments && book.comments.length > 0 ? (
          book.comments.map((comment) => (
            <BookComment key={comment.id} bookComment={comment} />
          ))
        ) : (
          <p className="no-comments">{t("Books.NoCommentsYet")}</p>
        )}
      </div>
    </div>
  );
}
