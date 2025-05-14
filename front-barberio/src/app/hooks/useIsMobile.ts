import { useMediaQuery } from "react-responsive";

const useIsMobile = () => {
  return useMediaQuery({ query: `(max-width: 760px)` });
};

export default useIsMobile;
