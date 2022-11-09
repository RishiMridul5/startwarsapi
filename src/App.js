import Movies from "./Components/Movies";
import Form from "./Components/Form";
import { useState } from "react";
function App() {
  const [param, setParam] = useState("");
  return (
    <div className="app">
      <Form
        setURLparam={(value) => {
          setParam(value);
        }}
      />
      <Movies param={param} />
    </div>
  );
}

export default App;
