import { proxy } from 'valtio'
import { qMark } from '../assets';
import { initialState } from '../config/constants';

const state = proxy<StoreType>(initialState);

const closet = proxy<{ [key: string]: StoreType }>({
    "T-1": { // T-ShirtId map->Object
        title: "Nice 1",
        intro: true,
        modelRotation: "front",
        activeEditorTab: "",
        uploadSelectedTab: "logo",
        // T-Shirt States
        color: "#FF0000", // also app state
        isLogoTexture: true,
        isFullTexture: false,
        logoDecal: "./threejs.png",
        fullDecal: "./1x1.png",
        leftDecal: qMark,
        // leftDecal: "./1x1.png",
        rightDecal: "./1x1.png",
        activeFilterTab: { // also app state
            logoShirt: true,
            stylishShirt: false,
            leftLogo: false,
            rightLogo: false
        },
        logoPosition: "center",

    },
    "T-2": { // T-ShirtId map->Object
        title: "Nice 2",
        intro: true,
        modelRotation: "front",
        activeEditorTab: "",
        uploadSelectedTab: "logo",
        // T-Shirt States
        color: "#0000FF", // also app state
        isLogoTexture: true,
        isFullTexture: false,
        logoDecal: "./threejs.png",
        fullDecal: "./1x1.png",
        leftDecal: qMark,
        // leftDecal: "./1x1.png",
        rightDecal: "./1x1.png",
        activeFilterTab: { // also app state
            logoShirt: true,
            stylishShirt: false,
            leftLogo: false,
            rightLogo: false
        },
        logoPosition: "topRight",

    }
});

export { state, closet }
// export default state