import { useEffect, useState } from "react";
import { AuthorCard } from "../../types/AuthorType";
import axios from "axios";
import PaginationComponent from "../Pagination/PaginationComponent";
import AuthorComponent from "../Author/AuthorComponent";
export default function Authors() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [authors, setAuthors] = useState<AuthorCard[]>([]);

  const fetchAuthors = async (page: number) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`http://localhost:8080/authors`, {
        params: {
          page: page - 1,
        },
      });
      const data = await response.data;
      setAuthors(data.authors);
      setTotalPages(data.pageCount);
    } catch (err) {
      setError("Failed to fetch authors. Please try again.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    fetchAuthors(currentPage);
  }, [currentPage]);

  return (
    <div className="books-container">
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="book-list">
        {authors.map((author) => (
          <AuthorComponent key={author.id} author={author} />
        ))}
      </div>
      <PaginationComponent
        handlePageChange={handlePageChange}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </div>
  );
}
