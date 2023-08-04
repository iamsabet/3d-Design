import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";
import config from "../config/config";
import { bin, cloudSave, download } from "../assets";
import { downloadCanvasToImage } from "../config/helpers";
import { reader } from "../config/helpers";
import { BiSolidError } from "react-icons/bi";
import { MdCloudDone } from "react-icons/md";
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

import { state } from "../store";
import closetState from "../store/closet";
import Message from "../components/Message";
import InfinityLoading from "../components/InfinityLoading";
const Customizer = () => {
  const snap = useSnapshot(state);
  const closetSnap = useSnapshot(closetState);
  const [logoFile, setLogoFile] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generatingImg, setGeneratingImg] = useState(false);
  const [closetComponent, setClosetComponent] = useState<JSX.Element>(<></>);
  const [formTitle, setFormTitle] = useState("");
  const MAX_FORM_TITLE_LENGTH = 50;
  // const [activeFilterTab, setActiveFilterTab] = useState<ActiveFilterTabType>({
  //   logoShirt: true,
  //   stylishShirt: false,
  // });
  useEffect(() => {
    generateCloset();
  }, []);
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
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    // after setting state we need to set activeFilterTab to update the UI
    setActiveFilterTab(tabName);
  };
  const generateCloset = () => {
    setTimeout(() => {
      setClosetComponent((_) => <Closet />);
      console.log("generated closet");
    }, 2000);
  };
  const setActiveFilterTab = (tabName: string) => {
    state.activeFilterTab[tabName] = !snap.activeFilterTab[tabName];
  };
  const readFile = (type: DecalType, file: Blob | MediaSource | undefined) => {
    // let file = type === "logo" ? logoFile : textureFile;
    reader(file)
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

  const saveToCloud = () => {
    const saveData = JSON.parse(JSON.stringify(snap));
    console.log(saveData);
    // show modal enter title and save title to it

    // then send a post req to server with all
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
                {closetComponent}
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
            <Tab
              key={"clear"}
              tab={{ name: "clear", icon: bin }}
              isFilterTab
              isActiveTab={false}
              handleClick={restoreDefault}
            />
            <Tab
              key={"save"}
              tab={{ name: "save", icon: cloudSave }}
              isFilterTab={false}
              isActiveTab={false}
              handleClick={() => {
                // @ts-ignore
                window.save_modal.showModal();
              }}
            />
          </motion.div>

          <dialog id="save_modal" className="modal">
            <form method="dialog" className="modal-box">
              <div className="flex flex-row gap-2 justify-center items-center">
                <img src={cloudSave} className="w-10 h-10 object-contain" />
                <h3 className="font-bold text-lg">
                  Upload and Save your design to the cloud
                </h3>
              </div>
              <p className="py-4 text-center">What do you want to call it ?</p>
              <div className="flex flex-col justify-center items-end text-center h-14 w-full">
                <input
                  value={formTitle}
                  placeholder="Design Title"
                  onChange={(e) => {
                    setFormTitle((_prev) => e.target.value);
                    console.log(e.target.value.length);
                  }}
                  className="rounded-md text-center h-12 w-full"
                  maxLength={MAX_FORM_TITLE_LENGTH}
                />
                <span className={`text-right h-4`}>
                  {formTitle.length} / {MAX_FORM_TITLE_LENGTH}
                </span>
              </div>
              <div className="w-full flex flex-row h-14 mt-5">
                <Message
                  type="info"
                  icon={<InfinityLoading size="xl" />}
                  message="Uploading your files, please wait ..."
                />
                {/* <Message
                  type="error"
                  icon={<BiSolidError size={28} />}
                  message="Task Failed Successfully"
                /> */}
                {/* <Message
                  type="success"
                  icon={<MdCloudDone size={28} />}
                  message="Design Saved Successfully"
                /> */}
              </div>
              <div
                className="py-2 pt-1 flex flex-row justify-around 
              gap-3 items-center"
              >
                <CustomButton
                  type="outline"
                  title={"Cancel"}
                  styles={"text-lg rounded-lg"}
                  handleClick={(e) => {
                    e.preventDefault();

                    window.document
                      .querySelectorAll(".modal-backdrop button")[0]
                      // @ts-ignore
                      .click();
                  }}
                />
                <CustomButton
                  type="filled"
                  title={"Save"}
                  styles={"text-lg rounded-lg"}
                  handleClick={(e) => {
                    e.preventDefault();
                  }}
                />
              </div>
            </form>
            <form method="dialog" className="modal-backdrop">
              <button
                onClick={() => {
                  setFormTitle(() => "");
                }}
              >
                close
              </button>
            </form>
          </dialog>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
