import { useEffect, useState } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideElement(ref) {
  const [outSide, setOutSide] = useState(false);
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        console.log("You clicked outside of me!");
        if (window.Keyboard.isVisible) {
          window.Keyboard.hide();
        }
      }
    }

    // Bind the event listener
    document.addEventListener(
      window.cordova ? "touchend" : "mousedown",
      handleClickOutside,
    );
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener(
        window.cordova ? "touchend" : "mousedown",
        handleClickOutside,
      );
    };
  }, [ref]);
}

export default useOutsideElement;
