import { useEffect } from "react";

export const useOutsideClick = (ref: any, callback: any) => {
  const handleClick = (e: any) => {
    // console.log(e.target);
    // console.log(ref.current.contains(e.target));
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};
