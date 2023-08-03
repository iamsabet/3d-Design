import { AnimatePresence, motion } from "framer-motion";
import { slideAnimation } from "../../config/motion";
import CanvasModel from "../../canvas";

const Closet = () => {
  return (
    <AnimatePresence>
      <motion.div {...slideAnimation("left")} className="closet-container">
        <div className="flex flex-col justify-center items-center w-full h-full">
          <CanvasModel
            canvasType="close"
            canvasId="T-8T12gBv2dwU8e"
            // need to pass prompts to initiate tshirt
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Closet;
