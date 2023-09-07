import { IoLogoGithub, IoLogoGoogle } from "react-icons/io5";

const UserChip = (props: OwnerType) => {
  const { name, profilePic, type } = props;
  return (
    <div className="relative w-fit mx-0.5 rounded-full overflow-hidden">
      <div
        className="user-card flex justify-evenly items-center gap-3 rounded-md cursor-pointer text-dark-1
            bg-yellow-500 px-2 py-1 bg-opacity-60 hover:bg-opacity-80 transition-all duration-200 ease-in-out"
      >
        {/* <img
          className="object-contain rounded-full w-[20px] h-[20px]"
          width={20}
          height={20}
          alt="profile picture"
          src={profilePic}
        /> */}
        <div className="flex flex-col w-fit justify-start gap-0">
          <span className="w-fit text-[12px] line-clamp-1 text-ellipsis font-semibold">
            By : {name}
          </span>
        </div>
        <div className="provider_icon">
          {type === "github" ? (
            <IoLogoGithub size={16} className="" style={{ color: "#121212" }} />
          ) : type === "google" ? (
            <IoLogoGoogle size={16} className="" style={{ color: "#FF1122" }} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserChip;
