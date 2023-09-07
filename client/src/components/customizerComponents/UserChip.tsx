import { IoLogoGithub, IoLogoGoogle } from "react-icons/io5";

const UserChip = (props: OwnerType) => {
  // const { name, profilePic, type } = props;
  const { name, type } = props;
  return (
    <div className="relative w-fit mx-0.5 rounded-full overflow-hidden">
      <div
        className="user-card flex justify-center items-center gap-2 rounded-md cursor-pointer text-dark-1
            bg-yellow-500 px-2 py-1 bg-opacity-60 hover:bg-opacity-80 transition-all duration-200 ease-in-out"
      >
        {/* <img
          className="object-contain rounded-full w-[20px] h-[20px]"
          width={15}
          height={15}
          alt="profile picture"
          src={profilePic}
        /> */}

        <div className="flex flex-col w-fit justify-start gap-0">
          <span className="w-fit text-[12px] line-clamp-1 text-ellipsis font-semibold h-full pt-0.5">
            By : {name}
          </span>
        </div>
        <div className="provider_icon">
          {type === "github" ? (
            <IoLogoGithub size={20} className="" style={{ color: "#121212" }} />
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
