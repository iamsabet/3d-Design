import { Euler, Vector3 } from "@react-three/fiber";
import { swatch, fileIcon, ai, logoShirt, stylishShirt } from "../assets";

export const EditorTabs = [
  {
    name: "colorpicker",
    icon: swatch,
  },
  {
    name: "logopicker",
    icon: fileIcon,
  },
  {
    name: "aipicker",
    icon: ai,
  },
];

export const FilterTabs = [
  {
    name: "logoShirt",
    icon: logoShirt,
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
    position: [0, 0.04, 0.15],
    rotation: [0, 0, 0],
    scale: 0.15
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

interface DecalTypesType {
  [key: string]: {
    stateProperty: "logoDecal" | "fullDecal",
    filterTab: "logoShirt" | "stylishShirt",
  }
}

export const DecalTypes: DecalTypesType = {
  logo: {
    stateProperty: "logoDecal",
    filterTab: "logoShirt",
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "stylishShirt",
  },
};
