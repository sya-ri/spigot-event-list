import { useState } from "react";
import "./ko-fi.css";

export const KoFiButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      {isOpen && (
        <iframe
          src="https://ko-fi.com/sya_ri/?hidefeed=true&widget=true&embed=true&preview=true"
          className="border-none w-full p-1 bg-[#f9f9f9] rounded-xl"
          height={575}
          title="Support sya_ri"
        />
      )}
      <div className="flex justify-end">
        <div className="btn-container">
          <a
            title="Support me on Ko-Fi"
            className="kofi-button rounded-full sm:!hidden"
            href="https://ko-fi.com/sya_ri"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="kofitext">
              <img
                src="https://ko-fi.com/img/cup-border.png"
                className="kofiimg"
                alt="Ko-Fi button"
              />
              Support me on Ko-Fi
            </span>
          </a>

          {/* PC */}
          <a
            title="Support me on Ko-Fi"
            className="kofi-button rounded-full !hidden sm:!inline-block"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="kofitext">
              <img
                src="https://ko-fi.com/img/cup-border.png"
                className="kofiimg"
                alt="Ko-Fi button"
              />
              Support me on Ko-Fi
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};
