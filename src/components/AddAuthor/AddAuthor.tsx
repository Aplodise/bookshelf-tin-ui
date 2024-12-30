import { useAuth } from "../../services/AuthContext";
import "./AddAuthor.css";
import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";
interface AuthorFormData {
  firstName: string;
  lastName: string;
  birthDate: string;
  summary: string;
  coverUrl: string | null;
}
interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  summary?: string;
  file?: string;
}
export default function AddAuthor() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [formData, setFormData] = useState<AuthorFormData>({
    firstName: "",
    lastName: "",
    birthDate: "",
    summary: "",
    coverUrl: null,
  });
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
          file: t("AddAuthor.ImageError"),
        }));
        setFile(null);
      }
    }
  };
  const validate = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = t("AddAuthor.FirstNameRequiredError");
    } else if (
      formData.firstName.length < 2 ||
      formData.firstName.length > 50
    ) {
      newErrors.firstName = t("AddAuthor.FirstNameSizeError");
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = t("AddAuthor.LastNameRequiredError");
    } else if (formData.lastName.length < 2 || formData.lastName.length > 50) {
      newErrors.lastName = t("AddAuthor.LastNameSizeError");
    }

    if (!formData.birthDate.trim()) {
      newErrors.birthDate = t("AddAuthor.BirthdateRequiredError");
    } else if (new Date(formData.birthDate) >= new Date()) {
      newErrors.birthDate = t("AddAuthor.BirthdatePastError");
    }

    if (!formData.summary.trim()) {
      newErrors.summary = t("AddAuthor.SummaryRequiredError");
    } else if (formData.summary.length < 2 || formData.summary.length > 2000) {
      newErrors.summary = t("AddAuthor.SummarySizeError");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadFile = async (): Promise<string | null> => {
    if (!file) return null;
    if (!user || !user.token) {
      setUploadError(t("AddAuthor.AuthenticationError"));
      return null;
    }
    const fileData = new FormData();
    fileData.append("file", file);

    try {
      setIsUploading(true);
      const response = await axios.post<string>(
        "http://localhost:8080/api/upload/authors",
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
      setUploadError(t("AddAuthor.UploadError"));
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

    const authorData: AuthorFormData = {
      ...formData,
      coverUrl: uploadedCoverUrl || null,
    };

    try {
      await axios.post("http://localhost:8080/authors", authorData, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      alert(t("AddAuthor.AuthorCreatedAlert"));
      setFormData({
        firstName: "",
        lastName: "",
        birthDate: "",
        summary: "",
        coverUrl: null,
      });
      setFile(null);
      setErrors({});
    } catch (error) {
      console.error("Error creating author:", error);
      alert(t("AddAuthor.AuthorCreatedErrorAlert"));
    }
  };

  return (
    <div className="registration-con">
      <form onSubmit={handleSubmit} className="register-form">
        <div>
          <label>{t("AddAuthor.FirstName")}</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          {errors.firstName && (
            <p style={{ color: "red" }}>{errors.firstName}</p>
          )}
        </div>
        <div>
          <label>{t("AddAuthor.LastName")}</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          {errors.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>}
        </div>
        <div>
          <label>{t("AddAuthor.Birthdate")}</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />
          {errors.birthDate && (
            <p style={{ color: "red" }}>{errors.birthDate}</p>
          )}
        </div>
        <div>
          <label>{t("AddAuthor.Summary")}</label>
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
          <label>{t("AddAuthor.CoverPhoto")}</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {errors.file && <p style={{ color: "red" }}>{errors.file}</p>}
        </div>
        {isUploading && <p>{t("AddAuthor.UploadingImage")}</p>}
        {uploadError && <p style={{ color: "red" }}>{uploadError}</p>}
        <button type="submit" disabled={isUploading}>
          {t("AddAuthor.CreateAuthorButton")}
        </button>
      </form>
    </div>
  );
}
