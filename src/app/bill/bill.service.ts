import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bill } from '../models/bill.model';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) { }

  getBills(){
    return this.http.get<Bill[]>('https://hardware-backend-production.up.railway.app/v1/api/all-bills')
  }

  addBills(bill: Bill) {
    return this.http.post('https://hardware-backend-production.up.railway.app/v1/api/save-bill',bill).subscribe()
  }
}
