import { Euler, Vector3 } from "@react-three/fiber";
import { swatch, fileIcon, ai, stylishShirt, greenLogo, tShirts } from "../assets";


export const EditorTabs: EditorTabType[] = [
  {
    name: "colorpicker",
    icon: swatch,
  },
  {
    name: "filepicker",
    icon: fileIcon,
  },
  {
    name: "aipicker",
    icon: ai,
  },
  {
    name: "designs",
    icon: tShirts,
  },
];

export const FilterTabs = [
  {
    name: "logoShirt",
    icon: greenLogo,
  },
  {
    name: "stylishShirt",
    icon: stylishShirt,
  },
];

interface LogoPositionsType {
  [key: string]: {
    position: Vector3,
    rotation: (Euler & (number | Euler)) | undefined,
    scale: number
  };
}

export const LogoPositions: LogoPositionsType = {
  "center": {
    position: [0, -0.02, 0.15],
    rotation: [0, 0, 0],
    scale: 0.22
  },
  "bottomCenter": {
    position: [0, -0.08, 0.15],
    rotation: [0, 0, 0],
    scale: 0.25
  },
  "topLeft": {
    position: [0.1, 0.1, 0.1],
    rotation: [0, 0, 0],
    scale: 0.075
  },
  "topRight": {
    position: [-0.1, 0.1, 0.1],
    rotation: [0, 0, 0],
    scale: 0.075
  }
}

interface RotationTypes {
  [key: string]: number[]
}

export const modelRotations: RotationTypes = {
  left: [0, -(Math.PI) / 2.8, 0],
  right: [0, (Math.PI) / 2.8, 0],
  front: [0, 0, 0],
  back: [0, Math.PI, 0]
}

interface DecalTypesType {
  [key: string]: {
    stateProperty: "logoDecal" | "fullDecal" | "leftDecal" | "rightDecal",
    filterTab: "logoShirt" | "stylishShirt" | "leftLogo" | "rightLogo",
  }
}

export const DecalTypes: DecalTypesType = {
  logo: {
    stateProperty: "logoDecal",
    filterTab: "logoShirt",
  },
  left: {
    stateProperty: "leftDecal",
    filterTab: "leftLogo",
  },
  right: {
    stateProperty: "rightDecal",
    filterTab: "rightLogo",
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "stylishShirt",
  },
};
