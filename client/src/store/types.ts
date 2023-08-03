type StateKeyTypes = "intro" | "color" | "isLogoTexture"
    | "isFullTexture" | "logoDecal" | "fullDecal";

type logoPositionType = "center" | "topLeft" | "topRight" | "bottomCenter";

type ShirtTypes = "logoShirt" | "stylishShirt"

type StoreType = {
    id?: string,
    intro: boolean,
    color: string,
    isLogoTexture: boolean,
    isFullTexture: boolean,
    logoDecal: string,
    fullDecal: string,
    leftDecal: string,
    rightDecal: string,

    uploadSelectedTab: "logo" | "texture" | "left" | "right",
    activeEditorTab: EditorTabNameType,
    activeFilterTab:
    { [key: string]: boolean }


    logoPosition: logoPositionType,
    modelRotation: "front" | "left" | "right" | "back"

}
