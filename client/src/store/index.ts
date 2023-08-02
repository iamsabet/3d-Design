import { proxy } from 'valtio'



const state = proxy<StoreType>({
    intro: true,
    color: "#EFBD38",
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: "./threejs.png",
    fullDecal: "./threejs.png",
    uploadSelectedTab: "logo",
    activeFilterTab: {
        logoShirt: true,
        stylishShirt: false,
    },
    logoPosition: "topLeft",

    modelRotation: "front"
});

export default state