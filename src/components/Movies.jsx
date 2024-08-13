import React, { useEffect, useState } from "react";

const Movies = () => {
  const [movieList, setMovieList] = useState([]);
  const getMovie = () => {
    // Fixed arrow function syntax
    fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=b3c8574ec4e0950c0501b1bf409be1e0"
    )
      .then((res) => res.json())
      .then((json) => setMovieList(json.results))
      .catch((error) => console.error("Error fetching movies:", error)); // Add error handling
  };

  useEffect(() => {
    getMovie();
  }, []);

  console.log(movieList);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {movieList.map((movie) => (
        <div key={movie.id} style={{ margin: "10px" }}>
          <img
            style={{
              width: "300px",
              height: "250px",
              borderRadius: "8px", // Optional: Adds a slight border-radius for better visuals
            }}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title || "Movie poster"}
          />
          <h1 style={{ marginTop: "10px", fontSize: "18px", color: "#333" }}>
            {movie.title}
          </h1>
        </div>
      ))}

      <a href="/new">Add New movie</a>
    </div>
  );
};

export default Movies;
