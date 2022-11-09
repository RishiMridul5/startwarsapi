import React, { useState } from "react";
import "./MovieForm.css";
const MovieForm = () => {
  const [title, setTitle] = useState("");
  const [openingText, setOpeningText] = useState("");
  const [date, setDate] = useState(new Date());

  const handleSubmit = (formInputs) => {
    console.log(formInputs);
  };

  return (
    <div className="form-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit({
            title: title,
            openingText: openingText,
            date: date,
          });
        }}
      >
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input
            value={title}
            type="text"
            id="title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="form-control">
          <label htmlFor="opening-text">opening text</label>
          <textarea
            value={openingText}
            type="text-area"
            id="opening-text"
            onChange={(e) => {
              setOpeningText(e.target.value);
            }}
          />
        </div>
        <div className="form-control">
          <label htmlFor="date">Release Date</label>
          <input
            value={date}
            type="date"
            id="date"
            onChange={(e) => {
              const date = e.target.value.toString();
              console.log(date);
              setDate(new Date(date));
            }}
          />
        </div>
        <div className="form-control">
          <button className="addMovieBtn" type="submit">
            Add Movie
          </button>
        </div>
      </form>
    </div>
  );
};

export default MovieForm;
