// import React from "react";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import state from "../store";
import { LogoPositions } from "../config/constants";

const Shirt = () => {
  const snap = useSnapshot(state);

  // @ts-ignore
  const { nodes, materials } = useGLTF("/shirt_baked.glb");
  //   const { nodes, materials } = useGLTF("/Female_Light_Blue_Shirt.glb");
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  useFrame((state, delta) => {
    state;
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
  });

  const state_string = JSON.stringify(state);

  return (
    <group
      key={state_string}
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
      </mesh>
    </group>
  );
};
// useGLTF.preload("/Female_Light_Blue_Shirt.glb");
useGLTF.preload("/shirt_baked.glb");
export default Shirt;
