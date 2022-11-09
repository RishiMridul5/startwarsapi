import React, { useCallback, useEffect, useRef, useState } from "react";
import MovieItem from "./MovieItem";
import "./Movies.css";
const Movies = ({ url }) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [stopFetch, setstopFetch] = useState(false);

  const fetchMovies = useCallback(
    async (timer = false, controller) => {
      if (stopFetch) {
        console.log(stopFetch);
        controller.abort();
        clearInterval(timer);
        return;
      }
      try {
        setisLoading(true);
        const res = await fetch(url, { signal: controller.signal });

        if (!res.ok || !navigator.onLine) {
          throw new Error(`Error ${res.status}: Something wrong happened `);
        } else {
          const data = await res.json();
          setisLoading(false);
          setMovies(data.results);
        }
      } catch (e) {
        setErr(true);
        setisLoading(false);
      }
    },
    [stopFetch, url]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchMovies(false, controller);
    let timer = 0;
    if (err) {
      timer = setInterval(() => {
        fetchMovies(timer, controller);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
      controller.abort();
    };
  }, [url, err]);

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
              className="cancelstopFetch"
              style={{ padding: "10px 20px" }}
              onClick={() => {
                setstopFetch(true);
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
