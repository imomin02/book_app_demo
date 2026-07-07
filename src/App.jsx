
import { useState, useEffect } from "react";
import axios from "axios";
import api from "./services/api";
import BookCard from './components/BookCard'
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import Bookmarks from "./pages/Bookmarks";
import './App.css'



function App() {

  const [bookmarks, setBookmarks] = useState(() => {
    const savedBookmarks = localStorage.getItem("bookmarks");
    return savedBookmarks ? JSON.parse(savedBookmarks) : [];
  });

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  return (
    <Routes>
      <Route path="/" element={<Home bookmarks={bookmarks} setBookmarks={setBookmarks} />} />
      <Route path="/book/:id" element={<BookDetails />} />
      <Route path="/bookmarks" element={
        <Bookmarks
          bookmarks={bookmarks}
          setBookmarks={setBookmarks}
        />
      } />
    </Routes>
  );
}

export default App
