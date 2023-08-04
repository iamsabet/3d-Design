import { AnimatePresence } from "framer-motion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import CanvasModel from "../../canvas";
import { useState } from "react";
import { state, closet, getModel } from "../../store";
import { useSnapshot } from "valtio";

const Closet = () => {
  const items: StoreType[] = closet.list;
  const [scrollStep, setScrollStep] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const snap = useSnapshot(state);

  const linkHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // console.log(isScrolling);
    if (isScrolling) {
      e.preventDefault();
    } else {
      setTimeout(() => {
        window.location.pathname = "";
        window.location.hash = "";
      }, 300);
    }
  };

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    var atSnappingPoint =
      // @ts-ignore
      e.target.scrollTop % e.target.offsetHeight === 0;
    var timeOut = atSnappingPoint ? 0 : 150; //see notes
    // @ts-ignore
    clearTimeout(e.target.scrollTimeout); //clear previous timeout
    setIsScrolling((_) => true);
    // @ts-ignore
    e.target.scrollTimeout = setTimeout(function () {
      const newSnappingStep =
        // @ts-ignore
        Math.round((e.target.scrollTop / e.target.offsetHeight) * 2);
      // console.log(newSnappingStep.toString());
      setIsScrolling((_) => false);
      setScrollStep((_) => newSnappingStep);
    }, timeOut);
  };

  const loadTshirtState = (id: string) => {
    const data = getModel(id);
    //
    if (data) {
      state.color = data.color;
      state.isLogoTexture = data.isLogoTexture;
      state.isFullTexture = data.isFullTexture;
      state.logoDecal = data.logoDecal;
      state.fullDecal = data.fullDecal;
      state.leftDecal = data.leftDecal;
      state.rightDecal = data.rightDecal;
      state.activeFilterTab = data.activeFilterTab;
      state.logoPosition = data.logoPosition;
      // not sure what to do with it
      state.title = data.title;
    }
  };

  return (
    <AnimatePresence>
      {/* <motion.div */}
      <div
        // {...slideAnimation("left")}
        className={`closet-container h-[${130 * 3}px] ${
          snap.activeEditorTab === "closet" ? "show" : "hid"
        }`}
      >
        <div
          className="h-96 carousel carousel-vertical rounded-box"
          onScrollCapture={scrollHandler}
        >
          {items && items.length == 0 && (
            <h1 className="text-center my-auto mx-auto text-bold text-lg">
              No design found
            </h1>
          )}
          {items &&
            items.length > 0 &&
            items.map((item, index) => (
              <div
                className="relative carousel-item h-1/2 cursor-pointer 
              flex flex-col overflow-hidden rounded-xl mt-1"
                key={index}
                id={`slide-${index}`}
                // @ts-ignore
                onClick={(_) => loadTshirtState(item.id)}
              >
                <div className="h-full">
                  <CanvasModel
                    canvasType="close"
                    canvasId={item.id}
                    // need to pass prompts to initiate tshirt
                  />
                </div>
                <h2
                  className="absolute bottom-2 translate-x-[-50%] left-[50%] 
                w-full text-center h-1/12 bg-gray-600 bg-opacity-50
                text-semibold text-white"
                >
                  {item.title}
                </h2>
              </div>
            ))}
        </div>
        {scrollStep > 0 && (
          <a
            href={`#slide-${scrollStep - 1}`}
            className="carousel-btn -top-4"
            onClick={linkHandler}
          >
            <FiChevronUp />
          </a>
        )}
        {scrollStep + 2 < items.length && (
          <a
            href={`#slide-${scrollStep + 1}`}
            className="carousel-btn -bottom-4"
            onClick={linkHandler}
          >
            <FiChevronDown />
          </a>
        )}
        {/* </motion.div> */}
      </div>
    </AnimatePresence>
  );
};

export default Closet;
