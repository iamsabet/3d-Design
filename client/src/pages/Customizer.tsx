import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";
import config from "../config/config";
import store from "../store";
import { download } from "../assets";
import { downloadCanvasToImage } from "../config/helpers";
import { reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";

import {
  AIPicker,
  ColorPicker,
  FilePicker,
  Tab,
  CustomButton,
} from "../components";

import state from "../store";
const Customizer = () => {
  const snap = useSnapshot(state);
  const [file, setFile] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generatingImg, setGeneratingImg] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState("");

  const [activeFilterTab, setActiveFilterTab] = useState<ActiveFilterTabType>({
    logoShirt: true,
    stylishShirt: false,
  });

  // show tab content depending on the active tab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return (
          <FilePicker
            // @ts-ignore
            file={file}
            readFile={readFile}
            setFile={setFile}
          />
        );
      case "aipicker":
        return (
          <AIPicker
            prompt={prompt}
            setPrompt={setPrompt}
            generatingImg={generatingImg}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };
  const handleSubmit = async (type: DecalType) => {
    if (!prompt) return alert("Please Enter a Prompt");
    let error = false;
    try {
      // call out backend to generate an AI image
      setGeneratingImg(true);
      const response = await fetch(config.development.backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
        }),
      });
      const data = await response.json();
      if (response.status === 200) {
        handleDecals(type, `data:image/png;base64,${data.photo}`);
      } else {
        console.log(JSON.stringify(data));
        alert("Error");
      }
    } catch (e) {
      debugger;
      error = true;
      console.error(JSON.stringify(e));
      window.alert(e);
    } finally {
      setGeneratingImg(false);
      if (!error) {
        setActiveEditorTab("");
      }
    }
  };
  const handleDecals = (type: DecalType, result: any) => {
    const decalType = DecalTypes[type];
    // @ts-ignore
    state[decalType.stateProperty] = result;
    // @ts-ignore
    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };
  const handleActiveFilterTab = (tabName: string) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    // after setting state we need to set activeFilterTab to update the UI
    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        // @ts-ignore
        [tabName]: !prevState[tabName],
      };
    });
  };
  const readFile = (type: DecalType) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      // setActiveEditorTab("");
    });
  };
  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    isActiveTab={tab.name === activeEditorTab}
                    handleClick={() => {
                      if (tab.name === activeEditorTab) setActiveEditorTab("");
                      else setActiveEditorTab(tab.name);
                    }}
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>
          <motion.div
            className="absolute z-10 right-5 top-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go Back"
              styles="w-fit px-4 py-2.5 text-sm"
              handleClick={() => (state.intro = true)}
            />
          </motion.div>
          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                // @ts-ignore
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
