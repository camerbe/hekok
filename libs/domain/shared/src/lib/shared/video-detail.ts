import { IDto } from "./i-dto";

export interface VideoDetail {
    id:string;
    titre:string;
    video:string;
    source:string;
    social:string;
    datecreation: Date;
    
}

export interface VideoCreateDto {
    titre:string;
    video:string;
    
}

export type Video = IDto<VideoDetail>;
