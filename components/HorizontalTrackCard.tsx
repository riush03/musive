import React from "react";
import CustomImage from "./CustomImage";
import { useState } from "react";


function HorizontalTrackCard() {


  return (
    <div
      className="mr-4 cursor-grab"
    >
      <div
        className="p-4 bg-gradient-to-t from-[#2c2a2a4a] to-[#2c2a2ac7] hover:bg-[#4340409d]
           tablet:hover:bg-transparent mobile:hover:bg-transparent
           rounded-md h-full mini-laptop:p-3 tablet:p-0 tablet:from-transparent tablet:to-transparent
           mobile:from-transparent mobile:to-transparent mobile:p-0
           "
      >
        <div
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
          }}
          className="w-[160px] h-[160px] relative rounded-md 
          mini-laptop:w-[140px] mini-laptop:h-[140px] 
          tablet:w-[130px] tablet:h-[130px] mobile:w-[100px] mobile:h-[100px]"
        >
          <CustomImage/>
        </div>
        <p className="line-clamp-2 mt-3 text-base mobile:text-sm tablet:text-sm">
          Nyavu
        </p>
        <p
          className="line-clamp-2 mt-0.5 text-sm text-gray-400 
            font-ProximaRegular mobile:text-xs tablet:text-xs"
        >
          Shusho
        </p>
      </div>
    </div>
  );
}

export default HorizontalTrackCard;
