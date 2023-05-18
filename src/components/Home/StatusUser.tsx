import { LegacyRef, useEffect, useRef, useState } from "react";
import { IoChevronForwardCircle, IoChevronBackCircle } from "react-icons/io5";

const StatusUser = () => {
  const containerRef = useRef<HTMLDivElement>();
  const [showChevLeft, setShowChevLeft] = useState(false);
  const [showChevRight, setShowChevRight] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (
      container &&
      scrollLeft <= container.scrollWidth - container.clientWidth &&
      container.scrollWidth > container.clientWidth
    ) {
      setShowChevRight(true);
    } else {
      setShowChevRight(false);
    }

    if (scrollLeft > 0) {
      setShowChevLeft(true);
    } else {
      setShowChevLeft(false);
    }
  }, [scrollLeft]);

  const handleScroll = (direction: string) => {
    const container = containerRef.current;
    if (container && container.scrollLeft !== undefined) {
      if (direction === "left") {
        const result = (container.scrollLeft -= container.clientWidth * 0.5);
        setScrollLeft(result);
      } else {
        const result = (container.scrollLeft += container.clientWidth * 0.5);
        setScrollLeft(result);
      }
    }
  };

  console.log({ scrollLeft });

  return (
    <div className="relative flex items-center w-full h-[85px] mb-4">
      {showChevLeft && (
        <button
          aria-label="left button carousel status user"
          className="absolute left-0 text-2xl"
          onClick={() => handleScroll("left")}
        >
          <IoChevronBackCircle />
        </button>
      )}
      <div
        ref={containerRef as LegacyRef<HTMLDivElement>}
        className="w-full overflow-x-auto flex items-center gap-4 scrollbar-hide scroll-smooth"
      >
        {Array(18)
          .fill("")
          .map((key, idx) => (
            <div
              key={idx}
              className="w-fit flex-shrink-0 flex flex-col items-center gap-y-1"
            >
              <div className="w-16 h-16 border-2 border-white rounded-full flex justify-center items-center">
                <div className="w-[91%] h-[91%] rounded-full bg-gray-300"></div>
              </div>
              <p className="text-xs text-center">boom{idx}</p>
            </div>
          ))}
      </div>

      {showChevRight && (
        <button
          aria-label="right button carousel status user"
          className="absolute right-0 text-2xl"
          onClick={() => handleScroll("right")}
        >
          <IoChevronForwardCircle />
        </button>
      )}
    </div>
  );
};

export default StatusUser;
