import { proxy } from 'valtio'
import { qMark } from '../assets';
import { initialState } from '../config/constants';
import formState from './form';
import closet from './closet'
const state = proxy<StoreType>(initialState);


const mockData: StoreType = { // T-ShirtId map->Object
    id: "T-1",
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
const getModel = (id: string): StoreType => {
    const data = closet.list.find((item) => item.id === id)
    if (data) {
        return data;
    }
    else {
        return mockData;
    }
}

export { state, closet, getModel, formState }
// export default state