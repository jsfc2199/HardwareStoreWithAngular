import { Component, OnInit, Provider } from '@angular/core';
import { ProductsServiceService } from '../products-service.service';
import { Product } from 'src/app/models/product.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { ProductsState } from '../product-store/products.reducer';
import * as fromProducts from '../product-store/products.actions'

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit{

  constructor(private productService: ProductsServiceService, private store: Store<AppState>){}

  productList: Product[] = [];
  isLoading:boolean =  false;
  error:any = null

  ngOnInit(): void {
    this.store.select('products').subscribe((prod: ProductsState)=>{
      this.productList = prod.products;
      this.isLoading = prod.isLoading;
      this.error = prod.error
    })

    this.store.dispatch(new fromProducts.LoadProductsAction())
  }


  closeModal(){

  }

  onDelete(id:string){
    console.log(id);



    this.store.dispatch(new fromProducts.DeleteProduct(id))
    this.productService.deleteProduct(id).subscribe(data=>{

    })
  }

  onFilter(filterValue: Event){

  }
}
