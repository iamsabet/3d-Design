// import React from "react";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import state from "../store";
import { LogoPositions, modelRotations } from "../config/constants";
import { Euler } from "three/src/math/Euler.js";
import { useRef } from "react";

const Shirt = () => {
  const snap = useSnapshot(state);
  const group = useRef();
  // @ts-ignore
  const { nodes, materials } = useGLTF("/shirt_baked.glb");
  //   const { nodes, materials } = useGLTF("/Female_Light_Blue_Shirt.glb");
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);
  const leftTexture = useTexture(snap.leftDecal);
  const rightTexture = useTexture(snap.rightDecal);

  useFrame((_state, delta) => {
    let smoothTime = 0.2;
    const generateModelRotation = () => {
      return modelRotations[snap.modelRotation];
    };
    // set the initial position of the model
    let targetRotation = new Euler(0, 0, 0);
    if (snap.intro) {
      targetRotation = new Euler(0, (-2 * Math.PI) / 3, 0);
      smoothTime = 0.35;
      // const targ = modelRotations["front"];
      // targetRotation = new Euler(targ[0], targ[1], targ[2]);
    } else {
      smoothTime = 0.1;
      const targ = generateModelRotation();
      targetRotation = new Euler(targ[0], targ[1], targ[2]);
    }

    // easing.dampE(
    //   // @ts-ignore
    //   group.current.rotation,
    //   targetRotation,
    //   smoothTime,
    //   delta
    // );
  });

  useFrame((_state, delta) => {
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
  });

  const state_string = JSON.stringify(state);

  return (
    <group
      // @ts-ignore
      ref={group}
      key={state_string}
      // rotation={[0, (3 * Math.PI) / 2, 0]}
      // rotation={[0, (1 * Math.PI) / 2, 0]}
      // rotation={[0, Math.PI, 0]}
      rotation={[0, 0, 0]}
    >
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        // geometry={nodes.girl_top_Natal2.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={() => {}}
      >
        {snap.isFullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}
        {snap.isLogoTexture && (
          <Decal
            position={LogoPositions[snap.logoPosition].position}
            rotation={LogoPositions[snap.logoPosition].rotation}
            scale={LogoPositions[snap.logoPosition].scale}
            map={logoTexture}
            // map-anisotropy={16}
            depthTest={false}
            // depthWrite={true}
          />
        )}
        {leftTexture && (
          <Decal
            position={[0.25, 0.085, -0.015]}
            rotation={[-(2 * Math.PI), (1 * Math.PI) / 2, 0]}
            scale={0.067}
            map={leftTexture}
            // map-anisotropy={16}
            depthTest={false}
            // depthWrite={true}
          />
        )}
        {rightTexture && (
          <Decal
            position={[-0.25, 0.085, -0.015]}
            rotation={[-(2 * Math.PI), (3 * Math.PI) / 2, 0]}
            scale={0.067}
            map={rightTexture}
            // map-anisotropy={16}
            depthTest={false}
            // depthWrite={true}
          />
        )}
      </mesh>
    </group>
  );
};
// useGLTF.preload("/Female_Light_Blue_Shirt.glb");
useGLTF.preload("/shirt_baked.glb");
export default Shirt;
