import { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  const fetchMovieError = async () => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?t=${query}&apikey=8d704d81`
      );
      const data = await response.json();

      if (data.response === "false") {
        setError("Movie Not Found!");
        setMovie(null);
      } else {
        setMovie(data);
        setError("");
      }
    } catch (error) {
      console.log("error fetching data");
    }
  };

  return (
    <>
      <h2 className="text-app">Movie Search App</h2>
      <div className="container">
        <div className="app-container">
          <div className="search">
            <input
              type="text"
              placeholder="Search Movie"
              id="search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button id="search-icon" onClick={fetchMovieError}>
              Search
            </button>
          </div>
          {error && <p className="error">{error}</p>}
          {movie && (
            <div className="movie-info">
              <h2>{movie.Title}</h2>
              <p>Release Date: {movie.Released}</p>
              <p>Rating: {movie.imdbRating}</p>
              <p>{movie.Plot}</p>
              <img src={movie.Poster} alt={movie.Title} className="poster" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default App;
