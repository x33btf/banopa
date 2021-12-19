import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../services/products.service";
import {Product} from "../model/product.model";
import {Router} from "@angular/router";
import {ConnectionService} from "../services/connection.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products : Product[] = [];
  allProducts : Product[] | null = null;
  product_filter ="";
    constructor(private service: ProductsService, private  router :Router,private connService: ConnectionService) { }

  ngOnInit(): void {
    if(!this.connService.loggediIn()){
      this.router.navigateByUrl('login');
    }
  }

  getProducts() {

    this.service.getAllProducts().subscribe(data=>{
      console.log(data);
      this.products = data;
      this.allProducts = data;
    })

  }
  remove_product(p:Product) {
    this.service.remove_product(p.restaurant_id);
    this.getProducts();
  }

  filtersProducts() {
    if (this.allProducts != null){
      this.products = this.allProducts.filter( p => p.restaurant_name.includes(this.product_filter));
    }
  }
}
