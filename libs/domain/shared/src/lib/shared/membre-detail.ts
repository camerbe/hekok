import { ArticleDetail } from "./article-detail";
import { IDto } from "./i-dto";
//import { StatResponse } from "./membre-detail";

export interface MembreDetail extends MembreCreateDto {
    id:string;
}

export interface MembreCreateDto {
    nom:string;
    prenom:string;
    email:string;
    datefinstage:Date|null;
    tel:string;
    statut:string;
    dateinscription:Date|null;
    civilite:string;
}

export interface StatData {
  actifs: number;
  histoire: number;
}

export type Membre = IDto<MembreDetail>;
export type StatResponse = IDto<StatData>;
export type HomeState = {
  communautes: ArticleDetail[];
  membre: StatResponse; // Replace with actual type
};
