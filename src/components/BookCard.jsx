import { Link } from "react-router-dom";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

function BookCard({ book, onBookmark, bookmarks = [], showBookmark = true }) {

  const isBookmarked =
    bookmarks.includes(book.id);

  return (

    <div className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 overflow-hidden">

      <Link to={`/book/${book.id}`} className="flex flex-col">


        <img
          src={book.volumeInfo.imageLinks?.thumbnail}
          alt={book.volumeInfo.title}
          className="w-full h-52 object-cover"
        />

        <div className="p-3">

          <h3 className="text-sm font-bold line-clamp-2 h-10">
            {book.volumeInfo.title}
          </h3>

          <p className="text-xs text-gray-600 mt-2 line-clamp-1">
            👨 Author:
            <span className="font-medium ml-2">
              {book.volumeInfo.authors?.join(", ") || "N/A"}
            </span>
          </p>

          <p className="text-xs text-gray-500 mt-1 line-clamp-1">
            🏷 Categories:
            <span className="ml-2">
              {book.volumeInfo.categories?.join(", ") || "N/A"}
            </span>
          </p>

          <p className="text-xs text-gray-500 mt-1">
            📅 Published:
            <span className="ml-2">
              {book.volumeInfo.publishedDate || "N/A"}
            </span>
          </p>

        </div>

      </Link>

      <div className="p-3 pt-0">
        {
          showBookmark && (
            <button
              onClick={() => onBookmark(book)}
              className="text-2xl"
            >
              {isBookmarked ? <BsBookmarkFill /> : <BsBookmark />}
            </button>
          )
        }
      </div>

    </div>

  );
}


export default BookCard;