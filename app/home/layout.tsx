
import ModalProvider from '@/providers/ModalProvider';
import Sidebar from '@/components/Sidebar';
import ToasterProvider from '@/providers/ToasterProvider';
import Player from '@/components/Player';
import { Play } from 'next/font/google';

export const revalidate = 0;



export default async function RootLayout({
    children
}: {
    children: React.ReactNode
}) {


    return (
        <div>
             <ToasterProvider/>
                <ModalProvider/>
                      <Sidebar>
                         {children}
                      </Sidebar>
                <Player/>
        </div>
    )
}