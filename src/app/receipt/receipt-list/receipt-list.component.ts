import { Component, OnInit } from '@angular/core';
import { ReceiptService } from '../receipt.service';
import { Receipt } from 'src/app/models/receipt.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { ReceiptsState } from '../receipt-store/receipt.reducer';
import * as fromReceipts from '../receipt-store/receipt.actions'

@Component({
  selector: 'app-receipt-list',
  templateUrl: './receipt-list.component.html',
  styleUrls: ['./receipt-list.component.css']
})
export class ReceiptListComponent implements OnInit{
  constructor(private receiptsService:ReceiptService, private store:Store<AppState>){}
  isLoading:boolean = false;
  error: any = null

  receiptList: Receipt[] = [];

  ngOnInit(): void {
    this.store.select('receipts').subscribe((receipt:ReceiptsState) => {
      if(receipt !== undefined) {
        this.receiptList = receipt.receipts
        this.isLoading = receipt.isLoading
        this.error = receipt.error
      }
    })
    this.store.dispatch(new fromReceipts.LoadReceiptsAction())
  }
}
