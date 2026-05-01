import { IDto } from "./i-dto";

export interface PaysDetail {
    id:string;
    pays:string;
    country:string;
    code3:string;
    created_at: Date;
    updated_at: Date;
}

export type Pays = IDto<PaysDetail>;
