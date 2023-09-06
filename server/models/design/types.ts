import { Schema } from "mongoose";

type EditorTabNameType = "colorpicker" | "filepicker" | "aipicker" | "closet" | "";
type LogoPositionType = "center" | "topLeft" | "topRight" | "bottomCenter";
type UploadSelectedTabType = "logo" | "texture" | "left" | "right";
type ModelRotationType = "front" | "left" | "right" | "back"
interface IDesign {
    id: string;
    title: string;
    intro: boolean;
    color: string;
    isLogoTexture: boolean;
    isFullTexture: boolean;
    logoDecal: string;
    fullDecal: string;
    leftDecal: string;
    rightDecal: string;

    uploadSelectedTab: UploadSelectedTabType;
    activeEditorTab: EditorTabNameType;
    activeFilterTab:
    { [key: string]: boolean }


    logoPosition: LogoPositionType;
    modelRotation: ModelRotationType;
    owner: Schema.Types.ObjectId
}

export default IDesign