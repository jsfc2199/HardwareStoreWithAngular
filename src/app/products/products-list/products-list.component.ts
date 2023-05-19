import { Component, OnInit, Provider, ViewChild } from '@angular/core';
import { ProductsServiceService } from '../products-service.service';
import { Product } from 'src/app/models/product.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { ProductsState } from '../product-store/products.reducer';
import * as fromProducts from '../product-store/products.actions'
import { ProductEditingComponent } from '../product-editing/product-editing.component';
import { ProductToShopComponent } from '../product-to-shop/product-to-shop.component';
import { ProductFormComponent } from '../product-form/product-form.component';
import Swal from 'sweetalert2';
import { BuyItemsComponent } from '../buy-items/buy-items.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  @ViewChild(ProductEditingComponent) private editingForm!: ProductEditingComponent
  @ViewChild(ProductToShopComponent) private productToAddForm!: ProductToShopComponent
  @ViewChild(ProductFormComponent) private productToAddInProducts!: ProductFormComponent
  @ViewChild(BuyItemsComponent) private buyProductItems!: BuyItemsComponent

  constructor(private productService: ProductsServiceService, private store: Store<AppState>) { }

  productList: Product[] = [];
  isLoading: boolean = false;
  error: any = null
  selectedProduct: Product | null = null;

  ngOnInit(): void {
    this.store.select('products').subscribe((prod: ProductsState) => {

      if (prod.products !== undefined) {
        this.productList = prod.products;

      }
      this.isLoading = prod.isLoading;
      this.error = prod.error

      this.checkDisabledButtons()


    })

    this.store.dispatch(new fromProducts.LoadProductsAction())
  }
  private swalDisplayed = false;
  private checkDisabledButtons() {

    const isAnyButtonDisabled = this.productList.some((product) => {
      return product.unitsAvailable < product.minUnits
    })

    if (isAnyButtonDisabled && !this.swalDisplayed) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Some add to cart buttons are disabled. It means it is necesarry to buy more items'
      });

      this.swalDisplayed = true
    }
  }

  closeModal() {
    this.editingForm.productToEditForm.reset();
    this.editingForm.productToEditForm.get('provider')?.setValue('');
  }

  closeBuyProducts() {
    this.buyProductItems.productToBuy.reset();
    this.buyProductItems.productToBuy.get('quantity')?.setValue(0);
  }

  closeAddToCartModal() {
    this.productToAddForm.productToAdd.reset()
    this.productToAddForm.productToAdd.get('amount')?.setValue(0);
  }


  closeModalProductComponent() {
    this.productToAddInProducts.productToAddForm.reset();
    this.productToAddInProducts.productToAddForm.get('provider')?.setValue('');
  }

  onDelete(id: string) {
    this.store.dispatch(new fromProducts.DeleteProduct(id))
  }


  OnSeeDetails(product: Product) {
    if (product !== undefined) {
      this.selectedProduct = product
    }
  }

}
