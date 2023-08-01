import { proxy } from 'valtio'



const state = proxy<StoreType>({
    intro: true,
    color: "#EFBD38",
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: "./threejs.png",
    fullDecal: "./threejs.png",

    activeFilterTab: {
        logoShirt: true,
        stylishShirt: false,
    },
    logoPosition: "topLeft"

});

export default state