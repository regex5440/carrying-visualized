import { useState } from "react";
import "./App.css";
import { FunctionCard } from "./components/FunctionCard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <FunctionCard functionNumber={1} />
    </div>
  );
}

export default App;
