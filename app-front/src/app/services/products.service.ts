import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";



@Injectable({providedIn:"root"})
export class ConnectionService{
  constructor(private http:HttpClient) {
  }

  getAllProducts(){
    let host = environment.host+"/login";

    return this.http.get(host);
  }

}
