import React from 'react'
import { useEffect, useState } from "react";
import BookCard from '../components/BookCard'
import api from "../services/api";

function Bookmarks({ bookmarks, setBookmarks }) {

    const [books, setBooks] = useState([]);

    const removeBookmark = (id) => {
        const updatedBookmarks = bookmarks.filter(
            (bookId) => bookId !== id
        );

        setBookmarks(updatedBookmarks);
    }

    useEffect(() => {

        const fetchBooks = async () => {

            const promises = bookmarks.map((id) =>
                api.get(`/public/books/${id}`)
            );

            const responses = await Promise.all(promises);

            const allBooks = responses.map(
                (response) => response.data.data
            );

            setBooks(allBooks);
        };

        if (bookmarks.length > 0) {
            fetchBooks();
        } else {
            setBooks([]);
        }

    }, [bookmarks]);

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">

            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold text-gray-800">
                    ⭐ My Bookmarks
                </h1>

                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
                    {bookmarks.length} Books
                </span>
            </div>

            {bookmarks.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-20">

                    <h2 className="text-2xl font-semibold text-gray-700">
                        No Bookmarks Yet
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Add your favourite books from Home page.
                    </p>

                </div>
            ) : (

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

                    {books.map((book) => (

                        <div
                            key={book.id}
                            className="relative"
                        >

                            <BookCard
                                book={book}
                                showBookmark={false}
                            />

                            <button
                                onClick={() => removeBookmark(book.id)}
                                className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition duration-300"
                            >
                                🗑 Remove
                            </button>

                        </div>

                    ))}

                </div>

            )}

        </div>
    )
}

export default Bookmarks
