import { on } from "events";
import usePlayer from "./usePlayer";
import { ISong } from "@/types/types";


const useOnPlay = (songs: ISong[]) => {
    const player = usePlayer();

    const onPlay = (id: string) => {
        player.setId(id);
        player.setIds(songs.map((song) => song.recordId));
    }

    return onPlay;
}

export default useOnPlay;