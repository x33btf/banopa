import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Product, resProduct} from "../model/product.model";



@Injectable({providedIn:"root"})
export class ProductsService{
  constructor(private http:HttpClient) {
  }

  getAllProducts(){
    let host = environment.host+"/restaurant";
    return this.http.get<resProduct>(host);
  }

  remove_product(id:string) {
    let host = environment.host+"/restaurant/";
    return this.http.delete(host+id);
  }
  add_product(p:Product){
    let host = environment.host+"/restaurant/";
    return this.http.post(host,p);
  }

}
