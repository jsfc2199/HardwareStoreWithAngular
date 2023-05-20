import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Receipt } from '../models/receipt.model';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  constructor(private http: HttpClient) { }

  getReceipts(){
    return this.http.get<Receipt[]>('https://hardware-backend-production.up.railway.app/v1/api/all-receipts')
  }

  addReceipt(receipt: Receipt){
    this.http.post('https://hardware-backend-production.up.railway.app/v1/api/save-receipt',receipt).subscribe()
  }
}
