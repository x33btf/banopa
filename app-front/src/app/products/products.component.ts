import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../services/products.service";
import {Product, Token_info} from "../model/product.model";
import {Router} from "@angular/router";
import {ConnectionService} from "../services/connection.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products : Product[] = [];
  allProducts : Product[] | null = null;
  product_filter ="";
  default_products : Product ;
  totalElementToShow :number = 10;
  maxElementToShow :number = 30;
  counter :number = 0;

    constructor(private service: ProductsService, private  router :Router,private connService: ConnectionService) {
      this.default_products = {
        _id:"",
        cuisine:"",
        borough:"",
        restaurant_name:"",
        address: {
          street: "",
          building: "",
          postcode: ""
        }
        }
    }

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
    },error => {
      sessionStorage.setItem("token", sessionStorage.getItem("token_ref") || "");
      this.connService.refresh_token().subscribe(data =>{
        if(data.status == "success"){
          localStorage.setItem('token', data.access_token);
        }else {
          this.connService.logOut();
        }
      },error=>{
        this.connService.logOut();
      });
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
    address_postcode: new FormControl(''),
    address_building: new FormControl(''),
    address_street: new FormControl(''),
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
    if( this.default_products._id === ""){
      this.service.add_product(p).subscribe(data => {
        this.getProducts();
      });
    }else{
      p._id = this.default_products._id;
      this.service.update_product(p).subscribe(data =>{
        this.getProducts();
      });
    }

  }

  update_product(p:Product){
    this.default_products = p;
  }

  clearDefaultRest(){
    this.default_products = {
      _id:"",
      cuisine:"",
      borough:"",
      restaurant_name:"",
      address: {
        street: "",
        building: "",
        postcode: ""
      }
    }
  }



  filtersProducts() {
    if (this.allProducts != null){
      this.products = this.allProducts.filter( p => p.restaurant_name.includes(this.product_filter)).slice(0,this.totalElementToShow);
    }
  }

  onScrollDown(ev: any) {
    if(this.allProducts != null){
      if( this.counter + this.totalElementToShow > this.maxElementToShow){
        this.products = this.allProducts.slice(-this.maxElementToShow + this.counter + this.totalElementToShow,this.counter + this.totalElementToShow);
      }else{
        this.products = this.allProducts.slice(0,this.counter + this.totalElementToShow);
      }
      if(this.counter + this.totalElementToShow < this.allProducts.length){
        this.counter+=2;
      }
    }
    console.log(this.counter +"down");
  }

  onScrollUp(ev: any){
    console.log(this.counter+"fhfhfh");
    if(this.allProducts != null){
      if( this.counter + this.totalElementToShow > this.maxElementToShow){
        this.products = this.allProducts.slice(-this.maxElementToShow + this.counter + this.totalElementToShow,this.counter + this.totalElementToShow);
      }else{
        this.products = this.allProducts.slice(0,this.counter + this.totalElementToShow);
      }
      if(this.counter >0 ){
        this.counter-=1;
      }
    }
  }
}
