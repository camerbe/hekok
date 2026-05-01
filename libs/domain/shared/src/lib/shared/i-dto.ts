export interface IDto<T> {
    success: boolean;
    data: T;
    message?: string;
}

export interface IDtoUser<T> extends IDto<T> {
   token: string;
}