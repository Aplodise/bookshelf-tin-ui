import { useEffect, useState } from "react";
import PaginationComponent from "../Pagination/PaginationComponent";
import { Book } from "../../types/Book";
import { useAuth } from "../../services/AuthContext";
import axios from "axios";
import CollectionBookComponent from "./CollectionBookComponent";
import { useTranslation } from "react-i18next";

export interface Collection {
  id: number;
  status: "READ" | "IN_PROGRESS" | "PLANNED";
  readDate?: string;
  bookDto: Book;
}
export default function MyCollection() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [collection, setCollection] = useState<Collection[]>([]);
  const { user } = useAuth();
  const { t } = useTranslation();

  const fetchCollection = async (page: number, login: string | undefined) => {
    if (!user) {
      setError("No authentication");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/collections/${login}`,
        {
          params: {
            page: page - 1,
          },
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      const data = await response.data;
      setCollection(data.collection);
      setTotalPages(data.pageCount)
    } catch (err) {
      setError(
        "Something went wrong with collection fetching. Please try again"
      );
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) setCurrentPage(newPage);
  };
  const handleDelete = (id: number) => {
    setCollection((prev) => prev.filter((el) => el.id !== id));
  };
  const handleUpdate = (updatedCollection: Collection) => {
    setCollection((prev) =>
      prev.map((col) =>
        col.id === updatedCollection.id ? updatedCollection : col
      )
    );
  };

  useEffect(() => {
    fetchCollection(currentPage, user?.login);
  }, [currentPage, user?.login]);

  return (
    <div className="books-container">
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <div className="book-list">
        {collection.map((col) => (
          <CollectionBookComponent
            key={col.id}
            collection={col}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
      {collection.length!==0 ? (
        <PaginationComponent
          handlePageChange={handlePageChange}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      ) : <p>{t('Collection.NoBooks')}</p>}
    </div>
  );
}
