
import { useState, useEffect } from "react";
import axios from "axios";
import api from "./services/api";
import BookCard from './components/BookCard'
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import './App.css'



function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book/:id" element={<BookDetails />} />
    </Routes>
  );
}

export default App
