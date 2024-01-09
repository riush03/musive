"use client"

import React,{useState} from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import LoginForm, { loginFormSchema } from '@/components/LoginForm';

type LoginSchemaType =  z.infer<typeof loginFormSchema>;

const page = () => {
 
  return (
    <div className="font-ProximaRegular text-white bg-[#000000]">
       <div
          className="bg-[url('https://images.unsplash.com/photo-1596300919357-77dbd158c7b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80')] 
          h-screen w-screen bg-no-repeat bg-cover"
         >
            <div
               className="h-screen w-screen bg-gradient-to-t
                from-black to-[#00000086] flex
                justify-center items-center"
                >
                    <LoginForm />
            </div>
        </div>
    </div>
  )
}

export default page