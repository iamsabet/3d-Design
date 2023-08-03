// import React from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";
import Shirt from "./Shirt";
import BackDrop from "./BackDrop";
import CameraRig from "./CameraRig";

const CanvasModel = ({ canvasId, canvasType }: CanvasType) => {
  return (
    <Canvas
      key={canvasId}
      shadows
      camera={{ position: [0, 0, 10], fov: 27 }}
      gl={{
        preserveDrawingBuffer: true,
      }}
      id={"canvas-" + canvasId}
      className="w-full max-w-full h-full transition-all ease-in-out"
      style={{
        backgroundColor: "#F5F3EF",
      }}
      accessKey={"canvas-" + canvasId}
    >
      <ambientLight intensity={1} />
      <Environment preset="city" />
      <CameraRig key={"C" + canvasId} canvasProps={{ canvasId, canvasType }}>
        <BackDrop />
        <Center>
          <Shirt
            key={"T" + canvasId}
            canvasId={canvasId}
            canvasType={canvasType}
          />
        </Center>
      </CameraRig>
    </Canvas>
  );
};

export default CanvasModel;
