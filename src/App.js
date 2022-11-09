import Movies from "./Components/Movies";

import { useState } from "react";
import MovieForm from "./Components/MovieForm";
function App() {
  const BASE_URL = `https://swapi.dev/api/films`;
  const [url, setUrl] = useState(BASE_URL);

  return (
    <>
      <div className="app">
        <MovieForm />
        <button
          type="submit"
          className="btn primary"
          onClick={(e) => {
            e.preventDefault();
            setUrl(`https://swapi.dev/api/film`);
          }}
        >
          Fetch Films
        </button>
        <Movies url={url} />
      </div>
    </>
  );
}

export default App;
