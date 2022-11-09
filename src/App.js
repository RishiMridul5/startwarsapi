import Movies from "./Components/Movies";
import Form from "./Components/Form";
import { useState } from "react";
function App() {
  const [url, setUrl] = useState(`https://swapi.dev/api/films`);
  return (
    <div className="app">
      <Form
        setReqUrl={(url) => {
          setUrl(url);
        }}
      />
      <Movies url={url} />
    </div>
  );
}

export default App;
