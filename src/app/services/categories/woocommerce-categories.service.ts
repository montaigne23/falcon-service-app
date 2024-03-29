import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {
  ProductCategory,
  CategoryQuery
} from './product-categories.interface';
import { WoocommerceHelperService } from '../helper.service';
import { environment } from 'src/environments/environment';
import { AppInterceptor } from 'src/app/appIntercetor';

@Injectable()
export class WoocommerceCategoriesService {

  constructor(
    private httpClient: HttpClient,
    private wooHelper: WoocommerceHelperService,
    private appInterceptor: AppInterceptor
  ) { }

  /**
   * Create a Category
   * @param payload: Product
   */
  createCategory(category: ProductCategory): Observable<ProductCategory> {
    return this.httpClient.post<ProductCategory>(`products/categories`, category)
      .pipe(catchError(err => this.wooHelper.handleError(err)));
  }

  /**
   * Retrieve a Category
   */
  retrieveCategory(id: number): Observable<ProductCategory> {
    return this.httpClient.get<ProductCategory>(`products/categories/${id}`)
      .pipe(catchError(err => this.wooHelper.handleError(err)));
  }

  /**
   * Retrieve list of Category
   */
  retrieveCategories(query?: CategoryQuery): Observable<ProductCategory[]> {
    const requestUrl = `${environment.origin}${environment.wcEndpoint}/products/categories${this.appInterceptor.includeWooAuth("products/categories")}`;

    return this.httpClient.get(requestUrl,
      {
        params: this.wooHelper.includeQuery(query)
      })
      .pipe(
        catchError(err => this.wooHelper.handleError(err)),
        map((response: any) => response));
  }

  /**
   * Update Category
   */
  updateCategory(id: number, payload: ProductCategory): Observable<ProductCategory> {
    return this.httpClient.put<ProductCategory>(`products/categories/${id}`, payload)
      .pipe(catchError(err => this.wooHelper.handleError(err)));
  }

  /**
   * Delete Category
   */
  deleteCategory(id: number): Observable<ProductCategory> {
    return this.httpClient.delete<ProductCategory>(`products/categories/${id}`)
      .pipe(catchError(err => this.wooHelper.handleError(err)));
  }
}
