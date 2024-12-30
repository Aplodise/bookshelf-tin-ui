import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
import "./Register.css";
import { useTranslation } from "react-i18next";
interface FormData {
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "ADMIN" | "USER";
}
export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    login: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "USER",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.login.trim()) {
      newErrors.login = "Login is required.";
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters.";
    }

    if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await register(
          formData.login,
          formData.password,
          formData.firstName,
          formData.lastName,
          formData.role
        );
        navigate("/books");
      } catch (error) {
        setError(t("Register.RegisterError"));
        console.log(error);
      }
    }
  };

  return (
    <div className="registration-con">
      <h2>{t("Register.Register")}</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div>
          <label>{t("Register.Login")}</label>
          <input
            type="text"
            name="login"
            value={formData.login}
            onChange={handleInputChange}
          />
          {errors.login && <p className="error">{errors.login}</p>}
        </div>
        <div>
          <label>{t("Register.Password")}</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div>
          <label>{t("Register.FirstName")}</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>
        <div>
          <label>{t("Register.LastName")}</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>
        <div>
          <label>{t("Register.Role")}</label>
          <select name="role" value={formData.role} onChange={handleInputChange}>
            <option value="ADMIN">{t('Register.Admin')}</option>
            <option value="USER">{t('Register.User')}</option>
          </select>
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="register-btn">
          {t("Register.Register")}
        </button>
      </form>
    </div>
  );
}
