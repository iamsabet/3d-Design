interface CustomButtonProps {
    type: string;
    title: string;
    styles: string;
    handleClick: React.MouseEventHandler<HTMLButtonElement>;
    children?: JSX.Element | JSX.Element[] | undefined
}