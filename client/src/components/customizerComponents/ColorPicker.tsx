import { SketchPicker } from "react-color";
import { useSnapshot } from "valtio";
import state from "../../store";
import { slideAnimation } from "../../config/motion";
import { AnimatePresence, motion } from "framer-motion";

const ColorPicker = () => {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      <motion.div
        {...slideAnimation("left")}
        className="absolute left-full m-3"
      >
        <SketchPicker
          color={snap.color}
          onChange={(e) => (state.color = e.hex) /*, console.log(e.hex)*/}
          presetColors={[
            "#FF0022",
            "#2998ea",
            "#f470c4",
            "#414dcc",
            "#dfeaec",
            "#fcfc2f",
            "#2f2f34",
            "#e05b5b",
            "#d1dc71",
            "#918f94",
            "#43b84b",
            "#8a0030",
          ]}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default ColorPicker;
