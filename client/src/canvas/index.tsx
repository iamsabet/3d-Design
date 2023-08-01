// import React from "react";
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
      gl={{
        preserveDrawingBuffer: true,
        autoClear: true,
        autoClearColor: true,
      }}
      className="w-full max-w-full h-full transition-all ease-in-out"
      style={{
        background: `linear-gradient(to top,333333 , #fff99)`,
      }}
    >
      <ambientLight intensity={0.95} />
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
