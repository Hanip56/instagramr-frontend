import React, { useEffect, RefObject, SetStateAction } from "react";

const useOutsideAlerter = (
  ref: RefObject<HTMLElement>,
  set: React.Dispatch<SetStateAction<boolean>>,
  triggerRef: RefObject<HTMLElement>
) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        ref.current &&
        triggerRef.current &&
        !ref.current.contains(event.target as Node) &&
        !triggerRef.current?.contains(event.target as Node)
      ) {
        set(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

export default useOutsideAlerter;
