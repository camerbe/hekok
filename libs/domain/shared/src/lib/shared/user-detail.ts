import { IDtoUser } from "./i-dto";

export interface UserDetail {
    id:string;
    nom:string;
    prenom:string;
    fullName:string;
    email:string;
    role:string;
    email_verified_at: Date;
    two_factor_secret: string;
    two_factor_recovery_codes: string;
    two_factor_confirmed_at: Date;
    created_at: Date;
    updated_at: Date;
}

export interface UserCreateDto {
    id:string;
    nom:string;
    prenom:string;
    role:string;
    email:string;
    password:string;
    password_confirmation:string;
    
}

export interface UserApiResponse {
    token: string;
    success: boolean;
    user: UserDetail;
    message?: string;
} 

export type UserListResponse = IDtoUser<UserDetail[]>;
export type User = IDtoUser<UserDetail>;