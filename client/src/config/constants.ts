import { Euler, Vector3 } from "@react-three/fiber";
import { swatch, fileIcon, ai, stylishShirt, greenLogo, tShirts } from "../assets";
export const MAX_FORM_TITLE_LENGTH = 50;
export const HOST_NAME = import.meta.env.PROD ? "http://localhost:8080" : (import.meta.env.DEV ? "http://localhost:8080" : "http://localhost:8080")
export const initialState: StoreType = {
  id: "main",
  title: "edit",
  intro: true,
  modelRotation: "front",
  activeEditorTab: "",
  uploadSelectedTab: "logo",
  // T-Shirt States
  color: "#EFBD38", // also app state
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: "./threejs.png",
  fullDecal: "./1x1.png",
  leftDecal: "./1x1.png",
  rightDecal: "./1x1.png",
  activeFilterTab: { // also app state
    logoShirt: true,
    stylishShirt: false,
    leftLogo: false,
    rightLogo: false
  },
  logoPosition: "topLeft",

}
export const EditorTabs: EditorTabType[] = [
  {
    name: "colorpicker",
    icon: swatch,
    tooltip: "Pick a color"
  },
  {
    name: "filepicker",
    icon: fileIcon,
    tooltip: "Upload your images"
  },
  {
    name: "aipicker",
    icon: ai,
    tooltip: "Generate AI images"
  },
  {
    name: "closet",
    icon: tShirts,
    tooltip: "Comunity designs"
  },
];

export const FilterTabs = [
  {
    name: "logoShirt",
    icon: greenLogo,
    activeTooltip: "Hide logo",
    deactiveTooltip: "Show logo",
  },
  {
    name: "stylishShirt",
    icon: stylishShirt,
    activeTooltip: "Hide texture",
    deactiveTooltip: "Show Texture",
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
    position: [0, 0.02, 0.15],
    rotation: [0, 0, 0],
    scale: 0.24
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
