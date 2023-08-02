import { useRef } from "react";
import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";
const BackDrop = () => {
  const shadows = useRef();

  return (
    <AccumulativeShadows
      // @ts-ignore
      ref={shadows}
      temporal
      color="#EFBD38"
      frames={60}
      alphaTest={0.25}
      scale={10}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
    >
      <RandomizedLight
        amount={4}
        radius={8}
        intensity={0.55}
        ambient={0.25}
        position={[5, 5, -10]}
        rotation={[0, 0, 0]}
      />
      <RandomizedLight
        amount={5}
        radius={5}
        intensity={0.25}
        ambient={0.55}
        position={[-5, 5, -8]}
        rotation={[0, 0, 0]}
      />
    </AccumulativeShadows>
  );
};

export default BackDrop;
