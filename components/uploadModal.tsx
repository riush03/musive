import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import {ChangeEvent, useState ,useEffect,useRef} from "react";
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation";
import Modal from "./Modal"
import useUploadModal from "@/hooks/useUploadModal";
import Input from "./Input"
import Button from "./Button";
import uniqid from "uniqid";
import { v4 as uuidv4 } from "uuid";
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageError } from "next/dist/server/image-optimizer";
import { useWeb5 } from "@/providers/Web5Provider";
import { ISong } from "@/types/types";
import { MusiveProtocol } from "@/configs/musive.protocol";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg","image/jpg","image/png","image/webp"];
const ACCEPTED_AUDIO_TYPES = ["audio/mp3","audio/mp4"];

export const songFormSchema = z.object({
    title: z.string().min(2).max(50),
    author: z.string().min(2).max(50),
  });
  
  type SongSchemaType =  z.infer<typeof songFormSchema>;

  type ISongProps = {
    onSubmit: (values: z.infer<typeof songFormSchema>) => Promise<void>;
    song?: ISong;
  };

const UploadModal = () => {
    const {currentDid,web5,setProfile,profile} = useWeb5();
    const [isLoading, setIsLoading] = useState(false); 
    const uploadModal = useUploadModal();
    const [uploadError, setUploadError] = useState('');
    const artInputRef = useRef<HTMLInputElement>(null);
    const songInputRef = useRef<HTMLInputElement>(null);
    const [songs, setSongs] = useState<ISong[]>([]);
    const [selectedSong, setSelectedSong] = useState<File | null>(null);
    const [selectedSongImage, setSelectedSongImage] = useState<File | null>(null);
    const router = useRouter();

    const {register, handleSubmit,formState:{errors}} = useForm<z.infer<typeof songFormSchema>>({
        resolver: zodResolver(songFormSchema),
        defaultValues: {
          title:"",
          author:""
        },
      });

    const onChange = (open: boolean) => {
      if (!open) {
          uploadModal.onClose();
      }
  }

  const onSubmit: SubmitHandler<SongSchemaType> = async(values:z.infer<typeof songFormSchema>) => {
   
    let base64Image: undefined | string;
    let base64File: undefined | string;

    if (selectedSongImage) {
      const binaryImage = await selectedSongImage.arrayBuffer();
      base64Image = btoa(
        new Uint8Array(binaryImage).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
    }

    if (selectedSong) {
      const binaryImage = await selectedSong.arrayBuffer();
      base64File = btoa(
        new Uint8Array(binaryImage).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
    }

    if (web5) {
      const { record: songsRecord, status: createStatus } =
      await web5.dwn.records.create({
        data: {
          title:values.title,
          author:values.author,
          song:base64File,
          image:base64Image,
        },
        message: {
          schema: MusiveProtocol.types.songs.schema,
          dataFormat: "application/json",
          protocol: MusiveProtocol.protocol,
          protocolPath: "songs",
        },
      });
    setSongs({
      ...(await songsRecord?.data.json()),
      recordId: songsRecord?.id,
      authorId: songsRecord?.author,
      dateCreated: songsRecord?.dateCreated,
    });
    if (songs.length) {
      setSongs((prev) => [songs[0], ...prev]);
    }
    }
    setSelectedSong(null)
    setSelectedSongImage(null)
    router.refresh();
    toast.success("Song was created successfully");
    uploadModal.onClose();
  }

  



    return (
        <Modal title="Add a Song" description="Upload an mp3 file" isOpen={uploadModal.isOpen}  onChange={onChange}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
                <Input  disabled={isLoading} {...register("title", { required: true })}  placeholder="Song Title" />
                <Input  disabled={isLoading} {...register("author", { required: true })}  placeholder="Song Author" />
                <div>
                    <div className="pb-1">
                        Select a song file
                    </div>
                    <Input 
                      type="file"
                      accept=".mp3"
                      disabled={isLoading}
                       placeholder="Song Author"
                       onChange={(e) => {
                        if (e.target.files?.length) {
                          const imageSize = e.target.files[0].size;
                          if (imageSize > MAX_FILE_SIZE) {
                            toast.error("Yoor upload have exceeed 5MB");
                          } else {
                            setSelectedSong(e.target.files[0]);
                          }
                        }
                      }} />
                </div>
                <div>
                    <div className="pb-1">
                        Select an image
                    </div>
                    <Input
                      type="file" 
                      accept="image/*"
                      disabled={isLoading} 
                      placeholder="Song Author" 
                      onChange={(e) => {
                        if (e.target.files?.length) {
                          const imageSize = e.target.files[0].size;
                          if (imageSize > MAX_FILE_SIZE) {
                            toast.error("Yoor upload have exceeed 5MB");
                          } else {
                            setSelectedSongImage(e.target.files[0]);
                          }
                        }
                      }}/>
                </div>
                <Button disabled={isLoading} type="submit" >
                    Create
                </Button>
            </form>
        </Modal>
    );
}
 
export default UploadModal;
