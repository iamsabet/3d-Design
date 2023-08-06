import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";
import Shirt from "./Shirt";
import BackDrop from "./BackDrop";
import CameraRig from "./CameraRig";
import { useEffect, useState } from "react";

const CanvasModel = ({ canvasId, canvasType }: CanvasType) => {
  const [initial, setinitial] = useState(canvasType === "close");
  // its a bad work ... but lets keep it for now
  useEffect(() => {
    // if (canvasType === "close") {
    // console.log("before" + new Date());
    setTimeout(() => {
      if (!initial) setinitial((prev) => !prev);
      // console.log("after : " + new Date());
    }, 1000);
    // }
    return () => {};
  }, []);
  const bgColor = canvasType === "open" ? "#F5F3EF" : "#E7E2DA";
  return (
    <>
      <Canvas
        shadows
        resize={{
          debounce: !initial ? Infinity : 10,
        }}
        camera={{ position: [0, 0, 3], fov: 27 }}
        gl={{
          preserveDrawingBuffer: canvasType === "open",
        }}
        className="w-full max-w-full h-full"
        style={{
          backgroundColor: bgColor,
        }}
      >
        <ambientLight intensity={1} />

        <Environment
          // path="/src/assets/enviroments/"
          // files="potsdamer_platz_1k.hdr"
          preset="city"
        />
        {canvasType === "open" && (
          <CameraRig canvasProps={{ canvasId, canvasType }}>
            <BackDrop />

            <Center>
              <Shirt canvasId={canvasId} canvasType={canvasType} />
            </Center>
          </CameraRig>
        )}
        {canvasType === "close" && (
          <CameraRig canvasProps={{ canvasId, canvasType }}>
            {/* <BackDrop /> */}
            <Center>
              <Shirt canvasId={canvasId} canvasType={canvasType} />
            </Center>
          </CameraRig>
        )}
      </Canvas>
    </>
  );
};

export default CanvasModel;
