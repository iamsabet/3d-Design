import { proxy } from 'valtio'
import { qMark } from '../assets';

const state = proxy<StoreType>({
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

});
const closet = proxy<{ [key: string]: StoreType }>({
    "T-8T12gBv2dwU8e": { // T-ShirtId map->Object
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

    }
});

export { state, closet }
// export default state