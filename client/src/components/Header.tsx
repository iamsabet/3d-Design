import {
  BiLogoDiscordAlt,
  BiLogoGithub,
  BiLogoLinkedin,
  BiMailSend,
} from "react-icons/bi";
import { useSnapshot } from "valtio";
import { state } from "../store";

const Header = () => {
  const snap = useSnapshot(state);
  return (
    <header
      className={`fixed bg-transparent ${
        snap.intro ? "top-0" : "-top-16"
      } xl:left-2 left-0 right-0 transition-all duration-500 ease-in-out
            h-12 flex flex-row justify-between items-center 
            pt-1 xl:px-36 lg:px-8 md:px-8 px-6 z-10`}
    >
      <div>
        <img
          src="./sabet_hex.png"
          alt="logo"
          className="w-8 h-8 object-contain"
        />
      </div>
      <div className="icons flex flex-row gap-2">
        <a href="https://github.com/iamsabet" target="_blank">
          <BiMailSend size="24" />
        </a>
        <a href="https://github.com/iamsabet" target="_blank">
          <BiLogoDiscordAlt size="24" />
        </a>
        <a href="https://github.com/iamsabet" target="_blank">
          <BiLogoLinkedin size="24" />
        </a>
        <a href="https://github.com/iamsabet" target="_blank">
          <BiLogoGithub size="24" />
        </a>
      </div>
    </header>
  );
};

export default Header;
