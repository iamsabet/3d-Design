import GoogleButton from "../components/login/GoogleButton";
import GithubButton from "../components/login/GithubButton";

const LoginModal = () => {
  const closeModal = () => {
    // @ts-ignore
    window.document.getElementById("login_backdrop").children[0].click();
  };

  return (
    <dialog id="login_modal" className="modal">
      <form method="dialog" className="modal-box">
        <div className="w-full flex flex-col justify-start items-center gap-2">
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
            closeModal();
          }}
        ></button>
      </form>
    </dialog>
  );
};

export default LoginModal;
