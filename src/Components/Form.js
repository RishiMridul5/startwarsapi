import React from "react";
import "./Form.css";
const Form = ({ setReqUrl }) => {

  return (
    <form className="app-form">
      <button
        className="btn primary"
        onClick={(e) => {
          e.preventDefault();
          setReqUrl(`https://swapi.dev/apis/films`);
        }}
      >
        Films
      </button>
      {/* <button
        className="btn primary"
        onClick={(e) => {
          e.preventDefault();
          setParam("Starships");
        }}
      >
        Starships
      </button>
      <button
        className="btn primary"
        onClick={(e) => {
          e.preventDefault();
          setParam("People");
        }}
      >
        People
      </button>
      <button
        className="btn primary"
        onClick={(e) => {
          e.preventDefault();
          setParam("Planets");
        }}
      >
        Planets
      </button>
      <button
        className="btn primary"
        onClick={(e) => {
          e.preventDefault();
          setParam("Vehicles");
        }}
      >
        Vehicles
      </button> */}
    </form>
  );
};

export default Form;
