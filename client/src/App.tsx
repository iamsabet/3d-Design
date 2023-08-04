import Home from "./pages/Home";
import Customizer from "./pages/Customizer";
import CanvasModel from "./canvas";
import useLocalStorage from "./hooks/useLocalStorage";
import { closet } from "./store";
import { useSnapshot } from "valtio";
function App() {
  const closetSnap = useSnapshot(closet);
  const [closetList, _setCloset] = useLocalStorage("closet", []);
  // @ts-ignore
  closet.list = closetList;
  return (
    <main className="app transition-all ease-in">
      <Home />
      <CanvasModel canvasType="open" canvasId="main" />
      <Customizer />
    </main>
  );
}

export default App;
