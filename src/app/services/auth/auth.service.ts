import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

import { WoocommerceHelperService } from '../helper.service';
import { CreateNonce, CreateNonceRes, RegisterPayload, LoginPayload } from './auth.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppInterceptor } from 'src/app/appIntercetor';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

// Plugins used https://wordpress.org/plugins/json-api-user/

@Injectable()
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private wooHelper: WoocommerceHelperService,
    private appInterceptor:AppInterceptor,
    private cookieService: CookieService,
    private toastr: ToastrService,
    private router : Router,
  ) { }

  createNonce(payload: CreateNonce): Observable<CreateNonceRes> {
    return this.httpClient.get(`api/get_nonce/`, {params: this.wooHelper.includeQuery(payload)})
      .pipe(
        catchError(err => this.wooHelper.handleError(err)),
        map((response: any) => response)        );
  }

  register(registerData: RegisterPayload) {
    const requestUrl = `${environment.origin}${environment.wcEndpoint}/customers${this.appInterceptor.includeWooAuth("")}`;

    //const payload = this.wooHelper.includeEncoded(registerData);
    const formData = new FormData();
    formData.append('email', 'john.doe@example.com');
    formData.append('password', 'motdepasse123');
    formData.append('username', 'johndoe');
    formData.append('first_name', 'John');
    formData.append('last_name', 'Doe');
    formData.append('billing[address_1]', '123 Rue Principale');
    formData.append('billing[city]', 'Ville');
    formData.append('billing[state]', 'État');
    formData.append('billing[postcode]', '12345');
    formData.append('billing[country]', 'Pays');
    formData.append('shipping[address_1]', '456 Rue Secondaire');
    formData.append('shipping[city]', 'Autre Ville');
    formData.append('shipping[state]', 'Autre État');
    formData.append('shipping[postcode]', '67890');
    formData.append('shipping[country]', 'Autre Pays');
    return this.httpClient.post(requestUrl, formData).subscribe((e)=>{

      console.log(e);
    })
     // .pipe(catchError(err => this.wooHelper.handleError(err)));
  }

  retrivePassword(username: string) {
    const payload = this.wooHelper.includeEncoded({user_login: username});
    return this.httpClient.post(`api/user/retrieve_password/`, payload)
      .pipe(catchError(err => this.wooHelper.handleError(err)));
  }

  getAuthToken(payload: LoginPayload) {
    const requestUrl = `${environment.origin}/wp-json/jwt-auth/v1/token`;

    return this.httpClient.post(requestUrl, payload)
    .pipe(catchError(err => this.wooHelper.handleError(err)));
  }

  login(payload: LoginPayload) {
    const requestUrl = `${environment.origin}/wp-json/jwt-auth/v1/token`;
    const data = {
      identifier: payload.username,
      password: payload.password
    };
    return this.getAuthToken(payload).subscribe
      (async (response :any) => {
        // this.token = JSON.stringify(response?.data);
      console.log(response);
    const d = new Date();

      d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000)); // Set the expiration to one year from now
    const expires = "expires=" + d.toUTCString();
    document.cookie = "jwt" + "=" + JSON.stringify(response?.data?.token) + "; " + expires + "; path=/";
    document.cookie = "info_user" + "=" + JSON.stringify(response?.data) + "; " + expires + "; path=/";
      //this.token = response?.data.token
    //   this.cookieService.set('jwt', JSON.stringify(response.data)); // Stocke le token JWT dans un cookie nommé 'jwt'
    //   // this.sessionStorage.store('jwt', JSON.stringify(response?.data.token));
    //   //  this.sessionStorage.store('info_user', JSON.stringify(response?.data.user));
    //  // this.UserInfo =  response?.data.user
    //     this.cookieService.set('info_user', JSON.stringify(response.data));
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

  generateAuthCookie(data: LoginPayload) {
    const requestUrl = `${environment.origin}/api/user/generate_auth_cookie`;

    return this.httpClient.post(requestUrl, this.wooHelper.includeEncoded(data))
      .pipe(catchError(err => this.wooHelper.handleError(err)));
  }
}
