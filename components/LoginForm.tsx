"use client"
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {ChangeEvent, useRef,useState,useEffect} from "react";
import { z } from 'zod';
import {useForm,SubmitHandler} from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast"
import { IProfile } from "@/types/types";
import { useWeb5 } from "@/providers/Web5Provider";
import { MusiveProtocol } from "@/configs/musive.protocol";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg","image/jpg","image/png","image/webp"]

export const loginFormSchema = z.object({
      name: z.string().min(2).max(50)
});

type LoginSchemaType =  z.infer<typeof loginFormSchema>;


type ILoginProps = {
  onSubmit: (values: z.infer<typeof loginFormSchema>) => Promise<void>;
  profile?: IProfile;
};


export  default function LoginForm(){
  const {register, handleSubmit,formState:{errors}} = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const { currentDid, web5, setProfile, profile } = useWeb5();
  const [selectedProfilePic, setSelectedProfilePic] = useState<File | null>(null);
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginSchemaType> = async(values:z.infer<typeof loginFormSchema>) => {
   

    if (web5) {
      const { record: profileRecord, status: createStatus } =
      await web5.dwn.records.create({
        data: {
          name:values.name,
        },
        message: {
          schema: MusiveProtocol.types.profile.schema,
          dataFormat: "application/json",
          protocol: MusiveProtocol.protocol,
          protocolPath: "profile",
        },
      });
    setProfile({
      ...(await profileRecord?.data.json()),
      recordId: profileRecord?.id,
      contextId: profileRecord?.contextId,
    });
    console.log("Profile data:",profileRecord);
    toast.success("Login successfully");

    router.push("/home");
    }
  
  }




  // useEffect(() => {
  //   if profile() {
  //     form.setValue("name", profile.name);
  //     form.setValue("image",profile.picture)
  //   }
  // }, [profile, form]);


  return (
   
          <div
            className="select-none px-20 mobile:pt-8 mobile:pb-10 pt-14 pb-16 mini-laptop:px-10 tablet:px-10 mobile:px-6 
          flex flex-col items-center bg-black rounded-xl"
          >
            <div className="flex flex-row items-center">
              <Image
                priority
                src={'/logo.jpeg'}
                width={40}
                height={40}
                alt="logo"
              />
              <h1
                className="text-center uppercase mx-2 
              tracking-wider font-ProximaBold"
              >
                Musive
              </h1>
            </div>

            <h1 className="mobile:text-xl text-3xl w-80 mobile:w-64 mobile:text-center mt-10 font-extrabold font-ProximaBold">
            Stream and  listen free music lifetime.
            </h1>
             {/** display error message here */}

             <form onSubmit={handleSubmit(onSubmit)} >
            

              <div className="flex flex-col mt-8 mb-4">
                <label
                  htmlFor="username"
                  className="font-ProximaRegular uppercase
                   text-gray-300 px-2 my-1 text-xs"
                >
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  autoComplete="off"
                  className="bg-[#3B3B3B] p-2 rounded-3xl 
                  border-none text-white outline-none 
                  px-4 py-2 mt-1  w-80 mobile:w-64"
                  {...register("name")}
                />
              </div>
             

              <button
                className="w-full mt-10  p-2 rounded-3xl bg-[#2bb540] font-ProximaBold
                uppercase hover:bg-[#289e39] disabled:hover:bg-opacity-20 disabled:bg-opacity-20 disabled:text-gray-300"
                type="submit" >
               
                  <div>create</div>
                
              </button>
             </form>
          </div>

       
  );
};

