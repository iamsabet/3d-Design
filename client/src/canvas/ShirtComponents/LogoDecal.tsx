import { useCallback, useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { getModel, state } from "../../store";
import { LogoPositions } from "../../config/constants";
import { Decal, useTexture } from "@react-three/drei";
import SetRatio from "./SetRatio";

const LogoDecal = ({ canvasId, canvasType }: CanvasType) => {
  const [logoRatio, setLogoRatio] = useState(0);
  const snap = useSnapshot(canvasType === "open" ? state : getModel(canvasId));
  const logoTexture = useTexture(snap.logoDecal);

  const setRatio = useCallback(() => {
    SetRatio(snap.logoDecal, setLogoRatio, canvasId);
  }, [snap.logoDecal]);

  useEffect(() => {
    setRatio();
  }, [setRatio]);
  return (
    <>
      {snap.isLogoTexture && !!logoRatio && (
        <Decal
          position={LogoPositions[snap.logoPosition].position}
          rotation={LogoPositions[snap.logoPosition].rotation}
          scale={[
            LogoPositions[snap.logoPosition].scale,
            LogoPositions[snap.logoPosition].scale / logoRatio,
            LogoPositions[snap.logoPosition].scale,
          ]}
          // scale={[0.22, 0.44, 0.22]}
          map={logoTexture}
          // map-anisotropy={16}
          depthTest={false}
          // depthWrite={true}
        />
      )}
    </>
  );
};

export default LogoDecal;
