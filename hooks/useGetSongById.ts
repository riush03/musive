import { useState, useEffect, useMemo, use } from 'react';
import { toast } from 'react-hot-toast';
import { ISong } from "@/types/types";
import { useWeb5 } from '@/providers/Web5Provider';
import { MusiveProtocol } from '@/configs/musive.protocol';

const useLoadSongUrl = async(song: ISong) => {
    const {currentDid,web5,setProfile,profile,loading: songLoading,} = useWeb5();


}

export default useLoadSongUrl;