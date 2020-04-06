import * as jwt_decode from 'jwt-decode';

export class Token {
    private _token: string;


    public get token(): string {
        return this._token;
    }

}