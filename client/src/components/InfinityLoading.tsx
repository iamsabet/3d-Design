type loadingSizesType = {
  size:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl";
};
const InfinityLoading = ({ size }: loadingSizesType) => {
  return <span className={`loading loading-infinity loading-${size}`}></span>;
};

export default InfinityLoading;
