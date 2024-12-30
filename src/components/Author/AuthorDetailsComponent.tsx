import { useParams } from "react-router-dom";
import { AuthorDetailsCard } from "../../types/AuthorType";
const GET_AUTHOR_URL = "http://localhost:8080/authors/";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import ErrorComponent from "../ErrorComponent";
import { Navigate } from "react-router-dom";
import authorSilhouette from "../../assets/silhouette.jpg";
import BookComponent from "../BookComponent/BookComponent";
import "./AuthorDetailsComponent.css";
import { useAuth } from "../../services/AuthContext";

export default function AuthorDetailsComponent() {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [author, setAuthor] = useState<AuthorDetailsCard | null>(null);
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newSummary, setNewSummary] = useState<string>("");
  const {user} = useAuth();

  useEffect(() => {
    if (!id) {
      setError("Invalid id");
      return;
    }
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`${GET_AUTHOR_URL}${id}`);
        setAuthor(response.data);
        setNewSummary(response.data.summary || ""); 
      } catch (err) {
        console.log(err);
        setError(t("AuthorDetails.FetchError"));
      } finally {
        setLoading(false);
      }
    };
    fetchBookDetails();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
    setNewSummary(author?.summary || ""); 
  };

  const handleSaveClick = async () => {
    if (newSummary.length < 2 || newSummary.length > 2000) {
      alert(t("Books.SummaryValidationError"));
      return;
    }

    try {
      const response = await axios.put(
        `${GET_AUTHOR_URL}${id}`,
        { summary: newSummary },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`, 
          },
        }
      );
      setAuthor((prevAuthor) => {
        if (prevAuthor) {
          return { ...prevAuthor, summary: response.data.summary };
        }
        return prevAuthor;
      });
      setIsEditing(false);
    } catch (err) {
      console.log(err);
      alert(t("Books.EditError"));
    }
  };

  const handleBookDelete = (bookId: number) => {
    if (!author) return;
    setAuthor({
      ...author,
      books: author.books.filter((book) => book.id !== bookId),
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorComponent message={error} />;
  if (!author) return <Navigate to="/authors" />;

  return (
    <div className="book-details-pane">
      <div className="book-details-con">
        <div className="book-cover">
          <img
            src={author.coverUrl ? author.coverUrl : authorSilhouette}
            alt={author.firstName}
          />
        </div>
        <div className="book-details-summary">
          <h1>
            {author.firstName} {author.lastName}
          </h1>
          <p>
            {t("AuthorDetails.Birthdate")} {author.birthDate}
          </p>
          <h1>{t("AuthorDetails.Description")}</h1>
          {isEditing ? (
            <textarea
              value={newSummary}
              onChange={(e) => setNewSummary(e.target.value)}
              rows={4}
            />
          ) : (
            <p>{author.summary}</p>
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
        </div>
      </div>
      <div className="authors-book-section">
        <h2>{t("AuthorDetails.AuthorsBooks")}</h2>
        <div className="books-container">
          <div className="book-list">
            {author.books.map((book) => (
              <BookComponent key={book.id} book={book} onDelete={handleBookDelete} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
