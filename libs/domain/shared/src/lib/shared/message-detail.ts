import { IDto } from "./i-dto";
import { TypeMessageDetail } from "./type-message-detail";

export interface MessageDetail extends MessageCreateDto {
    id:string;
    slug:string;
    typemessages?:TypeMessageDetail;
    created_at: Date;
    updated_at: Date;

}

export interface MessageCreateDto {
    message:string;
    datefin: Date;
    typemessage_id:string;
}

export type Message = IDto<MessageDetail>;
