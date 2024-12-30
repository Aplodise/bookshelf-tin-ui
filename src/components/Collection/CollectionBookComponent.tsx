import { Collection } from "./MyCollection";
import { Link } from "react-router-dom";
import blankBookImage from "../../assets/blank-book.avif";
import { useTranslation } from "react-i18next";
import "./CollectionBookComponent.css";
import axios from "axios";
import { useAuth } from "../../services/AuthContext";
import { useState } from "react";

export default function CollectionBookComponent({
  collection,
  onDelete,
  onUpdate,
}: {
  collection: Collection;
  onDelete: (id: number) => void;
  onUpdate: (updatedCollection: Collection) => void;
}) {
  const { user } = useAuth();
  const { t, i18n } = useTranslation();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newStatus, setNewStatus] = useState<
    "READ" | "IN_PROGRESS" | "PLANNED" | null
  >(null);

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat(i18n.language, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
    const formattedTime = date.toLocaleTimeString(i18n.language, {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${formattedDate} ${t("Time.At")} ${formattedTime}`;
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm(t("Collection.ConfirmDelete"));
    if (!isConfirmed) return;

    try {
      await axios.delete(`http://localhost:8080/collections/${collection.id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      onDelete(collection.id);
      alert(t("Collection.DeleteSuccess"));
    } catch (err) {
      console.log(err);
      alert(t("Collection.DeleteError"));
    }
  };

  const isStatusChangeAllowed = (
    status: "READ" | "IN_PROGRESS" | "PLANNED"
  ) => {
    if (collection.status === "READ") return false;
    if (collection.status === "IN_PROGRESS" && status === "PLANNED")
      return false;
    if (status === collection.status) return false;

    return true;
  };

  const handleStatusChange = async () => {
    if (!newStatus || newStatus === collection.status) return;

    try {
      const response = await axios.put(
        `http://localhost:8080/collections/${collection.id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      const updatedCollection = await response.data;
      onUpdate(updatedCollection);
      alert(t("Collection.StatusChangeSuccess"));
      setIsEditing(false);
    } catch (err) {
      console.log(err);
      alert(t("Collection.StatusChangeError"));
    }
  };

  return (
    <div className="book-holder">
      <div className="image-holder">
        <Link to={`/books/${collection.bookDto.id}`}>
          <img
            src={
              collection.bookDto.coverUrl
                ? collection.bookDto.coverUrl
                : blankBookImage
            }
            alt={collection.bookDto.title}
          />
        </Link>
      </div>
      <div className="book-details">
        <Link to={`/books/${collection.bookDto.id}`}>
          {collection.bookDto.title}
        </Link>
        <div className="book-details-author">
          <Link to={`/authors/${collection.bookDto.author.id}`}>
            {collection.bookDto.author.firstName}{" "}
            {collection.bookDto.author.lastName}
          </Link>
        </div>
        <div className="status">
          {t("Collection.Status.Status")}{" "}
          {t(`Collection.Status.${collection.status}`)}
        </div>
        {collection.readDate && (
          <div className="readdate">
            {t("Collection.ReadDate")} {formatDateTime(collection.readDate)}
          </div>
        )}
        <div className="book-to-collection">
          <button className="btn-delete" onClick={handleDelete}>
            {t("Books.DeleteButton")}
          </button>
        </div>
        {!isEditing &&
          (collection.status === "IN_PROGRESS" ||
            collection.status === "PLANNED") && (
            <button className="btn-edit" onClick={() => setIsEditing(true)}>
              {t("Collection.EditButton")}
            </button>
          )}
        {isEditing && (
          <div className="status-edit">
            <select
              value={newStatus ?? collection.status}
              onChange={(e) =>
                setNewStatus(
                  e.target.value as "READ" | "IN_PROGRESS" | "PLANNED"
                )
              }
            >
              <option
                value="IN_PROGRESS"
                disabled={!isStatusChangeAllowed("IN_PROGRESS")}
              >
                {t("Collection.Status.IN_PROGRESS")}
              </option>
              <option
                value="PLANNED"
                disabled={!isStatusChangeAllowed("PLANNED")}
              >
                {t("Collection.Status.PLANNED")}
              </option>
              <option value="READ" disabled={!isStatusChangeAllowed("READ")}>
                {t("Collection.Status.READ")}
              </option>
            </select>
            <button
              onClick={handleStatusChange}
              disabled={newStatus === collection.status || !newStatus}
            >
              {t("Collection.SaveChanges")}
            </button>
            <button onClick={() => setIsEditing(false)}>
              {t("Collection.CancelEdit")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
