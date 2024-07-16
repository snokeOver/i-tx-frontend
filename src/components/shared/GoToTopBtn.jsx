import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { goToTop } from "../../helper/goToTop";

const GoToTopBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  const listenToScroll = () => {
    let heightToHidden = 200;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > heightToHidden) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  return (
    <div className="wrapper">
      {isVisible && (
        <div
          className="top-btn fixed bottom-10 right-6 z-50 w-10 h-10 flex justify-center items-center rounded-full cursor-pointer bg-primary"
          onClick={goToTop}
        >
          <FaArrowUp className="top-btn--icon text-gray-900 text-xl" />
        </div>
      )}
    </div>
  );
};

export default GoToTopBtn;
