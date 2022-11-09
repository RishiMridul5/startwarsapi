import React, { useEffect, useRef, useState } from "react";
import MovieItem from "./MovieItem";
import "./Movies.css";
const Movies = ({ param }) => {
  const idref = useRef();

  const [movies, setMovies] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [err, setErr] = useState(false);

  useEffect(() => {
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
      }
    }

    if (param !== "") fetchMovies(`${baseURL}${param}/`);

    if (err) {
      idref.current = setInterval(() => {
        console.log("....trying again");
        fetchMovies(`${baseURL}${param}/`);
      }, 3000);
    }

    return () => {
      // clearInterval(idref.current);
      controller.abort();
    };
  }, [param]);

  useEffect(() => {
    console.log(`err: ${err}👓`);
  });

  return (
    <>
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
          <h1>Something went wrong </h1>
          {err && (
            <button
              className="cancelRefetch"
              style={{ padding: "10px 20px" }}
              onClick={() => {
                console.log("clear btn clicked");
                clearInterval(idref.current);
                setErr(false)
                setisLoading(false)
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
