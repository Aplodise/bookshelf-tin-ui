import { useTranslation } from "react-i18next";
import "./Pagination.css";

export default function PaginationComponent({
  handlePageChange,
  currentPage,
  totalPages,
}: {
  handlePageChange: (page: number) => void;
  currentPage: number;
  totalPages: number;
}) {
  const { t } = useTranslation();
  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {t('Pagination.Previous')}
      </button>

      <span>
        {t('Pagination.Page')} {currentPage} {t('Pagination.Of')} {totalPages}
      </span>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {t('Pagination.Next')}
      </button>
    </div>
  );
}
