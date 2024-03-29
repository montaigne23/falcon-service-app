import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WoocommerceHelperService } from '../helper.service';
import { AppInterceptor } from 'src/app/appIntercetor';
import { environment } from 'src/environments/environment';
import { Order, RetrieveOrdersResponse } from './orders.interface';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../account.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private httpClient: HttpClient,
    private wooHelper: WoocommerceHelperService,
    private appInterceptor: AppInterceptor,
    private AuthService: AuthService
  ) {
  }

  httpOptionslogin = {

    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ this.AuthService.getToken()}` // Ajouter le token d'authentification à l'en-tête
    })
  };

  createOrder(order: Order): Observable<Order> {
    const requestUrl = `${environment.origin}${environment.wcEndpoint}/orders${this.appInterceptor.includeWooAuth("orders")}`;

    return this.httpClient.post<Order>(requestUrl, order,{ observe: 'response' })
      .pipe(map(value => this.wooHelper.includeResponseHeader(value, 'orders')),
      catchError(err => this.wooHelper.handleError(err)));
  }

  retriveOrder(id: string): Observable<Order> {
    return this.httpClient.get<Order>(`orders/${id}`)
      .pipe(map(value => this.wooHelper.includeResponseHeader(value, 'orders')),
      catchError(err => this.wooHelper.handleError(err)));
  }

  listAllOrder(): Observable<RetrieveOrdersResponse[]> {
    const requestUrl = `${environment.origin}${environment.wcEndpoint}/orders${this.appInterceptor.includeWooAuth("orders")}`;

    return this.httpClient.get<RetrieveOrdersResponse[]>(requestUrl, { observe: 'response' })
      .pipe(map(value => this.wooHelper.includeResponseHeader(value, 'orders')),
      catchError(err => this.wooHelper.handleError(err)));
  }

  updateOrder(order: Order): Observable<Order> {
    return this.httpClient.put<Order>(`orders/${order.id}`, order)
      .pipe(catchError(err => this.wooHelper.handleError(err)));
  }

  deleteOrder(id: string): Observable<Order> {
    return this.httpClient.delete<Order>(`orders/${id}`)
      .pipe(catchError(err => this.wooHelper.handleError(err)));
  }


}
