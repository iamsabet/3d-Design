import { proxy } from 'valtio'



const state = proxy<StoreType>({
    intro: true,
    color: "#EFBD38",
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: "./threejs.png",
    fullDecal: "./threejs.png",
    leftDecal: "./react.png",
    rightDecal: "./react.png",

    uploadSelectedTab: "logo",
    activeEditorTab: "",
    activeFilterTab: {
        logoShirt: true,
        stylishShirt: false,
        leftLogo: true,
        rightLogo: false
    },
    logoPosition: "topLeft",

    modelRotation: "front"
});

export default state