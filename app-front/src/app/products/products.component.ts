import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../services/products.service";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products : Product[] = [];
  allProducts : Product[] | null = null;
  product_filter ="";
  constructor(private service: ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.service.getAllProducts().subscribe(data=>{
      this.products = data;
      this.allProducts = data;
    })

  }
  remove_product(p:Product) {
    this.service.remove_product(p.id);
    this.getProducts();
  }

  filtersProducts() {
    if (this.allProducts != null){
      this.products = this.allProducts.filter( p => p.title.includes(this.product_filter));
    }
  }
}
