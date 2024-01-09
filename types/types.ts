export type IProfile = {
    name:string;
    recordId:String;
    contextId:string;
}

export type ISong = {
    recordId: string;
    title: string;
    author: string;
    song?: string;
    image?: string;
    uniqueId: string;
    authorId: string;
    dateCreated: string;
  };
