import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { useAuth } from "./services/AuthContext";
import Books from "./components/Books/Books";
import Authors from "./components/Authors/Authors";
import MyCollection from "./components/Collection/MyCollection";
import AddBook from "./components/AddBook/AddBook";
import AddAuthor from "./components/AddAuthor/AddAuthor";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import BookDetails from "./components/BookDetails/BookDetailsComponent";
import AuthorDetailsComponent from "./components/Author/AuthorDetailsComponent";
function App() {
  const { user } = useAuth();
  return (
    <>
    <Navbar></Navbar>
    <main>
      <Routes>
        <Route path="/" element={<Navigate to="/books"/>}/>
        <Route path="/books" element={<Books/>}/>
        <Route path="/authors" element={<Authors />} />
        <Route path="/books/:id" element={<BookDetails/>}/>
        <Route path="/authors/:id" element={<AuthorDetailsComponent/>}/>
        {user &&  (
            <Route path="/my-collection" element={<MyCollection />} />
          )}
          {user && user.role === "ADMIN" && (
            <>
              <Route path="/add-book" element={<AddBook />} />
              <Route path="/add-author" element={<AddAuthor />} />
            </>
          )}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
      </Routes>
    </main>
    </>
  );
}

export default App;
