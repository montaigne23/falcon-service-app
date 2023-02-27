import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders } from '@angular/common/http';
import { SessionStorageService } from 'ngx-webstorage';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authUrl = 'http://54.146.234.237:1337/admin/'; // L'URL de votre endpoint Strapi pour l'authentification et la création de compte
  private token: string;
  private UserInfo: any;
  private ACCESS_TOKEN_CREATE_USER = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc3MjA0MjIyLCJleHAiOjE2Nzk3OTYyMjJ9._rVx0994VSz9Rrds6n0rIjWFZTDc1vE6Bb6hiWfaBiQ"

public _info_user:any= {
  status:0,
    id:null,
    email:"ok",
    firstname:"ok",
    lastname:"ok",
    registerToken:""
  }

  httpOptionslogin = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
 httpOptionscreateuser = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' + this.ACCESS_TOKEN_CREATE_USER
    })
  };
  constructor(
    private http: HttpClient,
     private cookieService: CookieService,
     private sessionStorage: SessionStorageService,
     private toastr: ToastrService,
     private router : Router,
     ) {}

     // getproduct
     //auth d'un utilisateur et retourne ses information
  login(email: string, password: string) {
      const data = {
        email: email,
        password: password
      };
      console.log(data);
    
      return this.http.post<any>(`${this.authUrl}login`, data, this.httpOptionslogin).toPromise()
        .then(async response => {
          // this.token = JSON.stringify(response?.data);
        // console.log(response);
        this.token = response?.data.token
          this.cookieService.set('jwt', JSON.stringify(response?.data.token)); // Stocke le token JWT dans un cookie nommé 'jwt'
        // this.sessionStorage.store('jwt', JSON.stringify(response?.data.token));
        //  this.sessionStorage.store('info_user', JSON.stringify(response?.data.user));
        this.UserInfo =  response?.data.user
          this.cookieService.set('info_user', JSON.stringify(response?.data.user));
        // console.log(JSON.parse(this.sessionStorage.retrieve('info_user')));
          this.router.navigate(['/home']);
         await this.toastr.success('Vous êtes connecté', 'Succès', {
            positionClass: 'toast-bottom-center',
          })
          window.location.reload();
          return true
        },
        (error) => {
          this.toastr.error('Erreur de requête : ' + error.message, 'Erreur', {
            positionClass: 'toast-bottom-center',
          });
          return false
        }
        );
  }

  //récupère le token pour confirmer la création d'un compte
  //un compte sera crée mais sera inactif
  signup(email: string,firstname:string,lastname:string) {
    const data = {
      email:email,
      firstname:firstname,
      lastname:lastname,
      roles:[2]
    }
console.log(data);

    return this.http.post<any>(`${this.authUrl}users`, data, this.httpOptionscreateuser).toPromise()
      .then(response => {
        this.token = response;
        console.log(this.token);
        return response;
      });
  }

  getlinkaccessuser(registrationToken:string){
    return this.http.get(`${this.authUrl}registration-info?registrationToken=${registrationToken}`)
  }

  async logout() {
    this.token = "";
    await this.cookieService.delete('jwt'); // Supprime le cookie 'jwt'
    await this.cookieService.delete('info_user');
   await this.toastr.success('Vous êtes déconnecté','Succès',  {
      positionClass: 'toast-bottom-center',
    });
    window.location.reload();
  }

  //Confirme la création du compte en renvoi les information de l'utilisateur crée
  signupfinal(password: string,firstname:string,lastname:string,registrationToken:string) {
    const userInfo = {
      firstname:firstname,
      lastname:lastname,
      password:password,
    }
    const data = {
      userInfo:userInfo,
      registrationToken:registrationToken
    }
   console.log(data);

    return this.http.post<any>(`${this.authUrl}register`, data, this.httpOptionslogin).toPromise()
      .then(response => {
        this.token = response;
        console.log(this.token);
        return response;
      });
  }


  getToken(): string {
    if (!this.token) {
      this.token = this.cookieService.get('jwt'); // Récupère le token JWT depuis le cookie 'jwt'
    }
    return this.token;
  }
  getUUserInfo(){
    if (!this.UserInfo) {
      this.UserInfo = this.cookieService.get('info_user'); // Récupère le token JWT depuis le cookie 'jwt'
    }
    return this.UserInfo;
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}
