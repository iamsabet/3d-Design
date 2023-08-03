import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import state from "../store";
import { Euler } from "three/src/math/Euler.js";
import { modelRotations } from "../config/constants";
type Props = {
  children?: JSX.Element | JSX.Element[];
};

const CameraRig = ({ children }: Props) => {
  const group = useRef();
  const snap = useSnapshot(state);
  let smoothTime = 0.2;
  const generateModelRotation = () => {
    return modelRotations[snap.modelRotation];
  };
  useFrame((state, delta) => {
    const isBreakPoint = window.innerWidth < 1260;
    const isMobile = window.innerWidth < 620;
    let targetPosition = [-0.4, 0.0, 2.0];
    // set the initial position of the model
    let targetRotation = new Euler(0, 0, 0);
    if (snap.intro) {
      if (isBreakPoint) targetPosition = [0, 0, 2];
      if (isMobile) targetPosition = [0, 0.2, 2.5];

      targetRotation = new Euler(0, (4 * Math.PI) / 3, 0);
      smoothTime = 0.35;
      // const targ = modelRotations["front"];
      // targetRotation = new Euler(targ[0], targ[1], targ[2]);
    } else {
      if (isMobile) targetPosition = [0, 0, 2.5];
      else targetPosition = [0, 0, 2];
      smoothTime = 0.18;
      const targ = generateModelRotation();
      targetRotation = new Euler(targ[0], targ[1], targ[2]);
    }

    // set the model camera position
    easing.damp3(
      state.camera.position,
      // @ts-ignore
      targetPosition,
      0.3,
      delta
    );

    easing.dampE(
      // @ts-ignore
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 4, 0],
      0.3,
      delta
    );

    // @ts-ignore
    if (snap.activeEditorTab === "filepicker" || snap.activeEditorTab === "") {
      // console.log(
      //   JSON.stringify(
      //     // @ts-ignore
      //     group.current.rotation +
      //       " changed to " +
      //       targetRotation.toArray().toString()
      //   )
      // );
      easing.dampE(
        // @ts-ignore
        group.current.rotation,
        targetRotation,
        smoothTime,
        delta
      );
    }
  });
  // set the model rotation smoothly

  return (
    <group
      // @ts-ignore
      ref={group}
    >
      {children}
    </group>
  );
};

export default CameraRig;
