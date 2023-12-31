import Home from "./pages/Home";
import Customizer from "./pages/Customizer";
import CanvasModel from "./canvas";
import Header from "./components/Header";
// import useLocalStorage from "./hooks/useLocalStorage";
// import { closet } from "./store";
function App() {
  // const [closetList, _setCloset] = useLocalStorage("closet", []);
  // @ts-ignore
  // closet.list = closetList;
  return (
    <main className="app transition-all ease-in">
      <Header />
      <Home />
      <CanvasModel canvasType="open" canvasId="main" />
      <Customizer />
    </main>
  );
}

export default App;
