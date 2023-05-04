import { Component, OnInit, Provider } from '@angular/core';
import { ProductsServiceService } from '../products-service.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit{



  constructor(private productService: ProductsServiceService){}


  productList: Product[] = [];
  
  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.productList = products;
    })
  }


  closeModal(){

  }

  onFilter(filterValue: Event){

  }
}
