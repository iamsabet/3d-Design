import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import state from "../store";
type Props = {
  children?: JSX.Element | JSX.Element[];
};

const CameraRig = ({ children }: Props) => {
  const group = useRef();
  const snap = useSnapshot(state);

  useFrame((state, delta) => {
    const isBreakPoint = window.innerWidth < 1260;
    const isMobile = window.innerWidth < 620;
    let targetPosition = [-0.4, 0.0, 2.0];
    // set the initial position of the model
    if (snap.intro) {
      if (isBreakPoint) targetPosition = [0, 0, 2];
      if (isMobile) targetPosition = [0, 0.2, 2.5];
    } else {
      if (isMobile) targetPosition = [0, 0, 2.5];
      else targetPosition = [0, 0, 2];
    }

    // set the model camera position
    easing.damp3(
      state.camera.position,
      // @ts-ignore
      targetPosition,
      0.25,
      delta
    );

    easing.dampE(
      // @ts-ignore
      group.current.rotation,
      [state.pointer.y / 6, -state.pointer.x / 4, 0],
      0.2,
      delta
    );
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
