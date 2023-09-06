import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../config/motion";
import { closet, state } from "../store";
import { CustomButton } from "../components";
import { fetchCookie, fetchProfile } from "../components/login/Profile";
import { useEffect } from "react";

const Home = () => {
  const snap = useSnapshot(state);

  useEffect(() => {
    const token = fetchCookie("Authorization");
    if (token) {
      fetchProfile(token);
    }

    return () => {};
  }, []);

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home px-3" {...slideAnimation("left")}>
          <motion.header
            className="h-5 flex flex-row justify-between items-center"
            {...slideAnimation("down")}
          >
            {/* empty */}
          </motion.header>
          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="head-text">
                LET'S
                <br className="xl:block hidden" />
                {""} DO IT.
              </h1>
            </motion.div>
            <motion.div
              {...headContentAnimation}
              className="flex flex-col gap-5"
            >
              <p className="max-w-md font-normal text-gray-600 text-base">
                Ignite your creativity with our brand-new 3D customization tool
                and design your exclusive T-Shirt.
                <br />
                <strong>Unleash your imagination</strong> and redefine your
                style with ease.
              </p>
              <CustomButton
                type="filled"
                title="Customize It"
                handleClick={() => {
                  state.intro = false;
                  setTimeout(() => {
                    closet.show = true;
                  }, 1500);
                }}
                styles="w-fit px-4 py-2.5 font-bold text-sm"
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Home;
