import { useSnapshot } from "valtio";
import { user } from "../../store/user";
import CustomButton from "../CustomButton";
import { IoLogoGithub } from "react-icons/io5";
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { logout } from "./Profile";

const UserCard = () => {
  const userSnap = useSnapshot(user);
  const [open, setOpen] = useState<boolean>(false);
  return (
    userSnap.type !== null && (
      <div className="relative w-fit w-min-36">
        <div
          className="user-card flex justify-evenly items-center gap-3 rounded-md cursor-pointer 
            bg-yellow-500 px-3 py-2 bg-opacity-30 hover:bg-opacity-50 transition-all duration-200 ease-in-out"
          onClick={(e) => {
            setOpen((_open) => !_open);
          }}
        >
          <img
            className="object-contain rounded-full w-[25px] h-[25px]"
            width={25}
            height={25}
            alt="profile picture"
            src={userSnap.profilePic}
          />
          <div className="flex flex-col w-fit justify-start gap-0">
            <span className="w-fit text-[14px] font-semibold">
              {userSnap.name}
            </span>
          </div>
          <div className="provider_icon">
            {userSnap.type === "github" ? (
              <IoLogoGithub
                size={22}
                className=""
                style={{ color: "#121212" }}
              />
            ) : userSnap.type === "google" ? (
              <img
                src="/src/assets/google-color-icon.webp"
                alt="edit"
                width={20}
                height={20}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
        <div
          className={`absolute -z-10 w-full flex justify-center h-fit transition-all duration-300 ease-in-out ${
            open ? "opacity-100 top-[45px]" : "opacity-0 top-0"
          }`}
        >
          <CustomButton
            type="filled"
            title={
              <div className="flex justify-evenly items-center gap-3">
                <span>Logout</span>
                <FiLogOut />
              </div>
            }
            styles="w-fit px-3 py-2 text-sm font-semibold"
            handleClick={() => {
              if (userSnap.type !== null) {
                logout();
                setOpen((_open) => false);
              }
            }}
          />
        </div>
      </div>
    )
  );
};

export default UserCard;
