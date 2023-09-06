type StateKeyTypes = "intro" | "color" | "isLogoTexture"
    | "isFullTexture" | "logoDecal" | "fullDecal";

type logoPositionType = "center" | "topLeft" | "topRight" | "bottomCenter";

type ShirtTypes = "logoShirt" | "stylishShirt"

interface OwnerType {
    username?: string;
    name: string;
    profilePic: string;
    fullName?: string;
    type: "github" | "google";
}


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
    owner?: OwnerType

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

interface UserStateType {
    type: "google" | "github" | null,
    username: string,
    name: string,
    fullName: string,
    profilePic: string,
}