interface FilePickerProps {
    file: Blob | MediaSource | "",
    type: "logo" | "full"
    setFile: Function
    readFile: Function
}
interface AIPickerProps {
    prompt: string;
    setPrompt: Function;
    generatingImg: boolean;
    handleSubmit: Function;
}