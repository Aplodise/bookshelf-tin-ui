import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { useAuth } from "./services/AuthContext";
import Books from "./components/Books";
import Authors from "./components/Authors";
import MyCollection from "./components/MyCollection";
import AddBook from "./components/AddBook";
import AddAuthor from "./components/AddAuthor";
import Register from "./components/Register";
import Login from "./components/Login";
import BookDetails from "./components/BookDetailsComponent";
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
        {user && user.role === "USER" && (
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
