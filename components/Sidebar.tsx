"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import useUploadModal from "@/hooks/useUploadModal";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import Button from "./Button";
import usePlayer from "@/hooks/usePlayer";
import { ISong } from "@/types/types";
interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({children}) => {
    const player = usePlayer();
    const pathname = usePathname();

    const routes = useMemo(() => [
    {
        icon: HiHome,
        label: 'Home', 
        active: pathname !== '/search',
        href : '/',
    },
    {
        icon: BiSearch,
        label: 'Search',
        active: pathname === '/search',
        href: '/search',
    }
    ], [pathname])

    const uploadModal = useUploadModal();

    const onClick = () => {
        
        return uploadModal.onOpen();
    };

    return (
        <div className={twMerge(`flex h-full`, player.activeId && "h-[calc(100%-80px)]")}>
            <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
            <Box>
                        <div className="flex flex-col gap-y-4 px-5 py-4">
                            {routes.map((item) => (
                                <SidebarItem key={item.label} {...item}/>
                            ))}
                        </div>
                    </Box>
                    <Box className="overflow-y-auto h-full">
                    <Button onClick={onClick} className="from-emerald-800 px-6 py-2" >
                                Create
                            </Button>
                    </Box>
                    <Box className="overflow-y-auto h-full">
                        <Library/>
                    </Box>
            </div>
                <main className="h-full flex-1 overflow-y-auto py-2">
                    {children}
                </main>
        </div>
    );
}

export default Sidebar