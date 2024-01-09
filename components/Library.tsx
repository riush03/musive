"use client";

import React, {useState,useEffect} from 'react'
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import useUploadModal from "@/hooks/useUploadModal";

import MediaItem from "./MediaItem"
import useOnPlay from '@/hooks/useOnPlay';
import { useWeb5 } from "@/providers/Web5Provider";
import { ISong ,IProfile} from "@/types/types";
import { MusicProtocol } from "@/configs/music.protocol";
import {MusiveProtocol} from "@/configs/musive.protocol"

interface LibraryProps {
    music: ISong[]
}

const Library = () => {
    //const[songs] = useMusicContext();


    const uploadModal = useUploadModal();

    const onClick = () => {
        
        return uploadModal.onOpen();
    };

    const {currentDid,web5,setProfile,profile,loading: songLoading,} = useWeb5();
    const [songs, setSongs] = useState<ISong[]>([]);
    const [songsLoading, setSongsLoading] = useState(true);
    const onPlay = useOnPlay(songs);
      
//   useEffect(() => {
//     if (!profile) router.push("/login");
//   }, [router, profile]);


      useEffect(() => {
        (async () => {
          if (web5 && currentDid) {
    
    
            const { records: publishedSongsRecords } = await web5.dwn.records.query({
              message: {
                filter: {
                  schema: MusiveProtocol.types.songs.schema,
                  protocol: MusiveProtocol.protocol,
                  protocolPath: "songs",
                },
              },
            });
    
            console.log({  });
    
            if (publishedSongsRecords )
            {
              const songs = (await Promise.all(
                [...publishedSongsRecords ].map(
                  (record) =>
                    new Promise<ISong>(async (resolve) =>
                      resolve({
                        ...(await record.data.json()),
                        recordId: record.id,
                        authorId: record.author,
                        dateCreated: record.dateCreated,
                      })
                    )
                )
              )) as ISong[];
    
              setSongs(
                songs
              );
            }
          }
        })();
      }, [web5, currentDid]);
     console.log(`Songs Data:${songs}`)


    return (  
        <div className="flex flex-col">
            <div className="flex items-center justify-between px-5 pt-4">
                <div className="inline-flex items-center gap-x-2">
                    <TbPlaylist size={26} className="text-neutral-400"/>
                    <p className="text-neutral-400 font-medium text-md">
                        Library
                    </p>
                </div>
                <AiOutlinePlus size={20} onClick={onClick} className="text-neutral-400 cursor-pointer hover:text-white transition"/>
            </div>
            <div className="flex flex-col gap-y-2 mt-4 px-3">
            {songs.map((item) => (
                    <MediaItem onClick={(id:string) => {onPlay(id)}} key={item.recordId} data={item}/>
                ))}
            </div>
        </div>
    );
}
 
export default Library;