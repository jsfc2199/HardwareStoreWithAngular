import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>('https://hardware-backend-production.up.railway.app/v1/api/all-products')
  }
}
