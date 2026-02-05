import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    private readonly httpClient = inject(HttpClient);

    login(cpf:string, senha:string): Observable<{token:string}>{
        return this.httpClient.post<{token:string}>('http://localhost:3000/login', {cpf, senha})
        .pipe(map(response => {
            localStorage.setItem('access-token', response.token);

            return response;
        }))
    }

    verifyToken(): Observable<{valid:boolean, user: string}>{
        const headers = new HttpHeaders().set('Authorization','Bearer ' + localStorage.getItem('access-token'));
 
        return this.httpClient.get<{valid:boolean, user: string}>('http://localhost:3000/verify-token', { headers })
    }
}