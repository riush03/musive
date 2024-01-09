"use client"
import React from "react";
import CustomImage from "@/components/CustomImage";
import ListItem from "./ListItem";
import HorizontalTracksList from "@/components/HorizontalTracksList";
import { shadeColor } from "@/configs/util";
import { useState } from "react";
import BackButton from "@/components/BackButton";

function ArtistProfile() {
    const [srcollPosition, setScrollPosition] = useState(0);
    const [isScrolling, setScrolling] = useState(false);
    const onScroll = (e: any) => {
        setScrolling(true);
        setScrollPosition(e.target.scrollTop);
      };
      setTimeout(() => {
        setScrolling(false);
      }, 100);
  
  return (
    <>
      <div>
        <BackButton condition={srcollPosition >= 300} />
      </div>

      <div
        className="relative w-full h-[400px]  mobile:h-[350px]"
      >
        <div className="flex flex-col justify-end absolute w-full h-full bg-black bg-opacity-40 z-10">
          <div
            className="px-10 pb-10 mobile:pb-6 tablet:pb-6 mobile:px-4 
                      tablet:px-6 mini-laptop:px-7"
          >
            <div className="flex">
              <i className="icon-verified mr-2 text-blue-300"></i>
              <p>@shus</p>
            </div>
            <h1
              className="text-[70px] font-ProximaBold laptop:text-[60px] 
            mini-laptop:text-[60px] tablet:text-[45px] mobile:text-[40px]"
            >
              Shusho
            </h1>
            <p>200 monthly downloads</p>
          </div>
        </div>

        <CustomImage />
      </div>
      <div
      >
        <div
          className="h-full bg-gradient-to-t from-[#121212]
                 via-[#121212f0] to-[#12121298] w-full transition-colors
                  px-8 pt-6 mini-laptop:px-6 tablet:px-6 mobile:px-5"
        >
          <div className="pt-6">
            <div className="w-full flex justify-between">
              <h1 className="text-2xl font-ProximaBold">Popular</h1>
              <div
                
                className="bg-[#2bb540] rounded-full cursor-pointer hover:scale-110
                     w-[45px] h-[45px] flex justify-center items-center"
              >
               
                  <i className="icon-play text-[20px] ml-1 text-black" />
                
              </div>
            </div>

            <div className="max-w-[700px] pt-4">
          
                <ListItem
                  isScrolling={isScrolling}
                  showNumber={1 + 1}
                />
            </div>
          </div>
          <div className="pt-6">
            <h1 className="text-2xl font-ProximaBold pb-6">Older Releases</h1>
          </div>
        </div>
        <HorizontalTracksList  />
        <div className="pt-6 px-8 tablet:px-6 mobile:px-5">
          <h1 className="text-2xl font-ProximaBold">All</h1>
          <div className="pt-4">
              <ListItem
                isScrolling={isScrolling}
                showNumber={1 + 1}
              />
          </div>
        </div>
      </div>
      <div className="pb-32"></div>
    </>
  );
}

function getRndInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



export default ArtistProfile;
