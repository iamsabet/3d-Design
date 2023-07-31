import React from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";
import Shirt from "./Shirt";
import BackDrop from "./BackDrop";
import CameraRig from "./CameraRig";

const CanvasModel = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 0], fov: 27 }}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full max-w-full h-full transition-all ease-in-out"
    >
      <ambientLight intensity={0.9} />
      <Environment preset="city" />
      <CameraRig>
        <BackDrop />
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
    </Canvas>
  );
};

export default CanvasModel;
