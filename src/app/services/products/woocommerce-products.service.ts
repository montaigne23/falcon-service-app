import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {
  Product,
  ProductQuery,
  RetrieveProductsResponse,
  ProductReviewsResponse,
  ProductReview,
  // ProductCountQuery
 } from './product.interface';
import { WoocommerceHelperService } from '../helper.service';
import { AppInterceptor } from 'src/app/appIntercetor';
import { environment } from 'src/environments/environment';

@Injectable()
export class WoocommerceProductsService {

  constructor(
    private httpClient: HttpClient,
    private wooHelper: WoocommerceHelperService,
    private appInterceptor:AppInterceptor
  ) { }

  /**
   * Create a Product
   * @param payload: Product
   */
  createProduct(payload: Product): Observable<Product> {

    return this.httpClient.post<Product>(`products`, payload)
      .pipe(catchError(err => this.wooHelper.handleError(err)));
  }

  /**
   * Retrieve a product
   */
  retrieveProduct(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`products/${id}`)
      .pipe(catchError(err => this.wooHelper.handleError(err)));
  }

  /**
   * Retrieve list of product
   */
  retrieveProducts(query?: ProductQuery): Observable<RetrieveProductsResponse> {
    const requestUrl = `${environment.origin}${environment.wcEndpoint}/products${this.appInterceptor.includeWooAuth("products")}`;

    return this.httpClient.get(requestUrl, {params: this.wooHelper.includeQuery(query), observe: 'response'})
      .pipe(
        map(value => this.wooHelper.includeResponseHeader(value, 'products')),
        catchError(err => this.wooHelper.handleError(err)));
  }

  /**
   * Update Product
   */
  updateProduct(id: number, payload: Product): Observable<Product> {
    return this.httpClient.put<Product>(`products/${id}`, payload)
    .pipe(catchError(err => this.wooHelper.handleError(err)));
  }

  /**
   * Update Product
   */
  deleteProduct(id: number): Observable<Product> {
    return this.httpClient.delete<Product>(`products/${id}`)
    .pipe(catchError(err => this.wooHelper.handleError(err)));
  }

  /**
   * Retrieve product reviews by product id
   */
  retrieveProductReviews(product_id: string): Observable<ProductReviewsResponse> {
    return this.httpClient.get<ProductReviewsResponse>(`products/${product_id}/reviews`)
    .pipe(catchError(err => this.wooHelper.handleError(err)));
  }

  /**
   * Retrieve product reviews by product id
   */
  retrieveProductReview(product_id: number, review_id: number): Observable<ProductReview> {
    return this.httpClient.get<ProductReview>(`products/${product_id}/reviews/${review_id}`)
    .pipe(catchError(err => this.wooHelper.handleError(err)));
  }
}
