import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function BookDetails() {

  const { id } = useParams();

  const [book, setBook] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/public/books/${id}`)
      .then((response) => {
        setBook(response.data.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!book) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <div className="grid md:grid-cols-2 gap-10">

          {/* Left Side - Book Image */}
          <div className="flex justify-center">
            <img
              src={book.volumeInfo.imageLinks?.thumbnail}
              alt={book.volumeInfo.title}
              className="w-72 rounded-lg shadow-md hover:scale-105 transition duration-300"
            />
          </div>

          {/* Right Side - Book Details */}
          <div>

            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {book.volumeInfo.title}
            </h1>

            <p className="text-gray-500 italic mb-5">
              {book.volumeInfo.subtitle || "No Subtitle Available"}
            </p>

            <div className="space-y-3 text-lg">

              <p>
                <span className="font-semibold">Author:</span>{" "}
                {book.volumeInfo.authors?.join(", ") || "Unknown"}
              </p>

              <p>
                <span className="font-semibold">Publisher:</span>{" "}
                {book.volumeInfo.publisher || "Unknown"}
              </p>

              <p>
                <span className="font-semibold">Published:</span>{" "}
                {book.volumeInfo.publishedDate || "N/A"}
              </p>

              <p>
                <span className="font-semibold">Categories:</span>{" "}
                {book.volumeInfo.categories?.join(", ") || "N/A"}
              </p>

              <p>
                <span className="font-semibold">Language:</span>{" "}
                {book.volumeInfo.language?.toUpperCase()}
              </p>

            </div>

          </div>

        </div>

        {/* Description */}
        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-4 border-b pb-2">
            Description
          </h2>

          <p className="text-gray-700 leading-8">
            {book.volumeInfo.description || "No Description Available"}
          </p>

        </div>

        <button onClick={() => navigate(-1)} className="mt-10 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
          Back
        </button>

      </div>
    </div>
  );
}

export default BookDetails
