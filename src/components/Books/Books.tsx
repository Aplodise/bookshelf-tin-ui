import { useEffect, useState } from "react";
import axios from "axios";
import { Book } from "../../types/Book";
import BookComponent from "../BookComponent/BookComponent";
import "./Books.css";
import PaginationComponent from "../Pagination/PaginationComponent";
export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchBooks = async (page: number) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`http://localhost:8080/books`, {
        params: {
          page: page - 1,
        },
      });
      const data = await response.data;

      setBooks(data.books);
      setTotalPages(data.pageCount);
    } catch (err) {
      setError("Failed to fetch books. Please try again.");
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

  const handleDeleteBook = (id: number) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };
  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);

  return (
    <div className="books-container">
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="book-list">
        {books.map((book) => (
          <BookComponent key={book.id} book={book} onDelete={handleDeleteBook} />
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
