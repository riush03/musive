"use client"

import Image from "next/image";
import React, {useEffect ,useState} from 'react';
import { useWeb5 } from "@/providers/Web5Provider";
import { ISong } from "@/types/types";
import { MusicProtocol } from "@/configs/music.protocol";


interface MediaItemProps {
    data: ISong;
    onClick?: (id: string) => void;
}

const MediaItem:React.FC<MediaItemProps> = ({data, onClick}) => {
    const handleClick = () => {
        if (onClick) return onClick(data.recordId);

        //default turn on player
    }


    return (
        <div  onClick={handleClick} className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md">
        { data.image && (
               <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
                 <Image 
                    fill
                    src={"data:image/png;base64," +  data.image}
                    alt="library songs"
                    className="object-cover"
                />
               </div>
        )}
            <div className="flex flex-col gap-y-1 overflow-hidden">
                <p className="text-white truncate">
                     {data.title}
                </p>
                <p className="text-neutral-400 text-sm truncate">
                     {data.author}
                </p>
            </div>
        
        </div>
    )
}

export default MediaItem