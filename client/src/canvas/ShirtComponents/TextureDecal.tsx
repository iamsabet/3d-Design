import { useSnapshot } from "valtio";
import { getModel, state } from "../../store";
import { Decal, useTexture } from "@react-three/drei";

const TextureDecal = ({ canvasId, canvasType }: CanvasType) => {
  const snap = useSnapshot(canvasType === "open" ? state : getModel(canvasId));
  const fullTexture = useTexture(snap.fullDecal);
  return (
    <>
      {snap.isFullTexture && (
        <Decal
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          scale={1}
          map={fullTexture}
        />
      )}
    </>
  );
};

export default TextureDecal;
