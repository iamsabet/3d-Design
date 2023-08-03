import Home from "./pages/Home";
import Customizer from "./pages/Customizer";
import CanvasModel from "./canvas";

function App() {
  return (
    <main className="app transition-all ease-in">
      <Home />
      <CanvasModel canvasType="open" canvasId="main" />
      <Customizer />
    </main>
  );
}

export default App;
