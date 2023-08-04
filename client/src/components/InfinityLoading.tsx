type loadingSizesType = { size: "xs" | "sm" | "md" | "lg" | "xl" };
const InfinityLoading = ({ size }: loadingSizesType) => {
  return <span className={`loading loading-infinity loading-${size}`}></span>;
};

export default InfinityLoading;
