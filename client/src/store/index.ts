import { proxy } from 'valtio'

const state = proxy<StoreType>({
    intro: true,
    color: "#EFBD38",
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: "./threejs.png",
    fullDecal: "./1x1.png",
    leftDecal: "./1x1.png",
    rightDecal: "./1x1.png",

    uploadSelectedTab: "logo",
    activeEditorTab: "",
    activeFilterTab: {
        logoShirt: true,
        stylishShirt: false,
        leftLogo: false,
        rightLogo: false

    },
    logoPosition: "topLeft",

    modelRotation: "front"
});

export default state