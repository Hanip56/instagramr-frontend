import React, { useEffect, RefObject, SetStateAction } from "react";

function useOutsideAlerter(
  ref: RefObject<HTMLElement>,
  set: React.Dispatch<SetStateAction<boolean>>
) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */

    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        // console.log(ref);
        // console.log("You clicked outside of me!");
        set(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export default useOutsideAlerter;
