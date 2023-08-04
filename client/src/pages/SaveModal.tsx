import { useRef, useState } from "react";
import { cloudSave } from "../assets";
import Message from "../components/Message";
import InfinityLoading from "../components/InfinityLoading";
import { MAX_FORM_TITLE_LENGTH } from "../config/constants";
import { CustomButton } from "../components";
import { useSnapshot } from "valtio";
import { state, formState, closet } from "../store";
import { BiSolidError } from "react-icons/bi";
import { MdCloudDone } from "react-icons/md";
import { makeid } from "../config/helpers";
const SaveModal = () => {
  const snap = useSnapshot(state);
  const formSnap = useSnapshot(formState);
  //   const closetSnap = useSnapshot(closet);
  const [timer, setTimer] = useState(0);
  const titleRef = useRef(null);
  const errorStyle =
    formSnap.status &&
    formSnap.status.type === "error" &&
    formSnap.status.message.startsWith("Title")
      ? "outline-red-600"
      : "";

  const saveToCloud = async () => {
    let saveData = JSON.parse(JSON.stringify(snap));
    if (formSnap.title.length < 4) {
      showFormMessage({
        type: "error",
        message: "Title must have at least 4 letters.",
        timeout: 4000,
      });
      //@ts-ignore
      titleRef.current?.focus();
      return;
    }
    // messagesTest();

    // show modal enter title and save title to it
    saveData.title = formSnap.title;
    await saveToLocalStorage(saveData);
    showFormMessage({
      type: "success",
      message: "Your design Saved Successfully.",
      timeout: 2000,
    });
    // then send a post req to server with all
  };
  const saveToLocalStorage = (data: StoreType) => {
    return new Promise((resolve, _reject) => {
      showFormMessage({
        type: "info",
        message: "Uploading your files, please wait and dont click ...",
        timeout: null,
      });
      formState.isUploading = true;
      // create random string for id
      data.id = "T-" + makeid(10);
      setTimeout(() => {
        closet.list.push(data);
        localStorage.setItem("closet", JSON.stringify(closet.list));
        return resolve(true);
        // for error reject, or resolve (false)
      }, 2000);
    });
  };
  const showFormMessage = ({ type, message, timeout }: MessageType) => {
    if (timer) {
      clearInterval(timer);
    }
    if (timeout) {
      const inter = setTimeout(() => {
        if (formState.status?.type === "success") {
          formState.isUploading = false;
          closeModal();
        } else {
          formState.isUploading = false;
        }
        formState.status = undefined;
      }, timeout);
      setTimer((_) => inter);
    }
    formState.status = {
      type: type,
      message: message,
    };
  };
  const setFormTitle = (title: string) => {
    formState.title = title;
  };
  const closeModal = () => {
    window.document
      .querySelectorAll(".modal-backdrop button")[0]
      // @ts-ignore
      .click();
  };
  //   const messagesTest = () => {
  //     // implement loading
  //     showFormMessage({
  //       type: "info",
  //       message: "Uploading your files, please wait and dont click ...",
  //       timeout: null,
  //     });
  //     formState.isUploading = true;
  //     setTimeout(() => {
  //       // implement error
  //       //   showFormMessage({
  //       //     type: "error",
  //       //     message: "Oops something went wrong, please try later.",
  //       //     timeout: 5000,
  //       //   });
  //       // implement success
  //       showFormMessage({
  //         type: "success",
  //         message: "Your design Saved Successfully.",
  //         timeout: 2000,
  //       });
  //     }, 4000);
  //   };

  return (
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
            ref={titleRef}
            value={formSnap.title}
            placeholder="Design Title"
            onChange={(e) => {
              setFormTitle(e.target.value);
            }}
            className={`rounded-md text-center h-12 w-full ${errorStyle}`}
            maxLength={MAX_FORM_TITLE_LENGTH}
          />
          <span className={`text-right h-4`}>
            {formSnap.title.length} / {MAX_FORM_TITLE_LENGTH}
          </span>
        </div>
        <div className="w-full flex flex-row h-14 mt-5">
          {formSnap.status && (
            <>
              {formSnap.status.type === "info" && (
                <Message
                  type="info"
                  icon={<InfinityLoading size="xl" />}
                  message={formSnap.status.message}
                />
              )}
              {formSnap.status.type === "error" && (
                <Message
                  type="error"
                  icon={<BiSolidError size={28} />}
                  message={formSnap.status.message}
                />
              )}
              {formSnap.status.type === "success" && (
                <Message
                  type="success"
                  icon={<MdCloudDone size={28} />}
                  message={formSnap.status.message}
                />
              )}
            </>
          )}
        </div>
        <div
          className="py-2 pt-1 flex flex-row justify-around 
              gap-3 items-center"
        >
          <CustomButton
            type="outline"
            title={"Cancel"}
            styles={"text-lg rounded-lg"}
            disabled={formState.isUploading}
            handleClick={(e) => {
              e.preventDefault();
              closeModal();
            }}
          />
          <CustomButton
            type="filled"
            submit
            title={"Save"}
            styles={"text-lg rounded-lg"}
            disabled={formState.isUploading}
            handleClick={(e) => {
              e.preventDefault();
              saveToCloud();
            }}
          />
        </div>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button
          onClick={() => {
            setFormTitle("");
          }}
        >
          close
        </button>
      </form>
    </dialog>
  );
};

export default SaveModal;
