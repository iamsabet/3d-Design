import { IoLogoGithub } from "react-icons/io5";
import { RiArrowRightLine } from "react-icons/ri";

const GithubButton = () => {
  return (
    <a
      className="oauth-button group"
      style={{
        border: "1px solid rgba(255, 255, 255, 0.12)",
      }}
      href=""
      onClick={(e) => {
        e.preventDefault();
        console.log("Github Oauth Clicked");
      }}
    >
      <div className="flex justify-start gap-5">
        <IoLogoGithub size={24} className="" style={{ color: "#ededed" }} />
        <span className="text-light-1 text-[14px]">Continue with Github</span>
      </div>
      <div
        className="transition-all -translate-x-3 duration-150 ease-in-out opacity-0 
      group-hover:opacity-100 group-hover:translate-x-0"
      >
        <RiArrowRightLine size={20} />
      </div>
    </a>
  );
};

export default GithubButton;
