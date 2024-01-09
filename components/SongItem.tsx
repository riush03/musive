"use client"

import React, {useContext} from "react";
import Image from "next/image"
import useDwnImage from "@/hooks/useImage";

import PlayButton from "./PlayButton";
import Link from "next/link";
import { ISong } from "@/types/types";

 interface SongItemProps {
     data: ISong;
     onClick: (id: string) => void
}

const SongItem:React.FC<SongItemProps> = ({data, onClick}) => {
    

    return (
        <div onClick={() => onClick(data.uniqueId)} className="relative group flex flex-col items-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3">
            <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
                <Image  
                    className="object-cover" 
                    src={"data:image/png;base64," +  data.image}
                    fill
                    alt="Song Cover"
                />
            </div>
            <div className="flex flex-col items-start w-full pt-4 gap-y-1">
                <p className="font-semibold truncate w-full">
                      {data.title}
                </p>
                <p className="text-neutral-400 text-sm pb-4 w-full truncate">
                      {data.author}
                </p>
            </div>
            <div className="absolute bottom-24 right-5">
                <PlayButton />
            </div>
              <audio src={"data:audio/mp3;base64," +  data.song}  className="relative aspect-square w-full h-full rounded-md overflow-hidden" controls />
        </div>
    )
}

export default SongItem;