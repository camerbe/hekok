import { IDto } from "./i-dto";

export interface TypeArticleDetail {
    id:string;
    typearticle:string;
    slug:string;
    created_at: Date;
    updated_at: Date;
}

export type TypeArticle = IDto<TypeArticleDetail>;