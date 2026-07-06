import { useState, useEffect } from "react";
import axios from "axios";
import api from "../services/api";
import React from 'react'
import BookCard from '../components/BookCard'
import { useSearchParams } from "react-router-dom";


function Home() {

    const [search, setSearch] = useState("");

    const [books, setBooks] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();

    const page = Number(searchParams.get("page")) || 1;

    const [totalPages, setTotalPages] = useState(1);


    useEffect(() => {
        api.get(`/public/books?page=${page}`)
            .then((response) => {
                console.log(response.data);
                setBooks(response.data.data.data);
                setTotalPages(response.data.data.totalPages);
            })
            .catch((err) => console.log(err));

    }, [page]);

    const filteredBooks = books.filter((book) =>
        book.volumeInfo?.title
            ?.toLowerCase()
            .includes(search.toLowerCase())
    );

    const handleNext = () => {
        setSearchParams({ page: page + 1 });
    };

    const handlePrev = () => {
        setSearchParams({ page: page - 1 });
    };

    return (
        <>

            <div className="max-w-7xl mx-auto p-6">
                <h2 className="text-4xl font-bold text-center mb-8">📚 Books Explorer</h2>
                <p>Searching: {search}</p>

                <input
                    type="text"
                    placeholder="Search books..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border rounded-lg px-4 py-3 mb-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

            </div>

            <div className="max-w-7xl mx-auto p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

                    {filteredBooks.length > 0 ? (
                        filteredBooks.map((book) => (
                            <BookCard
                                key={book.id}
                                book={book}
                            />
                        ))
                    ) : (
                        <h3>No Books Found</h3>
                    )}
                </div>
            </div>

            <div className="flex justify-center items-center gap-4 mt-10">

                <button
                    onClick={handlePrev}
                    disabled={page === 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
                >
                    Previous
                </button>

                <span className="font-semibold">
                    Page {page} of {totalPages}
                </span>

                <button
                    onClick={handleNext}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
                >
                    Next
                </button>

            </div>
        </>
    )
}

export default Home

