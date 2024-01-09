"use client";

import { useState, useEffect } from "react";
import UploadModal from "@/components/uploadModal"

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) return null;

    return (
        <>
            <UploadModal />
        </>
    );
}
 
export default ModalProvider;