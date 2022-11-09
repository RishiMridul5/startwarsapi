import React from "react";
import './MovieItem.css'
const MovieItem = ({ title, opening_crawl }) => {
  return (
    <div className="movie-item">
      <div>{title}</div>
      <div>{opening_crawl}</div>
    </div>
  );
};

export default MovieItem;
