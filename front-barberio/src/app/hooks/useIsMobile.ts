import { useMediaQuery } from "react-responsive";

const useIsMobile = () => {
  return useMediaQuery({ query: `(max-width: 999px)` });
};

export default useIsMobile;
