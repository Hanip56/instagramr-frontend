import { HiBars3 } from "react-icons/hi2";
import { TbMessageReport, TbMoon, TbSettings } from "react-icons/tb";
import { useState, createRef, useEffect } from "react";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";
import { FiChevronLeft } from "react-icons/fi";
import { BiTagAlt } from "react-icons/bi";
import { AiOutlineFieldTime } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { toggleMode } from "../../app/features/mode/modeSlice";

const MenuBar = () => {
  const [showBar, setShowBar] = useState(false);
  const [switchApperance, setSwitchAppearance] = useState(false);
  const barRef = createRef<HTMLDivElement>();
  const moreBtnRef = createRef<HTMLButtonElement>();
  const { mode } = useSelector((state: RootState) => state.mode);
  const dispatch = useDispatch();

  useOutsideAlerter(barRef, setShowBar, moreBtnRef);

  const handleToggleMode = () => {
    dispatch(toggleMode());
  };

  useEffect(() => {
    if (!showBar) {
      setSwitchAppearance(false);
    }
  }, [showBar]);

  return (
    <div className="hidden md:flex relative text-lightText dark:text-darkText">
      <button
        aria-label="show menu bar"
        onClick={() => setShowBar((prev) => !prev)}
        className="navList"
        ref={moreBtnRef}
      >
        <span className="text-[25px] p-0 md:p-2 lg:p-3">
          <HiBars3 />
        </span>
        <span className="hidden lg:inline-block">More</span>
      </button>
      {/* bar menu */}
      {showBar && (
        <div
          ref={barRef}
          className="absolute -right-[16.7rem] bottom-0 lg:left-0 lg:bottom-[3.7rem] p-2 text-sm rounded-2xl w-[266px] shadow-xl bg-white dark:bg-grayIg"
        >
          {switchApperance ? (
            <>
              <div className="flex items-center pr-2 justify-between border border-transparent border-b-gray-300 dark:border-b-white rounded-none text-lightText dark:text-darkText">
                <button
                  aria-label="hide switch appearance toggle"
                  onClick={() => setSwitchAppearance(false)}
                  className="px-3 py-4  dark:text-white/50 text-lg"
                >
                  <FiChevronLeft />
                </button>
                <span className="font-semibold flex-1 ">Switch Appearance</span>
                <span className="text-lg">
                  <TbMoon />
                </span>
              </div>
              <button
                aria-label="toggle mode"
                onClick={handleToggleMode}
                className="menuList justify-between p-3 mt-2"
              >
                <span>Dark mode</span>
                {/* toggle wrapper */}
                <div className="relative h-4 w-7">
                  <input
                    className="opacity-0"
                    type="checkbox"
                    role="switch"
                    aria-checked="true"
                  />
                  {/* bg */}
                  <span
                    aria-hidden="true"
                    className={`absolute w-full h-full bg-blue-400 left-0 rounded-lg pointer-events-none ${
                      mode === "dark" ? "bg-blue-400" : "bg-gray-300"
                    }`}
                  />
                  {/* toggle button */}
                  <span
                    aria-hidden="true"
                    className={`absolute w-3 h-3 bg-white rounded-full top-[2px] transition-all ${
                      mode === "dark"
                        ? "-translate-x-2"
                        : "-translate-x-[1.1rem]"
                    } `}
                  />
                </div>
              </button>
            </>
          ) : (
            <>
              <a href="#" className="menuList">
                <span className="text-2xl p-3">
                  <TbSettings />
                </span>
                <span>Settings</span>
              </a>
              <a href="#" className="menuList">
                <span className="text-2xl p-3">
                  <AiOutlineFieldTime />
                </span>
                <span>Your activity</span>
              </a>
              <a href="#" className="menuList">
                <span className="text-2xl p-3">
                  <BiTagAlt />
                </span>
                <span>Saved</span>
              </a>
              <button
                aria-label="show switch appearance toggle"
                className="menuList"
                onClick={() => setSwitchAppearance(true)}
              >
                <span className="text-2xl p-3">
                  <TbMoon />
                </span>
                <span>Switch appearance</span>
              </button>
              <a href="#" className="menuList">
                <span className="text-2xl p-3">
                  <TbMessageReport />
                </span>
                <span>Report a problem</span>
              </a>
              <div className="w-[calc(100%+16px)] my-2 h-2 bg-slate-500/20 -m-2" />
              <div className="menuList">
                <span className="p-4">Switch accounts</span>
              </div>
              <div className="w-[calc(100%+16px)] my-2 h-1 bg-slate-500/20 -m-2" />
              <div className="menuList">
                <span className="p-4">Log out</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MenuBar;
