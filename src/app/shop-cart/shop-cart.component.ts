import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { CartItem } from '../models/inCart.model';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.css']
})
export class ShopCartComponent implements OnInit, OnDestroy {
  constructor(private store: Store<AppState>){}

  cartSubscription!: Subscription
  productsInCart: CartItem[] = []
  totalProducts: number = 0
  totalPrice: number = 0

  ngOnInit(): void {
    this.cartSubscription = this.store.select('shopCart').subscribe(shopCart => {
      this.productsInCart = shopCart.products
    })

     this.updateCartTotals()
  }

  onSubmit() {
    
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe()
  }

  private updateCartTotals(){
    for(let i = 0; i < this.productsInCart.length; i++){
      this.totalProducts += this.productsInCart[i].totalItems
      this.totalPrice += this.productsInCart[i].totalValue
    }
  }
}
