interface FilePickerProps {
    file: Blob | MediaSource | "",
    setFile: Function
    readFile: Function
}
interface AIPickerProps {
    prompt: string;
    setPrompt: Function;
    generatingImg: boolean;
    handleSubmit: Function;
}