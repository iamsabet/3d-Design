import { CustomButton } from "..";
import { AnimatePresence, motion } from "framer-motion";
import { slideAnimation } from "../../config/motion";

const AIPicker = ({
  prompt,
  setPrompt,
  generatingImg,
  handleSubmit,
}: AIPickerProps) => {
  return (
    <AnimatePresence>
      <motion.div {...slideAnimation("left")} className="aipicker-container">
        <textarea
          className="aipicker-textarea"
          placeholder="Ask DALL.E AI"
          rows={5}
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
        />
        <div className="flex flex-wrap gap-3">
          {generatingImg ? (
            <CustomButton
              type="outline"
              title="Asking AI..."
              styles="text-xs"
              handleClick={() => {}}
            />
          ) : (
            <>
              <CustomButton
                type="outline"
                title="AI Logo"
                styles="text-xs"
                handleClick={() => handleSubmit("logo")}
              />
              <CustomButton
                type="filled"
                title="AI Texture"
                styles="text-xs"
                handleClick={() => handleSubmit("full")}
              />
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AIPicker;
