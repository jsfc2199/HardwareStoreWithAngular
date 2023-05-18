import { Component, OnInit, Provider, ViewChild } from '@angular/core';
import { ProductsServiceService } from '../products-service.service';
import { Product } from 'src/app/models/product.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { ProductsState } from '../product-store/products.reducer';
import * as fromProducts from '../product-store/products.actions'
import { ProductEditingComponent } from '../product-editing/product-editing.component';
import { ProductToShopComponent } from '../product-to-shop/product-to-shop.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit{

  @ViewChild(ProductEditingComponent) private editingForm!: ProductEditingComponent
  @ViewChild(ProductToShopComponent) private productToAddForm!: ProductToShopComponent

  constructor(private productService: ProductsServiceService, private store: Store<AppState>){}

  productList: Product[] = [];
  isLoading:boolean =  false;
  error:any = null
  selectedProduct: Product | null = null;

  ngOnInit(): void {
    this.store.select('products').subscribe((prod: ProductsState)=>{

      if(prod.products !== undefined){
        this.productList = prod.products;
      }
      this.isLoading = prod.isLoading;
      this.error = prod.error
    })

    this.store.dispatch(new fromProducts.LoadProductsAction())
  }


  closeModal(){
      this.editingForm.productToEditForm.reset();
      this.editingForm.productToEditForm.get('provider')?.setValue('');
  }

  closeAddToCartModal(){
    this.productToAddForm.productToAdd.reset()
    this.productToAddForm.productToAdd.get('amount')?.setValue(0);
  }

  onDelete(id:string){
    this.store.dispatch(new fromProducts.DeleteProduct(id))
  }


  OnSeeDetails(product: Product){
    if(product !== undefined){
      this.selectedProduct = product
    }
  }

}
