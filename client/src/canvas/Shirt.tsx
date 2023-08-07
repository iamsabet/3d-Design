import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { state, getModel } from "../store";
import { useMemo, useRef } from "react";
import TextureDecal from "./ShirtComponents/TextureDecal";
import LogoDecal from "./ShirtComponents/LogoDecal";
import LeftDecal from "./ShirtComponents/LeftDecal";
import RightDecal from "./ShirtComponents/RightDecal";

const Shirt = ({ canvasId, canvasType }: CanvasType) => {
  const snap = useSnapshot(canvasType === "open" ? state : getModel(canvasId)); // conditional on parent CanvasType -> state || closet[canvas_id] store
  const group = useRef();
  // @ts-ignore
  const { nodes, materials } = useGLTF("/shirt_baked.glb");

  // if (canvasType === "open") {
  useFrame((_state, delta) => {
    if (canvasType === "open")
      easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
  });

  const state_string = useMemo(
    () => JSON.stringify(canvasType === "open" ? state : getModel(canvasId)),
    [canvasType]
  );

  return (
    <group
      // @ts-ignore
      ref={group}
      name={canvasId}
      key={state_string}
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
        {canvasType === "close" && <meshMatcapMaterial color={snap.color} />}

        <TextureDecal canvasType={canvasType} canvasId={canvasId} />
        <LogoDecal canvasType={canvasType} canvasId={canvasId} />
        <LeftDecal canvasType={canvasType} canvasId={canvasId} />
        <RightDecal canvasType={canvasType} canvasId={canvasId} />
      </mesh>
    </group>
  );
};
// useGLTF.preload("/Female_Light_Blue_Shirt.glb");
useGLTF.preload("/shirt_baked.glb");
export default Shirt;
