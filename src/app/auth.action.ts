import { Action } from '@ngrx/store';


export const SET_AUTHENTICATED = '[auth]: Authenticated';
export const SET_UNAUTHENTICATED = '[auth]: Unauthenticated';

export class Authenticated implements Action {
    readonly type = SET_AUTHENTICATED;
}
export class Unauthenticated implements Action {
    readonly type = SET_UNAUTHENTICATED;
}


export type AuthAction = Authenticated | Unauthenticated;
