import { useEffect } from "react";

const usePreventScroll = (openArray: boolean[]) => {
  useEffect(() => {
    console.log(openArray.some((v) => (v ? true : false)));
    if (openArray.some((v) => (v ? true : false))) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "15px";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    }
  }, [openArray]);
};

export default usePreventScroll;
