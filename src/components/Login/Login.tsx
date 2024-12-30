import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
import { useState } from "react";
import { useTranslation } from "react-i18next";
export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    login: "",
    password: "",
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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await login(formData.login, formData.password);
        navigate("/books");
      } catch (error) {
        setError(t('Login.LoginError'));
        console.log(error);
      }
    }
  };
  return (
    <div className="registration-con">
      <h2>{t('Login.Login')}</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div>
          <label>{t('Login.Login')}</label>
          <input
            type="text"
            name="login"
            value={formData.login}
            onChange={handleInputChange}
          />
          {errors.login && <p className="error">{errors.login}</p>}
        </div>
        <div>
          <label>{t('Login.Password')}</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="register-btn">
          {t('Login.Login')}
        </button>
      </form>
    </div>
  );
}
