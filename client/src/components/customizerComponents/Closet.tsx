import { AnimatePresence, motion } from "framer-motion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import CanvasModel from "../../canvas";
import { useState } from "react";
import { closet } from "../../store";

const Closet = () => {
  const items = ["T-1", "T-2", "T-1", "T-2", "T-1", "T-2"];
  const [scrollStep, setScrollStep] = useState(0);
  return (
    <AnimatePresence>
      {/* <motion.div */}
      <div
        // {...slideAnimation("left")}
        className={`closet-container h-[${130 * 3}px]`}
      >
        <div
          className="h-96 carousel carousel-vertical rounded-box"
          onScrollCapture={(e) => {
            var atSnappingPoint =
              // @ts-ignore
              e.target.scrollTop % e.target.offsetHeight === 0;
            var timeOut = atSnappingPoint ? 0 : 150; //see notes
            // @ts-ignore
            clearTimeout(e.target.scrollTimeout); //clear previous timeout
            // @ts-ignore
            e.target.scrollTimeout = setTimeout(function () {
              const newSnappingStep =
                // @ts-ignore
                (e.target.scrollTop / e.target.offsetHeight) * 2;
              console.log(newSnappingStep.toString());
              setScrollStep(() => newSnappingStep);
            }, timeOut);
          }}
        >
          {items.map((item, index) => (
            <div
              className="relative carousel-item h-1/2 cursor-pointer 
              flex flex-col overflow-hidden"
              key={index}
              id={`slide-${index}`}
            >
              <div className="h-full">
                <CanvasModel
                  canvasType="close"
                  canvasId={item}
                  // need to pass prompts to initiate tshirt
                />
              </div>
              <h2
                className="absolute bottom-2 translate-x-[-50%] left-[50%] 
                w-full text-center h-1/12 bg-gray-600 bg-opacity-50
                text-semibold text-white"
              >
                {closet[item].title}
              </h2>
            </div>
          ))}
        </div>
        {scrollStep > 0 && (
          <a
            href={`#slide-${scrollStep - 1}`}
            className="absolute btn btn-circle translate-x-[-50%] left-[50%]
            -top-4 z-10 text-2xl btn-sm"
          >
            <FiChevronUp />
          </a>
        )}
        {scrollStep + 2 < items.length && (
          <a
            href={`#slide-${scrollStep + 1}`}
            className="absolute btn btn-circle translate-x-[-50%] left-[50%]
          -bottom-4 z-10 text-2xl btn-sm"
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
function useSate(arg0: number): [any, any] {
  throw new Error("Function not implemented.");
}
