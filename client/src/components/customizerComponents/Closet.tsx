// import { AnimatePresence } from "framer-motion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import CanvasModel from "../../canvas";
import { useEffect } from "react";
import { state, closet, getModel } from "../../store";
import { useSnapshot } from "valtio";
import InfinityLoading from "../InfinityLoading";
import UserChip from "./UserChip";
const Closet = () => {
  const snap = useSnapshot(state);
  const closetSnap = useSnapshot(closet);

  useEffect(() => {
    //
    if (
      closet.list.length === closet.scrollStep ||
      closet.list.length === closet.scrollStep + 2
    ) {
      if (closet.hasNextPage && !closet.isLoading) {
        closet.isLoading = true;
        closet.initialCloset();
      }
    }
    return () => {
      // cleanup function
    };
  }, [closetSnap.scrollStep]);

  const linkHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // console.log(isScrolling);
    if (closet.isScrolling) {
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
    closet.isScrolling = true;
    // @ts-ignore
    e.target.scrollTimeout = setTimeout(function () {
      const newSnappingStep =
        // @ts-ignore
        Math.floor((e.target.scrollTop / e.target.offsetHeight) * 2);
      // console.log(newSnappingStep.toString());
      closet.isScrolling = false;
      closet.scrollStep = newSnappingStep;
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
    <div
      className={`closet-container h-[${130 * 3}px] ${
        snap.activeEditorTab === "closet" ? "show" : "hide"
      }`}
    >
      <div
        className="h-96 carousel carousel-vertical rounded-box"
        onScrollCapture={scrollHandler}
      >
        {closetSnap.list && closetSnap.list.length == 0 && (
          <h1 className="text-center my-auto mx-auto text-bold text-lg">
            {!closetSnap.isLoading && "No design found"}
          </h1>
        )}
        {closetSnap.list &&
          closetSnap.list.length > 0 &&
          closetSnap.list.map((item, index) => (
            <div
              className="relative carousel-item h-1/2 cursor-pointer 
              flex flex-col overflow-hidden rounded-xl mt-0.5"
              key={index}
              id={`slide-${index}`}
              // @ts-ignore
              onClick={(_) => loadTshirtState(item.id)}
            >
              <div className="absolute bottom-2 left-0 w-full h-[16px] z-10 flex justify-center gap-1 items-center">
                {item.owner && <UserChip {...item.owner} />}
              </div>
              <div className="h-full flex flex-row justify-center items-center">
                {Math.abs(closetSnap.scrollStep - index) < 3 ? (
                  <CanvasModel
                    canvasType="close"
                    canvasId={item.id}
                    // need to pass prompts to initiate tshirt
                  />
                ) : (
                  <div className="btn btn-circle">
                    <InfinityLoading size="5xl" />
                  </div>
                )}
              </div>
              <h2
                className="absolute top-0 translate-x-[-50%] left-[50%] 
                w-full text-center h-1/12 py-1 bg-dark-2 bg-opacity-80
                text-semibold text-white text-[14px]"
              >
                {item.title}
              </h2>
            </div>
          ))}
      </div>
      {closetSnap.scrollStep > 0 && (
        <a
          href={`#slide-${closetSnap.scrollStep - 1}`}
          className="carousel-btn -top-5 shadow-lg"
          onClick={linkHandler}
        >
          <FiChevronUp />
        </a>
      )}

      {closetSnap.isLoading ? (
        <a className="carousel-btn -bottom-5 shadow-lg" onClick={linkHandler}>
          <InfinityLoading size="3xl" />
        </a>
      ) : (
        closetSnap.scrollStep + 2 < closetSnap.list.length && (
          <a
            href={`#slide-${closetSnap.scrollStep + 1}`}
            className="carousel-btn -bottom-5 shadow-lg"
            onClick={linkHandler}
          >
            <FiChevronDown />
          </a>
        )
      )}
    </div>
  );
};

export default Closet;
