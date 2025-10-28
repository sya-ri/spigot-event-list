import { useState } from "react";
import "./ko-fi.css";

export const KoFiButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      {isOpen && (
        <div className="bg-white rounded-xl">
          <iframe
              src="https://ko-fi.com/sya_ri/?hidefeed=true&widget=true&embed=true&preview=true"
              className="border-none w-full p-1"
              height={650}
              title="Support sya_ri"
          />
          <div className="border-t border-t-gray-300 mx-2" />
          <div className="text-gray-700 hover:text-gray-600 text-sm flex justify-center py-2">
            <a
                href="https://ko-fi.com/sya_ri"
                target="_blank"
                rel="noopener noreferrer"
            >ko-fi.com/sya-ri</a>
          </div>
        </div>
      )}
      <div className="flex justify-end">
        <div className="btn-container">
          {/* Mobile : Direct link */}
          <a
            title="Support me on Ko-Fi"
            className="kofi-button sm:!hidden"
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

          {/* PC : iframe & link */}
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
