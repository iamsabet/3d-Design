import { useCallback, useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { getModel, state } from "../../store";
import { Decal, useTexture } from "@react-three/drei";
import SetRatio from "./SetRatio";

const LeftDecal = ({ canvasId, canvasType }: CanvasType) => {
  const [leftRatio, setLeftRatio] = useState(0);
  const snap = useSnapshot(canvasType === "open" ? state : getModel(canvasId));
  const leftTexture = useTexture(snap.leftDecal);

  const setRatio = useCallback(() => {
    SetRatio(snap.leftDecal, setLeftRatio, canvasId);
  }, [snap.leftDecal]);

  useEffect(() => {
    setRatio();
  }, [setRatio]);
  return (
    <>
      {leftTexture && !!leftRatio && (
        <Decal
          position={[0.25, 0.085, -0.015]}
          rotation={[-(2 * Math.PI), (1 * Math.PI) / 2, 0]}
          // since its rotated then x,y has changed
          scale={[0.065 * leftRatio, 0.065, 0.065]}
          map={leftTexture}
          // map-anisotropy={16}
          depthTest={false}
          // depthWrite={true}
        />
      )}
    </>
  );
};

export default LeftDecal;
