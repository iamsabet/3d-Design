interface CustomButtonProps {
    type: string;
    title: string;
    styles: string;
    handleClick: React.MouseEventHandler<HTMLButtonElement>;
    children?: JSX.Element | JSX.Element[] | undefined;
    submit?: boolean;
    disabled?: boolean
}
interface MessagePropsType {
    icon: JSX.Element,
    message: string,
    type: "success" | "info" | "warning" | "error",
    timeout?: number,
    trigger?: Function
}