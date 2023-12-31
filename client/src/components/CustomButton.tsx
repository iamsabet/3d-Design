import { state } from "../store";
import { useSnapshot } from "valtio";
import { getContrastingColor } from "../config/helpers";

const CustomButton = ({
  type,
  title,
  styles,
  handleClick,
  children,
  color,
  submit,
  disabled,
}: CustomButtonProps) => {
  const snap = useSnapshot(state);
  const generateStyle = (type: string) => {
    if (type === "filled") {
      return {
        backgroundColor: color ? color : snap.color,
        color: getContrastingColor(color ? color : snap.color),
        borderWidth: "2px",
        borderColor: color ? color : snap.color,
      };
    } else if (type === "glass") {
      return {
        backgroundColor: "transparent",
        color: "#666666", // getContrastingColor(snap.color),
        borderWidth: "2px",
        borderColor: snap.color,
      };
    } else if (type === "outline") {
      return {
        backgroundColor: "transparent",
        borderWidth: "2px",
        borderColor: color ? color : snap.color,
        color: color ? color : snap.color,
      };
    }
  };
  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md ${styles} 
      flex-col items-center justify-center transition-all duration-150 ease-in-out`}
      style={generateStyle(type)}
      onClick={handleClick}
      type={submit ? "submit" : "button"}
      disabled={disabled ? true : false}
    >
      {children}
      <span>{title}</span>
    </button>
  );
};

export default CustomButton;
