import React from "react";
import "./Form.css";
const Form = ({ setURLparam }) => {
  const setParam = (value) => {
    setURLparam(value.toLowerCase());
  };
  return (
    <form className="app-form">
      <button
        className="btn primary"
        onClick={(e) => {
          e.preventDefault();
          setParam("Films");
        }}
      >
        Films
      </button>
      <button
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
      </button>
    </form>
  );
};

export default Form;
