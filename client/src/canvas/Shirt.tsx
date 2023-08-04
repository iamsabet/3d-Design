import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import { state, closet } from "../store";
import { LogoPositions } from "../config/constants";
import { useRef } from "react";

const Shirt = ({ canvasId, canvasType }: CanvasType) => {
  const snap = useSnapshot(canvasType === "open" ? state : closet[canvasId]); // conditional on parent CanvasType -> state || closet[canvas_id] store
  const group = useRef();
  // @ts-ignore
  const { nodes, materials } = useGLTF("/shirt_baked.glb");
  //   const { nodes, materials } = useGLTF("/Female_Light_Blue_Shirt.glb");
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);
  const leftTexture = useTexture(snap.leftDecal);
  const rightTexture = useTexture(snap.rightDecal);
  // if (canvasType === "open") {
  useFrame((_state, delta) => {
    if (canvasType === "open")
      easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
  });

  const state_string = JSON.stringify(
    canvasType === "open" ? state : closet[canvasId]
  );

  return (
    <group
      // @ts-ignore
      ref={group}
      name={canvasId}
      key={state_string}
      // id={canvasId}
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
        {/* <meshStandardMaterial color={snap.color} /> */}
        {/* <meshLambertMaterial color={snap.color} depthTest={false} /> */}
        {/* <meshToonMaterial color={snap.color} /> */}
        {canvasType === "close" && <meshMatcapMaterial color={snap.color} />}

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
