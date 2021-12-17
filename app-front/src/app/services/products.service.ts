import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Product} from "../model/product.model";



@Injectable({providedIn:"root"})
export class ProductsService{
  constructor(private http:HttpClient) {
  }

  getAllProducts(){
    let host = environment.host+"/todos?_limit=10)";
    return this.http.get<Product[]>(host);
  }

  remove_product(id:number) {
    let host = environment.host+"/remove/";
    return this.http.delete(host+id);
  }

}
