"use client"

import React,{useEffect,useState} from "react";
import SongItem from "./SongItem";
import useOnPlay from "@/hooks/useOnPlay";
import { ISong } from "@/types/types";
import { useWeb5 } from "@/providers/Web5Provider";
import { MusiveProtocol } from "@/configs/musive.protocol";



const PageConent = () => {


    const {currentDid,web5,setProfile,profile,loading: songLoading,} = useWeb5();
    const [songs, setSongs] = useState<ISong[]>([]);
    const [songsLoading, setSongsLoading] = useState(true);
    const onPlay = useOnPlay(songs);
      
  //   useEffect(() => {
  //     if (!profile) router.push("/login");
  //   }, [router, profile]);
  
  
      useEffect(() => {
        (async () => {
          if (web5) {
    
    
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
                        ...(await web5.dwn.records.read({message:{filter:{recordId: record.id,},},})),
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
      }, [web5]);
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
            {songs.map((item) => (
                <SongItem key={item.uniqueId} data={item}  onClick={(id: string) => {onPlay(id)}}/>
            ))}
        </div>
    )
}

export default PageConent;
