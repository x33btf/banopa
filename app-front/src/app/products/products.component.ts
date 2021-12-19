import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../services/products.service";
import {Product} from "../model/product.model";
import {Router} from "@angular/router";
import {ConnectionService} from "../services/connection.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products : Product[] = [];
  allProducts : Product[] | null = null;
  product_filter ="";
  totalElementToShow :number = 10;
    constructor(private service: ProductsService, private  router :Router,private connService: ConnectionService) { }

  ngOnInit(): void {
    if(!this.connService.loggediIn()){
      this.router.navigateByUrl('login');
    }
  }

  getProducts() {

    this.service.getAllProducts().subscribe(data=>{
      console.log(data.status);
      this.allProducts = data.res;
      this.products = this.allProducts.slice(0,this.totalElementToShow);
    })

  }
  remove_product(p:Product) {
    this.service.remove_product(p._id).subscribe(data => {
      this.getProducts();
    });

  }

  productForm = new FormGroup({
    restaurant_name: new FormControl('',Validators.required),
    borough: new FormControl('',Validators.required),
    cuisine: new FormControl('',Validators.required),
    address_postcode: new FormControl('',Validators.required),
    address_building: new FormControl('',Validators.required),
    address_street: new FormControl('',Validators.required),
  });

  addProduct() {
    let p:Product = {
      _id:"",
      restaurant_name: this.productForm.value.restaurant_name,
      borough: this.productForm.value.borough,
      cuisine: this.productForm.value.cuisine,
      address: {
        postcode : this.productForm.value.address_postcode,
        building : this.productForm.value.address_building,
        street : this.productForm.value.address_street
      }
    };
    console.log("okkokkkoko");
    this.service.add_producr(p).subscribe(data => {
      console.log("okkokkkoko");
    });
  }



  filtersProducts() {
    if (this.allProducts != null){
      this.products = this.allProducts.filter( p => p.restaurant_name.includes(this.product_filter)).slice(0,this.totalElementToShow);
    }
  }


}
