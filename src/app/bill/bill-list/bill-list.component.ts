import { Component, OnInit } from '@angular/core';
import { Bill } from '../../models/bill.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { BillsState } from '../bill-store/bill.reducer';
import * as fromBills from '../bill-store/bill.actions'
import { Product } from 'src/app/models/product.model';


@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit {
  constructor(private store: Store<AppState>){}

  isLoading: boolean = false
  error: any = null
  billList: Bill[] = []


  ngOnInit(): void {
    this.store.select('bills').subscribe((bill: BillsState) =>{
      if(bill !== undefined){
        this.billList = bill.bills
        this.isLoading = bill.isLoading
        this.error = bill.error
      }
    })


    this.store.dispatch( new fromBills.LoadBillsAction())
  }

  getProductsBought(productsBought: Product[]):string{
    return productsBought.map(product => product.productName).join(', ')
  }
}
