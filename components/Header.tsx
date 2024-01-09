"use client"

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi"; 
import { BiSearch } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { resetIndexedDb } from "@/lib/helpers";
import Button from "./Button";


interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

const Header: React.FC<HeaderProps> = ({children, className}) => {
    const router = useRouter(); 

   

    return (
        <div className={twMerge(`h-fit bg-gradient-to-b from-emerald-800 p-6`, className)}>
            <div className="w-full mb-4 flex items-center justify-between">
                <div className="hidden md:flex gap-x-2 items-center">
                    <button className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition">
                        <RxCaretLeft size={35} className="text-white" onClick={() => router.back()}/>
                    </button>
                    <button className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition">
                        <RxCaretRight size={35} className="text-white" onClick={() => router.forward()}/>
                    </button>
                </div>

                <div className="flex md:hidden gap-x-2 items-center">
                    <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
                        <HiHome className="text-black" size={20}/>
                    </button>
                    <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
                        <BiSearch className="text-black" size={20}/>
                    </button>
                </div>
                <div className="flex justify-between items-center gap-x-4">
                    
                        <div className="flex gap-x-4 items-center">
                            <Button className="bg-white px-6 py-2" onClick={resetIndexedDb}>
                                Logout
                            </Button>
                            <Button className="bg-white" onClick={() => router.push('/')}>
                                <FaUserAlt />
                            </Button>
                        </div>
                </div>
            </div>
            {children}
        </div>
    );
}
 
export default Header;