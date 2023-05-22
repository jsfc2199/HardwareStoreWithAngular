import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import * as fromBill from '../bill/bill-store/bill.actions';
import { BillService } from '../bill/bill.service';
import { Bill } from '../models/bill.model';
import { CartItem } from '../models/inCart.model';
import * as fromShop from './shop-store/shop.actions';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.css']
})
export class ShopCartComponent implements OnInit, OnDestroy {
  constructor(private store: Store<AppState>,private billService: BillService, private router:Router){}


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
    const clientNames = this.productsInCart.map(product =>{
      return product.clientName
    })

    const sellerNames = this.productsInCart.map(product =>{
      return product.sellerName
    })

    const productsBought = this.productsInCart.map(product =>{
      return product.product
    })

    const billToAdd: Bill = new Bill(
      clientNames.join(', '),
      sellerNames.join(', '),
      moment(new Date()).format("DD/MM/YYYY HH:mm:ss"),
      productsBought,
      this.totalPrice
    )

    this.totalPrice = 0
    this.totalProducts = 0

    this.store.dispatch(new fromBill.AddBillAction(billToAdd))
    this.billService.addBills(billToAdd)
    this.store.dispatch(new fromShop.ClearProductToCart())

    this.router.navigate(['bill'])
    Swal.fire({
      icon:'success',
      title: 'New Bill',
      text:'A new bill has been added'
    })
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
