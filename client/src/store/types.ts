type StateKeyTypes = "intro" | "color" | "isLogoTexture"
    | "isFullTexture" | "logoDecal" | "fullDecal";

type logoPositionType = "center" | "topLeft" | "topRight";

type StoreType = {
    intro: boolean,
    color: string,
    isLogoTexture: boolean,
    isFullTexture: boolean,
    logoDecal: string,
    fullDecal: string,
    logoPosition: logoPositionType

}
