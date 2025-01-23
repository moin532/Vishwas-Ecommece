import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-2xl font-semibold mt-4">Oops! Page not found.</p>
        <p className="text-gray-600 mt-2">
          The page you're looking for doesn't exist or we Updated Soon.
        </p>
        <p className="text-gray-600 mt-2">Happy Ordering 😁</p>
        <Link
          to="/"
          className="mt-6 inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
