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
      console.log(data); //es obligatorio suscribirse en el metodo post para que todos los interesados escuchen por fuera, como un emit
    })
  }
}
