import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";



@Injectable({providedIn:"root"})
export class ConnectionService{
  constructor(private http:HttpClient) {
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

}
