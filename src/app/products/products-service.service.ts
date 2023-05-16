import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { UpdateProduct } from './product-store/products.actions';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>('https://hardware-backend-production.up.railway.app/v1/api/all-products')
  }

  deleteProduct(id:string){
    return this.http.delete(`https://hardware-backend-production.up.railway.app/api/v1/delete-product/${id}`)
  }

  UpdateProduct(product:Product){
    return this.http.put('https://hardware-backend-production.up.railway.app/v1/api/update-product', product)
  }
}
