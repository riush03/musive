"use client"

import { useEffect, useRef, useState } from "react";
import LikeBtn from "@/components/LikeBtn";
import CustomImage from "@/components/CustomImage";
import { toast } from "react-toastify";

function ListItem({
  showNumber,
  isScrolling,
}: any) {

  const dropdown = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const getTime = (time: any) =>
    `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;

  useEffect(() => {
    if (!showDropdown) return;
    function handleClick(event: any) {
      // @ts-ignore-comment
      if (dropdown.current && !dropdown.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [showDropdown]);

  useEffect(() => {
    if (isScrolling) setShowDropdown(false);
  }, [isScrolling]);

  return (
    <div
      className="relative"
    >
      <div
        className={`cursor-default hover:bg-[#5f5d5d60] flex flex-row justify-between 
              items-center py-2 w-full rounded-md group mobile:hover:bg-transparent tablet:hover:bg-transparent 
             `}
      >
        <div className="flex-grow flex flex-row items-center">
          {showNumber && (
            <p className="mx-2 ml-4 mobile:ml-0 tablet:ml-0 text-slate-300">
              {showNumber}
            </p>
          )}
          <div>
            <div
              className="relative w-12 h-12 min-w-12 mx-2 mobile:w-10 mobile:h-10"
            >
              <CustomImage
                className="w-12 min-w-12"
              />
            </div>
          </div>

          <div className="">
            <p
              className={`mobile:text-sm line-clamp-1 `}
            >Nyavu</p>
            <p className="text-sm mobile:text-xs text-gray-300">
              Shusho
            </p>
          </div>
        </div>
        <div className="ml-2 flex flex-row items-center">
          <div className="group-hover:visible invisible mobile:visible tablet:visible ">
            <LikeBtn/>
          </div>

          <p className="text-gray-300 text-sm w-[25px] text-right ml-3 mobile:hidden">
            3 min
          </p>
          <div
          >
            <i
              className="cursor-pointer group-hover:visible invisible mobile:visible relative
         tablet:visible icon-more-horizontal text-[20px] ml-3 text-gray-200 mr-2.5"
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListItem;
