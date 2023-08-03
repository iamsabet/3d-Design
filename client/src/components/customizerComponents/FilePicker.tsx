import { CustomButton } from "..";
import { motion, AnimatePresence } from "framer-motion";
import { slideAnimation } from "../../config/motion";
import { useSnapshot } from "valtio";
import state from "../../store";
import { centerLogo, leftSideLogo, rightSideLogo } from "../../assets";
import { useRef } from "react";
const FilePicker = ({ file, setFile, readFile }: FilePickerProps) => {
  const snap = useSnapshot(state);
  const rightUploadRef = useRef(null);
  const leftUploadRef = useRef(null);
  const logoUploadRef = useRef(null);
  const textureUploadRef = useRef(null);

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
              onClick={() => {
                state.modelRotation = "front";
                state.uploadSelectedTab = "logo";
              }}
            >
              Front
            </button>
            <button
              className={`daisy-tab${
                snap.uploadSelectedTab === "texture" ? " tab-active" : ""
              }`}
              onClick={() => {
                state.uploadSelectedTab = "texture";
                state.modelRotation = "front";
              }}
            >
              Texture
            </button>
            <button
              className={`daisy-tab${
                snap.uploadSelectedTab === "left" ? " tab-active" : ""
              }`}
              onClick={() => {
                state.modelRotation = "left";
                state.uploadSelectedTab = "left";
              }}
            >
              Left
            </button>
            <button
              className={`daisy-tab${
                snap.uploadSelectedTab === "right" ? " tab-active" : ""
              }`}
              onClick={() => {
                state.modelRotation = "right";
                state.uploadSelectedTab = "right";
              }}
            >
              Right
            </button>
          </div>
          {snap.uploadSelectedTab === "logo" && (
            <motion.div
              {...slideAnimation("up")}
              className="flex-1 flex flex-col tab-1"
            >
              <input
                id="file-upload"
                ref={logoUploadRef}
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
                {file === ""
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
                  children={[<img src={rightSideLogo} key={"rightTopImg"} />]}
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
                  children={[<img src={centerLogo} key={"centerImg"} />]}
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
                  children={[<img src={leftSideLogo} key={"topLeftImg"} />]}
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
                id="file-upload-texture"
                type="file"
                ref={textureUploadRef}
                accept="images/*"
                onChange={(e) => {
                  //
                  if (e.target.files) {
                    setFile(e.target.files[0]);
                    readFile("full", e.target.files[0]);
                  }
                }}
              />
              <label htmlFor="file-upload-texture" className="filepicker-label">
                Upload Your Image
              </label>
              <p className="mt-2 text-gray-700 text-sm truncate text-center">
                {file === "" || snap.fullDecal === "./1x1.png"
                  ? "No File Selected"
                  : // @ts-ignore
                    `${file?.name}`}
              </p>
              {file && snap.fullDecal !== "./1x1.png" && (
                <img src={snap.fullDecal} className="picked-thumbnail" />
              )}
              <div className="mt-4 flex flex-wrap gap-3">
                <CustomButton
                  type="filled"
                  title="Remove"
                  handleClick={() =>
                    // remove fullDecal from store and set it to initial value
                    {
                      state.fullDecal = "./1x1.png";
                      state.activeFilterTab.stylishShirt = false;
                      // @ts-ignore
                      textureUploadRef.current.value = "";
                    }
                  }
                  styles="text-ss"
                />
              </div>
            </motion.div>
          )}
          {snap.uploadSelectedTab === "left" && (
            <motion.div
              {...slideAnimation("up")}
              className="flex-1 flex flex-col tab-1"
            >
              <input
                id="file-upload-left"
                ref={leftUploadRef}
                type="file"
                accept="images/*"
                onChange={(e) => {
                  //
                  if (e.target.files) {
                    setFile(e.target.files[0]);
                    readFile("left", e.target.files[0]);
                  }
                }}
              />
              <label htmlFor="file-upload-left" className="filepicker-label">
                Upload Your Image
              </label>
              <p className="mt-2 text-gray-700 text-sm truncate text-center">
                {file !== "" || snap.leftDecal === "./1x1.png"
                  ? "No File Selected"
                  : // @ts-ignore
                    `${file?.name}`}
              </p>
              {file && snap.leftDecal !== "" && (
                <img src={snap.leftDecal} className="picked-thumbnail" />
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
                    // remove leftDecal from store and set it to initial value
                    {
                      state.leftDecal = "./1x1.png";
                      // @ts-ignore
                      leftUploadRef.current.value = "";
                    }
                  }
                  styles="text-ss"
                />
              </div>
            </motion.div>
          )}

          {snap.uploadSelectedTab === "right" && (
            <motion.div
              {...slideAnimation("up")}
              className="flex-1 flex flex-col tab-1"
            >
              <input
                id="file-upload-right"
                ref={rightUploadRef}
                type="file"
                accept="images/*"
                onChange={(e) => {
                  //
                  if (e.target.files) {
                    setFile(e.target.files[0]);
                    readFile("right", e.target.files[0]);
                  }
                }}
              />
              <label htmlFor="file-upload-right" className="filepicker-label">
                Upload Your Image
              </label>
              <p className="mt-2 text-gray-700 text-sm truncate text-center">
                {file !== "" || snap.rightDecal === "./1x1.png"
                  ? "No File Selected"
                  : // @ts-ignore
                    `${file?.name}`}
              </p>
              {file && snap.rightDecal !== "./1x1.png" && (
                <img src={snap.rightDecal} className="picked-thumbnail" />
              )}
              <div className="mt-4 flex flex-wrap gap-3">
                <CustomButton
                  type="filled"
                  title="Remove"
                  handleClick={() =>
                    // remove rightDecal from store and set it to initial value
                    {
                      state.rightDecal = "./1x1.png";
                      // @ts-ignore
                      rightUploadRef.current.value = "";
                    }
                  }
                  styles={`text-ss mx-10 ${
                    state.rightDecal === "./1x1.png"
                      ? "opacity-50 cursor-default"
                      : ""
                  }`}
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
