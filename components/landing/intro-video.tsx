"use client";

import FsLightbox from "fslightbox-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const videoUrl = "https://www.youtube.com/watch?v=_iHmNaQBtKk";

export function IntroVideo() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full video-popup flex h-12 gap-3 items-center text-sm border bg-white dark:bg-white/10 dark:border-white/[0.05] dark:text-white border-gray-100 p-1.5 pr-6"
      >
        <span className="size-9 rounded-full gradient-bg-two inline-flex items-center justify-center text-sm font-medium">
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.5 3.71077L3.5 12.3482C3.5 13.5211 4.78545 14.2402 5.78489 13.6265L12.8183 9.30776C13.7717 8.7223 13.7717 7.33672 12.8183 6.75125L5.7849 2.43251C4.78545 1.81882 3.5 2.53795 3.5 3.71077Z"
              fill="white"
            />
          </svg>
        </span>
        Watch Intro Video
      </button>

      {isMounted &&
        createPortal(
          <FsLightbox toggler={isOpen} sources={[videoUrl]} />,
          document.body,
        )}
    </>
  );
}
