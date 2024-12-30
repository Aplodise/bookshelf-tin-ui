import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useAuth } from "../../services/AuthContext";
import axios from "axios";
import '../AddAuthor/AddAuthor.css'
interface BookFormData {
  authorId: string;
  summary: string;
  coverUrl: string | null;
  genre: string;
  title: string;
}

interface ValidationErrors {
  authorId?: string;
  summary?: string;
  genre?: string;
  title?: string;
  file?: string;
}

interface Author {
  id: number;
  firstName: string;
  lastName: string;
}
export default function AddBook() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<BookFormData>({
    authorId: "",
    summary: "",
    coverUrl: null,
    genre: "",
    title: "",
  });
  const [authors, setAuthors] = useState<Author[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const { user } = useAuth();

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get<Author[]>(
          "http://localhost:8080/authors/dropdown",
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        setAuthors(response.data);
      } catch (error) {
        console.error(t('AddBook.AuthorsFetchError'), error);
      }
    };
    fetchAuthors();
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type.startsWith("image/")) {
        setFile(selectedFile);
        setErrors((prevErrors) => ({ ...prevErrors, file: undefined }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          file: t('AddAuthor.ImageError'),
        }));
        setFile(null);
      }
    }
  };

  const validate = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.authorId.trim()) {
      newErrors.authorId = t('AddBook.AuthorRequiredError');
    }

    if (!formData.summary.trim()) {
      newErrors.summary =  t('AddAuthor.SummaryRequiredError');
    } else if (formData.summary.length > 2000) {
      newErrors.summary = t('AddAuthor.SummarySizeError');
    }

    if (!formData.genre.trim()) {
      newErrors.genre = t('AddBook.GenreRequiredError');
    } else if (formData.genre.length > 50) {
      newErrors.genre = t('AddBook.GenreSizeError');
    }

    if (!formData.title.trim()) {
      newErrors.title = t('AddBook.TitleRequiredError');
    } else if (formData.title.length < 2 || formData.title.length > 100) {
      newErrors.title = t('AddBook.TitleSizeError');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadFile = async (): Promise<string | null> => {
    if (!file) return null;
    if (!user || !user.token) {
      setUploadError(t('AddAuthor.AuthenticationError'));
      return null;
    }

    const fileData = new FormData();
    fileData.append("file", file);

    try {
      setIsUploading(true);
      const response = await axios.post<string>(
        "http://localhost:8080/api/upload/books",
        fileData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setIsUploading(false);
      return response.data;
    } catch (error) {
      setIsUploading(false);
      setUploadError(t('AddAuthor.UploadError'));
      console.error(error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const uploadedCoverUrl = await uploadFile();

    const bookData: BookFormData = {
      ...formData,
      coverUrl: uploadedCoverUrl || null,
    };

    try {
      if (!user || !user.token) {
        alert(t('AddAuthor.AuthenticationError'));
        return;
      }

      await axios.post("http://localhost:8080/books", bookData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      alert(t('AddBook.BookCreatedAlert'));
      setFormData({
        authorId: "",
        summary: "",
        coverUrl: null,
        genre: "",
        title: "",
      });
      setFile(null);
      setErrors({});
    } catch (error) {
      console.error("Error creating book:", error);
      alert(t('AddBook.BookCreatedErrorAlert'));
    }
  };
  return (
    <div className="registration-con">
    <form onSubmit={handleSubmit} className="register-form">
      <div>
        <label>{t('AddBook.Author')}</label>
        <select
          name="authorId"
          value={formData.authorId}
          onChange={handleChange}
          required
        >
          <option value="">{t('AddBook.SelectAuthor')}</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.firstName} {author.lastName}
            </option>
          ))}
        </select>
        {errors.authorId && <p style={{ color: "red" }}>{errors.authorId}</p>}
      </div>
      <div>
        <label>{t('AddBook.Title')}</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
      </div>
      <div>
        <label>{t('AddBook.Genre')}</label>
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          required
        />
        {errors.genre && <p style={{ color: "red" }}>{errors.genre}</p>}
      </div>
      <div>
        <label>{t('AddAuthor.Summary')}</label>
        <textarea
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          className="add-summary"
          required
        />
        {errors.summary && <p style={{ color: "red" }}>{errors.summary}</p>}
      </div>
      <div>
        <label>{t('AddAuthor.CoverPhoto')}</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {errors.file && <p style={{ color: "red" }}>{errors.file}</p>}
      </div>
      {isUploading && <p>{t('AddAuthor.UploadingImage')}</p>}
      {uploadError && <p style={{ color: "red" }}>{uploadError}</p>}
      <button type="submit" disabled={isUploading}>
      {t('AddBook.CreateBookButton')}
      </button>
    </form>
    </div>
  );
}
