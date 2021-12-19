import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Token_info} from "../model/product.model";
import {Router} from "@angular/router";



@Injectable({providedIn:"root"})
export class ConnectionService{
  constructor(private http:HttpClient,private  router:Router) {
  }

  connect(formData:any){
    let host = environment.host+"/auth/login";
    return this.http.post(host, formData)
  }

  register(formData:any){
    let host = environment.host+"/auth/register";
    return this.http.post(host, formData);
  }

  loggediIn(){
    return !!localStorage.getItem('token');
  }
  getToken(){
    return localStorage.getItem("token");
  }

  logOut(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('login');
    localStorage.removeItem("user_mail");
    localStorage.removeItem(("user_id"));
    localStorage.removeItem("user_name");
  }

  update_user_info(info:any,id:string){
    let host = environment.host+"/user/"+id;
    return this.http.put(host,info);
  }

  refresh_token(){
    let host = environment.host+"/refresh/token";
    return this.http.post<Token_info>(host,"");
  }
}
