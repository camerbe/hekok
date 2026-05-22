import { IDto } from './i-dto';
import { PaysDetail } from './pays-detail';
import { TypeArticleDetail } from './type-article-detail';


export interface ArticleCreateDto {
    article: string;
    typearticle_id:string;
    pays_id:string;
    titre:string;
    datearticle: Date|null|string;
    auteur:string;
    source:string;
    image:string;
    keyword:string;
    
}
export interface ArticleDetail extends ArticleCreateDto {
    id:string;
    chapeau: string;
    slug: string;
    hit:number;
    countries: PaysDetail
    typearticles: TypeArticleDetail
}



export type Article = IDto<ArticleDetail>;