import React, { useEffect, useState, useRef } from "react";
import { useGetReelPostQuery } from "../app/features/post/postApiSlice";
import { ReelCard } from "../components";

const getCardSize = () => {
  let currentInnerHeight = innerHeight;
  if (innerWidth <= 768) {
    currentInnerHeight = innerHeight - 46;
  }
  if (innerWidth <= 470) {
    currentInnerHeight = innerHeight - 67;
  }

  let height = (currentInnerHeight * 90) / 100;
  let width = (height * 67.25) / 100;
  let margin = (height * 1.5) / 100;

  if (innerWidth <= 470) {
    height = currentInnerHeight;
    width = innerWidth;
    margin = 0;
  }

  return { width, height, margin };
};

const Reels = () => {
  const [reelsLength, setReelsLength] = useState(0);
  const [reelMuted, setReelMuted] = useState(false);
  const [cardSize, setCardSize] = useState(() => {
    const { width, height, margin } = getCardSize();
    return { w: width, h: height, m: margin };
  });

  const { data, isLoading } = useGetReelPostQuery(1);

  const reels = data?.posts;

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
  }, [videoListRef, reelsLength]);

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

  return (
    <div
      className={`w-full h-[calc(100vh-67px)] md:h-screen overflow-y-scroll scroll-smooth snap-y snap-mandatory flex flex-col items-center scrollbar-hide`}
      style={{
        padding: `${cardSize.m}px 0`,
      }}
      ref={containerRef}
    >
      {/* reels card */}
      {reels?.map((reel, i) => (
        <ReelCard
          key={reel._id}
          reel={reel}
          i={i}
          cardSize={cardSize}
          handleSound={handleSound}
          reelMuted={reelMuted}
          handleLength={() => setReelsLength(reelsLength + 1)}
          ref={videoListRef}
        />
      ))}
    </div>
  );
};

export default Reels;
