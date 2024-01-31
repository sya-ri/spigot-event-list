"use client";

import { BiArrowToTop } from "react-icons/bi";

const ScrollToTopButton = () => {
  return (
    <div
      className="btn btn-ghost btn-circle"
      onClick={() => window.scroll({ behavior: "smooth", top: 0 })}
    >
      <BiArrowToTop className="h-6 w-6 fill-current" />
    </div>
  );
};

export default ScrollToTopButton;
