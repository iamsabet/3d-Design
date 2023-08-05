import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { state } from "../store";
import { Euler } from "three/src/math/Euler.js";
// import { modelRotations } from "../config/constants";
type Props = {
  children?: JSX.Element | JSX.Element[];
  canvasProps: CanvasType;
};

const CameraRig = ({ children, canvasProps }: Props) => {
  const group = useRef();
  const snap = useSnapshot(state); // conditional on parent CanvasType -> state || closet[canvas_id] store
  let smoothTime = 0.2;
  // const generateModelRotation = () => {
  //   return modelRotations[snap.modelRotation];
  // };

  useFrame((state, delta) => {
    const isBreakPoint = window.innerWidth < 1260;
    const isMobile = window.innerWidth < 620;
    let targetPosition = [-0.35, 0.0, 2.0];
    // set the initial position of the model
    let targetRotation = new Euler(0, 0, 0);
    if (snap.intro) {
      if (isBreakPoint) targetPosition = [0, 0, 2];
      if (isMobile) targetPosition = [0, 0.2, 2.5];

      // targetRotation = new Euler(0, (4 * Math.PI) / 3, 0);
      // const targ = modelRotations["front"];
      // targetRotation = new Euler(targ[0], targ[1], targ[2]);
    } else {
      if (isMobile) targetPosition = [0, 0, 2.5];
      else targetPosition = [0, 0, 2];
      // const targ = generateModelRotation();
      // targetRotation = new Euler(targ[0], targ[1], targ[2]);
    }

    // set the model camera position
    // console.log(targetPosition);
    easing.damp3(
      state.camera.position,
      // @ts-ignore
      targetPosition,
      0.4,
      delta
    );

    if (
      snap.uploadSelectedTab !== "left" &&
      snap.uploadSelectedTab !== "right"
    ) {
      if (canvasProps.canvasType === "open") {
        if (snap.intro) {
          var t = 6;
        } else {
          t = 2;
        }
        easing.dampE(
          // @ts-ignore
          group.current.rotation,
          [state.pointer.y / 10, -state.pointer.x / t, 0],
          0.2,
          delta
        );
      } else if (canvasProps.canvasType === "close")
        easing.dampE(
          // @ts-ignore
          group.current.rotation,
          // @ts-ignore
          [0, -state.pointer.x / 5, 0],
          0.3,
          delta
        );
    }

    // @ts-ignore
    if (snap.activeEditorTab === "filepicker") {
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
  }, -1);
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
