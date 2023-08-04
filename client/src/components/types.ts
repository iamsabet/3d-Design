interface CustomButtonProps {
    type: string;
    title: string;
    styles: string;
    handleClick: React.MouseEventHandler<HTMLButtonElement>;
    children?: JSX.Element | JSX.Element[] | undefined
}
interface MessageType {
    icon: JSX.Element,
    message: string,
    type: "success" | "info" | "warning" | "error",
    timeout?: number,
    trigger?: Function
}