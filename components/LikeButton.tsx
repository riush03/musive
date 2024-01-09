"use client"

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import toast from "react-hot-toast";


import { serialize } from "v8";

interface LikeButtonProps {
    songId: string;
}

const LikeButton = () => {
    const router = useRouter();
    

    const [isLiked, setIsLiked] = useState(false)


    const Icon = isLiked ? AiFillHeart : AiOutlineHeart;


    return (
        <button className="hover:opacity-75 transitiono" >
            <Icon color={isLiked ? '#22c55e' : 'white'} />
        </button>
    );
}
 
export default LikeButton;