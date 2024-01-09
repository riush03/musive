"use client";

import React,{ useState, useEffect } from 'react';
import usePlayer from '@/hooks/usePlayer';
import PlayerContent from './PlayerContent';
import useGetSongsById from '@/hooks/useGetSongById';
import { ISong } from "@/types/types";
import { useWeb5 } from '@/providers/Web5Provider';
import { MusiveProtocol } from '@/configs/musive.protocol';

const Player = () => {
    const {currentDid,web5,setProfile,profile,loading: songLoading,} = useWeb5();
    const [songs, setSongs] = useState<ISong[]>([]);
    const [songsLoading, setSongsLoading] = useState(true);
   
      
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
    const player = usePlayer();

    const filterSong = songs.filter(
      (song, index, self) =>
        self.findIndex((o) => o.uniqueId === song.uniqueId) === index
    )

    
    

    if ( !player.activeId) return null;

    return (
        <div className='fixed bottom-0 bg-black w-full py-2 h-[80px] px-4'>
          {filterSong.map((song) => (
            <PlayerContent song={song} songUrl={`"data:audio/mp3;base64," +  ${song.song}`} key={`"data:audio/mp3;base64," +  ${song.song}`} />
          ))}
        </div>
    )
}

export default Player;