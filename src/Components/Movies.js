import React, { useEffect, useRef, useState } from "react";
import MovieItem from "./MovieItem";
import "./Movies.css";
const Movies = ({ param }) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [err, setErr] = useState(false);

  const resetApp = () => {
    setMovies([]);
    setisLoading(false);
    setErr(false);
  };

  console.log("Movies component called");

  useEffect(() => {
    let tID = 0;
    const baseURL = `https://swapi.dev/apis/`;
    const controller = new AbortController();
    async function fetchMovies(baseURL) {
      try {
        setisLoading(true);
        const res = await fetch(baseURL, { signal: controller.signal });
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        } else {
          const data = await res.json();
          setisLoading(false);
          setMovies(data.results);
        }
      } catch (e) {
        setErr(true);
        setisLoading(false);

        tID = setInterval(() => {
          // if(!err) clearInterval(tID)
          console.log(`re fetching...`);
          fetchMovies(`${baseURL}${param}/`);
        }, 5000);
      }
    }
    if (param !== "") fetchMovies(`${baseURL}${param}/`);

    return () => {
      if (tID) clearInterval(tID);
      controller.abort();
    };
  }, [param]);

  return (
    <>
      {err && <button onClick={resetApp}>Cancel re-fetching</button>}
      {!isLoading && movies.length > 0 && (
        <section className="movie-list-container">
          {movies.map((movie) => {
            const { title, opening_crawl, episode_id } = movie;
            return (
              <MovieItem
                key={episode_id}
                title={title}
                opening_crawl={opening_crawl}
              />
            );
          })}
        </section>
      )}

      {isLoading && (
        <p style={{ color: "#fff", textAlign: "center", fontSize: "20px" }}>
          Loading
        </p>
      )}
      {movies.length === 0 && (
        <div className="default">
          <h1>
            Search <span>Starwars</span> ...
          </h1>
        </div>
      )}
      {err && (
        <div className="error">
          <p>Opps....Something went wrong....Retrying</p>
        </div>
      )}
    </>
  );
};

export default Movies;
