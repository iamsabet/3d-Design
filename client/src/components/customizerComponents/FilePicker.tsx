import { useEffect } from "react";
import { CustomButton } from "..";
import { motion, AnimatePresence } from "framer-motion";
import { slideAnimation } from "../../config/motion";
import { useSnapshot } from "valtio";
import state from "../../store";
const FilePicker = ({ file, type, setFile, readFile }: FilePickerProps) => {
  const snap = useSnapshot(state);

  useEffect(() => {
    // setThumbnailInStore(file);
    readFile(type, file);
    return () => {};
  }, []);

  const setLogoPosition = (pos: logoPositionType) => {
    state.logoPosition = pos;
    return;
  };

  // const setThumbnailInStore = (file: Blob | MediaSource | "") => {
  //   if (file) {
  //     let fileBlob = URL.createObjectURL(file);
  //     if (type === "logo") {
  //       state.logoThumbnail = fileBlob;
  //     } else {
  //       state.textureThumbnail = fileBlob;
  //     }
  //   }
  //   return;
  // };

  return (
    <AnimatePresence key={`${type}-tab`}>
      <motion.div {...slideAnimation("left")} className="filepicker-container">
        <div className="flex-1 flex flex-col">
          <input
            id="file-upload"
            type="file"
            accept="images/*"
            onChange={(e) => {
              //
              if (e.target.files) {
                setFile(e.target.files[0]);
                readFile(type, e.target.files[0]);
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
          {file && type === "logo" && (
            <img src={snap.logoDecal} className="picked-thumbnail" />
          )}
          {file && type === "full" && (
            <img src={snap.fullDecal} className="picked-thumbnail" />
          )}
        </div>
        {type === "logo" && (
          <p className="mt-2 text-gray-900 font-semibold text-md truncate text-center">
            Logo Position
          </p>
        )}
        {type === "logo" && (
          <div className="mt-4 flex flex-row gap-1">
            <CustomButton
              type="filled"
              title="Top Left"
              handleClick={() => {
                readFile("logo");
                setLogoPosition("topLeft");
              }}
              styles="text-ss"
            />
            <CustomButton
              type="filled"
              title="Center"
              handleClick={() => {
                readFile("logo");
                setLogoPosition("center");
              }}
              styles="text-ss"
            />
            <CustomButton
              type="filled"
              title="Top Right"
              handleClick={() => {
                readFile("logo");
                setLogoPosition("topRight");
              }}
              styles="text-ss"
            />
          </div>
        )}
        {type === "full" && (
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
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default FilePicker;
