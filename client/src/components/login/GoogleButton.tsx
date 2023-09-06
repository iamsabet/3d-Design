import { useEffect, useState } from "react";
import { RiArrowRightLine } from "react-icons/ri";
import config from "../../config/config";
import { setCookie, fetchProfile } from "./Profile";

const GoogleButton = () => {
  const [externalPopup, setExternalPopup] = useState<Window | null>(null);
  const width: number = 430;
  const height: number = 650;
  const connectClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    const title = "Google Authentication";
    const url = config.development.backendUrl + "/api/v1/auth/google";
    const params = `scrollbars=no,resizable=no,location=no,toolbar=no,menubar=no,width=${width},height=${height},left=${left},top=${top}`;
    let popup = open(url, title, params);
    setExternalPopup(popup);
  };
  useEffect(() => {
    if (!externalPopup) {
      return;
    }

    const timer = setInterval(() => {
      if (!externalPopup) {
        timer && clearInterval(timer);
        return;
      }
      try {
        const currentUrl = externalPopup.location.href;
        if (!currentUrl) {
          return;
        }

        const searchParams = new URL(currentUrl).searchParams;
        const token = searchParams.get("token");
        if (token) {
          externalPopup.close();
          timer && clearInterval(timer);
          setCookie("Authorization", token);
          fetchProfile(token);
        }
      } catch (e) {}
    }, 200);
  }, [externalPopup]);
  return (
    <button
      className="oauth-button group"
      style={{
        border: "1px solid rgba(255, 255, 255, 0.12)",
      }}
      onClick={connectClick}
    >
      <div className="flex justify-start gap-5">
        {/* <IoLogoGoogle size={24} className="" style={{ color: "#0A66C2" }} /> */}
        <img
          src="/src/assets/google-color-icon.webp"
          alt="edit"
          width={22}
          height={22}
        />

        <span className="text-light-1 text-[14px]">Continue with Google</span>
      </div>
      <div
        className="transition-all -translate-x-3 duration-150 ease-in-out opacity-0 
      group-hover:opacity-100 group-hover:translate-x-0"
      >
        <RiArrowRightLine size={20} />
      </div>
    </button>
  );
};

export default GoogleButton;
