type StateKeyTypes = "intro" | "color" | "isLogoTexture"
    | "isFullTexture" | "logoDecal" | "fullDecal";

type logoPositionType = "center" | "topLeft" | "topRight" | "bottomCenter";

type ShirtTypes = "logoShirt" | "stylishShirt"

type StoreType = {
    intro: boolean,
    color: string,
    isLogoTexture: boolean,
    isFullTexture: boolean,
    logoDecal: string,
    fullDecal: string,
    uploadSelectedTab: "logo" | "texture",
    activeFilterTab:
    { [key: string]: boolean }


    logoPosition: logoPositionType,
    modelRotation: "front" | "left" | "right" | "back"

}
