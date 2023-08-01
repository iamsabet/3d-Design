import { useEffect, useState } from "react";
import { CustomButton } from "..";
import { motion, AnimatePresence } from "framer-motion";
import { slideAnimation } from "../../config/motion";
import { useSnapshot } from "valtio";
import state from "../../store";
const FilePicker = ({ file, setFile, readFile }: FilePickerProps) => {
  const [thumbnail, setThumbnail] = useState("");
  const snap = useSnapshot(state);

  useEffect(() => {
    if (file) {
      setThumbnail(URL.createObjectURL(file));
    }
    return () => {};
  }, []);

  const setLogoPosition = (pos: logoPositionType) => {
    state.logoPosition = pos;
    return;
  };

  return (
    <AnimatePresence>
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
                setThumbnail(URL.createObjectURL(e.target.files[0]));
              }
            }}
          />
          <label htmlFor="file-upload" className="filepicker-label">
            Upload Your Image
          </label>
          <p className="mt-2 text-gray-500 text-sm truncate">
            {file === ""
              ? "No File Selected"
              : // @ts-ignore
                file?.name}
          </p>
          {file && (
            <img
              src={thumbnail}
              className="w-16 h-16 object-contain mx-auto mt-3"
            />
          )}
        </div>
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
        <div className="mt-4 flex flex-wrap gap-3">
          {/* <CustomButton
            type="outline"
            title="Logo"
            handleClick={() => readFile("logo")}
            styles="text-ss"
          />
          <CustomButton
            type="filled"
            title="Full"
            handleClick={() => readFile("full")}
            styles="text-ss"
          /> */}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FilePicker;
