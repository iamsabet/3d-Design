import { proxy } from 'valtio'



const state = proxy<StoreType>({
    intro: true,
    color: "#EFBD38",
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: "./threejs.png",
    fullDecal: "./threejs.png",

    logoPosition: "topLeft"

});

export default state