import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";
import config from "../config/config";
import { bin, cloudSave, download } from "../assets";
import { downloadCanvasToImage, readerResizer } from "../config/helpers";
import {
  EditorTabs,
  FilterTabs,
  DecalTypes,
  initialState,
} from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";

import {
  AIPicker,
  ColorPicker,
  FilePicker,
  Tab,
  CustomButton,
  Closet,
} from "../components";

import { closet, state } from "../store";

import SaveModal from "./SaveModal";
import { BiArrowBack } from "react-icons/bi";
import LoginModal from "./LoginModal";
import { user } from "../store/user";
import UserCard from "../components/login/UserCard";
import { fetchCookie, logout } from "../components/login/Profile";

const Customizer = () => {
  const snap = useSnapshot(state);
  const userSnap = useSnapshot(user);
  const closetSnap = useSnapshot(closet);
  const [logoFile, setLogoFile] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generatingImg, setGeneratingImg] = useState(false);

  // const [activeFilterTab, setActiveFilterTab] = useState<ActiveFilterTabType>({
  //   logoShirt: true,
  //   stylishShirt: false,
  // });

  const setActiveEditorTab = (type: EditorTabNameType) => {
    state.activeEditorTab = type;
    state.modelRotation = "front";
    state.uploadSelectedTab = "logo";
  };
  // show tab content depending on the active tab
  const generateTabContent = () => {
    switch (snap.activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
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
      case "closet":
        break;
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
      const token = fetchCookie("Authorization") ?? "";
      const response = await fetch(
        config.development.backendUrl + "/api/v1/dalle",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            prompt,
          }),
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        handleDecals(type, `data:image/png;base64,${data.photo}`);
      } else {
        if (response.status === 401) {
          logout();
        }
        console.log(JSON.stringify(data));
      }
    } catch (e) {
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
    if (
      !snap.activeFilterTab[decalType.filterTab] ||
      decalType.filterTab === "leftLogo" ||
      decalType.filterTab === "rightLogo"
    ) {
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
      case "leftLogo":
        break;
      case "rightLogo":
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
    state.activeFilterTab[tabName] = !snap.activeFilterTab[tabName];
  };
  const readFile = (type: DecalType, file: Blob | MediaSource | undefined) => {
    // let file = type === "logo" ? logoFile : textureFile;
    // reader(file)
    readerResizer(file)
      .then((result) => {
        handleDecals(type, result);
        // setActiveEditorTab("");
      })
      .catch((_e) => {
        // console.log(e);
      });
  };
  const restoreDefault = () => {
    const data = initialState;
    //
    state.color = data.color;
    state.isLogoTexture = data.isLogoTexture;
    state.isFullTexture = data.isFullTexture;
    state.logoDecal = data.logoDecal;
    state.fullDecal = data.fullDecal;
    state.leftDecal = data.leftDecal;
    state.rightDecal = data.rightDecal;
    state.activeFilterTab = data.activeFilterTab;
    state.logoPosition = data.logoPosition;
    state.modelRotation = data.modelRotation;
    state.activeEditorTab = data.activeEditorTab;
    state.uploadSelectedTab = data.uploadSelectedTab;
    // not sure what to do with it
    state.title = "edit";
  };
  const userLoggedIn = useMemo(() => userSnap.type !== null, [userSnap]);
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
                    isFilterTab={false}
                    isActiveTab={tab.name === snap.activeEditorTab}
                    tooltip={tab.tooltip}
                    handleClick={() => {
                      if (tab.name === snap.activeEditorTab) {
                        setActiveEditorTab("");
                      } else {
                        if (tab.name === "aipicker" && !userLoggedIn) {
                          // @ts-ignore
                          window.login_modal.showModal();
                        }
                        setActiveEditorTab(tab.name);
                      }
                    }}
                  />
                ))}
                {generateTabContent()}
                {closetSnap.show && <Closet />}
              </div>
            </div>
          </motion.div>
          <motion.div className="absolute z-10 left-3 top-3" {...fadeAnimation}>
            <CustomButton
              type="filled"
              title={<BiArrowBack size={20} />}
              styles="w-fit px-3 py-3 text-sm rounded-full"
              handleClick={() => {
                setActiveEditorTab("");
                closet.show = false;
                setTimeout(() => {
                  state.intro = true;
                }, 40);
              }}
            />
          </motion.div>
          {!userLoggedIn && (
            <motion.div
              className="absolute z-10 right-3 top-3"
              {...fadeAnimation}
            >
              <CustomButton
                type="filled"
                title={"Sign In"}
                styles="w-36 px-3 py-3 text-sm rounded-full font-semibold"
                handleClick={() => {
                  if (userSnap.type === null) {
                    // @ts-ignore
                    window.login_modal.showModal();
                  }
                }}
              />
            </motion.div>
          )}
          {userLoggedIn && (
            <motion.div
              className="absolute z-10 right-3 top-3"
              {...fadeAnimation}
            >
              <UserCard />
            </motion.div>
          )}

          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                tooltip={
                  snap.activeFilterTab[tab.name]
                    ? tab.activeTooltip
                    : tab.deactiveTooltip
                }
                isFilterTab
                isActiveTab={snap.activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
            <Tab
              key={"save"}
              tab={{ name: "save", icon: cloudSave }}
              tooltip="Save to cloud"
              isFilterTab
              isActiveTab={false}
              handleClick={() => {
                if (!userLoggedIn) {
                  // @ts-ignore
                  window.login_modal.showModal();
                } else {
                  // @ts-ignore
                  window.save_modal.showModal();
                }
              }}
            />
            <Tab
              key={"download"}
              tab={{ name: "download", icon: download }}
              tooltip="Download"
              isFilterTab
              isActiveTab={false}
              handleClick={downloadCanvasToImage}
            />
            <Tab
              key={"clear"}
              tab={{ name: "clear", icon: bin }}
              tooltip="Clear"
              isFilterTab
              isActiveTab={false}
              handleClick={restoreDefault}
            />
          </motion.div>
          <LoginModal />
          <SaveModal />
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
