"use client";

import React, { createContext,ReactNode,useContext,useEffect,useState,} from "react";
import { useRouter } from "next/navigation";
import { type Web5 } from "@web5/api";
import { MusiveProtocol } from "@/configs/musive.protocol";
import { IProfile } from "@/types/types";

export interface AppContextData {
  currentDid: string | null;
  loading: boolean;
  setCurrentDid: (did: string | null) => void;
  web5: Web5 | null;
  setWeb5: (web5: Web5 | null) => void;
  profile: IProfile | null;
  setProfile: (profile: IProfile | null) => void;
}

export const Web5Context = createContext<AppContextData>({
  currentDid: null,
  loading: true,
  setCurrentDid: () => {},
  web5: null,
  setWeb5: () => {},
  profile: null,
  setProfile: () => {},
});



export const Web5ContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentDid, setCurrentDid] = useState<string | null>(null);
  const [web5, setWeb5] = useState<Web5 | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<null | IProfile>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      // @ts-ignore
      const { Web5 } = await import("@web5/api");
      const { web5, did } = await Web5.connect();
      setCurrentDid(did);
      setWeb5(web5);

      try {
        const { protocol, status: localStatus } =
          await web5.dwn.protocols.configure({
            message: {
              definition: MusiveProtocol,
            },
          });
          console.log("Protocol was successfully installled locally",localStatus.detail)
       
        if (protocol) {
          const { status: remoteStatus } = await protocol.send(did);
          console.log("Protocol was successfully installled locally",remoteStatus.detail)
        }
      } catch (error) {
        console.log(error);
      }

      if (web5 && did) {
        const { records: profiles } = await web5.dwn.records.query({
          message: {
            filter: {
              protocol: MusiveProtocol.protocol,
              protocolPath: "profile",
              author: did,
              schema: MusiveProtocol.types.profile.schema,
            },
          },
        });

        if (profiles?.length) {
          const profile: IProfile = {
            ...(await profiles[0].data.json()),
            recordId: profiles[0].id,
            contextId: profiles[0].contextId,
          };
          setProfile(profile);
        }
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Web5Context.Provider
      value={{
        currentDid,
        loading,
        setCurrentDid,
        web5,
        setWeb5,
        profile,
        setProfile,
      }}
    >
      {children}
    </Web5Context.Provider>
  );
};

export const useWeb5 = (): AppContextData => {
  const context = useContext(Web5Context);
  if (!context) {
    throw new Error("This must be used within a Web5ContextProvider");
  }
  return context;
};
