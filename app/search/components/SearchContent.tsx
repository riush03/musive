"use client";

import React,{useState,useEffect} from "react";
import MediaItem from "@/components/MediaItem";
import { ISong } from "@/types/types";
import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";
import { useWeb5 } from "@/providers/Web5Provider";
import { MusicProtocol } from "@/configs/music.protocol";
import { MusiveProtocol } from "@/configs/musive.protocol";

interface SearchContentProps {
    songs: ISong[];
}

const SearchContent  = () => {
   
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

    if (songs.length === 0) {
        return (
            <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
                No songs found!
            </div>
        )
    }

    return ( 
        <div className="flex flex-col gap-y-2 w-full px-6">
            {songs.map((song) => (
                <div key={song.recordId} className="flex items-center gap-x-4 w-full">
                    <div className="flex-1">
                        <MediaItem onClick={(id: string) => {onPlay(id)}} data={song}/>
                    </div>
                    <LikeButton  />
                </div>
            ))}
        </div>
    );
}
 
export default SearchContent;