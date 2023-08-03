// import { useState } from "react";
import Home from "./pages/Home";
import Customizer from "./pages/Customizer";
import CanvasModel from "./canvas";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <main className="app transition-all ease-in">
      <Home />
      <CanvasModel
      // need to pass prompts to initiate tshirt
      />
      <Customizer />
    </main>
  );
}

export default App;
