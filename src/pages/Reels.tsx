import React, { useEffect, useState, useRef } from "react";
import {
  BsBookmark,
  BsChat,
  BsFillPlayFill,
  BsHeart,
  BsThreeDots,
} from "react-icons/bs";
import { IoPaperPlaneOutline } from "react-icons/io5";
import vidEx from "../dummyData/vid2.mp4";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";

const getCardSize = () => {
  let currentInnerHeight = innerHeight;
  if (innerWidth <= 768) {
    currentInnerHeight -= 46;
  }

  let height = (currentInnerHeight * 90) / 100;
  let width = (height * 67.25) / 100;
  let margin = (height * 1.5) / 100;

  if (innerWidth <= 375) {
    height = currentInnerHeight;
    width = innerWidth;
    margin = 0;
  }

  return { width, height, margin };
};

const Reels = () => {
  const [reelMuted, setReelMuted] = useState(false);
  const [reelPlay, setReelPlay] = useState(false);
  const [cardSize, setCardSize] = useState(() => {
    const { width, height, margin } = getCardSize();
    return { w: width, h: height, m: margin };
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const videoListRef = useRef<HTMLVideoElement[]>([]);

  const handleSound = () => {
    setReelMuted((prev) => !prev);
  };

  useEffect(() => {
    const container = containerRef.current;
    const elements = videoListRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const currentElement = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            // Do something with the current snap element
            currentElement.play();
          } else {
            currentElement.pause();
            currentElement.currentTime = 0;
          }
        });
      },
      {
        root: container,
        threshold: 0.6, // Adjust the threshold as needed
      }
    );

    elements?.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [videoListRef.current, containerRef.current]);

  useEffect(() => {
    addEventListener("resize", function () {
      const { width, height, margin } = getCardSize();
      setCardSize({ w: width, h: height, m: margin });
    });

    return () => {
      removeEventListener("resize", function () {
        const { width, height, margin } = getCardSize();
        setCardSize({ w: width, h: height, m: margin });
      });
    };
  }, []);

  console.log({ videoListRef: videoListRef.current.forEach((c) => c.paused) });

  return (
    <div
      className={`w-full h-[calc(100vh-67px)] md:h-screen overflow-y-scroll scroll-smooth snap-y snap-mandatory flex flex-col items-center`}
      style={{
        padding: `${cardSize.m}px 0`,
      }}
      ref={containerRef}
    >
      {/* reels card */}
      {Array(4)
        .fill("")
        .map((_, i) => (
          <div
            key={i}
            className="snap-center flex-shrink-0 flex"
            style={{
              width: cardSize.w + "px",
              height: cardSize.h + "px",
              margin: `${cardSize.m}px 0`,
            }}
          >
            {/* video */}
            <div className="relative w-full h-full flex-1 bg-black rounded-lg overflow-hidden">
              <video
                className="absolute w-full h-full object-cover cursor-pointer"
                autoPlay
                loop
                controls
                onPlay={() => setReelPlay(true)}
                onPause={() => setReelPlay(false)}
                muted={!reelMuted}
                ref={(el) => {
                  if (el && !videoListRef.current[i]) {
                    videoListRef.current?.push(el);
                  }
                }}
              >
                <source src={vidEx} type="video/mp4"></source>{" "}
              </video>
              {/* attributes */}
              {/* speaker */}
              <button
                className="absolute top-4 right-4 p-2 bg-black/30 rounded-full text-white text-sm"
                onClick={handleSound}
              >
                {reelMuted && <HiSpeakerWave />}
                {!reelMuted && <HiSpeakerXMark />}
              </button>
              {/* play */}
              {/* 
              {!reelPlay && (
                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 p-4 bg-black/30 rounded-full text-white text-4xl">
                  <BsFillPlayFill />
                </div>
              )} */}
            </div>
            {/* action */}
            <div className="basis-[17%] flex flex-col gap-7 items-center justify-end pb-1">
              <button className="flex flex-col gap-1 items-center font-semibold hover:opacity-60">
                <span className="text-xl">
                  <BsHeart />
                </span>
                <span className="text-xs">1.6M</span>
              </button>
              <button className="flex flex-col gap-1 items-center font-semibold hover:opacity-60">
                <span className="text-xl">
                  <BsChat />
                </span>
                <span className="text-xs">12.6K</span>
              </button>
              <button className="flex flex-col items-center text-2xl hover:opacity-60">
                <IoPaperPlaneOutline />
              </button>
              <button className="flex flex-col items-center text-xl hover:opacity-60">
                <BsBookmark />
              </button>
              <button className="flex flex-col items-center text-xl hover:opacity-60">
                <BsThreeDots />
              </button>
              <button className="bg-gray-500 rounded-lg w-8 h-8 "></button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Reels;
