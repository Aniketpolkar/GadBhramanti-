import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 bg-white shadow px-4 py-2 rounded w-full max-w-md mx-auto"
    >
      <input
        type="text"
        placeholder="Search forts by name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow outline-none px-2 py-1 border rounded font-body"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
