import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authSubject = new BehaviorSubject(false);
  private token: string;

  constructor(private router: Router) { }

  login(email: string, password: string) {
    signInWithEmailAndPassword(getAuth(), email, password).then(
      response => {
        getAuth().currentUser?.getIdToken().then(
          token => {
            this.token = token;
            console.log("Logeado");
            console.log("Token: " + this.token);
            //this.router.navigate([""]);
          }
        )
      }
    )
  }

  logout(): void {
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
    window. location. reload();
  }

  authenticated(){
    return this.token != null;
  }

  /*
  private saveToken(token: string, expiresIn: string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN")!;
    }
    return this.token;
  }
  */
}