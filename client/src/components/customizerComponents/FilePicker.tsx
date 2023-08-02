import { CustomButton } from "..";
import { motion, AnimatePresence } from "framer-motion";
import { slideAnimation } from "../../config/motion";
import { useSnapshot } from "valtio";
import state from "../../store";
import {
  centerLogo,
  fileIcon,
  leftSideLogo,
  rightSideLogo,
  tshirt,
} from "../../assets";
const FilePicker = ({ file, setFile, readFile }: FilePickerProps) => {
  const snap = useSnapshot(state);

  const setLogoPosition = (pos: logoPositionType) => {
    state.logoPosition = pos;
  };

  return (
    <AnimatePresence>
      <motion.div {...slideAnimation("left")} className="filepicker-container">
        <div className="flex-1 flex flex-col">
          <div className="tabs flex flex-row justify-center items-center pb-3">
            <button
              className={`daisy-tab${
                snap.uploadSelectedTab === "logo" ? " tab-active" : ""
              }`}
              onClick={() => (state.uploadSelectedTab = "logo")}
            >
              Logo
            </button>
            <button
              className={`daisy-tab${
                snap.uploadSelectedTab === "texture" ? " tab-active" : ""
              }`}
              onClick={() => (state.uploadSelectedTab = "texture")}
            >
              Texture
            </button>
          </div>
          {snap.uploadSelectedTab === "logo" && (
            <motion.div
              {...slideAnimation("up")}
              className="flex-1 flex flex-col tab-1"
            >
              <input
                id="file-upload"
                type="file"
                accept="images/*"
                onChange={(e) => {
                  //
                  if (e.target.files) {
                    setFile(e.target.files[0]);
                    readFile("logo", e.target.files[0]);
                  }
                }}
              />
              <label htmlFor="file-upload" className="filepicker-label">
                Upload Your Image
              </label>
              <p className="mt-2 text-gray-700 text-sm truncate text-center">
                {file === "" || snap.logoDecal === "./threejs.png"
                  ? "No File Selected"
                  : // @ts-ignore
                    `${file?.name}`}
              </p>
              {/* {file && (
                <img src={snap.logoDecal} className="picked-thumbnail" />
              )} */}

              <p className="mt-2 text-gray-900 font-semibold text-md truncate text-center">
                Position
              </p>

              <div className="mt-4 flex flex-row gap-1">
                <CustomButton
                  type={
                    snap.logoPosition === "topRight" ? "filled" : "glass"
                  } /* change between glass and filled */
                  title="Right"
                  handleClick={() => {
                    readFile("logo");
                    setLogoPosition("topRight");
                  }}
                  styles="text-ss glassmorphism"
                  children={[<img src={rightSideLogo} />]}
                />
                <CustomButton
                  type={
                    snap.logoPosition === "center" ? "filled" : "glass"
                  } /* change between glass and filled */
                  title="Center"
                  handleClick={() => {
                    readFile("logo");
                    setLogoPosition("center");
                  }}
                  styles="text-ss glassmorphism"
                  children={[<img src={centerLogo} />]}
                />
                <CustomButton
                  type={
                    snap.logoPosition === "topLeft" ? "filled" : "glass"
                  } /* change between glass and filled */
                  title="Left"
                  handleClick={() => {
                    readFile("logo");
                    setLogoPosition("topLeft");
                  }}
                  styles="text-ss glassmorphism"
                  children={[<img src={leftSideLogo} />]}
                />
              </div>
            </motion.div>
          )}
          {snap.uploadSelectedTab === "texture" && (
            <motion.div
              {...slideAnimation("up")}
              className="flex-1 flex flex-col tab-1"
            >
              <input
                id="file-upload"
                type="file"
                accept="images/*"
                onChange={(e) => {
                  //
                  if (e.target.files) {
                    setFile(e.target.files[0]);
                    readFile("full", e.target.files[0]);
                  }
                }}
              />
              <label htmlFor="file-upload" className="filepicker-label">
                Upload Your Image
              </label>
              <p className="mt-2 text-gray-700 text-sm truncate text-center">
                {file === "" || snap.fullDecal === "./threejs.png"
                  ? "No File Selected"
                  : // @ts-ignore
                    `${file?.name}`}
              </p>
              {file && snap.fullDecal !== "./threejs.png" && (
                <img src={snap.fullDecal} className="picked-thumbnail" />
              )}
              <div className="mt-4 flex flex-wrap gap-3">
                {/* <CustomButton
                type="outline"
                title="Logo"
                handleClick={() => readFile("logo")}
                styles="text-ss"
              /> */}
                <CustomButton
                  type="filled"
                  title="Remove"
                  handleClick={() =>
                    // remove fullDecal from store and set it to initial value
                    readFile("full")
                  }
                  styles="text-ss"
                />
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FilePicker;
