import { useCallback, useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { getModel, state } from "../../store";
import { Decal, useTexture } from "@react-three/drei";
import SetRatio from "./SetRatio";

const RightDecal = ({ canvasId, canvasType }: CanvasType) => {
  const [rightRatio, setRightRatio] = useState(0);
  const snap = useSnapshot(canvasType === "open" ? state : getModel(canvasId));
  const rightTexture = useTexture(snap.rightDecal);

  const setRatio = useCallback(() => {
    SetRatio(snap.rightDecal, setRightRatio, canvasId);
  }, [snap.rightDecal]);

  useEffect(() => {
    setRatio();
  }, [setRatio]);
  return (
    <>
      {rightTexture && !!rightRatio && (
        <Decal
          position={[-0.25, 0.085, -0.015]}
          rotation={[-(2 * Math.PI), (3 * Math.PI) / 2, 0]}
          // since its rotated then x,y has changed
          scale={[0.065 * rightRatio, 0.065, 0.065]}
          map={rightTexture}
          // map-anisotropy={16}
          depthTest={false}
          // depthWrite={true}
        />
      )}
    </>
  );
};

export default RightDecal;
