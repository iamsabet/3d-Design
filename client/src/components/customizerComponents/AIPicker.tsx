import { CustomButton } from "..";
import { AnimatePresence, motion } from "framer-motion";
import { slideAnimation } from "../../config/motion";
import { useSnapshot } from "valtio";
import { user } from "../../store/user";

const AIPicker = ({
  prompt,
  setPrompt,
  generatingImg,
  handleSubmit,
}: AIPickerProps) => {
  const userSnap = useSnapshot(user);
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
                handleClick={() => {
                  if (userSnap.type !== null) handleSubmit("logo");
                  else {
                    // @ts-ignore
                    window.login_modal.showModal();
                  }
                }}
              />
              <CustomButton
                type="filled"
                title="AI Texture"
                styles="text-xs"
                handleClick={() => {
                  if (userSnap.type !== null) handleSubmit("full");
                  else {
                    // @ts-ignore
                    window.login_modal.showModal();
                  }
                }}
              />
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AIPicker;
