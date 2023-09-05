import { useRef, useState } from "react";
import { cloudSave } from "../assets";
import Message from "../components/Message";
import InfinityLoading from "../components/InfinityLoading";
import { HOST_NAME, MAX_FORM_TITLE_LENGTH } from "../config/constants";
import { CustomButton } from "../components";
import { useSnapshot } from "valtio";
import {
  state,
  formState,
  closet,
  // closet
} from "../store";
import { BiSolidError } from "react-icons/bi";
import { MdCloudDone } from "react-icons/md";
// import { makeid } from "../config/helpers";
import axios from "axios";
import GoogleButton from "../components/login/GoogleButton";
import LinkedInButton from "../components/login/LinkedInButton";
import GithubButton from "../components/login/GithubButton";

const LoginModal = () => {
  const snap = useSnapshot(state);

  const closeModal = () => {
    // @ts-ignore
    window.document.getElementById("login_backdrop").click();
    // @ts-ignore
  };

  return (
    <dialog id="login_modal" className="modal">
      <form method="dialog" className="modal-box">
        <div className="w-full flex flex-col justify-center items-start gap-2">
          <p className="text-center w-full mb-5 font-semibold">
            You must Sign-In to with Google or Github to continue{" "}
          </p>
          <GoogleButton />
          <GithubButton />
          {/* <LinkedInButton /> */}
        </div>
      </form>
      <form method="dialog" id="login_backdrop" className="modal-backdrop">
        <button
          onClick={() => {
            // closeModal();
            console.log("clicked on backdrop");
          }}
        ></button>
      </form>
    </dialog>
  );
};

export default LoginModal;
