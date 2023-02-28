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
  private readonly _authUrl = 'http://54.146.234.237:1337/'; // L'URL de votre endpoint Strapi pour l'authentification et la création de compte
  private token: string;
  private UserInfo: any;
  private ACCESS_TOKEN_CREATE_USER = "1765521c6143eba5ca2583ef25058310015510f628686b34b2632fff3e6adcdf45749597b23dd6e4559210f3b7970a97115759e7aa4ed7c28d5295f8e4046d6981e9bd22a14ae0cdeab08ad04b33c7ec788aa5aee16d0599bc91af7843c577cf35d5a27110f913f7ccb2bafbdfec1ab2263436c6342a6fc7484437a308945d39"

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
  login(nom_utilisateur: string, password: string) {
      const data = {
        identifier: nom_utilisateur,
        password: password
      };
      console.log(data);
    
      return this.http.post<any>(`${this._authUrl}api/auth/local`, data, this.httpOptionslogin).toPromise()
        .then(async response => {
          // this.token = JSON.stringify(response?.data);
        console.log(response);
        //this.token = response?.data.token
         this.cookieService.set('jwt', JSON.stringify(response?.jwt)); // Stocke le token JWT dans un cookie nommé 'jwt'
        // this.sessionStorage.store('jwt', JSON.stringify(response?.data.token));
        //  this.sessionStorage.store('info_user', JSON.stringify(response?.data.user));
       // this.UserInfo =  response?.data.user
          this.cookieService.set('info_user', JSON.stringify(response.user));
        // console.log(JSON.parse(this.sessionStorage.retrieve('info_user')));
          this.router.navigate(['/home']);
         await this.toastr.success('Vous êtes connecté', 'Succès', {
            positionClass: 'toast-bottom-center',
          })
          // window.location.reload();
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

  async logout() {
    this.token = "";
    await this.cookieService.delete('jwt'); // Supprime le cookie 'jwt'
    await this.cookieService.delete('info_user');
    await this.toastr.success('Vous êtes déconnecté avec succè','Succès',  {
      positionClass: 'toast-bottom-center',
    });
    window.location.reload();
  }

  //Confirme la création du compte en renvoi les information de l'utilisateur crée
  signupfinal(password: string,email:string,username:string) {
    const userInfo = {
      username:username,
      email:email,
      password:password,
      role: "2"
    }
    this.http.post<any>(`${this._authUrl}api/users`,userInfo, this.httpOptionscreateuser).toPromise()
      .then(async response => {
        this.token = response;
        console.log(this.token);
       // this.cookieService.set('info_user', JSON.stringify(response));
        this.router.navigate(['/account/login']);
        await this.toastr.success('Compte crée avec succè', 'Succès', {
          positionClass: 'toast-bottom-center',
        })
       // window.location.reload();
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
