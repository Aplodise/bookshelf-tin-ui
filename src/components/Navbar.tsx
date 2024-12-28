import { useTranslation } from "react-i18next";
import { useAuth } from "../services/AuthContext";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
export default function Navbar() {
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="/books"
            className={({ isActive }) => (isActive ? "activeNav" : "")}
          >
            {t("Navbar.Books")}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/authors"
            className={({ isActive }) => (isActive ? "activeNav" : "")}
          >
            {t("Navbar.Authors")}
          </NavLink>
        </li>
        {user && user.role === "USER" && (
          <li>
            <NavLink
              to="/my-collection"
              className={({ isActive }) => (isActive ? "activeNav" : "")}
            >
              {t("Navbar.MyCollection")}
            </NavLink>
          </li>
        )}
        {user && user.role === "ADMIN" && (
          <>
            <li>
              <NavLink
                to="/add-book"
                className={({ isActive }) => (isActive ? "activeNav" : "")}
              >
                {t("Navbar.AddBook")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/add-author"
                className={({ isActive }) => (isActive ? "activeNav" : "")}
              >
                {t("Navbar.AddAuthor")}
              </NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink
            to="/register"
            className={({ isActive }) => (isActive ? "activeNav" : "")}
          >
            {user ? t("Logout") : t("Navbar.Register")}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? "activeNav" : "")}
          >
            {user ? t("Logout") : t("Navbar.Login")}
          </NavLink>
        </li>
        <li className="language-selector">
          <div className="dropdown">
            <div className="dropdown-toggle">Language</div>
            <div className="dropdown-menu">
              <div className="dropdown-item" onClick={() => changeLanguage("en")}>
                English
              </div>
              <div className="dropdown-item" onClick={() => changeLanguage("ru")}>
                Russian
              </div>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
}
