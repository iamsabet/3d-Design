type FileType = "logo" | "full" | ""
type ActiveFilterTabType = {
    [key: string]: boolean;
};
type MessageType = {
    type: "error" | "success" | "info";
    message: string;
    timeout: number | null;
};