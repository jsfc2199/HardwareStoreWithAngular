import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Hardware-Store';

  constructor(private http: HttpClient) { }

  ngOnInit() {
   /* this.http.get('https://hardware-backend-production.up.railway.app/v1/api/all-providers').subscribe(data => {
      console.log(data)
    })*/
  }

  /*onClick() {
    this.http.post('https://hardware-backend-production.up.railway.app/v1/api/saveProvider', {
      "name": "prueba 2",
      "number": "3692581470",
      "passport": "ger78gherog7"
    }).subscribe(data=>{
      console.log(data); //es obligatorio suscribirse en el metodo post para que todos los interesados escuchen por fuera, como un emit

    })
    console.log('entre a post');

  }*/
}
