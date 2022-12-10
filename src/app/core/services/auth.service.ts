import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";

import {environment} from "../../../environments/environment";
import {Auth, AuthResponse} from "../interfaces/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuthUrl?: string;
  apikey?: string;


  get isAuth(): boolean {
    return !!localStorage.getItem('token');
  }

  get email(): string {
    return localStorage.getItem('email') || '';
  }

  constructor(
    private http: HttpClient
  ) {
    this.firebaseAuthUrl = environment.firebaseAuthUrl;
    this.apikey = environment.apiKey;
  }


  signUp(params: Auth): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.firebaseAuthUrl}signUp?key=${this.apikey}`, params)
      .pipe(
        tap((authResponse: AuthResponse) => {
          this.setAuth(authResponse)
        })
      )
  }

  signIn(params: Auth): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.firebaseAuthUrl}signInWithPassword?key=${this.apikey}`, params)
      .pipe(
        tap((authResponse: AuthResponse) => {
          this.setAuth(authResponse)
        })
      )
  }

  setAuth(authResponse: AuthResponse): void {
    localStorage.setItem('token', authResponse.idToken);
    localStorage.setItem('refreshToken', authResponse.refreshToken);
    localStorage.setItem('email', authResponse.email);
  }

  logout(): void {
    localStorage.clear();
  }

}
