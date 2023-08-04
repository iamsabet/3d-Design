// import React from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";
import Shirt from "./Shirt";
import BackDrop from "./BackDrop";
import CameraRig from "./CameraRig";

const CanvasModel = ({ canvasId, canvasType }: CanvasType) => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, canvasType === "open" ? 10 : 1], fov: 27 }}
      gl={{
        preserveDrawingBuffer: canvasType === "open",
      }}
      className="w-full max-w-full h-full transition-all ease-in-out"
      style={{
        backgroundColor: canvasType === "open" ? "#F5F3EF" : "#E7E2DA",
      }}
    >
      <ambientLight intensity={1} />
      <Environment preset="city" />
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
  );
};

export default CanvasModel;
