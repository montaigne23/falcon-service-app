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
    const payload = this.wooHelper.includeEncoded(registerData);
    return this.httpClient.post(`api/user/register/`, payload)
      .pipe(catchError(err => this.wooHelper.handleError(err)));
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
      //this.token = response?.data.token
       this.cookieService.set('jwt', JSON.stringify(response?.data?.token)); // Stocke le token JWT dans un cookie nommé 'jwt'
      // this.sessionStorage.store('jwt', JSON.stringify(response?.data.token));
      //  this.sessionStorage.store('info_user', JSON.stringify(response?.data.user));
     // this.UserInfo =  response?.data.user
        this.cookieService.set('info_user', JSON.stringify(response.data));
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
