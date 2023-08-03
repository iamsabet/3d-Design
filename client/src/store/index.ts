import { proxy } from 'valtio'

const state = proxy<StoreType>({
    id: "main",
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
const closet = proxy<StoreType[]>([
    {
        id: "T-8712gbvdw8",
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
]);

// export default {state, closet}
export default state