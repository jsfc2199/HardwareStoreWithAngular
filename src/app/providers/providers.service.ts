import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Provider } from '../models/providers.model';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  constructor(private http: HttpClient) { }

  getProviders(){
    return this.http.get<Provider[]>('https://hardware-backend-production.up.railway.app/v1/api/all-providers')
  }

  postProvider(postData: Provider) {
    this.http.post('https://hardware-backend-production.up.railway.app/v1/api/saveProvider', postData).subscribe(data=>{
      //is mandatory to subscribe to this method in order to make everyone interested outside this listen to it, like and "emit"
    })
  }
}
