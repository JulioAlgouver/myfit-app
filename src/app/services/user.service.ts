import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IUser } from "../interface/user.interface";

@Injectable({
    providedIn:'root'
})
export class UserService{
    private _apiUrl = 'http:localhost:3000';

    constructor(private httpClient:HttpClient){

    }

    cadastrarUsuario(usuario:IUser){
        return this.httpClient.post(`${this._apiUrl}/usuarios`,usuario);
    }

    loginUsuario(usuario:IUser){
        return this.httpClient.post(`${this._apiUrl}/login`,usuario);
    }
}