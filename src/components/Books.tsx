import { useEffect, useState } from "react";
import axios from "axios";
import { Book } from "../types/Book";
import BookComponent from "./BookComponent";
import './Books.css';
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
        const response = await axios.get(
          `http://localhost:8080/books`,
          {
            params: {
              page: page - 1, 
            },
          }
        );
        const data = await response.data;
  
        setBooks(data.book);
        setTotalPages(data.pageCount); 
      } catch (err) {
        setError("Failed to fetch books. Please try again.");
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
      fetchBooks(currentPage);
    }, [currentPage]);
  
    return (
      <div className="books-container">
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
  
        <div className="book-list">
          {books.map((book) => (
            <BookComponent key={book.id} book={book}/>
          ))}
        </div>
  
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
  
          <span>
            Page {currentPage} of {totalPages}
          </span>
  
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    );
}
