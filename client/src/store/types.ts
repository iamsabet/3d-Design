type StateKeyTypes = "intro" | "color" | "isLogoTexture"
    | "isFullTexture" | "logoDecal" | "fullDecal";

type logoPositionType = "center" | "topLeft" | "topRight" | "bottomCenter";

type ShirtTypes = "logoShirt" | "stylishShirt"


type StoreType = {
    id: string,
    title: string,
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

type FormStateType = {
    title: string,
    isUploading: boolean,
    status?: {
        type: "success" | "error" | "info" | "warning",
        message: string,
    }
}

type closetType = {
    show: boolean,
    list: StoreType[],
    scrollStep: number,
    page: number,
    hasNextPage: boolean,
    isLoading: boolean,
    isScrolling: boolean,
    initialCloset: Function
}
