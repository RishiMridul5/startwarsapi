import React, { useCallback, useEffect, useRef, useState } from "react";
import MovieItem from "./MovieItem";
import "./Movies.css";
const Movies = ({ url }) => {
  const idref = useRef();
  const [movies, setMovies] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [err, setErr] = useState(false);

  let timerID = null;
  const controller = new AbortController();
  const fetchMovies = useCallback(async () => {
    try {
      setisLoading(true);
      const res = await fetch(url, { signal: controller.signal });
      if (!res.ok || !navigator.onLine) {
        throw new Error(`Error: Something wrong happened`);
      } else {
        const data = await res.json();
        setisLoading(false);
        setMovies(data.results);
      }
    } catch (e) {
      setErr(true);
      setisLoading(false);

      const timer = setTimeout(() => {
        fetchMovies(`${url}/`);
      }, 1000);
    }
  }, [url]);

  useEffect(() => {
    fetchMovies(`${url}/`);
    return () => {
      controller.abort();
    };
  }, [url, err]);

  // for testing err
  useEffect(() => {
    console.log(`err: ${err}👓`);
    console.log(`isLoading: ${isLoading}⛳`);
  });

  return (
    <>
      {!isLoading && movies.length > 0 && err === false && (
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
          <h1>Something went wrong </h1>
          {err && (
            <button
              className="cancelRefetch"
              style={{ padding: "10px 20px" }}
              onClick={() => {
                console.log("clear btn clicked");
                console.log(idref.current);
                clearInterval(idref.current);
                setErr(false);
                setisLoading(false);
              }}
            >
              Cancel re-fetching
            </button>
          )}
          <p>Retrying....</p>
        </div>
      )}
    </>
  );
};

export default Movies;
