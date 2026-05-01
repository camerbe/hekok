import { IDto } from "./i-dto";

export interface VideoDetail {
    id:string;
    titre:string;
    video:string;
    datecreation: Date;
    
}

export type Video = IDto<VideoDetail>;
