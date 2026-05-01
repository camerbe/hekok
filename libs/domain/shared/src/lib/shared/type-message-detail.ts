import { IDto } from "./i-dto";

export interface TypeMessageDetail {
    id:string;
    typemessage:string;
    slug:string;
    created_at: Date;
    updated_at: Date;
}

export interface TypeMessageCreateDto {
  typemessage: string;
}

export type TypeMessage = IDto<TypeMessageDetail>;