import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";
import config from "../config/config";
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
  const [logoFile, setLogoFile] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generatingImg, setGeneratingImg] = useState(false);

  // const [activeFilterTab, setActiveFilterTab] = useState<ActiveFilterTabType>({
  //   logoShirt: true,
  //   stylishShirt: false,
  // });
  const setActiveEditorTab = (type: EditorTabNameType) => {
    state.activeEditorTab = type;
  };
  // show tab content depending on the active tab
  const generateTabContent = () => {
    switch (snap.activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "logopicker":
        return (
          <FilePicker
            // @ts-ignore
            file={logoFile}
            readFile={readFile}
            setFile={setLogoFile}
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
    state[decalType.stateProperty] = result;
    if (!snap.activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };
  const handleActiveFilterTab = (tabName: string) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !snap.activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !snap.activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    // after setting state we need to set activeFilterTab to update the UI
    setActiveFilterTab(tabName);
  };
  const setActiveFilterTab = (tabName: string) => {
    state.activeFilterTab[tabName] = !state.activeFilterTab[tabName];
  };
  const readFile = (type: DecalType, file: Blob | MediaSource | undefined) => {
    // let file = type === "logo" ? logoFile : textureFile;
    reader(file)
      .then((result) => {
        handleDecals(type, result);
        // setActiveEditorTab("");
      })
      .catch((e) => {
        // console.log(e);
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
                    isActiveTab={tab.name === snap.activeEditorTab}
                    handleClick={() => {
                      if (tab.name === snap.activeEditorTab) {
                        setActiveEditorTab("");
                      } else {
                        setActiveEditorTab(tab.name);
                      }
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
              handleClick={() => {
                setActiveEditorTab("");
                setTimeout(() => {
                  state.intro = true;
                }, 50);
              }}
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
                isActiveTab={snap.activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
            <Tab
              key={"download"}
              tab={{ name: "download", icon: download }}
              isFilterTab
              isActiveTab={false}
              handleClick={downloadCanvasToImage}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
